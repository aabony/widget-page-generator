import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();
const SECRET = new TextEncoder().encode(process.env.SECRET);

export async function GET(req: Request) {
    try {
        const cookies = req.headers.get('cookie') || '';
        const tokenCookie = cookies
            .split(';')
            .find((cookie) => cookie.trim().startsWith('token='));

        if (!tokenCookie) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        const token = tokenCookie.split('=')[1];

        let decodedToken;
        try {
            const { payload } = await jwtVerify(token, SECRET);
            decodedToken = payload;
        } catch (err) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const userId = decodedToken.userId;
        if (!userId) {
            return NextResponse.json({ message: 'User ID not found in token' }, { status: 401 });
        }

        const pages = await prisma.page.findMany({
            where: { userId },
            select: {
                name: true,
                uuid: true,
                updatedAt: true,
            },
        });

        const formattedPages = pages.map((page) => ({
            name: page.name,
            url: `/pages/${page.uuid}`,
            lastModified: page.updatedAt.toISOString(),
        }));

        return NextResponse.json({ pages: formattedPages });
    } catch (error) {
        console.error('Error fetching Deal In Bio pages:', error);
        return NextResponse.json({ message: 'Failed to fetch pages', error: error.message }, { status: 500 });
    }
}
