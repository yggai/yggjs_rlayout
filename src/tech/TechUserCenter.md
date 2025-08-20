# TechUserCenter 用户中心组件

一个科技风格的用户中心组件，支持头像显示、下拉菜单和自定义操作。

## 特性

- 🎨 **多种显示模式** - 支持仅头像、头像+用户名等多种显示方式
- ⚡ **交互体验** - 键盘导航、点击外部关闭、悬停效果
- 🔧 **高度可定制** - 自定义菜单项、图标、事件处理
- 📱 **响应式设计** - 三种尺寸选择，适配不同界面
- 🎯 **无障碍支持** - 完整的键盘导航和 ARIA 属性

## 基础用法

```tsx
import { TechUserCenter } from 'yggjs_rlayout';

function App() {
  return (
    <TechUserCenter
      username="张三"
      userInfo="zhangsan@example.com"
    />
  );
}
```

## 自定义头像

```tsx
<TechUserCenter
  avatar="https://example.com/avatar.jpg"
  username="李四"
  userInfo="lisi@company.com"
  showUsername={true}
/>
```

## 自定义菜单项

```tsx
const customItems = [
  {
    key: 'profile',
    label: '个人资料',
    icon: 'profile',
    onClick: () => console.log('个人资料')
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'settings',
    onClick: () => console.log('设置')
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: 'logout',
    danger: true,
    onClick: () => console.log('退出登录')
  }
];

<TechUserCenter
  username="王五"
  items={customItems}
/>
```

## 不同尺寸

```tsx
{/* 小尺寸 */}
<TechUserCenter size="small" username="小号" />

{/* 中等尺寸（默认） */}
<TechUserCenter size="medium" username="中号" />

{/* 大尺寸 */}
<TechUserCenter size="large" username="大号" />
```

## 在 TechLayout 中使用

```tsx
<TechLayout
  // ... 其他属性
  headerExtra={
    <TechUserCenter
      username="管理员"
      userInfo="admin@company.com"
      items={customItems}
    />
  }
>
  {/* 页面内容 */}
</TechLayout>
```

## API

### TechUserCenterProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| avatar | string | - | 用户头像URL |
| username | string | '用户' | 用户名 |
| userInfo | string | - | 用户邮箱或其他信息 |
| items | TechUserCenterItem[] | 默认菜单项 | 下拉菜单项 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 头像大小 |
| showUsername | boolean | false | 是否显示用户名 |
| onAvatarClick | () => void | - | 点击头像的回调 |
| className | string | '' | 自定义类名 |

### TechUserCenterItem

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| key | string | - | 唯一标识 |
| label | string | - | 显示文本 |
| icon | TechIconName | - | 图标名称 |
| onClick | () => void | - | 点击回调 |
| href | string | - | 跳转链接 |
| danger | boolean | false | 是否为危险操作（红色样式） |

## 默认菜单项

组件提供了默认的菜单项配置：

- 个人中心 (profile)
- 设置 (settings)  
- 帮助 (help)
- 注销 (logout, 危险操作)

## 键盘导航

- `Tab` - 聚焦到组件
- `Enter` / `Space` - 打开/关闭下拉菜单
- `Escape` - 关闭下拉菜单
- 点击外部区域 - 关闭下拉菜单

## 样式定制

组件使用 CSS 变量，可以通过覆盖变量来自定义样式：

```css
.tech-user-center {
  --tech-accent: #your-color;
  --tech-text: #your-text-color;
  --tech-panel: #your-panel-color;
  --tech-border: #your-border-color;
}
```

## 注意事项

1. 确保在 `TechThemeProvider` 内使用组件
2. 自定义菜单项的 `key` 必须唯一
3. 危险操作建议设置 `danger: true` 以显示警告样式
4. 头像 URL 应该是可访问的图片链接
