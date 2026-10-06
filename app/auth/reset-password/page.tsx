'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://casa-shindy.vercel.app/auth/update-password'
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:420, background:'#111', padding:'3rem', border:'1px solid rgba(255,255,255,0.07)' }}>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.5rem', color:'#c9a96e', textAlign:'center', marginBottom:'0.5rem' }}>Casa Shindy</h1>
        <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)', textAlign:'center', marginBottom:'2rem' }}>パスワードのリセット</p>
        {sent ? (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✉️</div>
            <p style={{ fontSize:'0.85rem', color:'rgba(248,246,242,0.6)', lineHeight:1.8 }}>リセット用のメールを送信しました。<br/>メールボックスをご確認ください。</p>
            <a href="/auth/login" style={{ display:'block', marginTop:'2rem', fontSize:'0.65rem', color:'#c9a96e', textDecoration:'none', letterSpacing:'0.2em' }}>ログインに戻る</a>
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>メールアドレス</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="your@email.com"
              style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1.5rem' }} />
            <button type="submit" disabled={loading}
              style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'1rem', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'0.9rem' }}>
              {loading ? '...' : 'リセットメールを送る'}
            </button>
            <a href="/auth/login" style={{ display:'block', marginTop:'1.5rem', fontSize:'0.65rem', color:'rgba(248,246,242,0.3)', textDecoration:'none', letterSpacing:'0.1em', textAlign:'center' }}>ログインに戻る</a>
          </form>
        )}
      </div>
    </main>
  )
}
