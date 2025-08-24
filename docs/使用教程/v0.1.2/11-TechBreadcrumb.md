# TechBreadcrumb 面包屑导航组件

## 简介

`TechBreadcrumb` 是科技风格的面包屑导航组件，用于显示用户当前页面在网站层次结构中的位置。支持图标显示、省略显示、多种视觉风格，并提供便捷的构建器功能。

## 基础使用

### 最简单的面包屑

```tsx
import { TechBreadcrumb } from 'yggjs_rlayout/tech';

const breadcrumbItems = [
  { key: 'home', label: '首页' },
  { key: 'users', label: '用户管理' },
  { key: 'list', label: '用户列表' },
];

<TechBreadcrumb items={breadcrumbItems} />
```

### 带图标的面包屑

```tsx
const breadcrumbItems = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'users', label: '用户管理', icon: 'users' },
  { key: 'list', label: '用户列表', icon: 'list' },
];

<TechBreadcrumb items={breadcrumbItems} variant="icon" />
```

## 完整示例

```tsx
import { TechBreadcrumb, TechCard, TechButton } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function BreadcrumbDemo() {
  const [currentPath, setCurrentPath] = useState(['home', 'users', 'list']);

  // 模拟页面路径数据
  const pathData = {
    home: { label: '首页', icon: 'home' },
    users: { label: '用户管理', icon: 'users' },
    content: { label: '内容管理', icon: 'file' },
    list: { label: '列表页面', icon: 'list' },
    detail: { label: '详情页面', icon: 'info' },
    edit: { label: '编辑页面', icon: 'edit' },
    settings: { label: '设置页面', icon: 'settings' },
    analytics: { label: '数据分析', icon: 'chart' },
    reports: { label: '报表中心', icon: 'document' },
    dashboard: { label: '仪表板', icon: 'dashboard' },
  };

  // 根据当前路径生成面包屑数据
  const generateBreadcrumbs = (path) => {
    return path.map(key => ({
      key,
      label: pathData[key]?.label || key,
      icon: pathData[key]?.icon,
      onClick: () => navigateToPath(path.slice(0, path.indexOf(key) + 1))
    }));
  };

  const navigateToPath = (newPath) => {
    setCurrentPath(newPath);
    console.log('导航到:', newPath.join('/'));
  };

  const addPathLevel = (key) => {
    if (!currentPath.includes(key)) {
      setCurrentPath([...currentPath, key]);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* 基础样式面包屑 */}
      <TechCard title="基础样式">
        <div style={{ marginBottom: '16px' }}>
          <TechBreadcrumb 
            items={generateBreadcrumbs(currentPath)}
            variant="simple"
          />
        </div>
        <p style={{ color: '#7c89bf', fontSize: '14px' }}>
          当前路径: {currentPath.join(' / ')}
        </p>
      </TechCard>

      {/* 图标样式面包屑 */}
      <TechCard title="图标样式">
        <div style={{ marginBottom: '16px' }}>
          <TechBreadcrumb 
            items={generateBreadcrumbs(currentPath)}
            variant="icon"
          />
        </div>
        <p style={{ color: '#7c89bf', fontSize: '14px' }}>
          包含图标的面包屑导航
        </p>
      </TechCard>

      {/* 带首页图标 */}
      <TechCard title="带首页图标">
        <div style={{ marginBottom: '16px' }}>
          <TechBreadcrumb 
            items={generateBreadcrumbs(currentPath.slice(1))} // 去掉home，用showHome替代
            showHome={true}
            homeIcon="home"
            onHomeClick={() => navigateToPath(['home'])}
          />
        </div>
        <p style={{ color: '#7c89bf', fontSize: '14px' }}>
          首页图标 + 路径面包屑
        </p>
      </TechCard>

      {/* 限制显示项数 */}
      <TechCard title="限制显示项数">
        <div style={{ marginBottom: '16px' }}>
          <TechBreadcrumb 
            items={generateBreadcrumbs([...currentPath, 'detail', 'edit'])}
            maxItems={4}
            variant="icon"
          />
        </div>
        <p style={{ color: '#7c89bf', fontSize: '14px' }}>
          超过4项时显示省略号
        </p>
      </TechCard>

      {/* 操作按钮 */}
      <TechCard title="路径操作" style={{ gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <TechButton size="small" onClick={() => navigateToPath(['home'])}>
            重置到首页
          </TechButton>
          <TechButton size="small" variant="ghost" onClick={() => addPathLevel('content')}>
            添加内容管理
          </TechButton>
          <TechButton size="small" variant="ghost" onClick={() => addPathLevel('detail')}>
            进入详情页
          </TechButton>
          <TechButton size="small" variant="ghost" onClick={() => addPathLevel('edit')}>
            进入编辑页
          </TechButton>
          <TechButton size="small" variant="ghost" onClick={() => addPathLevel('settings')}>
            添加设置页
          </TechButton>
        </div>

        {/* 当前完整路径显示 */}
        <div style={{ 
          padding: '12px', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          borderRadius: '4px',
          marginTop: '16px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#27e0ff' }}>当前面包屑:</h4>
          <TechBreadcrumb 
            items={generateBreadcrumbs(currentPath)}
            showHome={true}
            variant="icon"
            maxItems={6}
            onHomeClick={() => navigateToPath(['home'])}
          />
        </div>
      </TechCard>
    </div>
  );
}
```

