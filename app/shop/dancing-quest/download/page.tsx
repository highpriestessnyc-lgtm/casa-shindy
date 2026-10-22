import Link from 'next/link'

export default function DancingQuestDownload() {
  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <div style={{ maxWidth:480, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'1.5rem' }}>🎮</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>Dancing Quest</h1>
        <p style={{ fontSize:'0.78rem', lineHeight:2, color:'rgba(248,246,242,0.6)', marginBottom:'2rem' }}>SHINDYが作ったダンサー育成ゲーム。ストリートダンスの世界を冒険しながらスキルを磨け。</p>
        <a href="/games/dancing-quest.zip" download style={{ display:'block', background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1rem' }}>
          ⬇️ 無料ダウンロード
        </a>
        <Link href="/" style={{ fontSize:'0.75rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.6)', textDecoration:'none' }}>← トップに戻る</Link>
      </div>
    </main>
  )
}
