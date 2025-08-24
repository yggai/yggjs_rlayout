# TechUserCenter 用户中心组件

## 简介

`TechUserCenter` 是科技风格的用户中心组件，提供用户头像、信息展示和下拉菜单功能。支持多种尺寸、自定义菜单项和用户信息显示，常用于应用的顶部导航栏或用户操作区域。

## 基础使用

### 最简单的用户中心

```tsx
import { TechUserCenter } from 'yggjs_rlayout/tech';

<TechUserCenter
  username="张三"
  avatar="/path/to/avatar.jpg"
/>
```

### 带自定义菜单的用户中心

```tsx
const userMenuItems = [
  { key: 'profile', label: '个人资料', icon: 'user' },
  { key: 'settings', label: '账户设置', icon: 'settings' },
  { key: 'help', label: '帮助中心', icon: 'help' },
  { key: 'logout', label: '退出登录', icon: 'logout', danger: true },
];

<TechUserCenter
  username="李四"
  userInfo="管理员"
  avatar="/path/to/avatar.jpg"
  items={userMenuItems}
  showUsername={true}
/>
```

## 完整示例

```tsx
import { TechUserCenter, TechCard, TechButton } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function UserCenterDemo() {
  const [currentUser, setCurrentUser] = useState({
    username: '张三',
    userInfo: '系统管理员',
    avatar: '/avatars/zhangsan.jpg',
    email: 'zhangsan@example.com',
    role: 'admin'
  });

  // 不同角色的菜单配置
  const adminMenuItems = [
    { key: 'profile', label: '个人资料', icon: 'user', onClick: () => handleMenuClick('profile') },
    { key: 'dashboard', label: '管理面板', icon: 'dashboard', onClick: () => handleMenuClick('dashboard') },
    { key: 'users', label: '用户管理', icon: 'users', onClick: () => handleMenuClick('users') },
    { key: 'settings', label: '系统设置', icon: 'settings', onClick: () => handleMenuClick('settings') },
    { key: 'divider1', label: '', icon: undefined }, // 分隔线
    { key: 'help', label: '帮助中心', icon: 'help', onClick: () => handleMenuClick('help') },
    { key: 'about', label: '关于系统', icon: 'info', onClick: () => handleMenuClick('about') },
    { key: 'divider2', label: '', icon: undefined }, // 分隔线
    { key: 'logout', label: '退出登录', icon: 'logout', danger: true, onClick: () => handleLogout() },
  ];

  const userMenuItems = [
    { key: 'profile', label: '个人资料', icon: 'user', onClick: () => handleMenuClick('profile') },
    { key: 'settings', label: '账户设置', icon: 'settings', onClick: () => handleMenuClick('settings') },
    { key: 'help', label: '帮助中心', icon: 'help', onClick: () => handleMenuClick('help') },
    { key: 'logout', label: '退出登录', icon: 'logout', danger: true, onClick: () => handleLogout() },
  ];

  const [selectedMenu, setSelectedMenu] = useState('');

  const handleMenuClick = (key) => {
    setSelectedMenu(key);
    console.log('点击菜单项:', key);
    // 这里可以处理路由跳转或其他逻辑
  };

  const handleLogout = () => {
    console.log('用户退出登录');
    // 处理登出逻辑
    setCurrentUser({ ...currentUser, username: '游客' });
  };

  const handleAvatarClick = () => {
    console.log('点击了头像');
  };

  const switchUser = (userType) => {
    const users = {
      admin: {
        username: '管理员',
        userInfo: '系统管理员',
        avatar: '/avatars/admin.jpg',
        role: 'admin'
      },
      user: {
        username: '普通用户',
        userInfo: '注册用户',
        avatar: '/avatars/user.jpg',
        role: 'user'
      },
      guest: {
        username: '访客',
        userInfo: '游客身份',
        avatar: '',
        role: 'guest'
      }
    };
    setCurrentUser(users[userType]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
      {/* 基础用户中心 */}
      <TechCard title="基础用户中心">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <span>当前用户:</span>
          <TechUserCenter
            username={currentUser.username}
            userInfo={currentUser.userInfo}
            avatar={currentUser.avatar}
            items={currentUser.role === 'admin' ? adminMenuItems : userMenuItems}
            size="medium"
            showUsername={true}
            onAvatarClick={handleAvatarClick}
          />
        </div>
        
        <div>
          <p><strong>最后点击的菜单:</strong> {selectedMenu || '无'}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <TechButton size="small" onClick={() => switchUser('admin')}>
              切换到管理员
            </TechButton>
            <TechButton size="small" variant="ghost" onClick={() => switchUser('user')}>
              切换到用户
            </TechButton>
            <TechButton size="small" variant="ghost" onClick={() => switchUser('guest')}>
              切换到访客
            </TechButton>
          </div>
        </div>
      </TechCard>

      {/* 不同尺寸 */}
      <TechCard title="不同尺寸">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <TechUserCenter
              username="小号"
              userInfo="Small"
              size="small"
              showUsername={true}
            />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '8px' }}>
              small (28px)
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <TechUserCenter
              username="中号"
              userInfo="Medium"
              size="medium"
              showUsername={true}
            />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '8px' }}>
              medium (32px)
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <TechUserCenter
              username="大号"
              userInfo="Large"
              size="large"
              showUsername={true}
            />
            <div style={{ fontSize: '12px', color: '#7c89bf', marginTop: '8px' }}>
              large (40px)
            </div>
          </div>
        </div>
      </TechCard>

      {/* 不同状态 */}
      <TechCard title="不同使用场景" style={{ gridColumn: '1 / -1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {/* 顶部导航栏用法 */}
          <div>
            <h4 style={{ color: '#27e0ff', marginBottom: '12px' }}>顶部导航栏</h4>
            <div style={{ 
              padding: '12px 16px', 
              backgroundColor: 'var(--tech-panel)', 
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>管理后台</span>
              <TechUserCenter
                username={currentUser.username}
                userInfo={currentUser.userInfo}
                size="small"
                showUsername={false}
              />
            </div>
          </div>

          {/* 侧边栏用法 */}
          <div>
            <h4 style={{ color: '#27e0ff', marginBottom: '12px' }}>侧边栏用法</h4>
            <div style={{ 
              padding: '16px', 
              backgroundColor: 'var(--tech-panel)', 
              borderRadius: '6px',
              width: '200px'
            }}>
              <TechUserCenter
                username={currentUser.username}
                userInfo={currentUser.userInfo}
                size="medium"
                showUsername={true}
              />
            </div>
          </div>

          {/* 工具栏用法 */}
          <div>
            <h4 style={{ color: '#27e0ff', marginBottom: '12px' }}>工具栏用法</h4>
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: 'var(--tech-panel)', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <TechButton variant="toggle" icon="save" iconOnly />
              <TechButton variant="toggle" icon="refresh" iconOnly />
              <TechUserCenter
                username={currentUser.username}
                size="small"
                showUsername={false}
              />
            </div>
          </div>
        </div>
      </TechCard>
    </div>
  );
}
```

