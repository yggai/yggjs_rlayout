import React from 'react';
import { TechCard, TechButton } from 'yggjs_rlayout';

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        Dashboard
      </h1>
      
      <div className="tech-cards">
        <TechCard
          title="系统概览"
          subtitle="当前系统运行状态"
          icon="dashboard"
          variant="default"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>1,234</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>总用户数</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>567</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>活跃用户</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>89%</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>系统负载</div>
              </div>
            </div>
          </div>
        </TechCard>

        <TechCard
          title="快速操作"
          subtitle="常用功能快捷入口"
          icon="deploy"
          variant="glass"
          hoverable
          actions={
            <>
              <TechButton variant="ghost" size="small">查看更多</TechButton>
              <TechButton variant="primary" size="small">立即操作</TechButton>
            </>
          }
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '16px 0' }}>
            <TechButton variant="secondary" size="small" icon="user">用户管理</TechButton>
            <TechButton variant="secondary" size="small" icon="settings">系统设置</TechButton>
            <TechButton variant="secondary" size="small" icon="api">API 配置</TechButton>
          </div>
        </TechCard>

        <TechCard
          title="最近活动"
          subtitle="系统最新动态"
          icon="guide"
          variant="outlined"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <div style={{ fontSize: '14px', color: 'var(--tech-text-muted)', lineHeight: 1.6 }}>
              <div style={{ marginBottom: '8px' }}>• 用户 张三 登录系统 (2分钟前)</div>
              <div style={{ marginBottom: '8px' }}>• 系统配置已更新 (15分钟前)</div>
              <div style={{ marginBottom: '8px' }}>• 新增 3 个用户 (1小时前)</div>
              <div>• 数据备份完成 (2小时前)</div>
            </div>
          </div>
        </TechCard>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          SPA 导航演示说明
        </h2>
        <TechCard
          title="Link/to 导航功能"
          subtitle="基于 react-router-dom 的单页应用导航"
          icon="guide"
          variant="filled"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              这个演示展示了如何在 YGG Admin 中使用 Link/to 进行 SPA 导航：
            </p>
            <ul style={{ color: 'var(--tech-text-muted)', fontSize: '14px', margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>头部菜单和侧边栏菜单都使用 <code>to</code> 属性而不是 <code>href</code></li>
              <li>通过 <code>linkComponent</code> 属性传入 react-router-dom 的 Link 组件</li>
              <li>页面切换无需刷新，保持 SPA 体验</li>
              <li>URL 会正确更新，支持浏览器前进后退</li>
              <li>菜单项会根据当前路由自动高亮显示</li>
            </ul>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
