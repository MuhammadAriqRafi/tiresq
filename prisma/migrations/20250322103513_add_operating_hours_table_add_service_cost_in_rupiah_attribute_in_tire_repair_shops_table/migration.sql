/*
  Warnings:

  - Added the required column `service_cost_in_rupiah` to the `tire_repair_shops` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "tire_repair_shops" ADD COLUMN     "service_cost_in_rupiah" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "operating_hours" (
    "tire_repair_shop_id" CHAR(12) NOT NULL,
    "days_of_week" "Days" NOT NULL,
    "open_time" TIME NOT NULL,
    "close_time" TIME NOT NULL,

    CONSTRAINT "operating_hours_pkey" PRIMARY KEY ("tire_repair_shop_id","days_of_week")
);

-- AddForeignKey
ALTER TABLE "operating_hours" ADD CONSTRAINT "operating_hours_tire_repair_shop_id_fkey" FOREIGN KEY ("tire_repair_shop_id") REFERENCES "tire_repair_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
