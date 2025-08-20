import React from 'react';

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>YGG Admin</h1>
        <p>科技风管理后台组件库 · 现代化的 React 布局解决方案</p>
      </header>

      <section className="nav-grid">
        <a className="card" href="/demo" target="_blank" rel="noopener noreferrer">
          🚀 YGG Admin 科技风组件库演示
        </a>
        <a className="card" href="https://react.dev" target="_blank" rel="noopener noreferrer">
          📚 React 官方文档
        </a>
        <a className="card" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          ⚡ Vite 构建工具
        </a>
        <a className="card" href="https://github.com" target="_blank" rel="noopener noreferrer">
          🐙 GitHub 代码仓库
        </a>
      </section>

      <footer style={{opacity:.7,marginTop:16}}>
        点击上方卡片查看 YGG Admin 科技风组件库的完整演示。
      </footer>
    </div>
  );
}

