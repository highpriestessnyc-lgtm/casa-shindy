import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabase'
import { ADMIN_EMAIL } from '@/lib/access'

export const dynamic = 'force-dynamic'

// 登録者数の集計。profiles は本人しか読めない設定(RLS)なので、サーバー側でサービスロールを使って数える。
// このページは app/admin/layout.tsx で管理者だけに絞っている。
async function getStats() {
  const db = getSupabaseAdmin()
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const base = () => db.from('profiles').select('*', { count: 'exact', head: true }).neq('email', ADMIN_EMAIL)

  const [total, members, newThisWeek, newMembersThisWeek, recent] = await Promise.all([
    base(),
    base().eq('is_member', true),
    base().gte('created_at', weekAgo),
    db.from('profiles').select('*', { count: 'exact', head: true }).neq('email', ADMIN_EMAIL).eq('is_member', true).gte('membership_start', weekAgo),
    db.from('profiles').select('email, is_member, created_at').neq('email', ADMIN_EMAIL).order('created_at', { ascending: false }).limit(10),
  ])

  const error = total.error || members.error || newThisWeek.error || recent.error
  return {
    total: total.count ?? 0,
    members: members.count ?? 0,
    free: (total.count ?? 0) - (members.count ?? 0),
    newThisWeek: newThisWeek.count ?? 0,
    newMembersThisWeek: newMembersThisWeek.count ?? 0,
    recent: (recent.data ?? []) as { email: string | null; is_member: boolean | null; created_at: string }[],
    error: error ? error.message : null,
  }
}

const STAT: React.CSSProperties = { background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.6rem 1.4rem' }
const STAT_LABEL: React.CSSProperties = { fontSize:'0.75rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', marginBottom:'0.8rem' }
const STAT_NUM: React.CSSProperties = { fontFamily:"'Cormorant Garamond',serif", fontSize:'2.6rem', lineHeight:1, color:'#f8f6f2' }
const STAT_SUB: React.CSSProperties = { fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', marginTop:'0.6rem' }

export default async function AdminPage() {
  const s = await getStats()
  const fmt = (d: string) => new Date(d).toLocaleString('ja-JP', { timeZone:'Asia/Tokyo', month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <div>
      <h1 style={{ fontSize:'2rem', color:'#f8f6f2', marginBottom:'0.5rem' }}>Dashboard</h1>
      <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', marginBottom:'2rem' }}>Casa Shindy Admin</p>

      {/* 登録者の数 */}
      {s.error && <p style={{ fontSize:'0.8rem', color:'#e84040', marginBottom:'1rem' }}>集計エラー: {s.error}</p>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:'1rem', marginBottom:'1rem' }}>
        <div style={STAT}>
          <div style={STAT_LABEL}>無料登録</div>
          <div style={STAT_NUM}>{s.free}<span style={{ fontSize:'1rem', marginLeft:'0.3rem' }}>人</span></div>
          <div style={STAT_SUB}>メールだけで登録した人</div>
        </div>
        <div style={{ ...STAT, borderColor:'rgba(201,169,110,0.35)' }}>
          <div style={{ ...STAT_LABEL, color:'#c9a96e' }}>¥500 会員</div>
          <div style={{ ...STAT_NUM, color:'#c9a96e' }}>{s.members}<span style={{ fontSize:'1rem', marginLeft:'0.3rem' }}>人</span></div>
          <div style={STAT_SUB}>月 ¥{(s.members * 500).toLocaleString()} 相当</div>
        </div>
        <div style={STAT}>
          <div style={STAT_LABEL}>今週の新規</div>
          <div style={STAT_NUM}>{s.newThisWeek}<span style={{ fontSize:'1rem', marginLeft:'0.3rem' }}>人</span></div>
          <div style={STAT_SUB}>うち会員になった人 {s.newMembersThisWeek}人（直近7日）</div>
        </div>
        <div style={STAT}>
          <div style={STAT_LABEL}>登録者 合計</div>
          <div style={STAT_NUM}>{s.total}<span style={{ fontSize:'1rem', marginLeft:'0.3rem' }}>人</span></div>
          <div style={STAT_SUB}>会員率 {s.total ? Math.round((s.members / s.total) * 100) : 0}%</div>
        </div>
      </div>

      {/* 最近の足跡 */}
      <div style={{ border:'1px solid rgba(255,255,255,0.07)', marginBottom:'3rem' }}>
        <div style={{ ...STAT_LABEL, padding:'1rem 1.4rem 0', marginBottom:'0.4rem' }}>最近の登録 10件</div>
        {s.recent.length === 0 && <div style={{ padding:'1rem 1.4rem 1.4rem', fontSize:'0.8rem', color:'rgba(248,246,242,0.6)' }}>まだ登録はありません</div>}
        {s.recent.map((r, i) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', gap:'1rem', padding:'0.8rem 1.4rem', borderTop:'1px solid rgba(255,255,255,0.07)', fontSize:'0.8rem' }}>
            <span style={{ color:'#f8f6f2', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.email ?? '(メールなし)'}</span>
            <span style={{ display:'flex', gap:'1rem', flexShrink:0 }}>
              <span style={{ color: r.is_member ? '#c9a96e' : 'rgba(248,246,242,0.6)' }}>{r.is_member ? '¥500会員' : '無料'}</span>
              <span style={{ color:'rgba(248,246,242,0.6)' }}>{fmt(r.created_at)}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <Link href="/admin/posts" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✍️</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Posts</div>
            <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>独り言 / 相場 / 映画 / 本</div>
          </div>
        </Link>
        <Link href="/admin/lessons/new" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>💃</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>New Lesson</div>
            <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>Dance Lesson Video</div>
          </div>
        </Link>
        <Link href="/admin/artworks/new" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>🎨</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>MA@PAINTER</div>
            <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>作品を追加</div>
          </div>
        </Link>
        <Link href="/admin/lessons" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>📋</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Lessons</div>
            <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)' }}>レッスン一覧</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
