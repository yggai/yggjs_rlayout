import React, { createContext, useContext, PropsWithChildren } from 'react';
import type { Breakpoint } from './breakpoints';

/**
 * 栅格系统配置类型
 * @description 定义栅格系统的全局配置参数
 */
export type GridConfig = {
  /** 栅格系统的总列数，默认为 12 */
  totalColumns?: number;
  /** 自定义断点配置，用于覆盖默认断点值 */
  breakpoints?: Partial<Record<Breakpoint, number>>;
};

/**
 * 默认断点配置
 * @description 定义了各个屏幕尺寸的断点值（像素）
 */
const defaultBreakpoints: Record<Breakpoint, number> = {
  xs: 0,    // 超小屏幕
  sm: 576,  // 小屏幕
  md: 768,  // 中等屏幕
  lg: 992,  // 大屏幕
  xl: 1200, // 超大屏幕
};

/**
 * 默认栅格配置
 * @description 栅格系统的默认配置参数
 */
const defaultConfig: Required<GridConfig> = {
  totalColumns: 12,      // 默认 12 列栅格
  breakpoints: {},       // 空对象，使用默认断点
};

/**
 * 栅格配置上下文
 * @description 用于在组件树中传递栅格配置
 */
const GridConfigContext = createContext<GridConfig>(defaultConfig);

/**
 * 栅格配置提供者组件
 * @description 用于为整个应用或特定区域提供栅格配置
 * @param props - 组件属性
 * @param props.value - 自定义栅格配置，未提供时使用默认配置
 * @param props.children - 子组件
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 使用默认配置
 * <GridConfigProvider>
 *   <App />
 * </GridConfigProvider>
 * 
 * // 自定义 24 列栅格系统
 * <GridConfigProvider value={{ totalColumns: 24 }}>
 *   <App />
 * </GridConfigProvider>
 * 
 * // 自定义断点
 * <GridConfigProvider value={{ 
 *   breakpoints: { md: 800, lg: 1100 } 
 * }}>
 *   <App />
 * </GridConfigProvider>
 * ```
 */
export function GridConfigProvider({ value, children }: PropsWithChildren<{ value?: GridConfig }>) {
  return <GridConfigContext.Provider value={value ?? defaultConfig}>{children}</GridConfigContext.Provider>;
}

/**
 * 获取栅格配置的 Hook
 * @description 从上下文中获取当前的栅格配置，包括总列数和断点配置
 * @returns 合并后的栅格配置对象
 * @returns totalColumns - 总列数
 * @returns breakpoints - 完整的断点配置对象
 */
export function useGridConfig() {
  const cfg = useContext(GridConfigContext) || defaultConfig;
  return {
    // 使用传入的totalColumns或默认值
    totalColumns: cfg.totalColumns ?? defaultConfig.totalColumns,
    // 合并默认断点和自定义断点
    breakpoints: { ...defaultBreakpoints, ...(cfg.breakpoints || {}) } as Record<Breakpoint, number>,
  };
}

/** 导出默认断点配置，供外部使用 */
export { defaultBreakpoints };

