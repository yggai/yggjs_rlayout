/**
 * TechThemeProvider组件单元测试
 * 
 * 按照TDD原则对科技风格主题提供器进行全面测试
 * 包括主题注入、CSS变量设置、性能优化和错误处理
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechThemeProvider, useTechTheme } from './TechThemeProvider';
import type { TechTheme } from './types';

/**
 * 测试组件：用于测试主题Hook
 */
const TestComponent = () => {
  const theme = useTechTheme();
  return (
    <div data-testid="theme-consumer">
      <span data-testid="primary-color">{theme.colors.primary}</span>
      <span data-testid="accent-color">{theme.colors.accent}</span>
      <span data-testid="glow-effect">{theme.effects.glow}</span>
    </div>
  );
};

/**
 * 测试组件：用于测试错误边界
 */
const TestComponentWithoutProvider = () => {
  try {
    useTechTheme();
    return <div>不应该到达这里</div>;
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>;
  }
};

describe('TechThemeProvider', () => {
  // 监控 DOM 样式方法而不替换整个节点，避免破坏渲染
  let setPropertySpy: ReturnType<typeof vi.spyOn>;
  let removePropertySpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // 重置背景值
    document.body.style.background = '';
    // 监听样式方法
    setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');
    removePropertySpy = vi.spyOn(document.documentElement.style, 'removeProperty');
  });

  afterEach(() => {
    setPropertySpy.mockRestore();
    removePropertySpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('基本功能测试', () => {
    it('应该正确提供默认主题', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(screen.getByTestId('theme-consumer')).toBeInTheDocument();
      expect(screen.getByTestId('primary-color').textContent).toBe('#5aa2ff');
      expect(screen.getByTestId('accent-color').textContent).toBe('#27e0ff');
    });

    it('应该正确合并自定义主题', () => {
      const customTheme: Partial<TechTheme> = {
        colors: {
          bg: '#0a0f1e',
          panel: '#0e1630',
          panel2: '#172042',
          muted: '#475569',
          primary: '#ff5733',
          accent: '#33ff57',
          border: '#475569',
          ring: '#27e0ff',
          text: '#cfe1ff',
          textMuted: '#94a3b8'
        }
      };

      render(
        <TechThemeProvider theme={customTheme}>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(screen.getByTestId('primary-color').textContent).toBe('#ff5733');
      expect(screen.getByTestId('accent-color').textContent).toBe('#33ff57');
    });

    it('应该在没有自定义主题时使用默认主题', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      // 验证默认主题值
      expect(screen.getByTestId('primary-color').textContent).toBe('#5aa2ff');
      expect(screen.getByTestId('glow-effect').textContent).toContain('rgba(39,224,255,.16');
    });
  });

  describe('CSS变量注入测试', () => {
    it('应该设置所有CSS变量', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      // 验证所有CSS变量都被设置
      expect(setPropertySpy).toHaveBeenCalledWith('--tech-bg', '#0a0f1e');
      expect(setPropertySpy).toHaveBeenCalledWith('--tech-panel', '#0e1630');
      expect(setPropertySpy).toHaveBeenCalledWith('--tech-primary', '#5aa2ff');
      expect(setPropertySpy).toHaveBeenCalledWith('--tech-accent', '#27e0ff');
      expect(setPropertySpy).toHaveBeenCalledWith('--tech-text', '#cfe1ff');
    });

    it('应该设置效果相关的CSS变量', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        '--tech-glow',
        expect.stringContaining('rgba(39,224,255,.16)')
      );
      expect(setPropertySpy).toHaveBeenCalledWith(
        '--tech-backdrop',
        'saturate(140%) blur(10px)'
      );
    });

    it('应该设置页面背景样式', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(document.body.style.background).toContain(
        'radial-gradient'
      );
      expect(document.body.style.background).toContain('#0a0f1e');
    });

    it('应该使用自定义主题更新CSS变量', () => {
      const customTheme: Partial<TechTheme> = {
        colors: {
          bg: '#0a0f1e',
          panel: '#0e1630',
          panel2: '#172042',
          muted: '#475569',
          primary: '#custom-primary',
          accent: '#27e0ff',
          border: '#475569',
          ring: '#27e0ff',
          text: '#cfe1ff',
          textMuted: '#94a3b8'
        }
      };

      render(
        <TechThemeProvider theme={customTheme}>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(setPropertySpy).toHaveBeenCalledWith('--tech-primary', '#custom-primary');
    });
  });

  describe('清理功能测试', () => {
    it('应该在卸载时清理CSS变量', () => {
      const { unmount } = render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      unmount();

      // 验证所有CSS变量都被清理
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-bg');
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-panel');
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-primary');
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-accent');
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-glow');
      expect(removePropertySpy).toHaveBeenCalledWith('--tech-backdrop');
    });

    it('应该清理所有预期的CSS变量', () => {
      const { unmount } = render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      unmount();

      const expectedProperties = [
        '--tech-bg', '--tech-panel', '--tech-panel-2', '--tech-muted',
        '--tech-primary', '--tech-accent', '--tech-border', '--tech-ring',
        '--tech-text', '--tech-text-muted', '--tech-glow', '--tech-backdrop'
      ];

      expectedProperties.forEach(property => {
        expect(removePropertySpy).toHaveBeenCalledWith(property);
      });
    });
  });

  describe('主题更新测试', () => {
    it('应该在主题变化时重新设置CSS变量', () => {
      const { rerender } = render(
        <TechThemeProvider theme={{ colors: { bg: '#0a0f1e', panel: '#0e1630', panel2: '#172042', muted: '#475569', primary: '#old-color', accent: '#27e0ff', border: '#475569', ring: '#27e0ff', text: '#cfe1ff', textMuted: '#94a3b8' } }}>
          <TestComponent />
        </TechThemeProvider>
      );

      setPropertySpy.mockClear();

      rerender(
        <TechThemeProvider theme={{ colors: { bg: '#0a0f1e', panel: '#0e1630', panel2: '#172042', muted: '#475569', primary: '#new-color', accent: '#27e0ff', border: '#475569', ring: '#27e0ff', text: '#cfe1ff', textMuted: '#94a3b8' } }}>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(setPropertySpy).toHaveBeenCalledWith('--tech-primary', '#new-color');
    });

    it('应该在相同主题时避免重复设置', () => {
      const theme = { colors: { bg: '#0a0f1e', panel: '#0e1630', panel2: '#172042', muted: '#475569', primary: '#same-color', accent: '#27e0ff', border: '#475569', ring: '#27e0ff', text: '#cfe1ff', textMuted: '#94a3b8' } };
      
      const { rerender } = render(
        <TechThemeProvider theme={theme}>
          <TestComponent />
        </TechThemeProvider>
      );

      const initialCallCount = setPropertySpy.mock.calls.length;

      rerender(
        <TechThemeProvider theme={theme}>
          <TestComponent />
        </TechThemeProvider>
      );

      // CSS变量设置调用次数不应该增加
      expect(setPropertySpy.mock.calls.length).toBe(initialCallCount);
    });
  });

  describe('useTechTheme Hook测试', () => {
    it('应该在Provider外部使用时抛出错误', () => {
      const ThrowingComponent = () => {
        useTechTheme();
        return <div>Should not render</div>;
      };

      expect(() => {
        render(<ThrowingComponent />);
      }).toThrow('useTechTheme必须在TechThemeProvider内部使用');
    });

    it('应该返回正确的主题对象', () => {
      const TestThemeConsumer = () => {
        const theme = useTechTheme();
        expect(theme).toHaveProperty('colors');
        expect(theme).toHaveProperty('effects');
        expect(theme).toHaveProperty('gradients');
        expect(theme.colors).toHaveProperty('primary');
        expect(theme.colors).toHaveProperty('accent');
        return <div>Success</div>;
      };

      render(
        <TechThemeProvider>
          <TestThemeConsumer />
        </TechThemeProvider>
      );
    });
  });

  describe('性能测试', () => {
    it('应该使用memo优化重复渲染', () => {
      const TestChild = vi.fn(() => <div>Child</div>);
      
      const { rerender } = render(
        <TechThemeProvider>
          <TestChild />
        </TechThemeProvider>
      );

      TestChild.mockClear();

      // 使用相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TestChild />
        </TechThemeProvider>
      );

      // 由于使用了memo，子组件不应该重新渲染
      expect(TestChild).not.toHaveBeenCalled();
    });

    it('应该正确处理主题合并的性能优化', () => {
      const { rerender } = render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      const initialPrimaryColor = screen.getByTestId('primary-color').textContent;

      // 使用undefined主题重新渲染
      rerender(
        <TechThemeProvider theme={undefined}>
          <TestComponent />
        </TechThemeProvider>
      );

      // 主题应该保持不变
      expect(screen.getByTestId('primary-color')).toHaveTextContent(initialPrimaryColor!);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空的自定义主题对象', () => {
      render(
        <TechThemeProvider theme={{}}>
          <TestComponent />
        </TechThemeProvider>
      );

      // 应该使用默认值
      expect(screen.getByTestId('primary-color').textContent).toBe('#5aa2ff');
    });

    it('应该处理部分自定义主题', () => {
      const partialTheme: Partial<TechTheme> = {
        effects: {
          glow: 'custom-glow-effect',
          backdrop: 'saturate(140%) blur(10px)'
        }
      };

      render(
        <TechThemeProvider theme={partialTheme}>
          <TestComponent />
        </TechThemeProvider>
      );

      // 自定义部分应该生效
      expect(screen.getByTestId('glow-effect').textContent).toBe('custom-glow-effect');
      // 默认部分应该保持不变
      expect(screen.getByTestId('primary-color').textContent).toBe('#5aa2ff');
    });

    it('应该处理嵌套的主题提供器', () => {
      const outerTheme: Partial<TechTheme> = {
        colors: { bg: '#0a0f1e', panel: '#0e1630', panel2: '#172042', muted: '#475569', primary: '#outer-primary', accent: '#27e0ff', border: '#475569', ring: '#27e0ff', text: '#cfe1ff', textMuted: '#94a3b8' }
      };
      
      const innerTheme: Partial<TechTheme> = {
        colors: { bg: '#0a0f1e', panel: '#0e1630', panel2: '#172042', muted: '#475569', primary: '#inner-primary', accent: '#27e0ff', border: '#475569', ring: '#27e0ff', text: '#cfe1ff', textMuted: '#94a3b8' }
      };

      render(
        <TechThemeProvider theme={outerTheme}>
          <TechThemeProvider theme={innerTheme}>
            <TestComponent />
          </TechThemeProvider>
        </TechThemeProvider>
      );

      // 应该使用内层主题
      expect(screen.getByTestId('primary-color').textContent).toBe('#inner-primary');
    });
  });

  describe('类型安全测试', () => {
    it('应该接受符合TechTheme接口的主题对象', () => {
      const validTheme: Partial<TechTheme> = {
        colors: {
          bg: '#0a0f1e',
          panel: '#0e1630',
          panel2: '#172042',
          muted: '#475569',
          primary: '#valid-color',
          accent: '#another-valid-color',
          border: '#475569',
          ring: '#27e0ff',
          text: '#cfe1ff',
          textMuted: '#94a3b8'
        },
        effects: {
          glow: 'valid-glow-effect',
          backdrop: 'valid-backdrop-effect'
        }
      };

      expect(() => {
        render(
          <TechThemeProvider theme={validTheme}>
            <div>Valid theme</div>
          </TechThemeProvider>
        );
      }).not.toThrow();
    });
  });
});