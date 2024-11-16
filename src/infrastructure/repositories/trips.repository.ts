import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { PrismaTransactionalClient } from '@/lib/types'
import { ITripsRepository } from '@/src/application/repositories/trips.repository.interface'
import { DatabaseError } from '@/src/entities/errors/common'

@injectable()
export class TripsRepository implements ITripsRepository {
  constructor(private readonly db: typeof prisma = prisma) {}

  async getTrips<
    T extends Prisma.TripWhereInput,
    K extends Prisma.TripSelect,
    I extends Prisma.TripOrderByWithRelationInput,
  >(filters?: {
    where?: T,
    select: K
    orderBy?: I
  }): Promise<Prisma.TripGetPayload<{ select: K }>[]> {
    try {
      return await this.db.trip.findMany(filters)
    } catch (error) {
      console.error({ getTripsError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengambil data perjalanan')
    }
  }

  async getTripExperiences<
    T extends Prisma.TripExperienceWhereInput,
    K extends Prisma.TripExperienceSelect,
  >(filters?: {
    where: T,
    select: K
  }): Promise<Prisma.TripExperienceGetPayload<{ select: K }>[]> {
    try {
      return await this.db.tripExperience.findMany(filters)
    } catch (error) {
      console.error({ getTripExperiencesError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengambil data pengalaman')
    }
  }

  async createTrip(data: Prisma.TripCreateInput): Promise<void> {
    try {
      await this.db.trip.create({ data })
    } catch (error) {
      console.error({ createTripError: error })
      throw new DatabaseError('Terjadi kesalahan saat membuat data perjalanan')
    }
  }

  async createTripExperience(
    data: Prisma.TripExperienceCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void> {
    const invoker = trx ?? this.db

    try {
      await invoker.tripExperience.create({ data })
    } catch (error) {
      console.error({ createTripExperienceError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat membuat data pengalaman'
      )
    }
  }

  async updateTrip(
    tripId: string,
    data: Prisma.TripUpdateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void> {
    const invoker = trx ?? this.db

    try {
      await invoker.trip.update({ where: { id: tripId }, data })
    } catch (error) {
      console.error({ updateTripError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengubah data trip')
    }
  }

  async updateTripExperience(tripId: string, data: Prisma.TripExperienceUpdateInput): Promise<void> {
    try {
      await this.db.tripExperience.update({ where: { tripId }, data })
    } catch (error) {
      console.error({ updateTripExperienceError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengubah data trip experience')
    }
  }
}
