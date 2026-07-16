'use client'
import { useState } from 'react'

const PRODUCTS = [
  { key:'kondate', icon:'🍱', name:'献立アプリ', desc:'毎日の献立をAIが提案。会員は無料。', price:490, href:'/access/kondate', type:'link', memberFree:true },
  { key:'bento', icon:'🥡', name:'弁当アプリ', desc:'お弁当レシピ管理。', price:490, priceId:'price_bento', type:'one_time' },
  { key:'bingo-ladder', icon:'📊', name:'BINGO LADDER', desc:'FXステージ分析メソッド。', price:9800, priceId:'price_bingo', type:'one_time', featured:true },
  { key:'stage3d', icon:'🌐', name:'STAGE3D', desc:'相場ステージを3D空間で視覚化。', price:5900, priceId:'price_stage3d', type:'one_time' },
  { key:'dance-history', icon:'📖', name:'ダンスの歴史本', desc:'ストリートダンスの歴史書。会員は無料。', price:450, href:'https://casa-shindy.vercel.app/members/dance-history', type:'link', memberFree:true },
  { key:'dancing-quest', icon:'🎮', name:'Dancing Quest', desc:'ダンサー育成ゲーム。無料DL。', price:0, href:'/shop/dancing-quest/download', type:'free' },
  { key:'bingo-analyzer', icon:'📈', name:'BINGO ANALYZER PRO', desc:'チャート分析AIツール。会員無料。', price:3500, href:'/access/bingo-analyzer', type:'link', memberFree:true },
  { key:'word-street', icon:'📚', name:'WORD STREET', desc:'ストリートカルチャーで学ぶ英語。会員無料。', price:490, href:'/access/word-street', type:'link', memberFree:true },
  { key:'cosmic-calendar', icon:'🌙', name:'COSMIC CALENDAR', desc:'複合占いアプリ。会員無料。', price:490, href:'/access/cosmic-calendar', type:'link', memberFree:true },
  { key:'kokushi', icon:'📜', name:'国史年表', desc:'日本史インタラクティブタイムライン。会員無料。', price:490, href:'/access/kokushi', type:'link', memberFree:true },
  { key:'bgm-mix-studio', icon:'🎚️', name:'BGM MIX STUDIO', desc:'ダンス公演用BGM編集ソフト(Mac)。クロスフェード・BPM自動検出&タイムストレッチ・トラックFX・ナレーション機能。', price:0, href:'/shop/bgm-mix-studio/download', type:'member-only', membersOnly:true, previewImage:'/previews/bgm-mix-studio-preview.png' },
]

export default function ShopPage() {
  const [loading, setLoading] = useState(null)

  const handleBuy = async (product: any) => {
    if (product.type === 'free') { window.location.href = product.href; return }
    if (product.type === 'member-only') { window.location.href = product.href; return }
    if (product.type === 'link') { window.open(product.href, '_blank'); return }
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
    <main style={{ minHeight:'100vh', background:'#080808', fontFamily:'sans-serif' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.4rem 4rem', background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <a href="/" style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa Shindy</a>
        <a href="/members" style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>Members</a>
      </nav>
      <div style={{ padding:'6rem 4rem', maxWidth:960, margin:'0 auto' }}>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', fontWeight:300, color:'#f8f6f2', marginBottom:'3rem' }}>Shop</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2px' }}>
          {PRODUCTS.map((p) => (
            <div key={p.key} style={{ background: p.featured ? 'linear-gradient(160deg,#1a1008,#161616)' : '#0d0d0d', padding:'2.5rem 2rem', display:'flex', flexDirection:'column', position:'relative', border: p.featured ? '1px solid rgba(201,169,110,0.18)' : 'none' }}>
              {p.memberFree && <span style={{ position:'absolute', top:'1rem', right:'1rem', fontSize:'0.55rem', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.4)', padding:'0.2rem 0.5rem' }}>Members Free</span>}
              {p.membersOnly && <span style={{ position:'absolute', top:'1rem', right:'1rem', fontSize:'0.55rem', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.4)', padding:'0.2rem 0.5rem' }}>Members Only</span>}
              {p.previewImage && (
                <img src={p.previewImage} alt={p.name} style={{ width:'100%', aspectRatio:'16/10', objectFit:'cover', marginBottom:'1.2rem', border:'1px solid rgba(255,255,255,0.08)' }} />
              )}
              <span style={{ fontSize:'2rem', marginBottom:'1.2rem', display:'block' }}>{p.icon}</span>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color: p.featured ? '#c9a96e' : '#f8f6f2', marginBottom:'0.5rem' }}>{p.name}</div>
              <p style={{ fontSize:'0.73rem', lineHeight:1.9, color:'rgba(248,246,242,0.4)', marginBottom:'1.5rem', flex:1 }}>{p.desc}</p>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.8rem', color:'#c9a96e', marginBottom:'1.2rem' }}>
                {p.type === 'member-only' ? '会員限定' : p.price === 0 ? 'Free' : "¥" + p.price.toLocaleString()}
                {p.memberFree && <span style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.35)', marginLeft:'0.5rem', fontStyle:'normal' }}>(Members: Free)</span>}
              </div>
              <button onClick={() => handleBuy(p)} disabled={loading === p.key} style={{ background: (p.price === 0 || p.type === 'member-only') ? 'transparent' : 'linear-gradient(135deg,#c9a96e,#e8c98a)', color: (p.price === 0 || p.type === 'member-only') ? '#c9a96e' : '#080808', fontSize:'0.62rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem', border: (p.price === 0 || p.type === 'member-only') ? '1px solid rgba(201,169,110,0.4)' : 'none', cursor:'pointer', fontWeight:'bold' }}>
                {loading === p.key ? '...' : p.type === 'member-only' ? '会員ページへ' : p.price === 0 ? 'Free Download' : p.type === 'link' ? 'Open' : 'Buy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}