import React from 'react';
import { useGutter } from './row';
import { Breakpoint, useBreakpoint } from './breakpoints';
import { useGridConfig } from './config';

/**
 * Column 组件的属性类型定义
 * @description 定义了栅格列组件所有可配置的属性
 */
export type ColumnProps = React.PropsWithChildren<{
  /** 基础栅格占位格数 */
  span?: number;
  /** 基础栅格左侧间隔格数 */
  offset?: number;
  /** 小屏幕(≥576px)时的栅格占位格数 */
  spanSm?: number;
  /** 中等屏幕(≥768px)时的栅格占位格数 */
  spanMd?: number;
  /** 大屏幕(≥992px)时的栅格占位格数 */
  spanLg?: number;
  /** 超大屏幕(≥1200px)时的栅格占位格数 */
  spanXl?: number;
  /** 小屏幕(≥576px)时的左侧间隔格数 */
  offsetSm?: number;
  /** 中等屏幕(≥768px)时的左侧间隔格数 */
  offsetMd?: number;
  /** 大屏幕(≥992px)时的左侧间隔格数 */
  offsetLg?: number;
  /** 超大屏幕(≥1200px)时的左侧间隔格数 */
  offsetXl?: number;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 测试标识符 */
  'data-testid'?: string;
}>;

/**
 * 根据当前断点选择合适的属性值
 * @description 按照断点优先级选择最合适的属性值
 * @param bp - 当前断点
 * @param base - 基础值
 * @param sm - 小屏幕值
 * @param md - 中等屏幕值
 * @param lg - 大屏幕值
 * @param xl - 超大屏幕值
 * @returns 选中的属性值
 */
function pickByBreakpoint<T extends number | undefined>(bp: Breakpoint, base: T, sm?: T, md?: T, lg?: T, xl?: T): T {
  // 超大屏幕：xl > lg > md > sm > base
  if (bp === 'xl') return (xl ?? lg ?? md ?? sm ?? base) as T;
  // 大屏幕：lg > md > sm > base
  if (bp === 'lg') return (lg ?? md ?? sm ?? base) as T;
  // 中等屏幕：md > sm > base
  if (bp === 'md') return (md ?? sm ?? base) as T;
  // 小屏幕：sm > base
  if (bp === 'sm') return (sm ?? base) as T;
  // 超小屏幕：只使用base
  return base;
}

/**
 * Column 栅格列组件
 * @description 栅格系统的列组件，支持响应式布局和多种尺寸配置
 * @param props - Column组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础列，占用12格中的6格
 * <Row>
 *   <Column span={6}>左侧内容</Column>
 *   <Column span={6}>右侧内容</Column>
 * </Row>
 * 
 * // 响应式列，不同屏幕尺寸显示不同格数
 * <Row>
 *   <Column span={24} md={12} lg={8} xl={6}>
 *     响应式内容
 *   </Column>
 * </Row>
 * 
 * // 带间隔的列
 * <Row>
 *   <Column span={8}>内容1</Column>
 *   <Column span={8} offset={8}>内容2（左侧空8格）</Column>
 * </Row>
 * ```
 */
export function Column(props: ColumnProps) {
  const {
    span = undefined,
    offset = 0,
    spanSm, spanMd, spanLg, spanXl,
    offsetSm, offsetMd, offsetLg, offsetXl,
    className,
    style,
    children,
    'data-testid': dataTestId
  } = props;

  // 获取当前断点
  const bp = useBreakpoint();
  // 获取栅格间距
  const gutter = useGutter();
  // 获取栅格配置
  const { totalColumns } = useGridConfig();

  // 根据当前断点选择合适的span和offset值
  const rawSpan = pickByBreakpoint(bp, span ?? totalColumns, spanSm, spanMd, spanLg, spanXl) ?? totalColumns;
  const rawOffset = pickByBreakpoint(bp, offset, offsetSm, offsetMd, offsetLg, offsetXl) ?? 0;

  // 开发时进行数值验证和边界处理
  let effSpan = Math.max(0, Math.min(rawSpan, totalColumns)); // 限制span在0到totalColumns之间
  let effOffset = Math.max(0, Math.min(rawOffset, totalColumns - 1)); // 限制offset在合理范围内
  
  const isDev = typeof globalThis !== 'undefined' && (globalThis as any)?.process?.env?.NODE_ENV !== 'production';
  
  // 检查offset + span是否超出总列数
  if (effOffset + effSpan > totalColumns) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[yggjs_rlayout][Column] offset(${effOffset}) + span(${effSpan}) > total(${totalColumns}), clamped.`);
    }
    effSpan = Math.max(0, totalColumns - effOffset);
  }
  
  // 开发环境下提示参数被调整
  if ((rawSpan ?? 0) !== effSpan || rawOffset !== effOffset) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[yggjs_rlayout][Column] props out of range: span=${rawSpan}, offset=${rawOffset}, total=${totalColumns}. Using span=${effSpan}, offset=${effOffset}.`);
    }
  }

  // 计算宽度和左边距的百分比
  const widthPercent = `${((effSpan / totalColumns) * 100).toFixed(4)}%`;
  const marginLeftPercent = effOffset ? `${(effOffset / totalColumns) * 100}%` : undefined;

  // 计算内边距（基于栅格间距）
  const halfX = gutter?.x ? gutter.x / 2 : 0;
  const halfY = gutter?.y ? gutter.y / 2 : 0;

  // 构建列的样式
  const colStyle: React.CSSProperties = {
    boxSizing: 'border-box', // 包含内边距在内的盒模型
    paddingLeft: gutter?.x ? `${halfX}px` : undefined, // 水平内边距
    paddingRight: gutter?.x ? `${halfX}px` : undefined,
    paddingTop: gutter?.y ? `${halfY}px` : undefined, // 垂直内边距
    paddingBottom: gutter?.y ? `${halfY}px` : undefined,
    width: widthPercent, // 列宽度
    marginLeft: marginLeftPercent, // 左侧间距
    ...style // 合并自定义样式
  };
  
  return (
    <div className={className} style={colStyle} data-testid={dataTestId}>
      {children}
    </div>
  );
}

