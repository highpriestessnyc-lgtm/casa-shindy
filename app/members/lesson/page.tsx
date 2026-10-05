'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gebjrhwfaoyjgmysplhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmpyaHdmYW95amdteXNwbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM0MjAsImV4cCI6MjA5NTg2OTQyMH0.uvRUg94EYo5bKCFJFLjf_bEqA4607gToTDje4HjgauA'
)

function LazyVideo({ url }: { url: string }) {
  const [started, setStarted] = useState(false)
  const videoId = url.includes('youtu.be/')
    ? url.split('youtu.be/')[1].split('?')[0]
    : url.includes('watch?v=')
    ? url.split('watch?v=')[1].split('&')[0]
    : null
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  if (!videoId) return null
  return started ? (
    <div style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden' }}>
      <iframe src={embedUrl} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }} allowFullScreen allow="autoplay" />
    </div>
  ) : (
    <div onClick={() => setStarted(true)} style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', cursor:'pointer', background:'#000' }}>
      <img src={thumb} alt="video" style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.8 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:64, height:64, background:'rgba(201,169,110,0.9)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:'1.8rem', marginLeft:'6px' }}>▶</span>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const [lessons, setLessons] = useState<any[]>([])
  const [joinedAt, setJoinedAt] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      if (user.email === 'high.priestess.nyc@gmail.com') {
        setIsAdmin(true)
        return
      }
      const { data: profile } = await supabase.from('profiles').select('created_at').eq('id', user.id).single()
      if (profile) setJoinedAt(profile.created_at)
    })
    supabase.from('lessons').select('*').eq('is_published', true).order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setLessons(data)
    })
  }, [])

  const canWatch = (lessonDate: string) => {
    if (isAdmin) return true
    if (!joinedAt) return false
    return new Date(lessonDate) >= new Date(joinedAt)
  }

  return (
    <div style={{ padding:'3rem', background:'#080808', minHeight:'100vh' }}>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,4vw,3rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>Monthly Dance Lesson</h1>
      <div style={{ width:40, height:2, background:'#c9a96e', marginBottom:'3rem' }}></div>
      <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
        {lessons.map((lesson: any) => (
          <article key={lesson.id} style={{ background:'linear-gradient(135deg,#111,#0d0d0d)', border:'1px solid rgba(201,169,110,0.15)', borderLeft:`3px solid ${canWatch(lesson.created_at) ? '#c9a96e' : 'rgba(255,255,255,0.1)'}`, padding:'2rem 2.5rem', boxShadow:'0 4px 24px rgba(0,0,0,0.4)', opacity: canWatch(lesson.created_at) ? 1 : 0.5 }}>
            <div style={{ fontSize:'0.58rem', letterSpacing:'0.3em', color:'#c9a96e', opacity:0.7, marginBottom:'0.8rem' }}>
              {new Date(lesson.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric' })}
            </div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', marginBottom:'1.2rem', fontWeight:300 }}>{lesson.title}</h2>
            {lesson.description && <p style={{ fontSize:'0.85rem', lineHeight:2, color:'rgba(248,246,242,0.6)', marginBottom:'1.5rem' }}>{lesson.description}</p>}
            {canWatch(lesson.created_at) ? (
              lesson.video_url && <LazyVideo url={lesson.video_url} />
            ) : (
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🔒</div>
                <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.1em' }}>
                  {new Date(lesson.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long' })}の会員限定レッスンです
                </div>
              </div>
            )}
          </article>
        ))}
        {!lessons.length && <div style={{ textAlign:'center', padding:'5rem', color:'rgba(248,246,242,0.2)' }}>まだレッスンがありません</div>}
      </div>
    </div>
  )
}