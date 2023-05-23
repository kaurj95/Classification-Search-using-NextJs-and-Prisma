-- CreateTable
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `part774` (
    `category` INTEGER NOT NULL,
    `subcategory` VARCHAR(45) NOT NULL,
    `id` VARCHAR(45) NOT NULL,
    `description` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `Part774_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
