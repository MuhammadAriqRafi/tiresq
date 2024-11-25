import { Prisma } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface ITripsRepository {
  getTrips<
    T extends Prisma.TripWhereInput,
    K extends Prisma.TripSelect,
    I extends Prisma.TripOrderByWithRelationInput,
  >(filters?: {
    skip?: number
    take?: number
    where?: T
    select: K
    orderBy?: I
  }): Promise<Prisma.TripGetPayload<{ select: K }>[]>

  getTripExperiences<
    T extends Prisma.TripExperienceWhereInput,
    K extends Prisma.TripExperienceSelect,
  >(filters?: {
    where: T
    select: K
  }): Promise<Prisma.TripExperienceGetPayload<{ select: K }>[]>

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

  updateTripExperience(
    tripId: string,
    data: Prisma.TripExperienceUpdateInput
  ): Promise<void>
}
