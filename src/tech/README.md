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
| `breadcrumb` | `string \| TechBreadcrumbItem[]` | - | 面包屑导航 |
| `title` | `string` | - | 页面标题 |
| `pageActions` | `ReactNode` | - | 页面操作按钮 |
| `footerProps` | `TechFooterProps` | - | Footer配置 |

### TechCard

科技风卡片组件。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 卡片标题 |
| `subtitle` | `string` | - | 卡片副标题 |
| `icon` | `TechIconName` | - | 卡片图标 |
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'glass' \| 'gradient'` | `'default'` | 卡片样式 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 卡片尺寸 |
| `hoverable` | `boolean` | `true` | 是否可悬停 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `loading` | `boolean` | `false` | 加载状态 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `actions` | `ReactNode` | - | 操作按钮区域 |
| `extra` | `ReactNode` | - | 额外内容（右上角） |
| `onClick` | `() => void` | - | 点击回调 |

### TechBreadcrumb

科技风面包屑导航组件，支持简约文字版和图标版两种样式。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TechBreadcrumbItem[]` | - | 面包屑项目 |
| `variant` | `'simple' \| 'icon'` | `'simple'` | 样式变体 |
| `separator` | `ReactNode` | `'/'` (简约版) / `<ChevronRight />` (图标版) | 分隔符 |
| `maxItems` | `number` | - | 最大显示项目数 |
| `showHome` | `boolean` | `false` (简约版) / `true` (图标版) | 是否显示Home链接 |
| `homeIcon` | `TechIconName` | `'home'` | Home图标 |
| `onHomeClick` | `() => void` | - | Home点击回调 |

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

### 🍞 面包屑导航变体
- **简约版（默认）**：纯文字，使用 `/` 分隔符，更简洁
- **图标版**：支持图标，使用箭头分隔符，更丰富

### 🃏 卡片组件变体
- **5种样式**：default、outlined、filled、glass、gradient
- **3种尺寸**：small、medium、large
- **多种状态**：正常、加载、禁用、可点击

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

## 使用示例

### 基础卡片

```tsx
import { TechCard, TechButton } from 'yggjs_rlayout';

function CardExample() {
  return (
    <TechCard
      title="用户设置"
      subtitle="管理用户账户和偏好"
      icon="user"
      variant="default"
      hoverable
      actions={
        <>
          <TechButton variant="ghost" size="small">取消</TechButton>
          <TechButton variant="primary" size="small">保存</TechButton>
        </>
      }
    >
      这是卡片的内容区域，可以放置任何React元素。
    </TechCard>
  );
}
```

### 面包屑导航

```tsx
import { TechBreadcrumb, createBreadcrumb } from 'yggjs_rlayout';

function BreadcrumbExample() {
  // 简约版面包屑（默认）
  const simpleItems = createBreadcrumb()
    .add('Dashboard', '/dashboard')
    .add('Settings', '/settings')
    .add('Profile')
    .build();

  // 图标版面包屑
  const iconItems = createBreadcrumb()
    .add('Dashboard', '/dashboard', 'dashboard')
    .add('Settings', '/settings', 'settings')
    .add('Profile')
    .build();

  return (
    <div>
      {/* 简约文字版（默认） */}
      <TechBreadcrumb
        variant="simple"
        items={simpleItems}
        maxItems={3}
      />

      {/* 图标版 */}
      <TechBreadcrumb
        variant="icon"
        items={iconItems}
        showHome={true}
        onHomeClick={() => console.log('回到首页')}
      />
    </div>
  );
}
```

### 完整布局示例

```tsx
import { TechLayout, TechCard, createBreadcrumb } from 'yggjs_rlayout';

function App() {
  // 简约版面包屑（默认）
  const breadcrumbItems = createBreadcrumb()
    .add('Dashboard', '/dashboard')
    .add('Components')
    .build();

  return (
    <TechLayout
      brand="My App"
      sidebarItems={[
        { key: 'home', label: 'Home', icon: 'home' }
      ]}
      breadcrumb={breadcrumbItems}
      title="组件演示"
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
        ]
      }}
      onSearch={(value) => console.log('搜索:', value)}
    >
      <div className="tech-cards">
        <TechCard
          title="卡片标题"
          subtitle="卡片副标题"
          icon="dashboard"
          variant="default"
          hoverable
        >
          卡片内容
        </TechCard>
      </div>
    </TechLayout>
  );
}
```
