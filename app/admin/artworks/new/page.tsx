'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

export default function NewArtworkPage() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [description, setDescription] = useState('')
  const [isSold, setIsSold] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const uploadImage = async (file: File) => {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `artworks/${Date.now()}.${ext}`
    await supabase.storage.from('images').upload(path, file, { upsert: true })
    const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
    setImageUrl(pub.publicUrl)
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('artworks').insert({
      title, image_url: imageUrl, price: parseInt(price), size, description, is_sold: isSold
    })
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin/artworks'), 1500)
  }

  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' } as React.CSSProperties
  const lbl = { fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }

  if (done) return <div style={{ textAlign:'center', paddingTop:'5rem', color:'#f8f6f2', fontSize:'1.5rem' }}>追加しました！</div>

  return (
    <div style={{ maxWidth:720 }}>
      <h1 style={{ fontSize:'2rem', color:'#f8f6f2', marginBottom:'2rem' }}>作品を追加</h1>
      <form onSubmit={handleSubmit}>
        <label style={lbl}>タイトル</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required placeholder="例：Pacific Morning" style={inp} />

        <label style={lbl}>画像アップロード</label>
        <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} style={{ ...inp, padding:'0.5rem', cursor:'pointer' }} />
        {uploading && <div style={{ fontSize:'0.75rem', color:'#c9a96e', marginBottom:'0.5rem' }}>アップロード中...</div>}
        {imageUrl && <img src={imageUrl} alt="" style={{ width:'100%', maxHeight:200, objectFit:'cover', marginBottom:'1rem', border:'1px solid rgba(255,255,255,0.07)' }} />}
        <label style={lbl}>または画像URLを直接入力</label>
        <input type="url" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="https://..." style={inp} />

        <label style={lbl}>価格（円）</label>
        <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required placeholder="48000" style={inp} />

        <label style={lbl}>サイズ</label>
        <input type="text" value={size} onChange={e=>setSize(e.target.value)} placeholder="例：F6 (410×318mm)" style={inp} />

        <label style={lbl}>説明</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="作品について..." style={{ ...inp, resize:'vertical' as const }} />

        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2rem' }}>
          <input type="checkbox" checked={isSold} onChange={e=>setIsSold(e.target.checked)} style={{ width:16, height:16 }} />
          <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>SOLD OUT</span>
        </div>

        <button type="submit" disabled={loading || uploading} style={{ background:'#c9a96e', color:'#080808', padding:'1rem 2.5rem', border:'none', cursor:'pointer', fontWeight:'bold' }}>
          {loading ? '追加中...' : '追加する'}
        </button>
      </form>
    </div>
  )
}