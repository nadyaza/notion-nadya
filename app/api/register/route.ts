import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, email, whatsapp, institusi, kebutuhan, saranTopik } = body

    // Validate required fields
    if (!nama || !email || !whatsapp || !institusi || !kebutuhan) {
      return NextResponse.json(
        { error: 'Semua field wajib harus diisi' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    // Validate WhatsApp number format (Indonesian format)
    const whatsappRegex = /^(08|\+?62)[0-9]{8,13}$/
    if (!whatsappRegex.test(whatsapp.replace(/[\s-]/g, ''))) {
      return NextResponse.json(
        { error: 'Format nomor WhatsApp tidak valid' },
        { status: 400 }
      )
    }

    // Save to database
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
      {
        success: true,
        message: 'Pendaftaran berhasil!',
        data: registration,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}
