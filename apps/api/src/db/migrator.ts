import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDatabaseClient, IDatabaseClient } from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const migrationsDir = path.resolve(__dirname, "migrations");
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const newlyApplied: string[] = [];

  for (const file of files) {
    if (appliedSet.has(file)) {
      continue;
    }

    const filePath = path.join(migrationsDir, file);
    const sqlContent = fs.readFileSync(filePath, "utf-8");

    // Execute migration inside transaction
    await client.transaction(async (trx) => {
      // Split into statements
      const statements = sqlContent
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
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
if (process.argv[1] && process.argv[1].endsWith("migrator.js")) {
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
