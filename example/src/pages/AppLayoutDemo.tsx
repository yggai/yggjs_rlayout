import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header, Sidebar, Container, Menu, Search, type MenuItem } from 'yggjs_rlayout';

const Icon = ({ d, size=18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const paths = {
  menu: "M3 6h18M3 12h18M3 18h18",
  dash: "M3 3h7v7H3zM14 3h7v4h-7zM14 9h7v11h-7zM3 12h7v8H3z",
  book: "M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3V4z",
  info: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 8v6m0-8h.01",
  home: "M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  guide: "M4 19.5V5a2 2 0 012-2h12v15.5a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19.5zM6 6h8",
  api: "M4 12h4m8 0h4M9 5l6 14",
  search: "M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z",
};

export default function AppLayoutDemo(){
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? 72 : 240;

  const topItems: MenuItem[] = useMemo(() => ([
    { key: 'dash', label: <Link to="/app-layout"><span className="nav"><Icon d={paths.dash} /><span className="nav-text">Dashboard</span></span></Link> },
    { key: 'docs', label: <Link to="/docs"><span className="nav"><Icon d={paths.book} /><span className="nav-text">Docs</span></span></Link> },
    { key: 'about', label: <Link to="/about"><span className="nav"><Icon d={paths.info} /><span className="nav-text">About</span></span></Link> },
  ]), []);

  const sideItems: MenuItem[] = useMemo(() => ([
    { key: 'home', label: <Link to="/app-layout"><span className="nav"><Icon d={paths.home} /><span className="nav-text">Home</span></span></Link> },
    { key: 'guide', label: <Link to="/docs/guide"><span className="nav"><Icon d={paths.guide} /><span className="nav-text">Guide</span></span></Link> },
    { key: 'api', label: <Link to="/docs/api"><span className="nav"><Icon d={paths.api} /><span className="nav-text">API</span></span></Link> },
  ]), []);

  const selectedTop = useMemo(() => (
    location.pathname.startsWith('/docs') ? 'docs'
      : location.pathname.startsWith('/about') ? 'about' : 'dash'
  ), [location.pathname]);
  const selectedSide = useMemo(() => (
    location.pathname.startsWith('/docs/api') ? 'api'
      : location.pathname.startsWith('/docs/guide') ? 'guide' : 'home'
  ), [location.pathname]);

  return (
    <div className="page">
      <style>{`
        :root{
          --bg:#0a0f1e; --panel:#0e1630; --panel-2:#0a1128; --muted:#7c89bf; --primary:#5aa2ff; --accent:#27e0ff;
          --border:#1b2550; --ring:#2242a8; --glow: 0 0 0 1px rgba(39,224,255,.16), 0 0 0 2px rgba(90,162,255,.08), 0 8px 30px rgba(25,34,83,.45);
        }
        body{ background:
          radial-gradient(1200px 800px at 20% -200px, rgba(39,224,255,.06), transparent 60%),
          radial-gradient(1200px 800px at 120% -200px, rgba(90,162,255,.06), transparent 60%),
          var(--bg);
        }

        .tech-header{ backdrop-filter: saturate(140%) blur(10px); border-bottom:1px solid var(--border); }
        .tech-header .brand{ color:var(--accent); font-weight:700; letter-spacing:.6px; }
        .tech-header .ygg-menu-horizontal{ gap:18px; }
        .tech-header .ygg-menu-item-selected{ color:var(--accent); border-bottom:2px solid var(--accent); }
        .tech-actions{ display:flex; align-items:center; gap:12px; }


        .tech-sidebar.ygg-sidebar{ height: calc(100vh - 56px); border-right:1px solid var(--border); box-shadow: inset -1px 0 0 var(--border); overflow:auto; }
        .tech-sidebar .ygg-menu{ padding:8px; }
        .tech-sidebar .ygg-menu-item a{ display:flex; align-items:center; gap:10px; color:#cfe1ff; text-decoration:none; opacity:.9; }
        .tech-sidebar .ygg-menu-item{ position:relative; padding:6px 8px; border-radius:8px; }
        .tech-sidebar .ygg-menu-item:hover{ background:rgba(90,162,255,.08); }
        .tech-sidebar .ygg-menu-item-selected{ background:linear-gradient(180deg, rgba(39,224,255,.10), rgba(90,162,255,.08)); box-shadow: var(--glow); }
        .tech-sidebar .ygg-menu-item-selected::before{ content:''; position:absolute; left:-8px; top:8px; bottom:8px; width:3px; background:var(--accent); border-radius:2px; }
        .collapsed .nav-text{ display:none; }
        .collapsed .ygg-menu .nav{ justify-content:center; }

        .tech-content{ color:#d6e3ff; }
        .page-header{ display:flex; align-items:end; justify-content:space-between; padding:16px 0 10px; }
        .crumb{ color:var(--muted); font-size:12px; }
        .cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .card{ background:linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01)); border:1px solid var(--border); border-radius:12px; padding:16px; box-shadow: 0 2px 30px rgba(16,19,40,.35) inset; }
        .card:hover{ box-shadow: var(--glow); }
      `}</style>

      {/* Fixed Tech Header */}
      <Header fixed top={0} height={56} className="tech-header" style={{ background:'rgba(13,18,40,.8)' }}>
        <Container variant="fluid" paddingX={16}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <button aria-label="toggle sidebar" onClick={() => setCollapsed(v=>!v)} style={{ background:'transparent', border:'1px solid var(--border)', borderRadius:8, padding:6, color:'#cfe1ff' }}>
                <Icon d={paths.menu} />
              </button>
              <div className="brand">YGG Admin</div>
            </div>

            <div style={{ flex:1, minWidth:0 }}>
              <Menu mode="horizontal" items={topItems} selectedKeys={[selectedTop]} vars={{ menuItemPadding:'6px 10px', menuGap:'14px', menuRadius:'8px', menuLabelGap:'8px' }} />
            </div>

            <div className="tech-actions" style={{ marginLeft:'auto' }}>
              <Search
                size="medium"
                variant="ghost"
                showSearchIcon={true}
                searchButton={false}
                allowClear={true}
                style={{
                  background: 'rgba(11, 20, 48, 0.8)',
                  border: '1px solid var(--border)',
                  color: '#cfe1ff',
                  width: '280px',
                  '--search-icon-color': '#cfe1ff',
                  '--search-icon-hover-color': '#27e0ff',
                  '--search-icon-hover-bg': 'rgba(39, 224, 255, 0.15)',
                  '--search-icon-active-bg': 'rgba(39, 224, 255, 0.25)'
                } as React.CSSProperties}
                inputStyle={{ color: '#cfe1ff' }}
                onSearch={(value: string) => {
                  console.log('Search:', value);
                  // 这里可以添加实际的搜索逻辑
                  if (value.trim()) {
                    alert(`正在搜索: "${value}"`);
                  }
                }}
              />
              <span style={{ opacity:.7 }}>v0.1.0</span>
            </div>
          </div>
        </Container>
      </Header>

      {/* Fixed Sidebar */}
      <Sidebar fixed width={sideW} className={`tech-sidebar ${collapsed ? 'collapsed' : ''}`} style={{ background:'linear-gradient(180deg, rgba(39,224,255,.06), rgba(90,162,255,.04))', top:56 }}>
        <div style={{ padding:8 }}>
          <Menu items={sideItems} selectedKeys={[selectedSide]} vars={{ menuLabelGap:'10px' }} />
        </div>
      </Sidebar>

      {/* Content Area */}
      <div className="tech-content" style={{ paddingTop: 56, paddingLeft: sideW }}>
        <Container variant="fixed" maxWidth={1280} paddingX={16}>
          <div className="page-header">
            <div>
              <div className="crumb">Home / Dashboard</div>
              <h2 style={{ margin:0, marginTop:6 }}>科技风应用布局</h2>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button style={{ background:'transparent', border:'1px solid var(--border)', color:'#cfe1ff', padding:'8px 12px', borderRadius:10 }}>New</button>
              <button style={{ background:'var(--primary)', border:'1px solid var(--primary)', color:'#0b1020', padding:'8px 12px', borderRadius:10 }}>Deploy</button>
            </div>
          </div>

          <div className="cards">
            <div className="card">卡片 A</div>
            <div className="card">卡片 B</div>
            <div className="card">卡片 C</div>
          </div>
        </Container>
      </div>
    </div>
  );
}

