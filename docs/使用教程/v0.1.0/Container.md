# Container 组件 v0.1.0

提供三种常见容器模式：固定宽度（.container）、流式（.container-fluid）、响应式（.container-md）。强调“无样式/低样式”输出，样式可轻松自定义。

## API
- variant?: 'fixed' | 'fluid' | 'responsive'（默认 fixed）
- breakpoint?: 'sm' | 'md' | 'lg' | 'xl'（用于 responsive 模式的阈值，默认 md）
- maxWidth?: number | string 固定/响应式时的最大宽度（如 960 或 '1200px'）
- paddingX?: number 横向内边距（px，默认 16）
- as?: keyof JSX.IntrinsicElements（默认 div）
- className?: string; style?: React.CSSProperties

## 模式说明
- fixed（.container）：居中（margin: 0 auto），受 maxWidth 限制
- fluid（.container-fluid）：始终 100% 宽度
- responsive（.container-md）：低于 breakpoint 时等同 fluid；达到阈值及以上表现为 fixed

## 用法
```tsx
import { Container } from 'yggjs_rlayout';

export default function Demo(){
  return (
    <>
      {/* 固定宽度 */}
      <Container variant="fixed" maxWidth={960} paddingX={16}>
        <div className="box">fixed 960px</div>
      </Container>

      {/* 流式 */}
      <Container variant="fluid" paddingX={16}>
        <div className="box">fluid 100%</div>
      </Container>

      {/* 响应式（md 起生效）*/}
      <Container variant="responsive" breakpoint="md" maxWidth={960}>
        <div className="box">responsive md</div>
      </Container>
    </>
  );
}
```

## 实现要点
- 使用 BreakpointProvider/Context 获取当前断点
- 仅输出必要样式：width、maxWidth、margin、padding；视觉样式交由使用者控制
- 保持可扩展：支持 as、自定义 className/style

