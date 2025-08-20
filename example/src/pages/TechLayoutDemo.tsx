import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  TechLayout, 
  TechButton,
  type TechMenuItem 
} from 'yggjs_rlayout';

export default function TechLayoutDemo() {
  const location = useLocation();

  // 头部菜单项
  const headerMenuItems: TechMenuItem[] = [
    { key: 'dash', label: 'Dashboard', icon: 'dashboard', href: '/tech-layout' },
    { key: 'docs', label: 'Docs', icon: 'book', href: '/docs' },
    { key: 'about', label: 'About', icon: 'info', href: '/about' },
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

  return (
    <TechLayout
      // Header配置
      brand="YGG Admin"
      headerMenuItems={headerMenuItems}
      selectedHeaderKey={selectedHeaderKey}
      onHeaderMenuSelect={handleMenuSelect}
      onSearch={handleSearch}
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
      breadcrumb="Home / Dashboard"
      title="科技风应用布局"
      pageActions={
        <>
          <TechButton variant="secondary">New</TechButton>
          <TechButton variant="primary" icon="deploy">Deploy</TechButton>
        </>
      }
    >
      {/* 页面内容 */}
      <div className="tech-cards">
        <div className="tech-card">
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--tech-accent)' }}>
            卡片 A
          </h3>
          <p style={{ margin: 0, color: 'var(--tech-text-muted)', lineHeight: 1.5 }}>
            这是一个科技风格的卡片组件，具有渐变背景和发光效果。
          </p>
        </div>
        
        <div className="tech-card">
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--tech-accent)' }}>
            卡片 B
          </h3>
          <p style={{ margin: 0, color: 'var(--tech-text-muted)', lineHeight: 1.5 }}>
            悬停时会显示发光边框效果，提供良好的交互反馈。
          </p>
        </div>
        
        <div className="tech-card">
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--tech-accent)' }}>
            卡片 C
          </h3>
          <p style={{ margin: 0, color: 'var(--tech-text-muted)', lineHeight: 1.5 }}>
            所有样式都已经内置在TechLayout组件中，无需额外配置。
          </p>
        </div>
      </div>

      {/* 额外的演示内容 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          组件特性
        </h2>
        
        <div style={{ 
          background: 'rgba(255,255,255,.02)', 
          border: '1px solid var(--tech-border)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
            ✨ 简化的API
          </h4>
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5 }}>
            使用TechLayout组件，只需要几行代码就能创建完整的科技风应用布局，
            包括头部导航、侧边栏、搜索功能和主题样式。
          </p>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,.02)', 
          border: '1px solid var(--tech-border)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
            🎨 内置主题
          </h4>
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5 }}>
            所有颜色、渐变、阴影效果都通过CSS变量管理，
            可以轻松自定义主题色彩。
          </p>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,.02)', 
          border: '1px solid var(--tech-border)',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
            📱 响应式设计
          </h4>
          <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5 }}>
            支持侧边栏折叠，适配不同屏幕尺寸，
            提供流畅的用户体验。
          </p>
        </div>
      </div>

      {/* 添加更多内容来演示滚动功能 */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
          滚动演示区域
        </h2>

        {/* 生成多个卡片来演示垂直滚动 */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,.02)',
            border: '1px solid var(--tech-border)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ color: 'var(--tech-accent)', margin: '0 0 12px 0' }}>
              演示卡片 #{i + 1}
            </h4>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, lineHeight: 1.5 }}>
              这是第 {i + 1} 个演示卡片。当内容超过视口高度时，页面会自动显示滚动条。
              滚动条采用了科技风样式设计，与整体主题保持一致。
              水平方向的内容不会溢出，确保良好的用户体验。
            </p>

            {/* 演示水平不溢出 */}
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: 'rgba(39, 224, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ color: 'var(--tech-accent)', fontSize: '12px' }}>
                超长文本演示：这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本，用来演示水平方向不会溢出的效果
              </span>
            </div>
          </div>
        ))}
      </div>
    </TechLayout>
  );
}
