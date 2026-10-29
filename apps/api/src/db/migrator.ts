import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDatabaseClient, IDatabaseClient } from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is the MySQL API migration sequence. The directory also contains a
// legacy PostgreSQL schema and duplicate historical MySQL migrations; neither
// is part of the current API migration path.
export const MYSQL_MIGRATION_FILES = [
  "001_create_auth_tables.sql",
  "002_create_mentorship_tables.sql",
  "005_mysql_api_schema_alignment.sql",
  "006_add_profile_avatar_url.sql",
] as const;

export function getMysqlMigrationFiles(directory: string): string[] {
  const missing = MYSQL_MIGRATION_FILES.filter((file) => !fs.existsSync(path.join(directory, file)));
  if (missing.length > 0) {
    throw new Error(`Required MySQL migration files are missing: ${missing.join(", ")}`);
  }
  return [...MYSQL_MIGRATION_FILES];
}

export async function runMigrations(client: IDatabaseClient = getDatabaseClient()): Promise<string[]> {
  if (client.isMock()) {
    return ["mock_migrations_applied"];
  }

  // Ensure schema_migrations tracking table exists
  await client.execute(`
    CREATE TABLE IF NOT EXISTS \`schema_migrations\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(255) NOT NULL UNIQUE,
      \`applied_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  const appliedRows = await client.query<{ name: string }>(
    "SELECT name FROM `schema_migrations` ORDER BY id ASC;"
  );
  const appliedSet = new Set(appliedRows.map((r) => r.name));

  const compiledMigrationsDir = path.resolve(__dirname, "migrations");
  const sourceMigrationsDir = path.resolve(process.cwd(), "src", "db", "migrations");
  const migrationsDir = fs.existsSync(compiledMigrationsDir)
    ? compiledMigrationsDir
    : sourceMigrationsDir;
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  const files = getMysqlMigrationFiles(migrationsDir);

  const newlyApplied: string[] = [];

  for (const file of files) {
    if (appliedSet.has(file)) {
      continue;
    }

    const filePath = path.join(migrationsDir, file);
    const sqlContent = fs.readFileSync(filePath, "utf-8");

    // MySQL DDL implicitly commits. The statements in the canonical path are
    // idempotent so an interrupted migration can be safely retried.
    await client.transaction(async (trx) => {
      const statements = sqlContent
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        const executableStatement = statement.replace(/^(?:\s*--[^\r\n]*(?:\r?\n|$))+/, "").trim();
        const addedColumn = executableStatement.match(
          /^ALTER\s+TABLE\s+`?(\w+)`?\s+ADD\s+COLUMN\s+`?(\w+)`?/i
        );
        if (addedColumn) {
          const existingColumn = await trx.query<{ found: number }>(
            "SELECT 1 AS found FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ? LIMIT 1;",
            [addedColumn[1], addedColumn[2]]
          );
          if (existingColumn.length > 0) continue;
        }
        await trx.execute(statement);
      }

      await trx.execute(
        "INSERT INTO `schema_migrations` (`name`) VALUES (?);",
        [file]
      );
    });

    newlyApplied.push(file);
  }

  return newlyApplied;
}

// CLI runner if executed directly
if (process.argv[1] && /migrator\.(?:js|ts)$/.test(process.argv[1])) {
  runMigrations()
    .then((applied) => {
      console.log(`Migrations complete. Applied ${applied.length} migrations:`, applied);
      process.exit(0);
    })
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}