## 属性详解

### 用户信息属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `username` | `string` | `'用户'` | 用户名 |
| `userInfo` | `string` | - | 用户附加信息（如角色、部门等） |
| `avatar` | `string` | - | 头像图片URL |

### 菜单属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TechUserCenterItem[]` | 默认菜单 | 下拉菜单项列表 |

### 显示属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |
| `showUsername` | `boolean` | `false` | 是否显示用户名文字 |

### 事件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onAvatarClick` | `() => void` | - | 头像点击回调 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |

## 菜单项数据格式

### 基础菜单项 (TechUserCenterItem)

```tsx
interface TechUserCenterItem {
  key: string;                      // 唯一标识
  label: string;                    // 显示文本
  icon?: TechIconName;              // 图标（可选）
  onClick?: () => void;             // 点击回调（可选）
  href?: string;                    // 链接地址（可选）
  danger?: boolean;                 // 是否为危险操作（如删除、登出）
}
```

### 常用菜单配置

```tsx
// 管理员菜单
const adminMenuItems = [
  { key: 'profile', label: '个人资料', icon: 'user' },
  { key: 'dashboard', label: '管理面板', icon: 'dashboard' },
  { key: 'settings', label: '系统设置', icon: 'settings' },
  { key: 'logout', label: '退出登录', icon: 'logout', danger: true },
];

// 普通用户菜单
const userMenuItems = [
  { key: 'profile', label: '个人资料', icon: 'user' },
  { key: 'settings', label: '账户设置', icon: 'settings' },
  { key: 'help', label: '帮助中心', icon: 'help' },
  { key: 'logout', label: '退出登录', icon: 'logout', danger: true },
];

// 带链接的菜单
const linkMenuItems = [
  { key: 'profile', label: '个人资料', icon: 'user', href: '/profile' },
  { key: 'settings', label: '设置', icon: 'settings', href: '/settings' },
  { key: 'logout', label: '退出', icon: 'logout', onClick: handleLogout, danger: true },
];
```

