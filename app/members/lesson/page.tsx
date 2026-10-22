'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSupabaseBrowser } from '@/lib/supabase'

// ログイン状態はCookieに入っているので、Cookieを読めるブラウザ用クライアントを使う
const supabase = getSupabaseBrowser()

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

// 非会員が動画を見ようとした時だけ出す有料案内。サムネイルは見せて、再生ボタンの位置に案内を重ねる。
function Paywall({ url, isLoggedIn }: { url?: string; isLoggedIn: boolean }) {
  const videoId = url?.includes('youtu.be/')
    ? url.split('youtu.be/')[1].split('?')[0]
    : url?.includes('watch?v=')
    ? url.split('watch?v=')[1].split('&')[0]
    : null
  const joinHref = isLoggedIn ? '/join' : '/auth/login?redirect=/join'
  return (
    <div style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', background:'#000' }}>
      {videoId && <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.35, filter:'blur(2px)' }} />}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'1.5rem', background:'rgba(8,8,8,0.55)' }}>
        <div style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'0.8rem' }}>Members Only</div>
        <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', marginBottom:'0.5rem' }}>この動画は会員限定です</div>
        <div style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.7)', lineHeight:1.8, marginBottom:'1.4rem' }}>月額 ¥500 で、毎月のダンスレッスン動画がすべて見られます。<br />いつでも解約できます。</div>
        <Link href={joinHref} style={{ background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem 2rem', textDecoration:'none', fontWeight:'bold' }}>¥500/月で見る →</Link>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const [lessons, setLessons] = useState<any[]>([])
  const [joinedAt, setJoinedAt] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setIsLoggedIn(true)
      if (user.email === 'high.priestess.nyc@gmail.com') {
        setIsAdmin(true)
        return
      }
      const { data: profile } = await supabase.from('profiles').select('created_at, is_member').eq('id', user.id).single()
      if (profile) {
        setJoinedAt(profile.created_at)
        setIsMember(!!profile.is_member)
      }
    })
    supabase.from('lessons').select('*').eq('is_published', true).order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setLessons(data)
    })
  }, [])

  const canWatch = (lessonDate: string) => {
    if (isAdmin) return true
    if (!isMember || !joinedAt) return false
    const l = new Date(lessonDate)
    const j = new Date(joinedAt)
    return l.getFullYear() > j.getFullYear() || (l.getFullYear() === j.getFullYear() && l.getMonth() >= j.getMonth())
  }

  return (
    <div style={{ padding:'3rem', background:'#080808', minHeight:'100vh' }}>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,4vw,3rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>Monthly Dance Lesson</h1>
      <div style={{ width:40, height:2, background:'#c9a96e', marginBottom:'3rem' }}></div>
      <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
        {lessons.map((lesson: any) => (
          <article key={lesson.id} style={{ background:'linear-gradient(135deg,#111,#0d0d0d)', border:'1px solid rgba(201,169,110,0.15)', borderLeft:`3px solid ${canWatch(lesson.created_at) ? '#c9a96e' : 'rgba(255,255,255,0.1)'}`, padding:'2rem 2.5rem', boxShadow:'0 4px 24px rgba(0,0,0,0.4)', opacity: canWatch(lesson.created_at) || !isMember ? 1 : 0.5 }}>
            <div style={{ fontSize:'0.75rem', letterSpacing:'0.3em', color:'#c9a96e', opacity:0.7, marginBottom:'0.8rem' }}>
              {new Date(lesson.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric' })}
            </div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', marginBottom:'1.2rem', fontWeight:300 }}>{lesson.title}</h2>
            {lesson.description && <p style={{ fontSize:'0.85rem', lineHeight:2, color:'rgba(248,246,242,0.6)', marginBottom:'1.5rem' }}>{lesson.description}</p>}
            {canWatch(lesson.created_at) ? (
              lesson.video_url && <LazyVideo url={lesson.video_url} />
            ) : !isMember ? (
              <Paywall url={lesson.video_url} isLoggedIn={isLoggedIn} />
            ) : (
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🔒</div>
                <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', letterSpacing:'0.1em' }}>
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