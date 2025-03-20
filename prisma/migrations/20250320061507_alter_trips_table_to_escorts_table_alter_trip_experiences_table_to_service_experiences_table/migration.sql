/*
  Warnings:

  - The primary key for the `tire_repair_shops` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `tire_repair_shops` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `tire_repair_shops` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `tire_repair_shops` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tire_repair_shops` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `tire_repair_shops` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `rating` on the `tire_repair_shops` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(2,1)`.
  - You are about to drop the `trip_experiences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `tire_repair_shops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_at` to the `tire_repair_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `tire_repair_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `tire_repair_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `tire_repair_shops` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EscortStatus" AS ENUM ('COMPLETED', 'ONPROGRESS', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "trip_experiences" DROP CONSTRAINT "trip_experiences_tripId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_destinationId_fkey";

-- DropIndex
DROP INDEX "tire_repair_shops_userId_key";

-- AlterTable
ALTER TABLE "tire_repair_shops" DROP CONSTRAINT "tire_repair_shops_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "userId",
ADD COLUMN     "created_at" BIGINT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE CHAR(12),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(2,1),
ADD CONSTRAINT "tire_repair_shops_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tire_repair_shops_id_seq";

-- DropTable
DROP TABLE "trip_experiences";

-- DropTable
DROP TABLE "trips";

-- DropEnum
DROP TYPE "TripStatus";

-- CreateTable
CREATE TABLE "escorts" (
    "id" CHAR(12) NOT NULL,
    "user_id" TEXT NOT NULL,
    "destination_id" CHAR(12) NOT NULL,
    "status" "EscortStatus" NOT NULL DEFAULT 'ONPROGRESS',
    "expired_at" BIGINT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "completed_at" BIGINT,
    "cancelled_at" BIGINT,

    CONSTRAINT "escorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_experiences" (
    "id" CHAR(8) NOT NULL,
    "escort_id" CHAR(12) NOT NULL,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "rating" SMALLINT,
    "review" VARCHAR(1000),
    "rated_at" BIGINT,
    "reviewed_at" BIGINT,

    CONSTRAINT "service_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "escorts_id_key" ON "escorts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_experiences_escort_id_key" ON "service_experiences"("escort_id");

-- CreateIndex
CREATE UNIQUE INDEX "tire_repair_shops_owner_id_key" ON "tire_repair_shops"("owner_id");

-- AddForeignKey
ALTER TABLE "escorts" ADD CONSTRAINT "escorts_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tire_repair_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_experiences" ADD CONSTRAINT "service_experiences_escort_id_fkey" FOREIGN KEY ("escort_id") REFERENCES "escorts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
