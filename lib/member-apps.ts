// 会員エリアから使える外部アプリの設定。
// ここに登録したキーは /access/[key] でログイン(+ tier が paid なら会員)チェックしてから
// 外部サイトへのリンクを見せる。
//   tier 'free' : 無料登録(ログイン)だけで使える
//   tier 'paid' : 月額¥500の会員だけ
export const MEMBER_APPS: Record<string, { name: string; icon: string; href: string; desc: string; tier: 'free' | 'paid' }> = {
  kondate: {
    name: '献立アプリ',
    icon: '🍱',
    href: 'https://highpriestessnyc-lgtm.github.io/kondate-app/',
    desc: '毎日の献立をAIが提案。栄養バランス・家族の好みから最適メニューを生成。',
    tier: 'free',
  },
  'bingo-analyzer': {
    name: 'BINGO ANALYZER PRO',
    icon: '📈',
    href: 'https://bingo-analyzer-pro.vercel.app',
    desc: 'BINGO LADDERのチャート分析AIツール。',
    tier: 'paid',
  },
  'word-street': {
    name: 'WORD STREET',
    icon: '📚',
    href: 'https://word-street-git-main-highpriestessnyc-1447s-projects.vercel.app',
    desc: 'ストリートカルチャーで学ぶ英語アプリ。',
    tier: 'free',
  },
  'cosmic-calendar': {
    name: 'COSMIC CALENDAR',
    icon: '🌙',
    href: 'https://cosmic-calendar-six.vercel.app',
    desc: 'マヤ暦・算命学・四柱推命・西洋占星術の複合占いアプリ。',
    tier: 'free',
  },
  kokushi: {
    name: '国史年表',
    icon: '📜',
    href: 'https://highpriestessnyc-lgtm.github.io/kokushi/kokushi_nenpyou.html',
    desc: '日本の歴史をインタラクティブに学べるタイムライン。',
    tier: 'free',
  },
  'african-rhythm': {
    name: 'アフリカン リズム図鑑',
    icon: '🥁',
    href: 'https://highpriestessnyc-lgtm.github.io/guinea-rhythm-atlas/',
    desc: 'ジャンベ・ドゥンドゥンなど、アフリカンダンスの伝統リズムを地方別に整理した図鑑。',
    tier: 'free',
  },
}
