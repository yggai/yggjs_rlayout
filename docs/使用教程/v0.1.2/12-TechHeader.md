# TechHeader 顶部导航组件

## 简介

`TechHeader` 是科技风格的顶部导航栏组件，提供应用级的头部导航功能，包含品牌logo、水平菜单、搜索框、侧边栏切换按钮和操作按钮区域。具有响应式设计和科技感的视觉效果。

## 基础使用

### 最简单的头部导航

```tsx
import { TechHeader } from 'yggjs_rlayout/tech';

<TechHeader brand="我的应用" />
```

### 带菜单的头部导航

```tsx
const menuItems = [
  { key: 'home', label: '首页' },
  { key: 'products', label: '产品' },
  { key: 'about', label: '关于' },
];

<TechHeader
  brand="我的应用"
  menuItems={menuItems}
  selectedMenuKey="home"
  onMenuSelect={(key) => console.log('选中菜单:', key)}
/>
```

## 完整示例

```tsx
import { TechHeader, TechButton, TechCard } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function HeaderDemo() {
  const [selectedKey, setSelectedKey] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 顶部菜单数据
  const menuItems = [
    { key: 'home', label: '首页', to: '/' },
    { key: 'products', label: '产品中心', to: '/products' },
    { key: 'solutions', label: '解决方案', to: '/solutions' },
    { key: 'support', label: '技术支持', to: '/support' },
    { key: 'about', label: '关于我们', to: '/about' },
  ];

  const handleSearch = (searchValue) => {
    console.log('搜索内容:', searchValue);
    // 处理搜索逻辑
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    console.log('侧边栏状态:', !sidebarCollapsed ? '折叠' : '展开');
  };

  return (
    <div>
      {/* 基础头部 */}
      <TechCard title="基础头部导航">
        <div style={{ margin: '-16px', marginBottom: '16px' }}>
          <TechHeader
            brand="科技应用"
            version="v1.2.0"
          />
        </div>
        <p style={{ color: '#7c89bf', fontSize: '14px' }}>
          最简单的头部导航，只包含品牌信息
        </p>
      </TechCard>

      {/* 完整功能头部 */}
      <TechCard title="完整功能头部" style={{ marginTop: '20px' }}>
        <div style={{ margin: '-16px', marginBottom: '16px' }}>
          <TechHeader
            brand={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(45deg, var(--tech-primary), var(--tech-accent))',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  T
                </div>
                <span style={{ fontSize: '18px', fontWeight: '500' }}>
                  科技管理平台
                </span>
              </div>
            }
            version="v2.1.0"
            menuItems={menuItems}
            selectedMenuKey={selectedKey}
            onMenuSelect={setSelectedKey}
            onToggleSidebar={handleToggleSidebar}
            onSearch={handleSearch}
            searchPlaceholder="搜索功能、内容或用户..."
            actions={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* 通知按钮 */}
                <TechButton 
                  variant="ghost" 
                  icon="bell" 
                  iconOnly 
                  aria-label="通知"
                  style={{ position: 'relative' }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '6px',
                    height: '6px',
                    background: '#ff4757',
                    borderRadius: '50%'
                  }} />
                </TechButton>

                {/* 用户菜单 */}
                <TechButton variant="ghost" icon="user">
                  管理员
                </TechButton>
              </div>
            }
            extra={
              <div style={{ 
                fontSize: '12px', 
                color: '#7c89bf',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🟢</span>
                <span>系统正常</span>
              </div>
            }
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p><strong>当前选中菜单:</strong> {selectedKey}</p>
            <p><strong>侧边栏状态:</strong> {sidebarCollapsed ? '已折叠' : '已展开'}</p>
          </div>
          <div>
            <p><strong>功能特点:</strong></p>
            <ul style={{ color: '#7c89bf', fontSize: '14px' }}>
              <li>响应式设计</li>
              <li>科技风视觉效果</li>
              <li>集成搜索功能</li>
              <li>灵活的操作区域</li>
            </ul>
          </div>
        </div>
      </TechCard>

      {/* 不同配置示例 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* 简洁版本 */}
        <TechCard title="简洁版本">
          <div style={{ margin: '-16px', marginBottom: '16px' }}>
            <TechHeader
              brand="简洁应用"
              actions={
                <TechButton variant="primary" size="small">
                  登录
                </TechButton>
              }
            />
          </div>
          <p style={{ color: '#7c89bf', fontSize: '14px' }}>
            适用于官网或营销页面
          </p>
        </TechCard>

        {/* 工具栏版本 */}
        <TechCard title="工具栏版本">
          <div style={{ margin: '-16px', marginBottom: '16px' }}>
            <TechHeader
              brand="开发工具"
              onToggleSidebar={handleToggleSidebar}
              actions={
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TechButton variant="toggle" icon="play" iconOnly aria-label="运行" />
                  <TechButton variant="toggle" icon="pause" iconOnly aria-label="暂停" />
                  <TechButton variant="toggle" icon="stop" iconOnly aria-label="停止" />
                  <TechButton variant="toggle" icon="refresh" iconOnly aria-label="刷新" />
                </div>
              }
            />
          </div>
          <p style={{ color: '#7c89bf', fontSize: '14px' }}>
            适用于开发工具或编辑器
          </p>
        </TechCard>
      </div>
    </div>
  );
}
```

