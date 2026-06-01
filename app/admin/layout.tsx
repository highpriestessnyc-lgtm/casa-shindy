'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin', label: '📊 ダッシュボード' },
  { href: '/admin/posts', label: '✍️ 投稿管理' },
  { href: '/admin/posts/new', label: '＋ 新規投稿' },
  { href: '/admin/lessons', label: '💃 レッスン管理' },
  { href: '/admin/lessons/new', label: '＋ 新規レッスン' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808', fontFamily:"'Didact Gothic',sans-serif" }}>
      <aside style={{ width:240, background:'#111', borderRight:'1px solid rgba(255,255,25
cat > app/admin/page.tsx << 'EOF'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  const { count: postCount } = await supabase.from('posts').select('*', { count:'exact', head:true })
  const { count: lessonCount } = await supabase.from('lessons').select('*', { count:'exact', head:true })
  const { co
