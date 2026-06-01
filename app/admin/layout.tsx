'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts/new', label: '+ New Post' },
  { href: '/admin/lessons/new', label: '+ New Lesson' },
]
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808' }}>
      <aside style={{ width:200, background:'#111', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'2rem 0' }}>
        <div style={{ padding:'0 1.5rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.07)', marginBottom:'1rem' }}>
          <Link href="/" style={{ fontSize:'1.1rem', color:'#f8f6f2', textDecoration:'none' }}>Casa Shindy</Link>
          <div style={{ fontSize:'0.55rem', color:'rgba(248,246,242,0.3)', marginTop:'0.2rem' }}>ADMIN</div>
        </div>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} style={{ display:'block', padding:'0.7rem 1.5rem', fontSize:'0.78rem', textDecoration:'none', color: path===n.href ? '#c9a96e' : 'rgba(248,246,242,0.45)', borderLeft: path===n.href ? '2px solid #c9a96e' : '2px solid transparent' }}>{n.label}</Link>
        ))}
      </aside>
      <main style={{ flex:1, padding:'3rem' }}>{children}</main>
    </div>
  )
}