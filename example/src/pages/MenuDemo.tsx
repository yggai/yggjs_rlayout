import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { Menu, type MenuItem } from 'yggjs_rlayout';

const items: MenuItem[] = [
  { key: 'home', label: <Link to="/">Home</Link> },
  { key: 'docs', label: 'Docs', children: [
    { key: 'guide', label: <Link to="/docs/guide">Guide</Link> },
    { key: 'api', label: <Link to="/docs/api">API</Link> },
  ]},
  { key: 'about', label: <Link to="/about">About</Link>, disabled: true },
];


function computeFromLocation(pathname: string){
  // 简单 startsWith 匹配：/docs/guide 或 /docs/api 时选中 docs 的子项，并展开 docs
  const openKeys: string[] = pathname.startsWith('/docs') ? ['docs'] : [];
  const selected = pathname === '/' ? 'home'
    : pathname.startsWith('/docs/guide') ? 'guide'
    : pathname.startsWith('/docs/api') ? 'api'
    : pathname.startsWith('/about') ? 'about'
    : undefined;
  return { openKeys, selectedKey: selected };
}

export default function MenuDemo(){
  const [selected, setSelected] = useState<string[]>(['home']);
  const location = useLocation();
  const routeSel = computeFromLocation(location.pathname);

  return (
    <div className="page">
      <h2>Menu 演示</h2>

      <div className="panel">
        <h3>顶部导航（horizontal）</h3>
        <Menu mode="horizontal" items={items} selectedKeys={[routeSel.selectedKey || selected[0]]} onSelect={({ key }) => setSelected([key])} style={{ gap: 16 }} openKeys={routeSel.openKeys} />
      </div>

      <div className="panel">
        <h3>侧边栏（vertical，展开 Docs）</h3>
        <Menu items={items} openKeys={routeSel.openKeys} selectedKeys={[routeSel.selectedKey || selected[0]]} style={{ padding: 8 }} />
      </div>

      <div className="panel">
        <h3>inline 模式 + hover 模式 + 主题覆盖示例</h3>
        <style>{`
          .ygg-menu-horizontal { gap: 12px; }
          .ygg-menu-item-selected { color: var(--primary); border-bottom: 2px solid var(--primary); }
          .ygg-submenu > ul { margin-top: 6px; }
          .ygg-menu-item-disabled { opacity: .5; cursor: not-allowed; }
        `}</style>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          <div>
            <div style={{opacity:.7,marginBottom:6}}>inline（点击展开/收起）</div>
            <Menu mode="inline" items={items} defaultOpenKeys={["docs"]} />
          </div>
          <div>
            <div style={{opacity:.7,marginBottom:6}}>horizontal + hover（移入展开）</div>
            <Menu mode="horizontal" trigger="hover" items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

