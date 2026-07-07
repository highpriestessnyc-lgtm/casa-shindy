import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function PostsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>Posts</h1>
        <a href="/admin/posts/new" style={{ background:'#c9a96e', color:'#080808', padding:'0.8rem 1.5rem', textDecoration:'none', fontWeight:'bold' }}>+ New</a>
      </div>
      {!posts?.length ? (
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', textAlign:'center', color:'rgba(248,246,242,0.35)' }}>No posts yet.</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {posts.map((p: any) => (
            <div key={p.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.2rem 1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'0.85rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{p.title}</div>
                <div style={{ fontSize:'0.62rem', color:'rgba(248,246,242,0.35)' }}>{p.category} — {new Date(p.created_at).toLocaleDateString('ja-JP')}</div>
              </div>
              <span style={{ fontSize:'0.6rem', padding:'0.2rem 0.6rem', border:'1px solid rgba(29,184,67,0.4)', color: p.is_published ? '#1db843' : 'gray' }}>{p.is_published ? 'Live' : 'Draft'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}