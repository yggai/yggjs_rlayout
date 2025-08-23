import React from 'react';

/**
 * CSS Grid 组件的属性接口
 */
export type GridProps = React.PropsWithChildren<{
  /** 列定义，数字表示等宽列数，字符串表示自定义模板 */
  columns?: number | string;
  /** 行定义，数字表示自动高度行数，字符串表示自定义模板 */
  rows?: number | string;
  /** 网格间距，可以是数字(px)或对象{x,y} */
  gap?: number | { x?: number; y?: number };
  /** 网格自动流向 */
  autoFlow?: React.CSSProperties['gridAutoFlow'];
  /** 渲染的HTML元素标签，默认为 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 测试ID，用于自动化测试 */
  'data-testid'?: string;
}>;

/**
 * CSS Grid 网格布局组件
 * 
 * 基于 CSS Grid 的二维布局组件，提供强大的网格布局能力。
 * 支持灵活的行列定义、间距设置和自动流向控制。
 * 
 * @example
 * ```tsx
 * // 基本用法 - 3列等宽网格
 * <Grid columns={3} gap={16}>
 *   <div>项目1</div>
 *   <div>项目2</div>
 *   <div>项目3</div>
 * </Grid>
 * 
 * // 自定义列模板
 * <Grid columns="200px 1fr 100px" rows={2}>
 *   <div>固定宽度</div>
 *   <div>弹性宽度</div>
 *   <div>固定宽度</div>
 * </Grid>
 * 
 * // 复杂网格布局
 * <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap={{ x: 20, y: 10 }}>
 *   <div>响应式项目1</div>
 *   <div>响应式项目2</div>
 * </Grid>
 * ```
 */
export function Grid({ columns = 1, rows, gap, autoFlow, as='div', className, style, children, 'data-testid': dataTestId }: GridProps) {
  // 动态渲染指定的HTML元素
  const El = as as any;
  
  // 处理列定义：数字转换为等宽列，字符串直接使用
  const cols = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
  
  // 处理行定义：数字转换为自动高度行，字符串直接使用
  const rws = rows === undefined ? undefined : typeof rows === 'number' ? `repeat(${rows}, auto)` : rows;

  // 处理间距值
  const isNumberGap = typeof gap === 'number';
  const gapX = isNumberGap ? gap : gap?.x;
  const gapY = isNumberGap ? gap : gap?.y;
  
  // 根据gap类型构建CSS gap值
  const gapValue = isNumberGap
    ? `${gap}px`  // 统一间距
    : gapX !== undefined && gapY !== undefined
      ? `${gapY}px ${gapX}px`  // 行间距 列间距
      : gapX !== undefined
        ? `${gapX}px`  // 仅列间距
        : gapY !== undefined
          ? `${gapY}px`  // 仅行间距
          : undefined;

  // 构建Grid容器样式
  const styles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: cols,
    gridTemplateRows: rws,
    gridAutoFlow: autoFlow,
    gap: gapValue,
    // 合并用户传入的自定义样式
    ...style,
  };

  return <El className={className} style={styles} data-testid={dataTestId}>{children}</El>;
}

/**
 * Grid 项目组件的属性接口
 */
export type GridItemProps = React.PropsWithChildren<{
  /** 跨列数，'auto'表示自动 */
  colSpan?: number | 'auto';
  /** 跨行数，'auto'表示自动 */
  rowSpan?: number | 'auto';
  /** 渲染的HTML元素标签，默认为 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 测试ID，用于自动化测试 */
  'data-testid'?: string;
}>;

/**
 * Grid 项目组件
 * 
 * 用于控制 Grid 容器中单个项目的跨行跨列行为。
 * 可以设置项目占用多少列或多少行的空间。
 * 
 * @example
 * ```tsx
 * <Grid columns={4}>
 *   <Grid.Item colSpan={2}>跨2列</Grid.Item>
 *   <Grid.Item>普通项目</Grid.Item>
 *   <Grid.Item colSpan={3} rowSpan={2}>跨3列2行</Grid.Item>
 * </Grid>
 * ```
 */
Grid.Item = function GridItem({ colSpan='auto', rowSpan='auto', as='div', className, style, children, 'data-testid': dataTestId }: GridItemProps) {
  // 动态渲染指定的HTML元素
  const El = as as any;
  
  // 构建Grid项目样式
  const s: React.CSSProperties = {
    // 设置跨列：auto表示自动，数字表示跨指定列数
    gridColumn: colSpan === 'auto' ? undefined : `span ${colSpan}`,
    // 设置跨行：auto表示自动，数字表示跨指定行数
    gridRow: rowSpan === 'auto' ? undefined : `span ${rowSpan}`,
    // 合并用户传入的自定义样式
    ...style,
  };
  
  return <El className={className} style={s} data-testid={dataTestId}>{children}</El>;
};

