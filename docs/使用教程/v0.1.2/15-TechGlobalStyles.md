# TechGlobalStyles 全局样式组件

## 简介

`TechGlobalStyles` 是科技风格的全局样式组件，为整个应用提供统一的科技风样式基础，包括样式重置、滚动条美化、动画效果和工具类。确保所有组件在统一的样式基础上正常工作。

## 基础使用

### 启用全部功能（推荐）

```tsx
import { TechGlobalStyles } from 'yggjs_rlayout/tech';

function App() {
  return (
    <>
      <TechGlobalStyles />
      <div>您的应用内容</div>
    </>
  );
}
```

### 选择性启用功能

```tsx
// 仅启用滚动条样式
<TechGlobalStyles 
  enableGlobalReset={false}
  enableScrollbarStyling={true}
/>

// 仅启用样式重置
<TechGlobalStyles 
  enableScrollbarStyling={false}
  enableGlobalReset={true}
/>
```

## 完整示例

```tsx
import { TechGlobalStyles, TechCard, TechButton, TechThemeProvider } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function GlobalStylesDemo() {
  const [scrollbarEnabled, setScrollbarEnabled] = useState(true);
  const [resetEnabled, setResetEnabled] = useState(true);

  return (
    <TechThemeProvider>
      {/* 全局样式组件 */}
      <TechGlobalStyles
        enableScrollbarStyling={scrollbarEnabled}
        enableGlobalReset={resetEnabled}
      />

      <div style={{ padding: '20px' }}>
        <TechCard title="全局样式演示">
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#27e0ff', marginBottom: '12px' }}>功能控制</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <TechButton
                variant={scrollbarEnabled ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setScrollbarEnabled(!scrollbarEnabled)}
              >
                {scrollbarEnabled ? '✓' : '✗'} 滚动条样式
              </TechButton>
              <TechButton
                variant={resetEnabled ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setResetEnabled(!resetEnabled)}
              >
                {resetEnabled ? '✓' : '✗'} 样式重置
              </TechButton>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* 滚动条演示 */}
            <div>
              <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>滚动条效果</h4>
              <div style={{
                height: '150px',
                overflow: 'auto',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '6px',
                border: '1px solid var(--tech-border)'
              }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ 
                    padding: '8px 0', 
                    borderBottom: i < 19 ? '1px solid var(--tech-border)' : 'none' 
                  }}>
                    滚动内容项目 #{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* 动画效果演示 */}
            <div>
              <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>CSS动画类</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="tech-glow-pulse" style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--tech-panel)',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  发光脉冲动画
                </div>
                
                <div className="tech-slide-in" style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--tech-panel)',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  滑入动画
                </div>
                
                <div className="tech-fade-in" style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--tech-panel)',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  淡入动画
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>文字效果类</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="tech-text-gradient" style={{ fontSize: '18px', fontWeight: '600' }}>
                渐变文字效果
              </div>
              <div className="tech-text-glow" style={{ fontSize: '16px' }}>
                发光文字效果
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>响应式工具类</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="tech-show-mobile tech-hide-desktop" style={{
                padding: '4px 8px',
                backgroundColor: 'var(--tech-accent)',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                仅移动端显示
              </span>
              <span className="tech-hide-mobile tech-show-desktop" style={{
                padding: '4px 8px',
                backgroundColor: 'var(--tech-primary)',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                仅桌面端显示
              </span>
            </div>
          </div>
        </TechCard>

        {/* 使用说明 */}
        <TechCard title="使用说明" style={{ marginTop: '20px' }}>
          <div style={{ color: '#7c89bf', lineHeight: 1.6 }}>
            <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>主要功能：</h4>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li><strong>样式重置：</strong>提供现代化的CSS重置，确保跨浏览器一致性</li>
              <li><strong>滚动条美化：</strong>科技风格的滚动条，支持悬停发光效果</li>
              <li><strong>动画效果：</strong>内置发光脉冲、滑入、淡入等科技感动画</li>
              <li><strong>工具类：</strong>响应式显示、文本效果等实用工具类</li>
            </ul>

            <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>使用建议：</h4>
            <ul style={{ marginLeft: '20px' }}>
              <li>建议在应用的根组件中使用，确保全局样式生效</li>
              <li>与 TechThemeProvider 配合使用效果最佳</li>
              <li>可以选择性启用功能，避免与现有样式冲突</li>
            </ul>
          </div>
        </TechCard>
      </div>
    </TechThemeProvider>
  );
}
```

