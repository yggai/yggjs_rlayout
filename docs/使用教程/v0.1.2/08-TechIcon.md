# TechIcon 图标组件

## 简介

`TechIcon` 是科技风格的图标组件，提供一套完整的科技风图标库，支持多种尺寸和颜色配置，为界面提供统一的视觉图标语言。

## 基础使用

### 最简单的图标

```tsx
import { TechIcon } from 'yggjs_rlayout/tech';

<TechIcon name="home" />
```

### 不同尺寸的图标

```tsx
<TechIcon name="settings" size={16} />
<TechIcon name="settings" size={20} />
<TechIcon name="settings" size={24} />
```

## 完整示例

```tsx
import { TechIcon, TechCard } from 'yggjs_rlayout/tech';

function IconShowcase() {
  const commonIcons = [
    'home', 'dashboard', 'users', 'settings', 'search',
    'plus', 'edit', 'delete', 'save', 'upload', 'download',
    'refresh', 'close', 'check', 'alert', 'info'
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      {/* 常用图标展示 */}
      <TechCard title="常用图标">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          padding: '16px 0'
        }}>
          {commonIcons.map(iconName => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                transition: 'all 0.2s'
              }}
            >
              <TechIcon name={iconName} size={24} />
              <span style={{ fontSize: '12px', color: '#7c89bf' }}>
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </TechCard>

      {/* 不同尺寸 */}
      <TechCard title="图标尺寸">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="star" size={12} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              12px
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="star" size={16} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              16px
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="star" size={20} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              20px
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="star" size={24} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              24px
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="star" size={32} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              32px
            </div>
          </div>
        </div>
      </TechCard>

      {/* 自定义颜色 */}
      <TechCard title="自定义颜色">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="heart" size={24} style={{ color: '#ff4757' }} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              红色
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="heart" size={24} style={{ color: '#2ed573' }} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              绿色
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="heart" size={24} style={{ color: '#27e0ff' }} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              青色
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TechIcon name="heart" size={24} style={{ color: '#ffa502' }} />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '4px' }}>
              橙色
            </div>
          </div>
        </div>
      </TechCard>

      {/* 在按钮中使用 */}
      <TechCard title="在其他组件中使用">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TechIcon name="user" size={16} />
            <span>用户信息</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TechIcon name="mail" size={16} />
            <span>邮箱: user@example.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TechIcon name="phone" size={16} />
            <span>电话: +86 138 0013 8000</span>
          </div>
        </div>
      </TechCard>
    </div>
  );
}
```

## 属性详解

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `TechIconName` | **必填** | 图标名称 |
| `size` | `number` | `16` | 图标尺寸（像素） |
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |
| `onClick` | `(e: MouseEvent) => void` | - | 点击事件 |

## 可用图标列表

### 🏠 基础图标
```tsx
<TechIcon name="home" />        // 首页
<TechIcon name="dashboard" />   // 仪表板  
<TechIcon name="menu" />        // 菜单
<TechIcon name="more" />        // 更多
<TechIcon name="settings" />    // 设置
<TechIcon name="help" />        // 帮助
<TechIcon name="info" />        // 信息
<TechIcon name="search" />      // 搜索
```

### 👥 用户相关
```tsx
<TechIcon name="user" />        // 单个用户
<TechIcon name="users" />       // 多个用户
<TechIcon name="profile" />     // 个人资料
<TechIcon name="login" />       // 登录
<TechIcon name="logout" />      // 登出
<TechIcon name="register" />    // 注册
```

### ➕ 操作图标
```tsx
<TechIcon name="plus" />        // 添加/新建
<TechIcon name="edit" />        // 编辑
<TechIcon name="delete" />      // 删除
<TechIcon name="save" />        // 保存
<TechIcon name="copy" />        // 复制
<TechIcon name="cut" />         // 剪切
<TechIcon name="paste" />       // 粘贴
<TechIcon name="refresh" />     // 刷新
```

