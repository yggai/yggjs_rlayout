# TechCard 卡片组件

## 简介

`TechCard` 是科技风格的卡片容器组件，提供结构化的内容展示方式，具有多种视觉变体和交互效果，是构建科技风界面的重要组件。

## 基础使用

### 最简单的卡片

```tsx
import { TechCard } from 'yggjs_rlayout/tech';

<TechCard>
  <p>这是卡片内容</p>
</TechCard>
```

### 带标题的卡片

```tsx
<TechCard title="用户信息">
  <p>姓名: 张三</p>
  <p>邮箱: zhangsan@example.com</p>
</TechCard>
```

## 完整示例

```tsx
import { TechCard, TechButton } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function CardExamples() {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      {/* 基础卡片 */}
      <TechCard 
        title="系统状态" 
        subtitle="实时监控数据"
        icon="dashboard"
      >
        <div>
          <p>CPU 使用率: 45%</p>
          <p>内存使用: 2.1GB / 8GB</p>
          <p>磁盘空间: 67%</p>
        </div>
      </TechCard>

      {/* 带操作按钮的卡片 */}
      <TechCard
        title="用户管理"
        icon="users"
        variant="glass"
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <TechButton size="small" variant="ghost">
              取消
            </TechButton>
            <TechButton size="small" variant="primary">
              确认
            </TechButton>
          </div>
        }
      >
        <p>当前在线用户: 1,234</p>
        <p>今日新增用户: 56</p>
      </TechCard>

      {/* 可点击的卡片 */}
      <TechCard
        title="项目统计"
        subtitle="点击查看详情"
        icon="chart"
        variant="outlined"
        clickable
        hoverable
        onClick={() => alert('点击了卡片')}
        extra={<span style={{ color: '#27e0ff' }}>+12%</span>}
      >
        <div>
          <p>活跃项目: 23</p>
          <p>已完成: 156</p>
          <p>进行中: 89</p>
        </div>
      </TechCard>

      {/* 不同尺寸的卡片 */}
      <TechCard title="小卡片" size="small">
        <p>紧凑的内容显示</p>
      </TechCard>

      <TechCard title="大卡片" size="large" variant="gradient">
        <div>
          <h4>更大的内容区域</h4>
          <p>适合显示更多的信息内容</p>
          <p>可以放置图表、表格等复杂内容</p>
        </div>
      </TechCard>

      {/* 加载状态卡片 */}
      <TechCard 
        title="数据加载中"
        loading={loading}
        actions={
          <TechButton 
            size="small"
            onClick={() => setLoading(!loading)}
          >
            {loading ? '停止加载' : '开始加载'}
          </TechButton>
        }
      >
        <p>正在获取最新数据...</p>
      </TechCard>
    </div>
  );
}
```

## 属性详解

### 内容属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | **必填** | 卡片主要内容 |
| `title` | `string` | - | 卡片标题 |
| `subtitle` | `string` | - | 卡片副标题 |
| `icon` | `TechIconName` | - | 标题左侧图标 |

### 布局属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `actions` | `ReactNode` | - | 底部操作区域内容 |
| `extra` | `ReactNode` | - | 头部右侧额外内容 |

### 视觉属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'glass' \| 'gradient'` | `'default'` | 视觉风格变体 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 卡片尺寸 |

### 交互属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `hoverable` | `boolean` | `true` | 是否显示悬停效果 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `onClick` | `() => void` | - | 点击事件处理函数 |

### 状态属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 卡片整体样式 |
| `bodyStyle` | `CSSProperties` | - | 卡片主体样式 |
| `headerStyle` | `CSSProperties` | - | 卡片头部样式 |

## 视觉风格说明

### default - 默认风格
- **视觉特点**：深色半透明背景，细边框
- **使用场景**：常规的内容展示
- **适用于**：信息面板、数据展示

### outlined - 边框风格
- **视觉特点**：突出的科技蓝边框
- **使用场景**：需要突出显示的内容
- **适用于**：重要信息、警告提示

### filled - 填充风格
- **视觉特点**：实色背景填充
- **使用场景**：需要强调的内容区域
- **适用于**：状态显示、统计数据

### glass - 毛玻璃风格
- **视觉特点**：毛玻璃效果，高端质感
- **使用场景**：高级功能、设置面板
- **适用于**：工具栏、控制面板

### gradient - 渐变风格
- **视觉特点**：科技感渐变背景
- **使用场景**：特殊内容、品牌展示
- **适用于**：欢迎页、功能介绍

## 尺寸规格

| 尺寸 | 内边距 | 标题字体 | 适用场景 |
|------|--------|----------|----------|
| `small` | 12px | 14px | 紧凑布局、侧边栏 |
| `medium` | 16px | 16px | 常规使用 |
| `large` | 20px | 18px | 重要内容、主要展示区 |

## 常见用法

### 1. 信息展示卡片

