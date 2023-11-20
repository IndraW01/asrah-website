-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `address_name` VARCHAR(200) NOT NULL,
    `province` VARCHAR(200) NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `subdistrict` VARCHAR(200) NOT NULL,
    `road` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
