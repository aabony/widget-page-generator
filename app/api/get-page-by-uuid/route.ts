import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');

    if (!uuid) {
        return NextResponse.json({ message: 'UUID is required' }, { status: 400 });
    }

    try {
        const page = await prisma.page.findUnique({
            where: { uuid },
            include: { offers: true },
        });

        if (!page) {
            return NextResponse.json({ message: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json({ page });
    } catch (error) {
        console.error('Error fetching page:', error);
        return NextResponse.json({ message: 'Error fetching page', error: error.message }, { status: 500 });
    }
}
