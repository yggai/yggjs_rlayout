# yggjs_rlayout 科技风主题布局使用教程

## 项目介绍

YGG Admin 科技风主题是一个现代化的管理后台组件库，专为构建具有科技感的 Web 应用而设计。它提供了完整的布局解决方案，包括头部导航、侧边栏、面包屑、搜索、用户中心等功能，并支持 SPA（单页应用）导航。

### 核心特性

- **🎨 科技风设计**：渐变背景、发光效果、毛玻璃质感
- **🚀 完整布局方案**：TechLayout 提供一站式布局解决方案
- **📱 响应式设计**：适配桌面端和移动端
- **🔗 SPA 导航支持**：原生支持 react-router-dom
- **🎯 主题定制**：通过 CSS 变量轻松定制
- **💪 TypeScript 支持**：完整的类型定义

### 适用场景

- 管理后台系统
- 数据可视化平台
- 监控面板
- 企业内部系统
- 科技类产品展示

## 安装

### 环境要求

- Node.js >= 18
- React >= 18
- TypeScript >= 5 (推荐)

### 安装依赖

```bash
# 安装主要依赖
npm install yggjs_rlayout react-router-dom

# 或使用 pnpm
pnpm add yggjs_rlayout react-router-dom

# 或使用 yarn
yarn add yggjs_rlayout react-router-dom
```

### 开发依赖 (如果使用 TypeScript)

```bash
npm install -D @types/react @types/react-dom
```

## 科技风主题组件详细介绍

### 1. TechLayout - 主布局组件

`TechLayout` 是科技风主题的核心组件，提供完整的页面布局结构。

#### 主要功能
- 头部导航栏 (Header)
- 侧边栏菜单 (Sidebar)
- 面包屑导航 (Breadcrumb)
- 页面内容区域 (Content)
- 页脚 (Footer)
- 用户中心下拉菜单

#### 核心属性

```tsx
interface TechLayoutProps {
  // 基础配置
  children: React.ReactNode;
  brand?: React.ReactNode;           // 品牌名称/Logo
  version?: string;                  // 版本号

  // 头部菜单配置
  headerMenuItems?: TechMenuItem[];  // 头部菜单项
  selectedHeaderKey?: string;        // 选中的头部菜单
  onHeaderMenuSelect?: (key: string) => void;
  headerMenuLinkComponent?: LinkLikeComponent; // SPA 导航组件

  // 侧边栏配置
  sidebarItems: TechMenuItem[];      // 侧边栏菜单项 (必需)
  selectedSidebarKey?: string;       // 选中的侧边栏菜单
  onSidebarSelect?: (key: string) => void;
  sidebarLinkComponent?: LinkLikeComponent; // SPA 导航组件

  // 搜索功能
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;

  // 页面头部
  title?: string;                    // 页面标题
  breadcrumb?: TechBreadcrumbItem[]; // 面包屑导航
  pageActions?: React.ReactNode;     // 页面操作按钮

  // 用户中心
  headerExtra?: React.ReactNode;     // 头部额外内容(通常是用户中心)

  // 页脚配置
  footerProps?: TechFooterProps;
  showFooter?: boolean;
}
```

### 2. TechCard - 科技风卡片组件

用于展示内容的卡片容器，支持多种视觉效果。

#### 变体类型
- `default` - 默认样式
- `glass` - 毛玻璃效果
- `gradient` - 渐变背景
- `filled` - 填充背景
- `outlined` - 边框样式

#### 使用示例

```tsx
<TechCard
  title="卡片标题"
  subtitle="卡片副标题"
  icon="dashboard"
  variant="glass"
  hoverable
  actions={
    <>
      <TechButton variant="ghost" size="small">取消</TechButton>
      <TechButton variant="primary" size="small">确认</TechButton>
    </>
  }
>
  卡片内容
</TechCard>
```

### 3. TechButton - 科技风按钮组件

提供多种样式的按钮组件。

#### 变体类型
- `primary` - 主要按钮
- `secondary` - 次要按钮
- `ghost` - 幽灵按钮

#### 尺寸
- `small` - 小尺寸
- `medium` - 中等尺寸 (默认)
- `large` - 大尺寸

#### 使用示例

```tsx
<TechButton variant="primary" icon="deploy" size="large">
  部署应用
</TechButton>

<TechButton variant="ghost" icon="settings" iconOnly />
```

### 4. TechUserCenter - 用户中心组件

提供用户头像、信息展示和下拉菜单功能。

#### 使用示例

