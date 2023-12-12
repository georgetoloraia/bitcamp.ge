/*
  Warnings:

  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `comment`,
    DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;
