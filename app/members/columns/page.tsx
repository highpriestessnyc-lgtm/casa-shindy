'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Comments from '@/app/components/Comments'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

const TABS = [
  { key:'soliloquy', label:'独り言', icon:'✍️', accent:'#c9a96e', bg:'rgba(201,169,110,0.12)' },
  { key:'market', label:'相場配信', icon:'📈', accent:'#1db843', bg:'rgba(29,184,67,0.12)' },
  { key:'movies', label:'映画', icon:'🎬', accent:'#9b59b6', bg:'rgba(155,89,182,0.12)' },
  { key:'books', label:'文庫・漫画', icon:'📚', accent:'#3498db', bg:'rgba(52,152,219,0.12)' },
  { key:'four_stance', label:'4スタンス', icon:'🕺', accent:'#e74c3c', bg:'rgba(231,76,60,0.12)' },
]

export default function ColumnsPage() {
  const [activeTab, setActiveTab] = useState('soliloquy')
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase.from('posts').select('*').eq('category', activeTab).eq('is_published', true).order('created_at', { ascending: false }).then(({ data }) => {
      setPosts(data || [])
      setLoading(false)
    })
  }, [activeTab])

  const tab = TABS.find(t => t.key === activeTab)!

  return (
    <div style={{ padding:'2rem 3rem', background:'#080808', minHeight:'100vh', fontFamily:'sans-serif' }}>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'2rem' }}>Columns</h1>

      {/* タブ */}
      <div style={{ display:'flex', gap:'2px', marginBottom:'2rem', overflowX:'auto', paddingBottom:'4px' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            background: activeTab === t.key ? t.bg : 'transparent',
            color: activeTab === t.key ? t.accent : 'rgba(248,246,242,0.35)',
            border: `1px solid ${activeTab === t.key ? t.accent + '44' : 'rgba(255,255,255,0.07)'}`,
            padding:'0.6rem 1.2rem',
            fontSize:'0.72rem',
            letterSpacing:'0.1em',
            cursor:'pointer',
            whiteSpace:'nowrap',
            transition:'all 0.2s',
            fontFamily:'sans-serif',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* 記事一覧 */}
      {loading ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'rgba(248,246,242,0.2)' }}>読み込み中...</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {posts.map((post: any) => (
            <article key={post.id} style={{
              background:'linear-gradient(135deg,#111,#0d0d0d)',
              border:`1px solid ${tab.bg}`,
              borderLeft:`3px solid ${tab.accent}`,
              padding:'2rem 2.5rem',
              position:'relative',
              boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,${tab.accent},transparent)` }} />
              <div style={{ fontSize:'0.75rem', letterSpacing:'0.3em', color:tab.accent, opacity:0.7, marginBottom:'0.8rem' }}>
                {new Date(post.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric' })}
              </div>
              <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', marginBottom:'1.2rem', fontWeight:300 }}>{post.title}</h2>
              {post.image_url && (
                <div style={{ marginBottom:'1.5rem', overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)' }}>
                  <img src={post.image_url} alt={post.title} style={{ width:'100%', maxHeight:400, objectFit:'cover', display:'block' }} />
                </div>
              )}
              <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.6)', whiteSpace:'pre-wrap' }}>{post.content}</p>
              {post.video_url && (
                <div style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', marginTop:'1.5rem' }}>
                  <iframe src={post.video_url.includes('youtube.com/watch') ? post.video_url.replace('watch?v=', 'embed/') : post.video_url} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }} allowFullScreen />
                </div>
              )}
              <Comments postId={post.id} />
            </article>
          ))}
          {!posts.length && !loading && (
            <div style={{ textAlign:'center', padding:'5rem', color:'rgba(248,246,242,0.2)', border:'1px solid rgba(255,255,255,0.05)' }}>まだ投稿がありません</div>
          )}
        </div>
      )}
    </div>
  )
}