## 常见使用场景

### 1. 顶部导航栏用户中心

```tsx
function HeaderUserCenter({ user, onLogout }) {
  const menuItems = [
    { key: 'profile', label: '个人资料', icon: 'user', href: '/profile' },
    { key: 'settings', label: '账户设置', icon: 'settings', href: '/settings' },
    { key: 'billing', label: '账单管理', icon: 'credit-card', href: '/billing' },
    { key: 'help', label: '帮助中心', icon: 'help', href: '/help' },
    { key: 'logout', label: '退出登录', icon: 'logout', onClick: onLogout, danger: true },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* 通知按钮 */}
      <TechButton variant="ghost" icon="bell" iconOnly />
      
      {/* 用户中心 */}
      <TechUserCenter
        username={user.name}
        userInfo={user.role}
        avatar={user.avatar}
        items={menuItems}
        size="small"
        showUsername={false}
      />
    </div>
  );
}
```

### 2. 侧边栏用户信息

```tsx
function SidebarUserInfo({ user }) {
  const menuItems = [
    { key: 'profile', label: '查看资料', icon: 'user' },
    { key: 'edit', label: '编辑资料', icon: 'edit' },
    { key: 'logout', label: '切换账户', icon: 'logout' },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      borderTop: '1px solid var(--tech-border)',
      marginTop: 'auto' // 推到底部
    }}>
      <TechUserCenter
        username={user.name}
        userInfo={user.department}
        avatar={user.avatar}
        items={menuItems}
        size="medium"
        showUsername={true}
      />
    </div>
  );
}
```

### 3. 工具栏用户操作

```tsx
function ToolbarUserActions() {
  const userActions = [
    { key: 'save', label: '保存工作', icon: 'save' },
    { key: 'share', label: '分享项目', icon: 'share' },
    { key: 'export', label: '导出数据', icon: 'download' },
    { key: 'settings', label: '工作区设置', icon: 'settings' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px 12px',
      backgroundColor: 'var(--tech-panel)',
      borderRadius: '6px'
    }}>
      {/* 工具按钮 */}
      <TechButton variant="toggle" icon="save" iconOnly />
      <TechButton variant="toggle" icon="undo" iconOnly />
      <TechButton variant="toggle" icon="redo" iconOnly />
      
      {/* 分隔线 */}
      <div style={{ 
        width: '1px', 
        height: '20px', 
        backgroundColor: 'var(--tech-border)',
        margin: '0 8px'
      }} />

      {/* 用户操作 */}
      <TechUserCenter
        username="设计师"
        items={userActions}
        size="small"
        showUsername={false}
      />
    </div>
  );
}
```

### 4. 多账户切换

```tsx
function MultiAccountUserCenter() {
  const [currentAccount, setCurrentAccount] = useState('personal');
  
  const accounts = {
    personal: { name: '个人账户', avatar: '/avatars/personal.jpg' },
    company: { name: '企业账户', avatar: '/avatars/company.jpg' },
    team: { name: '团队账户', avatar: '/avatars/team.jpg' },
  };

  const menuItems = [
    { key: 'switch', label: '切换账户', icon: 'switch' },
    { key: 'profile', label: '账户设置', icon: 'settings' },
    { key: 'billing', label: '账单管理', icon: 'credit-card' },
    { key: 'logout', label: '退出登录', icon: 'logout', danger: true },
  ];

  return (
    <TechUserCenter
      username={accounts[currentAccount].name}
      userInfo="多账户管理"
      avatar={accounts[currentAccount].avatar}
      items={menuItems}
      showUsername={true}
    />
  );
}
```

## 权限控制

### 基于角色的菜单

```tsx
function RoleBasedUserCenter({ user }) {
  const getMenuByRole = (role) => {
    const baseMenu = [
      { key: 'profile', label: '个人资料', icon: 'user' },
      { key: 'settings', label: '设置', icon: 'settings' },
    ];

    const roleMenus = {
      admin: [
        ...baseMenu,
        { key: 'admin', label: '管理面板', icon: 'dashboard' },
        { key: 'users', label: '用户管理', icon: 'users' },
        { key: 'system', label: '系统设置', icon: 'tool' },
      ],
      moderator: [
        ...baseMenu,
        { key: 'moderate', label: '内容管理', icon: 'edit' },
        { key: 'reports', label: '举报处理', icon: 'flag' },
      ],
      user: baseMenu,
    };

    return [
      ...(roleMenus[role] || roleMenus.user),
      { key: 'help', label: '帮助', icon: 'help' },
      { key: 'logout', label: '退出', icon: 'logout', danger: true },
    ];
  };

  return (
    <TechUserCenter
      username={user.name}
      userInfo={getRoleDisplayName(user.role)}
      avatar={user.avatar}
      items={getMenuByRole(user.role)}
      showUsername={true}
    />
  );
}
```

