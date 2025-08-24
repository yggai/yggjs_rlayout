# TechThemeProvider 主题提供器

## 简介

`TechThemeProvider` 是科技风组件库的主题管理组件，为整个应用提供统一的科技风视觉主题，包括颜色、效果、渐变等配置。

## 基础使用

### 使用默认主题

```tsx
import { TechThemeProvider, TechButton, TechCard } from 'yggjs_rlayout/tech';

function App() {
  return (
    <TechThemeProvider>
      <div>
        <TechButton variant="primary">按钮</TechButton>
        <TechCard title="卡片">内容</TechCard>
      </div>
    </TechThemeProvider>
  );
}
```

### 自定义主题

```tsx
<TechThemeProvider theme={{
  colors: {
    accent: '#ff6b35',    // 自定义强调色
    primary: '#4CAF50',   // 自定义主色
  }
}}>
  <App />
</TechThemeProvider>
```

## 完整示例

```tsx
import { TechThemeProvider, TechLayout, TechCard, TechButton } from 'yggjs_rlayout/tech';

function CustomThemeApp() {
  // 自定义主题配置
  const customTheme = {
    colors: {
      // 调整强调色为橙色
      accent: '#ff6b35',
      // 调整主色调为绿色
      primary: '#4CAF50',
      // 自定义文本颜色
      text: '#e8f4fd',
    },
    effects: {
      // 调整发光效果颜色
      glow: '0 0 0 1px rgba(255,107,53,.16), 0 0 0 2px rgba(76,175,80,.08), 0 8px 30px rgba(25,34,83,.45)',
    }
  };

  const menuItems = [
    { key: 'dashboard', label: '仪表板', icon: 'dashboard' },
    { key: 'users', label: '用户管理', icon: 'users' },
    { key: 'settings', label: '设置', icon: 'settings' },
  ];

  return (
    <TechThemeProvider theme={customTheme}>
      <TechLayout
        brand="自定义主题应用"
        sidebarItems={menuItems}
        selectedSidebarKey="dashboard"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <TechCard title="主色调展示" variant="outlined">
            <p>这个卡片使用了自定义的绿色主题</p>
            <TechButton variant="primary">主要按钮</TechButton>
          </TechCard>

          <TechCard title="强调色展示" variant="glass">
            <p>强调色已改为橙色</p>
            <div style={{ color: 'var(--tech-accent)' }}>
              这段文字使用强调色
            </div>
          </TechCard>
        </div>
      </TechLayout>
    </TechThemeProvider>
  );
}
```

## 属性详解

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | **必填** | 需要应用主题的子组件 |
| `theme` | `Partial<TechTheme>` | - | 自定义主题配置，会与默认主题合并 |

## 主题配置结构

### 颜色配置 (colors)

```tsx
const theme = {
  colors: {
    bg: '#0a0f1e',        // 主背景色 - 深夜蓝
    panel: '#0e1630',     // 面板背景色 - 科技蓝
    panel2: '#0a1128',    // 次级面板背景色 - 更深的科技蓝
    muted: '#7c89bf',     // 弱化文本颜色 - 中性蓝灰
    primary: '#5aa2ff',   // 主色调 - 科技蓝
    accent: '#27e0ff',    // 强调色 - 青色荧光
    border: '#1b2550',    // 边框颜色 - 深蓝边框
    ring: '#2242a8',      // 焦点环颜色 - 深蓝焦点
    text: '#cfe1ff',      // 主文本颜色 - 淡蓝白色
    textMuted: '#9ca3af'  // 次要文本颜色 - 灰色
  }
};
```

### 效果配置 (effects)

```tsx
const theme = {
  effects: {
    // 发光效果 - 多层青色/蓝色发光
    glow: '0 0 0 1px rgba(39,224,255,.16), 0 0 0 2px rgba(90,162,255,.08), 0 8px 30px rgba(25,34,83,.45)',
    // 毛玻璃效果 - 饱和度增强和模糊
    backdrop: 'saturate(140%) blur(10px)'
  }
};
```

### 渐变配置 (gradients)

```tsx
const theme = {
  gradients: {
    // 页面背景渐变 - 双侧径向渐变营造科技氛围
    background: `
      radial-gradient(1200px 800px at 20% -200px, rgba(39,224,255,.06), transparent 60%),
      radial-gradient(1200px 800px at 120% -200px, rgba(90,162,255,.06), transparent 60%)
    `,
    // 侧边栏渐变 - 从青色到蓝色的垂直渐变
    sidebar: 'linear-gradient(180deg, rgba(39,224,255,.06), rgba(90,162,255,.04))',
    // 卡片渐变 - 微妙的白色渐变增强层次感
    card: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))'
  }
};
```

## 使用主题Hook

在组件中获取当前主题配置：

```tsx
import { useTechTheme } from 'yggjs_rlayout/tech';

function MyCustomComponent() {
  const theme = useTechTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.panel,
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.effects.glow
    }}>
      使用主题配置的自定义组件
    </div>
  );
}
```

## CSS 变量

主题提供器会自动注入以下CSS变量，可在样式中直接使用：

```css
.my-component {
  background-color: var(--tech-panel);
  color: var(--tech-text);
  border: 1px solid var(--tech-border);
  box-shadow: var(--tech-glow);
}
```

### 可用的CSS变量

