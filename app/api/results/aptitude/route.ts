import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await prisma.aptitudeResult.create({
      data: {
        score: body.score,
        totalQuestions: body.totalQuestions,
        answers: body.answers,
        studentId: body.studentId,
      },
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error creating aptitude result:', err)
    return NextResponse.json(
      { error: 'Error creating aptitude result' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const results = await prisma.aptitudeResult.findMany({
      include: {
        student: true
      },
      orderBy: {
        score: 'desc'
      }
    })
    return NextResponse.json(results)
  } catch (err) {
    console.error('Error fetching aptitude results:', err)
    return NextResponse.json(
      { error: 'Error fetching aptitude results' },
      { status: 500 }
    )
  }
} 