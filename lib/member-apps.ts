// 「会員なら無料」で使える外部アプリの設定。
// ここに登録したキーは /access/[key] で実際にログイン+会員チェックしてから
// 外部サイトへのリンクを見せる(バッジだけの表示ではなく、本物のゲート)。
export const MEMBER_APPS: Record<string, { name: string; icon: string; href: string; desc: string }> = {
  kondate: {
    name: '献立アプリ',
    icon: '🍱',
    href: 'https://highpriestessnyc-lgtm.github.io/kondate-app/',
    desc: '毎日の献立をAIが提案。栄養バランス・家族の好みから最適メニューを生成。',
  },
  'bingo-analyzer': {
    name: 'BINGO ANALYZER PRO',
    icon: '📈',
    href: 'https://bingo-analyzer-pro.vercel.app',
    desc: 'BINGO LADDERのチャート分析AIツール。',
  },
  'word-street': {
    name: 'WORD STREET',
    icon: '📚',
    href: 'https://word-street-git-main-highpriestessnyc-1447s-projects.vercel.app',
    desc: 'ストリートカルチャーで学ぶ英語アプリ。',
  },
  'cosmic-calendar': {
    name: 'COSMIC CALENDAR',
    icon: '🌙',
    href: 'https://cosmic-calendar-six.vercel.app',
    desc: 'マヤ暦・算命学・四柱推命・西洋占星術の複合占いアプリ。',
  },
  kokushi: {
    name: '国史年表',
    icon: '📜',
    href: 'https://highpriestessnyc-lgtm.github.io/kokushi/kokushi_nenpyou.html',
    desc: '日本の歴史をインタラクティブに学べるタイムライン。',
  },
}