### 基于权限的功能

```tsx
function PermissionBasedUserCenter({ user, permissions }) {
  const menuItems = [
    { key: 'profile', label: '个人资料', icon: 'user' },
    
    // 条件渲染菜单项
    ...(permissions.includes('manage_users') ? [
      { key: 'users', label: '用户管理', icon: 'users' }
    ] : []),
    
    ...(permissions.includes('system_settings') ? [
      { key: 'system', label: '系统设置', icon: 'settings' }
    ] : []),
    
    ...(permissions.includes('view_analytics') ? [
      { key: 'analytics', label: '数据分析', icon: 'chart' }
    ] : []),
    
    { key: 'help', label: '帮助', icon: 'help' },
    { key: 'logout', label: '退出', icon: 'logout', danger: true },
  ];

  return (
    <TechUserCenter
      username={user.name}
      userInfo={user.department}
      items={menuItems}
    />
  );
}
```

## 状态管理集成

### Redux 集成

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from './userSlice';

function ReduxUserCenter() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const menuItems = [
    { 
      key: 'profile', 
      label: '个人资料', 
      icon: 'user',
      onClick: () => dispatch(updateProfile())
    },
    { 
      key: 'logout', 
      label: '退出登录', 
      icon: 'logout', 
      onClick: () => dispatch(logout()),
      danger: true 
    },
  ];

  return (
    <TechUserCenter
      username={user.name}
      userInfo={user.role}
      avatar={user.avatar}
      items={menuItems}
      showUsername={true}
    />
  );
}
```

### Context 集成

```tsx
import { useAuth } from './AuthContext';

function ContextUserCenter() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <TechButton variant="primary" size="small">
        登录
      </TechButton>
    );
  }

  const menuItems = [
    { key: 'profile', label: '个人资料', icon: 'user' },
    { key: 'settings', label: '设置', icon: 'settings' },
    { key: 'logout', label: '退出登录', icon: 'logout', onClick: logout, danger: true },
  ];

  return (
    <TechUserCenter
      username={user.name}
      userInfo={user.email}
      avatar={user.avatar}
      items={menuItems}
    />
  );
}
```

## 自定义样式

### 头像样式定制

```tsx
<TechUserCenter
  username="自定义头像"
  className="custom-user-center"
/>
```

```css
.custom-user-center .tech-user-center-avatar {
  border: 2px solid var(--tech-accent);
  box-shadow: 0 0 20px rgba(39, 224, 255, 0.3);
}

.custom-user-center .tech-user-center-avatar:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
```

### 下拉菜单样式定制

```css
.custom-user-center .tech-user-center-dropdown {
  background: linear-gradient(135deg, var(--tech-panel), var(--tech-panel-2));
  border: 1px solid var(--tech-accent);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.custom-user-center .tech-user-center-item:hover {
  background: linear-gradient(90deg, var(--tech-accent), transparent);
}

.custom-user-center .tech-user-center-item.danger {
  color: #ff4757;
}
```

## 常见问题

### 1. 下拉菜单不显示？

检查CSS层级和定位：

```css
.tech-user-center-dropdown {
  z-index: 1000;
  position: absolute;
}
```

### 2. 点击菜单项没有响应？

确保设置了正确的回调：

```tsx
const menuItems = [
  { 
    key: 'profile', 
    label: '个人资料', 
    onClick: () => console.log('点击了个人资料') 
  }
];
```

### 3. 头像不显示？

检查图片路径或提供默认头像：

```tsx
<TechUserCenter
  avatar={user.avatar || '/default-avatar.png'}
  username={user.name}
/>
```

### 4. 如何添加分隔线？

在菜单项中添加空项：

```tsx
const menuItems = [
  { key: 'profile', label: '个人资料', icon: 'user' },
  { key: 'divider-1', label: '', icon: undefined }, // 分隔线
  { key: 'logout', label: '退出', icon: 'logout', danger: true },
];
```

### 5. 移动端适配问题？

使用响应式尺寸：

```tsx
const [isMobile, setIsMobile] = useState(false);

<TechUserCenter
  size={isMobile ? 'small' : 'medium'}
  showUsername={!isMobile}
/>
```