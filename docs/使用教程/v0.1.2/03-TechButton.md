# TechButton 按钮组件

## 简介

`TechButton` 是科技风格的按钮组件，提供多种视觉风格和功能状态，具有科技感的外观和流畅的交互效果。

## 基础使用

### 最简单的按钮

```tsx
import { TechButton } from 'yggjs_rlayout/tech';

<TechButton>点击我</TechButton>
```

### 不同风格的按钮

```tsx
<TechButton variant="primary">主要按钮</TechButton>
<TechButton variant="secondary">次要按钮</TechButton>
<TechButton variant="ghost">透明按钮</TechButton>
<TechButton variant="toggle">切换按钮</TechButton>
```

## 完整示例

```tsx
import { TechButton } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function ButtonExamples() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 基本按钮 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <TechButton variant="primary">主要操作</TechButton>
        <TechButton variant="secondary">次要操作</TechButton>
        <TechButton variant="ghost">透明按钮</TechButton>
      </div>

      {/* 带图标的按钮 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <TechButton variant="primary" icon="plus">
          新建
        </TechButton>
        <TechButton variant="secondary" icon="edit">
          编辑
        </TechButton>
        <TechButton variant="ghost" icon="delete">
          删除
        </TechButton>
      </div>

      {/* 仅图标按钮 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <TechButton icon="settings" iconOnly aria-label="设置" />
        <TechButton icon="search" iconOnly aria-label="搜索" />
        <TechButton icon="more" iconOnly aria-label="更多" />
      </div>

      {/* 不同尺寸 */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <TechButton size="small" variant="primary">小按钮</TechButton>
        <TechButton size="medium" variant="primary">中按钮</TechButton>
        <TechButton size="large" variant="primary">大按钮</TechButton>
      </div>

      {/* 状态按钮 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <TechButton 
          variant="primary" 
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? '提交中...' : '提交'}
        </TechButton>
        <TechButton disabled>禁用按钮</TechButton>
      </div>
    </div>
  );
}
```

## 属性详解

### 基础属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 按钮文本内容 |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'toggle'` | `'secondary'` | 视觉风格 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |

### 图标属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | `TechIconName` | - | 左侧图标名称 |
| `iconOnly` | `boolean` | `false` | 是否仅显示图标 |

### 状态属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |

### 事件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onClick` | `(event: MouseEvent) => void` | - | 点击事件处理函数 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML 按钮类型 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义内联样式 |
| `aria-label` | `string` | - | 无障碍标签，推荐用于仅图标按钮 |

## 视觉风格说明

### primary - 主要按钮
- **使用场景**：主要操作，如提交、确认、创建
- **视觉特点**：科技蓝背景，突出显示
- **示例**：保存、提交、新建

### secondary - 次要按钮  
- **使用场景**：次要操作，默认风格
- **视觉特点**：透明背景，科技蓝边框
- **示例**：取消、重置、返回

### ghost - 透明按钮
- **使用场景**：弱化的操作，不抢夺注意力
- **视觉特点**：完全透明，悬停时显示背景
- **示例**：删除、清空、辅助功能

### toggle - 切换按钮
- **使用场景**：开关类操作
- **视觉特点**：适合作为工具栏按钮
- **示例**：侧边栏切换、菜单展开

## 尺寸规格

| 尺寸 | 高度 | 内边距 | 图标大小 | 使用场景 |
|------|------|--------|----------|----------|
| `small` | 28px | 8px 12px | 14px | 紧凑布局、表格操作 |
| `medium` | 32px | 10px 16px | 16px | 常规使用 |
| `large` | 40px | 12px 20px | 18px | 突出显示的主要操作 |

## 常见用法

### 1. 表单按钮

```tsx
function FormActions() {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <TechButton variant="ghost">取消</TechButton>
      <TechButton variant="primary" type="submit">
        保存
      </TechButton>
    </div>
  );
}
```

### 2. 工具栏按钮

```tsx
function Toolbar() {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <TechButton variant="toggle" icon="bold" iconOnly aria-label="粗体" />
      <TechButton variant="toggle" icon="italic" iconOnly aria-label="斜体" />
      <TechButton variant="toggle" icon="underline" iconOnly aria-label="下划线" />
    </div>
  );
}
```

### 3. 卡片操作按钮

```tsx
<TechCard
  title="用户设置"
  actions={
    <div style={{ display: 'flex', gap: '8px' }}>
      <TechButton size="small" variant="ghost">
        取消
      </TechButton>
      <TechButton size="small" variant="primary">
        保存
      </TechButton>
    </div>
  }
>
  {/* 卡片内容 */}
</TechCard>
```

### 4. 异步操作按钮

```tsx
function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await saveData();
      // 成功处理
    } catch (error) {
      // 错误处理
    } finally {
      setLoading(false);
    }
  };

  return (
    <TechButton
      variant="primary"
      loading={loading}
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? '保存中...' : '保存'}
    </TechButton>
  );
}
```

## 可用图标

常用的图标名称包括：

- **通用**：`plus`, `edit`, `delete`, `search`, `settings`, `more`
- **导航**：`home`, `back`, `forward`, `up`, `down`, `left`, `right`
- **文件**：`file`, `folder`, `save`, `upload`, `download`
- **用户**：`user`, `users`, `profile`, `login`, `logout`
- **状态**：`check`, `close`, `alert`, `info`, `warning`, `error`

完整的图标列表可以参考 `TechIcon` 组件文档。

## 无障碍支持

### 1. 为仅图标按钮提供标签

```tsx
<TechButton 
  icon="settings" 
  iconOnly 
  aria-label="打开设置"  // 必需
/>
```

### 2. 加载状态的无障碍

```tsx
<TechButton 
  loading={true}
  aria-busy="true"  // 自动设置
>
  保存中...
</TechButton>
```

### 3. 禁用状态

```tsx
<TechButton 
  disabled={true}
  aria-disabled="true"  // 自动设置
>
  不可点击
</TechButton>
```

## 常见问题

### 1. 按钮点击没有反应？

检查是否设置了 `disabled` 或 `loading` 属性。

### 2. 图标不显示？

确认图标名称是否正确，参考可用图标列表。

### 3. 如何自定义按钮样式？

```tsx
<TechButton 
  style={{ 
    backgroundColor: 'red',  // 自定义背景色
    minWidth: '120px'        // 设置最小宽度
  }}
>
  自定义按钮
</TechButton>
```

### 4. 如何创建按钮组？

```tsx
<div style={{ display: 'flex', gap: '1px' }}>
  <TechButton style={{ borderRadius: '4px 0 0 4px' }}>左</TechButton>
  <TechButton style={{ borderRadius: '0' }}>中</TechButton>
  <TechButton style={{ borderRadius: '0 4px 4px 0' }}>右</TechButton>
</div>
```