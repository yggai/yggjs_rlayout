/**
 * TechIcon组件单元测试
 * 
 * 按照TDD原则对科技风格图标组件进行全面测试
 * 包括图标渲染、错误处理、性能优化和无障碍性
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechIcon, getTechIconNames, isTechIconExists } from './TechIcon';
import type { TechIconName } from './types';

// Mock console.warn to test warning behavior
const originalWarn = console.warn;

describe('TechIcon', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染有效的图标', () => {
      render(<TechIcon name="menu" />);
      
      const icon = screen.getByTestId('tech-icon-menu');
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('应该设置正确的SVG属性', () => {
      render(<TechIcon name="search" size={24} />);
      
      const icon = screen.getByTestId('tech-icon-search');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
      expect(icon).toHaveAttribute('fill', 'none');
      expect(icon).toHaveAttribute('stroke', 'currentColor');
      expect(icon).toHaveAttribute('stroke-width', '1.6');
      expect(icon).toHaveAttribute('stroke-linecap', 'round');
      expect(icon).toHaveAttribute('stroke-linejoin', 'round');
    });

    it('应该应用默认尺寸', () => {
      render(<TechIcon name="user" />);
      
      const icon = screen.getByTestId('tech-icon-user');
      expect(icon).toHaveAttribute('width', '18');
      expect(icon).toHaveAttribute('height', '18');
    });

    it('应该支持自定义尺寸', () => {
      render(<TechIcon name="settings" size={32} />);
      
      const icon = screen.getByTestId('tech-icon-settings');
      expect(icon).toHaveAttribute('width', '32');
      expect(icon).toHaveAttribute('height', '32');
    });
  });

  describe('样式和类名测试', () => {
    it('应该应用默认tech-icon类名', () => {
      render(<TechIcon name="home" />);
      
      const icon = screen.getByTestId('tech-icon-home');
      expect(icon).toHaveClass('tech-icon');
    });

    it('应该支持额外的CSS类名', () => {
      render(<TechIcon name="dashboard" className="custom-icon" />);
      
      const icon = screen.getByTestId('tech-icon-dashboard');
      expect(icon).toHaveClass('tech-icon', 'custom-icon');
    });

    it('应该支持自定义内联样式', () => {
      const customStyle = { color: 'red', opacity: 0.8 };
      render(<TechIcon name="book" style={customStyle} />);
      
      const icon = screen.getByTestId('tech-icon-book');
      expect(icon).toHaveStyle(customStyle);
    });

    it('应该在没有额外类名时只应用tech-icon', () => {
      render(<TechIcon name="info" className="" />);
      
      const icon = screen.getByTestId('tech-icon-info');
      expect(icon).toHaveClass('tech-icon');
      expect(icon.className).toBe('tech-icon');
    });
  });

  describe('所有图标名称测试', () => {
    it('应该正确渲染所有预定义的图标', () => {
      const iconNames: TechIconName[] = [
        'menu', 'dashboard', 'book', 'info', 'home', 'guide', 'api',
        'search', 'user', 'settings', 'logout', 'chevron-left', 
        'chevron-right', 'chevron-down', 'plus', 'deploy', 'profile', 'help'
      ];

      iconNames.forEach(name => {
        const { unmount } = render(<TechIcon name={name} />);
        
        const icon = screen.getByTestId(`tech-icon-${name}`);
        expect(icon).toBeInTheDocument();
        expect(icon.querySelector('path')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('应该为每个图标包含正确的路径数据', () => {
      render(<TechIcon name="plus" />);
      
      const icon = screen.getByTestId('tech-icon-plus');
      const path = icon.querySelector('path');
      expect(path).toHaveAttribute('d');
      expect(path?.getAttribute('d')).toBeTruthy();
    });
  });

  describe('错误处理测试', () => {
    it('应该处理不存在的图标名称', () => {
      // @ts-expect-error - 测试错误处理
      const { container } = render(<TechIcon name="nonexistent" />);
      
      expect(container.firstChild).toBeNull();
    });

    it('应该在开发环境输出警告', () => {
      // 模拟开发环境
      const originalEnv = process.env.NODE_ENV;
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // 设置为开发环境
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true });

      // @ts-expect-error - 测试错误处理
      render(<TechIcon name="invalid" />);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('TechIcon: Unknown icon name "invalid"')
      );
      
      // 恢复环境
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, configurable: true });
      consoleSpy.mockRestore();
    });

    it('应该在生产环境不输出警告', () => {
      const originalEnv = process.env.NODE_ENV;
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // 设置为生产环境
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true });

      // @ts-expect-error - 测试错误处理
      render(<TechIcon name="invalid" />);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      // 恢复环境
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, configurable: true });
      consoleSpy.mockRestore();
    });
  });

  describe('无障碍性测试', () => {
    it('应该设置正确的无障碍属性', () => {
      render(<TechIcon name="help" />);
      
      const icon = screen.getByTestId('tech-icon-help');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('应该包含测试标识符', () => {
      render(<TechIcon name="logout" />);
      
      const icon = screen.getByTestId('tech-icon-logout');
      expect(icon).toHaveAttribute('data-testid', 'tech-icon-logout');
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = render(<TechIcon name="menu" size={18} />);
      
      const icon = screen.getByTestId('tech-icon-menu');
      const initialPath = icon.querySelector('path')?.getAttribute('d');
      
      // 使用相同的props重新渲染
      rerender(<TechIcon name="menu" size={18} />);
      
      const newPath = icon.querySelector('path')?.getAttribute('d');
      expect(newPath).toBe(initialPath);
    });

    it('应该在props变化时更新', () => {
      const { rerender } = render(<TechIcon name="menu" />);
      
      expect(screen.getByTestId('tech-icon-menu')).toBeInTheDocument();
      
      rerender(<TechIcon name="search" />);
      
      expect(screen.queryByTestId('tech-icon-menu')).not.toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-search')).toBeInTheDocument();
    });
  });

  describe('边界情况测试', () => {
    it('应该处理极小的尺寸', () => {
      render(<TechIcon name="settings" size={1} />);
      
      const icon = screen.getByTestId('tech-icon-settings');
      expect(icon).toHaveAttribute('width', '1');
      expect(icon).toHaveAttribute('height', '1');
    });

    it('应该处理极大的尺寸', () => {
      render(<TechIcon name="dashboard" size={1000} />);
      
      const icon = screen.getByTestId('tech-icon-dashboard');
      expect(icon).toHaveAttribute('width', '1000');
      expect(icon).toHaveAttribute('height', '1000');
    });

    it('应该处理零尺寸', () => {
      render(<TechIcon name="home" size={0} />);
      
      const icon = screen.getByTestId('tech-icon-home');
      expect(icon).toHaveAttribute('width', '0');
      expect(icon).toHaveAttribute('height', '0');
    });
  });
});

describe('TechIcon 工具函数', () => {
  describe('getTechIconNames', () => {
    it('应该返回所有可用的图标名称', () => {
      const names = getTechIconNames();
      
      expect(names).toBeInstanceOf(Array);
      expect(names.length).toBeGreaterThan(0);
      expect(names).toContain('menu');
      expect(names).toContain('search');
      expect(names).toContain('user');
    });

    it('应该返回预期数量的图标', () => {
      const names = getTechIconNames();
      
      // 当前应该有18个图标
      expect(names).toHaveLength(18);
    });
  });

  describe('isTechIconExists', () => {
    it('应该正确判断存在的图标', () => {
      expect(isTechIconExists('menu')).toBe(true);
      expect(isTechIconExists('search')).toBe(true);
      expect(isTechIconExists('settings')).toBe(true);
    });

    it('应该正确判断不存在的图标', () => {
      expect(isTechIconExists('nonexistent')).toBe(false);
      expect(isTechIconExists('')).toBe(false);
      expect(isTechIconExists('MENU')).toBe(false);
    });

    it('应该提供正确的类型守卫', () => {
      const iconName: string = 'menu';
      
      if (isTechIconExists(iconName)) {
        // TypeScript应该将iconName推断为TechIconName类型
        const icon = <TechIcon name={iconName} />;
        expect(icon.props.name).toBe('menu');
      }
    });
  });
});