```tsx
const userCenterItems = [
  {
    key: 'profile',
    label: '个人资料',
    icon: 'profile',
    onClick: () => navigate('/profile'),
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: 'logout',
    danger: true,
    onClick: handleLogout,
  },
];

<TechUserCenter
  username="张三"
  userInfo="zhangsan@example.com"
  items={userCenterItems}
  showUsername={false}
/>
```

### 5. TechBreadcrumb - 面包屑导航

提供页面路径导航功能。

#### 使用示例

```tsx
import { createBreadcrumb } from 'yggjs_rlayout';

const breadcrumbItems = createBreadcrumb()
  .add('Dashboard', '/')
  .add('用户管理', '/users')
  .add('用户详情')
  .build();

// 在 TechLayout 中使用
<TechLayout breadcrumb={breadcrumbItems} />
```

### 6. 其他组件

- **TechIcon** - 图标组件，支持多种内置图标
- **TechSearch** - 搜索组件
- **TechFooter** - 页脚组件
- **TechThemeProvider** - 主题提供者
- **TechGlobalStyles** - 全局样式组件

## 科技风主题项目构建步骤

### 步骤 1: 创建项目结构

```bash
my-tech-admin/
├── src/
│   ├── components/          # 自定义组件
│   ├── pages/              # 页面组件
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   ├── layouts/            # 布局组件
│   │   └── MainLayout.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

### 步骤 2: 配置路由

创建 `src/main.tsx`：

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 步骤 3: 创建主布局

创建 `src/layouts/MainLayout.tsx`：

```tsx
import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import {
  TechLayout,
  TechUserCenter,
  createBreadcrumb,
  type TechMenuItem,
  type TechUserCenterItem
} from 'yggjs_rlayout';

// Link 适配器组件
const LinkAdapter: React.FC<{
  to: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ to, className, children }) => {
  return <Link to={to} className={className}>{children}</Link>;
};

export default function MainLayout() {
  const location = useLocation();

  // 头部菜单配置
  const headerMenuItems: TechMenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', to: '/' },
    { key: 'users', label: 'Users', icon: 'user', to: '/users' },
    { key: 'settings', label: 'Settings', icon: 'settings', to: '/settings' },
  ];

  // 侧边栏菜单配置
  const sidebarItems: TechMenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', to: '/' },
    { key: 'users', label: 'User Management', icon: 'user', to: '/users' },
    { key: 'settings', label: 'System Settings', icon: 'settings', to: '/settings' },
  ];

  // 用户中心菜单
  const userCenterItems: TechUserCenterItem[] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: 'profile',
      onClick: () => console.log('跳转到个人资料'),
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: 'logout',
      danger: true,
      onClick: () => console.log('退出登录'),
    },
  ];

  // 根据路径确定选中菜单
  const selectedKey = location.pathname.startsWith('/users') ? 'users'
    : location.pathname.startsWith('/settings') ? 'settings' : 'dashboard';

  // 搜索处理
  const handleSearch = (value: string) => {
    console.log('搜索:', value);
  };

  // 面包屑导航
  const breadcrumbItems = createBreadcrumb()
    .add('Dashboard', '/')
    .add(selectedKey === 'users' ? '用户管理' : 
         selectedKey === 'settings' ? '系统设置' : 'Dashboard')
    .build();

  return (
    <TechLayout
      brand="My Tech Admin"
      version="v1.0.0"
      
      // 头部配置
      headerMenuItems={headerMenuItems}
      selectedHeaderKey={selectedKey}
      headerMenuLinkComponent={LinkAdapter}
      onSearch={handleSearch}
      headerExtra={
        <TechUserCenter
          username="管理员"
          userInfo="admin@example.com"
          items={userCenterItems}
        />
      }

      // 侧边栏配置
      sidebarItems={sidebarItems}
      selectedSidebarKey={selectedKey}
      sidebarLinkComponent={LinkAdapter}

      // 页面配置
      breadcrumb={breadcrumbItems}
      title="管理后台"
    >
      <Outlet />
    </TechLayout>
  );
}
```

### 步骤 4: 创建页面组件

#### Dashboard 页面

创建 `src/pages/Dashboard.tsx`：

```tsx
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--tech-accent)'
                }}>1,234</div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--tech-text-muted)'
                }}>总用户数</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--tech-accent)'
                }}>567</div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--tech-text-muted)'
                }}>活跃用户</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--tech-accent)'
                }}>89%</div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--tech-text-muted)'
                }}>系统负载</div>
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
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '16px 0'
          }}>
            <TechButton variant="secondary" size="small" icon="user">
              用户管理
            </TechButton>
            <TechButton variant="secondary" size="small" icon="settings">
              系统设置
            </TechButton>
            <TechButton variant="secondary" size="small" icon="api">
              API 配置
            </TechButton>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
