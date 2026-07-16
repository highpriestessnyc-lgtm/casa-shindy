'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

const CATS = [
  { value:'soliloquy', label:'シンディの独り言' },
  { value:'market', label:'相場配信' },
  { value:'movies', label:'映画の部屋' },
  { value:'books', label:'文庫・漫画' },
  { value:'four_stance', label:'4スタンス談義' },
]

export default function EditPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('soliloquy')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setTitle(data.title)
        setContent(data.content)
        setCategory(data.category)
        setIsPublished(data.is_published)
      }
      setFetching(false)
    })
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('posts').update({ title, content, category, is_published: isPublished }).eq('id', id)
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin/posts'), 1500)
  }

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return
    await supabase.from('posts').delete().eq('id', id)
    router.push('/admin/posts')
  }

  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' } as React.CSSProperties

  if (fetching) return <div style={{ color:'#f8f6f2', padding:'3rem' }}>読み込み中...</div>
  if (done) return <div style={{ textAlign:'center', paddingTop:'5rem', color:'#f8f6f2', fontSize:'1.5rem' }}>保存しました！</div>

  return (
    <div style={{ maxWidth:720 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>投稿を編集</h1>
        <button onClick={handleDelete} style={{ background:'rgba(217,64,48,0.15)', color:'#d94030', fontSize:'0.65rem', letterSpacing:'0.2em', padding:'0.6rem 1.2rem', border:'1px solid rgba(217,64,48,0.3)', cursor:'pointer' }}>削除</button>
      </div>
      <form onSubmit={handleSave}>
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{ ...inp, cursor:'pointer' }}>
          {CATS.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required placeholder="タイトル" style={inp} />
        <textarea value={content} onChange={e=>setContent(e.target.value)} required rows={20} style={{ ...inp, resize:'vertical' as const, lineHeight:1.8 }} />
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
          <input type="checkbox" checked={isPublished} onChange={e=>setIsPublished(e.target.checked)} style={{ width:16, height:16 }} />
          <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>公開する</span>
        </div>
        <div style={{ display:'flex', gap:'1rem' }}>
          <button type="submit" disabled={loading} style={{ background:'#c9a96e', color:'#080808', padding:'1rem 2.5rem', border:'none', cursor:'pointer', fontWeight:'bold' }}>
            {loading ? '保存中...' : '保存する'}
          </button>
          <button type="button" onClick={() => router.back()} style={{ background:'transparent', color:'rgba(248,246,242,0.4)', padding:'1rem 1.5rem', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer' }}>キャンセル</button>
        </div>
      </form>
    </div>
  )
}