import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

async function checkAuth() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
  if (!profile?.is_member && user.email !== 'high.priestess.nyc@gmail.com') redirect('/join')
}

import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function BooksPage() {
  await checkAuth()
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'books')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <a href="/members" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em' }}>← メンバーページへ</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>文庫・漫画</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
          {posts?.map((post: any) => (
            <div key={post.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.3)', marginBottom:'0.8rem' }}>
                {new Date(post.created_at).toLocaleDateString('ja-JP')}
              </div>
              <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>{post.title}</h2>
              <p style={{ fontSize:'0.85rem', lineHeight:2, color:'rgba(248,246,242,0.6)', whiteSpace:'pre-wrap' }}>{post.content}</p>
            </div>
          ))}
          {!posts?.length && (
            <div style={{ textAlign:'center', padding:'4rem', color:'rgba(248,246,242,0.3)', fontSize:'0.85rem' }}>まだ投稿がありません</div>
          )}
        </div>
      </div>
    </main>
  )
}