  return (
    <main style={{ minHeight:'100vh', background:'#080808', color:'#f8f6f2', fontFamily:'sans-serif' }}>
      {/* ナビ */}
      <nav style={{ position:'sticky', top:0, background:'rgba(8,8,8,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:100 }}>
        <a href="/members" style={{ color:'rgba(248,246,242,0.4)', textDecoration:'none', fontSize:'0.7rem', letterSpacing:'0.2em' }}>← Members</a>
        <span style={{ fontFamily:'serif', fontStyle:'italic', color:'#c9a96e', fontSize:'1rem' }}>ダンスの歴史 大百科</span>
        <span style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em' }}>MEMBERS ONLY</span>
      </nav>

      {/* ヒーロー */}
      <div style={{ textAlign:'center', padding:'6rem 2rem 4rem', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'linear-gradient(180deg,#0d0a08,#080808)' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>💃</div>
        <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontWeight:300, fontSize:'clamp(2rem,6vw,4rem)', color:'#f8f6f2', marginBottom:'0.5rem' }}>ダンスの歴史 大百科</h1>
        <p style={{ fontFamily:'serif', fontStyle:'italic', color:'#c9a96e', fontSize:'1rem', marginBottom:'1rem' }}>Dance History Encyclopedia — Complete Edition</p>
        <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.4)', lineHeight:1.8 }}>起源から現代まで、ステップ辞典、人物名鑑、クルー図鑑<br/>人類の誕生と共にあった踊りの全記録</p>
        <div style={{ display:'flex', justifyContent:'center', gap:'1rem', marginTop:'2rem', flexWrap:'wrap' }}>
          {['Ballet','Tap','Jazz','Soul','Breaking','Popping','Locking','Waacking','Hip Hop','House','Contemporary'].map(g => (
            <span key={g} style={{ fontSize:'0.65rem', letterSpacing:'0.2em', border:'1px solid rgba(201,169,110,0.3)', color:'#c9a96e', padding:'0.3rem 0.8rem' }}>{g}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:860, margin:'0 auto', padding:'4rem 2rem' }}>

        {/* 目次 */}
        <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'2rem', marginBottom:'4rem' }}>
          <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.3rem', color:'#c9a96e', marginBottom:'1.5rem' }}>目次</h2>
          {[
            ['Prologue','ダンスの起源'],
            ['Chapter I','バレエ'],
            ['Chapter II','タップダンス'],
            ['Chapter III','ソウルダンス'],
            ['Chapter IV','ブレイクダンス（Breaking）'],
            ['Chapter V','ポッピング（Popping）'],
            ['Chapter VI','ロックダンス（Locking）'],
            ['Chapter VII','ワッキング（Waacking）'],
            ['Chapter VIII','ヒップホップダンス（New School）'],
            ['Chapter IX','ハウスダンス（House Dance）'],
            ['Chapter X','ジャズダンス＆コンテンポラリー'],
          ].map(([ch, title]) => (
            <div key={ch} style={{ display:'flex', gap:'1rem', padding:'0.6rem 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize:'0.65rem', color:'#c9a96e', letterSpacing:'0.2em', minWidth:'80px' }}>{ch}</span>
              <span style={{ fontSize:'0.85rem', color:'rgba(248,246,242,0.7)' }}>{title}</span>
            </div>
          ))}
        </div>

        {/* Prologue */}
        <Section id="prologue" icon="🌍" chapter="Prologue" title="ダンスの起源" subtitle="The Origins of Dance — As Ancient as Life Itself">
          <P>ダンスの歴史は人類の歴史と同様に古い。すべての民族は固有のダンスを持ち、踊りは生命に内在する根源的な活動である。</P>
          <P>旧石器時代のアルタミラ洞窟の壁画には、すでに人々が踊る様子が描かれています。動物、特に鳥類にも固有のダンスが見られることから、踊りとは生命そのものに宿る衝動と言われています。</P>
          <Quote>日本の古事記・天岩戸神話では、天宇受売命（アメノウズメ）が力強くエロティックに踊り八百万の神々を大笑いさせ、閉じこもった天照大神を引き出して世界に光を取り戻しました。ダンスはつねに人間の祈りや願いを神に伝える手段でした。</Quote>
          <P>古代ギリシアでは、プラトンやアリストテレスもダンスを踊りました。身体的にも精神的にも健康な人間を育む教育の方法としてです。ダンスは宗教的儀礼から労働の意識高揚、通過儀礼まで人間生活のあらゆる場面に息づいてきました。</P>
        </Section>

        {/* Chapter I バレエ */}
        <Section id="ballet" icon="🩰" chapter="Chapter I" title="バレエ" subtitle="Ballet — From Renaissance Italy to the Russian Imperial Stage">
          <P>バレエはルネサンス期イタリアに起源を発し、フランス宮廷で体系化され、ロシアで頂点を極めた。歌詞・台詞を伴わない舞台舞踊の最高峰。</P>
          <H3>起源と歴史</H3>
          <Timeline items={[
            ['1463年','グリエルモ・エブレオ著書で「Balletto」という語が初めて用いられる'],
            ['1533年','メディチ家のカトリーヌがフランス王室へ嫁ぎバレエを伝える'],
            ['1581年','「王妃のバレエ・コミック」─ 完全な記録の残る最古のバレエ作品'],
            ['1661年','ルイ14世が王立舞踏アカデミー創立。バレエが体系化される'],
            ['1832年','マリー・タリオーニがポワント確立。ロマンティック・バレエ誕生'],
            ['1890年','チャイコフスキー「眠れる森の美女」初演。3大バレエ幕開け'],
            ['1927年','エリアナ・パブロワが鎌倉に日本初バレエ稽古場設立'],
          ]} />
          <H3>主要人物</H3>
          <Person name="ルイ14世（Louis XIV）1638–1715" subtitle="The Sun King — Father of Professional Ballet">5歳で即位、15歳でバレエ本格デビュー。1661年に王立舞踏アカデミーを創立しバレエを体系化。</Person>
          <Person name="マリー・タリオーニ（Marie Taglioni）1804–1884" subtitle="La Sylphide — Queen of Romantic Ballet">1832年「ラ・シルフィード」でポワント技法を本格確立。ロマンティック・バレエを完成させた女神。</Person>
          <Person name="アンナ・パブロワ（Anna Pavlova）1881–1931" subtitle="The Dying Swan — World's Greatest Ballerina">「瀕死の白鳥」の代名詞。1922年の日本公演は西洋舞踏を日本に広く知らしめた。</Person>
        </Section>

        {/* Chapter II タップ */}
        <Section id="tap" icon="👞" chapter="Chapter II" title="タップダンス" subtitle="Tap Dance — The Soul's Cry Beaten into the Floor">
          <Quote>タップダンスとは虐げられた人々の発散であり、魂の叫びなのである</Quote>
          <P>1739年、サウスカロライナ州で暴動が発生した後、白人は黒人が集まる場でのドラムを禁止しました。ドラムの替わりに足を踏み鳴らして音を出したことがタップダンスの起源です。</P>
          <H3>伝説のタップダンサーたち</H3>
          <Person name="ビル・ボージャングルス・ロビンソン 1878–1949" subtitle="The King of Tap — Mayor of Harlem">黒人タップダンサーとして史上最初のスター。毎年5月25日の「National Tap Dance Day」は彼の誕生日にちなむ。</Person>
          <Person name="フレッド・アステア 1899–1987 & ジンジャー・ロジャース 1911–1995" subtitle="The Golden Duo of Hollywood Tap">1930〜40年代ハリウッド黄金期に10本の映画で共演。「彼女はアステアがやることをすべて後ろ向きで、ハイヒールでやった」。</Person>
          <Person name="グレゴリー・ハインズ 1946–2003" subtitle="The Last Great Hoofer — Tap's Greatest Ambassador">映画「ホワイトナイツ」でバリシニコフと共演。ブロードウェイでトニー賞受賞。</Person>
        </Section>

        {/* Chapter III ソウル */}
        <Section id="soul" icon="🎙" chapter="Chapter III" title="ソウルダンス" subtitle="Soul Dance — The Heartbeat That Birthed All Street Dance">
          <P>すべてのストリートダンスの原点。1960年代の公民権運動と共に生まれ、SOUL TRAINを通じて世界に広まった。</P>
          <Person name="ジェームス・ブラウン 1933–2006" subtitle="The Godfather of Soul — Father of All Street Dance">Breaking・Popping・Locking・Hip Hopすべてに絶大な影響。1965年「Papa's Got a Brand New Bag」でFUNKを発明。</Person>
          <H3>ソウルダンス ステップ大辞典（抜粋）</H3>
          <StepList steps={['ポップコーン','セックスマシーン','ファンキーチキン','モンキー','バスストップ','ハッスル','バンプ','フリーク','ゴーゴー']} />
        </Section>

        {/* Chapter IV Breaking */}
        <Section id="breaking" icon="🏙" chapter="Chapter IV" title="ブレイクダンス（Breaking）" subtitle="Breaking — Born on the Streets of the South Bronx, 1970s">
          <P>1970年代、ニューヨークのサウスブロンクスで生まれたストリートダンス。HIPHOPの4大要素の一つ。現在世界でもっともダンス人口が多いジャンル。</P>
          <Person name="DJ Kool Herc" subtitle="Father of Hip Hop — Inventor of Breakbeats">1973年8月11日にブロンクスの1520 Sedgwick Aveで妹のパーティーを開催。これがHIPHOP誕生の瞬間。</Person>
          <H3>4つの構成要素</H3>
          <StepList steps={['トップロック（エントリー）','フットワーク','パワームーブ','フリーズ']} />
        </Section>

        {/* Chapter V Popping */}
        <Section id="popping" icon="⚡" chapter="Chapter V" title="ポッピング（Popping）" subtitle="Popping — Electric, Mechanical, Alive — Born in Fresno 1977">
          <P>1977年、カリフォルニア州フレズノで誕生。筋肉を弾く（ポップする）ことを特徴とし、Electric Boogaloosが世界に広めた。</P>
          <H3>Electric Boogaloos</H3>
          <Person name="Boogaloo Sam（Sam Solomon）" subtitle="創設者 — マイケル・ジャクソンの師匠">フレズノでポッピングとEB Boogalooを生み出した。</Person>
          <Person name="Poppin' Pete" subtitle="Boogaloo Samの弟">Soul Trainを見ながらロボットムーブを練習し兄からポッピングを学んだ。</Person>
          <Quote>Hit＝どこかに当てる意識で筋肉を急激に緊張。Pop＝静止した状態で筋肉を急激に緊張。</Quote>
        </Section>

        {/* Chapter VI Locking */}
        <Section id="locking" icon="🔒" chapter="Chapter VI" title="ロックダンス（Locking）" subtitle="Locking — Freeze, Point, and Own the Room">
          <P>1969年、LAで偶然生まれたストリートダンス。激しい動きから突然静止（ロック）するスタイルが特徴。</P>
          <H3>The Lockersメンバー</H3>
          <Person name="Don 'Campbellock' Campbell" subtitle="創設者">Funky Chickenを滑らかにできず偶然ロッキングを発明。</Person>
          <Person name="Toni 'Mickey' Basil" subtitle="唯一の女性メンバー">バレリーナ兼コリオグラファー。1982年「Hey Mickey」ヒット。</Person>
          <H3>基本動作</H3>
          <StepList steps={['TWIRL（手首巻き上げ）','LOCK（静止）','POINT（指さし）','PACING（横パンチ）','FIVE（手叩き）','SCOOBIE DO','KICK WALK']} />
        </Section>

        {/* Chapter VII Waacking */}
        <Section id="waacking" icon="💜" chapter="Chapter VII" title="ワッキング（Waacking）" subtitle="Waacking — Born in the Underground Clubs of 1970s LA">
          <P>70年代初期、LAのゲイクラブで生まれたダンス。当時の女優や女性スターのポーズを真似ることから始まり、腕を巻きつけるような独特の動きへと発展した。</P>
          <Quote>ストレートなダンサーは「PUNKING」と差別的に呼んでいたが、自分たちは「WAACKING」と名乗った。</Quote>
        </Section>

        {/* Chapter VIII Hip Hop */}
        <Section id="hiphop" icon="🎤" chapter="Chapter VIII" title="ヒップホップダンス（New School）" subtitle="Hip Hop Dance — Born August 11, 1973 in the Bronx">
          <H3>伝説のクルー</H3>
          <Person name="MOPTOP" subtitle="1991年設立">Link / Caleaf / Ejoe / Buddha Stretchら。</Person>
          <Person name="ELITE FORCE" subtitle="1992年設立">Michael Jacksonの「Remember the Time」MV撮影のために結成。</Person>
          <Person name="MYSTIDIOUS MISFITS" subtitle="MOPTOPから派生">1992年「ALIVE TV」で全世界に多大な影響。</Person>
          <H3>ニュースクールHIPHOPステップ（抜粋）</H3>
          <StepList steps={['ランニングマン','ロジャーラビット','キャベッジパッチ','ロボコップ','バートシンプソン','フィラ','ランニングマン','スティーブマーティン','ニュージャックスイング']} />
          <H3>日本のHIPHOPダンス</H3>
          <Person name="ZOO" subtitle="TV朝日「DA DA LMD」発 — EXILEのHIROが所属">Taco / Naoya / Mark / Satsuki / ルーク / Hiro / Cap / Hisami / Saeら。</Person>
        </Section>

        {/* Chapter IX House */}
        <Section id="house" icon="🎛" chapter="Chapter IX" title="ハウスダンス（House Dance）" subtitle="House Dance — Where the Music Moves the Body">
          <P>1970年代末、ニューヨーク「パラダイス・ガラージ」とシカゴ「ウェアハウス」から生まれた。</P>
          <H3>3大要素</H3>
          <StepList steps={['フットワーク（Footwork）— タップダンスからの影響大','ジャッキング（Jacking）— 上半身を前後に激しく揺らすシカゴ発祥','ロフティング（Lofting）— 流れるようなスムーズなムーブ']} />
          <H3>日本のハウスチーム</H3>
          <Person name="ROOTS（1993年頃）" subtitle="日本初の本格ハウスダンスチーム">KOJI / Hyrosshi / Nada / Kango / Shimura / Yan / KAIE / MAら。</Person>
        </Section>

        {/* Chapter X Jazz */}
        <Section id="jazz" icon="🌀" chapter="Chapter X" title="ジャズダンス＆コンテンポラリー" subtitle="Jazz Dance & Contemporary Dance — Freedom Through Movement">
          <Person name="キャサリン・ダンハム 1909–2006" subtitle="Pioneer of Jazz Dance">黒人で初めてバレエカンパニーを創設し、ブロードウェイの舞台に立った。</Person>
          <H3>日本のコンテンポラリーダンサー</H3>
          <StepList steps={['安藤洋子 — 繊細かつ強靭な身体表現','勅使川原三郎 — 光・音・空間を統合した独自の舞台美学','森山開次 — NHK大河ドラマ振付も担当']} />
        </Section>

        {/* FIN */}
        <div style={{ textAlign:'center', padding:'4rem 0', borderTop:'1px solid rgba(255,255,255,0.07)', marginTop:'4rem' }}>
          <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✦</div>
          <p style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1.1rem', color:'#c9a96e', lineHeight:2 }}>
            すべてのダンスに魂がある<br/>
            <span style={{ color:'rgba(248,246,242,0.5)', fontSize:'0.85rem' }}>Every Dance Carries a Soul — Past, Present, Future</span>
          </p>
          <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.35)', marginTop:'1.5rem', lineHeight:2 }}>
            バレエの宮廷から路地裏のブレイクダンスへ。ソウルの叫びからシカゴのハウスへ。<br/>
            フレズノのポッピングからパリのコンテンポラリーへ。
          </p>
          <div style={{ marginTop:'2rem', fontSize:'1.5rem', letterSpacing:'0.5em', color:'rgba(201,169,110,0.4)' }}>✦ FIN ✦</div>
        </div>

      </div>
    </main>
  )
}

