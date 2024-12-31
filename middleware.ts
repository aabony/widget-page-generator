import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login') {
    return NextResponse.next();
  }


    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }

    try {
      jwt.verify(token, SECRET!);
    } catch (error) {
      console.error('Invalid token:', error.message);
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }


  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/edit/:path*',  '/',],
};
