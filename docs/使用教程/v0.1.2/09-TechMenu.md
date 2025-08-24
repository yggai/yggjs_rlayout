# TechMenu 菜单组件

## 简介

`TechMenu` 是科技风格的菜单组件，支持水平和垂直两种布局模式，可以创建多级菜单、支持图标显示，并提供折叠状态支持。广泛用于导航系统、侧边栏和顶部菜单栏。

## 基础使用

### 最简单的菜单

```tsx
import { TechMenu } from 'yggjs_rlayout/tech';

const menuItems = [
  { key: 'home', label: '首页' },
  { key: 'about', label: '关于' },
  { key: 'contact', label: '联系' },
];

<TechMenu items={menuItems} />
```

### 带图标的菜单

```tsx
const menuItems = [
  { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
  { key: 'users', label: '用户管理', icon: 'users' },
  { key: 'settings', label: '设置', icon: 'settings' },
];

<TechMenu items={menuItems} />
```

## 完整示例

```tsx
import { TechMenu, TechCard } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function MenuExamples() {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [collapsedMenuKey, setCollapsedMenuKey] = useState('dashboard');

  // 基础菜单数据
  const basicMenuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
    { key: 'users', label: '用户管理', icon: 'users' },
    { key: 'products', label: '产品管理', icon: 'package' },
    { key: 'orders', label: '订单管理', icon: 'list' },
    { key: 'settings', label: '系统设置', icon: 'settings' },
  ];

  // 多级菜单数据
  const hierarchicalMenuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
    {
      key: 'users',
      label: '用户管理',
      icon: 'users',
      children: [
        { key: 'user-list', label: '用户列表' },
        { key: 'user-roles', label: '角色管理' },
        { key: 'user-permissions', label: '权限管理' },
      ],
    },
    {
      key: 'content',
      label: '内容管理',
      icon: 'file',
      children: [
        { key: 'articles', label: '文章管理' },
        { key: 'categories', label: '分类管理' },
        {
          key: 'media',
          label: '媒体文件',
          children: [
            { key: 'images', label: '图片管理' },
            { key: 'videos', label: '视频管理' },
          ],
        },
      ],
    },
    { key: 'settings', label: '系统设置', icon: 'settings' },
  ];

  // 水平菜单数据
  const horizontalMenuItems = [
    { key: 'home', label: '首页', icon: 'home' },
    { key: 'products', label: '产品', icon: 'package' },
    { key: 'solutions', label: '解决方案', icon: 'tool' },
    { key: 'about', label: '关于我们', icon: 'info' },
    { key: 'contact', label: '联系我们', icon: 'mail' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* 基础垂直菜单 */}
      <TechCard title="基础垂直菜单">
        <TechMenu
          items={basicMenuItems}
          selectedKeys={[selectedKey]}
          onSelect={(info) => setSelectedKey(info.key)}
          mode="vertical"
        />
      </TechCard>

      {/* 折叠状态菜单 */}
      <TechCard title="折叠状态菜单">
        <TechMenu
          items={basicMenuItems}
          selectedKeys={[collapsedMenuKey]}
          onSelect={(info) => setCollapsedMenuKey(info.key)}
          collapsed={true}
          mode="vertical"
        />
      </TechCard>

      {/* 多级菜单 */}
      <TechCard title="多级菜单" style={{ gridColumn: '1 / -1' }}>
        <TechMenu
          items={hierarchicalMenuItems}
          selectedKeys={[selectedKey]}
          onSelect={(info) => setSelectedKey(info.key)}
          mode="vertical"
        />
      </TechCard>

      {/* 水平菜单 */}
      <TechCard title="水平菜单" style={{ gridColumn: '1 / -1' }}>
        <TechMenu
          items={horizontalMenuItems}
          selectedKeys={[selectedKey]}
          onSelect={(info) => setSelectedKey(info.key)}
          mode="horizontal"
        />
      </TechCard>
    </div>
  );
}
```

## 属性详解

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TechMenuItem[]` | **必填** | 菜单项数据 |
| `mode` | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单布局模式 |
| `selectedKeys` | `string[]` | `[]` | 当前选中的菜单项keys |

### 状态属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `collapsed` | `boolean` | `false` | 是否折叠状态（仅垂直模式） |
| `disabled` | `boolean` | `false` | 是否禁用整个菜单 |

### 交互属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onSelect` | `(info: {key: string}) => void` | - | 菜单项选中回调 |
| `onSelectItem` | `(item: TechMenuItem) => void` | - | 菜单项选中回调（传入完整项数据） |

### 路由属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `linkComponent` | `LinkLikeComponent` | - | 自定义链接组件（如React Router的Link） |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 菜单项数据格式

### 基础菜单项

