# TechSidebar 侧边栏组件

## 简介

`TechSidebar` 是科技风格的侧边栏导航组件，提供可折叠的垂直导航菜单，支持多级菜单、图标显示和响应式设计。通常与 `TechLayout` 一起使用构建完整的应用布局。

## 基础使用

### 最简单的侧边栏

```tsx
import { TechSidebar } from 'yggjs_rlayout/tech';

const menuItems = [
  { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
  { key: 'users', label: '用户管理', icon: 'users' },
  { key: 'settings', label: '设置', icon: 'settings' },
];

<TechSidebar items={menuItems} />
```

### 可折叠的侧边栏

```tsx
const [collapsed, setCollapsed] = useState(false);

<TechSidebar
  items={menuItems}
  collapsed={collapsed}
  onToggle={() => setCollapsed(!collapsed)}
/>
```

## 完整示例

```tsx
import { TechSidebar, TechButton, TechCard } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function SidebarDemo() {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  // 完整的菜单数据
  const menuItems = [
    {
      key: 'dashboard',
      label: '仪表板',
      icon: 'dashboard',
      to: '/dashboard'
    },
    {
      key: 'users',
      label: '用户管理',
      icon: 'users',
      children: [
        { key: 'user-list', label: '用户列表', to: '/users' },
        { key: 'user-roles', label: '角色管理', to: '/users/roles' },
        { key: 'user-permissions', label: '权限设置', to: '/users/permissions' },
      ]
    },
    {
      key: 'content',
      label: '内容管理',
      icon: 'file',
      children: [
        { key: 'articles', label: '文章管理', to: '/content/articles' },
        { key: 'categories', label: '分类管理', to: '/content/categories' },
        {
          key: 'media',
          label: '媒体管理',
          children: [
            { key: 'images', label: '图片管理', to: '/media/images' },
            { key: 'videos', label: '视频管理', to: '/media/videos' },
            { key: 'files', label: '文件管理', to: '/media/files' },
          ]
        }
      ]
    },
    {
      key: 'ecommerce',
      label: '电商管理',
      icon: 'package',
      children: [
        { key: 'products', label: '商品管理', to: '/ecommerce/products' },
        { key: 'orders', label: '订单管理', to: '/ecommerce/orders' },
        { key: 'customers', label: '客户管理', to: '/ecommerce/customers' },
      ]
    },
    {
      key: 'analytics',
      label: '数据分析',
      icon: 'chart',
      children: [
        { key: 'reports', label: '报表中心', to: '/analytics/reports' },
        { key: 'statistics', label: '统计分析', to: '/analytics/statistics' },
      ]
    },
    {
      key: 'system',
      label: '系统管理',
      icon: 'settings',
      children: [
        { key: 'settings', label: '系统设置', to: '/system/settings' },
        { key: 'logs', label: '系统日志', to: '/system/logs' },
        { key: 'backup', label: '数据备份', to: '/system/backup' },
      ]
    },
  ];

  return (
    <div style={{ display: 'flex', height: '600px' }}>
      {/* 侧边栏 */}
      <TechSidebar
        items={menuItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        collapsed={collapsed}
        width={260}
        collapsedWidth={72}
        headerHeight={56}
        onSelectItem={(item) => {
          console.log('选中菜单项:', item);
          // 这里可以处理路由跳转等逻辑
        }}
      />

      {/* 主内容区域 */}
      <div style={{ 
        flex: 1, 
        padding: '20px',
        backgroundColor: 'var(--tech-bg)',
        marginLeft: '1px' // 分隔线
      }}>
        <TechCard 
          title="侧边栏演示"
          actions={
            <TechButton 
              variant="ghost" 
              icon="menu"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? '展开' : '折叠'}
            </TechButton>
          }
        >
          <div style={{ marginBottom: '20px' }}>
            <p><strong>当前选中:</strong> {selectedKey}</p>
            <p><strong>折叠状态:</strong> {collapsed ? '已折叠' : '已展开'}</p>
          </div>

          <div>
            <h4>功能特点:</h4>
            <ul style={{ color: '#7c89bf', lineHeight: 1.6 }}>
              <li>✅ 支持多级菜单嵌套</li>
              <li>✅ 可折叠/展开切换</li>
              <li>✅ 科技风视觉效果</li>
              <li>✅ 响应式设计</li>
              <li>✅ 平滑的动画过渡</li>
              <li>✅ 支持路由系统集成</li>
            </ul>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
```

