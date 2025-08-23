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
  // Mock DOM方法
  const mockSetProperty = vi.fn();
  const mockRemoveProperty = vi.fn();
  let originalBody: typeof document.body;
  let originalDocumentElement: typeof document.documentElement;

  beforeEach(() => {
    // 保存原始DOM对象
    originalBody = document.body;
    originalDocumentElement = document.documentElement;

    // Mock document.body.style
    Object.defineProperty(document, 'body', {
      value: {
        style: {
          background: ''
        }
      },
      configurable: true
    });

    // Mock document.documentElement.style
    Object.defineProperty(document, 'documentElement', {
      value: {
        style: {
          setProperty: mockSetProperty,
          removeProperty: mockRemoveProperty
        }
      },
      configurable: true
    });
  });

  afterEach(() => {
    // 恢复原始DOM对象
    Object.defineProperty(document, 'body', {
      value: originalBody,
      configurable: true
    });
    Object.defineProperty(document, 'documentElement', {
      value: originalDocumentElement,
      configurable: true
    });
    
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
          primary: '#ff5733',
          accent: '#33ff57'
        } as Partial<TechTheme['colors']>
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
      expect(mockSetProperty).toHaveBeenCalledWith('--tech-bg', '#0a0f1e');
      expect(mockSetProperty).toHaveBeenCalledWith('--tech-panel', '#0e1630');
      expect(mockSetProperty).toHaveBeenCalledWith('--tech-primary', '#5aa2ff');
      expect(mockSetProperty).toHaveBeenCalledWith('--tech-accent', '#27e0ff');
      expect(mockSetProperty).toHaveBeenCalledWith('--tech-text', '#cfe1ff');
    });

    it('应该设置效果相关的CSS变量', () => {
      render(
        <TechThemeProvider>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(mockSetProperty).toHaveBeenCalledWith(
        '--tech-glow',
        expect.stringContaining('rgba(39,224,255,.16)')
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
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
          primary: '#custom-primary'
        } as Partial<TechTheme['colors']>
      };

      render(
        <TechThemeProvider theme={customTheme}>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(mockSetProperty).toHaveBeenCalledWith('--tech-primary', '#custom-primary');
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
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-bg');
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-panel');
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-primary');
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-accent');
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-glow');
      expect(mockRemoveProperty).toHaveBeenCalledWith('--tech-backdrop');
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
        expect(mockRemoveProperty).toHaveBeenCalledWith(property);
      });
    });
  });

  describe('主题更新测试', () => {
    it('应该在主题变化时重新设置CSS变量', () => {
      const { rerender } = render(
        <TechThemeProvider theme={{ colors: { primary: '#old-color' } as Partial<TechTheme['colors']> }}>
          <TestComponent />
        </TechThemeProvider>
      );

      mockSetProperty.mockClear();

      rerender(
        <TechThemeProvider theme={{ colors: { primary: '#new-color' } as Partial<TechTheme['colors']> }}>
          <TestComponent />
        </TechThemeProvider>
      );

      expect(mockSetProperty).toHaveBeenCalledWith('--tech-primary', '#new-color');
    });

    it('应该在相同主题时避免重复设置', () => {
      const theme = { colors: { primary: '#same-color' } as Partial<TechTheme['colors']> };
      
      const { rerender } = render(
        <TechThemeProvider theme={theme}>
          <TestComponent />
        </TechThemeProvider>
      );

      const initialCallCount = mockSetProperty.mock.calls.length;

      rerender(
        <TechThemeProvider theme={theme}>
          <TestComponent />
        </TechThemeProvider>
      );

      // CSS变量设置调用次数不应该增加
      expect(mockSetProperty.mock.calls.length).toBe(initialCallCount);
    });
  });

  describe('useTechTheme Hook测试', () => {
    it('应该在Provider外部使用时抛出错误', () => {
      expect(() => {
        render(<TestComponentWithoutProvider />);
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
        colors: { primary: '#outer-primary' } as Partial<TechTheme['colors']>
      };
      
      const innerTheme: Partial<TechTheme> = {
        colors: { primary: '#inner-primary' } as Partial<TechTheme['colors']>
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
          primary: '#valid-color',
          accent: '#another-valid-color'
        } as Partial<TechTheme['colors']>,
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