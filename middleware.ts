import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ne pas bloquer la route /api/students
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const isProtectedRoute = request.nextUrl.pathname.match(/\/(test|game)/)
  
  if (isProtectedRoute) {
    // Vérifier si l'utilisateur a une session
    const hasSession = request.cookies.has('session') || request.headers.get('authorization')
    
    if (!hasSession) {
      return NextResponse.redirect(new URL('/start', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/test/:path*', 
    '/game/:path*',
    '/api/:path*'
  ]
} 