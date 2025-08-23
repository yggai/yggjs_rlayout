import React from 'react';

/**
 * Header 组件的属性类型定义
 * @description 定义了页面头部组件所有可配置的属性
 */
export type HeaderProps = React.PropsWithChildren<{
  /** 渲染的 HTML 元素标签，默认为 'header' */
  as?: keyof JSX.IntrinsicElements;
  /** 是否启用粘性定位 (position: sticky) */
  sticky?: boolean;
  /** 是否启用固定定位 (position: fixed) */
  fixed?: boolean;
  /** 当使用 sticky 或 fixed 定位时，距离顶部的像素距离，默认为 0 */
  top?: number;
  /** 头部的高度（像素），不设置则由内容决定 */
  height?: number;
  /** CSS 类名前缀，默认为 'ygg' */
  prefixCls?: string;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 测试标识符 */
  'data-testid'?: string;
}>;

/**
 * Header 头部组件
 * @description 用于创建页面或区域的头部，支持粘性定位和固定定位
 * @param props - Header组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Header>
 *   <h1>网站标题</h1>
 * </Header>
 * 
 * // 粘性头部，高度60px
 * <Header sticky height={60}>
 *   <nav>导航菜单</nav>
 * </Header>
 * 
 * // 固定头部，距顶部10px
 * <Header fixed top={10} height={80}>
 *   <div>固定头部内容</div>
 * </Header>
 * ```
 */
export function Header({ as='header', sticky=false, fixed=false, top=0, height, prefixCls='ygg', className, style, children, 'data-testid': dataTestId }: HeaderProps) {
  // 动态确定要渲染的HTML元素类型
  const El = as as any;
  
  // 构建头部组件的样式对象
  const styles: React.CSSProperties = {
    display: 'flex', // 使用弹性布局
    alignItems: 'center', // 垂直居中对齐
    boxSizing: 'border-box', // 盒模型包含内边距和边框
    width: fixed ? '100%' : undefined, // 固定定位时宽度100%
    position: sticky ? 'sticky' : fixed ? 'fixed' : undefined, // 根据props设置定位方式
    top: sticky || fixed ? `${top}px` : undefined, // 设置距顶部距离
    left: fixed ? 0 : undefined, // 固定定位时左边距为0
    right: fixed ? 0 : undefined, // 固定定位时右边距为0
    height: height !== undefined ? `${height}px` : undefined, // 设置高度
    ...style, // 合并自定义样式
  };
  
  // 构建CSS类名字符串
  const cls = [
    `${prefixCls}-header`, // 基础类名
    sticky ? `${prefixCls}-header-sticky` : undefined, // 粘性定位类名
    fixed ? `${prefixCls}-header-fixed` : undefined, // 固定定位类名
    className, // 自定义类名
  ].filter(Boolean).join(' ');
  
  return (
    <El className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