```

#### Users 页面

创建 `src/pages/Users.tsx`：

```tsx
import React from 'react';
import { TechCard, TechButton } from 'yggjs_rlayout';

export default function Users() {
  return (
    <div>
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        用户管理
      </h1>

      <div className="tech-cards">
        <TechCard
          title="用户列表"
          subtitle="系统用户信息管理"
          icon="user"
          variant="outlined"
          hoverable
          actions={
            <TechButton variant="primary" size="small" icon="user">
              新增用户
            </TechButton>
          }
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{
              color: 'var(--tech-text-muted)',
              margin: 0,
              fontSize: '14px'
            }}>
              这里可以展示用户列表、用户信息编辑、权限管理等功能。
            </p>
          </div>
        </TechCard>

        <TechCard
          title="权限管理"
          subtitle="用户角色和权限配置"
          icon="settings"
          variant="glass"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{
              color: 'var(--tech-text-muted)',
              margin: 0,
              fontSize: '14px'
            }}>
              配置用户角色、权限分配、访问控制等功能。
            </p>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
```

#### Settings 页面

创建 `src/pages/Settings.tsx`：

```tsx
import React from 'react';
import { TechCard, TechButton } from 'yggjs_rlayout';

export default function Settings() {
  return (
    <div>
      <h1 style={{ color: 'var(--tech-text)', marginBottom: '24px' }}>
        系统设置
      </h1>

      <div className="tech-cards">
        <TechCard
          title="基础配置"
          subtitle="系统基本参数设置"
          icon="settings"
          variant="filled"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{
              color: 'var(--tech-text-muted)',
              margin: 0,
              fontSize: '14px'
            }}>
              系统名称、Logo、主题色彩、语言等基础配置。
            </p>
          </div>
        </TechCard>

        <TechCard
          title="安全设置"
          subtitle="系统安全相关配置"
          icon="api"
          variant="gradient"
          hoverable
        >
          <div style={{ padding: '16px 0' }}>
            <p style={{
              color: 'var(--tech-text-muted)',
              margin: 0,
              fontSize: '14px'
            }}>
              密码策略、登录限制、API 安全等配置。
            </p>
          </div>
        </TechCard>
      </div>
    </div>
  );
}
```

### 步骤 5: 添加全局样式

创建 `src/styles/global.css`：

```css
/* 科技风主题全局样式 */
.tech-cards {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-bottom: 32px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tech-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: var(--tech-accent);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--tech-accent-hover);
}
```

在 `src/main.tsx` 中引入样式：

```tsx
import './styles/global.css';
```

## 代码解释

### 1. Link 适配器的作用

```tsx
const LinkAdapter: React.FC<{
  to: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ to, className, children }) => {
  return <Link to={to} className={className}>{children}</Link>;
};
```

**为什么需要适配器？**
- react-router-dom 的 Link 组件类型与 YGG Admin 的 LinkLikeComponent 接口略有差异
- 适配器确保类型兼容性，避免 TypeScript 错误
- 提供统一的接口，便于后续扩展（如添加埋点、权限检查等）

### 2. 菜单配置的最佳实践

```tsx
const menuItems: TechMenuItem[] = [
  {
    key: 'dashboard',        // 唯一标识符
    label: 'Dashboard',      // 显示文本
    icon: 'dashboard',       // 图标名称
    to: '/'                  // SPA 路由路径
  },
  // ...更多菜单项
];
```

**配置要点：**
- `key` 必须唯一，用于菜单选中状态管理
- `to` 属性用于 SPA 导航，`href` 用于传统页面跳转
- `icon` 支持内置图标名称，参考 TechIcon 组件文档
- 支持嵌套菜单结构（children 属性）

### 3. 选中状态管理

```tsx
const selectedKey = location.pathname.startsWith('/users') ? 'users'
  : location.pathname.startsWith('/settings') ? 'settings' : 'dashboard';
