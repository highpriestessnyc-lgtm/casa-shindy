'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

const CONTENTS = [
  { icon:'💃', title:'Monthly Dance Lesson', sub:'月1回以上更新', href:'/members/lesson', badge:'Monthly' },
  { icon:'✍️', title:'シンディの独り言', sub:'日常・思考・音楽・旅', href:'/members/soliloquy', badge:'' },
  { icon:'📈', title:'相場配信', sub:'GOLD / FX', href:'/members/market', badge:'Live' },
  { icon:'🎬', title:'映画の部屋', sub:'SHINDYが選んだ作品', href:'/members/culture/movies', badge:'' },
  { icon:'📚', title:'文庫・漫画', sub:'読んだ本リスト', href:'/members/culture/books', badge:'' },
  { icon:'🕺', title:'4スタンス談義', sub:'体軸別ダンス理論', href:'/members/culture/four-stance', badge:'' },
  { icon:'🎨', title:'MA@PAINTER', sub:'まひろの絵画', href:'/members/painter', badge:'' },
  { icon:'📖', title:'ダンスの歴史大百科', sub:'ストリートダンスの全記録', href:'/members/dance-history', badge:'' },
]

export default function MembersPage() {
  const [status, setStatus] = useState<'loading'|'member'|'notmember'|'nologin'>('loading')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setStatus('nologin'); return }
      if (user.email === 'high.priestess.nyc@gmail.com') { setStatus('member'); return }
      const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
      if (profile?.is_member) {
        setStatus('member')
      } else {
        setStatus('notmember')
      }
    })
  }, [])

  if (status === 'loading') return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'rgba(248,246,242,0.4)', fontSize:'0.85rem' }}>読み込み中...</div>
    </main>
  )

  if (status === 'nologin') {
    if (typeof window !== 'undefined') window.location.href = '/auth/login'
    return null
  }

  if (status === 'notmember') {
    if (typeof window !== 'undefined') window.location.href = '/join'
    return null
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', fontFamily:'sans-serif' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.4rem 2rem', background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)', position:'sticky', top:0, zIndex:100 }}>
        <Link href="/" style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></Link>
        <div style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
          <Link href="/members/account" style={{ fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>アカウント</Link>
          <Link href="/shop" style={{ fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>Shop</Link>
        </div>
      </nav>
      <div style={{ padding:'3rem 2rem', maxWidth:960, margin:'0 auto' }}>
        <div style={{ marginBottom:'3rem' }}>
          <span style={{ fontSize:'0.58rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Members Area</span>
          <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2' }}>ようこそ、Casa Shindyへ。</h1>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {CONTENTS.map((c, i) => (
            <Link key={i} href={c.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#111', padding:'2rem', position:'relative', cursor:'pointer', height:'100%' }}>
                {c.badge && <span style={{ position:'absolute', top:'1rem', right:'1rem', fontSize:'0.52rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.15rem 0.4rem' }}>{c.badge}</span>}
                <span style={{ fontSize:'2rem', display:'block', marginBottom:'1rem' }}>{c.icon}</span>
                <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.15rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>{c.title}</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>{c.sub}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop:'3rem', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.2rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Apps and Tools</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>献立・弁当・BINGO LADDER・STAGE3D</div>
          </div>
          <Link href="/shop" style={{ background:'transparent', color:'#c9a96e', fontSize:'0.62rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.8rem 1.5rem', border:'1px solid rgba(201,169,110,0.3)', textDecoration:'none' }}>ショップへ →</Link>
        </div>
      </div>
    </main>
  )
}
