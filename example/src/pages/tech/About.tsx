// YGG Admin 示例项目 - 关于页面组件
// 本组件展示了项目介绍、特性说明和技术栈展示的布局方式
import React from 'react';
// 从组件库中引入科技风格的卡片和按钮组件
import { TechCard, TechButton } from 'yggjs_rlayout/tech';

/**
 * About 组件 - 关于页面
 * 
 * 功能说明：
 * - 展示 YGG Admin 项目的完整介绍和特性
 * - 演示技术栈和核心功能的可视化展示
 * - 提供安装使用指南和代码示例
 * - 展示项目的设计理念和技术优势
 * 
 * 组件库特性演示：
 * - 多种 TechCard 变体的综合使用
 * - 动态数据渲染（技术栈列表）
 * - 图标和颜色的主题化使用
 * - 复杂布局的响应式设计
 * 
 * @returns {JSX.Element} 关于页面的 JSX 元素
 * 
 * @example
 * // 在路由中使用
 * <Route path="about" element={<About />} />
 */
export default function About() {
  return (
    <div>
      {/* 页面标题，使用科技风主题的文本颜色变量 */}
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        关于 YGG Admin
      </h1>
      
      {/* 项目介绍卡片网格容器：展示项目的各个方面 */}
      <div className="tech-cards">
        {/* 
          介绍卡片 1: 项目基本信息
          演示特性：
          - 项目概述和特点展示
          - 网格布局展示多个特性点
          - 图标和颜色的主题化使用
        */}
        <TechCard
          title="项目介绍"
          subtitle="现代化的科技风管理后台框架"
          icon="info"
          variant="default"
          hoverable
        >
          {/* 项目介绍内容：文字说明 + 特性展示 */}
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              YGG Admin 是一个基于 React 的现代化管理后台组件库，
              专注于提供科技感十足的用户界面和完整的布局解决方案。
            </p>
            {/* 特性网格：响应式布局展示三个主要特点 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {/* 特性 1: 现代化设计 */}
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>🚀</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>现代化设计</div>
              </div>
              {/* 特性 2: 高性能 */}
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>⚡</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>高性能</div>
              </div>
              {/* 特性 3: 科技风格 */}
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>🎨</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>科技风格</div>
              </div>
            </div>
          </div>
        </TechCard>

        {/* 
          介绍卡片 2: 核心特性
          演示特性：
          - 毛玻璃效果卡片在特性展示中的使用
          - 特性列表的组织和展示
        */}
        <TechCard
          title="核心特性"
          subtitle="为现代 Web 应用而生"
          icon="deploy"
          variant="glass"
          hoverable
        >
          {/* 核心特性列表：详细说明 YGG Admin 的主要功能 */}
          <div style={{ padding: '16px 0' }}>
            <ul style={{ color: 'var(--tech-text-muted)', fontSize: '14px', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
              <li><strong>完整布局方案</strong> - TechLayout 提供头部、侧边栏、面包屑等完整功能</li>
              <li><strong>SPA 路由支持</strong> - 原生支持 react-router-dom 的 Link 组件</li>
              <li><strong>科技风设计</strong> - 渐变背景、发光效果、毛玻璃质感</li>
              <li><strong>响应式布局</strong> - 适配桌面端和移动端</li>
              <li><strong>主题定制</strong> - 通过 CSS 变量轻松定制主题</li>
              <li><strong>TypeScript</strong> - 完整的类型定义支持</li>
            </ul>
          </div>
        </TechCard>

        {/* 
          介绍卡片 3: 技术栈展示
          演示特性：
          - 边框样式卡片在信息展示中的使用
          - 动态数据渲染（map 函数遍历技术栈列表）
          - 颜色主题化的技术标签
        */}
        <TechCard
          title="技术栈"
          subtitle="基于现代前端技术构建"
          icon="api"
          variant="outlined"
          hoverable
        >
          {/* 技术栈展示：动态渲染技术标签 */}
          <div style={{ padding: '16px 0' }}>
            {/* 响应式网格：自动适配技术标签的显示 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              {/* 
                技术栈数据源：包含名称和主题颜色
                演示 React 中数据驱动的动态渲染
              */}
              {[
                { name: 'React 18', color: '#61DAFB' },
                { name: 'TypeScript', color: '#3178C6' },
                { name: 'Vite', color: '#646CFF' },
                { name: 'CSS Variables', color: '#1572B6' },
                { name: 'React Router', color: '#CA4245' },
                { name: 'Vitest', color: '#6E9F18' }
              ].map(tech => (
                <div key={tech.name} style={{
                  padding: '12px 8px',
                  background: `${tech.color}15`, // 15% 透明度的背景色
                  border: `1px solid ${tech.color}30`, // 30% 透明度的边框色
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: tech.color, fontWeight: 'bold' }}>
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TechCard>
      </div>

      {/* 安装使用指南区域：展示实际使用的代码示例 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          开始使用
        </h2>
        {/* 
          介绍卡片 4: 安装和使用指南
          演示特性：
          - 填充样式突出重要的操作指南
          - actions 区域使用多个按钮的组合
          - 代码块的样式化和示例展示
        */}
        <TechCard
          title="安装和使用"
          subtitle="快速集成到你的项目中"
          icon="guide"
          variant="filled"
          hoverable
          actions={
            <>
              {/* Ghost 按钮：次要操作按钮 */}
              <TechButton variant="ghost" size="small">查看文档</TechButton>
              {/* Primary 按钮：主要操作按钮 */}
              <TechButton variant="primary" size="small">立即开始</TechButton>
            </>
          }
        >
          {/* 安装使用指南内容 */}
          <div style={{ padding: '16px 0' }}>
            {/* 
              代码块样式：展示安装和基础使用示例
              使用与 Docs 组件相同的样式设定，保持视觉一致性
            */}
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
{`# 安装
npm install yggjs_rlayout

# 使用
import { TechLayout } from 'yggjs_rlayout/tech';

function App() {
  return (
    <TechLayout brand="Your App">
      {/* 你的内容 */}
    </TechLayout>
  );
}`}
            </pre>
            {/* 指南说明：补充说明 SPA 功能的实际体验 */}
            <p style={{ color: 'var(--tech-text-muted)', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
              这个演示页面展示了 SPA 导航的完整实现，
              点击头部和侧边栏的菜单项体验无刷新页面切换。
            </p>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
