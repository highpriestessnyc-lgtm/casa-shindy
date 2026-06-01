'use client'
import { useState } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  { key:'kondate', icon:'🍱', name:'献立アプリ', desc:'毎日の献立をAIが提案。栄養バランス・家族の好みから最適メニューを生成。', price:980, priceId:'price_kondate', type:'one_time' },
  { key:'bento', icon:'🥡', name:'弁当アプリ', desc:'お弁当レシピ管理・栄養計算・見た目コーディネート。', price:980, priceId:'price_bento', type:'one_time' },
  { key:'bingo-ladder', icon:'📊', name:'BINGO LADDER', desc:'SHINDYのFXステージ分析メソッド。Stage 0〜5の相場読みを体系化した実戦ツール。', price:9800, priceId:'price_bingo', type:'one_time', featured:true },
  { key:'stage3d', icon:'🌐', name:'STAGE3D', desc:'相場ステージを3D空間で視覚化する分析ツール。', price:1650, priceId:'price_stage3d', type:'one_time' },
  { key:'dance-history', icon:'📖', name:'ダンスの歴史本', desc:'SHINDYが書いたストリートダンスの歴史書。PDF電子書籍。', price:450, priceId:'price_dance_history', type:'one_time' },
  { key:'dancing-quest', icon:'🎮', name:'Dancing Quest', desc:'SHINDYが作ったダンサー育成ゲーム。Casa Shindyで無料ダウンロード。', price:0, priceId:'free', type:'free' },
]

export default function ShopPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleBuy = async (product: typeof PRODUCTS[0]) => {
    if (product.type === 'free') {
      window.location.href = `/shop/${product.key}/download`
      return
    }
    setLoading(product.key)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: product.priceId, type: product.type, productKey: product.key }),
    })
    const { url, error } = await res.json()
    if (error) { alert(error); setLoading(null); return }
    window.location.href = url
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', fontFamily:"'Didact Gothic',sans-serif" }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.4rem 4rem', background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></Link>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          <Link href="/members" style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>メンバーページ</Link>
          <Link href="/auth/login" style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>ログイン</Link>
        </div>
      </nav>

      <div style={{ padding:'6rem 4rem', maxWidth:960, margin:'0 auto' }}>
        <span style={{ fontSize:'0.58rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Shop</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2', marginBottom:'0.5rem' }}>Apps & Tools</h1>
        <span style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)', letterSpacing:'0.15em', display:'block', marginBottom:'3rem' }}>会員登録不要 — クレジットカードで即購入</span>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {PRODUCTS.map((p) => (
            <div key={p.key} style={{ background: p.featured ? 'linear-gradient(160deg,#1a1008,#161616)' : '#0d0d0d', padding:'2.5rem 2rem', display:'flex', flexDirection:'column', border: p.featured ? '1px solid rgba(201,169,110,0.18)' : 'none', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.2),transparent)' }} />
              <span style={{ fontSize:'2rem', display:'block', marginBottom:'1.2rem' }}>{p.icon}</span>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', color: p.featured ? '#c9a96e' : '#f8f6f2', marginBottom:'0.5rem' }}>{p.name}</div>
              <p style={{ fontSize:'0.73rem', lineHeight:1.9, color:'rgba(248,246,242,0.4)', marginBottom:'1.5rem', flex:1 }}>{p.desc}</p>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.8rem', color:'#c9a96e', marginBottom:'1.2rem' }}>
                {p.price === 0 ? '無料' : `¥${p.price.toLocaleString()}`}
              </div>
              <button onClick={() => handleBuy(p)} disabled={loading === p.key} style={{ background: p.price === 0 ? 'transparent' : 'linear-gradient(135deg,#c9a96e,#e8c98a)', color: p.price === 0 ? '#c9a96e' : '#080808', fontSize:'0.62rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem', border: p.price === 0 ? '1px solid rgba(201,169,110,0.4)' : 'none', cursor:'pointer', fontFamily:"'Didact Gothic',sans-serif", fontWeight:'bold', opacity: loading === p.key ? 0.7 : 1 }}>
                {loading === p.key ? '...' : p.price === 0 ? '無料ダウンロード' : '購入する'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop:'3rem', border:'1px solid rgba(201,169,110,0.15)', padding:'2rem', background:'rgba(201,169,110,0.03)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>月額¥500でさらにお得に</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>Dance Lesson・独り言・相場配信・カルチャーコンテンツが全部込み</div>
          </div>
          <Link href="/join" style={{ background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.62rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.8rem 1.5rem', textDecoration:'none', fontWeight:'bold' }}>メンバーになる →</Link>
        </div>
      </div>
    </main>
  )
}
