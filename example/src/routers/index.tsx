import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载页面组件
const TechLayoutDemo = lazy(() => import('../layouts/TechLayoutDemo'));
const Dashboard = lazy(() => import('../pages/tech/Dashboard'));
const Docs = lazy(() => import('../pages/tech/Docs'));
const About = lazy(() => import('../pages/tech/About'));

// 路由配置
export const routes: RouteObject[] = [
  // 主要演示路由：使用 TechLayoutDemo 作为布局容器
  {
    path: '/',
    element: <TechLayoutDemo />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'docs',
        element: <Docs />
      },
      {
        path: 'docs/api',
        element: <Docs />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
];

// 创建路由实例
export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
});