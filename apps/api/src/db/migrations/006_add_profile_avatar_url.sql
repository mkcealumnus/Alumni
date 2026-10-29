-- The directory API selects profiles.avatar_url. Older canonical auth tables
-- did not include it, though the historical MySQL schema and API models do.
-- The migration runner checks information_schema before applying this column.
ALTER TABLE `profiles` ADD COLUMN `avatar_url` VARCHAR(500) NULL;
