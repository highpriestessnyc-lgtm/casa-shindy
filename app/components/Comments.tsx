'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true }).then(({ data }) => {
      if (data) setComments(data)
    })
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setLoading(true)
    const { data, error } = await supabase.from('comments').insert({ post_id: postId, name, content }).select().single()
    if (!error && data) {
      setComments(prev => [...prev, data])
      setContent('')
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    }
    setLoading(false)
  }

  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.8rem', fontSize:'0.82rem', outline:'none', display:'block', marginBottom:'0.8rem', fontFamily:'sans-serif' } as React.CSSProperties

  return (
    <div style={{ marginTop:'2rem', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'1.5rem' }}>
      <div style={{ fontSize:'0.55rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.3)', marginBottom:'1.5rem', textTransform:'uppercase' }}>
        Comments {comments.length > 0 && `(${comments.length})`}
      </div>

      {/* コメント一覧 */}
      {comments.map((c: any) => (
        <div key={c.id} style={{ borderLeft:'2px solid rgba(255,255,255,0.07)', paddingLeft:'1rem', marginBottom:'1.2rem' }}>
          <div style={{ display:'flex', gap:'0.8rem', alignItems:'baseline', marginBottom:'0.3rem' }}>
            <span style={{ fontSize:'0.78rem', color:'#f8f6f2', fontWeight:'bold' }}>{c.name}</span>
            <span style={{ fontSize:'0.58rem', color:'rgba(248,246,242,0.25)' }}>{new Date(c.created_at).toLocaleDateString('ja-JP')}</span>
          </div>
          <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.55)', lineHeight:1.8 }}>{c.content}</p>
        </div>
      ))}

      {/* コメントフォーム */}
      <form onSubmit={handleSubmit} style={{ marginTop:'1.5rem', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', padding:'1.2rem' }}>
        <div style={{ fontSize:'0.55rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.3)', marginBottom:'1rem', textTransform:'uppercase' }}>Leave a Comment</div>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="お名前" required style={inp} />
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="コメントを書く..." required rows={3} style={{ ...inp, resize:'vertical' as const }} />
        {sent && <div style={{ fontSize:'0.72rem', color:'#1db843', marginBottom:'0.8rem' }}>コメントを送信しました！</div>}
        <button type="submit" disabled={loading} style={{ background:'transparent', color:'rgba(248,246,242,0.4)', fontSize:'0.62rem', letterSpacing:'0.2em', padding:'0.6rem 1.2rem', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer' }}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
