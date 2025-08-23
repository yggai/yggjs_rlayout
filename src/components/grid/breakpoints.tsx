import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useGridConfig } from './config';

/** 断点类型定义 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 检测当前屏幕宽度对应的断点
 * @description 根据窗口宽度和断点配置判断当前屏幕尺寸
 * @param mins - 各断点的最小宽度配置
 * @returns 当前屏幕对应的断点
 */
function detectBreakpoint(mins: Record<Breakpoint, number>): Breakpoint {
  // 服务端渲染环境下返回默认断点
  if (typeof window === 'undefined') return 'lg';
  
  const w = window.innerWidth || 1024;
  
  // 按照从大到小的顺序判断断点
  if (w >= mins.xl) return 'xl'; // 超大屏幕
  if (w >= mins.lg) return 'lg'; // 大屏幕
  if (w >= mins.md) return 'md'; // 中等屏幕
  if (w >= mins.sm) return 'sm'; // 小屏幕
  return 'xs'; // 超小屏幕
}

/**
 * 断点上下文
 * @description 用于在组件树中传递当前断点信息
 */
const BreakpointContext = createContext<Breakpoint>('lg');

/**
 * 获取当前断点的 Hook
 * @description 从上下文中获取当前的屏幕断点
 * @returns 当前屏幕对应的断点
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const breakpoint = useBreakpoint();
 *   
 *   return (
 *     <div>
 *       当前屏幕尺寸: {breakpoint}
 *       {breakpoint === 'xs' && <div>移动端布局</div>}
 *       {breakpoint >= 'md' && <div>桌面端布局</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpoint(): Breakpoint {
  return useContext(BreakpointContext);
}

/**
 * 断点提供者组件
 * @description 监听窗口尺寸变化，为子组件提供当前断点信息
 * @param props - 组件属性
 * @param props.value - 强制指定断点值，不提供时自动检测
 * @param props.children - 子组件
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 自动检测断点
 * <BreakpointProvider>
 *   <App />
 * </BreakpointProvider>
 * 
 * // 强制指定断点（用于测试或SSR）
 * <BreakpointProvider value="md">
 *   <App />
 * </BreakpointProvider>
 * ```
 */
export const BreakpointProvider: React.FC<React.PropsWithChildren<{ value?: Breakpoint }>> = ({ value, children }) => {
  // 获取栅格配置中的断点设置
  const { breakpoints } = useGridConfig();
  // 内部状态管理当前断点
  const [bp, setBp] = useState<Breakpoint>(value ?? detectBreakpoint(breakpoints));

  useEffect(() => {
    // 如果有强制指定的值，直接使用
    if (value) { 
      setBp(value); 
      return; 
    }
    
    // 窗口尺寸变化时重新检测断点
    function onResize() { 
      setBp(detectBreakpoint(breakpoints)); 
    }
    
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [value, breakpoints]);

  // 优先使用强制指定的值，否则使用检测的值
  const ctx = useMemo(() => (value ?? bp), [value, bp]);
  
  return <BreakpointContext.Provider value={ctx}>{children}</BreakpointContext.Provider>;
};

