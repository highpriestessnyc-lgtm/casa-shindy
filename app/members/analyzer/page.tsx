'use client'
import { useState, useRef, useCallback } from 'react'

type Signal = 'SELL' | 'BUY' | 'WAIT' | 'CAUTION'

interface AnalysisResult {
  signal: Signal
  stage: number
  stagePower: number
  trend: string
  currentPrice: string
  entryZone: string
  slZone: string
  tp1: string
  tp2: string
  tp3: string
  riskReward: string
  reasons: string[]
  warning: string
  confidence: number
}

const SIGNAL_CONFIG = {
  SELL:    { color: '#e84040', bg: 'rgba(232,64,64,0.12)',   border: 'rgba(232,64,64,0.3)',   label: '↓ SELL' },
  BUY:     { color: '#2ecc71', bg: 'rgba(46,204,113,0.12)',  border: 'rgba(46,204,113,0.3)',  label: '↑ BUY' },
  WAIT:    { color: '#f39c12', bg: 'rgba(243,156,18,0.12)',  border: 'rgba(243,156,18,0.3)',  label: '⏸ WAIT' },
  CAUTION: { color: '#e67e22', bg: 'rgba(230,126,34,0.12)', border: 'rgba(230,126,34,0.3)', label: '⚠ CAUTION' },
}

