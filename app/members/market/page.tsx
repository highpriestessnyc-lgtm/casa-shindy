import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function MarketPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const isAdmin = user.email === 'high.priestess.nyc@gmail.com'
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) redirect('/join')
  }
  const { data: posts } = await supabase.from('posts').select('*').eq('category', 'market').eq('is_published', true).order('created_at', { ascending: false })
  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <a href="/members" style={{ color:'rgba(248,246,242,0.4)', textDecoration:'none', fontSize:'0.7rem' }}>← Back</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>相場配信</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
          {posts?.map((post: any) => (
            <div key={post.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem' }}>
              <div style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.3)', marginBottom:'0.8rem' }}>{new Date(post.created_at).toLocaleDateString('ja-JP')}</div>
              <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>{post.title}</h2>
              <p style={{ fontSize:'0.85rem', lineHeight:2, color:'rgba(248,246,242,0.6)', whiteSpace:'pre-wrap' }}>{post.content}</p>
            </div>
          ))}
          {!posts?.length && <div style={{ textAlign:'center', padding:'4rem', color:'rgba(248,246,242,0.3)' }}>まだ投稿がありません</div>}
        </div>
      </div>
    </main>
  )
}
