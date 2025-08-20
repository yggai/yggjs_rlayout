# Grid 组件（CSS Grid）v0.1.0

一个轻量的 CSS Grid 容器组件，强调“无样式/低样式”输出，便于二次定制。支持列数/行数、间距、自动流向，以及子项的行/列跨度控制。

## API

Grid
- columns?: number | string 列模板。number → repeat(n, 1fr)，string → 直接作为 grid-template-columns
- rows?: number | string 行模板。number → repeat(n, auto)，string → 直接作为 grid-template-rows
- gap?: number | { x?: number; y?: number } 间距（px）。数字等同于 x/y 相同
- autoFlow?: CSSProperties['gridAutoFlow']（如 'row', 'column', 'row dense'）
- as?: keyof JSX.IntrinsicElements 渲染元素，默认 div
- className?: string; style?: React.CSSProperties

Grid.Item
- colSpan?: number | 'auto' 列跨度（span N）
- rowSpan?: number | 'auto' 行跨度（span N）
- as?: keyof JSX.IntrinsicElements，className?: string，style?: React.CSSProperties

## 用法
```tsx
import { Grid } from 'yggjs_rlayout';

export default function Demo(){
  return (
    <>
      {/* 三列等宽 + 12px 间距 */}
      <Grid columns={3} gap={12}>
        <div className="box">A</div>
        <div className="box">B</div>
        <div className="box">C</div>
      </Grid>

      {/* 自定义模板 + Item 跨度 */}
      <Grid columns="200px 1fr 1fr" rows={3} gap={{ x: 12, y: 8 }} autoFlow="row dense">
        <Grid.Item colSpan={2}><div className="box">colSpan=2</div></Grid.Item>
        <Grid.Item rowSpan={2}><div className="box">rowSpan=2</div></Grid.Item>
        <div className="box">X</div>
      </Grid>
    </>
  );
}
```

## 实现要点
- 组件语义直接映射 CSS Grid 属性：display:grid、grid-template-columns/rows、grid-auto-flow、gap
- gap 支持数字与对象，映射为 "y x"、"x"、"y"
- 子项通过 grid-column/grid-row 的 span N 控制跨越
- 保持“易定制”：仅输出必要样式，不引入额外视觉风格