```

**实现原理：**
- 使用 `useLocation` Hook 获取当前路径
- 根据路径前缀匹配对应的菜单 key
- 自动高亮当前页面对应的菜单项
- 支持多级路由的匹配逻辑

### 4. CSS 变量系统

科技风主题使用 CSS 变量进行样式管理：

```css
:root {
  --tech-primary: #1a1a2e;           /* 主色调 */
  --tech-secondary: #16213e;         /* 次要色调 */
  --tech-accent: #5aa2ff;            /* 强调色 */
  --tech-accent-hover: #4a8ce8;      /* 强调色悬停 */
  --tech-text: #ffffff;              /* 主文本色 */
  --tech-text-muted: #a0a0a0;        /* 次要文本色 */
  --tech-border: rgba(255,255,255,0.1); /* 边框色 */
  --tech-bg-glass: rgba(255,255,255,0.05); /* 毛玻璃背景 */
}
```

**自定义主题：**
- 重写 CSS 变量值即可改变整体主题色彩
- 支持动态主题切换
- 保持组件间样式一致性

### 5. 响应式设计

```css
.tech-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .tech-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

**响应式策略：**
- 使用 CSS Grid 实现自适应布局
- 移动端优先的设计理念
- 断点设置符合主流设备尺寸

## 高级功能

### 1. 主题定制

创建自定义主题文件 `src/styles/custom-theme.css`：

```css
:root {
  /* 自定义科技风配色 */
  --tech-primary: #0f0f23;
  --tech-secondary: #1a1a3a;
  --tech-accent: #00d4ff;
  --tech-accent-hover: #00b8e6;

  /* 自定义渐变 */
  --tech-gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --tech-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### 2. 权限控制

```tsx
// 菜单权限过滤
const filterMenuByPermission = (items: TechMenuItem[], permissions: string[]) => {
  return items.filter(item => {
    if (item.permission && !permissions.includes(item.permission)) {
      return false;
    }
    if (item.children) {
      item.children = filterMenuByPermission(item.children, permissions);
    }
    return true;
  });
};

// 使用示例
const userPermissions = ['dashboard', 'users.read', 'settings.write'];
const filteredMenuItems = filterMenuByPermission(menuItems, userPermissions);
```

### 3. 国际化支持

```tsx
import { useTranslation } from 'react-i18next';

function MainLayout() {
  const { t } = useTranslation();

  const menuItems: TechMenuItem[] = [
    { key: 'dashboard', label: t('menu.dashboard'), icon: 'dashboard', to: '/' },
    { key: 'users', label: t('menu.users'), icon: 'user', to: '/users' },
  ];

  // ...
}
```

### 4. 数据持久化

```tsx
// 保存侧边栏折叠状态
const [collapsed, setCollapsed] = useState(() => {
  return localStorage.getItem('sidebar-collapsed') === 'true';
});

useEffect(() => {
  localStorage.setItem('sidebar-collapsed', collapsed.toString());
}, [collapsed]);
```

## 部署和优化

### 1. 构建优化

在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['yggjs_rlayout'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
});
```

### 2. 性能优化

```tsx
// 懒加载页面组件
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));

// 使用 Suspense 包装
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
</Suspense>
```

## 总结

通过本教程，您已经学会了如何使用 YGG Admin 科技风主题构建一个完整的后台管理系统。

### 关键要点回顾

1. **项目结构**：合理的目录组织，分离布局、页面和组件
2. **路由配置**：使用 react-router-dom 实现 SPA 导航
3. **组件使用**：掌握 TechLayout、TechCard、TechButton 等核心组件
4. **主题定制**：通过 CSS 变量实现个性化主题
5. **响应式设计**：适配不同设备尺寸的用户体验
6. **最佳实践**：代码组织、性能优化、权限控制等

### 下一步建议

1. **深入学习**：阅读各个组件的详细 API 文档
2. **实践项目**：在实际项目中应用所学知识
3. **社区参与**：关注项目更新，提交 Issue 和建议
4. **扩展功能**：基于现有组件开发自定义功能

### 常见问题

**Q: 如何自定义图标？**
A: 可以通过 TechIcon 组件的 `custom` 属性传入自定义图标，或者扩展内置图标库。

**Q: 支持暗色主题吗？**
A: 科技风主题本身就是暗色设计，可以通过 CSS 变量调整为其他色彩方案。

**Q: 如何处理大量菜单项？**
A: 支持多级嵌套菜单，可以通过 `children` 属性构建树形结构。

**Q: 移动端体验如何？**
A: 内置响应式设计，自动适配移动端，侧边栏会转换为抽屉式导航。

### 技术支持

- 📖 [完整文档](../../../README.md)
- 🚀 [在线演示](../../example/)
- 💬 [Issue 反馈](https://github.com/your-repo/issues)
- 📧 [联系作者](mailto:1156956636@qq.com)

---

**恭喜！** 您现在已经掌握了 YGG Admin 科技风主题的完整使用方法。开始构建您的科技感管理后台吧！
```
