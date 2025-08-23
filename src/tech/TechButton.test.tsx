/**
 * TechButton组件单元测试
 * 
 * 按照TDD原则对科技风格按钮组件进行全面测试
 * 包括基本功能、性能、无障碍性和错误处理
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechButton } from './TechButton';
import { TechThemeProvider } from './TechThemeProvider';

/**
 * 测试辅助函数：在主题提供器中渲染按钮
 */
const renderButton = (props: React.ComponentProps<typeof TechButton>) => {
  return render(
    <TechThemeProvider>
      <TechButton {...props} />
    </TechThemeProvider>
  );
};

describe('TechButton', () => {
  describe('基本功能测试', () => {
    it('应该正确渲染基本按钮', () => {
      renderButton({ children: '测试按钮' });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('测试按钮');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('应该支持不同的按钮类型', () => {
      renderButton({ children: '提交', type: 'submit' });
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('应该应用正确的默认CSS类名', () => {
      renderButton({ children: '测试' });
      
      const button = screen.getByRole('button');
      // 由于CSS模块的类名会被哈希处理，我们检查类名是否包含对应的样式标识符
      expect(button.className).toMatch(/_button_/);
      expect(button.className).toMatch(/_secondary_/);
      expect(button.className).toMatch(/_medium_/);
    });
  });

  describe('视觉风格测试', () => {
    it('应该支持不同的视觉风格', () => {
      const { rerender } = renderButton({ 
        children: '主要按钮', 
        variant: 'primary' 
      });
      
      let button = screen.getByRole('button');
      expect(button.className).toMatch(/_primary_/);

      rerender(
        <TechThemeProvider>
          <TechButton variant="ghost">幽灵按钮</TechButton>
        </TechThemeProvider>
      );
      
      button = screen.getByRole('button');
      expect(button.className).toMatch(/_ghost_/);
    });

    it('应该支持不同的尺寸', () => {
      const { rerender } = renderButton({ 
        children: '小按钮', 
        size: 'small' 
      });
      
      let button = screen.getByRole('button');
      expect(button.className).toMatch(/_small_/);

      rerender(
        <TechThemeProvider>
          <TechButton size="large">大按钮</TechButton>
        </TechThemeProvider>
      );
      
      button = screen.getByRole('button');
      expect(button.className).toMatch(/_large_/);
    });

    it('应该正确应用自定义类名和样式', () => {
      renderButton({ 
        children: '自定义按钮',
        className: 'custom-class',
        style: { backgroundColor: 'red' }
      });
      
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
      expect(button.style.backgroundColor).toBe('red');
    });
  });

  describe('图标功能测试', () => {
    it('应该正确渲染带图标的按钮', () => {
      renderButton({ 
        children: '添加',
        icon: 'plus'
      });
      
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('tech-icon-plus');
      
      expect(button).toContainElement(icon);
      expect(button).toHaveTextContent('添加');
    });

    it('应该支持仅图标模式', () => {
      renderButton({ 
        icon: 'settings',
        iconOnly: true,
        'aria-label': '设置'
      });
      
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('tech-icon-settings');
      
      expect(button).toContainElement(icon);
      expect(button.textContent).not.toContain('设置');
      expect(button).toHaveAttribute('aria-label', '设置');
    });

    it('应该根据尺寸调整图标大小', () => {
      renderButton({ 
        icon: 'menu',
        size: 'small',
        iconOnly: true
      });
      
      const icon = screen.getByTestId('tech-icon-menu');
      expect(icon).toHaveAttribute('width', '14');
      expect(icon).toHaveAttribute('height', '14');
    });
  });

  describe('交互功能测试', () => {
    it('应该正确处理点击事件', () => {
      const handleClick = vi.fn();
      renderButton({ 
        children: '点击我',
        onClick: handleClick
      });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick.mock.calls[0][0]).toHaveProperty('type', 'click');
    });

    it('应该在禁用状态下阻止点击', () => {
      const handleClick = vi.fn();
      renderButton({ 
        children: '禁用按钮',
        disabled: true,
        onClick: handleClick
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('应该在加载状态下阻止点击', () => {
      const handleClick = vi.fn();
      renderButton({ 
        children: '加载中',
        loading: true,
        onClick: handleClick
      });
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('加载状态测试', () => {
    it('应该在加载状态下显示加载器', () => {
      renderButton({ 
        children: '提交',
        loading: true
      });
      
      const button = screen.getByRole('button');
      const loader = button.querySelector('[class*="loader"]');
      
      expect(loader).not.toBeNull();
      expect(button.textContent).not.toContain('提交');
    });

    it('应该在非加载状态下显示正常内容', () => {
      renderButton({ 
        children: '正常按钮',
        icon: 'user',
        loading: false
      });
      
      const button = screen.getByRole('button');
      const loader = button.querySelector('[class*="loader"]');
      
      expect(loader).toBeNull();
      expect(button.textContent).toBe('正常按钮');
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
    });
  });

  describe('无障碍性测试', () => {
    it('应该为仅图标按钮提供默认aria-label', () => {
      renderButton({ 
        icon: 'help',
        iconOnly: true
      });
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'help 按钮');
    });

    it('应该优先使用用户提供的aria-label', () => {
      renderButton({ 
        icon: 'settings',
        iconOnly: true,
        'aria-label': '打开设置'
      });
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '打开设置');
    });

    it('应该在加载状态下设置aria-busy', () => {
      renderButton({ 
        children: '加载中',
        loading: true
      });
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderButton({ 
        children: '测试',
        variant: 'primary'
      });
      
      const button = screen.getByRole('button');
      const initialClassName = button.className;
      
      // 使用相同的props重新渲染
      rerender(
        <TechThemeProvider>
          <TechButton variant="primary">测试</TechButton>
        </TechThemeProvider>
      );
      
      // 类名应该保持一致
      expect(button.className).toBe(initialClassName);
    });

    it('应该正确处理动态样式计算', () => {
      renderButton({ 
        children: '带图标',
        icon: 'plus',
        style: { margin: '10px' }
      });
      
      const button = screen.getByRole('button');
      expect(button.style.gap).toBe('8px');
      expect(button.style.margin).toBe('10px');
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空children', () => {
      renderButton({ icon: 'menu', iconOnly: true });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-menu')).toBeInTheDocument();
    });

    it('应该处理未定义的onClick', () => {
      renderButton({ children: '无点击事件' });
      
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('应该正确处理布尔属性', () => {
      renderButton({ 
        children: '测试',
        disabled: false,
        loading: false,
        iconOnly: false
      });
      
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
      expect(button.getAttribute('aria-busy')).toBe('false');
    });
  });
});