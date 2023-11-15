/*
  Warnings:

  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_category_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `category_id`;

-- CreateTable
CREATE TABLE `colors` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `hexa` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color_in_products` (
    `color_id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`color_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `color_in_products` ADD CONSTRAINT `color_in_products_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `color_in_products` ADD CONSTRAINT `color_in_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