## 属性详解

### 核心属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TechMenuItem[]` | **必填** | 侧边栏菜单项数据 |
| `selectedKey` | `string` | - | 当前选中的菜单项key |
| `collapsed` | `boolean` | `false` | 是否折叠状态 |

### 尺寸属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number` | `240` | 展开时的宽度（像素） |
| `collapsedWidth` | `number` | `72` | 折叠时的宽度（像素） |
| `headerHeight` | `number` | `56` | 顶部导航栏高度（用于定位） |

### 交互属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onSelect` | `(key: string) => void` | - | 菜单项选中回调 |
| `onSelectItem` | `(item: TechMenuItem) => void` | - | 菜单项选中回调（传入完整数据） |

### 路由属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `linkComponent` | `LinkLikeComponent` | - | 自定义链接组件 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 与布局系统集成

### 在 TechLayout 中使用

```tsx
import { TechLayout } from 'yggjs_rlayout/tech';

function App() {
  const menuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard', to: '/dashboard' },
    { key: 'users', label: '用户管理', icon: 'users', to: '/users' },
  ];

  return (
    <TechLayout
      brand="管理后台"
      sidebarItems={menuItems}  // 直接传给 TechLayout
      selectedSidebarKey="dashboard"
      onSidebarSelect={(key) => console.log('选中:', key)}
    >
      <div>主要内容区域</div>
    </TechLayout>
  );
}
```

### 独立使用侧边栏

```tsx
function CustomLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 独立的侧边栏 */}
      <TechSidebar
        items={menuItems}
        selectedKey="dashboard"
        onSelect={handleMenuSelect}
        width={280}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100
        }}
      />
      
      {/* 主内容区域 */}
      <div style={{ 
        marginLeft: '280px', 
        flex: 1,
        padding: '20px'
      }}>
        <div>页面内容</div>
      </div>
    </div>
  );
}
```

## 路由系统集成

### React Router 集成

```tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';

function RouterSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: '/dashboard', label: '仪表板', icon: 'dashboard', to: '/dashboard' },
    { key: '/users', label: '用户管理', icon: 'users', to: '/users' },
    {
      key: '/content',
      label: '内容管理',
      icon: 'file',
      children: [
        { key: '/content/articles', label: '文章管理', to: '/content/articles' },
        { key: '/content/categories', label: '分类管理', to: '/content/categories' },
      ]
    },
  ];

  return (
    <TechSidebar
      items={menuItems}
      selectedKey={location.pathname}
      onSelect={(key) => navigate(key)}
      linkComponent={Link}
    />
  );
}
```

### Next.js 集成

```tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

function NextSidebar() {
  const router = useRouter();

  const NextLink = ({ to, children, className }) => (
    <Link href={to} className={className}>
      {children}
    </Link>
  );

  return (
    <TechSidebar
      items={menuItems}
      selectedKey={router.pathname}
      onSelect={(key) => router.push(key)}
      linkComponent={NextLink}
    />
  );
}
```

## 响应式设计

### 移动端适配

```tsx
function ResponsiveSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // 移动端默认折叠
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* 移动端遮罩层 */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* 侧边栏 */}
      <TechSidebar
        items={menuItems}
        collapsed={collapsed}
        width={isMobile ? 280 : 240}
        style={{
          position: isMobile ? 'fixed' : 'relative',
          zIndex: isMobile ? 1000 : 'auto',
          transform: isMobile && collapsed 
            ? 'translateX(-100%)' 
            : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      />
    </>
  );
}
```

## 自定义样式

### 主题色定制

```css
.custom-sidebar {
  --sidebar-bg: linear-gradient(180deg, var(--tech-panel), var(--tech-panel-2));
  --sidebar-border: var(--tech-accent);
  --sidebar-item-hover: rgba(39, 224, 255, 0.1);
  --sidebar-item-active: var(--tech-primary);
}

.custom-sidebar .tech-sidebar-item {
  border-radius: 8px;
  margin: 4px 8px;
}

.custom-sidebar .tech-sidebar-item:hover {
  background: var(--sidebar-item-hover);
  box-shadow: 0 0 20px rgba(39, 224, 255, 0.3);
}
```

### 折叠动画定制

