import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function DanceHistoryPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', color:'#f8f6f2' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <a href="/members" style={{ color:'rgba(248,246,242,0.4)', textDecoration:'none', fontSize:'0.7rem' }}>← Back</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'3rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>ダンスの歴史大百科</h1>
        <p style={{ color:'rgba(248,246,242,0.5)', lineHeight:2 }}>コンテンツ準備中です。</p>
      </div>
    </main>
  )
}
