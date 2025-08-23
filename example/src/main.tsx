// YGG Admin 示例项目 - 应用程序入口文件
// 本文件是 React 应用的启动入口，配置了路由系统和页面结构
import React from 'react';
import { createRoot } from 'react-dom/client';
// 引入 React Router 用于实现单页应用（SPA）导航
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 引入各个页面组件
import App from './pages/App'; // 欢迎页面，展示项目介绍
import TechLayoutDemo from './pages/tech/TechLayoutDemo'; // 主布局容器，演示科技风主题
import Dashboard from './pages/tech/Dashboard'; // 仪表板页面，展示组件库的卡片和按钮组件
import Docs from './pages/tech/Docs'; // 文档页面，展示文档结构和代码示例
import About from './pages/tech/About'; // 关于页面，介绍项目特性和技术栈
// 引入全局样式文件
import './styles.css';

// 获取 DOM 根元素并创建 React 根节点
const root = createRoot(document.getElementById('root')!);

/**
 * 渲染应用程序
 * 
 * 路由结构说明：
 * - 主路由 "/" 使用 TechLayoutDemo 作为布局容器，演示完整的科技风界面
 * - 嵌套路由展示不同的功能页面：
 *   - "/" (index) -> Dashboard 仪表板
 *   - "/docs" -> Docs 文档中心
 *   - "/docs/api" -> API 文档（复用 Docs 组件）
 *   - "/about" -> 关于页面
 * - "/welcome" 独立路由，展示项目欢迎页面
 * - 兼容性路由："/demo" 和 "/tech-layout" 重定向到主页面
 */
root.render(
  <React.StrictMode>
    {/* 启用 BrowserRouter 实现 SPA 路由功能，配置了 React Router v7 的 future 选项 */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* 主要演示路由：使用 TechLayoutDemo 作为布局容器 */}
        <Route path="/" element={<TechLayoutDemo />}>
          {/* 默认页面：展示仪表板和系统概览 */}
          <Route index element={<Dashboard />} />
          {/* 文档页面：展示组件使用文档和代码示例 */}
          <Route path="docs" element={<Docs />} />
          {/* API 文档页面：展示详细的 API 参考 */}
          <Route path="docs/api" element={<Docs />} />
          {/* 关于页面：介绍项目特性、技术栈和使用方法 */}
          <Route path="about" element={<About />} />
        </Route>
        {/* 欢迎页面：项目介绍和导航入口 */}
        <Route path="/welcome" element={<App />} />
        {/* 兼容旧路径：为了向后兼容保留的路由 */}
        <Route path="/demo" element={<TechLayoutDemo />} />
        <Route path="/tech-layout" element={<TechLayoutDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

