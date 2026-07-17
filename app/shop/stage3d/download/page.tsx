'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function DownloadContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => { setVerified(true); setLoading(false) }, 1000)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', padding:'2rem' }}>
      <div style={{ maxWidth:640, width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🌐</div>
          <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.5rem' }}>STAGE3D</h1>
          <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)', letterSpacing:'0.2em' }}>相場ステージ 3D ビジュアライザー</p>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', color:'rgba(248,246,242,0.4)' }}>確認中...</div>
        ) : verified ? (
          <div>
            <div style={{ background:'rgba(29,184,67,0.1)', border:'1px solid rgba(29,184,67,0.3)', color:'#1db843', padding:'1rem', fontSize:'0.75rem', marginBottom:'2rem', textAlign:'center', letterSpacing:'0.1em' }}>
              ✓ 購入確認完了 — ダウンロードしてください
            </div>

            {/* Mac版 */}
            <div style={{ border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', marginBottom:'1rem', background:'#0d0d0d' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'#c9a96e', marginBottom:'1rem', textTransform:'uppercase' }}>Mac版</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem', marginBottom:'1.5rem' }}>
                <a href="https://77.gigafile.nu/0905-c132550a1dc47d1ab6b47f69e968b5cd0" target="_blank" style={{ display:'block', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'0.9rem 1.5rem', textDecoration:'none', fontWeight:'bold', fontSize:'0.75rem', letterSpacing:'0.2em', textAlign:'center' }}>
                  ↓ Apple Silicon版（M1/M2/M3）
                </a>
                <a href="https://77.gigafile.nu/0905-c93c7ff9670f7a33543bc7293def6df5f" target="_blank" style={{ display:'block', background:'rgba(201,169,110,0.1)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.9rem 1.5rem', textDecoration:'none', fontSize:'0.75rem', letterSpacing:'0.2em', textAlign:'center' }}>
                  ↓ Intel Mac版（2020以前）
                </a>
              </div>
              <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)', lineHeight:2 }}>
                <div style={{ marginBottom:'0.5rem', color:'rgba(248,246,242,0.5)' }}>⚠️ 「壊れています」エラーの解決方法</div>
                <div>方法①：アプリを右クリック → 「開く」→「開く」ボタン</div>
                <div>方法②：ターミナルで <code style={{ background:'rgba(255,255,255,0.07)', padding:'0.1rem 0.4rem', fontSize:'0.65rem' }}>xattr -cr /Applications/STAGE3D.app</code></div>
              </div>
            </div>

            {/* Windows版 */}
            <div style={{ border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', marginBottom:'1rem', background:'#0d0d0d' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'#c9a96e', marginBottom:'1rem', textTransform:'uppercase' }}>Windows版</div>
              <a href="https://110.gigafile.nu/0821-n23c31ad921251fcdd5dae1777923ca85" target="_blank" style={{ display:'block', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'0.9rem 1.5rem', textDecoration:'none', fontWeight:'bold', fontSize:'0.75rem', letterSpacing:'0.2em', textAlign:'center' }}>
                ↓ Windows版をダウンロード
              </a>
            </div>

            {/* iPhone/iPad版 */}
            <div style={{ border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', marginBottom:'2rem', background:'#0d0d0d' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.3em', color:'#c9a96e', marginBottom:'1rem', textTransform:'uppercase' }}>iPhone / iPad版（Web App）</div>
              <a href="https://highpriestessnyc-lgtm.github.io/stage3d" target="_blank" style={{ display:'block', background:'rgba(201,169,110,0.1)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.9rem 1.5rem', textDecoration:'none', fontSize:'0.75rem', letterSpacing:'0.2em', textAlign:'center', marginBottom:'0.8rem' }}>
                → ブラウザで開く
              </a>
              <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)', lineHeight:1.8 }}>
                ブラウザで表示後、「ホーム画面に追加」でWebアプリとして使用できます。
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background:'rgba(217,64,48,0.1)', border:'1px solid rgba(217,64,48,0.3)', color:'#e0958a', padding:'1rem', fontSize:'0.75rem', marginBottom:'1.5rem', lineHeight:1.8, textAlign:'center' }}>
            購入が確認できませんでした。購入直後の場合は少し待って再読み込みしてください。
          </div>
        )}

        <Link href="/shop" style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.35)', textDecoration:'none', display:'block', textAlign:'center' }}>← ショップに戻る</Link>
      </div>
    </main>
  )
}

export default function Stage3DDownloadPage() {
  return <Suspense><DownloadContent /></Suspense>
}
