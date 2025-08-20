# Sidebar 组件 v0.1.0

语义化侧边栏容器，默认渲染为 <aside>，支持左/右侧、sticky/fixed 两种定位方式。坚持“无样式/低样式”设计，方便二次定制。

## API
- as?: keyof JSX.IntrinsicElements（默认 'aside'）
- side?: 'left' | 'right'（默认 'left'）
- sticky?: boolean（position: sticky；配合 top 生效）
- fixed?: boolean（position: fixed；配合 top/width 生效）
- width?: number | string（如 240 或 '20rem'）
- top?: number（px，用于 sticky/fixed 的顶部留白）
- className?: string；style?: React.CSSProperties
- children

注意：sticky 与 fixed 不应同时为 true；若同时传入，组件优先 sticky。

## 用法
```tsx
import { Sidebar, Container } from 'yggjs_rlayout';

export default function Demo(){
  return (
    <div style={{ minHeight: 600 }}>
      {/* 左侧 fixed 侧边栏（内容需留白）*/}
      <Sidebar fixed width={240} top={0} style={{ background: '#0e1630' }}>
        <div style={{ padding: 16 }}>Fixed Left</div>
      </Sidebar>
      <div style={{ paddingLeft: 240 }}>
        <div style={{ height: 200 }}>内容区</div>
      </div>

      {/* 右侧 sticky 侧边栏 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        <div>
          <div style={{ height: 800 }}>长内容用于滚动</div>
        </div>
        <Sidebar sticky side="right" top={16} style={{ background: '#0e1630' }}>
          <div style={{ padding: 16 }}>Sticky Right</div>
        </Sidebar>
      </div>
    </div>
  );
}
```

## 实现要点
- sticky/fixed 时设置 position 与 top；根据 side 设置 left 或 right 为 0
- fixed 模式通常需要为主体内容区域预留与 width 相同的内边距/外边距
- 无内置视觉样式，建议结合 className/style 或设计系统变量统一主题

