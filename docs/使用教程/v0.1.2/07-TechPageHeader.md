# TechPageHeader 页面头部组件

## 简介

`TechPageHeader` 是科技风格的页面头部组件，提供页面级别的头部区域，通常包含面包屑导航、页面标题、描述信息和操作按钮。

## 基础使用

### 最简单的页面头部

```tsx
import { TechPageHeader } from 'yggjs_rlayout/tech';

<TechPageHeader title="用户管理" />
```

### 带面包屑的页面头部

```tsx
<TechPageHeader
  breadcrumb="首页 / 用户管理 / 用户列表"
  title="用户列表"
/>
```

## 完整示例

```tsx
import { TechPageHeader, TechButton, TechCard } from 'yggjs_rlayout/tech';

function UserManagementPage() {
  const breadcrumbItems = [
    { key: 'home', label: '首页', href: '/' },
    { key: 'users', label: '用户管理', href: '/users' },
    { key: 'list', label: '用户列表' }, // 当前页面，无链接
  ];

  return (
    <div>
      {/* 页面头部 */}
      <TechPageHeader
        breadcrumb={breadcrumbItems}
        title="用户管理"
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <TechButton variant="ghost" icon="download">
              导出
            </TechButton>
            <TechButton variant="ghost" icon="refresh">
              刷新
            </TechButton>
            <TechButton variant="primary" icon="plus">
              新建用户
            </TechButton>
          </div>
        }
      />
      
      {/* 页面内容 */}
      <div style={{ marginTop: '24px' }}>
        <TechCard title="用户列表">
          <p>这里是用户列表内容...</p>
        </TechCard>
      </div>
    </div>
  );
}
```

## 多种使用方式

### 1. 简单字符串面包屑

```tsx
<TechPageHeader
  breadcrumb="系统管理 / 用户设置"
  title="用户权限配置"
  actions={
    <TechButton variant="primary">保存设置</TechButton>
  }
/>
```

### 2. 结构化面包屑

```tsx
function SettingsPage() {
  const breadcrumbs = [
    { key: 'dashboard', label: '仪表板', href: '/dashboard' },
    { key: 'system', label: '系统管理' },
    { key: 'settings', label: '系统设置' },
  ];

  return (
    <TechPageHeader
      breadcrumb={breadcrumbs}
      title="系统设置"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <TechButton variant="ghost">重置</TechButton>
          <TechButton variant="primary">保存</TechButton>
        </div>
      }
    />
  );
}
```

### 3. 带复杂操作区的头部

```tsx
function ProjectDetailPage() {
  const [status, setStatus] = useState('active');

  return (
    <TechPageHeader
      breadcrumb="项目管理 / 项目详情"
      title="科技风界面项目"
      actions={
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* 状态指示 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: status === 'active' ? '#27e0ff' : '#7c89bf'
            }} />
            <span style={{ fontSize: '14px', color: '#7c89bf' }}>
              {status === 'active' ? '进行中' : '已暂停'}
            </span>
          </div>
          
          {/* 操作按钮组 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <TechButton variant="ghost" icon="edit" size="small">
              编辑
            </TechButton>
            <TechButton variant="ghost" icon="share" size="small">
              分享
            </TechButton>
            <TechButton variant="primary" icon="play" size="small">
              {status === 'active' ? '暂停' : '启动'}
            </TechButton>
          </div>
        </div>
      }
    />
  );
}
```

### 4. 数据统计页面头部

```tsx
function DashboardHeader() {
  return (
    <TechPageHeader
      title="数据仪表板"
      actions={
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* 时间范围选择 */}
          <select style={{
            padding: '6px 12px',
            background: 'var(--tech-panel)',
            border: '1px solid var(--tech-border)',
            borderRadius: '4px',
            color: 'var(--tech-text)',
            fontSize: '14px'
          }}>
            <option>最近7天</option>
            <option>最近30天</option>
            <option>最近90天</option>
          </select>
          
          {/* 操作按钮 */}
          <TechButton variant="ghost" icon="refresh" iconOnly aria-label="刷新数据" />
          <TechButton variant="ghost" icon="settings" iconOnly aria-label="设置" />
        </div>
      }
    />
  );
}
```

## 属性详解

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 页面标题 |
| `actions` | `ReactNode` | - | 右侧操作区域内容 |

### 面包屑属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `breadcrumb` | `string \| TechBreadcrumbItem[]` | - | 面包屑导航，可以是字符串或结构化数据 |
| `breadcrumbProps` | `Omit<TechBreadcrumbProps, 'items'>` | - | 传递给面包屑组件的额外属性 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 面包屑数据格式

### 字符串格式
```tsx
breadcrumb="首页 / 用户管理 / 用户列表"
```

### 结构化格式
```tsx
const breadcrumbItems = [
  { key: 'home', label: '首页', href: '/' },          // 带链接
  { key: 'users', label: '用户管理', to: '/users' },  // SPA路由
  { key: 'list', label: '用户列表' },                 // 当前页面，无链接
];
```

## 与路由系统集成

### React Router 集成

```tsx
import { useLocation, Link } from 'react-router-dom';

function PageWithBreadcrumb() {
  const location = useLocation();
  
  // 根据当前路径生成面包屑
  const generateBreadcrumb = (pathname) => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { key: 'home', label: '首页', to: '/' }
    ];
    
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      
      breadcrumbs.push({
        key: path,
        label: getPageTitle(path), // 获取页面标题的函数
        ...(isLast ? {} : { to: currentPath })
      });
    });
    
    return breadcrumbs;
  };

  return (
    <TechPageHeader
      breadcrumb={generateBreadcrumb(location.pathname)}
      breadcrumbProps={{
        linkComponent: Link  // 使用 React Router 的 Link 组件
      }}
      title={getCurrentPageTitle()}
    />
  );
}
```

