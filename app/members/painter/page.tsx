import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function PainterPage() {
  const supabase = await createSupabaseServerClient()
  const { data: artworks } = await supabase.from('artworks').select('*').eq('is_published', true).order('created_at', { ascending: false })

  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        <a href="/members" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em' }}>← メンバーページへ</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', color:'#f8f6f2', margin:'2rem 0 0.5rem', fontWeight:300 }}>MA@PAINTER</h1>
        <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.4)', marginBottom:'3rem', letterSpacing:'0.15em' }}>Mahiro — Artist / Painter from Hawaii</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2rem' }}>
          {artworks?.map((art: any) => (
            <div key={art.id} style={{ position:'relative' }}>
              <div style={{ border:'8px solid #2a1f0e', boxShadow:'0 0 0 2px #c9a96e, 0 0 0 4px #2a1f0e, 0 8px 32px rgba(0,0,0,0.6)', background:'#1a1408', padding:'12px' }}>
                <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                  {art.image_url ? (
                    <img src={art.image_url} alt={art.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter: art.is_sold ? 'grayscale(60%)' : 'none' }} />
                  ) : (
                    <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#0d1a1f,#5bc8d0,#c9a96e)', filter: art.is_sold ? 'grayscale(60%)' : 'none' }} />
                  )}
                  {art.is_sold && (
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ color:'#d94030', fontSize:'1.8rem', fontWeight:'bold', letterSpacing:'0.2em', textDecoration:'line-through', background:'rgba(0,0,0,0.5)', padding:'0.5rem 1.5rem', border:'2px solid #d94030' }}>SOLD OUT</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop:'1.2rem', textAlign:'center' }}>
                <h3 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.4rem', fontWeight:300 }}>{art.title}</h3>
                {art.size && <p style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em', marginBottom:'0.4rem' }}>{art.size}</p>}
                {art.description && <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.5)', lineHeight:1.7, marginBottom:'0.8rem' }}>{art.description}</p>}
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem' }}>
                  <span style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color: art.is_sold ? 'rgba(248,246,242,0.3)' : '#c9a96e' }}>
                    {art.is_sold ? '———' : art.price ? `¥${art.price.toLocaleString()}` : ''}
                  </span>
                  {!art.is_sold && (
                    <a href="https://www.instagram.com/mapain_ter/" target="_blank" style={{ fontSize:'0.6rem', letterSpacing:'0.2em', color:'#080808', background:'#c9a96e', padding:'0.4rem 1rem', textDecoration:'none', fontWeight:'bold' }}>購入希望 →</a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!artworks?.length && (
            <div style={{ textAlign:'center', padding:'4rem', color:'rgba(248,246,242,0.3)', fontSize:'0.85rem', gridColumn:'1/-1' }}>まだ作品がありません</div>
          )}
        </div>
      </div>
    </main>
  )
}
