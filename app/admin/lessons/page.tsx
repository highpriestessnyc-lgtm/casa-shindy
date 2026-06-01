import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
export default async function LessonsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: lessons } = await supabase.from('lessons').select('*').order('created_at', { ascending: false })
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', color:'#f8f6f2' }}>Lessons</h1>
        <Link href="/admin/lessons/new" style={{ background:'#c9a96e', color:'#080808', padding:'0.8rem 1.5rem', textDecoration:'none', fontWeight:'bold' }}>+ New</Link>
      </div>
      {!lessons?.length ? (
        <div style={{ border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', textAlign:'center', color:'rgba(248,246,242,0.35)' }}>No lessons yet.</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {lessons.map((l: any) => (
            <div key={l.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.2rem 1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
              <div style={{ flex:1, fontSize:'0.85rem', color:'#f8f6f2' }}>{l.title}</div>
              <span style={{ fontSize:'0.6rem', padding:'0.2rem 0.6rem', border:'1px solid rgba(29,184,67,0.4)', color: l.is_published ? '#1db843' : 'gray' }}>{l.is_published ? 'Live' : 'Draft'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}