import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Casa Shindy — Official Fan Page',
  description: 'ダンス・FX・アプリ・アート。SHINDYのすべてが、ここに集まる。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400;1,600&family=Bebas+Neue&family=Didact+Gothic&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
