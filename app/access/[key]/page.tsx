import { getAccess } from '@/lib/access'
import { SignupGate, PaywallGate } from '@/app/components/AccessGate'
import { MEMBER_APPS } from '@/lib/member-apps'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function MemberAppAccess({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const app = MEMBER_APPS[key]
  if (!app) notFound()

  const { user, isMember } = await getAccess()
  if (app.tier === 'paid' && !isMember) {
    return <PaywallGate isLoggedIn={!!user} what={app.name} perks={`${app.name}が使い放題、ダンスレッスン動画もすべて見られます`} />
  }
  if (!user) return <SignupGate next={`/access/${key}`} what={app.name} />

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <div style={{ maxWidth:480, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111', position:'relative' }}>
        <span style={{ position:'absolute', top:'1.2rem', right:'1.2rem', fontSize:'0.75rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.3rem 0.7rem' }}>{app.tier === 'paid' ? 'MEMBERS' : 'FREE'}</span>
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'1.5rem' }}>{app.icon}</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>{app.name}</h1>
        <p style={{ fontSize:'0.78rem', lineHeight:2, color:'rgba(248,246,242,0.6)', marginBottom:'2rem' }}>{app.desc}</p>

        <a href={app.href} target="_blank" rel="noopener noreferrer" style={{ display:'block', background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1.5rem' }}>
          アプリを開く →
        </a>

        <Link href="/shop" style={{ fontSize:'0.75rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.6)', textDecoration:'none' }}>← ショップに戻る</Link>
      </div>
    </main>
  )
}
