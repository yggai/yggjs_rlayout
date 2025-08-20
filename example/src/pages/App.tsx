import React from 'react';

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>YGG Layout Lab</h1>
        <p>科技感网址导航 · React 布局组件库</p>
      </header>

      <section className="nav-grid">
        <a className="card" href="https://react.dev" target="_blank" rel="noopener noreferrer">React 文档</a>
        <a className="card" href="/layout" target="_blank" rel="noopener noreferrer">Layout 组件演示</a>
        <a className="card" href="/grid" target="_blank" rel="noopener noreferrer">栅格系统演示</a>
        <a className="card" href="/grid-config" target="_blank" rel="noopener noreferrer">Grid 配置演示</a>
        <a className="card" href="/flex" target="_blank" rel="noopener noreferrer">Flex 布局演示</a>
        <a className="card" href="/css-grid" target="_blank" rel="noopener noreferrer">CSS Grid 演示</a>
        <a className="card" href="/container" target="_blank" rel="noopener noreferrer">Container 演示</a>
        <a className="card" href="/menu" target="_blank" rel="noopener noreferrer">Menu 演示</a>
        <a className="card" href="/header" target="_blank" rel="noopener noreferrer">Header 演示</a>
        <a className="card" href="/sidebar" target="_blank" rel="noopener noreferrer">Sidebar 演示</a>
        <a className="card" href="/search" target="_blank" rel="noopener noreferrer">🔍 Search 搜索组件</a>
        <a className="card" href="/app-layout" target="_blank" rel="noopener noreferrer">App Layout（科技风）</a>
        <a className="card" href="/tech-layout" target="_blank" rel="noopener noreferrer">🚀 Tech Layout（简化版）</a>
        <a className="card" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
        <a className="card" href="https://vitest.dev" target="_blank" rel="noopener noreferrer">Vitest</a>
        <a className="card" href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noopener noreferrer">RTL</a>
      </section>

      <footer style={{opacity:.7,marginTop:16}}>点击卡片将在新标签页打开对应页面。</footer>
    </div>
  );
}

