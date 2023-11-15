-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(100) NOT NULL,
    `category_id` VARCHAR(100) NULL,
    `name` VARCHAR(200) NOT NULL,
    `gender_category` ENUM('PRIA', 'WANITA', 'UNISEX') NOT NULL,
    `stock` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image_products` (
    `id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NOT NULL,
    `image` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_products` ADD CONSTRAINT `image_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
