import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: ['/dashboard/:path*'],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hasSession = Boolean(
    req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value
  )
  if (!hasSession) {
    const signin = new URL('/api/auth/signin', url)
    signin.searchParams.set('callbackUrl', url.href)
    return NextResponse.redirect(signin)
  }
  return NextResponse.next()
}