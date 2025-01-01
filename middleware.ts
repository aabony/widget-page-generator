import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/login') {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }

    try {
        await jwtVerify(token, SECRET);
        return NextResponse.next();
    } catch (error) {
        console.error('Invalid token:', error.message);
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/edit/:path*',  '/',],
};
