'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const MARQUEE_ITEMS = [
  'Monthly Dance Lesson','BINGO LADDER','献立アプリ','弁当アプリ',
  'STAGE3D','Dancing Quest','ダンスの歴史本','4スタンス談義',
  '映画・漫画・文庫','MA@PAINTER','シンディの独り言','相場配信',
]

const APPS = [
  { num:'01', icon:'🍱', name:'献立アプリ', desc:'毎日の献立をAIが提案。栄養バランス・家族の好みから最適メニューを生成。無料登録で使える。', price:'無料登録', type:'Free Account', href:'/access/kondate', member:true, tier:'free' },
  { num:'02', icon:'🥡', name:'弁当アプリ', desc:'お弁当レシピ管理・栄養計算・見た目コーディネート。毎朝をもっと楽しく。会員は無料。', price:'¥490', type:'会員無料', href:'/shop', member:true },
  { num:'03', icon:'📊', name:'BINGO LADDER', desc:'SHINDYのFXステージ分析メソッド。Stage 0〜5の相場読みを体系化した実戦ツール。', price:'¥9,800', type:'FX Trading Method', href:'/shop', member:false, featured:true },
  { num:'04', icon:'🌐', name:'STAGE3D', desc:'相場ステージを3D空間で視覚化。直感的インターフェースで相場の構造が見える。', price:'¥5,900', type:'Buy Once', href:'/shop', member:false },
  { num:'05', icon:'📖', name:'ダンスの歴史本', desc:'SHINDYが書いたストリートダンスの歴史書。日本のダンスシーンの記録と記憶。無料登録で読める。', price:'無料登録', type:'Free Account', href:'/members/dance-history', member:true, tier:'free' },
  { num:'06', icon:'🎮', name:'Dancing Quest', desc:'SHINDYが作ったダンサー育成ゲーム。Casa Shindyで無料ダウンロード。', price:'無料', type:'Casa Shindy限定DL', href:'/shop/dancing-quest/download', member:false },
  { num:'07', icon:'📈', name:'BINGO ANALYZER PRO', desc:'BINGO LADDERのチャート分析AIツール。会員は無料。', price:'¥3,500', type:'会員無料', href:'/access/bingo-analyzer', member:true },
  { num:'08', icon:'📚', name:'WORD STREET', desc:'ストリートカルチャーで学ぶ英語アプリ。無料登録で使える。', price:'無料登録', type:'Free Account', href:'/access/word-street', member:true, tier:'free' },
  { num:'09', icon:'🌙', name:'COSMIC CALENDAR', desc:'マヤ暦・算命学・四柱推命・西洋占星術の複合占いアプリ。無料登録で使える。', price:'無料登録', type:'Free Account', href:'/access/cosmic-calendar', member:true, tier:'free' },
  { num:'10', icon:'📜', name:'国史年表', desc:'日本の歴史をインタラクティブに学べるタイムライン。無料登録で使える。', price:'無料登録', type:'Free Account', href:'/access/kokushi', member:true, tier:'free' },
  { num:'12', icon:'🥁', name:'アフリカン リズム図鑑', desc:'ジャンベ・ドゥンドゥンなど、アフリカンダンスの伝統リズムを地方別に整理した図鑑。無料登録で使える。', price:'無料登録', type:'Free Account', href:'/access/african-rhythm', member:true, tier:'free' },
  { num:'11', icon:'🎚️', name:'BGM MIX STUDIO', desc:'ダンス公演用BGM編集ソフト(Mac)。クロスフェード・BPM自動検出&タイムストレッチ・トラックFX・ナレーション機能。会員限定。', price:'会員限定', type:'Members Only', href:'/shop/bgm-mix-studio/download', member:true },
]

