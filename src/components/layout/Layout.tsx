import React from 'react';

/** 布局方向类型 */
export type Direction = 'horizontal' | 'vertical';

/**
 * Layout 组件的属性类型定义
 * @description 定义了布局组件所有可配置的属性
 */
export type LayoutProps = React.PropsWithChildren<{
  /** 布局方向，'horizontal' 表示水平布局，'vertical' 表示垂直布局，默认为 'vertical' */
  direction?: Direction;
  /** 子元素间距，可以是数字（统一间距）或对象（分别设置水平和垂直间距） */
  gap?: number | { x?: number; y?: number };
  /** 交叉轴对齐方式：start-起始对齐, center-居中对齐, end-末尾对齐, stretch-拉伸对齐 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 主轴对齐方式：start-起始对齐, center-居中, end-末尾, space-between-两端对齐, space-around-环绕对齐 */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  /** 是否允许换行 */
  wrap?: boolean;
  /** 渲染的 HTML 元素标签，默认为 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 测试标识符 */
  'data-testid'?: string;
}>;

/**
 * Layout 布局组件
 * @description 用于创建灵活的弹性布局容器，支持水平和垂直布局，以及各种对齐方式
 * @param props - Layout组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础垂直布局
 * <Layout>
 *   <div>项目1</div>
 *   <div>项目2</div>
 * </Layout>
 * 
 * // 水平布局，居中对齐，间距20px
 * <Layout direction="horizontal" align="center" gap={20}>
 *   <button>按钮1</button>
 *   <button>按钮2</button>
 * </Layout>
 * 
 * // 复杂间距设置
 * <Layout gap={{ x: 16, y: 24 }}>
 *   <div>内容区域</div>
 * </Layout>
 * ```
 */
export function Layout({
  direction = 'vertical',
  gap,
  align,
  justify,
  wrap,
  as = 'div',
  className,
  style,
  children,
  'data-testid': dataTestId
}: LayoutProps) {
  // 动态确定要渲染的HTML元素类型
  const El = as as any;

  // 判断是否为水平布局
  const isRow = direction === 'horizontal';
  
  // 处理间距设置，支持统一间距和分别设置水平/垂直间距
  const gapX = typeof gap === 'number' ? gap : gap?.x ?? (typeof gap === 'object' ? 0 : undefined);
  const gapY = typeof gap === 'number' ? gap : gap?.y ?? (typeof gap === 'object' ? 0 : undefined);

  // 构建布局容器的样式
  const styles: React.CSSProperties = {
    display: 'flex', // 使用弹性布局
    flexDirection: isRow ? 'row' : 'column', // 根据方向设置主轴方向
    gap: gapX !== undefined && gapY !== undefined ? `${gapY}px ${gapX}px` : gapX ?? gapY, // 设置间距
    // 交叉轴对齐方式转换
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    // 主轴对齐方式转换
    justifyContent:
      justify === 'start'
        ? 'flex-start'
        : justify === 'end'
        ? 'flex-end'
        : justify,
    flexWrap: wrap ? 'wrap' : undefined, // 是否允许换行
    ...style // 合并自定义样式
  };

  return (
    <El className={className} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

/**
 * Layout.Item 组件的属性类型定义
 * @description 定义了布局项组件所有可配置的属性
 */
export type ItemProps = React.PropsWithChildren<{
  /** 渲染的 HTML 元素标签，默认为 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** flex 属性值，可以是数字或字符串 */
  flex?: number | string;
  /** flex-grow 属性值，定义项目的放大比例 */
  grow?: number;
  /** flex-shrink 属性值，定义项目的缩小比例 */
  shrink?: number;
  /** order 属性值，定义项目的排列顺序 */
  order?: number;
  /** 项目宽度 */
  width?: number | string;
}>;

/**
 * Layout.Item 布局项组件
 * @description Layout组件的子项，用于精细控制单个子元素的弹性布局属性
 * @param props - Item组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * <Layout direction="horizontal">
 *   <Layout.Item flex={1}>
 *     <div>弹性区域</div>
 *   </Layout.Item>
 *   <Layout.Item width={200}>
 *     <div>固定宽度区域</div>
 *   </Layout.Item>
 * </Layout>
 * ```
 */
Layout.Item = function Item({
  as = 'div',
  className,
  style,
  children,
  flex,
  grow,
  shrink,
  order,
  width
}: ItemProps) {
  // 动态确定要渲染的HTML元素类型
  const El = as as any;
  
  // 构建布局项的样式
  const styles: React.CSSProperties = {
    // 如果flex是数字，转换为标准的flex简写形式
    flex: typeof flex === 'number' ? `${flex} ${flex} 0%` : flex,
    flexGrow: grow, // 放大比例
    flexShrink: shrink, // 缩小比例
    order, // 排列顺序
    width, // 宽度
    ...style // 合并自定义样式
  };
  
  return <El className={className} style={styles}>{children}</El>;
};

