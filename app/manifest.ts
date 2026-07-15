import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Casa Shindy',
    short_name: 'Casa Shindy',
    description: 'ダンス・FX・アプリ・アート。SHINDYのすべてが、ここに集まる。',
    start_url: '/',
    display: 'standalone',
    background_color: '#080808',
    theme_color: '#080808',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
