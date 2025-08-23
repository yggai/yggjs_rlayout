import React, { createContext, useContext } from 'react';

/**
 * 栅格间距上下文
 * @description 用于在Row和Column组件间传递间距信息
 */
const GutterContext = createContext<{ x?: number; y?: number } | undefined>(undefined);

/**
 * 获取栅格间距的Hook
 * @description 从上下文中获取当前的栅格间距配置
 * @returns 栅格间距对象，包含x（水平）和y（垂直）间距
 */
export function useGutter() { return useContext(GutterContext); }

/**
 * Row 组件的属性类型定义
 * @description 定义了栅格行组件所有可配置的属性
 */
export type RowProps = React.PropsWithChildren<{
  /** 统一栅格间距（像素），同时设置水平间距 */
  gutter?: number;
  /** 水平栅格间距（像素） */
  gutterX?: number;
  /** 垂直栅格间距（像素） */
  gutterY?: number;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 测试标识符 */
  'data-testid'?: string;
}>;

/**
 * Row 栅格行组件
 * @description 栅格系统的行容器，用于包含多个Column组件并管理它们之间的间距
 * @param props - Row组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础行，无间距
 * <Row>
 *   <Column span={12}>内容1</Column>
 *   <Column span={12}>内容2</Column>
 * </Row>
 * 
 * // 设置水平间距16px
 * <Row gutter={16}>
 *   <Column span={8}>内容1</Column>
 *   <Column span={8}>内容2</Column>
 *   <Column span={8}>内容3</Column>
 * </Row>
 * 
 * // 分别设置水平和垂直间距
 * <Row gutterX={16} gutterY={24}>
 *   <Column span={6}>内容1</Column>
 *   <Column span={6}>内容2</Column>
 *   <Column span={6}>内容3</Column>
 *   <Column span={6}>内容4</Column>
 * </Row>
 * ```
 */
export function Row({ gutter, gutterX, gutterY, className, style, children, 'data-testid': dataTestId }: RowProps) {
  // 计算最终的水平间距，优先级: gutterX > gutter > 0
  const gx = gutterX ?? gutter ?? 0;
  // 计算最终的垂直间距
  const gy = gutterY ?? 0;
  // 计算间距的一半，用于设置负边距
  const halfX = gx / 2;
  const halfY = gy / 2;

  // 行容器的样式
  const rowStyle: React.CSSProperties = {
    display: 'flex', // 使用弹性布局
    flexWrap: 'wrap', // 允许子元素换行
    // 通过负边距抵消子元素的内边距，实现视觉上的对齐
    marginLeft: gx ? `-${halfX}px` : undefined,
    marginRight: gx ? `-${halfX}px` : undefined,
    marginTop: gy ? `-${halfY}px` : undefined,
    marginBottom: gy ? `-${halfY}px` : undefined,
    ...style // 合并自定义样式
  };
  
  return (
    <GutterContext.Provider value={{ x: gx || undefined, y: gy || undefined }}>
      <div className={className} style={rowStyle} data-testid={dataTestId}>
        {children}
      </div>
    </GutterContext.Provider>
  );
}

