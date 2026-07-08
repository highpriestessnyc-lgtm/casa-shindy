import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_EMAIL = 'high.priestess.nyc@gmail.com'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    'https://gebjrhwfaoyjgmysplhb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA',
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
  const isAdmin = user?.email === ADMIN_EMAIL

  if (path.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url))
    if (!isAdmin) return NextResponse.redirect(new URL('/', request.url))
  }

  if (path.startsWith('/members')) {
    if (!user) return NextResponse.redirect(new URL('/auth/login?redirect=' + path, request.url))
    if (isAdmin) return supabaseResponse
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) return NextResponse.redirect(new URL('/join', request.url))
  }

  if (user && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL(isAdmin ? '/admin' : '/members', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/members/:path*', '/admin/:path*', '/auth/:path*'],
}
