import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { nama, email, whatsapp, institusi, kebutuhan, saranTopik } = body

    // Validate required fields
    if (!nama || !email || !whatsapp || !institusi || !kebutuhan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create registration in database
    const registration = await prisma.registration.create({
      data: {
        nama,
        email,
        whatsapp,
        institusi,
        kebutuhan,
        saranTopik: saranTopik || null,
      },
    })

    return NextResponse.json(
      { success: true, data: registration },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    )
  }
}
