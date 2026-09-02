import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function BgmMixStudioDownload() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirect=/shop/bgm-mix-studio/download')

  const isAdmin = user.email === 'high.priestess.nyc@gmail.com'
  if (!isAdmin) {
    const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
    if (!profile?.is_member) redirect('/join')
  }

  return (
    <main style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Didact Gothic',sans-serif", padding:'2rem' }}>
      <div style={{ maxWidth:480, textAlign:'center', border:'1px solid rgba(255,255,255,0.07)', padding:'3rem', background:'#111' }}>
        <span style={{ position:'absolute', marginTop:'-4.5rem', marginLeft:'-1rem', fontSize:'0.58rem', letterSpacing:'0.2em', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.3)', padding:'0.3rem 0.8rem' }}>MEMBERS ONLY</span>
        <img src="/previews/bgm-mix-studio-preview.png" alt="BGM MIX STUDIO" style={{ width:'100%', borderRadius:4, marginBottom:'1.5rem', border:'1px solid rgba(255,255,255,0.08)' }} />
        <span style={{ fontSize:'3rem', display:'block', marginBottom:'1.5rem' }}>🎚️</span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'2rem', color:'#f8f6f2', marginBottom:'1rem', fontWeight:300 }}>BGM MIX STUDIO</h1>
        <p style={{ fontSize:'0.78rem', lineHeight:2, color:'rgba(248,246,242,0.4)', marginBottom:'2rem' }}>
          ダンス公演用BGM編集ソフト(Mac)。クロスフェード・BPM自動検出&タイムストレッチ・トラックFX(ディレイ/リバーブ/宇宙人声)・ナレーション機能・複数選択・Undo/Redo対応。
        </p>
        <a href="https://github.com/highpriestessnyc-lgtm/casa-shindy/releases/download/bgm-mix-studio-v1.0.0/BGM.MIX.STUDIO-1.0.0-arm64.dmg" style={{ display:'block', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', fontSize:'0.68rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1.1rem 2rem', textDecoration:'none', fontWeight:'bold', marginBottom:'1.5rem' }}>
          ⬇️ ダウンロード (.dmg / Apple Silicon Mac用)
        </a>

        <div style={{ textAlign:'left', background:'rgba(217,64,48,0.08)', border:'1px solid rgba(217,64,48,0.25)', borderRadius:6, padding:'1.2rem 1.4rem', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'0.68rem', fontWeight:'bold', color:'#e0958a', marginBottom:'0.6rem', letterSpacing:'0.05em' }}>
            ⚠️ 「マルウェアがブロックされました」と出た場合
          </div>
          <p style={{ fontSize:'0.68rem', lineHeight:1.9, color:'rgba(248,246,242,0.55)', marginBottom:'0.8rem' }}>
            これは実害のあるマルウェア検出ではなく、Apple開発者証明書での署名をまだ行っていないための誤検知です。以下の手順で開けます:
          </p>
          <ol style={{ fontSize:'0.68rem', lineHeight:2, color:'rgba(248,246,242,0.7)', paddingLeft:'1.1rem', marginBottom:'0.8rem' }}>
            <li>.dmgを開き、アプリを「アプリケーション」フォルダにドラッグする</li>
            <li>「ターミナル」を開き、以下をそのまま貼り付けてEnter:</li>
          </ol>
          <code style={{ display:'block', background:'#000', color:'#8bd17c', fontSize:'0.66rem', padding:'0.8rem 1rem', borderRadius:4, marginBottom:'0.8rem', wordBreak:'break-all' }}>
            xattr -cr "/Applications/BGM MIX STUDIO.app"
          </code>
          <p style={{ fontSize:'0.68rem', lineHeight:1.9, color:'rgba(248,246,242,0.55)' }}>
            実行後は、Finderから通常通りダブルクリックで開けるようになります(以降は毎回この操作は不要です)。
          </p>
        </div>

        <p style={{ fontSize:'0.65rem', lineHeight:1.8, color:'rgba(248,246,242,0.3)', marginBottom:'1rem' }}>
          上記の警告が出ない場合でも、初回起動時に「開発元が未確認」の表示が出ることがあります。その場合はFinderでアプリを<strong>右クリック→「開く」</strong>を選んでください(2回目以降は通常通り開けます)。
        </p>
        <Link href="/shop" style={{ fontSize:'0.62rem', letterSpacing:'0.2em', color:'rgba(248,246,242,0.35)', textDecoration:'none' }}>← ショップに戻る</Link>
      </div>
    </main>
  )
}
