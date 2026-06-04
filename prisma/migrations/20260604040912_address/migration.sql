/*
  Warnings:

  - You are about to drop the column `delivery_address` on the `food_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "food_orders" DROP COLUMN "delivery_address",
ADD COLUMN     "address" TEXT;
