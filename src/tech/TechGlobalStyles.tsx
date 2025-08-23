/**
 * 科技风格全局样式组件
 * 
 * 该组件为科技风格主题提供全局CSS样式，包括：
 * - 现代化的样式重置（CSS Reset）
 * - 科技感滚动条样式（深色主题，发光效果）
 * - 科技风格动画效果（发光脉冲、滑入、淡入）
 * - 响应式工具类和文本效果工具类
 * 
 * 特色功能：
 * - 自定义滚动条：支持悬停发光效果
 * - 科技动画：发光脉冲、平滑过渡动画
 * - 工具类：响应式显示、文本渐变、文本发光
 */

import React, { useEffect } from 'react';

/**
 * 科技风格全局样式组件的属性接口
 */
export interface TechGlobalStylesProps {
  /** 是否启用科技风格滚动条样式，默认为true */
  enableScrollbarStyling?: boolean;
  /** 是否启用全局样式重置，默认为true */
  enableGlobalReset?: boolean;
}

/**
 * 科技风格全局样式组件
 * 
 * 动态注入科技风格的全局CSS样式到页面中，提供：
 * - 现代化样式重置，确保跨浏览器一致性
 * - 深色科技主题的滚动条样式，支持发光悬停效果
 * - 科技感动画关键帧（发光脉冲、滑入、淡入）
 * - 实用的工具类（响应式、文本效果）
 * 
 * @param props - 全局样式配置属性
 * @param props.enableScrollbarStyling - 是否启用科技风格滚动条
 * @param props.enableGlobalReset - 是否启用全局样式重置
 * 
 * @example
 * ```tsx
 * // 启用所有功能（默认）
 * <TechGlobalStyles />
 * 
 * // 仅启用滚动条样式
 * <TechGlobalStyles enableGlobalReset={false} />
 * 
 * // 仅启用样式重置
 * <TechGlobalStyles enableScrollbarStyling={false} />
 * ```
 */
