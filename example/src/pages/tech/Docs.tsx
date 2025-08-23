// YGG Admin 示例项目 - 文档中心页面组件
// 本组件演示了文档结构的展示和代码示例的呈现方式
import React from 'react';
// 从组件库中引入科技风格的卡片和按钮组件
import { TechCard, TechButton } from 'yggjs_rlayout/tech';

/**
 * Docs 组件 - 文档中心页面
 * 
 * 功能说明：
 * - 展示组件库的文档结构和学习路径
 * - 演示不同类型的文档内容呈现方式
 * - 提供代码示例和配置说明
 * - 展示组件库的核心组件列表
 * 
 * 组件库特性演示：
 * - TechCard 的文档展示用法
 * - 代码块的样式和格式化
 * - 响应式网格布局在文档中的应用
 * - 按钮组件在文档导航中的使用
 * 
 * @returns {JSX.Element} 文档中心页面的 JSX 元素
 * 
 * @example
 * // 在路由中使用
 * <Route path="docs" element={<Docs />} />
 * <Route path="docs/api" element={<Docs />} />
 */
export default function Docs() {
  return (
    <div>
      {/* 页面标题，使用科技风主题的文本颜色变量 */}
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        文档中心
      </h1>
      
      {/* 文档卡片网格容器：展示不同类型的文档内容 */}
      <div className="tech-cards">
        {/* 
          文档卡片 1: 快速开始指南
          演示特性：
          - 学习路径的展示方式
          - actions 属性使用单个按钮
          - 列表样式的内容组织
        */}
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
          {/* 快速开始指南内容 */}
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              从安装到第一个页面，快速了解 YGG Admin 的基本使用方法。
            </p>
            {/* 学习路径列表 */}
            <div style={{ fontSize: '14px', color: 'var(--tech-text-muted)', lineHeight: 1.6 }}>
              <div>• 安装和配置</div>
              <div>• 基础布局使用</div>
              <div>• 主题定制</div>
            </div>
          </div>
        </TechCard>

        {/* 
          文档卡片 2: 组件 API 文档
          演示特性：
          - 毛玻璃效果卡片在文档中的应用
          - 网格布局展示组件列表
          - 组件标签的视觉设计
        */}
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
          {/* 组件列表：网格布局展示核心组件 */}
          <div style={{ padding: '16px 0' }}>
            {/* 响应式网格：自动适配组件标签的显示 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {/* 主布局组件标签 */}
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechLayout</div>
              </div>
              {/* 卡片组件标签 */}
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechCard</div>
              </div>
              {/* 按钮组件标签 */}
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechButton</div>
              </div>
              {/* 菜单组件标签 */}
              <div style={{ padding: '8px', background: 'rgba(90, 162, 255, 0.1)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--tech-accent)' }}>TechMenu</div>
              </div>
            </div>
          </div>
        </TechCard>

        {/* 
          文档卡片 3: 设计指南
          演示特性：
          - 边框样式在文档中的使用
          - 设计原则的组织和展示
        */}
        <TechCard
          title="设计指南"
          subtitle="科技风设计原则和规范"
          icon="settings"
          variant="outlined"
          hoverable
        >
          {/* 设计指南内容 */}
          <div style={{ padding: '16px 0' }}>
            <p style={{ color: 'var(--tech-text-muted)', margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5 }}>
              了解 YGG Admin 的设计理念和视觉规范。
            </p>
            {/* 设计原则列表 */}
            <ul style={{ color: 'var(--tech-text-muted)', fontSize: '14px', margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>色彩系统和主题变量</li>
              <li>字体和排版规范</li>
              <li>间距和布局原则</li>
              <li>动效和交互设计</li>
            </ul>
          </div>
        </TechCard>
      </div>

      {/* 代码示例区域：展示 SPA 路由配置的具体实现 */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          SPA 路由配置示例
        </h2>
        {/* 
          文档卡片 4: 代码示例卡片
          演示特性：
          - 填充样式突出重要的代码内容
          - 代码块的格式化和样式
          - 教程性说明的展示方式
        */}
        <TechCard
          title="代码示例"
          subtitle="如何配置 Link/to 导航"
          icon="book"
          variant="filled"
          hoverable
        >
          {/* 代码示例内容：展示 SPA 导航的实现代码 */}
          <div style={{ padding: '16px 0' }}>
            {/* 
              代码块样式：
              - 使用半透明黑色背景强调代码区域
              - 科技风主题颜色和字体设定
              - 支持水平滚动防止代码过长
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
{`import { Link } from 'react-router-dom';
import { TechLayout } from 'yggjs_rlayout/tech';

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
            {/* 代码说明：解释代码示例的关键配置和实现要点 */}
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
