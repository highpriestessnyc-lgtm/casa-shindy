export default function AdminPage() {
  return (
    <div>
      <h1 style={{ fontSize:'2rem', color:'#f8f6f2', marginBottom:'0.5rem' }}>Dashboard</h1>
      <p style={{ fontSize:'0.75rem', color:'rgba(248,246,242,0.35)', marginBottom:'3rem' }}>Casa Shindy Admin</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <a href="/admin/posts" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>✍️</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Posts</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>独り言 / 相場 / 映画 / 本</div>
          </div>
        </a>
        <a href="/admin/lessons/new" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>💃</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>New Lesson</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>Dance Lesson Video</div>
          </div>
        </a>
        <a href="/admin/artworks/new" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>🎨</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>MA@PAINTER</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>作品を追加</div>
          </div>
        </a>
        <a href="/admin/lessons" style={{ textDecoration:'none' }}>
          <div style={{ background:'rgba(201,169,110,0.08)', border:'1px solid rgba(201,169,110,0.2)', padding:'2rem', cursor:'pointer' }}>
            <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>📋</div>
            <div style={{ fontSize:'1.1rem', color:'#f8f6f2', marginBottom:'0.3rem' }}>Lessons</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(248,246,242,0.35)' }}>レッスン一覧</div>
          </div>
        </a>
      </div>
    </div>
  )
}
