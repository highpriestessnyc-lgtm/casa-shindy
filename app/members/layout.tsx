import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const PAGES = [
  { href:'/members', label:'ホーム', icon:'✦' },
  { href:'/members/lesson', label:'Dance Lesson', icon:'💃' },
  { href:'/members/soliloquy', label:'独り言', icon:'✍️' },
  { href:'/members/market', label:'相場配信', icon:'📈' },
  { href:'/members/culture/movies', label:'映画', icon:'🎬' },
  { href:'/members/culture/books', label:'文庫・漫画', icon:'📚' },
  { href:'/members/culture/four-stance', label:'4スタンス', icon:'🕺' },
  { href:'/members/painter', label:'MA@PAINTER', icon:'🎨' },
  { href:'/members/dance-history', label:'ダンスの歴史', icon:'📖' },
  { href:'/members/account', label:'アカウント', icon:'⚙️' },
]

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, category, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(10)

  const categoryHref: any = {
    soliloquy: '/members/soliloquy',
    market: '/members/market',
    movies: '/members/culture/movies',
    books: '/members/culture/books',
    four_stance: '/members/culture/four-stance',
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808', fontFamily:'sans-serif' }}>
      <aside style={{
        width:210,
        flexShrink:0,
        position:'sticky',
        top:0,
        height:'100vh',
        overflowY:'auto',
        background:'linear-gradient(180deg,#0d0b08,#080808)',
        borderRight:'1px solid rgba(201,169,110,0.15)',
        padding:'0',
        display:'flex',
        flexDirection:'column',
      }}>
        {/* ロゴ */}
        <div style={{ padding:'1.8rem 1.4rem 1.2rem', borderBottom:'1px solid rgba(201,169,110,0.1)' }}>
          <Link href="/" style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.2rem', color:'#c9a96e', textDecoration:'none', display:'block' }}>Casa Shindy</Link>
          <div style={{ fontSize:'0.5rem', letterSpacing:'0.4em', color:'rgba(201,169,110,0.4)', marginTop:'0.2rem', textTransform:'uppercase' }}>Members Area</div>
        </div>

        {/* メニュー */}
        <div style={{ padding:'1.2rem 0', borderBottom:'1px solid rgba(201,169,110,0.1)', flex:1 }}>
          <div style={{ fontSize:'0.48rem', letterSpacing:'0.4em', color:'rgba(201,169,110,0.35)', padding:'0 1.4rem', marginBottom:'0.6rem', textTransform:'uppercase' }}>Navigation</div>
          {PAGES.map(n => (
            <Link key={n.href} href={n.href} style={{
              display:'flex',
              alignItems:'center',
              gap:'0.6rem',
              fontSize:'0.72rem',
              color:'rgba(248,246,242,0.45)',
              textDecoration:'none',
              padding:'0.45rem 1.4rem',
              borderLeft:'2px solid transparent',
              transition:'all 0.2s',
            }}>
              <span style={{ fontSize:'0.85rem', opacity:0.8 }}>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </div>

        {/* 最近の投稿 */}
        <div style={{ padding:'1.2rem 0' }}>
          <div style={{ fontSize:'0.48rem', letterSpacing:'0.4em', color:'rgba(201,169,110,0.35)', padding:'0 1.4rem', marginBottom:'0.8rem', textTransform:'uppercase' }}>Recent</div>
          {posts?.map((post: any) => (
            <Link key={post.id} href={categoryHref[post.category] || '/members'} style={{ display:'block', padding:'0.5rem 1.4rem', textDecoration:'none', borderLeft:'2px solid transparent' }}>
              <div style={{ fontSize:'0.55rem', color:'#c9a96e', opacity:0.6, marginBottom:'0.15rem', letterSpacing:'0.1em' }}>
                {new Date(post.created_at).toLocaleDateString('ja-JP', { month:'long', day:'numeric' })}
              </div>
              <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.45)', lineHeight:1.4, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{post.title}</div>
            </Link>
          ))}
        </div>

        {/* フッター */}
        <div style={{ padding:'1rem 1.4rem', borderTop:'1px solid rgba(201,169,110,0.1)' }}>
          <Link href="/shop" style={{ fontSize:'0.6rem', letterSpacing:'0.2em', color:'rgba(201,169,110,0.5)', textDecoration:'none', display:'block' }}>Shop →</Link>
        </div>
      </aside>

      <main style={{ flex:1, overflowY:'auto' }}>{children}</main>
    </div>
  )
}
