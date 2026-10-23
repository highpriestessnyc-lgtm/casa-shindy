'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

interface UploadItem {
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  url?: string
  title: string
}

export default function BulkUploadPage() {
  const [items, setItems] = useState<UploadItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)

  const handleFiles = (files: FileList) => {
    const newItems: UploadItem[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      title: file.name.replace(/\.[^.]+$/, ''),
    }))
    setItems(prev => [...prev, ...newItems])
  }

  const updateTitle = (index: number, title: string) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, title } : item))
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const uploadAll = async () => {
    setUploading(true)
    for (let i = 0; i < items.length; i++) {
      if (items[i].status === 'done') continue
      setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'uploading' } : item))
      try {
        const file = items[i].file
        const ext = file.name.split('.').pop()
        const path = `artworks/${Date.now()}_${i}.${ext}`
        await supabase.storage.from('images').upload(path, file, { upsert: true })
        const { data: pub } = supabase.storage.from('images').getPublicUrl(path)
        const url = pub.publicUrl
        await supabase.from('artworks').insert({
          title: items[i].title || `作品${i + 1}`,
          image_url: url,
          is_published: true,
          is_sold: false,
        })
        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'done', url } : item))
      } catch {
        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'error' } : item))
      }
    }
    setUploading(false)
    setDone(true)
  }

  return (
    <div style={{ maxWidth:900 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>作品を一括アップロード</h1>
        <a href="/admin/artworks" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none' }}>← 一覧に戻る</a>
      </div>

      {/* ドロップゾーン */}
      <div
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        onDragOver={e => e.preventDefault()}
        onClick={() => document.getElementById('bulk-file-input')?.click()}
        style={{ border:'2px dashed rgba(201,169,110,0.3)', padding:'3rem', textAlign:'center', cursor:'pointer', marginBottom:'2rem', background:'rgba(201,169,110,0.03)' }}
      >
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🖼️</div>
        <div style={{ fontSize:'0.85rem', color:'rgba(248,246,242,0.4)' }}>画像をドロップ または クリックして選択</div>
        <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.25)', marginTop:'0.5rem' }}>複数枚同時に選択できます</div>
        <input id="bulk-file-input" type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => e.target.files && handleFiles(e.target.files)} />
      </div>

      {/* プレビュー一覧 */}
      {items.length > 0 && (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
            {items.map((item, i) => (
              <div key={i} style={{ background:'#111', border:`1px solid ${item.status === 'done' ? 'rgba(29,184,67,0.3)' : item.status === 'error' ? 'rgba(217,64,48,0.3)' : 'rgba(255,255,255,0.07)'}`, overflow:'hidden', position:'relative' }}>
                <img src={item.preview} alt="" style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }} />
                <div style={{ padding:'0.8rem' }}>
                  <input
                    value={item.title}
                    onChange={e => updateTitle(i, e.target.value)}
                    placeholder="タイトル"
                    style={{ width:'100%', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', color:'#f8f6f2', padding:'0.4rem 0.6rem', fontSize:'0.75rem', outline:'none' }}
                  />
                </div>
                <div style={{ position:'absolute', top:'0.5rem', right:'0.5rem', display:'flex', gap:'0.3rem' }}>
                  {item.status === 'done' && <span style={{ background:'rgba(29,184,67,0.8)', color:'#fff', fontSize:'0.6rem', padding:'0.2rem 0.4rem' }}>✓ 完了</span>}
                  {item.status === 'uploading' && <span style={{ background:'rgba(201,169,110,0.8)', color:'#080808', fontSize:'0.6rem', padding:'0.2rem 0.4rem' }}>↑ UP中</span>}
                  {item.status === 'error' && <span style={{ background:'rgba(217,64,48,0.8)', color:'#fff', fontSize:'0.6rem', padding:'0.2rem 0.4rem' }}>✗ エラー</span>}
                  {item.status === 'pending' && (
                    <button onClick={() => removeItem(i)} style={{ background:'rgba(0,0,0,0.6)', color:'rgba(255,255,255,0.6)', border:'none', fontSize:'0.7rem', padding:'0.2rem 0.5rem', cursor:'pointer' }}>✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {done ? (
            <div style={{ textAlign:'center', padding:'2rem' }}>
              <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🎉</div>
              <div style={{ color:'#1db843', marginBottom:'1rem' }}>アップロード完了！</div>
              <a href="/admin/artworks" style={{ color:'#c9a96e', textDecoration:'none', fontSize:'0.85rem' }}>作品一覧で確認する →</a>
            </div>
          ) : (
            <button onClick={uploadAll} disabled={uploading} style={{ width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'1.2rem', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'1rem', opacity: uploading ? 0.7 : 1 }}>
              {uploading ? 'アップロード中...' : `⚡ ${items.length}枚を一括アップロード`}
            </button>
          )}
        </>
      )}
    </div>
  )
}