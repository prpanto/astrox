import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('Nothing to seed...');
  
}

try {
  await seed()
  await prisma.$disconnect()
} catch (e) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
