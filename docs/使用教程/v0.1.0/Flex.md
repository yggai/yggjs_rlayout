# Flex 组件（v0.1.0）

提供轻量、语义化的 Flex 布局容器，默认无样式输出，可通过 props 快速组合出常见布局场景。

## API
- direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'（默认 row）
- align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
- justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
- wrap?: boolean 是否换行
- gap?: number | { x?: number; y?: number } 间距（px），数字等同于 x/y 相同
- as?: keyof JSX.IntrinsicElements 渲染元素（默认 div）
- className?: string; style?: React.CSSProperties

Flex.Item
- order?: number; grow?: number; shrink?: number; basis?: number | string（如 100 或 '10rem'）
- as?: keyof JSX.IntrinsicElements, className?: string, style?: React.CSSProperties

## 用法示例
```tsx
import { Flex } from 'yggjs_rlayout';

export default function Demo(){
  return (
    <>
      <Flex direction="row" align="center" justify="space-between" gap={12}>
        <Flex.Item grow={1}><div>Left (grow=1)</div></Flex.Item>
        <Flex.Item basis={120}><div>Right (basis=120)</div></Flex.Item>
      </Flex>

      <Flex as="ul" direction="column" wrap gap={{ y: 8 }}>
        <Flex.Item as="li" order={2}>B</Flex.Item>
        <Flex.Item as="li" order={1}>A</Flex.Item>
      </Flex>
    </>
  );
}
```

## 实现要点
- 语义化属性直接映射到 CSS：display:flex、flex-direction、align-items、justify-content、flex-wrap
- gap 支持数字与对象：数字 → "px"，对象 → "y x"/"x"/"y"
- Flex.Item 直接映射 order/flex-grow/flex-shrink/flex-basis；数值 basis 自动加 px
- 组件无内置视觉样式，建议结合类名与自定义样式

