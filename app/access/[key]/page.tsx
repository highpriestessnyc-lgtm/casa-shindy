import { createSupabaseServerClient } from '@/lib/supabase-server'
import { MEMBER_APPS } from '@/lib/member-apps'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'

export default async function MemberAppAccess({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const app = MEMBER_APPS[key]
  if (!app) notFound()

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?redirect=/access/${key}`)

  const isAdmin = user.email === 'high.priestess.nyc@gmail.com'
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) redirect('/join')
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <div style={{ maxWidth:480, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111', position:'relative' }}>
        <span style={{ position:'absolute', top:'1.2rem', right:'1.2rem', fontSize:'0.55rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.3rem 0.7rem' }}>MEMBERS FREE</span>
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'1.5rem' }}>{app.icon}</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>{app.name}</h1>
        <p style={{ fontSize:'0.78rem', lineHeight:2, color:'rgba(248,246,242,0.4)', marginBottom:'2rem' }}>{app.desc}</p>

        <a href={app.href} target="_blank" rel="noopener noreferrer" style={{ display:'block', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.68rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1.5rem' }}>
          アプリを開く →
        </a>

        <Link href="/shop" style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.35)', textDecoration:'none' }}>← ショップに戻る</Link>
      </div>
    </main>
  )
}