```tsx
function InfoCard() {
  return (
    <TechCard 
      title="服务器状态" 
      icon="server"
      extra={
        <span style={{ 
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: '#27e0ff20',
          color: '#27e0ff',
          fontSize: '12px'
        }}>
          在线
        </span>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>CPU 使用率</span>
          <span style={{ color: '#27e0ff' }}>45%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>内存使用</span>
          <span style={{ color: '#27e0ff' }}>2.1GB</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>磁盘使用</span>
          <span style={{ color: '#27e0ff' }}>67%</span>
        </div>
      </div>
    </TechCard>
  );
}
```

### 2. 操作卡片

```tsx
function ActionCard() {
  return (
    <TechCard
      title="快速操作"
      subtitle="常用功能快捷入口"
      variant="glass"
      actions={
        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <TechButton size="small" variant="ghost" style={{ flex: 1 }}>
            重置
          </TechButton>
          <TechButton size="small" variant="primary" style={{ flex: 1 }}>
            执行
          </TechButton>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <TechButton size="small" variant="ghost" icon="refresh">
          刷新数据
        </TechButton>
        <TechButton size="small" variant="ghost" icon="download">
          导出
        </TechButton>
        <TechButton size="small" variant="ghost" icon="settings">
          设置
        </TechButton>
        <TechButton size="small" variant="ghost" icon="help">
          帮助
        </TechButton>
      </div>
    </TechCard>
  );
}
```

### 3. 统计数据卡片

```tsx
function StatsCard({ title, value, change, icon }) {
  const isPositive = change > 0;
  
  return (
    <TechCard 
      title={title}
      icon={icon}
      variant="outlined"
      hoverable
      extra={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          color: isPositive ? '#27e0ff' : '#ff4757',
          fontSize: '14px'
        }}>
          <span>{isPositive ? '↗' : '↘'}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      }
    >
      <div style={{ 
        fontSize: '28px', 
        fontWeight: 'bold',
        color: '#27e0ff',
        textAlign: 'center',
        padding: '16px 0'
      }}>
        {value.toLocaleString()}
      </div>
    </TechCard>
  );
}

// 使用示例
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
  <StatsCard title="总用户" value={12345} change={8.5} icon="users" />
  <StatsCard title="活跃用户" value={8956} change={-2.3} icon="user-check" />
  <StatsCard title="新增用户" value={1234} change={15.6} icon="user-plus" />
</div>
```

### 4. 设置面板卡片

```tsx
function SettingsCard() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSave: false
  });

  return (
    <TechCard
      title="系统设置"
      icon="settings"
      variant="glass"
      actions={
        <TechButton variant="primary" size="small">
          保存设置
        </TechButton>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{getSettingLabel(key)}</span>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  [key]: e.target.checked
                })}
              />
            </label>
          </div>
        ))}
      </div>
    </TechCard>
  );
}
```

### 5. 可点击导航卡片

```tsx
function NavigationCards() {
  const navigate = useNavigate(); // 如果使用 React Router

  const cards = [
    { key: 'dashboard', title: '仪表板', icon: 'dashboard', desc: '查看系统概览' },
    { key: 'users', title: '用户管理', icon: 'users', desc: '管理系统用户' },
    { key: 'settings', title: '系统设置', icon: 'settings', desc: '配置系统参数' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {cards.map((card) => (
        <TechCard
          key={card.key}
          title={card.title}
          subtitle={card.desc}
          icon={card.icon}
          variant="default"
          clickable
          hoverable
          onClick={() => navigate(`/${card.key}`)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ 
            textAlign: 'center',
            padding: '20px 0',
            color: '#7c89bf'
          }}>
            点击进入 {card.title}
          </div>
        </TechCard>
      ))}
    </div>
  );
}
```

## 布局组合

### 网格布局

```tsx
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '16px'
}}>
  <TechCard title="卡片1">内容1</TechCard>
  <TechCard title="卡片2">内容2</TechCard>
  <TechCard title="卡片3">内容3</TechCard>
</div>
```

### 弹性布局

```tsx
<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
  <TechCard title="左侧" style={{ flex: 1, minWidth: '200px' }}>
    左侧内容
  </TechCard>
  <TechCard title="右侧" style={{ flex: 2, minWidth: '300px' }}>
    右侧内容（更宽）
  </TechCard>
</div>
```

## 常见问题

### 1. 如何自定义卡片间距？

```tsx
<TechCard bodyStyle={{ padding: '24px' }}>
  自定义内边距的卡片
</TechCard>
```

### 2. 如何隐藏头部或操作区？

不传入 `title`、`subtitle`、`icon`、`extra` 即隐藏头部。
不传入 `actions` 即隐藏操作区。

### 3. 如何实现卡片的展开/折叠？

```tsx
function CollapsibleCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <TechCard
      title="可折叠卡片"
      extra={
        <TechButton 
          icon={expanded ? 'up' : 'down'} 
          iconOnly 
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
        />
      }
    >
      <div>基础内容始终显示</div>
      {expanded && (
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          展开后才显示的详细内容
        </div>
      )}
    </TechCard>
  );
}
```

### 4. 如何实现卡片的拖拽排序？

可以配合拖拽库（如 react-dnd 或 @dnd-kit/sortable）使用：

```tsx
import { useSortable } from '@dnd-kit/sortable';

function DraggableCard({ id, children, ...props }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TechCard {...props}>
        {children}
      </TechCard>
    </div>
  );
}
```