-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('COMPLETED', 'ONPROGRESS', 'CANCELLED');

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'ONPROGRESS',
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_experiences" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "rating" INTEGER,
    "review" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "ratedAt" TIMESTAMP(3),

    CONSTRAINT "trip_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tire_repair_shops" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tire_repair_shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trips_id_key" ON "trips"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trip_experiences_id_key" ON "trip_experiences"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trip_experiences_tripId_key" ON "trip_experiences"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "tire_repair_shops_userId_key" ON "tire_repair_shops"("userId");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "tire_repair_shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_experiences" ADD CONSTRAINT "trip_experiences_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
