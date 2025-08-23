/**
 * 科技风格主题提供器
 * 
 * 该文件提供了科技风格UI主题的核心功能，包括：
 * - 暗色系配色方案（深蓝、青色荧光效果）
 * - 科技感视觉效果（发光、毛玻璃、渐变）
 * - 统一的主题管理和CSS变量注入
 * 
 * 主要特色：
 * - 深色科技背景色调
 * - 青色/蓝色荧光强调色
 * - 半透明面板和毛玻璃效果
 * - 动态发光和阴影效果
 */

import React, { createContext, useContext, useEffect } from 'react';
import type { TechTheme } from './types';

/**
 * 默认的科技风格主题配置
 * 采用深蓝色系为主，青色为强调色的科技感配色方案
 */
const defaultTheme: TechTheme = {
  colors: {
    /** 主背景色 - 深夜蓝 */
    bg: '#0a0f1e',
    /** 面板背景色 - 较深的科技蓝 */
    panel: '#0e1630',
    /** 次级面板背景色 - 更深的科技蓝 */
    panel2: '#0a1128',
    /** 弱化文本颜色 - 中性蓝灰 */
    muted: '#7c89bf',
    /** 主色调 - 科技蓝 */
    primary: '#5aa2ff',
    /** 强调色 - 青色荧光 */
    accent: '#27e0ff',
    /** 边框颜色 - 深蓝边框 */
    border: '#1b2550',
    /** 焦点环颜色 - 深蓝焦点 */
    ring: '#2242a8',
    /** 主文本颜色 - 淡蓝白色 */
    text: '#cfe1ff',
    /** 次要文本颜色 - 灰色 */
    textMuted: '#9ca3af'
  },
  effects: {
    /** 发光效果 - 多层青色/蓝色发光 */
    glow: '0 0 0 1px rgba(39,224,255,.16), 0 0 0 2px rgba(90,162,255,.08), 0 8px 30px rgba(25,34,83,.45)',
    /** 毛玻璃效果 - 饱和度增强和模糊 */
    backdrop: 'saturate(140%) blur(10px)'
  },
  gradients: {
    /** 页面背景渐变 - 双侧径向渐变营造科技氛围 */
    background: `
      radial-gradient(1200px 800px at 20% -200px, rgba(39,224,255,.06), transparent 60%),
      radial-gradient(1200px 800px at 120% -200px, rgba(90,162,255,.06), transparent 60%)
    `,
    /** 侧边栏渐变 - 从青色到蓝色的垂直渐变 */
    sidebar: 'linear-gradient(180deg, rgba(39,224,255,.06), rgba(90,162,255,.04))',
    /** 卡片渐变 - 微妙的白色渐变增强层次感 */
    card: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))'
  }
};

/** 科技主题上下文 */
const TechThemeContext = createContext<TechTheme>(defaultTheme);

/**
 * 获取当前科技主题的Hook
 * 
 * @returns 当前的科技主题配置
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useTechTheme();
 *   return (
 *     <div style={{ color: theme.colors.accent }}>
 *       科技风格文本
 *     </div>
 *   );
 * }
 * ```
 */
export const useTechTheme = () => useContext(TechThemeContext);

/**
 * 科技主题提供器的属性接口
 */
export interface TechThemeProviderProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 自定义主题配置，将与默认主题合并 */
  theme?: Partial<TechTheme>;
}

/**
 * 科技风格主题提供器组件
 * 
 * 为整个应用或特定区域提供科技风格的主题配置，包括：
 * - 深色系配色方案
 * - 科技感视觉效果
 * - CSS变量注入
 * - 背景样式设置
 * 
 * @param props - 主题提供器属性
 * @param props.children - 需要应用主题的子组件
 * @param props.theme - 可选的自定义主题配置
 * 
 * @example
 * ```tsx
 * // 使用默认主题
 * <TechThemeProvider>
 *   <App />
 * </TechThemeProvider>
 * 
 * // 自定义主题颜色
 * <TechThemeProvider theme={{
 *   colors: {
 *     accent: '#ff6b35' // 自定义强调色
 *   }
 * }}>
 *   <App />
 * </TechThemeProvider>
 * ```
 */
export function TechThemeProvider({ children, theme }: TechThemeProviderProps) {
  // 合并默认主题和自定义主题配置
  const mergedTheme = React.useMemo(() => ({
    ...defaultTheme,
    ...theme,
    colors: { ...defaultTheme.colors, ...theme?.colors },
    effects: { ...defaultTheme.effects, ...theme?.effects },
    gradients: { ...defaultTheme.gradients, ...theme?.gradients }
  }), [theme]);

  useEffect(() => {
    // 将主题配置注入为CSS变量，供全局样式使用
    const root = document.documentElement;
    const { colors, effects } = mergedTheme;
    
    root.style.setProperty('--tech-bg', colors.bg);
    root.style.setProperty('--tech-panel', colors.panel);
    root.style.setProperty('--tech-panel-2', colors.panel2);
    root.style.setProperty('--tech-muted', colors.muted);
    root.style.setProperty('--tech-primary', colors.primary);
    root.style.setProperty('--tech-accent', colors.accent);
    root.style.setProperty('--tech-border', colors.border);
    root.style.setProperty('--tech-ring', colors.ring);
    root.style.setProperty('--tech-text', colors.text);
    root.style.setProperty('--tech-text-muted', colors.textMuted);
    root.style.setProperty('--tech-glow', effects.glow);
    root.style.setProperty('--tech-backdrop', effects.backdrop);

    // 设置页面背景为科技风格渐变效果
    document.body.style.background = `${mergedTheme.gradients.background}, ${colors.bg}`;

    return () => {
      // 组件卸载时清理CSS变量
      const properties = [
        '--tech-bg', '--tech-panel', '--tech-panel-2', '--tech-muted',
        '--tech-primary', '--tech-accent', '--tech-border', '--tech-ring',
        '--tech-text', '--tech-text-muted', '--tech-glow', '--tech-backdrop'
      ];
      properties.forEach(prop => root.style.removeProperty(prop));
    };
  }, [mergedTheme]);

  return (
    <TechThemeContext.Provider value={mergedTheme}>
      {children}
    </TechThemeContext.Provider>
  );
}
