import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function updateStudentLastLogin(studentId: string) {
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: { 
        lastLoginAt: new Date()
        // updatedAt sera automatiquement mis à jour grâce à @updatedAt
      }
    })
    console.log('Updated student login time:', updatedStudent)
    return updatedStudent
  } catch (error) {
    console.error('Error updating last login:', error)
    throw error
  }
} 