### 📁 文件相关
```tsx
<TechIcon name="file" />        // 文件
<TechIcon name="folder" />      // 文件夹
<TechIcon name="upload" />      // 上传
<TechIcon name="download" />    // 下载
<TechIcon name="attach" />      // 附件
<TechIcon name="link" />        // 链接
```

### 🎯 状态图标
```tsx
<TechIcon name="check" />       // 成功/确认
<TechIcon name="close" />       // 关闭/错误
<TechIcon name="alert" />       // 警告
<TechIcon name="error" />       // 错误
<TechIcon name="success" />     // 成功
<TechIcon name="warning" />     // 警告
<TechIcon name="loading" />     // 加载中
```

### 🧭 导航图标
```tsx
<TechIcon name="left" />        // 向左
<TechIcon name="right" />       // 向右
<TechIcon name="up" />          // 向上
<TechIcon name="down" />        // 向下
<TechIcon name="back" />        // 返回
<TechIcon name="forward" />     // 前进
```

### 📊 数据相关
```tsx
<TechIcon name="chart" />       // 图表
<TechIcon name="table" />       // 表格
<TechIcon name="list" />        // 列表
<TechIcon name="grid" />        // 网格
<TechIcon name="filter" />      // 筛选
<TechIcon name="sort" />        // 排序
```

### 💬 通讯图标
```tsx
<TechIcon name="mail" />        // 邮件
<TechIcon name="message" />     // 消息
<TechIcon name="phone" />       // 电话
<TechIcon name="notification" /> // 通知
<TechIcon name="bell" />        // 铃铛
```

### 🔧 工具图标
```tsx
<TechIcon name="tool" />        // 工具
<TechIcon name="config" />      // 配置
<TechIcon name="debug" />       // 调试
<TechIcon name="code" />        // 代码
<TechIcon name="terminal" />    // 终端
<TechIcon name="database" />    // 数据库
```

## 常见用法

### 1. 在按钮中使用

```tsx
import { TechButton, TechIcon } from 'yggjs_rlayout/tech';

// 按钮会自动处理图标
<TechButton icon="plus" variant="primary">
  新建项目
</TechButton>

// 或者手动添加图标
<TechButton variant="primary">
  <TechIcon name="save" size={16} />
  保存
</TechButton>
```

### 2. 在菜单中使用

```tsx
const menuItems = [
  {
    key: 'dashboard',
    label: '仪表板',
    icon: 'dashboard'  // TechMenu 会自动渲染为 TechIcon
  },
  {
    key: 'users',
    label: '用户管理', 
    icon: 'users'
  }
];
```

### 3. 在列表中使用

```tsx
function StatusList() {
  const items = [
    { id: 1, status: 'success', message: '操作成功' },
    { id: 2, status: 'warning', message: '需要注意' },
    { id: 3, status: 'error', message: '操作失败' },
  ];

  const getStatusIcon = (status) => {
    const iconMap = {
      success: { name: 'check', color: '#2ed573' },
      warning: { name: 'alert', color: '#ffa502' },
      error: { name: 'close', color: '#ff4757' }
    };
    return iconMap[status];
  };

  return (
    <div>
      {items.map(item => {
        const iconConfig = getStatusIcon(item.status);
        return (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
            <TechIcon 
              name={iconConfig.name} 
              size={16} 
              style={{ color: iconConfig.color }} 
            />
            <span>{item.message}</span>
          </div>
        );
      })}
    </div>
  );
}
```

### 4. 创建图标按钮

```tsx
function IconButton({ icon, onClick, tooltip, ...props }) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      style={{
        padding: '8px',
        background: 'transparent',
        border: '1px solid var(--tech-border)',
        borderRadius: '4px',
        color: 'var(--tech-text)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
        e.target.style.borderColor = 'var(--tech-accent)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.borderColor = 'var(--tech-border)';
      }}
      {...props}
    >
      <TechIcon name={icon} size={16} />
    </button>
  );
}

// 使用
<IconButton icon="settings" onClick={() => {}} tooltip="设置" />
<IconButton icon="refresh" onClick={() => {}} tooltip="刷新" />
```

