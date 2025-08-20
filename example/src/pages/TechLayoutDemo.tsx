import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  TechLayout,
  TechButton,
  TechCard,
  TechUserCenter,
  createBreadcrumb,
  type TechMenuItem,
  type TechUserCenterItem
} from 'yggjs_rlayout';

export default function TechLayoutDemo() {
  const location = useLocation();

  // 头部菜单项
  const headerMenuItems: TechMenuItem[] = [
    { key: 'dash', label: 'Dashboard', icon: 'dashboard', href: '/tech-layout' },
    { key: 'docs', label: 'Docs', icon: 'book', href: '/docs' },
    { key: 'about', label: 'About', icon: 'info', href: '/about' },
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

  // 侧边栏菜单项
  const sidebarItems: TechMenuItem[] = [
    { key: 'home', label: 'Home', icon: 'home', href: '/tech-layout' },
    { key: 'guide', label: 'Guide', icon: 'guide', href: '/docs/guide' },
    { key: 'api', label: 'API', icon: 'api', href: '/docs/api' },
    { key: 'settings', label: 'Settings', icon: 'settings', href: '/settings' },
  ];

  // 根据当前路径确定选中的菜单项
  const selectedHeaderKey = location.pathname.startsWith('/docs') ? 'docs'
    : location.pathname.startsWith('/about') ? 'about' : 'dash';
    
  const selectedSidebarKey = location.pathname.startsWith('/docs/api') ? 'api'
    : location.pathname.startsWith('/docs/guide') ? 'guide'
    : location.pathname.startsWith('/settings') ? 'settings' : 'home';

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
    .add('Dashboard', '/tech-layout')
    .add('应用布局')
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

      // Footer配置
      footerProps={{
        description: "YGG Admin 是一个现代化的科技风管理后台框架，提供完整的布局解决方案和组件库。",
        sections: footerSections,
        socialLinks: socialLinks,
        copyright: "© 2024 YGG Admin. All rights reserved."
      }}

      // 页面头部
      breadcrumb={breadcrumbItems}
      title="YGG Admin - 科技风组件库演示"
      pageActions={
        <>
          <TechButton variant="secondary">New</TechButton>
          <TechButton variant="primary" icon="deploy">Deploy</TechButton>
        </>
      }
    >
      {/* 页面内容 - 组件演示 */}
      <div className="tech-cards">
        <TechCard
          title="用户中心组件"
          subtitle="右上角的用户头像和下拉菜单"
          icon="user"
          variant="default"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px' }}>
              点击右上角的用户头像查看下拉菜单效果：
            </p>
            <ul style={{ color: 'var(--tech-text-muted)', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>支持自定义头像和用户信息</li>
              <li>可配置的下拉菜单项</li>
              <li>键盘导航支持（Tab、Enter、Escape）</li>
              <li>点击外部自动关闭</li>
              <li>危险操作的红色警告样式</li>
            </ul>
          </div>
        </TechCard>

        <TechCard
          title="科技风卡片"
          subtitle="多种样式的卡片组件"
          icon="api"
          variant="glass"
          hoverable
          actions={
            <>
              <TechButton variant="ghost" size="small">取消</TechButton>
              <TechButton variant="primary" size="small">确认</TechButton>
            </>
          }
        >
          支持多种变体：default、glass、gradient、filled、outlined。
          可以添加图标、操作按钮、加载状态等。
        </TechCard>

        <TechCard
          title="科技风按钮"
          subtitle="多种样式的按钮组件"
          icon="deploy"
          variant="gradient"
          hoverable
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '16px 0' }}>
            <TechButton variant="primary">Primary</TechButton>
            <TechButton variant="secondary">Secondary</TechButton>
            <TechButton variant="ghost">Ghost</TechButton>
            <TechButton variant="primary" icon="settings" iconOnly />
          </div>
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px' }}>
            支持多种变体、尺寸和图标配置。
          </p>
        </TechCard>

        <TechCard
          title="面包屑导航"
          subtitle="页面导航路径指示"
          icon="guide"
          variant="filled"
          hoverable
        >
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px' }}>
            查看页面顶部的面包屑导航，支持链接跳转和当前页面标识。
            使用 createBreadcrumb() 构建器模式创建。
          </p>
        </TechCard>

        <TechCard
          title="搜索功能"
          subtitle="头部集成的搜索组件"
          icon="search"
          variant="outlined"
          hoverable
        >
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px' }}>
            头部导航栏集成了搜索功能，支持实时搜索和回调处理。
            尝试在头部搜索框中输入内容。
          </p>
        </TechCard>
      </div>

      {/* 组件特性说明 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          YGG Admin 科技风组件库特性
        </h2>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{
            background: 'rgba(255,255,255,.02)',
            border: '1px solid var(--tech-border)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
              🚀 完整的布局解决方案
            </h4>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5, fontSize: '14px' }}>
              TechLayout 提供头部导航、侧边栏、面包屑、搜索、用户中心等完整功能，
              一个组件搞定整个应用布局。
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,.02)',
            border: '1px solid var(--tech-border)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
              🎨 科技风视觉设计
            </h4>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5, fontSize: '14px' }}>
              渐变背景、发光效果、毛玻璃质感，
              所有样式通过 CSS 变量统一管理，易于定制。
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,.02)',
            border: '1px solid var(--tech-border)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
              📱 响应式 & 交互
            </h4>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5, fontSize: '14px' }}>
              支持侧边栏折叠、键盘导航、无障碍访问，
              在不同设备上都有良好的用户体验。
            </p>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div style={{ marginTop: '48px' }}>
        <TechCard
          title="使用说明"
          subtitle="如何在项目中使用 YGG Admin 组件库"
          icon="book"
          variant="outlined"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0', fontSize: '16px' }}>
              快速开始
            </h4>
            <pre style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '8px',
              color: 'var(--tech-text)',
              fontSize: '13px',
              lineHeight: 1.5,
              overflow: 'auto',
              margin: '0 0 16px 0'
            }}>
{`import { TechLayout, TechUserCenter } from 'yggjs_rlayout';

function App() {
  return (
    <TechLayout
      brand="Your App"
      headerMenuItems={menuItems}
      sidebarItems={sidebarItems}
      headerExtra={<TechUserCenter username="用户名" />}
    >
      {/* 你的页面内容 */}
    </TechLayout>
  );
}`}
            </pre>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
              这个演示页面展示了 YGG Admin 科技风组件库的主要功能。
              尝试点击右上角的用户头像、使用搜索功能、折叠侧边栏等交互操作。
            </p>
          </div>
        </TechCard>
      </div>
    </TechLayout>
  );
}
