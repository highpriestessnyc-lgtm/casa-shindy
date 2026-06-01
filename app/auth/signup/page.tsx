'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = getSupabase()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: appUrl + '/auth/callback' }
    })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
  }

  if (done) return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', fontFamily:"'Didact Gothic',sans-serif" }}>
      <div style={{ maxWidth:420, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✉️</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.5rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>確認メールを送信しました</h2>
        <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)', lineHeight:1.8, marginBottom:'2rem' }}>{email} に確認メールを送りました。リンクをクリックして登録を完了してください。</p>
        <Link href="/join" style={{ background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem 2rem', textDecoration:'none', display:'inline-block' }}>メンバー登録へ ¥500/月</Link>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', fontFamily:"'Didact Gothic',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:420, border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', textAlign:'center', display:'block', marginBottom:'2rem', textDecoration:'none' }}>
          Casa <span style={{ color:'#c9a96e' }}>Shindy</span>
        </Link>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.8rem', color:'#f8f6f2', textAlign:'center', marginBottom:'2rem', fontWeight:300 }}>新規登録</h1>
        {error && <div style={{ background:'rgba(217,64,48,0.1)', border:'1px solid rgba(217,64,48,0.3)', color:'#d94030', padding:'0.8rem', fontSize:'0.75rem', marginBottom:'1.2rem' }}>{error}</div>}
        <form onSubmit={handleSignup}>
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>メールアドレス</label>
          <input style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.85rem', outline:'none', marginBottom:'1.2rem', fontFamily:"'Didact Gothic',sans-serif", display:'block' }} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>パスワード（8文字以上）</label>
          <input style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.85rem', outline:'none', marginBottom:'1.5rem', fontFamily:"'Didact Gothic',sans-serif", display:'block' }} type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
          <button disabled={loading} style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, padding:'1rem', border:'none', cursor:'pointer', fontFamily:"'Didact Gothic',sans-serif", fontWeight:'bold' as const, opacity: loading ? 0.7 : 1 }}>
            {loading ? '...' : 'アカウントを作成'}
          </button>
        </form>
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <Link href="/auth/login" style={{ fontSize:'0.65rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>すでにアカウントをお持ちの方 → ログイン</Link>
        </div>
      </div>
    </main>
  )
}
