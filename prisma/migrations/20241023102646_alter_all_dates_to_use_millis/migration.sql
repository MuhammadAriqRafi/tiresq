/*
  Warnings:

  - The `reviewedAt` column on the `trip_experiences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratedAt` column on the `trip_experiences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `completedAt` column on the `trips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cancelledAt` column on the `trips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `createdAt` on the `tire_repair_shops` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expiredAt` on the `trips` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdAt` on the `trips` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tire_repair_shops" ALTER COLUMN "rating" SET DEFAULT 0,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trip_experiences" DROP COLUMN "reviewedAt",
ADD COLUMN     "reviewedAt" INTEGER,
DROP COLUMN "ratedAt",
ADD COLUMN     "ratedAt" INTEGER;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "expiredAt",
ADD COLUMN     "expiredAt" INTEGER NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "completedAt",
ADD COLUMN     "completedAt" INTEGER,
DROP COLUMN "cancelledAt",
ADD COLUMN     "cancelledAt" INTEGER;
