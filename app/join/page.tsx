'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function JoinPage() {
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: process.env.STRIPE_MEMBERSHIP_PRICE_ID || '',
        type: 'subscription',
      }),
    })
    const { url, error } = await res.json()
    if (error) { alert(error); setLoading(false); return }
    window.location.href = url
  }

  const FEATURES = [
    { icon:'💃', title:'Monthly Dance Lesson', sub:'月1回以上 動画レクチャー更新' },
    { icon:'✍️', title:'シンディの独り言', sub:'日常・思考・旅のテキスト配信' },
    { icon:'📈', title:'相場配信', sub:'GOLD / FX SHINDYの視点' },
    { icon:'🎬', title:'映画・文庫・漫画紹介', sub:'SHINDYの人格を作った作品たち' },
    { icon:'🕺', title:'4スタンス別ダンス談義', sub:'体軸タイプ別ダンス理論' },
    { icon:'🎨', title:'MA@PAINTER 絵画の部屋', sub:'まひろ作品 優先購入権' },
  ]

  return (
    <main style={{ minHeight:'100vh', background:'#080808', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4rem' }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></Link>
        <Link href="/auth/login" style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>ログイン</Link>
      </nav>

      <div style={{ maxWidth:560, margin:'0 auto', textAlign:'center' }}>
        <span style={{ fontSize:'0.58rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'1rem' }}>Membership</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2.5rem,8vw,4.5rem)', fontWeight:300, color:'#f8f6f2', lineHeight:1, marginBottom:'1rem' }}>
          Casa Shindyに<br/>参加する
        </h1>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(4rem,14vw,8rem)', color:'#c9a96e', lineHeight:1, margin:'1.5rem 0 0.3rem' }}>¥500</div>
        <span style={{ fontSize:'0.62rem', letterSpacing:'0.4em', color:'rgba(248,246,242,0.35)', display:'block', marginBottom:'3rem' }}>PER MONTH — CANCEL ANYTIME</span>

        {/* Feature list */}
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', marginBottom:'2rem', textAlign:'left' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem', borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <span style={{ fontSize:'1.2rem' }}>{f.icon}</span>
              <div>
                <div style={{ fontSize:'0.82rem', color:'rgba(248,246,242,0.8)' }}>{f.title}</div>
                <div style={{ fontSize:'0.62rem', color:'rgba(248,246,242,0.35)' }}>{f.sub}</div>
              </div>
              <span style={{ marginLeft:'auto', fontSize:'0.5rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.15rem 0.4rem' }}>✓</span>
            </div>
          ))}
        </div>

        <button onClick={handleJoin} disabled={loading} style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.2rem', border:'none', cursor:'pointer', fontFamily:"'Didact Gothic',sans-serif", fontWeight:'bold', marginBottom:'1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? '決済ページへ移動中...' : 'Stripeで安全に支払う'}
        </button>

        <p style={{ fontSize:'0.62rem', color:'rgba(248,246,242,0.25)', lineHeight:1.8 }}>
          クレジットカードで安全に決済。いつでも解約可能。<br/>
          アカウントをお持ちでない方は自動で作成されます。
        </p>

        <div style={{ marginTop:'2rem' }}>
          <Link href="/auth/signup" style={{ fontSize:'0.65rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>先にアカウントを作る →</Link>
        </div>
      </div>
    </main>
  )
}