```tsx
const menuItem: TechMenuItem = {
  key: 'unique-key',        // 唯一标识，必填
  label: '菜单标题',         // 显示文本，必填
  icon: 'dashboard',        // 图标名称，可选
  disabled: false,          // 是否禁用，可选
};
```

### 带链接的菜单项

```tsx
// 普通链接（页面跳转）
const linkItem: TechMenuItem = {
  key: 'external',
  label: '外部链接',
  icon: 'link',
  href: 'https://example.com',
};

// SPA路由链接
const routeItem: TechMenuItem = {
  key: 'users',
  label: '用户管理',
  icon: 'users',
  to: '/users',
};
```

### 多级菜单项

```tsx
const parentItem: TechMenuItem = {
  key: 'content',
  label: '内容管理',
  icon: 'file',
  children: [
    { key: 'articles', label: '文章管理' },
    { key: 'categories', label: '分类管理' },
    {
      key: 'media',
      label: '媒体管理',
      children: [
        { key: 'images', label: '图片' },
        { key: 'videos', label: '视频' },
      ],
    },
  ],
};
```

## 路由系统集成

### React Router 集成

```tsx
import { Link, useLocation } from 'react-router-dom';

function AppMenu() {
  const location = useLocation();
  
  const menuItems = [
    { key: '/', label: '首页', icon: 'home', to: '/' },
    { key: '/users', label: '用户', icon: 'users', to: '/users' },
    { key: '/settings', label: '设置', icon: 'settings', to: '/settings' },
  ];

  return (
    <TechMenu
      items={menuItems}
      selectedKeys={[location.pathname]}
      linkComponent={Link}
      mode="vertical"
    />
  );
}
```

### Next.js 集成

```tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

function NextMenu() {
  const router = useRouter();
  
  const menuItems = [
    { key: '/', label: '首页', icon: 'home', to: '/' },
    { key: '/about', label: '关于', icon: 'info', to: '/about' },
  ];

  // Next.js Link 组件适配器
  const NextLink = ({ to, children, className }) => (
    <Link href={to} className={className}>
      {children}
    </Link>
  );

  return (
    <TechMenu
      items={menuItems}
      selectedKeys={[router.pathname]}
      linkComponent={NextLink}
    />
  );
}
```

## 常见使用场景

### 1. 侧边栏导航菜单

```tsx
function SidebarMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard', to: '/dashboard' },
    {
      key: 'users',
      label: '用户管理',
      icon: 'users',
      children: [
        { key: 'user-list', label: '用户列表', to: '/users' },
        { key: 'user-roles', label: '角色管理', to: '/users/roles' },
      ],
    },
    { key: 'settings', label: '设置', icon: 'settings', to: '/settings' },
  ];

  return (
    <div style={{ width: collapsed ? '72px' : '240px', transition: 'width 0.3s' }}>
      <TechMenu
        items={menuItems}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        collapsed={collapsed}
        mode="vertical"
        linkComponent={Link}
      />
    </div>
  );
}
```

### 2. 顶部水平导航

```tsx
function HeaderMenu() {
  const [activeKey, setActiveKey] = useState('home');

  const menuItems = [
    { key: 'home', label: '首页', to: '/' },
    { key: 'products', label: '产品', to: '/products' },
    { key: 'solutions', label: '解决方案', to: '/solutions' },
    { key: 'support', label: '技术支持', to: '/support' },
    { key: 'about', label: '关于我们', to: '/about' },
  ];

  return (
    <div style={{ 
      padding: '0 20px',
      backgroundColor: 'var(--tech-panel)',
      borderBottom: '1px solid var(--tech-border)'
    }}>
      <TechMenu
        items={menuItems}
        selectedKeys={[activeKey]}
        onSelect={(info) => setActiveKey(info.key)}
        mode="horizontal"
        linkComponent={Link}
      />
    </div>
  );
}
```

### 3. 上下文菜单

```tsx
function ContextMenu({ x, y, visible, onClose }) {
  const contextMenuItems = [
    { key: 'edit', label: '编辑', icon: 'edit' },
    { key: 'copy', label: '复制', icon: 'copy' },
    { key: 'delete', label: '删除', icon: 'delete' },
    { key: 'separator-1', label: '', disabled: true }, // 分隔符
    { key: 'properties', label: '属性', icon: 'info' },
  ];

  if (!visible) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onClick={onClose}
      />
      
      {/* 上下文菜单 */}
      <div
        style={{
          position: 'fixed',
          top: y,
          left: x,
          zIndex: 1000,
          backgroundColor: 'var(--tech-panel)',
          border: '1px solid var(--tech-border)',
          borderRadius: '6px',
          boxShadow: 'var(--tech-glow)',
          minWidth: '150px',
        }}
      >
        <TechMenu
          items={contextMenuItems}
          mode="vertical"
          onSelect={(info) => {
            handleContextAction(info.key);
            onClose();
          }}
        />
      </div>
    </>
  );
}
```

