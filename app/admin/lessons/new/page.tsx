'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase'

export default function NewLessonPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabaseBrowser()
    const { error } = await supabase.from('lessons').insert({
      title,
      description,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      is_published: isPublished,
    })
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin/lessons'), 1200)
  }

  const inp = {
    width: '100%',
    background: '#0d0d0d',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8f6f2',
    padding: '0.9rem 1rem',
    fontSize: '0.9rem',
    outline: 'none',
    display: 'block',
    marginBottom: '1rem',
    boxSizing: 'border-box',
  } as React.CSSProperties

  if (done) return <div style={{ textAlign: 'center', paddingTop: '5rem', color: '#f8f6f2', fontSize: '1.5rem' }}>追加しました！</div>

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: '2rem', color: '#f8f6f2', marginBottom: '2rem' }}>新規レッスン追加</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(248,246,242,0.5)', display: 'block', marginBottom: '0.4rem' }}>タイトル *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Vol.1 Basic Step" style={inp} />

        <label style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(248,246,242,0.5)', display: 'block', marginBottom: '0.4rem' }}>説明文</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="レッスン内容の説明..." rows={4} style={{ ...inp, resize: 'vertical' as const }} />

        <label style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(248,246,242,0.5)', display: 'block', marginBottom: '0.4rem' }}>動画URL（YouTube / Vimeo）</label>
        <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." style={inp} />

        <label style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(248,246,242,0.5)', display: 'block', marginBottom: '0.4rem' }}>サムネイル画像（URL または ファイルアップロード）</label>
        <input type="url" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="https://..." style={inp} />
        <input type="file" accept="image/*" onChange={async e => {
          const file = e.target.files?.[0]
          if (!file) return
          const supabase = getSupabaseBrowser()
          const ext = file.name.split('.').pop()
          const path = `lessons/${Date.now()}.${ext}`
          const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
          if (!error) {
            const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
            setThumbnailUrl(pub.publicUrl)
          }
        }} style={{ ...inp, padding: '0.5rem', cursor: 'pointer' }} />

        {thumbnailUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <img src={thumbnailUrl} alt="thumbnail preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} id="pub" />
          <label htmlFor="pub" style={{ fontSize: '0.8rem', color: 'rgba(248,246,242,0.6)', cursor: 'pointer' }}>すぐに公開する</label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" disabled={loading} style={{ background: '#c9a96e', color: '#080808', padding: '1rem 2.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : '追加する'}
          </button>
          <button type="button" onClick={() => router.push('/admin/lessons')} style={{ background: 'transparent', color: 'rgba(248,246,242,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.5rem', cursor: 'pointer' }}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}