export default function AnalyzerPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState('image/png')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
      setImageBase64(dataUrl.split(',')[1])
      setMediaType(file.type || 'image/png')
      setResult(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const analyze = async () => {
    if (!imageBase64) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mediaType }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const postToCasaShindy = () => {
    if (!result) return
    const content = `【BINGO LADDER分析】\n\nシグナル: ${result.signal}\nSTAGE: ${result.stage} (POWER: ${result.stagePower})\nトレンド: ${result.trend}\n\n現在価格: ${result.currentPrice}\nエントリー: ${result.entryZone}\nSL: ${result.slZone}\nTP1: ${result.tp1} / TP2: ${result.tp2} / TP3: ${result.tp3}\nリスクリワード: ${result.riskReward}\n\n【根拠】\n${result.reasons.join('\n')}\n\n${result.warning ? `⚠️ ${result.warning}` : ''}`
    const url = `/admin/posts/new?category=market&content=${encodeURIComponent(content)}`
    window.open(url, '_blank')
  }

  const cfg = result ? SIGNAL_CONFIG[result.signal] : null

  return (
    <div style={{ padding:'3rem', background:'#080808', minHeight:'100vh', fontFamily:'sans-serif' }}>
      <a href='/members' style={{ fontSize:'0.65rem', color:'rgba(248,246,242,0.4)', textDecoration:'none', letterSpacing:'0.2em', display:'block', marginBottom:'1rem' }}>← Members</a>
      <h1 style={{ fontFamily:'serif', fontStyle:'italic', fontSize:'clamp(1.5rem,3vw,2.5rem)', color:'#f8f6f2', fontWeight:300, marginBottom:'0.3rem' }}>BINGO LADDER ANALYZER PRO</h1>
      <div style={{ width:40, height:2, background:'#c9a96e', marginBottom:'2rem' }}></div>

      {/* アップロードエリア */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileRef.current?.click()}
        style={{ border:`2px dashed ${dragOver ? '#c9a96e' : 'rgba(255,255,255,0.1)'}`, padding:'3rem', textAlign:'center', cursor:'pointer', marginBottom:'1rem', background: dragOver ? 'rgba(201,169,110,0.05)' : 'transparent', transition:'all 0.2s' }}
      >
        {preview ? (
          <img src={preview} alt="chart" style={{ maxWidth:'100%', maxHeight:300, objectFit:'contain' }} />
        ) : (
          <div>
            <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>📊</div>
            <div style={{ fontSize:'0.85rem', color:'rgba(248,246,242,0.4)' }}>チャートをドロップ またはタップして選択</div>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => e.target.files?.[0] && processFile(e.target.files[0])} />
      </div>

      {/* カメラ撮影 */}
      <button onClick={() => cameraRef.current?.click()} style={{ background:'transparent', color:'rgba(248,246,242,0.4)', fontSize:'0.72rem', border:'1px solid rgba(255,255,255,0.07)', padding:'0.6rem 1.2rem', cursor:'pointer', marginBottom:'1.5rem' }}>
        📷 カメラで撮影
      </button>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display:'none' }} onChange={e => e.target.files?.[0] && processFile(e.target.files[0])} />

      {/* 解析ボタン */}
      {imageBase64 && (
        <button onClick={analyze} disabled={loading} style={{ display:'block', width:'100%', background:'linear-gradient(135deg,#c9a96e,#e8c98a)', color:'#080808', padding:'1rem', border:'none', cursor:'pointer', fontWeight:'bold', fontSize:'0.9rem', marginBottom:'2rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? '解析中...' : '⚡ 解析する'}
        </button>
      )}

      {error && <div style={{ color:'#e84040', fontSize:'0.85rem', marginBottom:'1rem', padding:'1rem', border:'1px solid rgba(232,64,64,0.3)', background:'rgba(232,64,64,0.05)' }}>{error}</div>}

      {/* 結果 */}
      {result && cfg && (
        <div style={{ border:`1px solid ${cfg.border}`, background: cfg.bg, padding:'2rem', marginBottom:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <div style={{ fontSize:'2.5rem', fontWeight:'bold', color: cfg.color, fontFamily:'serif' }}>{cfg.label}</div>
              <div style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.5)', marginTop:'0.3rem' }}>STAGE {result.stage} · POWER {result.stagePower}/10 · 確信度 {result.confidence}%</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em', marginBottom:'0.3rem' }}>TREND</div>
              <div style={{ fontSize:'1rem', color:'#f8f6f2' }}>{result.trend}</div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'0.8rem', marginBottom:'1.5rem' }}>
            {[
              ['現在価格', result.currentPrice],
              ['エントリー', result.entryZone],
              ['SL', result.slZone],
              ['TP1', result.tp1],
              ['TP2', result.tp2],
              ['TP3', result.tp3],
              ['RR比', result.riskReward],
            ].map(([label, value]) => (
              <div key={label} style={{ background:'rgba(0,0,0,0.3)', padding:'0.8rem', border:'1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize:'0.55rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em', marginBottom:'0.3rem' }}>{label}</div>
                <div style={{ fontSize:'0.9rem', color:'#f8f6f2', fontFamily:'serif' }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:'1rem' }}>
            <div style={{ fontSize:'0.6rem', color:'rgba(248,246,242,0.3)', letterSpacing:'0.2em', marginBottom:'0.5rem' }}>根拠</div>
            {result.reasons.map((r, i) => (
              <div key={i} style={{ fontSize:'0.8rem', color:'rgba(248,246,242,0.6)', padding:'0.3rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>· {r}</div>
            ))}
          </div>

          {result.warning && (
            <div style={{ fontSize:'0.8rem', color:'#f39c12', padding:'0.8rem', background:'rgba(243,156,18,0.08)', border:'1px solid rgba(243,156,18,0.2)', marginBottom:'1rem' }}>⚠️ {result.warning}</div>
          )}

          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
          <a href="/members" style={{ fontSize:'0.72rem', color:'rgba(248,246,242,0.4)', border:'1px solid rgba(255,255,255,0.07)', padding:'0.7rem 1.5rem', textDecoration:'none', letterSpacing:'0.1em' }}>← Members</a>
          <button onClick={postToCasaShindy} style={{ background:'transparent', color:'#c9a96e', fontSize:'0.72rem', border:'1px solid rgba(201,169,110,0.4)', padding:'0.7rem 1.5rem', cursor:'pointer', letterSpacing:'0.2em' }}>
            ✍️ 相場配信に投稿する
          </button>
          </div>
        </div>
      )}
    </div>
  )
}