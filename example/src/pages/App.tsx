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
        <a className="card" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
        <a className="card" href="https://vitest.dev" target="_blank" rel="noopener noreferrer">Vitest</a>
        <a className="card" href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noopener noreferrer">RTL</a>
      </section>

      <footer style={{opacity:.7,marginTop:16}}>点击卡片将在新标签页打开对应页面。</footer>
    </div>
  );
}

