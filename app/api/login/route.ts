import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = 'your-secret-key'; // Измените на свой безопасный секретный ключ

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
          { message: 'Email and password are required' },
          { status: 400 }
      );
    }

    // Найти пользователя по email
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

    // Проверка пароля
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

    return NextResponse.json({
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { message: 'Something went wrong', error: error.message },
        { status: 500 }
    );
  }
}
