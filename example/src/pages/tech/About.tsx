import React from 'react';
import { TechCard, TechButton } from 'yggjs_rlayout';

export default function About() {
  return (
    <div>
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        关于 YGG Admin
      </h1>
      
      <div className="tech-cards">
        <TechCard
          title="项目介绍"
          subtitle="现代化的科技风管理后台框架"
          icon="info"
          variant="default"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              YGG Admin 是一个基于 React 的现代化管理后台组件库，
              专注于提供科技感十足的用户界面和完整的布局解决方案。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>🚀</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>现代化设计</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>⚡</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>高性能</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(90, 162, 255, 0.05)', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--tech-accent)', marginBottom: '8px' }}>🎨</div>
                <div style={{ fontSize: '14px', color: 'var(--tech-text)' }}>科技风格</div>
              </div>
            </div>
          </div>
        </TechCard>

        <TechCard
          title="核心特性"
          subtitle="为现代 Web 应用而生"
          icon="deploy"
          variant="glass"
          hoverable
        >
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

        <TechCard
          title="技术栈"
          subtitle="基于现代前端技术构建"
          icon="api"
          variant="outlined"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
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
                  background: `${tech.color}15`,
                  border: `1px solid ${tech.color}30`,
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

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          开始使用
        </h2>
        <TechCard
          title="安装和使用"
          subtitle="快速集成到你的项目中"
          icon="guide"
          variant="filled"
          hoverable
          actions={
            <>
              <TechButton variant="ghost" size="small">查看文档</TechButton>
              <TechButton variant="primary" size="small">立即开始</TechButton>
            </>
          }
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
{`# 安装
npm install yggjs_rlayout

# 使用
import { TechLayout } from 'yggjs_rlayout';

function App() {
  return (
    <TechLayout brand="Your App">
      {/* 你的内容 */}
    </TechLayout>
  );
}`}
            </pre>
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
