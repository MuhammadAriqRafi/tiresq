import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.tireRepairShop.upsert({
    where: { userId: '123123' },
    update: {},
    create: {
      name: 'Tambal Ban Asep',
      userId: '123123',
      lat: -5.36122722040926,
      lng: 105.31364286741777,
      rating: 0,
      createdAt: Date.now(),
    },
  })

  await prisma.tireRepairShop.upsert({
    where: { userId: '234234' },
    update: {},
    create: {
      name: 'Tambal Ban Ujang',
      userId: '234234',
      lat: -5.363315021056011,
      lng: 105.30829943120371,
      rating: 0,
      createdAt: Date.now(),
    },
  })

  await prisma.tireRepairShop.upsert({
    where: { userId: '345345' },
    update: {},
    create: {
      name: 'Tambal Ban Antasari',
      userId: '345345',
      lat: -5.402903760242195,
      lng: 105.2813415642729,
      rating: 0,
      createdAt: Date.now(),
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