function renderAppCard(app: any) {
  return (
    <a key={app.num} href={app.href} style={{ textDecoration:"none", display:"block" }}>
      <div style={{ background: app.featured ? 'linear-gradient(160deg,#1a1008,#161616)' : '#0d0d0d', padding:'2.5rem 2rem', position:'relative', overflow:'hidden', cursor:'pointer', border: app.featured ? '1px solid rgba(201,169,110,0.18)' : 'none', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.25),transparent)' }} />
        <div style={{ position:'absolute', top:0, right:0, width:36, height:36, background:'rgba(201,169,110,0.08)', clipPath:'polygon(100% 0,100% 100%,0 0)' }} />
        <span style={{ position:'absolute', top:'1.4rem', left:'2rem', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.9rem', color:'rgba(201,169,110,0.12)', letterSpacing:'0.1em' }}>{app.num}</span>
        <span style={{ fontSize:'2rem', marginBottom:'1.4rem', display:'block', marginTop:'0.5rem' }}>{app.icon}</span>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', color: app.featured ? '#c9a96e' : '#f8f6f2', marginBottom:'0.5rem' }}>{app.name}</div>
        <p style={{ fontSize:'0.73rem', lineHeight:1.9, color:'rgba(248,246,242,0.6)', marginBottom:'1.2rem', flex:1 }}>{app.desc}</p>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.5rem', color:'#c9a96e', marginBottom:'0.2rem' }}>{app.price}</div>
        <div style={{ fontSize:'0.75rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', marginBottom:'1.2rem' }}>{app.type}</div>
        <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', borderBottom:'1px solid rgba(201,169,110,0.3)', paddingBottom:'0.15rem', alignSelf:'flex-start' }}>
          {app.price === '無料' ? '無料ダウンロード →' : app.tier === 'free' ? '無料登録で使う →' : app.price === '会員限定' ? '会員ページへ →' : '購入する →'}
        </span>
      </div>
    </a>
  )
}

const SOLILOQUY = [
  { date:'2026.06.01', title:'近日公開', preview:'昨日は20年30年語り継がれる伝説の日に、、、' },
]

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0') }),
      { threshold: 0.06 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ fontFamily: "'Didact Gothic', sans-serif" }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.4rem 4rem', background:'rgba(8,8,8,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.3rem', color:'#f8f6f2', textDecoration:'none' }}>
          Casa <span style={{ color:'#c9a96e' }}>Shindy</span>
        </Link>
        <div style={{ display:'flex', gap:'2rem', alignItems:'center' }}>
          {[['#apps','Apps'],['#culture','Culture'],['#lesson','Lesson'],['#soliloquy','独り言'],['#painter','MA@PAINTER']].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', textDecoration:'none' }}>{label}</a>
          ))}
          <Link href="/auth/login" style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', textDecoration:'none' }}>ログイン</Link>
          <Link href="/members" style={{ background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.25em', textTransform:'uppercase', padding:'0.7rem 1.5rem', textDecoration:'none', fontWeight:'bold' }}>Enter →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', position:'relative', overflow:'hidden', padding:'5rem 4rem 6rem', background:'#080808' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(10rem,28vw,24rem)', color:'transparent', WebkitTextStroke:'1px rgba(201,169,110,0.04)', whiteSpace:'nowrap', pointerEvents:'none' }}>SHINDY</div>
        <div style={{ position:'absolute', top:0, left:'38%', width:1, height:'100%', background:'linear-gradient(180deg,transparent,rgba(201,169,110,0.07),transparent)', pointerEvents:'none' }} />

        <div className="reveal opacity-0 translate-y-5 transition-all duration-700" style={{ position:'relative', zIndex:2, maxWidth:800 }}>
          <p style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
            <span style={{ display:'inline-block', width:30, height:1, background:'#c9a96e' }} />
            Official Fan Page 2026
          </p>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(5rem,18vw,15rem)', lineHeight:0.85, marginBottom:'1.5rem' }}>
            <span style={{ display:'block', color:'#f8f6f2' }}>Casa</span>
            <span style={{ display:'block', color:'transparent', WebkitTextStroke:'2px #c9a96e' }}>Shindy</span>
          </h1>
          <p style={{ fontSize:'0.82rem', lineHeight:2.2, color:'rgba(248,246,242,0.6)', maxWidth:480, borderLeft:'2px solid #c9a96e', paddingLeft:'1.2rem', marginBottom:'2.5rem' }}>
            ダンス・FX・アプリ・ゲーム・料理・アート・カルチャー。SHINDYのすべてが、ここに集まる。このWORLDへ。
          </p>
          <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>
            <Link href="/members" style={{ background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1rem 2.5rem', textDecoration:'none' }}>のぞいてみる →</Link>
            <a href="#apps" style={{ background:'transparent', color:'rgba(248,246,242,0.6)', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1rem 2rem', border:'1px solid rgba(255,255,255,0.07)', textDecoration:'none' }}>アプリ・ツール</a>

          </div>
        </div>

        <div style={{ position:'absolute', right:'4rem', bottom:'3rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.8rem' }}>
          <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:1, height:50, background:'linear-gradient(180deg,#c9a96e,transparent)', animation:'scrollPulse 2s ease infinite' }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'1rem 0', overflow:'hidden', whiteSpace:'nowrap', background:'#111' }}>
        <div style={{ display:'inline-flex', gap:'3rem', animation:'marquee 28s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem', color:'rgba(248,246,242,0.6)', display:'flex', alignItems:'center', gap:'3rem' }}>
              {item} <em style={{ color:'#c9a96e', fontStyle:'normal', fontSize:'0.75rem', letterSpacing:'0.3em' }}>✦</em>
            </span>
          ))}
        </div>
      </div>

      {/* APPS */}
      <section id="apps" style={{ padding:'8rem 4rem' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Products</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2', marginBottom:'0.5rem' }}>Apps & Tools</h2>
            <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', letterSpacing:'0.15em', display:'block', marginBottom:'3rem' }}>会員登録不要 — 誰でも購入可能</span>
          </div>

          <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'1rem' }}>無料登録で使える</span>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)', marginBottom:'3.5rem' }}>
            {APPS.filter(app => app.tier === 'free').map(renderAppCard)}
          </div>

          <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'1rem' }}>会員なら無料</span>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)', marginBottom:'3.5rem' }}>
            {APPS.filter(app => app.member && app.tier !== 'free').map(renderAppCard)}
          </div>

          <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', display:'block', marginBottom:'1rem' }}>買い切り(完全有料)</span>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)', marginBottom:'3.5rem' }}>
            {APPS.filter(app => !app.member && app.price !== '無料').map(renderAppCard)}
          </div>

          <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', display:'block', marginBottom:'1rem' }}>無料</span>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
            {APPS.filter(app => app.price === '無料').map(renderAppCard)}
          </div>
        </div>
      </section>

      {/* CULTURE — 無料公開 */}
      <section id="culture" style={{ padding:'8rem 4rem', background:'#111', borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Culture</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2', marginBottom:'0.5rem' }}>SHINDYのカルチャー</h2>
            <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', letterSpacing:'0.15em', display:'block', marginBottom:'3rem' }}>映画・本・ダンス理論</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:2, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.07)' }}>
            {[
              { icon:'🎬', name:'映画の部屋', desc:'SHINDYの人格を形成した映画たち。ただの紹介じゃない、なぜその映画が刺さったのかを語る。', href:'/members/culture/movies' },
              { icon:'📚', name:'文庫・漫画', desc:'SHINDYが読んできた文庫本・漫画。ダンスとFXと人生観に影響を与えた作品リスト。', href:'/members/culture/books' },
              { icon:'🕺', name:'4スタンス別ダンス談義', desc:'体軸理論（4スタンス理論）をダンスに応用。あなたのタイプ別に動き方が変わる。SHINDYの独自理論。', href:'/members/culture/four-stance' },
            ].map((c, i) => (
              <Link key={i} href={c.href} style={{ textDecoration:'none' }}>
                <div style={{ background:'#111', padding:'2rem 1.8rem', position:'relative', overflow:'hidden', cursor:'pointer', height:'100%' }}>
                  <span style={{ fontSize:'1.8rem', marginBottom:'1.2rem', display:'block' }}>{c.icon}</span>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.2rem', color:'#f8f6f2', marginBottom:'0.5rem' }}>{c.name}</div>
                  <p style={{ fontSize:'0.72rem', lineHeight:1.9, color:'rgba(248,246,242,0.6)' }}>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MONTHLY DANCE LESSON — 会員限定 */}
      <section id="lesson" style={{ padding:'8rem 4rem' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700" style={{ aspectRatio:'4/3', background:'#0d0d0d', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0d1a1f,#1a2838,rgba(201,169,110,0.08))' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem', color:'rgba(248,246,242,0.1)', letterSpacing:'0.2em' }}>dance video</div>
            <div style={{ position:'absolute', top:'1rem', left:'1rem', right:'-1rem', bottom:'-1rem', border:'1px solid rgba(201,169,110,0.1)', zIndex:-1 }} />
          </div>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'4rem', color:'#c9a96e', lineHeight:1, opacity:0.12 }}>DANCE</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:300, lineHeight:1.1, marginBottom:'1rem', color:'#f8f6f2' }}>Monthly<br/>Dance Lesson</h2>
            <div style={{ width:40, height:1, background:'#c9a96e', marginBottom:'1.5rem' }} />
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
              {['月1回以上 更新','会員 限定','動画配信'].map((t, i) => (
                <span key={i} style={{ fontSize:'0.75rem', letterSpacing:'0.25em', textTransform:'uppercase', padding:'0.3rem 0.7rem', border:`1px solid ${i < 2 ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.07)'}`, color: i < 2 ? '#c9a96e' : 'rgba(248,246,242,0.35)' }}>{t}</span>
              ))}
            </div>
            <p style={{ fontSize:'0.78rem', lineHeight:2.3, color:'rgba(248,246,242,0.6)', marginBottom:'2rem' }}>SHINDYが届けるダンスレクチャー動画。基礎から応用まで、ストリートダンスの本質を丁寧に解説。何度でも見返せる、あなたのペースで学べる。</p>
            <Link href="/members/lesson" style={{ background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'1rem 2rem', textDecoration:'none', display:'inline-block' }}>レッスンを見る →</Link>
          </div>
        </div>
      </section>

      {/* SOLILOQUY — 会員限定 */}
      <section id="soliloquy" style={{ padding:'8rem 4rem', background:'#111', borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <span style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'0.8rem' }}>Diary</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:300, color:'#f8f6f2', marginBottom:'0.5rem' }}>シンディの独り言</h2>
            <span style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.6)', letterSpacing:'0.15em', display:'block', marginBottom:'3rem' }}>テキスト配信</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'4rem', alignItems:'start' }}>
            <div className="reveal opacity-0 translate-y-5 transition-all duration-700" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(4rem,10vw,8rem)', color:'transparent', WebkitTextStroke:'1px rgba(201,169,110,0.12)', lineHeight:0.85, writingMode:'vertical-rl', letterSpacing:'0.05em' }}>独り言</div>
            <div className="reveal opacity-0 translate-y-5 transition-all duration-700" style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {SOLILOQUY.map((s, i) => (
                <div key={i} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.6rem', position:'relative' }}>
                  <div style={{ fontSize:'0.75rem', letterSpacing:'0.3em', color:'rgba(248,246,242,0.6)', marginBottom:'0.6rem' }}>{s.date}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.05rem', color:'#f8f6f2', marginBottom:'0.4rem' }}>{s.title}</div>
                  <p style={{ fontSize:'0.73rem', lineHeight:1.8, color:'rgba(248,246,242,0.6)' }}>{s.preview}</p>
                </div>
              ))}
              <div style={{ textAlign:'center', padding:'1.4rem', border:'1px solid rgba(255,255,255,0.07)', borderTop:'none' }}>
                <Link href="/members/columns" style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a96e', textDecoration:'none' }}>すべて読む →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MA@PAINTER */}
      <section id="painter" style={{ padding:'8rem 4rem' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
            {['linear-gradient(135deg,#0d1a1f,#5bc8d0,#c9a96e)','linear-gradient(160deg,#1a0a08,#c9a96e,#e8c98a)','linear-gradient(120deg,#0a0d1a,#1a2840,#5bc8d0)','linear-gradient(140deg,#1a1408,#c9a96e)'].map((bg, i) => (
              <div key={i} style={{ aspectRatio: i === 0 ? '2/1' : '1/1', gridColumn: i === 0 ? 'span 2' : 'auto', background:bg, overflow:'hidden' }} />
            ))}
          </div>
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3rem', color:'#c9a96e', letterSpacing:'0.05em', lineHeight:1, marginBottom:'0.3rem' }}>MA@PAINTER</div>
            <div style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', marginBottom:'1.5rem' }}>Mahiro — Artist / Painter</div>
            <div style={{ width:40, height:1, background:'#c9a96e', marginBottom:'1.5rem' }} />
            <p style={{ fontSize:'0.78rem', lineHeight:2.3, color:'rgba(248,246,242,0.6)', marginBottom:'2rem' }}>ハワイの光、海、沈黙。MA@PAINTERの作品は、その瞬間を永遠にする。一点ものの原画から限定プリントまで、Casa Shindyだけで出会える。</p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <Link href="/members/painter" style={{ background:'#c9a96e', color:'#080808', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem 2rem', textDecoration:'none' }}>絵画の部屋へ →</Link>
              <a href="https://instagram.com/ma_painter" target="_blank" style={{ background:'transparent', color:'rgba(248,246,242,0.6)', fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', padding:'0.9rem 1.5rem', border:'1px solid rgba(255,255,255,0.07)', textDecoration:'none' }}>Instagram →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#0d0d0d', borderTop:'1px solid rgba(255,255,255,0.07)', padding:'3rem 4rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'2rem', marginBottom:'2.5rem' }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.4rem', color:'#f8f6f2' }}>Casa <span style={{ color:'#c9a96e' }}>Shindy</span></div>
          <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap' }}>
            {[['#apps','Apps'],['#culture','Culture'],['#lesson','Lesson'],['#soliloquy','独り言'],['#painter','MA@PAINTER']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize:'0.75rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,246,242,0.6)', textDecoration:'none' }}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <span style={{ fontSize:'0.75rem', letterSpacing:'0.15em', color:'rgba(248,246,242,0.25)' }}>© 2026 Casa Shindy. All rights reserved.</span>
          <span style={{ fontSize:'0.75rem', letterSpacing:'0.15em', color:'rgba(248,246,242,0.25)' }}>Powered by Stripe — 安全な決済</span>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollPulse {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
        .reveal { transition: opacity 0.9s ease, transform 0.9s ease; }
        @media (max-width: 768px) {
          nav { padding: 1.2rem 1.5rem; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </main>
  )
}
