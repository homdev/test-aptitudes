import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Nettoyage de la base de données
  await prisma.scenarioResult.deleteMany()
  await prisma.aptitudeResult.deleteMany()
  await prisma.student.deleteMany()

  console.log('Base de données nettoyée')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 