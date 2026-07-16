import { stripe } from '@/lib/stripe'
import Link from 'next/link'

// 単品購入(会員登録不要のゲスト購入もありえる)なので、success_urlに付与される
// session_id を直接Stripeに問い合わせて支払い済みか検証する(bgm-mix-studioと同じ方式)。
async function verifyPurchase(sessionId: string | undefined) {
  if (!sessionId) return false
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session.payment_status === 'paid' && session.metadata?.productKey === 'stage3d'
  } catch {
    return false
  }
}

export default async function Stage3dDownload({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const verified = await verifyPurchase(session_id)

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <div style={{ maxWidth:480, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'1.5rem' }}>🌐</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>STAGE 3D</h1>
        <p style={{ fontSize:'0.78rem', lineHeight:2, color:'rgba(248,246,242,0.4)', marginBottom:'2rem' }}>相場ステージを3D空間で視覚化する分析ツール。</p>

        {verified ? (
          <>
            <a href="https://highpriestessnyc-lgtm.github.io/stage3d" target="_blank" rel="noopener noreferrer" style={{ display:'block', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.68rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'0.8rem' }}>
              🌐 ブラウザで開く
            </a>
            <a href="/apps/stage3d.zip" download style={{ display:'block', background:'transparent', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.4)', fontSize:'0.68rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1rem' }}>
              ⬇️ デスクトップ版(Mac)をダウンロード
            </a>
            <p style={{ fontSize:'0.65rem', lineHeight:1.8, color:'rgba(248,246,242,0.3)', marginBottom:'1rem' }}>
              デスクトップ版は解凍後、ターミナルで <code>npm install</code> → <code>npm start</code> で起動します(Node.js必須)。
            </p>
          </>
        ) : (
          <div style={{ background:'rgba(217,64,48,0.1)', border:'1px solid rgba(217,64,48,0.3)', color:'#e0958a', padding:'1rem', fontSize:'0.75rem', marginBottom:'1.5rem', lineHeight:1.8 }}>
            購入が確認できませんでした。購入直後の場合は少し待って再読み込みしてください。
          </div>
        )}

        <Link href="/shop" style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.35)', textDecoration:'none' }}>← ショップに戻る</Link>
      </div>
    </main>
  )
}
