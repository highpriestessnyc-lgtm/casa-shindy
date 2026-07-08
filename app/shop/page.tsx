'use client'
import { useState } from 'react'

const PRODUCTS = [
  { key:'kondate', icon:'🍱', name:'献立アプリ', desc:'毎日の献立をAIが提案。栄養バランス・家族の好みから最適メニューを生成。', price:490, href:'https://highpriestessnyc-lgtm.github.io/kondate-app/', type:'link' },
  { key:'bento', icon:'🥡', name:'弁当アプリ', desc:'お弁当レシピ管理・栄養計算・見た目コーディネート。', price:490, priceId:'price_bento', type:'one_time' },
  { key:'bingo-ladder', icon:'📊', name:'BINGO LADDER', desc:'SHINDYのFXステージ分析メソッド。TradingViewコード配布。Stage 0〜5の相場読みを体系化。', price:9800, priceId:'price_bingo', type:'one_time', featured:true },
  { key:'stage3d', icon:'🌐', name:'STAGE3D', desc:'相場ステージを3D空間で視覚化する分析ツール。', price:5900, href:'https://highpriestessnyc-lgtm.github.io/stage3d', type:'link' },
  { key:'dance-history', icon:'📖', name:'ダンスの歴史本', desc:'SHINDYが書いたストリートダンスの歴史書。PDF電子書籍。', price:450, priceId:'price_dance_history', type:'one_time' },
  { key:'dancing-quest', icon:'🎮', name:'Dancing Quest', desc:'SHINDYが作ったダンサー育成ゲーム。Casa Shindyで無料ダウンロード。', price:0, href:'/shop/dancing-quest/download', type:'free' },
  { key:'bingo-analyzer', icon:'📈', name:'BINGO ANALYZER PRO', desc:'BINGO LADDERのチャート分析AIツール。会員は無料。', price:3500, href:'https://bingo-analyzer-pro.vercel.app', type:'link', memberFree:true },
  { key:'word-street', icon:'📚', name:'WORD STREET', desc:'ストリートカルチャーで学ぶ英語アプリ。会員は無料。', price:490, href:'https://word-street-git-main-highpriestessnyc-1447s-projects.vercel.app', type:'link', memberFree:true },
  { key:'cosmic-calendar', icon:'🌙', name:'COSMIC CALENDAR', desc:'マヤ暦・算命学・四柱推命・西洋占星術の複合占いアプリ。会員は無料。', price:490, href:'https://cosmic-calendar-six.vercel.app', type:'link', memberFree:true },
  { key:'kokushi', icon:'📜', name:'国史年表', desc:'日本の歴史をインタラクティブに学べるタイムライン。会員は無料。', price:490, href:'https://highpriestessnyc-lgtm.github.io/kokushi/kokushi_nenpyou.html', type:'link', memberFree:true },
]

export default function ShopPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleBuy = async (product: typeof PRODUCTS[0]) => {
    if (product.type === 'free') { window.location.href = product.href!; return }
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
        <a href="/" style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></a>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          <a href="/members" style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>メンバーページ</a>
          <a href="/auth/login" style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>ログイン</a>
        </div>
      </nav>

      <div style={{ padding:'6rem 4rem', maxWidth:960, margin:'0 auto' }}>
        <span style={{ fontSize:'0.58rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Shop</span>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2', marginBottom:'0.5rem' }}>Apps & Tools</h1>
        <span style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)', letterSpacing:'0.15em', display:'block', marginBottom:'3rem' }}>★マークは会員無料 — <a href="/join" style={{ color:'#c9a96e', textDecoration:'none' }}>¥500/月で参加</a></span>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}></div>