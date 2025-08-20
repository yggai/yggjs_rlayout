# 科技风主题组件库

这是一套专为科技风应用设计的React组件库，提供了完整的布局解决方案和主题系统。

## 特性

- 🎨 **内置科技风主题** - 深色背景、渐变效果、发光边框
- 🚀 **简化的API** - 一个组件搞定整个应用布局
- 📱 **响应式设计** - 支持侧边栏折叠，适配不同屏幕
- 🔍 **集成搜索** - 内置美观的搜索组件
- ⚡ **TypeScript支持** - 完整的类型定义
- 🎯 **开箱即用** - 无需额外配置CSS

## 快速开始

### 基础用法

```tsx
import { TechLayout } from 'yggjs_rlayout';

function App() {
  const sidebarItems = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <TechLayout
      brand="My App"
      sidebarItems={sidebarItems}
      onSearch={(value) => console.log('搜索:', value)}
    >
      <h1>欢迎使用科技风布局</h1>
    </TechLayout>
  );
}
```

### 完整配置

```tsx
import { TechLayout, TechButton } from 'yggjs_rlayout';

function App() {
  const headerMenuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'docs', label: 'Docs', icon: 'book' },
  ];

  const sidebarItems = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'api', label: 'API', icon: 'api' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <TechLayout
      // 头部配置
      brand="YGG Admin"
      headerMenuItems={headerMenuItems}
      selectedHeaderKey="dashboard"
      onHeaderMenuSelect={(key) => console.log('Header:', key)}
      onSearch={(value) => console.log('搜索:', value)}
      version="v1.0.0"
      
      // 侧边栏配置
      sidebarItems={sidebarItems}
      selectedSidebarKey="home"
      onSidebarSelect={(key) => console.log('Sidebar:', key)}
      
      // 页面头部
      breadcrumb="Home / Dashboard"
      title="控制台"
      pageActions={
        <>
          <TechButton variant="secondary">新建</TechButton>
          <TechButton variant="primary" icon="deploy">部署</TechButton>
        </>
      }
    >
      {/* 页面内容 */}
      <div className="tech-cards">
        <div className="tech-card">
          <h3>卡片标题</h3>
          <p>卡片内容</p>
        </div>
      </div>
    </TechLayout>
  );
}
```

## 组件API

### TechLayout

主要的布局组件，包含头部、侧边栏和内容区域。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `brand` | `ReactNode` | - | 品牌名称或Logo |
| `headerMenuItems` | `TechMenuItem[]` | `[]` | 头部菜单项 |
| `sidebarItems` | `TechMenuItem[]` | - | 侧边栏菜单项 |
| `onSearch` | `(value: string) => void` | - | 搜索回调 |
| `breadcrumb` | `string` | - | 面包屑导航 |
| `title` | `string` | - | 页面标题 |
| `pageActions` | `ReactNode` | - | 页面操作按钮 |

### TechButton

科技风按钮组件。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'toggle'` | `'secondary'` | 按钮样式 |
| `icon` | `TechIconName` | - | 图标名称 |
| `iconOnly` | `boolean` | `false` | 仅显示图标 |

### TechSearch

科技风搜索组件。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number \| string` | `280` | 搜索框宽度 |
| `onSearch` | `(value: string) => void` | - | 搜索回调 |

## 内置样式类

组件提供了一些内置的CSS类，可以直接使用：

- `.tech-cards` - 卡片网格布局
- `.tech-card` - 科技风卡片样式

## CSS变量

可以通过CSS变量自定义主题色彩：

```css
:root {
  --tech-primary: #5aa2ff;
  --tech-accent: #27e0ff;
  --tech-bg: #0a0f1e;
  --tech-text: #cfe1ff;
}
```

## 新增功能

### 🎨 全局样式重置
- 自动应用现代CSS重置规则
- 优化字体渲染和文本选择样式
- 统一的focus样式

### 📜 科技风滚动条
- 渐变色滚动条设计
- 悬停和激活状态动画
- 支持细滚动条和隐藏滚动条变体
- 跨浏览器兼容

### 🦶 Footer组件
- 多栏链接布局
- 社交媒体链接
- 版本信息显示
- 回到顶部功能
- 响应式设计

### 📱 改进的布局系统
- 垂直滚动支持，内容超出时自动显示滚动条
- 水平方向防溢出，确保不会出现横向滚动
- 更好的响应式布局
- 固定头部和侧边栏

## 滚动条样式类

- `.tech-scrollbar-thin` - 细滚动条（4px宽）
- `.tech-scrollbar-hidden` - 隐藏滚动条

## 工具类

- `.tech-glow-pulse` - 发光脉冲动画
- `.tech-slide-in` - 滑入动画
- `.tech-fade-in` - 淡入动画
- `.tech-hide-mobile` - 移动端隐藏
- `.tech-show-mobile` - 移动端显示
- `.tech-text-gradient` - 渐变文字
- `.tech-text-glow` - 发光文字

## 图标

支持的图标名称：`menu`, `dashboard`, `book`, `info`, `home`, `guide`, `api`, `search`, `user`, `settings`, `logout`, `chevron-left`, `chevron-right`, `plus`, `deploy`

## 完整示例

```tsx
import { TechLayout } from 'yggjs_rlayout';

function App() {
  return (
    <TechLayout
      brand="My App"
      sidebarItems={[
        { key: 'home', label: 'Home', icon: 'home' }
      ]}
      footerProps={{
        description: "现代化的科技风管理后台框架",
        sections: [
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '#features' },
              { label: 'Documentation', href: '#docs', icon: 'book' }
            ]
          }
        ],
        socialLinks: [
          { label: 'GitHub', href: '#github', icon: 'api' }
        ]
      }}
      onSearch={(value) => console.log('搜索:', value)}
    >
      <div className="tech-cards">
        <div className="tech-card">
          <h3>卡片标题</h3>
          <p>卡片内容</p>
        </div>
      </div>
    </TechLayout>
  );
}
```
