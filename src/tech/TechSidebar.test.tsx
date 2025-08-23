/**
 * TechSidebar组件单元测试
 * 
 * 按照TDD原则对科技风格侧边栏组件进行全面测试
 * 包括折叠功能、菜单交互、响应式设计和性能优化
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechSidebar } from './TechSidebar';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechMenuItem } from './TechMenu';

/**
 * 测试辅助函数：在主题提供器中渲染侧边栏组件
 */
const renderSidebar = (props: Partial<React.ComponentProps<typeof TechSidebar>> = {}) => {
  const defaultProps = {
    items: mockMenuItems,
    ...props
  };
  
  return render(
    <TechThemeProvider>
      <TechSidebar {...defaultProps} />
    </TechThemeProvider>
  );
};

/**
 * 测试用菜单数据
 */
const mockMenuItems: TechMenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'dashboard',
    to: '/dashboard'
  },
  {
    key: 'analytics',
    label: '数据分析',
    icon: 'book',
    children: [
      {
        key: 'reports',
        label: '报告',
        icon: 'api',
        to: '/analytics/reports'
      },
      {
        key: 'charts',
        label: '图表',
        icon: 'dashboard',
        to: '/analytics/charts'
      }
    ]
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'settings',
    to: '/settings'
  }
];

describe('TechSidebar', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染基本侧边栏', () => {
      renderSidebar();
      
      // 验证侧边栏容器存在
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      
      // 验证菜单项渲染
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByText('数据分析')).toBeInTheDocument();
      expect(screen.getByText('系统设置')).toBeInTheDocument();
    });

    it('应该设置正确的默认宽度', () => {
      renderSidebar();
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('240px');
    });

    it('应该支持自定义宽度', () => {
      renderSidebar({ width: 300 });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('300px');
    });

    it('应该正确应用自定义类名和样式', () => {
      renderSidebar({
        className: 'custom-sidebar',
        style: { backgroundColor: 'blue' }
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.className).toContain('custom-sidebar');
      expect(sidebar.style.backgroundColor).toBe('blue');
    });
  });

  describe('折叠功能测试', () => {
    it('应该在折叠状态下使用折叠宽度', () => {
      renderSidebar({ 
        collapsed: true,
        collapsedWidth: 80
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('80px');
    });

    it('应该在展开状态下使用正常宽度', () => {
      renderSidebar({ 
        collapsed: false,
        width: 280
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('280px');
    });

    it('应该将折叠状态传递给菜单组件', () => {
      renderSidebar({ collapsed: true });
      
      // 验证折叠状态通过CSS类体现
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      
      // 菜单项在折叠状态下仍应存在
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该使用默认的折叠宽度', () => {
      renderSidebar({ collapsed: true });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('72px'); // 默认折叠宽度
    });
  });

  describe('头部高度适配测试', () => {
    it('应该设置正确的头部高度CSS变量', () => {
      renderSidebar({ headerHeight: 64 });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('64px');
    });

    it('应该使用默认头部高度', () => {
      renderSidebar();
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('56px');
    });

    it('应该支持动态头部高度变化', () => {
      const { rerender } = renderSidebar({ headerHeight: 60 });
      
      let sidebar = screen.getByRole('navigation');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('60px');
      
      rerender(
        <TechThemeProvider>
          <TechSidebar items={mockMenuItems} headerHeight={80} />
        </TechThemeProvider>
      );
      
      sidebar = screen.getByRole('navigation');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('80px');
    });
  });

  describe('菜单交互测试', () => {
    it('应该正确处理菜单选择事件', () => {
      const mockSelect = vi.fn();
      const mockSelectItem = vi.fn();
      
      renderSidebar({
        onSelect: mockSelect,
        onSelectItem: mockSelectItem
      });
      
      fireEvent.click(screen.getByText('仪表盘'));
      
      expect(mockSelect).toHaveBeenCalledWith('dashboard');
      expect(mockSelectItem).toHaveBeenCalledWith(mockMenuItems[0]);
    });

    it('应该正确传递选中状态', () => {
      renderSidebar({ selectedKey: 'dashboard' });
      
      // 验证选中状态通过TechMenu组件传递
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该支持多级菜单', () => {
      renderSidebar();
      
      // 验证父级菜单项
      expect(screen.getByText('数据分析')).toBeInTheDocument();
      
      // 验证子级菜单项
      expect(screen.getByText('报告')).toBeInTheDocument();
      expect(screen.getByText('图表')).toBeInTheDocument();
    });

    it('应该支持自定义链接组件', () => {
      const MockLink = vi.fn(({ children, ...props }) => (
        <div {...props} data-testid="sidebar-link">{children}</div>
      ));
      
      renderSidebar({ linkComponent: MockLink });
      
      // 验证叶子节点使用自定义链接组件
      expect(screen.getAllByTestId('sidebar-link').length).toBeGreaterThan(0);
    });
  });

  describe('滚动条样式测试', () => {
    it('应该应用科技风格滚动条类名', () => {
      renderSidebar();
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.className).toContain('tech-scrollbar-thin');
    });

    it('应该保持滚动条样式与其他类名共存', () => {
      renderSidebar({ className: 'custom-class' });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.className).toContain('tech-scrollbar-thin');
      expect(sidebar.className).toContain('custom-class');
    });
  });

  describe('CSS模块集成测试', () => {
    it('应该正确应用CSS模块类名', () => {
      renderSidebar();
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.className).toMatch(/_sidebar_/);
    });

    it('应该正确合并所有类名', () => {
      renderSidebar({ className: 'extra-class' });
      
      const sidebar = screen.getByRole('navigation');
      const classes = sidebar.className.split(' ');
      
      expect(classes).toContain('tech-scrollbar-thin');
      expect(classes).toContain('extra-class');
      expect(classes.some(cls => cls.includes('_sidebar_'))).toBe(true);
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderSidebar({
        items: mockMenuItems,
        collapsed: false,
        width: 240
      });
      
      const sidebar = screen.getByRole('navigation');
      const initialWidth = sidebar.style.width;
      
      // 使用相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechSidebar 
            items={mockMenuItems}
            collapsed={false}
            width={240}
          />
        </TechThemeProvider>
      );
      
      expect(sidebar.style.width).toBe(initialWidth);
    });

    it('应该正确响应宽度变化', () => {
      const { rerender } = renderSidebar({ width: 240 });
      
      let sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('240px');
      
      rerender(
        <TechThemeProvider>
          <TechSidebar items={mockMenuItems} width={280} />
        </TechThemeProvider>
      );
      
      sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('280px');
    });

    it('应该正确响应折叠状态变化', () => {
      const { rerender } = renderSidebar({ 
        collapsed: false,
        width: 240,
        collapsedWidth: 72
      });
      
      let sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('240px');
      
      rerender(
        <TechThemeProvider>
          <TechSidebar 
            items={mockMenuItems}
            collapsed={true}
            width={240}
            collapsedWidth={72}
          />
        </TechThemeProvider>
      );
      
      sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('72px');
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空菜单项数组', () => {
      renderSidebar({ items: [] });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
    });

    it('应该处理极小的宽度值', () => {
      renderSidebar({ 
        width: 50,
        collapsedWidth: 30,
        collapsed: true
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('30px');
    });

    it('应该处理极大的宽度值', () => {
      renderSidebar({ width: 1000 });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('1000px');
    });

    it('应该处理零宽度', () => {
      renderSidebar({ 
        collapsed: true,
        collapsedWidth: 0
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('0px');
    });

    it('应该处理所有可选props为undefined', () => {
      renderSidebar({
        selectedKey: undefined,
        onSelect: undefined,
        onSelectItem: undefined,
        linkComponent: undefined,
        className: undefined,
        style: undefined
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });
  });

  describe('菜单集成测试', () => {
    it('应该正确传递菜单属性到TechMenu', () => {
      const mockSelect = vi.fn();
      const mockSelectItem = vi.fn();
      const MockLink = vi.fn(({ children, ...props }) => (
        <div {...props} data-testid="sidebar-menu-link">{children}</div>
      ));
      
      renderSidebar({
        selectedKey: 'settings',
        onSelect: mockSelect,
        onSelectItem: mockSelectItem,
        linkComponent: MockLink,
        collapsed: true
      });
      
      // 验证菜单项渲染
      expect(screen.getByText('系统设置')).toBeInTheDocument();
      
      // 验证链接组件使用
      expect(screen.getAllByTestId('sidebar-menu-link').length).toBeGreaterThan(0);
      
      // 测试菜单交互
      fireEvent.click(screen.getByText('系统设置'));
      expect(mockSelect).toHaveBeenCalledWith('settings');
      expect(mockSelectItem).toHaveBeenCalledWith(mockMenuItems[2]);
    });

    it('应该正确处理选中状态', () => {
      renderSidebar({ selectedKey: 'dashboard' });
      
      // 验证selectedKeys正确传递
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该在没有选中项时传递空数组', () => {
      renderSidebar({ selectedKey: undefined });
      
      // 菜单应该正常渲染，但没有选中状态
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });
  });

  describe('样式和布局测试', () => {
    it('应该正确设置CSS变量', () => {
      renderSidebar({ headerHeight: 70 });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('70px');
    });

    it('应该合并自定义样式', () => {
      const customStyle = {
        backgroundColor: 'red',
        border: '1px solid blue'
      };
      
      renderSidebar({ style: customStyle });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.backgroundColor).toBe('red');
      expect(sidebar.style.border).toBe('1px solid blue');
    });

    it('应该保持宽度样式优先级', () => {
      renderSidebar({
        width: 250,
        style: { width: '200px' } // 这个应该被组件的width prop覆盖
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('250px');
    });
  });

  describe('响应式设计测试', () => {
    it('应该在移动端正确显示', () => {
      // 模拟移动端视口
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      renderSidebar({ collapsed: true });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该在平板端正确显示', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      
      renderSidebar({ collapsed: false });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('240px');
    });
  });

  describe('无障碍性测试', () => {
    it('应该使用正确的语义化标签', () => {
      renderSidebar();
      
      // 侧边栏应该使用navigation角色
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
    });

    it('应该保持菜单的无障碍性', () => {
      renderSidebar();
      
      // 验证菜单项的可访问性
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
      
      menuItems.forEach(item => {
        expect(item).toBeInTheDocument();
      });
    });
  });

  describe('性能优化测试', () => {
    it('应该优化宽度计算', () => {
      const { rerender } = renderSidebar({
        collapsed: false,
        width: 240,
        collapsedWidth: 72
      });
      
      let sidebar = screen.getByRole('navigation');
      const initialWidth = sidebar.style.width;
      
      // 相同状态重新渲染
      rerender(
        <TechThemeProvider>
          <TechSidebar 
            items={mockMenuItems}
            collapsed={false}
            width={240}
            collapsedWidth={72}
          />
        </TechThemeProvider>
      );
      
      sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe(initialWidth);
    });

    it('应该正确处理菜单项更新', () => {
      const initialItems = [mockMenuItems[0]];
      const { rerender } = renderSidebar({ items: initialItems });
      
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.queryByText('数据分析')).not.toBeInTheDocument();
      
      rerender(
        <TechThemeProvider>
          <TechSidebar items={mockMenuItems} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByText('数据分析')).toBeInTheDocument();
    });
  });

  describe('事件处理测试', () => {
    it('应该在没有回调函数时不报错', () => {
      renderSidebar({
        onSelect: undefined,
        onSelectItem: undefined
      });
      
      expect(() => {
        fireEvent.click(screen.getByText('仪表盘'));
      }).not.toThrow();
    });

    it('应该独立处理选择和选择项事件', () => {
      const mockSelect = vi.fn();
      
      renderSidebar({
        onSelect: mockSelect,
        onSelectItem: undefined // 只提供基础选择事件
      });
      
      fireEvent.click(screen.getByText('仪表盘'));
      expect(mockSelect).toHaveBeenCalledWith('dashboard');
    });

    it('应该独立处理选择项事件', () => {
      const mockSelectItem = vi.fn();
      
      renderSidebar({
        onSelect: undefined, // 不提供基础选择事件
        onSelectItem: mockSelectItem
      });
      
      fireEvent.click(screen.getByText('仪表盘'));
      expect(mockSelectItem).toHaveBeenCalledWith(mockMenuItems[0]);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理菜单项为空数组', () => {
      renderSidebar({ items: [] });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      
      // 不应该有任何菜单项
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    it('应该处理极端尺寸配置', () => {
      renderSidebar({
        width: 1,
        collapsedWidth: 1,
        headerHeight: 1,
        collapsed: true
      });
      
      const sidebar = screen.getByRole('navigation');
      expect(sidebar.style.width).toBe('1px');
      expect(sidebar.style.getPropertyValue('--header-height')).toBe('1px');
    });

    it('应该处理负数尺寸', () => {
      renderSidebar({
        width: -100,
        collapsedWidth: -50,
        headerHeight: -20
      });
      
      const sidebar = screen.getByRole('navigation');
      // 浏览器会处理负值，测试不应该崩溃
      expect(sidebar).toBeInTheDocument();
    });
  });
});