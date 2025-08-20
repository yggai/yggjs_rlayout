# Row / Column 栅格系统（v0.1.0）

本版本提供一个与 Bootstrap 设计理念兼容的 12 栅格布局系统：
- Row 是行容器，负责水平排列与 gutter（间距）管理
- Column 是列元素，负责 span（所占列数）与 offset（左侧偏移列数）
- 默认总列数为 12，span + offset 不应超过 12

## API

Row
- gutter?: number  水平间距（px），将平均分配到列左右 padding，并在行上设置负 margin
- gutterX?: number 水平间距（px），优先级高于 gutter
- gutterY?: number 垂直间距（px），会在 Row 上设置上下负 margin，在 Column 上分配上下 padding

Column
- span?: number    取值 1..12，默认 12
- offset?: number  取值 0..11，左侧空出 offset 列
- spanSm/spanMd/spanLg/spanXl?: number 响应式列宽覆盖
- offsetSm/offsetMd/offsetLg/offsetXl?: number 响应式偏移覆盖

GridConfigProvider（可选）
- totalColumns?: number 默认 12，可切换到 24 等
- breakpoints?: { sm, md, lg, xl } 断点表覆盖（xs 固定为 0）

## 用法
```tsx
import { Row, Column } from 'yggjs_rlayout';

export default function Demo() {
  return (
    <>
      <Row gutter={16}>
        <Column span={6}><div className="box">span=6</div></Column>
        <Column span={6}><div className="box">span=6</div></Column>
      </Row>

      <Row gutter={16}>
        <Column span={6} offset={3}><div className="box">span=6 offset=3</div></Column>
      </Row>
    </>
  );
}
```

## 实现要点
- Row 使用 flex 布局并可换行（flex-wrap: wrap）
- gutter 的一半分配到 Column 左右 padding，Row 设置负 margin 抵消
- Column 的宽度按 (span / 12 * 100%) 计算，offset 转换为 margin-left 百分比

## 注意事项
- 建议在 Column 内部包裹内容容器（如 .box）以便自定义样式
- 复杂响应式断点将在后续版本提供（如 md / lg / xl）

