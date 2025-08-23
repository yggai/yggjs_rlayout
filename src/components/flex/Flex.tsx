import React from 'react';

/**
 * Flex 组件的属性接口
 */
export type FlexProps = React.PropsWithChildren<{
  /** Flex 容器的主轴方向 */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** 交叉轴上的对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** 主轴上的对齐方式 */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** 是否允许换行 */
  wrap?: boolean;
  /** 项目之间的间距，可以是数字(px)或对象{x,y} */
  gap?: number | { x?: number; y?: number };
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
 * Flex 弹性布局组件
 * 
 * 基于 CSS Flexbox 的布局组件，提供灵活的一维布局能力。
 * 支持方向控制、对齐方式、换行和间距设置。
 * 
 * @example
 * ```tsx
 * // 基本用法
 * <Flex direction="row" align="center" justify="space-between">
 *   <div>项目1</div>
 *   <div>项目2</div>
 * </Flex>
 * 
 * // 带间距
 * <Flex gap={16}>
 *   <div>项目1</div>
 *   <div>项目2</div>
 * </Flex>
 * 
 * // 自定义间距
 * <Flex gap={{ x: 16, y: 8 }}>
 *   <div>项目1</div>
 *   <div>项目2</div>
 * </Flex>
 * ```
 */
export function Flex({
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  as = 'div',
  className,
  style,
  children,
  'data-testid': dataTestId
}: FlexProps) {
  // 动态渲染指定的HTML元素
  const El = as as any;
  
  // 判断是否为行方向
  const isRow = direction.startsWith('row');
  
  // 处理间距值
  const isNumberGap = typeof gap === 'number';
  const gapX = isNumberGap ? gap : gap?.x;
  const gapY = isNumberGap ? gap : gap?.y;
  
  // 根据gap类型构建CSS gap值
  const gapValue = isNumberGap
    ? `${gap}px`  // 统一间距
    : gapX !== undefined && gapY !== undefined
      ? `${gapY}px ${gapX}px`  // 垂直和水平间距
      : gapX !== undefined
        ? `${gapX}px`  // 仅水平间距
        : gapY !== undefined
          ? `${gapY}px`  // 仅垂直间距
          : undefined;

  // 构建Flex容器样式
  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    // 处理align属性的CSS映射
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    // 处理justify属性的CSS映射
    justifyContent:
      justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: gapValue,
    // 合并用户传入的自定义样式
    ...style
  };

  return (
    <El className={className} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

/**
 * Flex 项目组件的属性接口
 */
export type FlexItemProps = React.PropsWithChildren<{
  /** Flex 项目的排序 */
  order?: number;
  /** Flex 项目的放大比例 */
  grow?: number;
  /** Flex 项目的缩小比例 */
  shrink?: number;
  /** Flex 项目的基础大小 */
  basis?: number | string;
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
 * Flex 项目组件
 * 
 * 用于控制 Flex 容器中单个项目的行为，包括排序、放大缩小比例和基础大小。
 * 
 * @example
 * ```tsx
 * <Flex>
 *   <Flex.Item grow={1}>弹性项目1</Flex.Item>
 *   <Flex.Item grow={2}>弹性项目2</Flex.Item>
 *   <Flex.Item basis="200px">固定项目</Flex.Item>
 * </Flex>
 * ```
 */
Flex.Item = function FlexItem({ order, grow, shrink, basis, as='div', className, style, children, 'data-testid': dataTestId }: FlexItemProps) {
  // 动态渲染指定的HTML元素
  const El = as as any;
  
  // 构建Flex项目样式
  const s: React.CSSProperties = {
    order,
    flexGrow: grow,
    flexShrink: shrink,
    // 处理basis值的单位
    flexBasis: typeof basis === 'number' ? `${basis}px` : basis,
    // 合并用户传入的自定义样式
    ...style,
  };
  
  return <El className={className} style={s} data-testid={dataTestId}>{children}</El>;
};

/**
 * 预设布局组件 - 居中布局
 * 自动设置 align="center" 和 justify="center"
 */
Flex.Center = function FlexCenter(props: FlexProps) {
  const { align, justify, ...rest } = props;
  return <Flex align={align ?? 'center'} justify={justify ?? 'center'} {...rest} />;
};

/**
 * 预设布局组件 - 两端对齐布局
 * 自动设置 align="center" 和 justify="space-between"
 */
Flex.Between = function FlexBetween(props: FlexProps) {
  const { align, justify, ...rest } = props;
  return <Flex align={align ?? 'center'} justify={justify ?? 'space-between'} {...rest} />;
};

/**
 * 预设布局组件 - 环绕分布布局
 * 自动设置 align="center" 和 justify="space-around"
 */
Flex.Around = function FlexAround(props: FlexProps) {
  const { align, justify, ...rest } = props;
  return <Flex align={align ?? 'center'} justify={justify ?? 'space-around'} {...rest} />;
};
