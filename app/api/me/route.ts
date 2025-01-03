import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET);

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader) {
            const url = new URL('/login', req.url);
            return NextResponse.redirect(url, 302);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            const url = new URL('/login', req.url);
            return NextResponse.redirect(url, 302);
        }


        let decoded;
        try {
            const { payload } = await jwtVerify(token, SECRET_KEY);
            decoded = payload as { userId: string };
        } catch (err) {
            console.error('Token verification failed:', err);
            const url = new URL('/login', req.url);
            return NextResponse.redirect(url, 302);
        }


        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { role: true },
        });

        if (!user) {
            const url = new URL('/login', req.url);
            return NextResponse.redirect(url, 302);
        }

        // Возвращаем данные пользователя
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
        });
    } catch (error) {
        console.error('Error processing request:', error);
        const url = new URL('/login', req.url);
        return NextResponse.redirect(url, 302);
    }
}
