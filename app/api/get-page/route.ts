import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json({ message: 'Page name is required' }, { status: 400 });
        }

        const page = await prisma.page.findUnique({
            where: { name },
            include: {
                offers: true,
            },
        });

        if (!page) {
            return NextResponse.json({ message: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json({ page });
    } catch (error) {
        console.error('Error fetching page:', error);
        return NextResponse.json(
            { message: 'An error occurred while fetching the page', error: error.message },
            { status: 500 }
        );
    }
}
