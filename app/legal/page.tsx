export default function LegalPage() {
  return (
    <main style={{ minHeight:'100vh', background:'#080808', padding:'4rem 2rem', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <a href="/" style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em' }}>← トップへ</a>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', margin:'2rem 0', fontWeight:300 }}>特定商取引法に基づく表記</h1>
        
        {[
          { label:'販売業者', value:'佐藤真二' },
          { label:'所在地', value:'鹿児島県鹿児島市武岡1-14-3' },
          { label:'お問い合わせ', value:'high.priestess.nyc@gmail.com（メールにて対応）' },
          { label:'販売価格', value:'各商品・サービスのページに記載の価格（税込）' },
          { label:'支払方法', value:'クレジットカード（Stripe決済）' },
          { label:'支払時期', value:'購入手続き完了時にご請求' },
          { label:'サービス提供時期', value:'決済完了後、即時提供' },
          { label:'月額サービス', value:'¥500/月。いつでも解約可能。解約後の日割り返金はありません。' },
          { label:'返品・キャンセル', value:'デジタルコンテンツの性質上、購入完了後の返金・返品はお受けできません。' },
          { label:'動作環境', value:'インターネット接続環境が必要です。推奨ブラウザ：Chrome、Safari最新版' },
        ].map((item) => (
          <div key={item.label} style={{ display:'grid', gridTemplateColumns:'180px 1fr', gap:'1rem', padding:'1.2rem 0', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.4)', letterSpacing:'0.1em' }}>{item.label}</div>
            <div style={{ fontSize:'0.85rem', color:'rgba(248,246,242,0.8)', lineHeight:1.8 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </main>
  )
}