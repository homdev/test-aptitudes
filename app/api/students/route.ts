import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const student = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
      },
    })
    return NextResponse.json(student)
  } catch (err) {
    console.error('Error creating student:', err)
    return NextResponse.json(
      { error: 'Error creating student' },
      { status: 500 }
    )
  }
} 