### 4. 标签页菜单

```tsx
function TabMenu() {
  const [activeTab, setActiveTab] = useState('info');

  const tabItems = [
    { key: 'info', label: '基本信息', icon: 'info' },
    { key: 'settings', label: '设置', icon: 'settings' },
    { key: 'security', label: '安全', icon: 'shield' },
    { key: 'notifications', label: '通知', icon: 'bell' },
  ];

  return (
    <div>
      {/* 标签菜单 */}
      <div style={{ borderBottom: '1px solid var(--tech-border)' }}>
        <TechMenu
          items={tabItems}
          selectedKeys={[activeTab]}
          onSelect={(info) => setActiveTab(info.key)}
          mode="horizontal"
          style={{ borderBottom: 'none' }}
        />
      </div>
      
      {/* 标签内容 */}
      <div style={{ padding: '20px' }}>
        {activeTab === 'info' && <div>基本信息内容</div>}
        {activeTab === 'settings' && <div>设置内容</div>}
        {activeTab === 'security' && <div>安全设置内容</div>}
        {activeTab === 'notifications' && <div>通知设置内容</div>}
      </div>
    </div>
  );
}
```

## 菜单状态管理

### 受控模式

```tsx
function ControlledMenu() {
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [openKeys, setOpenKeys] = useState(['users']); // 展开的子菜单

  return (
    <TechMenu
      items={menuItems}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={(info) => setSelectedKeys([info.key])}
      onOpenChange={(keys) => setOpenKeys(keys)}
    />
  );
}
```

### 结合状态管理库

```tsx
// 使用 Redux
import { useSelector, useDispatch } from 'react-redux';

function ReduxMenu() {
  const selectedMenu = useSelector(state => state.menu.selectedKey);
  const dispatch = useDispatch();

  return (
    <TechMenu
      items={menuItems}
      selectedKeys={[selectedMenu]}
      onSelect={(info) => dispatch(setSelectedMenu(info.key))}
    />
  );
}

// 使用 Zustand
import { useMenuStore } from './store';

function ZustandMenu() {
  const { selectedKey, setSelectedKey } = useMenuStore();

  return (
    <TechMenu
      items={menuItems}
      selectedKeys={[selectedKey]}
      onSelect={(info) => setSelectedKey(info.key)}
    />
  );
}
```

## 样式定制

### 自定义菜单项样式

```css
.custom-menu .tech-menu-item {
  padding: 12px 16px;
  margin: 2px 0;
  border-radius: 6px;
}

.custom-menu .tech-menu-item:hover {
  background: linear-gradient(90deg, var(--tech-accent), transparent);
}

.custom-menu .tech-menu-item-selected {
  background: var(--tech-primary);
  color: white;
}
```

### 自定义折叠状态样式

```css
.collapsed-menu .tech-menu-item-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: all 0.3s;
}

.collapsed-menu .tech-menu-item {
  justify-content: center;
}
```

## 性能优化

### 大量菜单项优化

```tsx
import { useMemo } from 'react';

function OptimizedMenu({ rawMenuData }) {
  // 使用 useMemo 缓存菜单项处理结果
  const menuItems = useMemo(() => {
    return rawMenuData.map(item => ({
      key: item.id,
      label: item.name,
      icon: item.icon,
      to: item.path,
      children: item.children?.map(child => ({
        key: child.id,
        label: child.name,
        to: child.path,
      })),
    }));
  }, [rawMenuData]);

  return <TechMenu items={menuItems} />;
}
```

## 常见问题

### 1. 菜单项点击没有响应？

检查是否设置了正确的事件回调：

```tsx
// ✅ 正确：设置了 onSelect 回调
<TechMenu
  items={menuItems}
  onSelect={(info) => console.log('选中:', info.key)}
/>
```

### 2. 路由跳转不工作？

确保正确配置了 `linkComponent`：

```tsx
import { Link } from 'react-router-dom';

<TechMenu
  items={menuItems}
  linkComponent={Link}  // 必须设置
/>
```

### 3. 子菜单不展开？

检查菜单项的 `children` 结构是否正确：

```tsx
const menuItems = [
  {
    key: 'parent',
    label: '父菜单',
    children: [  // 子菜单数组
      { key: 'child1', label: '子菜单1' },
      { key: 'child2', label: '子菜单2' },
    ],
  },
];
```

### 4. 折叠状态下文本不隐藏？

确保使用了正确的 `collapsed` 属性：

```tsx
<TechMenu
  items={menuItems}
  collapsed={true}  // 设置折叠状态
  mode="vertical"   // 折叠只在垂直模式下有效
/>
```