import Link from 'next/link'

const wrap: React.CSSProperties = { minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem 1.5rem', background:'#080808' }
const card: React.CSSProperties = { maxWidth:460, width:'100%', textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', background:'#111', padding:'3rem 2rem' }
const eyebrow: React.CSSProperties = { fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'1rem' }
const title: React.CSSProperties = { fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.6rem', fontWeight:300, color:'#f8f6f2', marginBottom:'0.8rem' }
const body: React.CSSProperties = { fontSize:'0.82rem', lineHeight:2, color:'rgba(248,246,242,0.7)', marginBottom:'2rem' }
const primary: React.CSSProperties = { display:'block', background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1rem' }
const secondary: React.CSSProperties = { display:'block', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(248,246,242,0.6)', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1rem 2rem', textDecoration:'none' }

// 無料登録(ログイン)で開くコンテンツの手前に出す。料金の話はしない。
export function SignupGate({ next, what = 'この記事' }: { next: string; what?: string }) {
  const q = encodeURIComponent(next)
  return (
    <div style={wrap}>
      <div style={card}>
        <div style={eyebrow}>Free</div>
        <h2 style={title}>{what}は無料登録で読めます</h2>
        <p style={body}>メールアドレスだけで登録できます。<br />コラム・カルチャー・アフリカン リズム図鑑などが全部ひらきます。</p>
        <Link href={`/auth/signup?redirect=${q}`} style={primary}>無料で登録する</Link>
        <Link href={`/auth/login?redirect=${q}`} style={secondary}>ログイン</Link>
      </div>
    </div>
  )
}

// 会員(¥500/月)限定のものを開こうとした時だけ出す。
export function PaywallGate({ isLoggedIn, what, perks }: { isLoggedIn: boolean; what: string; perks: string }) {
  const joinHref = isLoggedIn ? '/join' : `/auth/login?redirect=${encodeURIComponent('/join')}`
  return (
    <div style={wrap}>
      <div style={card}>
        <div style={eyebrow}>Members Only</div>
        <h2 style={title}>{what}は会員限定です</h2>
        <p style={body}>月額 ¥500 で{perks}。<br />いつでも解約できます。</p>
        <Link href={joinHref} style={primary}>¥500/月で使う →</Link>
        <Link href="/members" style={secondary}>← 会員エリアに戻る</Link>
      </div>
    </div>
  )
}
