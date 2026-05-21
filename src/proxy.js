import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request) {
  return NextResponse.redirect(new URL('/login', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: [
    '/add-ideas',
    '/my-ideas',
    '/my-interactions',
    '/ideas/:path*'
  ]
}