import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {jwtVerify} from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            title,
            subtitle,
            ribbonText,
            footerText,
            profilePic,
            theme,
            socialLinks,
            offers,
        } = body;

        if (!name) {
            return NextResponse.json({ message: 'Page name is required' }, { status: 400 });
        }
        const SECRET = new TextEncoder().encode(process.env.SECRET);
        const cookies = req.headers.get('cookie') || '';
        const tokenCookie = cookies
            .split(';')
            .find((cookie) => cookie.trim().startsWith('token='));

        if (!tokenCookie) {
            return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
        }

        const token = tokenCookie.split('=')[1];
            const { payload } = await jwtVerify(token, SECRET);


        const userId = payload.userId;
        if (!userId) {
            return NextResponse.json({ message: 'User ID not found in token' }, { status: 401 });
        }


        // @ts-ignore
        const page = await prisma.page.upsert({
            where: { name },
            update: {
                title,
                subtitle,
                ribbonText,
                footerText,
                profilePic,
                theme,
                socialLinks,
                offers: {
                    deleteMany: {},
                    create: offers.map((offer: any) => ({
                        title: offer.title,
                        subtitle: offer.subtitle,
                        description: offer.description,
                        imageSrc: offer.imageSrc,
                        buttonText: offer.buttonText,
                        buttonLink: offer.buttonLink,
                    })),
                },
            },
            create: {
                uuid: uuidv4(),
                name,
                title,
                subtitle,
                ribbonText,
                footerText,
                profilePic,
                theme,
                socialLinks,
                user: {
                    connect: { id: userId as string },
                },
                offers: {
                    create: offers.map((offer: any) => ({
                        title: offer.title,
                        subtitle: offer.subtitle,
                        description: offer.description,
                        imageSrc: offer.imageSrc,
                        buttonText: offer.buttonText,
                        buttonLink: offer.buttonLink,
                    })),
                },
            },
        });

        return NextResponse.json({ message: 'Page saved successfully', page });
    } catch (error) {
        console.error('Error saving page:', error);
        return NextResponse.json(
            { message: 'An error occurred while saving the page', error: error.message },
            { status: 500 }
        );
    }
}
