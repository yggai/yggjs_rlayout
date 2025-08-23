// YGG Admin 示例项目 - 欢迎页面组件
// 本组件作为项目的介绍和导航入口页面，展示项目概况和快速导航链接
import React from 'react';

/**
 * App 组件 - 项目欢迎页面
 * 
 * 功能说明：
 * - 展示 YGG Admin 项目的简介和特点
 * - 提供快速导航到不同功能模块的链接
 * - 作为独立的欢迎页面，不依赖科技风布局容器
 * 
 * 设计特点：
 * - 简洁的卡片式布局
 * - 使用传统的 href 链接进行页面跳转
 * - 适合作为项目的首页或介绍页面
 * 
 * @returns {JSX.Element} 欢迎页面的 JSX 元素
 * 
 * @example
 * // 在路由中使用
 * <Route path="/welcome" element={<App />} />
 */
export default function App() {
  return (
    <div className="app">
      {/* 页面头部区域：展示项目标题和简介 */}
      <header className="hero">
        <h1>YGG Admin</h1>
        <p>科技风管理后台组件库 · 现代化的 React 布局解决方案</p>
      </header>

      {/* 导航卡片网格：提供快速访问不同功能模块的入口 */}
      <section className="nav-grid">
        {/* 主要演示入口：跳转到完整的 SPA 演示页面 */}
        <a className="card" href="/">
          🚀 YGG Admin SPA 导航演示
        </a>
        {/* 文档中心：查看组件使用说明和代码示例 */}
        <a className="card" href="/docs">
          📚 文档中心
        </a>
        {/* 关于页面：了解项目特性和技术栈 */}
        <a className="card" href="/about">
          ℹ️ 关于项目
        </a>
        {/* 外部链接：跳转到 GitHub 代码仓库 */}
        <a className="card" href="https://github.com" target="_blank" rel="noopener noreferrer">
          🐙 GitHub 代码仓库
        </a>
      </section>

      {/* 页面底部说明文字 */}
      <footer style={{opacity:.7,marginTop:16}}>
        点击上方卡片查看 YGG Admin 科技风组件库的 SPA 导航演示。
      </footer>
    </div>
  );
}

