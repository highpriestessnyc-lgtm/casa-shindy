import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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

  // 会員限定ページのガード
  if (path.startsWith('/members')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + path, request.url))
    }
    // サブスク確認
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_member')
      .eq('id', user.id)
      .single()

    if (!profile?.is_member) {
      return NextResponse.redirect(new URL('/join', request.url))
    }
  }

  // ログイン済みならauth系ページをリダイレクト
  if (user && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/members', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/members/:path*', '/auth/:path*'],
}
