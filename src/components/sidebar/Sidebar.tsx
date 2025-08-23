import React from 'react';

/**
 * Sidebar 组件的属性类型定义
 * @description 定义了侧边栏组件所有可配置的属性
 */
export type SidebarProps = React.PropsWithChildren<{
  /** 渲染的 HTML 元素标签，默认为 'aside' */
  as?: keyof JSX.IntrinsicElements;
  /** 侧边栏位置，'left' 表示左侧，'right' 表示右侧，默认为 'left' */
  side?: 'left' | 'right';
  /** 是否启用粘性定位 (position: sticky) */
  sticky?: boolean;
  /** 是否启用固定定位 (position: fixed) */
  fixed?: boolean;
  /** 侧边栏宽度，可以是数字（像素）或字符串（如 '200px', '20%'） */
  width?: number | string;
  /** 当使用 sticky 或 fixed 定位时，距离顶部的像素距离，默认为 0 */
  top?: number;
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
 * Sidebar 侧边栏组件
 * @description 用于创建页面的侧边栏，支持左右定位、粘性定位和固定定位
 * @param props - Sidebar组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础左侧边栏
 * <Sidebar>
 *   <nav>导航菜单</nav>
 * </Sidebar>
 * 
 * // 右侧固定侧边栏，宽度200px
 * <Sidebar side="right" fixed width={200}>
 *   <div>右侧内容</div>
 * </Sidebar>
 * 
 * // 左侧粘性侧边栏，距顶部64px
 * <Sidebar sticky top={64} width="250px">
 *   <aside>侧边栏内容</aside>
 * </Sidebar>
 * ```
 */
export function Sidebar({ as='aside', side='left', sticky=false, fixed=false, width, top=0, prefixCls='ygg', className, style, children, 'data-testid': dataTestId }: SidebarProps) {
  // 动态确定要渲染的HTML元素类型
  const El = as as any;
  
  // 构建侧边栏组件的样式对象
  const styles: React.CSSProperties = {
    position: sticky ? 'sticky' : fixed ? 'fixed' : undefined, // 根据props设置定位方式
    top: sticky || fixed ? `${top}px` : undefined, // 设置距顶部距离
    left: (sticky || fixed) && side === 'left' ? '0px' : undefined, // 左侧定位时设置left为0
    right: (sticky || fixed) && side === 'right' ? '0px' : undefined, // 右侧定位时设置right为0
    width: typeof width === 'number' ? `${width}px` : width, // 处理宽度值，数字转为px
    ...style, // 合并自定义样式
  };

  // 构建CSS类名字符串
  const cls = [
    `${prefixCls}-sidebar`, // 基础类名
    `${prefixCls}-sidebar-${side}`, // 侧边位置类名
    sticky ? `${prefixCls}-sidebar-sticky` : undefined, // 粘性定位类名
    fixed ? `${prefixCls}-sidebar-fixed` : undefined, // 固定定位类名
    className // 自定义类名
  ].filter(Boolean).join(' ');

  return (
    <El className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

