'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'
export default function NewLessonPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabase()
    const { error } = await supabase.from('lessons').insert({ title, description, video_url: videoUrl, is_published: isPublished })
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin'), 1500)
  }
  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem 1rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' } as React.CSSProperties
  if (done) return <div style={{ textAlign:'center', paddingTop:'5rem', color:'#f8f6f2', fontSize:'1.5rem' }}>Saved!</div>
  return (
    <div style={{ maxWidth:720 }}>
      <h1 style={{ fontSize:'2rem', color:'#f8f6f2', marginBottom:'2rem' }}>New Lesson</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Title e.g. Vol.1 Basic Step" style={inp} />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description..." rows={4} style={{ ...inp, resize:'vertical' as const }} />
        <input type="url" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." style={inp} />
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
          <input type="checkbox" checked={isPublished} onChange={e=>setIsPublished(e.target.checked)} />
          <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>Publish now</span>
        </div>
        <button type="submit" disabled={loading} style={{ background:'#c9a96e', color:'#080808', padding:'1rem 2.5rem', border:'none', cursor:'pointer', fontWeight:'bold' }}>
          {loading ? '...' : 'Save'}
        </button>
      </form>
    </div>
  )
}