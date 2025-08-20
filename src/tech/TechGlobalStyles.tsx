import React, { useEffect } from 'react';

export interface TechGlobalStylesProps {
  enableScrollbarStyling?: boolean;
  enableGlobalReset?: boolean;
}

export function TechGlobalStyles({ 
  enableScrollbarStyling = true,
  enableGlobalReset = true 
}: TechGlobalStylesProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const id = 'tech-global-styles';
    if (document.getElementById(id)) return;
    
    const css = `
      ${enableGlobalReset ? `
        /* 全局样式重置 */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        * {
          margin: 0;
          padding: 0;
        }
        
        html, body {
          height: 100%;
          overflow-x: hidden;
        }
        
        body {
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        }
        
        img, picture, video, canvas, svg {
          display: block;
          max-width: 100%;
        }
        
        input, button, textarea, select {
          font: inherit;
        }
        
        p, h1, h2, h3, h4, h5, h6 {
          overflow-wrap: break-word;
        }
        
        #root {
          isolation: isolate;
          height: 100%;
        }
        
        /* 移除默认的focus outline，使用自定义样式 */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid var(--tech-accent, #27e0ff);
          outline-offset: 2px;
        }
        
        /* 禁用文本选择的默认样式 */
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
        /* 科技风滚动条样式 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--tech-panel, #0e1630);
          border-radius: 4px;
        }
        
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
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            var(--tech-muted, #7c89bf) 0%, 
            var(--tech-accent, #27e0ff) 50%, 
            var(--tech-muted, #7c89bf) 100%
          );
          box-shadow: 0 0 8px rgba(39, 224, 255, 0.3);
        }
        
        ::-webkit-scrollbar-thumb:active {
          background: var(--tech-accent, #27e0ff);
          box-shadow: 0 0 12px rgba(39, 224, 255, 0.5);
        }
        
        ::-webkit-scrollbar-corner {
          background: var(--tech-panel, #0e1630);
        }
        
        /* Firefox 滚动条样式 */
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--tech-border, #1b2550) var(--tech-panel, #0e1630);
        }
        
        /* 细滚动条变体（用于侧边栏等紧凑区域） */
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
        
        /* 隐藏滚动条变体 */
        .tech-scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        
        .tech-scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` : ''}
      
      /* 科技风动画 */
      @keyframes tech-glow-pulse {
        0%, 100% {
          box-shadow: 0 0 5px rgba(39, 224, 255, 0.3);
        }
        50% {
          box-shadow: 0 0 20px rgba(39, 224, 255, 0.6), 0 0 30px rgba(90, 162, 255, 0.3);
        }
      }
      
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
      
      @keyframes tech-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      /* 工具类 */
      .tech-glow-pulse {
        animation: tech-glow-pulse 2s ease-in-out infinite;
      }
      
      .tech-slide-in {
        animation: tech-slide-in 0.3s ease-out;
      }
      
      .tech-fade-in {
        animation: tech-fade-in 0.2s ease-out;
      }
      
      /* 响应式工具类 */
      .tech-hide-mobile {
        display: block;
      }
      
      .tech-show-mobile {
        display: none;
      }
      
      @media (max-width: 768px) {
        .tech-hide-mobile {
          display: none;
        }
        
        .tech-show-mobile {
          display: block;
        }
      }
      
      /* 文本工具类 */
      .tech-text-gradient {
        background: linear-gradient(135deg, var(--tech-accent, #27e0ff), var(--tech-primary, #5aa2ff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .tech-text-glow {
        text-shadow: 0 0 10px rgba(39, 224, 255, 0.5);
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    
    return () => {
      const existingStyle = document.getElementById(id);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [enableScrollbarStyling, enableGlobalReset]);

  return null;
}
