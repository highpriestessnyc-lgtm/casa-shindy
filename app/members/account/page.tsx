'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function AccountPage() {
  const [loading, setLoading] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const handleCancel = async () => {
    if (!confirm('本当に解約しますか？解約後はメンバーコンテンツにアクセスできなくなります。')) return
    setLoading(true)
    const res = await fetch('/api/stripe/cancel', { method: 'POST' })
    const { error } = await res.json()
    if (error) { alert(error); setLoading(false); return }
    setCancelled(true)
  }

  const handleLogout = async () => {
    const supabase = createClient(
      'https://gebjrhwfaoyjgmysplhb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
    )
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (cancelled) return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif' }}>
      <div style={{ textAlign:'center', color:'#f8f6f2' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
        <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.5rem', marginBottom:'1rem', fontWeight:300 }}>解約しました</h2>
        <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.4)', marginBottom:'2rem' }}>またいつでも戻ってきてください。</p>
        <a href="/" style={{ color:'#c9a96e', textDecoration:'none', fontSize:'0.8rem' }}>トップへ →</a>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>
        <a href="/members" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em' }}>← メンバーページへ</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>アカウント</h1>

        {/* メンバーシップ */}
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', marginBottom:'1rem', background:'#111' }}>
          <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'1rem' }}>Membership</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Casa Shindy メンバー</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)' }}>¥500 / 月</div>
            </div>
            <span style={{ fontSize:'0.6rem', padding:'0.3rem 0.8rem', border:'1px solid rgba(29,184,67,0.4)', color:'#1db843' }}>Active</span>
          </div>
        </div>

        {/* ログアウト */}
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', marginBottom:'1rem', background:'#111' }}>
          <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.4)', marginBottom:'1rem' }}>Account</div>
          <button onClick={handleLogout} style={{ background:'transparent', color:'rgba(248,246,242,0.6)', fontSize:'0.75rem', border:'1px solid rgba(255,255,255,0.07)', padding:'0.7rem 1.5rem', cursor:'pointer' }}>
            ログアウト
          </button>
        </div>

        {/* 解約 */}
        <div style={{ border:'1px solid rgba(217,64,48,0.2)', padding:'2rem', background:'rgba(217,64,48,0.03)' }}>
          <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(217,64,48,0.6)', marginBottom:'1rem' }}>Danger Zone</div>
          <p style={{ fontSize:'0.78rem', color:'rgba(248,246,242,0.4)', lineHeight:1.8, marginBottom:'1.5rem' }}>
            解約するとメンバーコンテンツへのアクセスができなくなります。解約後の返金はありません。
          </p>
          <button onClick={handleCancel} disabled={loading} style={{ background:'transparent', color:'#d94030', fontSize:'0.75rem', border:'1px solid rgba(217,64,48,0.4)', padding:'0.7rem 1.5rem', cursor:'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? '処理中...' : 'メンバーシップを解約する'}
          </button>
        </div>

        <div style={{ marginTop:'2rem', textAlign:'center' }}>
          <a href="/legal" style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.25)', textDecoration:'none' }}>特定商取引法に基づく表記</a>
        </div>
      </div>
    </main>
  )
}