| CSS变量 | 对应主题属性 | 说明 |
|---------|-------------|------|
| `--tech-bg` | `colors.bg` | 主背景色 |
| `--tech-panel` | `colors.panel` | 面板背景色 |
| `--tech-panel-2` | `colors.panel2` | 次级面板背景色 |
| `--tech-muted` | `colors.muted` | 弱化文本色 |
| `--tech-primary` | `colors.primary` | 主色调 |
| `--tech-accent` | `colors.accent` | 强调色 |
| `--tech-border` | `colors.border` | 边框色 |
| `--tech-ring` | `colors.ring` | 焦点环色 |
| `--tech-text` | `colors.text` | 主文本色 |
| `--tech-text-muted` | `colors.textMuted` | 次要文本色 |
| `--tech-glow` | `effects.glow` | 发光效果 |
| `--tech-backdrop` | `effects.backdrop` | 毛玻璃效果 |

## 主题定制示例

### 1. 品牌主题

```tsx
// 调整为企业品牌色
const brandTheme = {
  colors: {
    primary: '#1890ff',   // 企业蓝
    accent: '#52c41a',    // 企业绿
  }
};

<TechThemeProvider theme={brandTheme}>
  <App />
</TechThemeProvider>
```

### 2. 暖色调主题

```tsx
// 暖色调科技风格
const warmTheme = {
  colors: {
    accent: '#ff4757',    // 红色强调
    primary: '#ff6348',   // 橙色主色
  },
  effects: {
    glow: '0 0 0 1px rgba(255,71,87,.16), 0 0 0 2px rgba(255,99,72,.08), 0 8px 30px rgba(83,25,25,.45)',
  }
};

<TechThemeProvider theme={warmTheme}>
  <App />
</TechThemeProvider>
```

### 3. 高对比度主题

```tsx
// 高对比度主题，适合无障碍访问
const highContrastTheme = {
  colors: {
    bg: '#000000',
    panel: '#1a1a1a',
    text: '#ffffff',
    accent: '#00ffff',
    primary: '#0080ff',
    border: '#444444',
  }
};

<TechThemeProvider theme={highContrastTheme}>
  <App />
</TechThemeProvider>
```

### 4. 自定义渐变主题

```tsx
// 紫色渐变主题
const purpleTheme = {
  colors: {
    primary: '#8b5cf6',
    accent: '#a855f7',
  },
  gradients: {
    background: `
      radial-gradient(1200px 800px at 20% -200px, rgba(139,92,246,.08), transparent 60%),
      radial-gradient(1200px 800px at 120% -200px, rgba(168,85,247,.06), transparent 60%)
    `,
    sidebar: 'linear-gradient(180deg, rgba(139,92,246,.06), rgba(168,85,247,.04))',
  }
};

<TechThemeProvider theme={purpleTheme}>
  <App />
</TechThemeProvider>
```

## 嵌套主题提供器

支持在应用的不同部分使用不同主题：

```tsx
function App() {
  return (
    <TechThemeProvider>
      {/* 默认主题的应用主体 */}
      <TechLayout>
        <div>主应用内容</div>
        
        {/* 特殊区域使用不同主题 */}
        <TechThemeProvider theme={{ colors: { accent: '#ff6b35' } }}>
          <TechCard title="特殊主题区域">
            这个区域使用橙色强调色
          </TechCard>
        </TechThemeProvider>
      </TechLayout>
    </TechThemeProvider>
  );
}
```

## 最佳实践

### 1. 根节点使用

建议在应用的根节点使用主题提供器：

```tsx
// main.tsx 或 App.tsx
import { TechThemeProvider } from 'yggjs_rlayout/tech';

ReactDOM.render(
  <TechThemeProvider>
    <App />
  </TechThemeProvider>,
  document.getElementById('root')
);
```

### 2. 主题一致性

确保自定义主题保持视觉一致性：

```tsx
const consistentTheme = {
  colors: {
    // 确保主色和强调色有适当的对比度
    primary: '#4CAF50',
    accent: '#8BC34A',    // 相近的色调
    // 保持文本颜色的可读性
    text: '#e8f5e8',      // 与绿色主题协调的文本色
  }
};
```

### 3. 动态主题切换

```tsx
function ThemeableApp() {
  const [currentTheme, setCurrentTheme] = useState('default');
  
  const themes = {
    default: {},
    warm: { colors: { accent: '#ff4757', primary: '#ff6348' } },
    cool: { colors: { accent: '#3742fa', primary: '#2f3542' } },
  };

  return (
    <TechThemeProvider theme={themes[currentTheme]}>
      <div>
        <select value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
          <option value="default">默认主题</option>
          <option value="warm">暖色主题</option>
          <option value="cool">冷色主题</option>
        </select>
        <App />
      </div>
    </TechThemeProvider>
  );
}
```

## 常见问题

### 1. 主题不生效？

确保组件被 `TechThemeProvider` 包裹：

```tsx
// ❌ 错误：没有主题提供器
<TechButton>按钮</TechButton>

// ✅ 正确：包裹在主题提供器中
<TechThemeProvider>
  <TechButton>按钮</TechButton>
</TechThemeProvider>
```

### 2. 如何重置主题？

传入空对象或 undefined 来使用默认主题：

```tsx
<TechThemeProvider theme={{}}>
  <App />
</TechThemeProvider>
```

### 3. 主题切换有延迟？

主题切换是即时的，如果感觉有延迟可能是CSS过渡效果：

```css
/* 为主题切换添加过渡效果 */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

### 4. 如何在非React组件中使用主题？

可以通过CSS变量在任何地方使用主题：

```css
.external-component {
  background: var(--tech-panel);
  color: var(--tech-text);
}
```