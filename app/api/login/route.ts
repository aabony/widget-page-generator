import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // Replace with a secure password

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
    cookies().set('admin_session', 'true', { httpOnly: true, secure: true })
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