## 属性详解

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TechBreadcrumbItem[]` | **必填** | 面包屑项目数据 |
| `variant` | `'simple' \| 'icon'` | `'simple'` | 视觉风格变体 |
| `separator` | `ReactNode` | `'/'` (simple) / `>` (icon) | 分隔符 |

### 显示控制

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `maxItems` | `number` | - | 最大显示项数，超出显示省略号 |
| `showHome` | `boolean` | `false` | 是否显示首页图标 |
| `homeIcon` | `TechIconName` | `'home'` | 首页图标名称 |

### 交互属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onHomeClick` | `() => void` | - | 首页图标点击回调 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 面包屑项数据格式

### 基础项目

```tsx
const breadcrumbItem: TechBreadcrumbItem = {
  key: 'unique-key',        // 唯一标识，必填
  label: '页面标题',         // 显示文本，必填
  icon: 'dashboard',        // 图标名称，可选
  href: '/path/to/page',    // 链接地址，可选
  onClick: () => {},        // 点击回调，可选
};
```

### 带图标的项目

```tsx
const iconBreadcrumbItems = [
  { key: 'home', label: '首页', icon: 'home', href: '/' },
  { key: 'users', label: '用户管理', icon: 'users', href: '/users' },
  { key: 'profile', label: '个人资料', icon: 'user' }, // 当前页面，无href
];
```

### 带点击事件的项目

```tsx
const clickableBreadcrumbs = [
  { 
    key: 'dashboard', 
    label: '仪表板', 
    icon: 'dashboard',
    onClick: () => navigate('/dashboard')
  },
  { 
    key: 'settings', 
    label: '设置',
    icon: 'settings',
    onClick: () => navigate('/settings')
  },
];
```

## 路由系统集成

### React Router 集成

```tsx
import { useLocation, useNavigate } from 'react-router-dom';

function RouterBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  // 路径映射配置
  const routeConfig = {
    '': { label: '首页', icon: 'home' },
    'dashboard': { label: '仪表板', icon: 'dashboard' },
    'users': { label: '用户管理', icon: 'users' },
    'settings': { label: '系统设置', icon: 'settings' },
    'profile': { label: '个人资料', icon: 'user' },
  };

  // 根据当前路径生成面包屑
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    
    return paths.map((path, index) => {
      const fullPath = '/' + paths.slice(0, index + 1).join('/');
      const config = routeConfig[path] || { label: path };
      const isLast = index === paths.length - 1;

      return {
        key: path,
        label: config.label,
        icon: config.icon,
        ...(isLast ? {} : { onClick: () => navigate(fullPath) })
      };
    });
  };

  return (
    <TechBreadcrumb
      items={generateBreadcrumbs()}
      showHome={true}
      onHomeClick={() => navigate('/')}
      variant="icon"
    />
  );
}
```

### Next.js 集成

```tsx
import { useRouter } from 'next/router';

function NextBreadcrumb() {
  const router = useRouter();
  const paths = router.asPath.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const fullPath = '/' + paths.slice(0, index + 1).join('/');
    const isLast = index === paths.length - 1;

    return {
      key: path,
      label: getPageTitle(path), // 自定义获取页面标题的函数
      icon: getPageIcon(path),   // 自定义获取页面图标的函数
      ...(isLast ? {} : { onClick: () => router.push(fullPath) })
    };
  });

  return (
    <TechBreadcrumb
      items={breadcrumbs}
      showHome={true}
      onHomeClick={() => router.push('/')}
    />
  );
}
```

## 便捷构建器

### 使用 TechBreadcrumbBuilder

```tsx
import { TechBreadcrumbBuilder, createBreadcrumb } from 'yggjs_rlayout/tech';

function BuilderExample() {
  // 使用构建器模式
  const breadcrumbWithBuilder = new TechBreadcrumbBuilder()
    .addHome('/', '首页')
    .addItem('users', '用户管理', 'users', '/users')
    .addItem('profile', '个人资料', 'user')
    .setMaxItems(5)
    .setVariant('icon')
    .build();

  // 使用便捷函数
  const breadcrumbWithFunction = createBreadcrumb([
    { key: 'home', label: '首页', icon: 'home', href: '/' },
    { key: 'settings', label: '设置', icon: 'settings', href: '/settings' },
    { key: 'profile', label: '个人资料', icon: 'user' },
  ], {
    variant: 'icon',
    showHome: false, // 第一项已经是首页
    maxItems: 4
  });

  return (
    <div>
      <h3>使用构建器创建:</h3>
      {breadcrumbWithBuilder}
      
      <h3>使用便捷函数创建:</h3>
      {breadcrumbWithFunction}
    </div>
  );
}
```

