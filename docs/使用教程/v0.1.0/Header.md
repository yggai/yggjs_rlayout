# Header 组件 v0.1.0

一个语义化的页头容器，默认渲染为 <header>，提供 sticky/fixed 两种常用定位方式。遵循“无样式/低样式”，可轻松自定义样式。

## API
- as?: keyof JSX.IntrinsicElements（默认 'header'）
- sticky?: boolean（position: sticky；可配合 top）
- fixed?: boolean（position: fixed；可配合 top、height；width: 100%）
- top?: number（px）
- height?: number（px）
- className?: string；style?: React.CSSProperties
- children

注意：sticky 与 fixed 不应同时为 true；若同时传入，组件优先 sticky。

## 用法
```tsx
import { Header, Container } from 'yggjs_rlayout';

export default function Demo(){
  return (
    <>
      {/* 常规 Header（容器包裹）*/}
      <Header style={{ background: '#0e1630', borderBottom: '1px solid #1b2550' }}>
        <Container variant="fluid" paddingX={16}>
          <h1 style={{ margin: 0, fontSize: 18 }}>Site Title</h1>
        </Container>
      </Header>

      {/* 吸顶 Header */}
      <Header sticky top={0} style={{ background: '#0e1630' }}>
        <Container variant="fluid" paddingX={16}>Sticky</Container>
      </Header>

      {/* 固定 Header + 内容区留白 */}
      <Header fixed top={0} height={64} style={{ background: '#0e1630' }}>
        <Container variant="fluid" paddingX={16}>Fixed</Container>
      </Header>
      <main style={{ paddingTop: 64 }}>内容区...</main>
    </>
  );
}
```

## 实现要点
- 语义元素默认 <header>，可通过 as 自定义
- sticky/fixed 时设置 position 与 top；fixed 额外设置 width: 100%
- height 可用于固定高度的布局（如与内容 paddingTop 配合）
- 不注入视觉样式，主题色、阴影、间距交由使用者控制

