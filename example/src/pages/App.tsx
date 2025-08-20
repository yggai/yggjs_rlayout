import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>YGG Layout Lab</h1>
        <p>科技感布局实验室 · React 页面布局组件库</p>
      </header>

      <section className="nav-grid">
        <a className="card" href="https://react.dev" target="_blank">React 文档</a>
        <a className="card" href="https://vitejs.dev" target="_blank">Vite</a>
        <a className="card" href="https://vitest.dev" target="_blank">Vitest</a>
        <a className="card" href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">RTL</a>
      </section>

      <section className="routes">
        <h2>示例路由</h2>
        <ul>
          <li><Link to="/layout">Layout 组件演示</Link></li>
        </ul>
      </section>
    </div>
  );
}

