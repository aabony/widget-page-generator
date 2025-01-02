import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ message: 'Page name is required' }, { status: 400 });
        }

        const deletedPage = await prisma.page.delete({
            where: { name },
        });

        return NextResponse.json({ message: `Page "${name}" and its offers deleted successfully`, deletedPage });
    } catch (error) {
        console.error('Error deleting page and its offers:', error);
        return NextResponse.json(
            { message: 'An error occurred while deleting the page', error: error.message },
            { status: 500 }
        );
    }
}
