import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();
const SECRET = new TextEncoder().encode(process.env.SECRET);

export async function POST(req: Request) {
    try {
        const cookies = req.headers.get('cookie') || '';
        const tokenCookie = cookies
            .split(';')
            .find((cookie) => cookie.trim().startsWith('token='));

        if (!tokenCookie) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        const token = tokenCookie.split('=')[1];
        console.log(token)
        let decodedToken;
        try {
            const { payload } = await jwtVerify(token, SECRET);
            console.log(payload)
            decodedToken = payload;
        } catch (err) {
            console.log(err)
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const userId = decodedToken.userId;
        if (!userId) {
            return NextResponse.json({ message: 'User ID not found in token' }, { status: 401 });
        }

        const { name, html, config } = await req.json();

        if (!name) {
            return NextResponse.json({ message: 'Page name is required' }, { status: 400 });
        }
        const existingPage = await prisma.page.findFirst({
            where: { name, userId },
        });

        let page;

        if (existingPage) {

            page = await prisma.page.update({
                where: { id: existingPage.id },
                data: {
                    title: config.title,
                    subtitle: config.subtitle,
                    ribbonText: config.ribbonText,
                    footerText: config.footerText,
                    profilePic: config.profilePic,
                    theme: config.theme,
                    updatedAt: new Date(),
                    offers: {
                        deleteMany: {}, // Удаляем все существующие офферы
                        create: config.sections.map((section) => ({
                            title: section.title,
                            subtitle: section.subtitle,
                            description: section.description,
                            imageSrc: section.imageSrc,
                            buttonText: section.buttonText,
                            buttonLink: section.buttonLink,
                        })),
                    },
                },
            });
        } else {
            page = await prisma.page.create({
                data: {
                    name,
                    uuid: require('crypto').randomUUID(),
                    title: config.title,
                    subtitle: config.subtitle,
                    ribbonText: config.ribbonText,
                    footerText: config.footerText,
                    profilePic: config.profilePic,
                    theme: config.theme,
                    userId,
                    offers: {
                        create: config.sections.map((section) => ({
                            title: section.title,
                            subtitle: section.subtitle,
                            description: section.description,
                            imageSrc: section.imageSrc,
                            buttonText: section.buttonText,
                            buttonLink: section.buttonLink,
                        })),
                    },
                },
            });
        }

        return NextResponse.json({ message: 'Page saved successfully', path: `/pages/${page.uuid}` });
    } catch (error) {
        console.error('Error saving page:', error);
        return NextResponse.json({ message: 'Failed to save page', error: error.message }, { status: 500 });
    }
}
