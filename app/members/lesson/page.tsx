import { createSupabaseServerClient } from '@/lib/supabase-server'

async function checkAuth() {
  const { createSupabaseServerClient } = await import('@/lib/supabase-server')
  const { redirect } = await import('next/navigation')
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
  if (!profile?.is_member && user.email !== 'high.priestess.nyc@gmail.com') redirect('/join')
}

export default async function LessonPage() {
  await checkAuth()
  const supabase = await createSupabaseServerClient()
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <a href="/members" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em' }}>← メンバーページへ</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>Monthly Dance Lesson</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {lessons?.map((lesson: any) => (
            <div key={lesson.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.3)', marginBottom:'0.8rem' }}>
                {new Date(lesson.created_at).toLocaleDateString('ja-JP')}
              </div>
              <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>{lesson.title}</h2>
              {lesson.description && <p style={{ fontSize:'0.85rem', lineHeight:2, color:'rgba(248,246,242,0.6)', marginBottom:'1.5rem' }}>{lesson.description}</p>}
              {lesson.video_url && (
                <div style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden' }}>
                  <iframe
                    src={lesson.video_url.replace('watch?v=', 'embed/')}
                    style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
          {!lessons?.length && (
            <div style={{ textAlign:'center', padding:'4rem', color:'rgba(248,246,242,0.3)', fontSize:'0.85rem' }}>まだレッスンがありません</div>
          )}
        </div>
      </div>
    </main>
  )
}