## 属性详解

### 品牌属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `brand` | `ReactNode` | `'YGG Admin'` | 品牌信息，显示在左上角 |
| `version` | `string` | - | 版本号，显示在品牌旁边 |

### 菜单属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `menuItems` | `TechMenuItem[]` | `[]` | 顶部水平菜单项 |
| `selectedMenuKey` | `string` | - | 当前选中的菜单key |
| `onMenuSelect` | `(key: string) => void` | - | 菜单选中回调 |
| `onMenuSelectItem` | `(item: TechMenuItem) => void` | - | 菜单选中回调（传入完整项数据） |
| `menuLinkComponent` | `LinkLikeComponent` | - | 自定义菜单链接组件 |

### 功能属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onToggleSidebar` | `() => void` | - | 侧边栏切换回调，显示切换按钮 |
| `onSearch` | `(value: string) => void` | - | 搜索回调，显示搜索框 |
| `searchPlaceholder` | `string` | - | 搜索框占位符 |

### 操作区域属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `actions` | `ReactNode` | - | 右侧操作区域内容 |
| `extra` | `ReactNode` | - | 额外的右侧内容 |

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
  return (
    <TechLayout
      // TechHeader 的属性直接传给 TechLayout
      brand="管理后台"
      version="v1.0.0"
      headerMenuItems={headerMenuItems}
      selectedHeaderKey="dashboard"
      onHeaderMenuSelect={handleHeaderMenuSelect}
      onSearch={handleSearch}
      searchPlaceholder="全局搜索..."
      headerActions={
        <TechButton variant="ghost" icon="user">
          用户中心
        </TechButton>
      }
      // 侧边栏配置
      sidebarItems={sidebarItems}
    >
      <div>页面内容</div>
    </TechLayout>
  );
}
```

### 独立使用头部导航

```tsx
function CustomApp() {
  return (
    <div>
      {/* 固定顶部导航 */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000 
      }}>
        <TechHeader
          brand="独立应用"
          menuItems={menuItems}
          onSearch={handleSearch}
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <TechButton variant="ghost">登录</TechButton>
              <TechButton variant="primary">注册</TechButton>
            </div>
          }
        />
      </div>

      {/* 主要内容，添加顶部边距避免被遮挡 */}
      <div style={{ marginTop: '56px', padding: '20px' }}>
        <div>页面内容</div>
      </div>
    </div>
  );
}
```

## 常见使用场景

### 1. 官网导航头部

```tsx
function WebsiteHeader() {
  const menuItems = [
    { key: 'home', label: '首页', to: '/' },
    { key: 'products', label: '产品', to: '/products' },
    { key: 'pricing', label: '价格', to: '/pricing' },
    { key: 'docs', label: '文档', to: '/docs' },
    { key: 'blog', label: '博客', to: '/blog' },
  ];

  return (
    <TechHeader
      brand={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
          <span>科技公司</span>
        </div>
      }
      menuItems={menuItems}
      selectedMenuKey={useRouter().pathname}
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <TechButton variant="ghost" size="small">
            登录
          </TechButton>
          <TechButton variant="primary" size="small">
            免费试用
          </TechButton>
        </div>
      }
    />
  );
}
```

### 2. 管理后台头部

```tsx
function AdminHeader({ user, notifications }) {
  return (
    <TechHeader
      brand="管理后台"
      version="v2.1.0"
      onToggleSidebar={() => dispatch(toggleSidebar())}
      onSearch={(value) => dispatch(globalSearch(value))}
      searchPlaceholder="搜索用户、订单、产品..."
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 通知下拉 */}
          <NotificationDropdown count={notifications.length} />
          
          {/* 用户菜单 */}
          <UserDropdown 
            user={user}
            avatar={user.avatar}
            name={user.name}
          />
        </div>
      }
    />
  );
}
```

### 3. 工具类应用头部

```tsx
function ToolHeader() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TechHeader
      brand="开发工具"
      onToggleSidebar={() => toggleFileExplorer()}
      actions={
        <div style={{ display: 'flex', gap: '4px' }}>
          <TechButton 
            variant={isRunning ? "primary" : "ghost"}
            icon={isRunning ? "pause" : "play"}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '暂停' : '运行'}
          </TechButton>
          <TechButton variant="ghost" icon="stop">
            停止
          </TechButton>
          <TechButton variant="ghost" icon="refresh">
            重新加载
          </TechButton>
          <TechButton variant="ghost" icon="settings" iconOnly />
        </div>
      }
      extra={
        <div style={{ fontSize: '12px', color: '#7c89bf' }}>
          状态: {isRunning ? '运行中' : '已停止'}
        </div>
      }
    />
  );
}
```

### 4. 多工作区头部

```tsx
function MultiWorkspaceHeader() {
  const [activeWorkspace, setActiveWorkspace] = useState('main');
  
  const workspaceMenuItems = [
    { key: 'main', label: '主工作区' },
    { key: 'dev', label: '开发环境' },
    { key: 'test', label: '测试环境' },
    { key: 'staging', label: '预发布' },
  ];

  return (
    <TechHeader
      brand="多环境管理"
      menuItems={workspaceMenuItems}
      selectedMenuKey={activeWorkspace}
      onMenuSelect={setActiveWorkspace}
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: getWorkspaceColor(activeWorkspace),
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {getWorkspaceLabel(activeWorkspace)}
          </div>
          <TechButton variant="ghost" icon="settings" iconOnly />
        </div>
      }
    />
  );
}
```

## 响应式设计

### 移动端适配

```tsx
function ResponsiveHeader() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <TechHeader
          brand="移动应用"
          actions={
            <TechButton
              variant="ghost"
              icon="menu"
              iconOnly
              onClick={() => setMobileMenuOpen(true)}
            />
          }
        />
        
        {/* 移动端抽屉菜单 */}
        {mobileMenuOpen && (
          <MobileMenu
            menuItems={menuItems}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </>
    );
  }

  // 桌面端显示完整菜单
  return (
    <TechHeader
      brand="桌面应用"
      menuItems={menuItems}
      selectedMenuKey={selectedKey}
      onMenuSelect={setSelectedKey}
      actions={desktopActions}
    />
  );
}
```

## 自定义样式

### 品牌区域定制

```tsx
function CustomBrandHeader() {
  return (
    <TechHeader
      brand={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 动态Logo */}
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(45deg, var(--tech-primary), var(--tech-accent))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>AI</span>
          </div>
          
          {/* 品牌文字 */}
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              智能平台
            </div>
            <div style={{ fontSize: '10px', color: '#7c89bf' }}>
              Powered by AI
            </div>
          </div>
        </div>
      }
    />
  );
}
```

### 操作区域定制

```tsx
function CustomActionsHeader() {
  return (
    <TechHeader
      brand="自定义操作"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* 状态指示器 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2ed573'
            }} />
            <span style={{ fontSize: '12px', color: '#7c89bf' }}>
              在线
            </span>
          </div>

          {/* 快捷操作 */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <TechButton variant="toggle" icon="bell" iconOnly />
            <TechButton variant="toggle" icon="message" iconOnly />
            <TechButton variant="toggle" icon="settings" iconOnly />
          </div>

          {/* 用户头像 */}
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--tech-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            U
          </div>
        </div>
      }
    />
  );
}
```

## 常见问题

### 1. 头部导航固定在顶部？

```tsx
<div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  zIndex: 1000 
}}>
  <TechHeader {...props} />
</div>
```

### 2. 菜单项不响应点击？

确保设置了正确的回调函数：

```tsx
<TechHeader
  menuItems={menuItems}
  onMenuSelect={(key) => console.log('点击菜单:', key)}
/>
```

### 3. 搜索框不显示？

需要设置 `onSearch` 回调：

```tsx
<TechHeader
  onSearch={(value) => handleSearch(value)}
  searchPlaceholder="搜索..."
/>
```

### 4. 侧边栏切换按钮不显示？

需要设置 `onToggleSidebar` 回调：

```tsx
<TechHeader
  onToggleSidebar={() => toggleSidebar()}
/>
```

### 5. 如何自定义头部高度？

通过CSS定制：

```css
.custom-header .tech-header {
  height: 64px; /* 默认是56px */
}
```