### Next.js 集成

```tsx
import { useRouter } from 'next/router';
import Link from 'next/link';

function NextPageHeader() {
  const router = useRouter();
  
  const breadcrumbs = [
    { key: 'home', label: '首页', href: '/' },
    // ... 基于 router.pathname 生成其他面包屑项
  ];

  return (
    <TechPageHeader
      breadcrumb={breadcrumbs}
      breadcrumbProps={{
        linkComponent: ({ to, children, ...props }) => (
          <Link href={to} {...props}>
            {children}
          </Link>
        )
      }}
      title="当前页面"
    />
  );
}
```

## 布局使用模式

### 1. 固定头部模式

```tsx
function PageLayout({ children }) {
  return (
    <div>
      {/* 固定的页面头部 */}
      <div style={{ 
        position: 'sticky', 
        top: '56px', // TechLayout header 的高度
        zIndex: 10,
        background: 'var(--tech-bg)',
        borderBottom: '1px solid var(--tech-border)'
      }}>
        <TechPageHeader
          breadcrumb="管理后台 / 当前页面"
          title="页面标题"
          actions={<TechButton variant="primary">操作</TechButton>}
        />
      </div>
      
      {/* 页面内容 */}
      <div style={{ padding: '24px 0' }}>
        {children}
      </div>
    </div>
  );
}
```

### 2. 响应式操作区

```tsx
function ResponsivePageHeader({ title, actions }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <TechPageHeader
      title={title}
      actions={
        isMobile ? (
          // 移动端：下拉菜单
          <select style={{
            padding: '6px',
            background: 'var(--tech-panel)',
            border: '1px solid var(--tech-border)',
            borderRadius: '4px',
            color: 'var(--tech-text)'
          }}>
            <option value="">选择操作</option>
            <option value="edit">编辑</option>
            <option value="delete">删除</option>
          </select>
        ) : (
          // 桌面端：按钮组
          <div style={{ display: 'flex', gap: '8px' }}>
            {actions}
          </div>
        )
      }
    />
  );
}
```

## 高级用法

### 1. 动态页面头部

```tsx
function DynamicPageHeader() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟获取页面数据
    fetchPageData().then(data => {
      setPageData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <TechPageHeader
        title="加载中..."
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ 
              width: '60px', 
              height: '32px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          </div>
        }
      />
    );
  }

  return (
    <TechPageHeader
      breadcrumb={pageData.breadcrumb}
      title={pageData.title}
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {pageData.actions?.map(action => (
            <TechButton
              key={action.key}
              variant={action.variant}
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </TechButton>
          ))}
        </div>
      }
    />
  );
}
```

### 2. 多标签页头部

```tsx
function TabbedPageHeader() {
  const [activeTab, setActiveTab] = useState('info');
  
  const tabs = [
    { key: 'info', label: '基本信息' },
    { key: 'settings', label: '设置' },
    { key: 'logs', label: '操作日志' },
  ];

  return (
    <div>
      <TechPageHeader
        breadcrumb="用户管理 / 用户详情"
        title="张三 (ID: 12345)"
        actions={
          <TechButton variant="primary" icon="edit">
            编辑用户
          </TechButton>
        }
      />
      
      {/* 标签栏 */}
      <div style={{ 
        marginTop: '16px',
        borderBottom: '1px solid var(--tech-border)',
        display: 'flex',
        gap: '24px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              color: activeTab === tab.key ? 'var(--tech-accent)' : 'var(--tech-text)',
              borderBottom: activeTab === tab.key ? '2px solid var(--tech-accent)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## 样式定制

### 自定义样式

```tsx
<TechPageHeader
  title="自定义样式页面"
  style={{
    background: 'linear-gradient(90deg, var(--tech-panel), transparent)',
    padding: '20px 24px',
    borderRadius: '8px'
  }}
  actions={<TechButton variant="primary">操作</TechButton>}
/>
```

### CSS类名定制

```css
.custom-page-header {
  background: var(--tech-panel-2);
  backdrop-filter: var(--tech-backdrop);
  border-radius: 8px;
  margin-bottom: 24px;
}

.custom-page-header h1 {
  background: linear-gradient(45deg, var(--tech-accent), var(--tech-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

```tsx
<TechPageHeader
  className="custom-page-header"
  title="渐变标题效果"
  actions={<TechButton variant="primary">操作</TechButton>}
/>
```

## 常见问题

### 1. 面包屑链接不工作？

确保正确配置了 `linkComponent` 属性：

```tsx
import { Link } from 'react-router-dom';

<TechPageHeader
  breadcrumb={breadcrumbItems}
  breadcrumbProps={{
    linkComponent: Link
  }}
/>
```

### 2. 如何隐藏面包屑？

不传入 `breadcrumb` 属性即可：

```tsx
<TechPageHeader
  title="页面标题"
  actions={<TechButton>操作</TechButton>}
/>
```

### 3. 标题过长如何处理？

可以通过CSS控制标题显示：

```css
.page-header-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
```

### 4. 如何实现头部吸顶效果？

```tsx
<div style={{
  position: 'sticky',
  top: '56px', // 主导航栏高度
  zIndex: 10,
  background: 'var(--tech-bg)',
  borderBottom: '1px solid var(--tech-border)'
}}>
  <TechPageHeader
    title="吸顶页面头部"
    actions={<TechButton>操作</TechButton>}
  />
</div>
```