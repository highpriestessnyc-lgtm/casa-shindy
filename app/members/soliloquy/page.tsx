import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function SoliloquyPage() {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase.from('posts').select('*').eq('category', 'soliloquy').eq('is_published', true).order('created_at', { ascending: false })
  return (
    <div style={{ padding:'3rem', background:'#080808', minHeight:'100vh' }}>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(2rem,4vw,3rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>シンディの独り言</h1>
      <div style={{ width:40, height:2, background:'#c9a96e', marginBottom:'3rem' }}></div>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        {posts?.map((post: any) => (
          <article key={post.id} style={{
            background:'linear-gradient(135deg,#111,#0d0d0d)',
            border:'1px solid rgba(201,169,110,0.15)',
            borderLeft:'3px solid #c9a96e',
            padding:'2rem 2.5rem',
            position:'relative',
            boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,#c9a96e,transparent)' }}></div>
            <div style={{ fontSize:'0.58rem', letterSpacing:'0.3em', color:'#c9a96e', opacity:0.7, marginBottom:'0.8rem' }}>
              {new Date(post.created_at).toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric' })}
            </div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2', marginBottom:'1.2rem', fontWeight:300 }}>{post.title}</h2>
            {post.image_url && (
              <div style={{ marginBottom:'1.5rem', borderRadius:2, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)' }}>
                <img src={post.image_url} alt={post.title} style={{ width:'100%', maxHeight:400, objectFit:'cover', display:'block' }} />
              </div>
            )}
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.6)', whiteSpace:'pre-wrap', marginBottom: post.video_url ? '1.5rem' : 0 }}>{post.content}</p>
            {post.video_url && (
              <div style={{ position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', borderRadius:2 }}>
                <iframe
                  src={post.video_url.includes('youtube.com/watch') ? post.video_url.replace('watch?v=', 'embed/') : post.video_url}
                  style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                  allowFullScreen
                />
              </div>
            )}
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
