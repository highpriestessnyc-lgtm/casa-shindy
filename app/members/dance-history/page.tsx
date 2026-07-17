import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function DanceHistoryPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080808', color:'#f8f6f2', fontFamily:'sans-serif' }}>

      {/* サイドバー */}
      <aside style={{ width:160, flexShrink:0, position:'sticky', top:0, height:'100vh', overflowY:'auto', padding:'1.5rem 1rem', borderRight:'1px solid rgba(255,255,255,0.07)', background:'#0a0a0a' }}>
        <a href="/members" style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.3)', textDecoration:'none', display:'block', marginBottom:'1.5rem', letterSpacing:'0.2em' }}>← Back</a>
        <div style={{ fontSize:'0.52rem', letterSpacing:'0.3em', color:'#c9a96e', marginBottom:'1rem', textTransform:'uppercase' }}>目次</div>
        {[
          ['#prologue','序章・起源'],
          ['#ballet','🩰 バレエ'],
          ['#tap','👞 タップ'],
          ['#soul','🎙 ソウル'],
          ['#breaking','🏙 Breaking'],
          ['#popping','⚡ Popping'],
          ['#locking','🔒 Locking'],
          ['#waacking','💜 Waacking'],
          ['#hiphop','🎤 Hip Hop'],
          ['#house','🎛 House'],
          ['#jazz','🌀 Jazz'],
        ].map(([href, label]) => (
          <a key={href} href={href} style={{ display:'block', fontSize:'0.68rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', padding:'0.35rem 0.5rem', marginBottom:'0.1rem', borderLeft:'2px solid transparent', lineHeight:1.4 }}>{label}</a>
        ))}
      </aside>

      {/* メインコンテンツ */}
      <div style={{ flex:1, overflowY:'auto' }}>

        {/* ナビ */}
        <nav style={{ position:'sticky', top:0, background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:100 }}>
          <span style={{ fontFamily:'serif', fontStyle:'italic', color:'#c9a96e', fontSize:'1rem' }}>ダンスの歴史 大百科</span>
          <span style={{ fontSize:'0.55rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em', border:'1px solid rgba(255,255,255,0.07)', padding:'0.2rem 0.6rem' }}>MEMBERS ONLY</span>
        </nav>

        {/* ヒーロー */}
        <div id="top" style={{ textAlign:'center', padding:'4rem 2rem 3rem', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'linear-gradient(180deg,#0d0a08,#080808)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>💃</div>
          <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontWeight:300, fontSize:'clamp(1.8rem,5vw,3.5rem)', color:'#f8f6f2', marginBottom:'0.5rem' }}>ダンスの歴史 大百科</h1>
          <p style={{ fontFamily:'serif', fontStyle:'italic', color:'#c9a96e', fontSize:'0.9rem', marginBottom:'1rem' }}>Dance History Encyclopedia — Complete Edition</p>
          <p style={{ fontSize:'0.78rem', color:'rgba(248,246,242,0.4)', lineHeight:1.8 }}>起源から現代まで、ステップ辞典、人物名鑑、クルー図鑑</p>
        </div>

        <div style={{ maxWidth:800, margin:'0 auto', padding:'3rem 2rem' }}>

          {/* Prologue */}
          <section id="prologue" style={{ marginBottom:'4rem', paddingTop:'1rem' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>PROLOGUE</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'1.5rem' }}>ダンスの起源</h2>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1rem' }}>ダンスの歴史は人類の歴史と同様に古い。すべての民族は固有のダンスを持ち、踊りは生命に内在する根源的な活動である。旧石器時代のアルタミラ洞窟の壁画には、すでに人々が踊る様子が描かれています。</p>
            <blockquote style={{ borderLeft:'3px solid #c9a96e', paddingLeft:'1.5rem', margin:'1.5rem 0', fontFamily:'serif', fontStyle:'italic', fontSize:'0.95rem', color:'rgba(248,246,242,0.7)', lineHeight:1.9 }}>日本の古事記・天岩戸神話では、天宇受売命（アメノウズメ）が力強くエロティックに踊り八百万の神々を大笑いさせ、閉じこもった天照大神を引き出して世界に光を取り戻しました。</blockquote>
          </section>

          {/* Ballet */}
          <section id="ballet" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER I</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🩰 バレエ</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Ballet — From Renaissance Italy to the Russian Imperial Stage</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>バレエはルネサンス期イタリアに起源を発し、フランス宮廷で体系化され、ロシアで頂点を極めた。歌詞・台詞を伴わない舞台舞踊の最高峰。</p>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>主要人物</h3>
            {[
              ['ルイ14世 1638–1715', 'The Sun King', '5歳で即位、15歳でバレエ本格デビュー。1661年に王立舞踏アカデミーを創立しバレエを体系化。'],
              ['マリー・タリオーニ 1804–1884', 'La Sylphide', '1832年「ラ・シルフィード」でポワント技法を本格確立。ロマンティック・バレエを完成させた女神。'],
              ['アンナ・パブロワ 1881–1931', 'The Dying Swan', '「瀕死の白鳥」の代名詞。1922年の日本公演は西洋舞踏を日本に広く知らしめた。'],
            ].map(([name, sub, desc]) => (
              <div key={name} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'0.5rem' }}>
                <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{name}</div>
                <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>{sub}</div>
                <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>{desc}</p>
              </div>
            ))}
          </section>

          {/* Tap */}
          <section id="tap" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER II</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>👞 タップダンス</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Tap Dance — The Soul's Cry Beaten into the Floor</p>
            <blockquote style={{ borderLeft:'3px solid #c9a96e', paddingLeft:'1.5rem', margin:'1.5rem 0', fontFamily:'serif', fontStyle:'italic', fontSize:'0.95rem', color:'rgba(248,246,242,0.7)', lineHeight:1.9 }}>タップダンスとは虐げられた人々の発散であり、魂の叫びなのである</blockquote>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>1739年、サウスカロライナ州で暴動が発生した後、白人は黒人が集まる場でのドラムを禁止しました。ドラムの替わりに足を踏み鳴らして音を出したことがタップダンスの起源です。</p>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>伝説のタップダンサー</h3>
            {[
              ['ビル・ボージャングルス・ロビンソン 1878–1949', 'The King of Tap', '黒人タップダンサーとして史上最初のスター。毎年5月25日「National Tap Dance Day」は彼の誕生日にちなむ。'],
              ['グレゴリー・ハインズ 1946–2003', 'The Last Great Hoofer', '映画「ホワイトナイツ」でバリシニコフと共演。ブロードウェイでトニー賞受賞。'],
              ['フレッド・アステア 1899–1987', 'Hollywood Tap Legend', '1930〜40年代ハリウッド黄金期にジンジャー・ロジャースと10本の映画で共演。'],
            ].map(([name, sub, desc]) => (
              <div key={name} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'0.5rem' }}>
                <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{name}</div>
                <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>{sub}</div>
                <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>{desc}</p>
              </div>
            ))}
          </section>

          {/* Soul */}
          <section id="soul" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER III</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🎙 ソウルダンス</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Soul Dance — The Heartbeat That Birthed All Street Dance</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>すべてのストリートダンスの原点。1960年代の公民権運動と共に生まれ、SOUL TRAINを通じて世界に広まった。</p>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'1rem' }}>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>ジェームス・ブラウン 1933–2006</div>
              <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>The Godfather of Soul</div>
              <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>1965年「Papa's Got a Brand New Bag」でFUNKを発明。Breaking・Popping・Locking・Hip Hopすべてに絶大な影響。</p>
            </div>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>ソウルダンス ステップ（抜粋）</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {['ポップコーン','セックスマシーン','ファンキーチキン','モンキー','バスストップ','ハッスル','バンプ','フリーク','ゴーゴー','ブレイクダウン'].map(s => (
                <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
              ))}
            </div>
          </section>

          {/* Breaking */}
          <section id="breaking" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER IV</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🏙 ブレイクダンス（Breaking）</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Breaking — Born on the Streets of the South Bronx, 1970s</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>1970年代、ニューヨークのサウスブロンクスで生まれたストリートダンス。HIPHOPの4大要素の一つ。現在世界でもっともダンス人口が多いジャンル。</p>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'1rem' }}>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>DJ Kool Herc</div>
              <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>Father of Hip Hop</div>
              <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>1973年8月11日にブロンクスの1520 Sedgwick Aveで妹のパーティーを開催。これがHIPHOP誕生の瞬間。</p>
            </div>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>4つの構成要素</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {['トップロック（エントリー）','フットワーク','パワームーブ','フリーズ'].map(s => (
                <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
              ))}
            </div>
          </section>

          {/* Popping */}
          <section id="popping" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER V</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>⚡ ポッピング（Popping）</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Popping — Electric, Mechanical, Alive — Born in Fresno 1977</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>1977年、カリフォルニア州フレズノで誕生。筋肉を弾く（ポップする）ことを特徴とし、Electric Boogaloosが世界に広めた。</p>
            {[
              ['Boogaloo Sam', '創設者・マイケル・ジャクソンの師匠', 'フレズノでポッピングとEB Boogalooを生み出した。'],
              ['Poppin Pete', 'Boogaloo Samの弟', 'Soul Trainを見ながらロボットムーブを練習し兄からポッピングを学んだ。'],
            ].map(([name, sub, desc]) => (
              <div key={name} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'0.5rem' }}>
                <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{name}</div>
                <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>{sub}</div>
                <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>{desc}</p>
              </div>
            ))}
          </section>

          {/* Locking */}
          <section id="locking" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER VI</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🔒 ロックダンス（Locking）</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Locking — Freeze, Point, and Own the Room</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>1969年、LAで偶然生まれたストリートダンス。激しい動きから突然静止（ロック）するスタイルが特徴。</p>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'1rem' }}>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>Don "Campbellock" Campbell</div>
              <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>The Lockers 創設者</div>
              <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>Funky Chickenを滑らかにできず偶然ロッキングを発明。</p>
            </div>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>基本動作</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {['TWIRL','LOCK','POINT','PACING','FIVE','SCOOBIE DO','KICK WALK'].map(s => (
                <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
              ))}
            </div>
          </section>

          {/* Waacking */}
          <section id="waacking" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER VII</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>💜 ワッキング（Waacking）</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Waacking — Born in the Underground Clubs of 1970s LA</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)' }}>70年代初期、LAのゲイクラブで生まれたダンス。当時の女優や女性スターのポーズを真似ることから始まり、腕を巻きつけるような独特の動きへと発展した。</p>
            <blockquote style={{ borderLeft:'3px solid #c9a96e', paddingLeft:'1.5rem', margin:'1.5rem 0', fontFamily:'serif', fontStyle:'italic', fontSize:'0.95rem', color:'rgba(248,246,242,0.7)', lineHeight:1.9 }}>ストレートなダンサーは「PUNKING」と差別的に呼んでいたが、自分たちは「WAACKING」と名乗った。</blockquote>
          </section>

          {/* Hip Hop */}
          <section id="hiphop" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER VIII</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🎤 ヒップホップダンス</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Hip Hop Dance — Born August 11, 1973 in the Bronx</p>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'1rem 0', fontStyle:'italic' }}>伝説のクルー</h3>
            {[
              ['MOPTOP', '1991年設立', 'Link / Caleaf / Ejoe / Buddha Stretchら。'],
              ['ELITE FORCE', '1992年設立', 'Michael Jacksonの「Remember the Time」MV撮影のために結成。'],
              ['ZOO（日本）', 'TV朝日「DA DA LMD」発', 'EXILEのHIROが所属していた伝説のチーム。'],
            ].map(([name, sub, desc]) => (
              <div key={name} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'0.5rem' }}>
                <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{name}</div>
                <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>{sub}</div>
                <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>{desc}</p>
              </div>
            ))}
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', fontStyle:'italic' }}>ニュースクールHIPHOPステップ（抜粋）</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {['ランニングマン','ロジャーラビット','キャベッジパッチ','ロボコップ','バートシンプソン','フィラ','スティーブマーティン','ニュージャックスイング'].map(s => (
                <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
              ))}
            </div>
          </section>

          {/* House */}
          <section id="house" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER IX</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🎛 ハウスダンス</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>House Dance — Where the Music Moves the Body</p>
            <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1.5rem' }}>1970年代末、ニューヨーク「パラダイス・ガラージ」とシカゴ「ウェアハウス」から生まれた。</p>
            <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'1rem 0', fontStyle:'italic' }}>3大要素</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1.5rem' }}>
              {['フットワーク（Footwork）','ジャッキング（Jacking）','ロフティング（Lofting）'].map(s => (
                <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
              ))}
            </div>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem' }}>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>ROOTS（日本）</div>
              <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>1993年頃設立 — 日本初の本格ハウスダンスチーム</div>
              <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>KOJI / Hyrosshi / Nada / Kango / Shimura / Yan / KAIE / MAら。</p>
            </div>
          </section>

          {/* Jazz */}
          <section id="jazz" style={{ marginBottom:'4rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'0.55rem', letterSpacing:'0.4em', color:'#c9a96e', marginBottom:'0.5rem' }}>CHAPTER X</div>
            <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'2.5rem', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>🌀 ジャズ＆コンテンポラリー</h2>
            <p style={{ fontSize:'0.75rem', fontStyle:'italic', color:'rgba(248,246,242,0.35)', marginBottom:'1.5rem' }}>Jazz Dance & Contemporary Dance — Freedom Through Movement</p>
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'1rem' }}>
              <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>キャサリン・ダンハム 1909–2006</div>
              <div style={{ fontSize:'0.62rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>Pioneer of Jazz Dance</div>
              <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>黒人で初めてバレエカンパニーを創設し、ブロードウェイの舞台に立った。</p>
            </div>
          </section>

          {/* FIN */}
          <div style={{ textAlign:'center', padding:'3rem 0', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✦</div>
            <p style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#c9a96e', lineHeight:2 }}>すべてのダンスに魂がある</p>
            <div style={{ fontSize:'1rem', letterSpacing:'0.5em', color:'rgba(201,169,110,0.3)', marginTop:'1rem' }}>✦ FIN ✦</div>
          </div>

        </div>
      </div>
    </div>
  )
}