```css
.custom-sidebar {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-sidebar .tech-sidebar-item-text {
  transition: opacity 0.3s ease, width 0.3s ease;
}

.custom-sidebar.collapsed .tech-sidebar-item-text {
  opacity: 0;
  width: 0;
}
```

## 高级功能

### 权限控制

```tsx
function PermissionSidebar({ userPermissions }) {
  const allMenuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard', permission: 'dashboard.view' },
    { key: 'users', label: '用户管理', icon: 'users', permission: 'users.view' },
    { key: 'settings', label: '设置', icon: 'settings', permission: 'admin.settings' },
  ];

  // 根据权限过滤菜单项
  const filteredMenuItems = useMemo(() => {
    const filterByPermission = (items) => {
      return items.filter(item => {
        // 检查权限
        if (item.permission && !userPermissions.includes(item.permission)) {
          return false;
        }
        
        // 递归过滤子菜单
        if (item.children) {
          item.children = filterByPermission(item.children);
          return item.children.length > 0;
        }
        
        return true;
      });
    };

    return filterByPermission(allMenuItems);
  }, [userPermissions]);

  return <TechSidebar items={filteredMenuItems} />;
}
```

### 菜单搜索

```tsx
function SearchableSidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(allMenuItems);

  const searchMenuItems = useCallback((items, term) => {
    if (!term) return items;

    const searchInItems = (menuItems) => {
      return menuItems.reduce((acc, item) => {
        const matchesLabel = item.label.toLowerCase().includes(term.toLowerCase());
        
        if (matchesLabel) {
          acc.push(item);
        } else if (item.children) {
          const filteredChildren = searchInItems(item.children);
          if (filteredChildren.length > 0) {
            acc.push({
              ...item,
              children: filteredChildren
            });
          }
        }
        
        return acc;
      }, []);
    };

    return searchInItems(items);
  }, []);

  useEffect(() => {
    setFilteredItems(searchMenuItems(allMenuItems, searchTerm));
  }, [searchTerm, searchMenuItems]);

  return (
    <div>
      {/* 搜索框 */}
      <div style={{ padding: '16px' }}>
        <input
          type="text"
          placeholder="搜索菜单..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: 'var(--tech-panel-2)',
            border: '1px solid var(--tech-border)',
            borderRadius: '4px',
            color: 'var(--tech-text)',
          }}
        />
      </div>

      {/* 过滤后的菜单 */}
      <TechSidebar items={filteredItems} />
    </div>
  );
}
```

### 菜单收藏功能

```tsx
function FavoriteSidebar() {
  const [favorites, setFavorites] = useState(['dashboard', 'users']);

  const toggleFavorite = (key) => {
    setFavorites(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  // 在菜单项中添加收藏图标
  const menuItemsWithFavorites = useMemo(() => {
    const addFavoriteIcon = (items) => {
      return items.map(item => ({
        ...item,
        extra: (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(item.key);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: favorites.includes(item.key) ? '#ffa502' : '#7c89bf',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            ⭐
          </button>
        ),
        children: item.children ? addFavoriteIcon(item.children) : undefined,
      }));
    };

    return addFavoriteIcon(allMenuItems);
  }, [favorites]);

  return <TechSidebar items={menuItemsWithFavorites} />;
}
```

## 常见问题

### 1. 侧边栏位置不正确？

确保设置了正确的定位和z-index：

```tsx
<TechSidebar
  style={{
    position: 'fixed',  // 或 'absolute'
    left: 0,
    top: '56px',        // 顶部导航栏高度
    bottom: 0,
    zIndex: 100,
  }}
/>
```

### 2. 折叠动画不流畅？

检查CSS过渡属性：

```css
.tech-sidebar {
  transition: width 0.3s ease;
}
```

### 3. 移动端侧边栏遮挡内容？

添加响应式处理：

```tsx
const sidebarWidth = collapsed ? 0 : (isMobile ? 280 : 240);

<div style={{ 
  marginLeft: isMobile ? 0 : sidebarWidth,
  transition: 'margin-left 0.3s ease'
}}>
  {/* 主内容 */}
</div>
```

### 4. 路由切换后菜单状态丢失？

使用状态管理或本地存储：

```tsx
// 使用 localStorage 保持折叠状态
const [collapsed, setCollapsed] = useState(() => {
  return localStorage.getItem('sidebar-collapsed') === 'true';
});

useEffect(() => {
  localStorage.setItem('sidebar-collapsed', collapsed);
}, [collapsed]);
```