import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import {
  TechLayout,
  TechButton,
  TechUserCenter,
  createBreadcrumb,
  type TechMenuItem,
  type TechUserCenterItem
} from 'yggjs_rlayout';

// 创建 Link 适配器组件，匹配 LinkLikeComponent 接口
const LinkAdapter: React.FC<{ to: string; className?: string; children?: React.ReactNode }> = ({ to, className, children }) => {
  return <Link to={to} className={className}>{children}</Link>;
};

export default function TechLayoutDemo() {
  const location = useLocation();

  // 头部菜单项 - 使用 to 属性进行 SPA 导航
  const headerMenuItems: TechMenuItem[] = [
    { key: 'dash', label: 'Dashboard', icon: 'dashboard', to: '/' },
    { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
    { key: 'about', label: 'About', icon: 'info', to: '/about' },
  ];

  // 用户中心菜单项
  const userCenterItems: TechUserCenterItem[] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: 'profile',
      onClick: () => alert('跳转到个人资料页面'),
    },
    {
      key: 'settings',
      label: '账户设置',
      icon: 'settings',
      onClick: () => alert('跳转到账户设置页面'),
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: 'help',
      onClick: () => alert('跳转到帮助中心'),
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: 'logout',
      danger: true,
      onClick: () => {
        if (confirm('确定要退出登录吗？')) {
          alert('已退出登录');
        }
      },
    },
  ];

  // 侧边栏菜单项 - 使用 to 属性进行 SPA 导航
  const sidebarItems: TechMenuItem[] = [
    { key: 'home', label: 'Home', icon: 'home', to: '/' },
    { key: 'guide', label: 'Guide', icon: 'guide', to: '/docs' },
    { key: 'api', label: 'API', icon: 'api', to: '/docs/api' },
    { key: 'about', label: 'About', icon: 'info', to: '/about' },
  ];

  // 根据当前路径确定选中的菜单项
  const selectedHeaderKey = location.pathname.startsWith('/docs') ? 'docs'
    : location.pathname.startsWith('/about') ? 'about' : 'dash';
    
  const selectedSidebarKey = location.pathname.startsWith('/docs/api') ? 'api'
    : location.pathname.startsWith('/docs') ? 'guide'
    : location.pathname.startsWith('/about') ? 'about' : 'home';

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    if (value.trim()) {
      alert(`正在搜索: "${value}"`);
    }
  };

  const handleMenuSelect = (key: string) => {
    console.log('Header menu selected:', key);
  };

  const handleSidebarSelect = (key: string) => {
    console.log('Sidebar menu selected:', key);
  };

  // Footer配置
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Documentation', href: '#docs', icon: 'book' as const },
        { label: 'API Reference', href: '#api', icon: 'api' as const },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Careers', href: '#careers' },
        { label: 'Blog', href: '#blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Community', href: '#community' },
        { label: 'Status', href: '#status' },
        { label: 'Feedback', href: '#feedback' },
      ]
    }
  ];

  const socialLinks = [
    { label: 'GitHub', href: '#github', icon: 'api' as const },
    { label: 'Twitter', href: '#twitter', icon: 'info' as const },
    { label: 'Discord', href: '#discord', icon: 'guide' as const },
  ];

  // 创建面包屑导航（简约版不需要图标）
  const breadcrumbItems = createBreadcrumb()
    .add('Dashboard', '/')
    .add('SPA 导航演示')
    .build();

  return (
    <TechLayout
      // Header配置
      brand="YGG Admin"
      headerMenuItems={headerMenuItems}
      selectedHeaderKey={selectedHeaderKey}
      onHeaderMenuSelect={handleMenuSelect}
      onSearch={handleSearch}
      headerExtra={
        <TechUserCenter
          username="张三"
          userInfo="zhangsan@example.com"
          items={userCenterItems}
          showUsername={false}
          onAvatarClick={() => console.log('Avatar clicked')}
        />
      }
      version="v0.1.0"

      // Sidebar配置
      sidebarItems={sidebarItems}
      selectedSidebarKey={selectedSidebarKey}
      onSidebarSelect={handleSidebarSelect}
      
      // SPA 导航配置 - 关键配置
      headerMenuLinkComponent={LinkAdapter}
      sidebarLinkComponent={LinkAdapter}

      // Footer配置
      footerProps={{
        description: "YGG Admin 是一个现代化的科技风管理后台框架，提供完整的布局解决方案和组件库。",
        sections: footerSections,
        socialLinks: socialLinks,
        copyright: "© 2024 YGG Admin. All rights reserved."
      }}

      // 页面头部
      breadcrumb={breadcrumbItems}
      title="YGG Admin - SPA 导航演示"
      pageActions={
        <>
          <TechButton variant="secondary">New</TechButton>
          <TechButton variant="primary" icon="deploy">Deploy</TechButton>
        </>
      }
    >
      {/* 渲染子路由内容 */}
      <Outlet />
    </TechLayout>
  );
}
