import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const PAGES = [
  { href:'/members', label:'🏠 ホーム' },
  { href:'/members/lesson', label:'💃 Dance Lesson' },
  { href:'/members/soliloquy', label:'✍️ 独り言' },
  { href:'/members/market', label:'📈 相場配信' },
  { href:'/members/culture/movies', label:'🎬 映画' },
  { href:'/members/culture/books', label:'📚 文庫・漫画' },
  { href:'/members/culture/four-stance', label:'🕺 4スタンス' },
  { href:'/members/painter', label:'🎨 MA@PAINTER' },
  { href:'/members/dance-history', label:'📖 ダンスの歴史' },
  { href:'/members/account', label:'⚙️ アカウント' },
]

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, category, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(15)

  const categoryHref: any = {
    soliloquy: '/members/soliloquy',
    market: '/members/market',
    movies: '/members/culture/movies',
    books: '/members/culture/books',
    four_stance: '/members/culture/four-stance',
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808', fontFamily:'sans-serif' }}>
      <aside style={{ width:200, flexShrink:0, position:'sticky', top:0, height:'100vh', overflowY:'auto', background:'#0a0a0a', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem 0' }}>
        <Link href="/" style={{ display:'block', fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#c9a96e', textDecoration:'none', padding:'0 1.2rem', marginBottom:'1.5rem' }}>Casa Shindy</Link>
        
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'0.5rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.25)', padding:'0 1.2rem', marginBottom:'0.5rem', textTransform:'uppercase' }}>Menu</div>
          {PAGES.map(n => (
            <Link key={n.href} href={n.href} style={{ display:'block', fontSize:'0.72rem', color:'rgba(248,246,242,0.5)', textDecoration:'none', padding:'0.4rem 1.2rem' }}>{n.label}</Link>
          ))}
        </div>

        <div>
          <div style={{ fontSize:'0.5rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.25)', padding:'0 1.2rem', marginBottom:'0.5rem', textTransform:'uppercase' }}>Recent</div>
          {posts?.map((post: any) => (
            <Link key={post.id} href={categoryHref[post.category] || '/members'} style={{ display:'block', padding:'0.4rem 1.2rem', textDecoration:'none' }}>
              <div style={{ fontSize:'0.58rem', color:'rgba(248,246,242,0.25)', marginBottom:'0.1rem' }}>{new Date(post.created_at).toLocaleDateString('ja-JP', { month:'numeric', day:'numeric' })}</div>
              <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.5)', lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical' as any }}>{post.title}</div>
            </Link>
          ))}
        </div>
      </aside>
      <main style={{ flex:1, overflowY:'auto' }}>{children}</main>
    </div>
  )
}
