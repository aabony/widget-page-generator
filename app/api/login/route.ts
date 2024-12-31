import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.SECRET;

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

    const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role.name,
        },
        SECRET,
        { expiresIn: '12h' }
    );

    // Устанавливаем токен в HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
    });

    response.cookies.set('token', token, {
      httpOnly: true, // Доступен только серверу
      secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
      maxAge: 12 * 60 * 60, // 12 часов
      path: '/', // Доступен на всех маршрутах
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
