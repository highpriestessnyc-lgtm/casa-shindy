import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function MembersPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const CONTENTS = [
    { icon:'💃', title:'Monthly Dance Lesson', sub:'最新レッスン動画', href:'/members/lesson', badge:'New' },
    { icon:'✍️', title:'シンディの独り言', sub:'最新投稿', href:'/members/soliloquy', badge:'' },
    { icon:'📈', title:'相場配信', sub:'GOLD / FX分析', href:'/members/market', badge:'Live' },
    { icon:'🎬', title:'映画の部屋', sub:'SHINDYが選んだ作品', href:'/members/culture/movies', badge:'' },
    { icon:'📚', title:'文庫・漫画', sub:'読んだ本リスト', href:'/members/culture/books', badge:'' },
    { icon:'🕺', title:'4スタンス談義', sub:'体軸別ダンス理論', href:'/members/culture/four-stance', badge:'' },
    { icon:'🎨', title:'MA@PAINTER', sub:'まひろの絵画ギャラリー', href:'/members/painter', badge:'' },
  ]

  return (
    <main style={{ minHeight:'100vh', background:'#080808', fontFamily:"'Didact Gothic',sans-serif" }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.4rem 4rem', background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)', position:'sticky', top:0, zIndex:100 }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></Link>
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
          <span style={{ fontSize:'0.58rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.3rem 0.8rem' }}>MEMBER</span>
          <span style={{ fontSize:'0.62rem', color:'rgba(248,246,242,0.4)' }}>{user.email}</span>
          <form action="/api/auth/signout" method="POST">
            <button style={{ fontSize:'0.58rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(248,246,242,0.3)', background:'none', border:'none', cursor:'pointer' }}>ログアウト</button>
          </form>
        </div>
      </nav>

      <div style={{ padding:'5rem 4rem', maxWidth:960, margin:'0 auto' }}>
        <div style={{ marginBottom:'4rem' }}>
          <span style={{ fontSize:'0.58rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Members Area</span>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2' }}>ようこそ、Casa Shindyへ。</h1>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {CONTENTS.map((c, i) => (
            <Link key={i} href={c.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#111', padding:'2rem', position:'relative', cursor:'pointer', height:'100%', borderLeft:'2px solid transparent', transition:'all 0.2s' }}>
                {c.badge && <span style={{ position:'absolute', top:'1rem', right:'1rem', fontSize:'0.52rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.15rem 0.4rem' }}>{c.badge}</span>}
                <span style={{ fontSize:'2rem', display:'block', marginBottom:'1rem' }}>{c.icon}</span>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.15rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>{c.title}</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>{c.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Shop link */}
        <div style={{ marginTop:'3rem', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.2rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Apps & Tools Shop</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>献立・弁当・BINGO LADDER・STAGE3D・ダンスの歴史本</div>
          </div>
          <Link href="/shop" style={{ background:'transparent', color:'#c9a96e', fontSize:'0.62rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.8rem 1.5rem', border:'1px solid rgba(201,169,110,0.3)', textDecoration:'none' }}>ショップへ →</Link>
        </div>
      </div>
    </main>
  )
}
