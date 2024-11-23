-- DropForeignKey
ALTER TABLE "trip_experiences" DROP CONSTRAINT "trip_experiences_tripId_fkey";

-- AddForeignKey
ALTER TABLE "trip_experiences" ADD CONSTRAINT "trip_experiences_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
