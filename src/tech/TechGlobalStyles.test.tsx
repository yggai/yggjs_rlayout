import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TechGlobalStyles } from './TechGlobalStyles';
import { TechThemeProvider } from './TechThemeProvider';

const renderGlobalStyles = (props: Partial<React.ComponentProps<typeof TechGlobalStyles>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechGlobalStyles {...props} />
    </TechThemeProvider>
  );
};

describe('TechGlobalStyles', () => {
  beforeEach(() => {
    // 清理之前的样式
    const existingStyle = document.getElementById('tech-global-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
  });

  afterEach(() => {
    // 测试后清理样式
    const existingStyle = document.getElementById('tech-global-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
  });

  describe('基础渲染', () => {
    it('应该不渲染任何DOM元素', () => {
      const { container } = renderGlobalStyles();
      
      expect(container.firstChild).toBeNull();
    });

    it('应该注入全局样式到document head', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      expect(styleElement).toBeInTheDocument();
      expect(styleElement?.tagName).toBe('STYLE');
    });

    it('应该避免重复注入样式', () => {
      // 第一次渲染
      renderGlobalStyles();
      const firstStyle = document.getElementById('tech-global-styles');
      expect(firstStyle).toBeInTheDocument();
      
      // 第二次渲染
      renderGlobalStyles();
      const allStyles = document.querySelectorAll('#tech-global-styles');
      expect(allStyles).toHaveLength(1);
    });
  });

  describe('样式内容', () => {
    it('应该在启用全局重置时包含重置样式', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('box-sizing: border-box');
      expect(cssContent).toContain('margin: 0');
      expect(cssContent).toContain('padding: 0');
      expect(cssContent).toContain('-webkit-font-smoothing: antialiased');
    });

    it('应该在禁用全局重置时不包含重置样式', () => {
      renderGlobalStyles({ enableGlobalReset: false });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).not.toContain('box-sizing: border-box');
      expect(cssContent).not.toContain('margin: 0');
      expect(cssContent).not.toContain('padding: 0');
    });

    it('应该在启用滚动条样式时包含滚动条CSS', () => {
      renderGlobalStyles({ enableScrollbarStyling: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('::-webkit-scrollbar');
      expect(cssContent).toContain('::-webkit-scrollbar-thumb');
      expect(cssContent).toContain('::-webkit-scrollbar-track');
      expect(cssContent).toContain('scrollbar-width: thin');
    });

    it('应该在禁用滚动条样式时不包含滚动条CSS', () => {
      renderGlobalStyles({ enableScrollbarStyling: false });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).not.toContain('::-webkit-scrollbar');
      expect(cssContent).not.toContain('::-webkit-scrollbar-thumb');
      expect(cssContent).not.toContain('scrollbar-width: thin');
    });

    it('应该包含科技风格动画关键帧', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('@keyframes tech-glow-pulse');
      expect(cssContent).toContain('@keyframes tech-slide-in');
      expect(cssContent).toContain('@keyframes tech-fade-in');
    });

    it('应该包含动画工具类', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('.tech-glow-pulse');
      expect(cssContent).toContain('.tech-slide-in');
      expect(cssContent).toContain('.tech-fade-in');
    });

    it('应该包含响应式工具类', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('.tech-hide-mobile');
      expect(cssContent).toContain('.tech-show-mobile');
      expect(cssContent).toContain('@media (max-width: 768px)');
    });

    it('应该包含科技文本效果工具类', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('.tech-text-gradient');
      expect(cssContent).toContain('.tech-text-glow');
      expect(cssContent).toContain('background-clip: text');
      expect(cssContent).toContain('text-shadow');
    });
  });

  describe('CSS变量使用', () => {
    it('应该使用tech主题的CSS变量', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('var(--tech-accent, #27e0ff)');
      expect(cssContent).toContain('var(--tech-primary, #5aa2ff)');
      expect(cssContent).toContain('var(--tech-panel, #0e1630)');
      expect(cssContent).toContain('var(--tech-border, #1b2550)');
      expect(cssContent).toContain('var(--tech-muted, #7c89bf)');
      expect(cssContent).toContain('var(--tech-text, #cfe1ff)');
    });

    it('应该为CSS变量提供回退值', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 验证所有CSS变量都有回退颜色值
      expect(cssContent).toContain('#27e0ff'); // tech-accent fallback
      expect(cssContent).toContain('#5aa2ff'); // tech-primary fallback
      expect(cssContent).toContain('#0e1630'); // tech-panel fallback
      expect(cssContent).toContain('#1b2550'); // tech-border fallback
      expect(cssContent).toContain('#7c89bf'); // tech-muted fallback
      expect(cssContent).toContain('#cfe1ff'); // tech-text fallback
    });
  });

  describe('配置组合', () => {
    it('应该支持同时启用两个功能', () => {
      renderGlobalStyles({ 
        enableGlobalReset: true,
        enableScrollbarStyling: true
      });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 应该包含重置样式
      expect(cssContent).toContain('box-sizing: border-box');
      // 应该包含滚动条样式
      expect(cssContent).toContain('::-webkit-scrollbar');
      // 应该包含动画
      expect(cssContent).toContain('@keyframes tech-glow-pulse');
    });

    it('应该支持同时禁用两个功能', () => {
      renderGlobalStyles({ 
        enableGlobalReset: false,
        enableScrollbarStyling: false
      });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 不应该包含重置样式
      expect(cssContent).not.toContain('box-sizing: border-box');
      expect(cssContent).not.toContain('margin: 0');
      
      // 不应该包含滚动条样式
      expect(cssContent).not.toContain('::-webkit-scrollbar');
      expect(cssContent).not.toContain('scrollbar-width: thin');
      
      // 但仍应该包含动画（总是启用）
      expect(cssContent).toContain('@keyframes tech-glow-pulse');
    });

    it('应该支持只启用部分功能', () => {
      renderGlobalStyles({ 
        enableGlobalReset: true,
        enableScrollbarStyling: false
      });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('box-sizing: border-box');
      expect(cssContent).not.toContain('::-webkit-scrollbar');
      expect(cssContent).toContain('@keyframes tech-glow-pulse');
    });
  });

  describe('样式清理', () => {
    it('应该在组件卸载时清理样式', () => {
      const { unmount } = renderGlobalStyles();
      
      // 验证样式已注入
      expect(document.getElementById('tech-global-styles')).toBeInTheDocument();
      
      // 卸载组件
      unmount();
      
      // 验证样式已清理
      expect(document.getElementById('tech-global-styles')).not.toBeInTheDocument();
    });

    it('应该正确处理多次挂载和卸载', () => {
      // 第一次挂载
      const { unmount: unmount1 } = renderGlobalStyles();
      expect(document.getElementById('tech-global-styles')).toBeInTheDocument();
      
      // 第二次挂载（在第一个还存在时）
      const { unmount: unmount2 } = renderGlobalStyles();
      const allStyles = document.querySelectorAll('#tech-global-styles');
      expect(allStyles).toHaveLength(1); // 不应该重复注入
      
      // 卸载第一个
      unmount1();
      expect(document.getElementById('tech-global-styles')).toBeInTheDocument(); // 第二个仍存在
      
      // 卸载第二个
      unmount2();
      expect(document.getElementById('tech-global-styles')).not.toBeInTheDocument();
    });
  });

  describe('服务端渲染兼容性', () => {
    it('应该在document不存在时跳过样式注入', () => {
      // 模拟服务端环境
      const originalDocument = global.document;
      Object.defineProperty(global, 'document', {
        value: undefined,
        writable: true
      });
      
      try {
        renderGlobalStyles();
        
        // 恢复document后检查
        Object.defineProperty(global, 'document', {
          value: originalDocument,
          writable: true
        });
        
        expect(document.getElementById('tech-global-styles')).not.toBeInTheDocument();
      } finally {
        // 确保恢复document
        Object.defineProperty(global, 'document', {
          value: originalDocument,
          writable: true
        });
      }
    });
  });

  describe('样式内容验证', () => {
    it('应该包含完整的CSS重置规则', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 验证关键的重置规则
      expect(cssContent).toContain('*, *::before, *::after');
      expect(cssContent).toContain('html, body');
      expect(cssContent).toContain('overflow-x: hidden');
      expect(cssContent).toContain('line-height: 1.5');
      expect(cssContent).toContain('img, picture, video, canvas, svg');
      expect(cssContent).toContain('max-width: 100%');
      expect(cssContent).toContain('input, button, textarea, select');
      expect(cssContent).toContain('font: inherit');
    });

    it('应该包含完整的滚动条样式规则', () => {
      renderGlobalStyles({ enableScrollbarStyling: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 验证关键的滚动条规则
      expect(cssContent).toContain('width: 8px');
      expect(cssContent).toContain('height: 8px');
      expect(cssContent).toContain('border-radius: 4px');
      expect(cssContent).toContain('linear-gradient(180deg');
      expect(cssContent).toContain('transition: all 0.2s ease');
      expect(cssContent).toContain('box-shadow: 0 0 8px rgba(39, 224, 255, 0.3)');
    });

    it('应该包含所有动画关键帧', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 验证发光脉冲动画
      expect(cssContent).toContain('@keyframes tech-glow-pulse');
      expect(cssContent).toContain('0%, 100%');
      expect(cssContent).toContain('50%');
      expect(cssContent).toContain('box-shadow: 0 0 5px rgba(39, 224, 255, 0.3)');
      expect(cssContent).toContain('box-shadow: 0 0 20px rgba(39, 224, 255, 0.6)');
      
      // 验证滑入动画
      expect(cssContent).toContain('@keyframes tech-slide-in');
      expect(cssContent).toContain('opacity: 0');
      expect(cssContent).toContain('transform: translateY(10px)');
      expect(cssContent).toContain('transform: translateY(0)');
      
      // 验证淡入动画
      expect(cssContent).toContain('@keyframes tech-fade-in');
    });

    it('应该包含所有工具类', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 动画工具类
      expect(cssContent).toContain('.tech-glow-pulse');
      expect(cssContent).toContain('.tech-slide-in');
      expect(cssContent).toContain('.tech-fade-in');
      
      // 响应式工具类
      expect(cssContent).toContain('.tech-hide-mobile');
      expect(cssContent).toContain('.tech-show-mobile');
      
      // 文本效果工具类
      expect(cssContent).toContain('.tech-text-gradient');
      expect(cssContent).toContain('.tech-text-glow');
      
      // 滚动条工具类
      expect(cssContent).toContain('.tech-scrollbar-thin');
      expect(cssContent).toContain('.tech-scrollbar-hidden');
    });
  });

  describe('响应式断点', () => {
    it('应该包含正确的媒体查询断点', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('@media (max-width: 768px)');
      expect(cssContent).toContain('.tech-hide-mobile');
      expect(cssContent).toContain('display: none');
      expect(cssContent).toContain('.tech-show-mobile');
      expect(cssContent).toContain('display: block');
    });
  });

  describe('浏览器兼容性', () => {
    it('应该包含WebKit前缀的样式', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('-webkit-font-smoothing');
      expect(cssContent).toContain('-webkit-background-clip');
      expect(cssContent).toContain('-webkit-text-fill-color');
      expect(cssContent).toContain('::-webkit-scrollbar');
    });

    it('应该包含Mozilla前缀的样式', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('-moz-osx-font-smoothing');
      expect(cssContent).toContain('::-moz-selection');
      expect(cssContent).toContain('-ms-overflow-style');
    });

    it('应该包含标准的CSS属性', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('background-clip: text');
      expect(cssContent).toContain('scrollbar-width: thin');
      expect(cssContent).toContain('scrollbar-color');
    });
  });

  describe('性能考虑', () => {
    it('应该只在props变化时重新注入样式', () => {
      const { rerender } = renderGlobalStyles({ enableGlobalReset: true });
      
      const firstStyle = document.getElementById('tech-global-styles');
      const firstContent = firstStyle?.textContent;
      
      // 相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechGlobalStyles enableGlobalReset={true} />
        </TechThemeProvider>
      );
      
      const secondStyle = document.getElementById('tech-global-styles');
      expect(secondStyle?.textContent).toBe(firstContent);
    });

    it('应该在props变化时更新样式', () => {
      const { rerender } = renderGlobalStyles({ enableGlobalReset: true });
      
      let styleElement = document.getElementById('tech-global-styles');
      let cssContent = styleElement?.textContent || '';
      expect(cssContent).toContain('box-sizing: border-box');
      
      // 更改props
      rerender(
        <TechThemeProvider>
          <TechGlobalStyles enableGlobalReset={false} />
        </TechThemeProvider>
      );
      
      styleElement = document.getElementById('tech-global-styles');
      cssContent = styleElement?.textContent || '';
      expect(cssContent).not.toContain('box-sizing: border-box');
    });
  });

  describe('字体样式', () => {
    it('应该设置完整的字体堆栈', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('-apple-system');
      expect(cssContent).toContain('BlinkMacSystemFont');
      expect(cssContent).toContain('Segoe UI');
      expect(cssContent).toContain('Roboto');
      expect(cssContent).toContain('sans-serif');
    });

    it('应该设置字体平滑渲染', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('-webkit-font-smoothing: antialiased');
      expect(cssContent).toContain('-moz-osx-font-smoothing: grayscale');
    });
  });

  describe('焦点和选择样式', () => {
    it('应该包含科技风格的焦点样式', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('button:focus-visible');
      expect(cssContent).toContain('input:focus-visible');
      expect(cssContent).toContain('outline: 2px solid var(--tech-accent, #27e0ff)');
      expect(cssContent).toContain('outline-offset: 2px');
    });

    it('应该包含科技风格的文本选择样式', () => {
      renderGlobalStyles({ enableGlobalReset: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('::selection');
      expect(cssContent).toContain('::-moz-selection');
      expect(cssContent).toContain('background: rgba(39, 224, 255, 0.3)');
    });
  });

  describe('滚动条工具类', () => {
    it('应该包含细滚动条工具类', () => {
      renderGlobalStyles({ enableScrollbarStyling: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('.tech-scrollbar-thin::-webkit-scrollbar');
      expect(cssContent).toContain('width: 4px');
      expect(cssContent).toContain('height: 4px');
      expect(cssContent).toContain('border-radius: 2px');
    });

    it('应该包含隐藏滚动条工具类', () => {
      renderGlobalStyles({ enableScrollbarStyling: true });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('.tech-scrollbar-hidden::-webkit-scrollbar');
      expect(cssContent).toContain('display: none');
      expect(cssContent).toContain('-ms-overflow-style: none');
      expect(cssContent).toContain('scrollbar-width: none');
    });
  });

  describe('动画时长和缓动', () => {
    it('应该设置合适的动画时长', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('animation: tech-glow-pulse 2s ease-in-out infinite');
      expect(cssContent).toContain('animation: tech-slide-in 0.3s ease-out');
      expect(cssContent).toContain('animation: tech-fade-in 0.2s ease-out');
    });

    it('应该使用合适的缓动函数', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('ease-in-out');
      expect(cssContent).toContain('ease-out');
      expect(cssContent).toContain('transition: all 0.2s ease');
    });
  });

  describe('默认值行为', () => {
    it('应该在未提供props时使用默认值', () => {
      renderGlobalStyles();
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      // 默认应该启用所有功能
      expect(cssContent).toContain('box-sizing: border-box'); // 重置样式
      expect(cssContent).toContain('::-webkit-scrollbar'); // 滚动条样式
      expect(cssContent).toContain('@keyframes tech-glow-pulse'); // 动画
    });

    it('应该正确处理显式的默认值', () => {
      renderGlobalStyles({ 
        enableGlobalReset: true,
        enableScrollbarStyling: true
      });
      
      const styleElement = document.getElementById('tech-global-styles');
      const cssContent = styleElement?.textContent || '';
      
      expect(cssContent).toContain('box-sizing: border-box');
      expect(cssContent).toContain('::-webkit-scrollbar');
    });
  });
});