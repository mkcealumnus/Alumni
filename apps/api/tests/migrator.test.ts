import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getMysqlMigrationFiles } from "../src/db/migrator.js";

describe("MySQL migration selection", () => {
  it("selects only the ordered MySQL API migrations", () => {
    const migrationsDirectory = fileURLToPath(new URL("../src/db/migrations/", import.meta.url));
    expect(getMysqlMigrationFiles(path.resolve(migrationsDirectory))).toEqual([
      "001_create_auth_tables.sql",
      "002_create_mentorship_tables.sql",
      "005_mysql_api_schema_alignment.sql",
      "006_add_profile_avatar_url.sql",
    ]);
  });
});
