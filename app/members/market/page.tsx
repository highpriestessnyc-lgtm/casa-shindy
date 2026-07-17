import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function MarketPage() {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase.from('posts').select('*').eq('category', 'market').eq('is_published', true).order('created_at', { ascending: false })
  return (
    <div style={{ padding:'3rem', background:'#080808', minHeight:'100vh' }}>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,4vw,3rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>相場配信</h1>
      <div style={{ width:40, height:2, background:'#1db843', marginBottom:'3rem' }}></div>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        {posts?.map((post: any) => (
          <article key={post.id} style={{
            background:'linear-gradient(135deg,#111,#0d0d0d)',
            border:'1px solid rgba(29,184,67,0.12)',
            borderLeft:'3px solid #1db843',
            padding:'2rem 2.5rem',
            position:'relative',
            boxShadow:'0 4px 24px rgba(0,0,0,0.4), inset 0 0 60px rgba(29,184,67,0.12)',
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,#1db843,transparent)' }}></div>
            <div style={{ fontSize:'0.58rem', letterSpacing:'0.3em', color:'#1db843', opacity:0.7, marginBottom:'0.8rem' }}>
              {new Date(post.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric' })}
            </div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', marginBottom:'1.2rem', fontWeight:300 }}>{post.title}</h2>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.6)', whiteSpace:'pre-wrap' }}>{post.content}</p>
          </article>
        ))}
        {!posts?.length && (
          <div style={{ textAlign:'center', padding:'5rem', color:'rgba(248,246,242,0.2)', fontSize:'0.85rem', border:'1px solid rgba(255,255,255,0.05)' }}>
            まだ投稿がありません
          </div>
        )}
      </div>
    </div>
  )
}
