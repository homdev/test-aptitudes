import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Vérifier si l'étudiant existe
    const student = await prisma.student.findUnique({
      where: {
        id: body.studentId
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Vérifier si un résultat existe déjà pour cet étudiant
    const existingResult = await prisma.scenarioResult.findFirst({
      where: {
        studentId: body.studentId,
        createdAt: {
          gte: new Date(Date.now() - 5000) // Dans les 5 dernières secondes
        }
      }
    })

    if (existingResult) {
      console.log('Résultat déjà existant, éviter le doublon')
      return NextResponse.json(existingResult)
    }

    const result = await prisma.scenarioResult.create({
      data: {
        score: body.score,
        totalScenarios: body.totalScenarios,
        choices: body.choices,
        studentId: body.studentId,
      },
      include: {
        student: true
      }
    })

    console.log('Scénario résultat créé:', result)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error creating scenario result:', err)
    return NextResponse.json(
      { error: 'Error creating scenario result' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const results = await prisma.scenarioResult.findMany({
      include: {
        student: true
      },
      orderBy: {
        score: 'desc'
      }
    })
    console.log('Nombre de résultats retournés:', results.length)
    return NextResponse.json(results)
  } catch (err) {
    console.error('Error fetching scenario results:', err)
    return NextResponse.json(
      { error: 'Error fetching scenario results' },
      { status: 500 }
    )
  }
} 