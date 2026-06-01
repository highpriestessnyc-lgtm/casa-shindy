import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_EMAIL = 'high.priestess.nyc@gmail.com'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  if (path.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url))
    if (user.email !== ADMIN_EMAIL) return NextResponse.redirect(new URL('/', request.url))
  }
  if (path.startsWith('/members')) {
    if (!user) return NextResponse.redirect(new URL('/auth/login?redirect=' + path, request.url))
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) return NextResponse.redirect(new URL('/join', request.url))
  }
  if (user && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/members', request.url))
  }
  return supabaseResponse
}

export const config = {
  matcher: ['/members/:path*', '/admin/:path*', '/auth/:path*'],
}
