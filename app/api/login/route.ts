import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const SECRET = new TextEncoder().encode(process.env.SECRET);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
          { message: 'Email and password are required' },
          { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
      );
    }

    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role.name,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('12h')
        .sign(SECRET);

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { message: 'Something went wrong', error: error.message },
        { status: 500 }
    );
  }
}
