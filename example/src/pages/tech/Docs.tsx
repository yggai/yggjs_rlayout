import React from 'react';
import { TechCard, TechButton } from 'yggjs_rlayout';

export default function Docs() {
  return (
    <div>
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        文档中心
      </h1>
      
      <div className="tech-cards">
        <TechCard
          title="快速开始"
          subtitle="5分钟上手 YGG Admin"
          icon="guide"
          variant="default"
          hoverable
          actions={
            <TechButton variant="primary" size="small">开始学习</TechButton>
          }
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              从安装到第一个页面，快速了解 YGG Admin 的基本使用方法。
            </p>
            <div style={{ fontSize: '14px', color: 'var(--tech-text-muted)', lineHeight: 1.6 }}>
              <div>• 安装和配置</div>
              <div>• 基础布局使用</div>
              <div>• 主题定制</div>
            </div>
          </div>
        </TechCard>

        <TechCard
          title="组件文档"
          subtitle="完整的组件 API 参考"
          icon="api"
          variant="glass"
          hoverable
          actions={
            <TechButton variant="secondary" size="small">查看 API</TechButton>
          }
        >
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechLayout</div>
              </div>
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechCard</div>
              </div>
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechButton</div>
              </div>
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechMenu</div>
              </div>
            </div>
          </div>
        </TechCard>

        <TechCard
          title="设计指南"
          subtitle="科技风设计原则和规范"
          icon="settings"
          variant="outlined"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              了解 YGG Admin 的设计理念和视觉规范。
            </p>
            <ul style={{ color: 'var(--tech-text-muted)', fontSize: '14px', margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>色彩系统和主题变量</li>
              <li>字体和排版规范</li>
              <li>间距和布局原则</li>
              <li>动效和交互设计</li>
            </ul>
          </div>
        </TechCard>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          SPA 路由配置示例
        </h2>
        <TechCard
          title="代码示例"
          subtitle="如何配置 Link/to 导航"
          icon="book"
          variant="filled"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
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
{`import { Link } from 'react-router-dom';
import { TechLayout } from 'yggjs_rlayout';

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', to: '/' },
  { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
  { key: 'about', label: 'About', icon: 'info', to: '/about' },
];

function App() {
  return (
    <TechLayout
      headerMenuItems={menuItems}
      sidebarItems={menuItems}
      linkComponent={Link}  // 关键配置
    >
      {/* 页面内容 */}
    </TechLayout>
  );
}`}
            </pre>
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
              通过 <code>linkComponent</code> 属性传入 react-router-dom 的 Link 组件，
              菜单项使用 <code>to</code> 属性而不是 <code>href</code> 即可实现 SPA 导航。
            </p>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
