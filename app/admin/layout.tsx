'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/posts/new', label: '+ New Post' },
  { href: '/admin/lessons', label: 'Lessons' },
  { href: '/admin/lessons/new', label: '+ New Lesson' },
  { href: '/admin/artworks', label: 'MA@PAINTER' },
  { href: '/admin/artworks/new', label: '+ Add Artwork' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808' }}>
      <aside style={{ width:220, background:'#111', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'2rem 0', flexShrink:0 }}>
        <div style={{ padding:'0 1.5rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.07)', marginBottom:'1rem' }}>
          <Link href="/" style={{ fontSize:'1.1rem', color:'#f8f6f2', textDecoration:'none', fontFamily:'serif', fontStyle:'italic' }}>Casa Shindy</Link>
          <div style={{ fontSize:'0.55rem', color:'rgba(248,246,242,0.3)', marginTop:'0.2rem' }}>ADMIN</div>
        </div>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} style={{ display:'block', padding:'0.7rem 1.5rem', fontSize:'0.78rem', textDecoration:'none', color: