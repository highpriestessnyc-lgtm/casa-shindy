'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('パスワードが一致しません'); return }
    if (password.length < 6) { setError('6文字以上で入力してください'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
  }

  if (done) return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif' }}>
      <div style={{ textAlign:'center', color:'#f8f6f2' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
        <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.5rem', marginBottom:'1rem', fontWeight:300 }}>パスワードを変更しました</h2>
        <a href="/auth/login" style={{ color:'#c9a96e', textDecoration:'none', fontSize:'0.85rem' }}>ログインする →</a>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:420, background:'#111', padding:'3rem', border:'1px solid rgba(255,255,255,0.07)' }}>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.5rem', color:'#c9a96e', textAlign:'center', marginBottom:'0.5rem' }}>Casa Shindy</h1>
        <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)', textAlign:'center', marginBottom:'2rem' }}>新しいパスワードを設定</p>
        {error && <div style={{ color:'#e84040', fontSize:'0.8rem', marginBottom:'1rem', padding:'0.8rem', background:'rgba(232,64,64,0.1)', border:'1px solid rgba(232,64,64,0.3)' }}>{error}</div>}
        <form onSubmit={handleUpdate}>
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>新しいパスワード</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="6文字以上"
            style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' }} />
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>確認</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required placeholder="もう一度入力"
            style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1.5rem' }} />
          <button type="submit" disabled={loading}
            style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'1rem', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'0.9rem' }}>
            {loading ? '...' : 'パスワードを変更する'}
          </button>
        </form>
      </div>
    </main>
  )
}
