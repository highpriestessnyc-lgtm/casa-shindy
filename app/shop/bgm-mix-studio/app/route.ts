import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { BGM_MIX_STUDIO_HTML } from '@/lib/bgm-mix-studio-html'

const ADMIN_EMAIL = 'high.priestess.nyc@gmail.com'

// 会員限定: BGM MIX STUDIO v16 (ブラウザ版) を配信する
export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('redirect', '/shop/bgm-mix-studio/app')
    return NextResponse.redirect(url)
  }

  if (user.email !== ADMIN_EMAIL) {
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) return NextResponse.redirect(new URL('/join', request.url))
  }

  return new Response(BGM_MIX_STUDIO_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}