## 常见使用场景

### 1. 页面头部面包屑

```tsx
function PageHeaderBreadcrumb({ currentPage }) {
  const breadcrumbs = [
    { key: 'home', label: '首页', icon: 'home', href: '/' },
    { key: 'dashboard', label: '管理后台', icon: 'dashboard', href: '/dashboard' },
    { key: 'current', label: currentPage.title, icon: currentPage.icon },
  ];

  return (
    <div style={{ 
      padding: '16px 0', 
      borderBottom: '1px solid var(--tech-border)' 
    }}>
      <TechBreadcrumb 
        items={breadcrumbs}
        variant="icon"
      />
    </div>
  );
}
```

### 2. 文件系统导航

```tsx
function FileSystemBreadcrumb({ currentPath }) {
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const fullPath = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;

    return {
      key: fullPath,
      label: segment,
      icon: isLast ? 'file' : 'folder',
      ...(isLast ? {} : { onClick: () => navigateToFolder(fullPath) })
    };
  });

  return (
    <TechBreadcrumb
      items={breadcrumbs}
      showHome={true}
      homeIcon="folder"
      onHomeClick={() => navigateToFolder('/')}
      maxItems={6}
    />
  );
}
```

### 3. 电商网站分类导航

```tsx
function CategoryBreadcrumb({ category }) {
  const buildCategoryPath = (cat) => {
    const path = [];
    let current = cat;
    
    while (current) {
      path.unshift({
        key: current.id,
        label: current.name,
        icon: current.icon || 'tag',
        onClick: () => navigateToCategory(current.id)
      });
      current = current.parent;
    }
    
    return path;
  };

  const breadcrumbs = buildCategoryPath(category);
  
  // 最后一项是当前分类，移除点击事件
  if (breadcrumbs.length > 0) {
    delete breadcrumbs[breadcrumbs.length - 1].onClick;
  }

  return (
    <TechBreadcrumb
      items={breadcrumbs}
      showHome={true}
      onHomeClick={() => navigateToHome()}
      variant="icon"
      separator=" > "
    />
  );
}
```

## 样式定制

### 自定义分隔符样式

```tsx
<TechBreadcrumb
  items={breadcrumbs}
  separator={
    <span style={{ 
      color: 'var(--tech-accent)', 
      margin: '0 8px',
      fontSize: '12px'
    }}>
      →
    </span>
  }
/>
```

### 自定义项目样式

```css
.custom-breadcrumb .tech-breadcrumb-item {
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.custom-breadcrumb .tech-breadcrumb-item:hover {
  background: rgba(39, 224, 255, 0.1);
  color: var(--tech-accent);
}

.custom-breadcrumb .tech-breadcrumb-item:last-child {
  color: var(--tech-accent);
  font-weight: 500;
}
```

### 响应式面包屑

```tsx
function ResponsiveBreadcrumb({ items }) {
  const [maxItems, setMaxItems] = useState(5);

  useEffect(() => {
    const updateMaxItems = () => {
      if (window.innerWidth < 768) {
        setMaxItems(2); // 移动端只显示2项
      } else if (window.innerWidth < 1024) {
        setMaxItems(3); // 平板显示3项
      } else {
        setMaxItems(5); // 桌面显示5项
      }
    };

    updateMaxItems();
    window.addEventListener('resize', updateMaxItems);
    return () => window.removeEventListener('resize', updateMaxItems);
  }, []);

  return (
    <TechBreadcrumb
      items={items}
      maxItems={maxItems}
      variant="icon"
    />
  );
}
```

## 常见问题

### 1. 面包屑项目点击没有反应？

确保设置了正确的点击回调：

```tsx
const breadcrumbs = [
  { 
    key: 'home', 
    label: '首页',
    onClick: () => navigate('/') // 添加点击回调
  }
];
```

### 2. 如何处理很长的路径？

使用 `maxItems` 属性：

```tsx
<TechBreadcrumb
  items={longBreadcrumbs}
  maxItems={4}  // 超过4项会显示省略号
/>
```

### 3. 如何自定义省略号样式？

省略号会自动生成，可以通过CSS定制：

```css
.tech-breadcrumb-item[data-ellipsis="true"] {
  color: var(--tech-muted);
  cursor: default;
}
```

### 4. 移动端面包屑太长怎么办？

使用响应式设计：

```tsx
const [isMobile, setIsMobile] = useState(false);

// 移动端使用较少的显示项数
<TechBreadcrumb
  items={breadcrumbs}
  maxItems={isMobile ? 2 : 5}
  variant={isMobile ? 'simple' : 'icon'}
/>
```