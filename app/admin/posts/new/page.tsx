'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'
const CATS = [
  { value:'soliloquy', label:'Soliloquy' },
  { value:'market', label:'Market' },
  { value:'movies', label:'Movies' },
  { value:'books', label:'Books' },
  { value:'four_stance', label:'4 Stance' },
]
export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('soliloquy')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabase()
    const { error } = await supabase.from('posts').insert({ title, content, category, is_published: isPublished })
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin'), 1500)
  }
  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' } as React.CSSProperties
  if (done) return <div style={{ textAlign:'center', paddingTop:'5rem', color:'#f8f6f2', fontSize:'1.5rem' }}>Posted!</div>
  return (
    <div style={{ maxWidth:720 }}>
      <h1 style={{ fontSize:'2rem', color:'#f8f6f2', marginBottom:'2rem' }}>New Post</h1>
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{ ...inp, cursor:'pointer' }}>
          {CATS.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Title" style={inp} />
        <textarea value={content} onChange={e=>setContent(e.target.value)} required placeholder="Content..." rows={16} style={{ ...inp, resize:'vertical' as const }} />
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
          <input type="checkbox" checked={isPublished} onChange={e=>setIsPublished(e.target.checked)} />
          <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>Publish now</span>
        </div>
        <button type="submit" disabled={loading} style={{ background:'#c9a96e', color:'#080808', padding:'1rem 2.5rem', border:'none', cursor:'pointer', fontWeight:'bold' }}>
          {loading ? '...' : 'Post'}
        </button>
      </form>
    </div>
  )
}