## 属性详解

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enableScrollbarStyling` | `boolean` | `true` | 是否启用科技风格滚动条样式 |
| `enableGlobalReset` | `boolean` | `true` | 是否启用全局样式重置 |

## 功能详解

### 1. 全局样式重置

启用后提供以下功能：

- **盒模型统一**：所有元素使用 `border-box`
- **默认边距清除**：清除浏览器默认的 margin 和 padding
- **字体优化**：设置现代化的字体栈
- **链接样式**：优化链接的默认样式
- **表单元素**：统一表单控件的外观

```css
/* 示例：盒模型统一 */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 示例：字体优化 */
body {
  font-family: Inter, system-ui, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

### 2. 科技风滚动条

启用后提供：

- **深色主题**：适配科技风深色背景
- **发光效果**：悬停时显示青色发光边框
- **平滑动画**：过渡动画使交互更流畅
- **跨浏览器**：支持 WebKit 和 Firefox

```css
/* WebKit 滚动条样式示例 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(14, 22, 48, 0.5);
}

::-webkit-scrollbar-thumb {
  background: var(--tech-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--tech-primary);
  box-shadow: 0 0 10px rgba(39, 224, 255, 0.5);
}
```

## 内置动画类

### 发光脉冲动画

```tsx
<div className="tech-glow-pulse">
  会发光脉冲的元素
</div>
```

### 滑入动画

```tsx
<div className="tech-slide-in">
  从右侧滑入的元素
</div>
```

### 淡入动画

```tsx
<div className="tech-fade-in">
  渐显的元素
</div>
```

## 工具类

### 响应式显示

```tsx
// 仅在移动端显示
<div className="tech-show-mobile tech-hide-desktop">
  移动端内容
</div>

// 仅在桌面端显示
<div className="tech-hide-mobile tech-show-desktop">
  桌面端内容
</div>
```

### 文字效果

```tsx
// 渐变文字
<h1 className="tech-text-gradient">
  科技感渐变标题
</h1>

// 发光文字
<p className="tech-text-glow">
  发光的科技文字
</p>
```

## 使用建议

### 1. 与主题提供器配合

```tsx
function App() {
  return (
    <TechThemeProvider>
      <TechGlobalStyles />
      <AppContent />
    </TechThemeProvider>
  );
}
```

### 2. 条件性启用

```tsx
function App() {
  const [useCustomScrollbar, setUseCustomScrollbar] = useState(false);
  
  return (
    <>
      <TechGlobalStyles 
        enableScrollbarStyling={useCustomScrollbar}
      />
      <AppContent />
    </>
  );
}
```

### 3. 与现有样式兼容

```tsx
// 如果已有全局样式重置，可以只启用滚动条
<TechGlobalStyles 
  enableGlobalReset={false}
  enableScrollbarStyling={true}
/>
```

## 自定义扩展

### 添加自定义动画

```tsx
function CustomGlobalStyles() {
  useEffect(() => {
    const customCSS = `
      .my-custom-animation {
        animation: customPulse 2s ease-in-out infinite;
      }
      
      @keyframes customPulse {
        0%, 100% { 
          box-shadow: 0 0 5px var(--tech-accent); 
        }
        50% { 
          box-shadow: 0 0 20px var(--tech-accent), 0 0 30px var(--tech-accent); 
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = customCSS;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <TechGlobalStyles />
      <div className="my-custom-animation">
        自定义动画元素
      </div>
    </>
  );
}
```

### 覆盖默认样式

```css
/* 在您的 CSS 文件中 */
:root {
  /* 覆盖滚动条颜色 */
  --tech-scrollbar-thumb: #ff6b35;
  --tech-scrollbar-track: rgba(255, 107, 53, 0.1);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar-thumb {
  background: var(--tech-scrollbar-thumb) !important;
}

::-webkit-scrollbar-track {
  background: var(--tech-scrollbar-track) !important;
}
```

## 性能注意事项

### 1. 避免重复注入

组件内部已处理重复注入问题，但建议只在应用根部使用一次：

```tsx
// ✅ 推荐：在根组件使用一次
function App() {
  return (
    <>
      <TechGlobalStyles />
      <Routes />
    </>
  );
}

// ❌ 不推荐：多处使用
function Page1() {
  return (
    <>
      <TechGlobalStyles />
      <div>Page 1</div>
    </>
  );
}
```

### 2. 条件加载

```tsx
function App() {
  const [needsGlobalStyles, setNeedsGlobalStyles] = useState(true);
  
  return (
    <>
      {needsGlobalStyles && <TechGlobalStyles />}
      <AppContent />
    </>
  );
}
```

## 浏览器兼容性

### 滚动条样式支持

- **WebKit 内核** (Chrome, Safari, Edge): ✅ 完全支持
- **Firefox**: ✅ 基础支持（使用 `scrollbar-width` 和 `scrollbar-color`）
- **IE/老版本浏览器**: ⚠️ 降级到系统默认滚动条

### CSS 特性支持

- **CSS 自定义属性**: 现代浏览器 ✅
- **CSS Grid/Flexbox**: IE11+ ✅  
- **CSS 动画**: IE10+ ✅
- **backdrop-filter**: 较新浏览器 ✅

## 常见问题

### 1. 滚动条样式不生效？

检查是否有其他CSS覆盖：

```css
/* 确保优先级 */
.my-container ::-webkit-scrollbar {
  width: 8px !important;
}
```

### 2. 与现有样式冲突？

选择性启用功能：

```tsx
<TechGlobalStyles 
  enableGlobalReset={false}  // 关闭样式重置
/>
```

### 3. 动画类不工作？

确保样式已注入：

```tsx
// 确保 TechGlobalStyles 在使用动画类的组件之前
<TechGlobalStyles />
<div className="tech-fade-in">内容</div>
```

### 4. 移动端滚动条问题？

移动端通常隐藏滚动条，这是正常现象：

```css
/* 移动端强制显示滚动条 */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 6px;
    display: block;
  }
}
```

### 5. 服务端渲染 (SSR) 兼容性？

组件已处理 SSR 兼容性，会检查 `document` 对象是否存在。

```tsx
// 在 Next.js 等 SSR 框架中安全使用
function App() {
  return (
    <>
      <TechGlobalStyles />  {/* 自动处理 SSR */}
      <PageContent />
    </>
  );
}
```