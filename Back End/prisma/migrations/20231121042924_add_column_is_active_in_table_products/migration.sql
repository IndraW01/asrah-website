-- AlterTable
ALTER TABLE `products` ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT false AFTER description;
