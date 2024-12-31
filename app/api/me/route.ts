import { NextResponse } from 'next/server';
import { verifyToken, DecodedToken } from '../../../utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        const url = new URL('/login', req.url); // Формируем абсолютный URL для редиректа
        return NextResponse.redirect(url, 302);
    }

    const token = authHeader.split(' ')[1];

    const decoded: DecodedToken | null = verifyToken(token);

    if (!decoded) {
        const url = new URL('/login', req.url); // Формируем абсолютный URL для редиректа
        return NextResponse.redirect(url, 302);
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { role: true },
        });

        if (!user) {
            const url = new URL('/login', req.url); // Формируем абсолютный URL для редиректа
            return NextResponse.redirect(url, 302);
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        const url = new URL('/login', req.url); // Формируем абсолютный URL для редиректа
        return NextResponse.redirect(url, 302);
    }
}
