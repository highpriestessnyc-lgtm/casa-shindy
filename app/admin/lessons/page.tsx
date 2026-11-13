import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function LessonsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: lessons } = await supabase.from('lessons').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#f8f6f2' }}>Lessons</h1>
        <Link href="/admin/lessons/new" style={{ background: '#c9a96e', color: '#080808', padding: '0.8rem 1.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
          + 新規追加
        </Link>
      </div>

      {!lessons?.length ? (
        <div style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '3rem', textAlign: 'center', color: 'rgba(248,246,242,0.4)', fontSize: '0.85rem' }}>
          まだレッスンがありません
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {lessons.map((l: any) => (
            <Link key={l.id} href={`/admin/lessons/${l.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                {/* サムネイル */}
                <div style={{ width: 72, height: 48, background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {l.thumbnail_url
                    ? <img src={l.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '1.4rem' }}>🎬</span>
                  }
                </div>

                {/* テキスト */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.9rem', color: '#f8f6f2', marginBottom: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</div>
                  {l.description && (
                    <div style={{ fontSize: '0.75rem', color: 'rgba(248,246,242,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.description}</div>
                  )}
                </div>

                {/* ステータス */}
                <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.7rem', border: `1px solid ${l.is_published ? 'rgba(29,184,67,0.4)' : 'rgba(255,255,255,0.1)'}`, color: l.is_published ? '#1db843' : 'rgba(248,246,242,0.3)', flexShrink: 0 }}>
                  {l.is_published ? 'Live' : 'Draft'}
                </span>

                {/* 編集ボタン */}
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#c9a96e', flexShrink: 0 }}>編集 →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
