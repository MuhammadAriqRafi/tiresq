/*
  Warnings:

  - Added the required column `destination_name` to the `escorts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "escorts" ADD COLUMN     "destination_name" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "tire_repair_shops" ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true;