### 5. 状态指示器

```tsx
function StatusIndicator({ status, text }) {
  const statusConfig = {
    online: { icon: 'check', color: '#2ed573' },
    offline: { icon: 'close', color: '#ff4757' },
    loading: { icon: 'loading', color: '#ffa502' }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <TechIcon 
        name={config.icon} 
        size={12} 
        style={{ 
          color: config.color,
          animation: status === 'loading' ? 'spin 1s linear infinite' : 'none'
        }} 
      />
      <span style={{ fontSize: '14px', color: '#7c89bf' }}>
        {text || status}
      </span>
    </div>
  );
}

// 使用
<StatusIndicator status="online" text="服务正常" />
<StatusIndicator status="loading" text="连接中..." />
```

## 样式定制

### 自定义颜色

```tsx
// 单个图标自定义
<TechIcon 
  name="heart" 
  size={24} 
  style={{ color: '#ff4757' }} 
/>

// 使用CSS变量
<TechIcon 
  name="star" 
  size={20} 
  style={{ color: 'var(--tech-accent)' }} 
/>
```

### 悬停效果

```tsx
<TechIcon 
  name="settings"
  size={20}
  style={{
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.target.style.color = 'var(--tech-accent)';
    e.target.style.transform = 'scale(1.1)';
  }}
  onMouseLeave={(e) => {
    e.target.style.color = 'var(--tech-text)';
    e.target.style.transform = 'scale(1)';
  }}
  onClick={() => console.log('设置被点击')}
/>
```

### 旋转动画

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning-icon {
  animation: spin 1s linear infinite;
}
```

```tsx
<TechIcon 
  name="loading" 
  size={16} 
  className="spinning-icon" 
/>
```

## 图标分组使用

### 工具栏图标组

```tsx
function Toolbar() {
  const tools = [
    { icon: 'save', tooltip: '保存', action: () => save() },
    { icon: 'copy', tooltip: '复制', action: () => copy() },
    { icon: 'paste', tooltip: '粘贴', action: () => paste() },
    { icon: 'refresh', tooltip: '刷新', action: () => refresh() },
  ];

  return (
    <div style={{ display: 'flex', gap: '4px', padding: '8px', backgroundColor: 'var(--tech-panel)', borderRadius: '6px' }}>
      {tools.map(tool => (
        <button
          key={tool.icon}
          onClick={tool.action}
          title={tool.tooltip}
          style={{
            padding: '6px',
            background: 'transparent',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <TechIcon name={tool.icon} size={16} />
        </button>
      ))}
    </div>
  );
}
```

## 常见问题

### 1. 图标不显示？

检查图标名称是否正确：

```tsx
// ❌ 错误：图标名称不存在
<TechIcon name="nonexistent" />

// ✅ 正确：使用存在的图标名称
<TechIcon name="home" />
```

### 2. 如何添加自定义图标？

目前组件库使用内置图标，如需自定义图标：

```tsx
// 使用自定义SVG组件
function CustomIcon({ size = 16, style, ...props }) {
  return (
    <svg width={size} height={size} style={style} {...props}>
      {/* 你的SVG路径 */}
    </svg>
  );
}
```

### 3. 图标在不同浏览器中显示不一致？

确保使用了正确的CSS重置和字体设置：

```css
.tech-icon {
  font-family: 'Tech Icons', sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
}
```

### 4. 图标点击区域太小？

增加点击区域：

```tsx
<div style={{ 
  padding: '8px',  // 增加点击区域
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}} onClick={handleClick}>
  <TechIcon name="settings" size={16} />
</div>
```