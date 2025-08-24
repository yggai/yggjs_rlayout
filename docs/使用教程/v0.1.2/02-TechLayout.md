# TechLayout 布局组件

## 简介

`TechLayout` 是整个科技风组件库的核心布局组件，它提供了一个完整的应用程序布局解决方案，包括：

- 顶部导航栏
- 可折叠侧边栏
- 主要内容区域
- 响应式设计

## 基础使用

### 最简单的使用

```tsx
import { TechLayout } from 'yggjs_rlayout/tech';

function App() {
  const menuItems = [
    { key: 'home', label: '首页', icon: 'home' },
    { key: 'users', label: '用户', icon: 'users' },
  ];

  return (
    <TechLayout
      brand="我的应用"
      sidebarItems={menuItems}
    >
      <div>页面内容</div>
    </TechLayout>
  );
}
```

## 完整示例

### 带所有功能的布局

```tsx
import { TechLayout } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function App() {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  
  // 侧边栏菜单数据
  const sidebarItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
    { 
      key: 'users', 
      label: '用户管理', 
      icon: 'users',
      children: [
        { key: 'user-list', label: '用户列表' },
        { key: 'user-roles', label: '角色管理' },
      ]
    },
    { key: 'settings', label: '设置', icon: 'settings' },
  ];
  
  // 顶部导航菜单（可选）
  const headerMenuItems = [
    { key: 'workspace1', label: '工作区 1' },
    { key: 'workspace2', label: '工作区 2' },
  ];

  return (
    <TechLayout
      // 品牌信息
      brand="管理后台"
      version="v1.0.0"
      
      // 顶部导航
      headerMenuItems={headerMenuItems}
      selectedHeaderKey="workspace1"
      onHeaderMenuSelect={(key) => console.log('切换工作区:', key)}
      
      // 侧边栏
      sidebarItems={sidebarItems}
      selectedSidebarKey={selectedKey}
      onSidebarSelect={setSelectedKey}
      
      // 搜索功能
      onSearch={(value) => console.log('搜索:', value)}
      searchPlaceholder="搜索功能..."
      
      // 顶部右侧操作区
      headerActions={
        <div>
          <button>通知</button>
          <button>用户中心</button>
        </div>
      }
      
      // 布局配置
      defaultCollapsed={false}
      sidebarWidth={260}
      collapsedWidth={72}
    >
      {/* 这里是你的页面内容 */}
      <div>
        <h1>当前页面: {selectedKey}</h1>
        <p>页面内容会在这里显示</p>
      </div>
    </TechLayout>
  );
}
```

## 属性详解

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 主要内容区域 |
| `brand` | `ReactNode` | - | 品牌信息，显示在左上角 |
| `version` | `string` | - | 版本号，显示在品牌旁边 |

### 顶部导航属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `headerMenuItems` | `TechMenuItem[]` | - | 顶部导航菜单项 |
| `selectedHeaderKey` | `string` | - | 当前选中的顶部菜单 |
| `onHeaderMenuSelect` | `(key: string) => void` | - | 顶部菜单选择回调 |
| `headerActions` | `ReactNode` | - | 顶部右侧操作区内容 |
| `headerExtra` | `ReactNode` | - | 顶部额外内容 |

### 侧边栏属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sidebarItems` | `TechMenuItem[]` | **必填** | 侧边栏菜单项 |
| `selectedSidebarKey` | `string` | - | 当前选中的侧边栏菜单 |
| `onSidebarSelect` | `(key: string) => void` | - | 侧边栏菜单选择回调 |

### 搜索功能

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onSearch` | `(value: string) => void` | - | 搜索回调函数 |
| `searchPlaceholder` | `string` | "搜索..." | 搜索框占位符 |

### 布局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `defaultCollapsed` | `boolean` | `false` | 侧边栏默认是否折叠 |
| `sidebarWidth` | `number` | `240` | 侧边栏展开时的宽度 |
| `collapsedWidth` | `number` | `72` | 侧边栏折叠时的宽度 |
| `headerHeight` | `number` | `56` | 顶部导航栏高度 |

### 内容区域配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `contentMaxWidth` | `number` | `1280` | 内容区域最大宽度 |
| `contentPadding` | `number` | `16` | 内容区域内边距 |
| `enableGlobalStyles` | `boolean` | `true` | 是否启用全局样式 |
| `enableScrollbarStyling` | `boolean` | `true` | 是否启用滚动条样式 |

## 菜单项数据格式

### 基础菜单项

```tsx
const menuItems = [
  {
    key: 'dashboard',        // 唯一标识
    label: '仪表板',          // 显示文本
    icon: 'dashboard',       // 图标名称（可选）
  },
];
```

### 带子菜单的菜单项

```tsx
const menuItems = [
  {
    key: 'users',
    label: '用户管理',
    icon: 'users',
    children: [              // 子菜单
      { key: 'user-list', label: '用户列表' },
      { key: 'user-roles', label: '角色管理' },
    ],
  },
];
```

## 响应式设计

`TechLayout` 会自动适配不同屏幕尺寸：

- **桌面端**：正常显示所有元素
- **平板端**：侧边栏自动折叠
- **手机端**：侧边栏变为抽屉式

## 路由集成

如果你使用 React Router，可以这样集成：

```tsx
import { TechLayout } from 'yggjs_rlayout/tech';
import { useNavigate, useLocation } from 'react-router-dom';

function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { key: '/dashboard', label: '仪表板', icon: 'dashboard' },
    { key: '/users', label: '用户', icon: 'users' },
  ];

  return (
    <TechLayout
      brand="我的应用"
      sidebarItems={menuItems}
      selectedSidebarKey={location.pathname}
      onSidebarSelect={(key) => navigate(key)}
    >
      {children}
    </TechLayout>
  );
}
```

## 常见问题

### 1. 如何隐藏顶部导航？

不传入 `headerMenuItems` 即可隐藏顶部菜单栏。

### 2. 如何自定义侧边栏宽度？

使用 `sidebarWidth` 和 `collapsedWidth` 属性：

```tsx
<TechLayout
  sidebarWidth={300}       // 展开宽度
  collapsedWidth={60}      // 折叠宽度
  // ...其他属性
>
```

### 3. 如何处理菜单点击事件？

使用 `onSidebarSelect` 回调：

```tsx
<TechLayout
  onSidebarSelect={(key) => {
    console.log('选中菜单:', key);
    // 这里可以处理路由跳转、状态更新等逻辑
  }}
  // ...其他属性
>
```

### 4. 如何设置默认折叠侧边栏？

```tsx
<TechLayout
  defaultCollapsed={true}
  // ...其他属性
>
```