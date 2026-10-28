# Alumnux Database Architecture

This directory contains the database schema definitions and migration scripts for the **Alumnux** platform.

## Production Target: cPanel Shared Hosting MySQL

In accordance with Phase 1 deployment constraints:
- **Engine:** MySQL 8.0+ / MariaDB 10.4+
- **Character Set:** `utf8mb4`
- **Collation:** `utf8mb4_unicode_ci`
- **Access Model:** phpMyAdmin and direct PDO/Node `mysql2` connection via cPanel database user.

## Directory Structure
- `schema/`: Definitive SQL DDL schemas representing the full target relational model.
  - `alumnux_mysql_schema.sql`: Full MySQL schema with constraints, indexes, and initial department seed data.
- `migrations/`: Sequential migration files.
  - `001_initial_schema.sql`: Preserved initial baseline migration.
  - `002_seed_data.sql`: Preserved initial seed data.

## Phase 2 Roadmap
In Phase 2, a lightweight migration runner (such as `knex` or `kysely`) will be configured in `services/api` to run automated forward migrations against the cPanel MySQL database via SSH or deployment scripts.
