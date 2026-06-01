'use client'
import { useState, Suspense } from 'react'
import { getSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/members'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = getSupabase()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push(redirect)
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', fontFamily:"'Didact Gothic',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:420, border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', textAlign:'center', display:'block', marginBottom:'2rem', textDecoration:'none' }}>
          Casa <span style={{ color:'#c9a96e' }}>Shindy</span>
        </Link>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.8rem', color:'#f8f6f2', textAlign:'center', marginBottom:'2rem', fontWeight:300 }}>ログイン</h1>
        {error && <div style={{ background:'rgba(217,64,48,0.1)', border:'1px solid rgba(217,64,48,0.3)', color:'#d94030', padding:'0.8rem', fontSize:'0.75rem', marginBottom:'1.2rem' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>メールアドレス</label>
          <input style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.85rem', outline:'none', marginBottom:'1.2rem', fontFamily:"'Didact Gothic',sans-serif", display:'block' }} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>パスワード</label>
          <input style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.85rem', outline:'none', marginBottom:'1.5rem', fontFamily:"'Didact Gothic',sans-serif", display:'block' }} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading} style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase' as const, padding:'1rem', border:'none', cursor:'pointer', fontFamily:"'Didact Gothic',sans-serif", fontWeight:'bold' as const, opacity: loading ? 0.7 : 1 }}>
            {loading ? '...' : 'ログイン'}
          </button>
        </form>
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <Link href="/auth/signup" style={{ fontSize:'0.65rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>アカウントをお持ちでない方 → 新規登録</Link>
        </div>
        <div style={{ textAlign:'center', marginTop:'0.8rem' }}>
          <Link href="/join" style={{ fontSize:'0.65rem', letterSpacing:'0.2em', color:'#c9a96e', textDecoration:'none' }}>メンバー登録 ¥500/月</Link>
        </div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}
