import React from 'react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const isAuthenticated = cookies.get('isAuthenticated')?.value;

  const url = request.nextUrl.clone();
  
  if (!isAuthenticated && url.pathname !== '/login') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && url.pathname === '/login') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login', '/'],
};
