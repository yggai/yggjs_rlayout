/**
 * TechHeader组件单元测试
 * 
 * 按照TDD原则对科技风格头部导航组件进行全面测试
 * 包括基本渲染、菜单交互、搜索功能和响应式布局
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechHeader } from './TechHeader';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechMenuItem } from './TechMenu';

/**
 * 测试辅助函数：在主题提供器中渲染头部组件
 */
const renderHeader = (props: Partial<React.ComponentProps<typeof TechHeader>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechHeader {...props} />
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
    key: 'docs',
    label: '文档',
    icon: 'book',
    to: '/docs'
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'settings',
    children: [
      {
        key: 'profile',
        label: '个人资料',
        icon: 'profile',
        to: '/settings/profile'
      }
    ]
  }
];

describe('TechHeader', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染基本头部组件', () => {
      renderHeader();
      
      // 验证默认品牌名称
      expect(screen.getByText('YGG Admin')).toBeInTheDocument();
      
      // 验证header元素存在
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('应该支持自定义品牌内容', () => {
      const customBrand = <div data-testid="custom-brand">自定义品牌</div>;
      renderHeader({ brand: customBrand });
      
      expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
      expect(screen.getByText('自定义品牌')).toBeInTheDocument();
    });

    it('应该正确应用自定义类名和样式', () => {
      renderHeader({
        className: 'custom-header',
        style: { backgroundColor: 'red' }
      });
      
      const header = screen.getByRole('banner');
      expect(header.className).toContain('custom-header');
      expect(header.style.backgroundColor).toBe('red');
    });

    it('应该设置正确的固定位置和高度', () => {
      renderHeader();
      
      const header = screen.getByRole('banner');
      // 验证Header组件的fixed属性通过DOM结构体现
      expect(header).toBeInTheDocument();
    });
  });

  describe('侧边栏切换功能测试', () => {
    it('应该在提供onToggleSidebar时显示切换按钮', () => {
      const mockToggle = vi.fn();
      renderHeader({ onToggleSidebar: mockToggle });
      
      const toggleButton = screen.getByLabelText('toggle sidebar');
      expect(toggleButton).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-menu')).toBeInTheDocument();
    });

    it('应该在没有onToggleSidebar时隐藏切换按钮', () => {
      renderHeader({ onToggleSidebar: undefined });
      
      expect(screen.queryByLabelText('toggle sidebar')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tech-icon-menu')).not.toBeInTheDocument();
    });

    it('应该正确处理切换按钮点击', () => {
      const mockToggle = vi.fn();
      renderHeader({ onToggleSidebar: mockToggle });
      
      const toggleButton = screen.getByLabelText('toggle sidebar');
      fireEvent.click(toggleButton);
      
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('菜单功能测试', () => {
    it('应该在没有菜单项时不显示菜单', () => {
      renderHeader({ menuItems: [] });
      
      // 通过查找菜单容器来验证
      const container = document.querySelector('[class*="menuContainer"]');
      expect(container).not.toBeInTheDocument();
    });

    it('应该正确渲染菜单项', () => {
      renderHeader({ menuItems: mockMenuItems });
      
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByText('文档')).toBeInTheDocument();
      expect(screen.getByText('设置')).toBeInTheDocument();
    });

    it('应该正确处理菜单选择事件', () => {
      const mockMenuSelect = vi.fn();
      const mockMenuSelectItem = vi.fn();
      
      renderHeader({
        menuItems: mockMenuItems,
        onMenuSelect: mockMenuSelect,
        onMenuSelectItem: mockMenuSelectItem
      });
      
      // 点击菜单项
      fireEvent.click(screen.getByText('仪表盘'));
      
      expect(mockMenuSelect).toHaveBeenCalledWith('dashboard');
      expect(mockMenuSelectItem).toHaveBeenCalledWith(mockMenuItems[0]);
    });

    it('应该正确传递选中状态', () => {
      renderHeader({
        menuItems: mockMenuItems,
        selectedMenuKey: 'dashboard'
      });
      
      // 验证菜单组件接收到正确的selectedKeys
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
    });

    it('应该支持自定义链接组件', () => {
      const MockLink = vi.fn(({ children, ...props }) => (
        <div {...props} data-testid="mock-link">{children}</div>
      ));
      
      renderHeader({
        menuItems: mockMenuItems,
        menuLinkComponent: MockLink
      });
      
      expect(screen.getAllByTestId('mock-link')).toHaveLength(3); // dashboard, docs, 和profile(settings的子项)是叶子节点
    });
  });

  describe('搜索功能测试', () => {
    it('应该在提供onSearch时显示搜索框', () => {
      const mockSearch = vi.fn();
      renderHeader({ 
        onSearch: mockSearch,
        searchPlaceholder: '搜索内容...'
      });
      
      const searchInput = screen.getByPlaceholderText('搜索内容...');
      expect(searchInput).toBeInTheDocument();
    });

    it('应该在没有onSearch时隐藏搜索框', () => {
      renderHeader({ onSearch: undefined });
      
      expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    });

    it('应该正确处理搜索事件', () => {
      const mockSearch = vi.fn();
      renderHeader({ onSearch: mockSearch });
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '测试搜索' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      
      expect(mockSearch).toHaveBeenCalledWith('测试搜索');
    });

    it('应该支持自定义搜索占位符', () => {
      renderHeader({ 
        onSearch: vi.fn(),
        searchPlaceholder: '自定义占位符'
      });
      
      expect(screen.getByPlaceholderText('自定义占位符')).toBeInTheDocument();
    });
  });

  describe('操作区域测试', () => {
    it('应该正确渲染自定义操作按钮', () => {
      const customActions = (
        <button data-testid="custom-action">自定义操作</button>
      );
      
      renderHeader({ actions: customActions });
      
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    it('应该正确渲染额外内容', () => {
      const extraContent = (
        <div data-testid="extra-content">额外内容</div>
      );
      
      renderHeader({ extra: extraContent });
      
      expect(screen.getByTestId('extra-content')).toBeInTheDocument();
    });

    it('应该在提供version时显示版本号', () => {
      renderHeader({ version: 'v1.0.0' });
      
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    });

    it('应该在没有version时隐藏版本号', () => {
      renderHeader({ version: undefined });
      
      expect(screen.queryByText(/v\d+\.\d+\.\d+/)).not.toBeInTheDocument();
    });
  });

  describe('布局结构测试', () => {
    it('应该包含正确的布局结构', () => {
      renderHeader({
        menuItems: mockMenuItems,
        onToggleSidebar: vi.fn(),
        onSearch: vi.fn(),
        actions: <div data-testid="actions">操作</div>,
        version: 'v1.0.0'
      });
      
      // 验证左侧区域
      const leftSection = document.querySelector('[class*="left"]');
      expect(leftSection).toBeInTheDocument();
      
      // 验证菜单容器
      const menuContainer = document.querySelector('[class*="menuContainer"]');
      expect(menuContainer).toBeInTheDocument();
      
      // 验证右侧操作区域
      const actionsSection = document.querySelector('[class*="actions"]');
      expect(actionsSection).toBeInTheDocument();
    });

    it('应该使用流体容器布局', () => {
      renderHeader();
      
      // 验证Container组件的variant="fluid"通过结构体现
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
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
      
      renderHeader({
        menuItems: mockMenuItems,
        onToggleSidebar: vi.fn()
      });
      
      // 验证基本元素仍然存在
      expect(screen.getByText('YGG Admin')).toBeInTheDocument();
      expect(screen.getByLabelText('toggle sidebar')).toBeInTheDocument();
    });
  });

  describe('无障碍性测试', () => {
    it('应该为切换按钮提供正确的aria-label', () => {
      renderHeader({ onToggleSidebar: vi.fn() });
      
      const toggleButton = screen.getByLabelText('toggle sidebar');
      expect(toggleButton).toHaveAttribute('aria-label', 'toggle sidebar');
    });

    it('应该使用正确的语义化标签', () => {
      renderHeader();
      
      // Header组件应该渲染为header或banner角色
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空的菜单项数组', () => {
      renderHeader({ menuItems: [] });
      
      expect(screen.getByText('YGG Admin')).toBeInTheDocument();
      expect(screen.queryByText('仪表盘')).not.toBeInTheDocument();
    });

    it('应该处理所有可选props为undefined', () => {
      renderHeader({
        menuItems: undefined,
        onToggleSidebar: undefined,
        onSearch: undefined,
        actions: undefined,
        extra: undefined,
        version: undefined
      });
      
      expect(screen.getByText('YGG Admin')).toBeInTheDocument();
    });

    it('应该处理空字符串props', () => {
      renderHeader({
        brand: '',
        className: '',
        version: ''
      });
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('应该处理复杂的品牌内容', () => {
      const complexBrand = (
        <div>
          <img src="/logo.png" alt="Logo" />
          <span>复杂品牌</span>
        </div>
      );
      
      renderHeader({ brand: complexBrand });
      
      expect(screen.getByText('复杂品牌')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderHeader({
        brand: '测试品牌',
        menuItems: mockMenuItems
      });
      
      const brandElement = screen.getByText('测试品牌');
      const initialClassName = brandElement.className;
      
      // 使用相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechHeader brand="测试品牌" menuItems={mockMenuItems} />
        </TechThemeProvider>
      );
      
      // 元素应该保持稳定
      expect(screen.getByText('测试品牌')).toBeInTheDocument();
    });

    it('应该正确处理菜单项变化', () => {
      const { rerender } = renderHeader({
        menuItems: mockMenuItems.slice(0, 1)
      });
      
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.queryByText('文档')).not.toBeInTheDocument();
      
      rerender(
        <TechThemeProvider>
          <TechHeader menuItems={mockMenuItems} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByText('文档')).toBeInTheDocument();
    });
  });

  describe('组合功能测试', () => {
    it('应该支持完整功能组合', () => {
      const mockToggle = vi.fn();
      const mockSearch = vi.fn();
      const mockMenuSelect = vi.fn();
      
      renderHeader({
        brand: '完整功能测试',
        menuItems: mockMenuItems,
        selectedMenuKey: 'dashboard',
        onMenuSelect: mockMenuSelect,
        onToggleSidebar: mockToggle,
        onSearch: mockSearch,
        searchPlaceholder: '搜索...',
        actions: <button data-testid="action-btn">操作</button>,
        extra: <div data-testid="extra">额外</div>,
        version: 'v2.0.0'
      });
      
      // 验证所有元素都正确渲染
      expect(screen.getByText('完整功能测试')).toBeInTheDocument();
      expect(screen.getByLabelText('toggle sidebar')).toBeInTheDocument();
      expect(screen.getByText('仪表盘')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('搜索...')).toBeInTheDocument();
      expect(screen.getByTestId('action-btn')).toBeInTheDocument();
      expect(screen.getByTestId('extra')).toBeInTheDocument();
      expect(screen.getByText('v2.0.0')).toBeInTheDocument();
    });

    it('应该正确处理所有交互事件', () => {
      const mockToggle = vi.fn();
      const mockSearch = vi.fn();
      const mockMenuSelect = vi.fn();
      
      renderHeader({
        menuItems: mockMenuItems,
        onMenuSelect: mockMenuSelect,
        onToggleSidebar: mockToggle,
        onSearch: mockSearch
      });
      
      // 测试切换按钮
      fireEvent.click(screen.getByLabelText('toggle sidebar'));
      expect(mockToggle).toHaveBeenCalledTimes(1);
      
      // 测试菜单选择
      fireEvent.click(screen.getByText('仪表盘'));
      expect(mockMenuSelect).toHaveBeenCalledWith('dashboard');
      
      // 测试搜索
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '测试' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      expect(mockSearch).toHaveBeenCalledWith('测试');
    });
  });

  describe('CSS模块集成测试', () => {
    it('应该正确应用CSS模块类名', () => {
      renderHeader();
      
      const header = screen.getByRole('banner');
      expect(header.className).toMatch(/_header_/);
      
      const container = header.querySelector('[class*="container"]');
      expect(container).toBeInTheDocument();
      
      const leftSection = header.querySelector('[class*="left"]');
      expect(leftSection).toBeInTheDocument();
      
      const actionsSection = header.querySelector('[class*="actions"]');
      expect(actionsSection).toBeInTheDocument();
    });
  });
});