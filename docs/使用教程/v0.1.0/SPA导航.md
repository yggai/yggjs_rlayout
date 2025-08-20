# SPA 导航使用指南

YGG Admin 组件库原生支持 React Router 的 SPA（单页应用）导航，让你可以轻松构建无刷新的现代 Web 应用。

## 核心概念

### Link/to 导航

YGG Admin 的菜单组件支持两种导航方式：

1. **传统导航** - 使用 `href` 属性，会刷新页面
2. **SPA 导航** - 使用 `to` 属性配合 `linkComponent`，无刷新切换

### 支持 SPA 导航的组件

- `TechMenu` - 科技风菜单组件
- `TechLayout` - 完整布局组件（内部使用 TechMenu）

## 基础用法

### 1. 安装依赖

```bash
npm install react-router-dom
npm install yggjs_rlayout
```

### 2. 创建 Link 适配器

由于 react-router-dom 的 Link 组件类型与 YGG Admin 的 LinkLikeComponent 接口略有差异，需要创建一个适配器：

```tsx
import { Link } from 'react-router-dom';

// 创建 Link 适配器组件
const LinkAdapter: React.FC<{ 
  to: string; 
  className?: string; 
  children?: React.ReactNode 
}> = ({ to, className, children }) => {
  return <Link to={to} className={className}>{children}</Link>;
};
```

### 3. 配置菜单项

使用 `to` 属性而不是 `href`：

```tsx
import type { TechMenuItem } from 'yggjs_rlayout';

const menuItems: TechMenuItem[] = [
  { key: 'home', label: 'Home', icon: 'home', to: '/' },
  { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
  { key: 'about', label: 'About', icon: 'info', to: '/about' },
];
```

### 4. 配置 TechLayout

```tsx
import { TechLayout } from 'yggjs_rlayout';

function App() {
  return (
    <TechLayout
      brand="Your App"
      headerMenuItems={menuItems}
      sidebarItems={menuItems}
      headerMenuLinkComponent={LinkAdapter}  // 头部菜单使用 SPA 导航
      sidebarLinkComponent={LinkAdapter}     // 侧边栏菜单使用 SPA 导航
    >
      <Outlet /> {/* 渲染子路由 */}
    </TechLayout>
  );
}
```

## 完整示例

### 路由配置

```tsx
// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import About from './pages/About';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 布局组件

```tsx
// Layout.tsx
import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { TechLayout, type TechMenuItem } from 'yggjs_rlayout';

// Link 适配器
const LinkAdapter: React.FC<{ 
  to: string; 
  className?: string; 
  children?: React.ReactNode 
}> = ({ to, className, children }) => {
  return <Link to={to} className={className}>{children}</Link>;
};

export default function Layout() {
  const location = useLocation();

  const menuItems: TechMenuItem[] = [
    { key: 'home', label: 'Dashboard', icon: 'dashboard', to: '/' },
    { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
    { key: 'about', label: 'About', icon: 'info', to: '/about' },
  ];

  // 根据当前路径确定选中的菜单项
  const selectedKey = location.pathname.startsWith('/docs') ? 'docs'
    : location.pathname.startsWith('/about') ? 'about' : 'home';

  return (
    <TechLayout
      brand="Your App"
      headerMenuItems={menuItems}
      sidebarItems={menuItems}
      selectedHeaderKey={selectedKey}
      selectedSidebarKey={selectedKey}
      headerMenuLinkComponent={LinkAdapter}
      sidebarLinkComponent={LinkAdapter}
    >
      <Outlet />
    </TechLayout>
  );
}
```

## 高级功能

### 菜单项选中状态

YGG Admin 会根据 `selectedHeaderKey` 和 `selectedSidebarKey` 自动高亮当前菜单项：

```tsx
const location = useLocation();

// 根据当前路径确定选中的菜单项
const selectedKey = location.pathname.startsWith('/docs') ? 'docs'
  : location.pathname.startsWith('/about') ? 'about' : 'home';

<TechLayout
  selectedHeaderKey={selectedKey}
  selectedSidebarKey={selectedKey}
  // ...其他配置
/>
```

### 嵌套路由

支持多级路由结构：

```tsx
const menuItems: TechMenuItem[] = [
  { 
    key: 'docs', 
    label: 'Docs', 
    icon: 'book',
    children: [
      { key: 'guide', label: 'Guide', to: '/docs/guide' },
      { key: 'api', label: 'API', to: '/docs/api' },
    ]
  },
];
```

### 混合导航

可以在同一个菜单中混合使用 SPA 导航和传统导航：

```tsx
const menuItems: TechMenuItem[] = [
  { key: 'home', label: 'Home', icon: 'home', to: '/' },           // SPA 导航
  { key: 'external', label: 'External', icon: 'link', href: 'https://example.com' }, // 传统导航
];
```

## 注意事项

1. **类型兼容性** - 必须使用 LinkAdapter 来适配 react-router-dom 的 Link 组件
2. **路由配置** - 确保路由配置与菜单项的 `to` 属性匹配
3. **选中状态** - 需要手动管理 `selectedHeaderKey` 和 `selectedSidebarKey`
4. **浏览器兼容性** - SPA 导航依赖 HTML5 History API

## 演示项目

查看 `example` 目录中的完整演示项目，了解如何在实际项目中使用 SPA 导航功能。

运行演示：

```bash
cd example
npm install
npm run dev
```

访问 http://localhost:5173 查看 SPA 导航演示。
