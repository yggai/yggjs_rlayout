// YGG Admin 示例项目 - 仪表板页面组件
// 本组件演示了 TechCard 和 TechButton 组件的各种使用方式和特性
import React from 'react';
// 从组件库中引入科技风格的卡片和按钮组件
import { TechCard, TechButton } from 'yggjs_rlayout/tech';

/**
 * Dashboard 组件 - 仪表板页面
 * 
 * 功能说明：
 * - 演示 TechCard 组件的不同变体（default、glass、outlined、filled）
 * - 展示 TechButton 组件的各种样式和尺寸
 * - 演示科技风格的数据展示和操作界面
 * - 说明 SPA 导航的实现原理和配置方法
 * 
 * 组件库特性演示：
 * - TechCard: 支持标题、副标题、图标、悬停效果、操作按钮
 * - TechButton: 多种变体（primary、secondary、ghost）、尺寸、图标
 * - 科技风主题: 使用 CSS 变量实现的暗色主题和发光效果
 * 
 * @returns {JSX.Element} 仪表板页面的 JSX 元素
 * 
 * @example
 * // 在路由中使用（作为默认页面）
 * <Route index element={<Dashboard />} />
 */
export default function Dashboard() {
  return (
    <div>
      {/* 页面标题，使用科技风主题的文本颜色变量 */}
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        Dashboard
      </h1>
      
      {/* 卡片网格容器：展示不同类型的 TechCard 组件 */}
      <div className="tech-cards">
        {/* 
          TechCard 示例 1: 默认样式卡片 (variant="default")
          演示特性：
          - 基础的卡片样式和布局
          - 支持标题、副标题和图标
          - hoverable 属性启用悬停效果
          - 内容区域展示数据统计信息
        */}
        <TechCard
          title="系统概览"
          subtitle="当前系统运行状态"
          icon="dashboard"
          variant="default"
          hoverable
        >
          {/* 卡片内容：网格布局的数据展示 */}
          <div style={{ padding: '16px 0' }}>
            {/* 响应式网格布局：自动适配列数，最小宽度 120px */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              {/* 数据项 1：总用户数 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>1,234</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>总用户数</div>
              </div>
              {/* 数据项 2：活跃用户 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>567</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>活跃用户</div>
              </div>
              {/* 数据项 3：系统负载 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tech-accent)' }}>89%</div>
                <div style={{ fontSize: '12px', color: 'var(--tech-text-muted)' }}>系统负载</div>
              </div>
            </div>
          </div>
        </TechCard>

        {/* 
          TechCard 示例 2: 毛玻璃效果卡片 (variant="glass")
          演示特性：
          - 毛玻璃背景效果，更具科技感
          - actions 属性：在卡片右上角添加操作按钮
          - 展示不同类型的 TechButton 组件
        */}
        <TechCard
          title="快速操作"
          subtitle="常用功能快捷入口"
          icon="deploy"
          variant="glass"
          hoverable
          actions={
            <>
              {/* Ghost 按钮：透明背景的次要按钮 */}
              <TechButton variant="ghost" size="small">查看更多</TechButton>
              {/* Primary 按钮：主要操作按钮 */}
              <TechButton variant="primary" size="small">立即操作</TechButton>
            </>
          }
        >
          {/* 按钮组：展示带图标的 TechButton */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '16px 0' }}>
            {/* Secondary 按钮示例：带用户图标 */}
            <TechButton variant="secondary" size="small" icon="user">用户管理</TechButton>
            {/* Secondary 按钮示例：带设置图标 */}
            <TechButton variant="secondary" size="small" icon="settings">系统设置</TechButton>
            {/* Secondary 按钮示例：带 API 图标 */}
            <TechButton variant="secondary" size="small" icon="api">API 配置</TechButton>
          </div>
        </TechCard>

        {/* 
          TechCard 示例 3: 边框样式卡片 (variant="outlined")
          演示特性：
          - 边框式设计，适合信息展示
          - 文本列表样式的内容
        */}
        <TechCard
          title="最近活动"
          subtitle="系统最新动态"
          icon="guide"
          variant="outlined"
          hoverable
        >
          {/* 活动列表：展示系统最近操作记录 */}
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

      {/* SPA 导航说明区域：介绍如何实现单页应用导航 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          SPA 导航演示说明
        </h2>
        {/* 
          TechCard 示例 4: 填充样式卡片 (variant="filled")
          演示特性：
          - 填充背景色彩，突出重要信息
          - 教程性内容的展示
          - 说明 SPA 导航的实现原理
        */}
        <TechCard
          title="Link/to 导航功能"
          subtitle="基于 react-router-dom 的单页应用导航"
          icon="guide"
          variant="filled"
          hoverable
        >
          {/* 教程内容：详细说明 SPA 导航的实现方法 */}
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              这个演示展示了如何在 YGG Admin 中使用 Link/to 进行 SPA 导航：
            </p>
            {/* 关键特性列表：说明 SPA 导航的实现要点 */}
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
