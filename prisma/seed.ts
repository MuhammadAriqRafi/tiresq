import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.tireRepairShop.upsert({
    where: { id: 'TRS-LSJQNFP1' },
    update: {},
    create: {
      id: 'TRS-LSJQNFP1',
      name: 'Tambal Ban Asep',
      rating: 0,
      owner_id: 'empty1',
      latitude: -5.36122722040926,
      longitude: 105.31364286741777,
      created_at: Date.now(),
      service_cost_in_rupiah: 10000,
    },
  })

  await prisma.tireRepairShop.upsert({
    where: { id: 'TRS-MCLASQ4E' },
    update: {},
    create: {
      id: 'TRS-MCLASQ4E',
      name: 'Tambal Ban Ujang',
      rating: 0,
      owner_id: 'empty2',
      latitude: -5.363315021056011,
      longitude: 105.30829943120371,
      created_at: Date.now(),
      service_cost_in_rupiah: 15000,
    },
  })

  await prisma.tireRepairShop.upsert({
    where: { id: 'TRS-PWLSMAK5' },
    update: {},
    create: {
      id: 'TRS-PWLSMAK5',
      name: 'Tambal Ban Antasari',
      rating: 0,
      owner_id: 'empty3',
      latitude: -5.402903760242195,
      longitude: 105.2813415642729,
      created_at: Date.now(),
      service_cost_in_rupiah: 10000,
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
