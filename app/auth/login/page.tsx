'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient(
      'https://gebjrhwfaoyjgmysplhb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
    )
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    window.location.href = redirect
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:400, background:'#111', padding:'3rem', border:'1px solid rgba(255,255,255,0.07)' }}>
        <h1 style={{ color:'#c9a96e', fontFamily:'serif', fontStyle:'italic', fontSize:'1.5rem', textAlign:'center', marginBottom:'2rem' }}>Casa Shindy</h1>
        {error && <div style={{ background:'rgba(217,64,48,0.2)', color:'#ff6b6b', padding:'0.8rem', marginBottom:'1rem', fontSize:'0.8rem' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email" style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' }} />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Password" style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1.5rem' }} />
          <button type="submit" disabled={loading} style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'1rem', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'0.9rem' }}>
            {loading ? '...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}