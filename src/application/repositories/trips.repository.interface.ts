import { Prisma } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface ITripsRepository {
  getTrips<
    T extends Prisma.TripWhereInput,
    K extends Prisma.TripSelect,
  >(filters?: {
    where: T
    select: K
  }): Promise<Prisma.TripGetPayload<{ select: K }>[]>
  createTrip(data: Prisma.TripCreateInput): Promise<void>
  createTripExperience(
    data: Prisma.TripExperienceCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>
  updateTrip(
    tripId: string,
    data: Prisma.TripUpdateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>
}
