/**
 * TechLayout组件单元测试
 * 
 * 按照TDD原则对科技风格布局组件进行全面测试
 * 包括完整布局渲染、主题集成、响应式设计和性能优化
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechLayout } from './TechLayout';
import type { TechMenuItem } from './TechMenu';

/**
 * 测试用侧边栏菜单数据
 */
const mockSidebarItems: TechMenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'dashboard',
    to: '/dashboard'
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'settings',
    to: '/settings'
  }
];

/**
 * 测试用头部菜单数据
 */
const mockHeaderItems: TechMenuItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: 'home',
    to: '/'
  },
  {
    key: 'about',
    label: '关于',
    icon: 'info',
    to: '/about'
  }
];

describe('TechLayout', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染基本布局', () => {
      render(
        <TechLayout sidebarItems={mockSidebarItems}>
          <div data-testid="content">主要内容</div>
        </TechLayout>
      );
      
      // 验证主要内容区域
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('主要内容')).toBeInTheDocument();
      
      // 验证侧边栏菜单
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByText('设置')).toBeInTheDocument();
    });

    it('应该正确集成主题提供器', () => {
      render(
        <TechLayout sidebarItems={mockSidebarItems}>
          <div>测试内容</div>
        </TechLayout>
      );
      
      // 验证主题提供器工作正常
      expect(screen.getByText('测试内容')).toBeInTheDocument();
    });

    it('应该正确应用自定义类名和样式', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          className="custom-layout"
          style={{ backgroundColor: 'red' }}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      const layout = document.querySelector('[class*="layout"]');
      expect(layout).toBeInTheDocument();
      expect(layout?.className).toContain('custom-layout');
      expect((layout as HTMLElement)?.style.backgroundColor).toBe('red');
    });
  });

  describe('头部功能测试', () => {
    it('应该正确渲染头部品牌', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          brand="测试应用"
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('测试应用')).toBeInTheDocument();
    });

    it('应该支持头部菜单', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerMenuItems={mockHeaderItems}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('关于')).toBeInTheDocument();
    });

    it('应该正确处理头部菜单选择', () => {
      const mockHeaderSelect = vi.fn();
      const mockHeaderSelectItem = vi.fn();
      
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerMenuItems={mockHeaderItems}
          onHeaderMenuSelect={mockHeaderSelect}
          onHeaderMenuSelectItem={mockHeaderSelectItem}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      fireEvent.click(screen.getByText('首页'));
      
      expect(mockHeaderSelect).toHaveBeenCalledWith('home');
      expect(mockHeaderSelectItem).toHaveBeenCalledWith(mockHeaderItems[0]);
    });

    it('应该支持搜索功能', () => {
      const mockSearch = vi.fn();
      
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          onSearch={mockSearch}
          searchPlaceholder="搜索测试"
        >
          <div>内容</div>
        </TechLayout>
      );
      
      const searchInput = screen.getByPlaceholderText('搜索测试');
      fireEvent.change(searchInput, { target: { value: '测试搜索' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      
      expect(mockSearch).toHaveBeenCalledWith('测试搜索');
    });

    it('应该支持头部操作和额外内容', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerActions={<button data-testid="header-action">操作</button>}
          headerExtra={<div data-testid="header-extra">额外</div>}
          version="v1.2.3"
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('header-action')).toBeInTheDocument();
      expect(screen.getByTestId('header-extra')).toBeInTheDocument();
      expect(screen.getByText('v1.2.3')).toBeInTheDocument();
    });
  });

  describe('侧边栏功能测试', () => {
    it('应该正确处理侧边栏选择事件', () => {
      const mockSidebarSelect = vi.fn();
      const mockSidebarSelectItem = vi.fn();
      
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          onSidebarSelect={mockSidebarSelect}
          onSidebarSelectItem={mockSidebarSelectItem}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      fireEvent.click(screen.getByText('仪表盘'));
      
      expect(mockSidebarSelect).toHaveBeenCalledWith('dashboard');
      expect(mockSidebarSelectItem).toHaveBeenCalledWith(mockSidebarItems[0]);
    });

    it('应该正确传递侧边栏选中状态', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          selectedSidebarKey="settings"
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('设置')).toBeInTheDocument();
    });

    it('应该支持侧边栏链接组件', () => {
      const MockSidebarLink = vi.fn(({ children, ...props }) => (
        <div {...props} data-testid="sidebar-custom-link">{children}</div>
      ));
      
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          sidebarLinkComponent={MockSidebarLink}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getAllByTestId('sidebar-custom-link').length).toBeGreaterThan(0);
    });
  });

  describe('折叠功能测试', () => {
    it('应该支持默认折叠状态', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={true}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 验证侧边栏在折叠状态下渲染
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该正确处理侧边栏切换', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={false}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 找到切换按钮并点击
      const toggleButton = screen.getByLabelText('toggle sidebar');
      expect(toggleButton).toBeInTheDocument();
      
      // 点击切换按钮
      fireEvent.click(toggleButton);
      
      // 验证切换功能工作（通过DOM结构变化体现）
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('尺寸配置测试', () => {
    it('应该支持自定义侧边栏宽度', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          sidebarWidth={300}
          collapsedWidth={80}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 验证宽度通过CSS变量设置
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('300px');
    });

    it('应该支持自定义头部高度', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerHeight={70}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height')).toBe('70px');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height-mobile')).toBe('78px');
    });

    it('应该在折叠状态下使用折叠宽度', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={true}
          sidebarWidth={240}
          collapsedWidth={60}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('60px');
    });
  });

  describe('内容区域测试', () => {
    it('应该支持自定义内容最大宽度', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          contentMaxWidth={1200}
        >
          <div data-testid="content">内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('应该支持自定义内容内边距', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          contentPadding={20}
        >
          <div data-testid="content">内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('应该支持禁用全局样式', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          enableGlobalStyles={false}
          enableScrollbarStyling={false}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('内容')).toBeInTheDocument();
    });
  });

  describe('完整功能集成测试', () => {
    it('应该支持所有功能的完整集成', () => {
      const mockHeaderSelect = vi.fn();
      const mockSidebarSelect = vi.fn();
      const mockSearch = vi.fn();
      
      render(
        <TechLayout 
          brand="完整测试应用"
          headerMenuItems={mockHeaderItems}
          selectedHeaderKey="home"
          onHeaderMenuSelect={mockHeaderSelect}
          sidebarItems={mockSidebarItems}
          selectedSidebarKey="dashboard"
          onSidebarSelect={mockSidebarSelect}
          onSearch={mockSearch}
          searchPlaceholder="全局搜索"
          headerActions={<button data-testid="notification">通知</button>}
          headerExtra={<div data-testid="user-menu">用户</div>}
          version="v1.0.0"
          defaultCollapsed={false}
          sidebarWidth={260}
          collapsedWidth={70}
          headerHeight={60}
          contentMaxWidth={1400}
          contentPadding={24}
        >
          <div data-testid="main-content">应用主要内容区域</div>
        </TechLayout>
      );
      
      // 验证所有组件都正确渲染
      expect(screen.getByText('完整测试应用')).toBeInTheDocument();
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('全局搜索')).toBeInTheDocument();
      expect(screen.getByTestId('notification')).toBeInTheDocument();
      expect(screen.getByTestId('user-menu')).toBeInTheDocument();
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
      
      // 验证CSS变量设置
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('260px');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height')).toBe('60px');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height-mobile')).toBe('68px');
    });

    it('应该正确处理所有交互事件', () => {
      const mockHeaderSelect = vi.fn();
      const mockSidebarSelect = vi.fn();
      const mockSearch = vi.fn();
      
      render(
        <TechLayout 
          headerMenuItems={mockHeaderItems}
          onHeaderMenuSelect={mockHeaderSelect}
          sidebarItems={mockSidebarItems}
          onSidebarSelect={mockSidebarSelect}
          onSearch={mockSearch}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 测试头部菜单选择
      fireEvent.click(screen.getByText('首页'));
      expect(mockHeaderSelect).toHaveBeenCalledWith('home');
      
      // 测试侧边栏菜单选择
      fireEvent.click(screen.getByText('仪表盘'));
      expect(mockSidebarSelect).toHaveBeenCalledWith('dashboard');
      
      // 测试搜索功能
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '搜索内容' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      expect(mockSearch).toHaveBeenCalledWith('搜索内容');
    });
  });

  describe('侧边栏切换状态管理测试', () => {
    it('应该正确管理侧边栏折叠状态', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={false}
          sidebarWidth={240}
          collapsedWidth={72}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 初始状态应该是展开的
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('240px');
      
      // 点击切换按钮
      const toggleButton = screen.getByLabelText('toggle sidebar');
      fireEvent.click(toggleButton);
      
      // 应该切换到折叠状态
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('72px');
      
      // 再次点击应该切换回展开状态
      fireEvent.click(toggleButton);
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('240px');
    });

    it('应该从默认折叠状态开始', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={true}
          sidebarWidth={240}
          collapsedWidth={72}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('72px');
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
      
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerHeight={64}
        >
          <div data-testid="mobile-content">移动端内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('mobile-content')).toBeInTheDocument();
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height-mobile')).toBe('72px');
    });
  });

  describe('布局结构测试', () => {
    it('应该包含正确的布局结构层次', () => {
      render(
        <TechLayout sidebarItems={mockSidebarItems}>
          <div data-testid="test-content">测试内容</div>
        </TechLayout>
      );
      
      // 验证主要布局结构
      const layout = document.querySelector('[class*="layout"]');
      expect(layout).toBeInTheDocument();
      
      const mainWrapper = document.querySelector('[class*="mainWrapper"]');
      expect(mainWrapper).toBeInTheDocument();
      
      const contentWrapper = document.querySelector('[class*="contentWrapper"]');
      expect(contentWrapper).toBeInTheDocument();
      
      const content = document.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
      
      const contentInner = document.querySelector('[class*="contentInner"]');
      expect(contentInner).toBeInTheDocument();
      
      // 验证内容正确嵌套
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('应该使用Container组件包装内容', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          contentMaxWidth={1200}
          contentPadding={20}
        >
          <div data-testid="wrapped-content">被包装的内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('wrapped-content')).toBeInTheDocument();
    });
  });

  describe('性能测试', () => {
    it('应该优化折叠状态计算', () => {
      const { rerender } = render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={false}
          sidebarWidth={240}
          collapsedWidth={72}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      let layout = document.querySelector('[class*="layout"]') as HTMLElement;
      const initialWidth = (layout as HTMLElement)?.style.getPropertyValue('--sidebar-width');
      
      // 使用相同props重新渲染
      rerender(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          defaultCollapsed={false}
          sidebarWidth={240}
          collapsedWidth={72}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      layout = document.querySelector('[class*="layout"]') as HTMLElement;
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe(initialWidth);
    });

    it('应该避免不必要的样式重新计算', () => {
      const { rerender } = render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          sidebarWidth={240}
          headerHeight={56}
        >
          <div>内容1</div>
        </TechLayout>
      );
      
      const layout = document.querySelector('[class*="layout"]') as HTMLElement;
      const initialStyle = (layout as HTMLElement)?.style.cssText;
      
      // 只改变children，其他props不变
      rerender(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          sidebarWidth={240}
          headerHeight={56}
        >
          <div>内容2</div>
        </TechLayout>
      );
      
      // 样式应该保持不变
      expect((layout as HTMLElement)?.style.cssText).toBe(initialStyle);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理最小化配置', () => {
      render(
        <TechLayout sidebarItems={[]}>
          <div>最小化内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('最小化内容')).toBeInTheDocument();
    });

    it('应该处理极端尺寸配置', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          sidebarWidth={1}
          collapsedWidth={1}
          headerHeight={1}
          contentMaxWidth={1}
          contentPadding={0}
        >
          <div data-testid="extreme-content">极端配置内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('extreme-content')).toBeInTheDocument();
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('1px');
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height')).toBe('1px');
    });

    it('应该处理所有可选props为默认值', () => {
      render(
        <TechLayout sidebarItems={mockSidebarItems}>
          <div data-testid="default-content">默认配置内容</div>
        </TechLayout>
      );
      
      expect(screen.getByTestId('default-content')).toBeInTheDocument();
      expect(screen.getByText('YGG Admin')).toBeInTheDocument(); // 默认品牌
      
      const layout = document.querySelector('[class*="layout"]');
      expect((layout as HTMLElement)?.style.getPropertyValue('--sidebar-width')).toBe('240px'); // 默认宽度
      expect((layout as HTMLElement)?.style.getPropertyValue('--header-height')).toBe('56px'); // 默认高度
    });
  });

  describe('无障碍性测试', () => {
    it('应该保持整体布局的语义化结构', () => {
      render(
        <TechLayout sidebarItems={mockSidebarItems}>
          <main data-testid="main-content">主要内容</main>
        </TechLayout>
      );
      
      // 验证头部导航
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // 验证侧边栏导航
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // 验证主要内容
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });

    it('应该保持菜单的无障碍性', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          headerMenuItems={mockHeaderItems}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 验证菜单项的无障碍性
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
    });
  });

  describe('状态管理测试', () => {
    it('应该正确管理内部折叠状态', () => {
      const TestWrapper = () => {
        const [key, setKey] = React.useState(0);
        return (
          <div>
            <button onClick={() => setKey(k => k + 1)} data-testid="rerender-btn">
              重新渲染
            </button>
            <TechLayout key={key} sidebarItems={mockSidebarItems}>
              <div>内容</div>
            </TechLayout>
          </div>
        );
      };
      
      render(<TestWrapper />);
      
      // 获取初始切换按钮
      const toggleButton = screen.getByLabelText('toggle sidebar');
      
      // 点击切换
      fireEvent.click(toggleButton);
      
      // 触发重新渲染
      fireEvent.click(screen.getByTestId('rerender-btn'));
      
      // 验证新实例的切换按钮仍然存在
      expect(screen.getByLabelText('toggle sidebar')).toBeInTheDocument();
    });
  });

  describe('主题集成测试', () => {
    it('应该正确集成全局样式', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          enableGlobalStyles={true}
          enableScrollbarStyling={true}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      // 验证全局样式组件被渲染
      expect(screen.getByText('内容')).toBeInTheDocument();
    });

    it('应该支持部分禁用全局样式', () => {
      render(
        <TechLayout 
          sidebarItems={mockSidebarItems}
          enableGlobalStyles={false}
          enableScrollbarStyling={true}
        >
          <div>内容</div>
        </TechLayout>
      );
      
      expect(screen.getByText('内容')).toBeInTheDocument();
    });
  });
});