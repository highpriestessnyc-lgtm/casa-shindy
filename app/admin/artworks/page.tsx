import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function ArtworksPage() {
  const supabase = await createSupabaseServerClient()
  const { data: artworks } = await supabase.from('artworks').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>MA@PAINTER 作品管理</h1>
        <a href="/admin/artworks/new" style={{ background:'#c9a96e', color:'#080808', padding:'0.8rem 1.5rem', textDecoration:'none', fontWeight:'bold' }}>+ 作品を追加</a>
      </div>
      {!artworks?.length ? (
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', textAlign:'center', color:'rgba(248,246,242,0.35)' }}>まだ作品がありません</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem' }}>
          {artworks.map((art: any) => (
            <div key={art.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' }}>
              {art.image_url ? (
                <img src={art.image_url} alt={art.title} style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover' }} />
              ) : (
                <div style={{ aspectRatio:'1/1', background:'linear-gradient(135deg,#0d1a1f,#5bc8d0)' }} />
              )}
              <div style={{ padding:'1rem' }}>
                <div style={{ fontSize:'0.85rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>{art.title}</div>
                <div style={{ fontSize:'0.75rem', color:'#c9a96e' }}>¥{art.price?.toLocaleString()}</div>
                <span style={{ fontSize:'0.55rem', padding:'0.2rem 0.5rem', border:`1px solid ${art.is_sold ? 'rgba(217,64,48,0.4)' : 'rgba(29,184,67,0.4)'}`, color: art.is_sold ? '#d94030' : '#1db843', marginTop:'0.5rem', display:'inline-block' }}>
                  {art.is_sold ? 'SOLD OUT' : 'Available'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}