export function TechGlobalStyles({ 
  enableScrollbarStyling = true,
  enableGlobalReset = true 
}: TechGlobalStylesProps) {
  useEffect(() => {
    // 服务端渲染兼容性检查
    if (typeof document === 'undefined') return;
    
    // 避免重复注入样式
    const id = 'tech-global-styles';
    if (document.getElementById(id)) return;
    
    // 构建科技风格的全局CSS样式
    const css = `
      ${enableGlobalReset ? `
        /* ======================
         * 现代化全局样式重置
         * 提供一致的跨浏览器基础样式
         * ====================== */
        /* 统一盒模型为border-box */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        /* 清除默认的内外边距 */
        * {
          margin: 0;
          padding: 0;
        }
        
        /* 设置全屏高度，隐藏水平滚动条 */
        html, body {
          height: 100%;
          overflow-x: hidden;
        }
        
        /* 优化字体渲染和可读性 */
        body {
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        }
        
        /* 响应式媒体元素 */
        img, picture, video, canvas, svg {
          display: block;
          max-width: 100%;
        }
        
        /* 表单元素继承字体样式 */
        input, button, textarea, select {
          font: inherit;
        }
        
        /* 文本自动换行防止溢出 */
        p, h1, h2, h3, h4, h5, h6 {
          overflow-wrap: break-word;
        }
        
        /* 根元素隔离和全高 */
        #root {
          isolation: isolate;
          height: 100%;
        }
        
        /* 科技风格焦点样式 - 青色发光边框 */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid var(--tech-accent, #27e0ff);
          outline-offset: 2px;
        }
        
        /* 科技风格文本选择样式 - 青色半透明背景 */
        ::selection {
          background: rgba(39, 224, 255, 0.3);
          color: var(--tech-text, #cfe1ff);
        }
        
        ::-moz-selection {
          background: rgba(39, 224, 255, 0.3);
          color: var(--tech-text, #cfe1ff);
        }
      ` : ''}
      
      ${enableScrollbarStyling ? `
        /* ======================
         * 科技风格滚动条样式
         * 深色主题，悬停发光效果
         * ====================== */
        /* 滚动条基础尺寸 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        /* 滚动条轨道 - 深色面板背景 */
        ::-webkit-scrollbar-track {
          background: var(--tech-panel, #0e1630);
          border-radius: 4px;
        }
        
        /* 滚动条滑块 - 渐变效果，平滑过渡 */
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            var(--tech-border, #1b2550) 0%, 
            var(--tech-muted, #7c89bf) 50%, 
            var(--tech-border, #1b2550) 100%
          );
          border-radius: 4px;
          border: 1px solid var(--tech-panel, #0e1630);
          transition: all 0.2s ease;
        }
        
        /* 滚动条悬停效果 - 青色发光 */
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            var(--tech-muted, #7c89bf) 0%, 
            var(--tech-accent, #27e0ff) 50%, 
            var(--tech-muted, #7c89bf) 100%
          );
          box-shadow: 0 0 8px rgba(39, 224, 255, 0.3);
        }
        
        /* 滚动条激活效果 - 更强烈的青色发光 */
        ::-webkit-scrollbar-thumb:active {
          background: var(--tech-accent, #27e0ff);
          box-shadow: 0 0 12px rgba(39, 224, 255, 0.5);
        }
        
        /* 滚动条角落 */
        ::-webkit-scrollbar-corner {
          background: var(--tech-panel, #0e1630);
        }
        
        /* Firefox 浏览器滚动条样式兼容 */
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--tech-border, #1b2550) var(--tech-panel, #0e1630);
        }
        
        /* 细滚动条工具类 - 用于紧凑区域如侧边栏 */
        .tech-scrollbar-thin::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .tech-scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--tech-border, #1b2550);
          border-radius: 2px;
          border: none;
        }
        
        .tech-scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: var(--tech-muted, #7c89bf);
          box-shadow: 0 0 4px rgba(39, 224, 255, 0.2);
        }
        
        /* 隐藏滚动条工具类 - 保持滚动功能但隐藏滚动条 */
        .tech-scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        
        .tech-scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` : ''}
      
      /* ======================
       * 科技风格动画效果
       * 发光、滑入、淡入动画
       * ====================== */
      
      /* 科技发光脉冲动画 - 青色发光呼吸效果 */
      @keyframes tech-glow-pulse {
        0%, 100% {
          box-shadow: 0 0 5px rgba(39, 224, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 20px rgba(39, 224, 255, 0.6), 0 0 30px rgba(90, 162, 255, 0.3);
        }
      }
      
      /* 科技滑入动画 - 从下方滑入并淡入 */
      @keyframes tech-slide-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* 科技淡入动画 - 简单的透明度渐变 */
      @keyframes tech-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      /* ======================
       * 动画工具类
       * 可直接应用到元素上的动画类
       * ====================== */
      
      /* 发光脉冲工具类 - 2秒循环发光动画 */
      .tech-glow-pulse {
        animation: tech-glow-pulse 2s ease-in-out infinite;
      }
      
      /* 滑入动画工具类 - 0.3秒滑入效果 */
      .tech-slide-in {
        animation: tech-slide-in 0.3s ease-out;
      }
      
      /* 淡入动画工具类 - 0.2秒淡入效果 */
      .tech-fade-in {
        animation: tech-fade-in 0.2s ease-out;
      }
      
      /* ======================
       * 响应式工具类
       * 控制元素在不同设备上的显示
       * ====================== */
      
      /* 移动端隐藏工具类 - 在桌面显示，移动端隐藏 */
      .tech-hide-mobile {
        display: block;
      }
      
      /* 移动端显示工具类 - 在桌面隐藏，移动端显示 */
      .tech-show-mobile {
        display: none;
      }
      
      /* 移动端断点：768px */
      @media (max-width: 768px) {
        .tech-hide-mobile {
          display: none;
        }
        
        .tech-show-mobile {
          display: block;
        }
      }
      
      /* ======================
       * 科技文本效果工具类
       * 渐变和发光文本效果
       * ====================== */
      
      /* 科技渐变文本 - 青色到蓝色的对角渐变 */
      .tech-text-gradient {
        background: linear-gradient(135deg, var(--tech-accent, #27e0ff), var(--tech-primary, #5aa2ff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* 科技发光文本 - 青色文字阴影发光效果 */
      .tech-text-glow {
        text-shadow: 0 0 10px rgba(39, 224, 255, 0.5);
      }
    `;
    
    // 创建并注入样式元素到文档头部
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    
    // 组件卸载时清理样式
    return () => {
      const existingStyle = document.getElementById(id);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [enableScrollbarStyling, enableGlobalReset]);

  return null;
}