// Components
function Section({ id, icon, chapter, title, subtitle, children }: any) {
  return (
    <section id={id} style={{ marginBottom:'5rem', paddingTop:'2rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ marginBottom:'2rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>{icon}</span>
          <span style={{ fontSize:'0.6rem', letterSpacing:'0.4em', color:'#c9a96e', textTransform:'uppercase' }}>{chapter}</span>
        </div>
        <h2 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>{title}</h2>
        <p style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.4)', fontStyle:'italic' }}>{subtitle}</p>
      </div>
      {children}
    </section>
  )
}

function H3({ children }: any) {
  return <h3 style={{ fontFamily:'serif', fontSize:'1rem', color:'#c9a96e', margin:'2rem 0 1rem', letterSpacing:'0.1em', fontStyle:'italic' }}>{children}</h3>
}

function P({ children }: any) {
  return <p style={{ fontSize:'0.85rem', lineHeight:2.2, color:'rgba(248,246,242,0.65)', marginBottom:'1rem' }}>{children}</p>
}

function Quote({ children }: any) {
  return (
    <blockquote style={{ borderLeft:'3px solid #c9a96e', paddingLeft:'1.5rem', margin:'1.5rem 0', fontFamily:'serif', fontStyle:'italic', fontSize:'0.95rem', color:'rgba(248,246,242,0.7)', lineHeight:1.9 }}>
      {children}
    </blockquote>
  )
}

function Person({ name, subtitle, children }: any) {
  return (
    <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem', marginBottom:'0.5rem' }}>
      <div style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'1rem', color:'#f8f6f2', marginBottom:'0.2rem' }}>{name}</div>
      <div style={{ fontSize:'0.65rem', color:'#c9a96e', letterSpacing:'0.15em', marginBottom:'0.6rem' }}>{subtitle}</div>
      {children && <p style={{ fontSize:'0.8rem', lineHeight:1.8, color:'rgba(248,246,242,0.5)' }}>{children}</p>}
    </div>
  )
}

function Timeline({ items }: any) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:1, marginBottom:'1.5rem' }}>
      {items.map(([year, desc]: any) => (
        <div key={year} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:'1rem', padding:'0.7rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize:'0.7rem', color:'#c9a96e', letterSpacing:'0.1em', paddingTop:'0.1rem' }}>{year}</span>
          <span style={{ fontSize:'0.82rem', color:'rgba(248,246,242,0.65)', lineHeight:1.6 }}>{desc}</span>
        </div>
      ))}
    </div>
  )
}

function StepList({ steps }: any) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1.5rem' }}>
      {steps.map((s: string) => (
        <span key={s} style={{ fontSize:'0.72rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.4rem 0.8rem', color:'rgba(248,246,242,0.6)' }}>{s}</span>
      ))}
    </div>
  )
}
