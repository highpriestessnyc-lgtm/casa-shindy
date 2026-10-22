'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

export default function EditArtworkPage() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [description, setDescription] = useState('')
  const [isSold, setIsSold] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    supabase.from('artworks').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setTitle(data.title)
        setImageUrl(data.image_url || '')
        setPrice(data.price?.toString() || '')
        setSize(data.size || '')
        setDescription(data.description || '')
        setIsSold(data.is_sold)
      }
      setFetching(false)
    })
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('artworks').update({
      title, image_url: imageUrl, price: parseInt(price), size, description, is_sold: isSold
    }).eq('id', id)
    if (error) { alert(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/admin/artworks'), 1500)
  }

  const handleDelete = async () => {
    if (!confirm('削除しますか？')) return
    await supabase.from('artworks').delete().eq('id', id)
    router.push('/admin/artworks')
  }

  const uploadImage = async (file: File) => {
    const ext = file.name.split('.').pop()
    const path = `artworks/${Date.now()}.${ext}`
    await supabase.storage.from('images').upload(path, file, { upsert: true })
    const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
    setImageUrl(pub.publicUrl)
  }

  const inp = { width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.1)', color:'#f8f6f2', padding:'0.9rem', fontSize:'0.9rem', outline:'none', display:'block', marginBottom:'1rem' } as React.CSSProperties

  if (fetching) return <div style={{ color:'#f8f6f2', padding:'3rem' }}>読み込み中...</div>
  if (done) return <div style={{ textAlign:'center', paddingTop:'5rem', color:'#f8f6f2', fontSize:'1.5rem' }}>保存しました！</div>

  return (
    <div style={{ maxWidth:720 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>作品を編集</h1>
        <button onClick={handleDelete} style={{ background:'rgba(217,64,48,0.15)', color:'#d94030', fontSize:'0.65rem', padding:'0.6rem 1.2rem', border:'1px solid rgba(217,64,48,0.3)', cursor:'pointer' }}>削除</button>
      </div>
      <form onSubmit={handleSave}>
        <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>タイトル</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required style={inp} />

        <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>画像（ファイルアップロード or URL）</label>
        <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} style={{ ...inp, padding:'0.5rem', cursor:'pointer' }} />
        {imageUrl && <img src={imageUrl} alt="" style={{ width:'100%', maxHeight:200, objectFit:'cover', marginBottom:'1rem' }} />}
        <input type="url" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="または画像URLを直接入力..." style={inp} />

        <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>価格（円）</label>
        <input type="number" value={price} onChange={e=>setPrice(e.target.value)} style={inp} />

        <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>サイズ</label>
        <input type="text" value={size} onChange={e=>setSize(e.target.value)} placeholder="例：F6 (410×318mm)" style={inp} />

        <label style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.4)', display:'block', marginBottom:'0.5rem' }}>説明</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} style={{ ...inp, resize:'vertical' as const }} />

        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2rem' }}>
          <input type="checkbox" checked={isSold} onChange={e=>setIsSold(e.target.checked)} style={{ width:16, height:16 }} />
          <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>SOLD OUT</span>
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