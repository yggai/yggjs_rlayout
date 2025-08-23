import React from 'react';
import { useBreakpoint, Breakpoint } from '../grid/breakpoints';

/**
 * 容器组件的变体类型
 * - fixed: 固定宽度容器，居中显示
 * - fluid: 流式容器，占满全部宽度
 * - responsive: 响应式容器，根据断点自动切换
 */
export type ContainerVariant = 'fixed' | 'fluid' | 'responsive';

/**
 * 容器组件的属性接口
 */
export type ContainerProps = React.PropsWithChildren<{
  /** 容器变体，默认为 'fixed' */
  variant?: ContainerVariant;
  /** 响应式模式下的断点阈值，默认为 'md' */
  breakpoint?: Exclude<Breakpoint, 'xs'>;
  /** 固定/响应式模式下的最大宽度，默认为 1200px */
  maxWidth?: number | string;
  /** 水平内边距（像素），默认为 16px */
  paddingX?: number;
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
 * 容器组件
 * 
 * 用于包装页面内容，提供固定宽度、流式布局或响应式布局的容器。
 * 支持自动居中、最大宽度限制和水平内边距设置。
 * 
 * @example
 * ```tsx
 * // 固定宽度容器
 * <Container variant="fixed" maxWidth={1200}>
 *   <h1>页面内容</h1>
 * </Container>
 * 
 * // 流式容器
 * <Container variant="fluid">
 *   <h1>全宽内容</h1>
 * </Container>
 * 
 * // 响应式容器
 * <Container variant="responsive" breakpoint="lg">
 *   <h1>响应式内容</h1>
 * </Container>
 * ```
 */
export function Container({ variant='fixed', breakpoint='md', maxWidth=1200, paddingX=16, as='div', className, style, children, 'data-testid': dataTestId }: ContainerProps) {
  // 获取当前屏幕断点
  const bp = useBreakpoint();
  
  /**
   * 判断当前断点是否达到或超过指定阈值
   * @param bp 当前断点
   * @param thr 阈值断点
   * @returns 是否达到或超过阈值
   */
  const isAtOrAbove = (bp: Breakpoint, thr: Breakpoint) => {
    const order: Breakpoint[] = ['xs','sm','md','lg','xl'];
    return order.indexOf(bp) >= order.indexOf(thr);
  };

  // 判断是否应该使用固定宽度样式
  const isFixed = variant === 'fixed' || (variant === 'responsive' && isAtOrAbove(bp, breakpoint));

  // 构建容器样式
  const styles: React.CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    // 固定模式下设置最大宽度
    maxWidth: isFixed ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
    // 固定模式下居中显示
    marginLeft: isFixed ? 'auto' : undefined,
    marginRight: isFixed ? 'auto' : undefined,
    // 设置水平内边距
    paddingLeft: paddingX ? `${paddingX}px` : undefined,
    paddingRight: paddingX ? `${paddingX}px` : undefined,
    // 合并用户传入的自定义样式
    ...style,
  };

  // 动态渲染指定的HTML元素
  const El = as as any;
  return <El className={className} style={styles} data-testid={dataTestId}>{children}</El>;
}

