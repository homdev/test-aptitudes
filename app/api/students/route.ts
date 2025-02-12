import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Vérifier si l'étudiant existe déjà
    const existingStudent = await prisma.student.findFirst({
      where: {
        AND: [
          { firstName: body.firstName },
          { lastName: body.lastName }
        ]
      },
      include: {
        aptitudeResults: true,
        scenarioResults: true
      }
    })

    if (existingStudent) {
      // Vérifier si l'étudiant a déjà fait les tests
      if (existingStudent.aptitudeResults.length > 0 || existingStudent.scenarioResults.length > 0) {
        return NextResponse.json(
          { error: 'Vous avez déjà passé le test' },
          { status: 403 }
        )
      }

      // Mettre à jour lastLoginAt si l'étudiant n'a pas encore fait de test
      const updatedStudent = await prisma.student.update({
        where: { id: existingStudent.id },
        data: { lastLoginAt: new Date() }
      })
      
      const response = NextResponse.json(updatedStudent)
      response.cookies.set('session', updatedStudent.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
      
      return response
    }

    // Créer un nouvel étudiant
    const newStudent = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        class: body.class,
      },
    })
    
    const response = NextResponse.json(newStudent)
    response.cookies.set('session', newStudent.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })
    
    return response
    
  } catch (err) {
    console.error('Error managing student:', err)
    return NextResponse.json(
      { error: 'Error managing student' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')

  try {
    const student = await prisma.student.findFirst({
      where: {
        AND: [
          { firstName: firstName || undefined },
          { lastName: lastName || undefined }
        ]
      }
    })
    return NextResponse.json(student)
  } catch (err) {
    console.error('Error fetching student:', err)
    return NextResponse.json(
      { error: 'Error fetching student' },
      { status: 500 }
    )
  }
} 