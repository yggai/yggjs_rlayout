import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TechBreadcrumb, TechBreadcrumbBuilder, createBreadcrumb } from './TechBreadcrumb';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechBreadcrumbItem } from './TechBreadcrumb';

const renderBreadcrumb = (props: Partial<React.ComponentProps<typeof TechBreadcrumb>>) => {
  const defaultProps = {
    items: []
  };
  
  return render(
    <TechThemeProvider>
      <TechBreadcrumb {...defaultProps} {...props} />
    </TechThemeProvider>
  );
};

describe('TechBreadcrumb', () => {
  describe('基础渲染', () => {
    it('应该正确渲染空的面包屑导航', () => {
      renderBreadcrumb({ items: [] });
      
      const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(nav).toBeInTheDocument();
    });

    it('应该正确应用CSS模块类名', () => {
      const { container } = renderBreadcrumb({ items: [] });
      
      const nav = container.querySelector('nav');
      expect(nav?.className).toMatch(/_breadcrumb_/);
    });

    it('应该正确应用自定义类名和样式', () => {
      renderBreadcrumb({ 
        items: [],
        className: 'custom-breadcrumb',
        style: { backgroundColor: 'red' }
      });
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('custom-breadcrumb');
      expect(nav.style.backgroundColor).toBe('red');
    });
  });

  describe('面包屑项目渲染', () => {
    const testItems: TechBreadcrumbItem[] = [
      { key: 'home', label: '首页', href: '/' },
      { key: 'users', label: '用户管理', href: '/users' },
      { key: 'detail', label: '用户详情' }
    ];

    it('应该正确渲染面包屑项目', () => {
      renderBreadcrumb({ items: testItems });
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('用户详情')).toBeInTheDocument();
    });

    it('应该为链接项目设置正确的href属性', () => {
      renderBreadcrumb({ items: testItems });
      
      const homeLink = screen.getByText('首页').closest('a');
      const usersLink = screen.getByText('用户管理').closest('a');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(usersLink).toHaveAttribute('href', '/users');
    });

    it('应该为最后一个项目设置aria-current属性', () => {
      renderBreadcrumb({ items: testItems });
      
      const lastItem = screen.getByText('用户详情').closest('a');
      expect(lastItem).toHaveAttribute('aria-current', 'page');
    });

    it('应该为当前页面项目应用正确的CSS类名', () => {
      renderBreadcrumb({ items: testItems });
      
      const currentItem = screen.getByText('用户详情').closest('a');
      expect(currentItem?.className).toMatch(/_itemCurrent_/);
    });

    it('应该为禁用项目应用正确的CSS类名', () => {
      const disabledItems: TechBreadcrumbItem[] = [
        { key: 'disabled', label: '禁用项目' }
      ];
      
      renderBreadcrumb({ items: disabledItems });
      
      const disabledItem = screen.getByText('禁用项目').closest('a');
      expect(disabledItem?.className).toMatch(/_itemDisabled_/);
    });
  });

  describe('分隔符', () => {
    const items: TechBreadcrumbItem[] = [
      { key: '1', label: '项目1', href: '/1' },
      { key: '2', label: '项目2', href: '/2' },
      { key: '3', label: '项目3' }
    ];

    it('应该在simple变体中使用默认分隔符', () => {
      renderBreadcrumb({ items, variant: 'simple' });
      
      const separators = screen.getAllByText('/');
      expect(separators).toHaveLength(2);
    });

    it('应该在icon变体中使用图标分隔符', () => {
      renderBreadcrumb({ items, variant: 'icon' });
      
      const separators = screen.getAllByTestId('tech-icon-chevron-right');
      expect(separators).toHaveLength(2);
    });

    it('应该支持自定义分隔符', () => {
      renderBreadcrumb({ 
        items,
        separator: <span data-testid="custom-separator"> → </span>
      });
      
      const customSeparators = screen.getAllByTestId('custom-separator');
      expect(customSeparators).toHaveLength(2);
    });

    it('应该为分隔符应用正确的CSS类名', () => {
      const { container } = renderBreadcrumb({ items });
      
      const separators = container.querySelectorAll('[class*="separator"]');
      expect(separators).toHaveLength(2);
    });
  });

  describe('图标功能', () => {
    const itemsWithIcons: TechBreadcrumbItem[] = [
      { key: 'home', label: '首页', href: '/', icon: 'home' },
      { key: 'users', label: '用户', href: '/users', icon: 'user' },
      { key: 'settings', label: '设置', icon: 'settings' }
    ];

    it('应该在icon变体中显示项目图标', () => {
      renderBreadcrumb({ items: itemsWithIcons, variant: 'icon' });
      
      expect(screen.getByTestId('tech-icon-home')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
    });

    it('应该在simple变体中隐藏项目图标', () => {
      renderBreadcrumb({ items: itemsWithIcons, variant: 'simple' });
      
      expect(screen.queryByTestId('tech-icon-home')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tech-icon-user')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tech-icon-settings')).not.toBeInTheDocument();
    });

    it('应该为图标应用正确的CSS类名', () => {
      const { container } = renderBreadcrumb({ 
        items: itemsWithIcons, 
        variant: 'icon' 
      });
      
      const icons = container.querySelectorAll('[class*="icon"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('首页功能', () => {
    const items: TechBreadcrumbItem[] = [
      { key: 'current', label: '当前页' }
    ];

    it('应该在showHome为true时显示首页图标', () => {
      renderBreadcrumb({ 
        items,
        showHome: true
      });
      
      expect(screen.getByTestId('tech-icon-home')).toBeInTheDocument();
      expect(screen.getByLabelText('Home')).toBeInTheDocument();
    });

    it('应该支持自定义首页图标', () => {
      renderBreadcrumb({ 
        items,
        showHome: true,
        homeIcon: 'dashboard'
      });
      
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
    });

    it('应该正确处理首页点击事件', () => {
      const mockHomeClick = vi.fn();
      
      renderBreadcrumb({ 
        items,
        showHome: true,
        onHomeClick: mockHomeClick
      });
      
      const homeLink = screen.getByLabelText('Home');
      fireEvent.click(homeLink);
      
      expect(mockHomeClick).toHaveBeenCalledTimes(1);
    });

    it('应该在有首页和项目时显示分隔符', () => {
      renderBreadcrumb({ 
        items,
        showHome: true
      });
      
      const { container } = render(
        <TechThemeProvider>
          <TechBreadcrumb items={items} showHome={true} />
        </TechThemeProvider>
      );
      
      const separators = container.querySelectorAll('[class*="separator"]');
      expect(separators).toHaveLength(1);
    });

    it('应该在showHome为false时隐藏首页', () => {
      renderBreadcrumb({ 
        items,
        showHome: false
      });
      
      expect(screen.queryByLabelText('Home')).not.toBeInTheDocument();
    });
  });

  describe('省略显示', () => {
    const manyItems: TechBreadcrumbItem[] = [
      { key: '1', label: '级别1', href: '/1' },
      { key: '2', label: '级别2', href: '/2' },
      { key: '3', label: '级别3', href: '/3' },
      { key: '4', label: '级别4', href: '/4' },
      { key: '5', label: '级别5', href: '/5' },
      { key: '6', label: '级别6' }
    ];

    it('应该在项目数量超过maxItems时显示省略号', () => {
      renderBreadcrumb({ 
        items: manyItems,
        maxItems: 4
      });
      
      expect(screen.getByText('级别1')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('级别4')).toBeInTheDocument();
      expect(screen.getByText('级别5')).toBeInTheDocument();
      expect(screen.getByText('级别6')).toBeInTheDocument();
      
      // 中间的项目应该被省略
      expect(screen.queryByText('级别2')).not.toBeInTheDocument();
      expect(screen.queryByText('级别3')).not.toBeInTheDocument();
    });

    it('应该在项目数量未超过maxItems时不显示省略号', () => {
      renderBreadcrumb({ 
        items: manyItems.slice(0, 3),
        maxItems: 5
      });
      
      expect(screen.getByText('级别1')).toBeInTheDocument();
      expect(screen.getByText('级别2')).toBeInTheDocument();
      expect(screen.getByText('级别3')).toBeInTheDocument();
      expect(screen.queryByText('...')).not.toBeInTheDocument();
    });

    it('应该为省略号应用正确的CSS类名', () => {
      renderBreadcrumb({ 
        items: manyItems,
        maxItems: 3
      });
      
      const ellipsis = screen.getByText('...');
      expect(ellipsis.className).toMatch(/_ellipsis_/);
    });

    it('应该在没有maxItems限制时显示所有项目', () => {
      renderBreadcrumb({ items: manyItems });
      
      manyItems.forEach(item => {
        expect(screen.getByText(item.label as string)).toBeInTheDocument();
      });
      
      expect(screen.queryByText('...')).not.toBeInTheDocument();
    });
  });

  describe('事件处理', () => {
    it('应该正确处理项目的点击事件', () => {
      const mockClick = vi.fn();
      const clickableItems: TechBreadcrumbItem[] = [
        { key: 'clickable', label: '可点击项目', onClick: mockClick }
      ];
      
      renderBreadcrumb({ items: clickableItems });
      
      const clickableItem = screen.getByText('可点击项目');
      fireEvent.click(clickableItem);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该阻止有onClick的项目的默认链接行为', () => {
      const mockClick = vi.fn();
      const itemsWithBoth: TechBreadcrumbItem[] = [
        { 
          key: 'both', 
          label: '既有href又有onClick', 
          href: '/both',
          onClick: mockClick 
        }
      ];
      
      renderBreadcrumb({ items: itemsWithBoth });
      
      const item = screen.getByText('既有href又有onClick');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      
      fireEvent(item, clickEvent);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('应该正确处理首页点击事件的preventDefault', () => {
      const mockHomeClick = vi.fn();
      
      renderBreadcrumb({ 
        items: [{ key: 'test', label: '测试' }],
        showHome: true,
        onHomeClick: mockHomeClick
      });
      
      const homeLink = screen.getByLabelText('Home');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      
      fireEvent(homeLink, clickEvent);
      
      expect(mockHomeClick).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('变体样式', () => {
    const items: TechBreadcrumbItem[] = [
      { key: '1', label: '项目1', href: '/1', icon: 'home' },
      { key: '2', label: '项目2', href: '/2', icon: 'user' },
      { key: '3', label: '项目3', icon: 'settings' }
    ];

    it('应该在simple变体中正确渲染', () => {
      renderBreadcrumb({ items, variant: 'simple' });
      
      const nav = screen.getByRole('navigation');
      expect(nav.className).toMatch(/_simple_/);
      
      // simple变体不应该显示项目图标
      expect(screen.queryByTestId('tech-icon-home')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tech-icon-user')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tech-icon-settings')).not.toBeInTheDocument();
      
      // 应该显示默认分隔符
      const separators = screen.getAllByText('/');
      expect(separators).toHaveLength(2);
    });

    it('应该在icon变体中正确渲染', () => {
      renderBreadcrumb({ items, variant: 'icon' });
      
      // icon变体应该显示项目图标
      expect(screen.getByTestId('tech-icon-home')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      
      // 应该显示图标分隔符
      const iconSeparators = screen.getAllByTestId('tech-icon-chevron-right');
      expect(iconSeparators).toHaveLength(2);
    });

    it('应该正确处理没有图标的项目', () => {
      const itemsWithoutIcons: TechBreadcrumbItem[] = [
        { key: '1', label: '无图标1', href: '/1' },
        { key: '2', label: '无图标2' }
      ];
      
      renderBreadcrumb({ items: itemsWithoutIcons, variant: 'icon' });
      
      expect(screen.getByText('无图标1')).toBeInTheDocument();
      expect(screen.getByText('无图标2')).toBeInTheDocument();
    });
  });

  describe('复杂场景', () => {
    it('应该支持完整配置的面包屑', () => {
      const complexItems: TechBreadcrumbItem[] = [
        { key: 'dashboard', label: '控制台', href: '/dashboard', icon: 'dashboard' },
        { key: 'products', label: '产品管理', href: '/products', icon: 'book' },
        { key: 'category', label: '分类设置', onClick: vi.fn(), icon: 'user' },
        { key: 'current', label: '当前分类', icon: 'settings' }
      ];
      
      renderBreadcrumb({
        items: complexItems,
        separator: <span data-testid="arrow"> → </span>,
        maxItems: 6,
        showHome: true,
        homeIcon: 'plus',
        onHomeClick: vi.fn(),
        variant: 'icon',
        className: 'complex-breadcrumb'
      });
      
      // 验证首页
      expect(screen.getByTestId('tech-icon-plus')).toBeInTheDocument();
      expect(screen.getByLabelText('Home')).toBeInTheDocument();
      
      // 验证所有项目
      expect(screen.getByText('控制台')).toBeInTheDocument();
      expect(screen.getByText('产品管理')).toBeInTheDocument();
      expect(screen.getByText('分类设置')).toBeInTheDocument();
      expect(screen.getByText('当前分类')).toBeInTheDocument();
      
      // 验证图标
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-book')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      
      // 验证自定义分隔符
      const customSeparators = screen.getAllByTestId('arrow');
      expect(customSeparators.length).toBeGreaterThan(0);
      
      // 验证样式
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('complex-breadcrumb');
    });

    it('应该正确处理混合的交互类型', () => {
      const mockClick1 = vi.fn();
      const mockClick2 = vi.fn();
      const mockHomeClick = vi.fn();
      
      const mixedItems: TechBreadcrumbItem[] = [
        { key: 'href', label: 'href链接', href: '/href' },
        { key: 'click1', label: '点击1', onClick: mockClick1 },
        { key: 'click2', label: '点击2', onClick: mockClick2 },
        { key: 'static', label: '静态项目' }
      ];
      
      renderBreadcrumb({
        items: mixedItems,
        showHome: true,
        onHomeClick: mockHomeClick
      });
      
      // 测试href链接
      const hrefLink = screen.getByText('href链接');
      expect(hrefLink.closest('a')).toHaveAttribute('href', '/href');
      
      // 测试点击事件
      fireEvent.click(screen.getByText('点击1'));
      expect(mockClick1).toHaveBeenCalledTimes(1);
      
      fireEvent.click(screen.getByText('点击2'));
      expect(mockClick2).toHaveBeenCalledTimes(1);
      
      // 测试首页点击
      fireEvent.click(screen.getByLabelText('Home'));
      expect(mockHomeClick).toHaveBeenCalledTimes(1);
      
      // 静态项目应该有disabled样式
      const staticItem = screen.getByText('静态项目').closest('a');
      expect(staticItem?.className).toMatch(/_itemDisabled_/);
    });
  });

  describe('边界情况', () => {
    it('应该处理空的items数组', () => {
      renderBreadcrumb({ items: [] });
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav.textContent).toBe('');
    });

    it('应该处理单个项目', () => {
      const singleItem: TechBreadcrumbItem[] = [
        { key: 'single', label: '单个项目' }
      ];
      
      renderBreadcrumb({ items: singleItem });
      
      expect(screen.getByText('单个项目')).toBeInTheDocument();
      expect(screen.queryByText('/')).not.toBeInTheDocument();
    });

    it('应该处理React节点类型的label', () => {
      const reactNodeItems: TechBreadcrumbItem[] = [
        { 
          key: 'react', 
          label: <span data-testid="react-label">React节点标签</span>,
          href: '/react'
        },
        {
          key: 'complex',
          label: (
            <div>
              <strong>复杂</strong>
              <em>标签</em>
            </div>
          )
        }
      ];
      
      renderBreadcrumb({ items: reactNodeItems });
      
      expect(screen.getByTestId('react-label')).toBeInTheDocument();
      expect(screen.getByText('复杂')).toBeInTheDocument();
      expect(screen.getByText('标签')).toBeInTheDocument();
    });

    it('应该处理极端maxItems值', () => {
      const items: TechBreadcrumbItem[] = [
        { key: '1', label: '项目1', href: '/1' },
        { key: '2', label: '项目2', href: '/2' },
        { key: '3', label: '项目3' }
      ];
      
      // maxItems为2的情况（避免重复元素的问题）
      renderBreadcrumb({ items, maxItems: 2 });
      expect(screen.getAllByText('项目1')).toHaveLength(1);
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('项目3')).toBeInTheDocument();
      expect(screen.queryByText('项目2')).not.toBeInTheDocument();
    });
  });

  describe('可访问性', () => {
    const accessibilityItems: TechBreadcrumbItem[] = [
      { key: 'home', label: '首页', href: '/' },
      { key: 'category', label: '分类', href: '/category' },
      { key: 'current', label: '当前页面' }
    ];

    it('应该具有正确的ARIA标签', () => {
      renderBreadcrumb({ items: accessibilityItems });
      
      const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(nav).toBeInTheDocument();
    });

    it('应该为当前页面设置正确的aria-current属性', () => {
      renderBreadcrumb({ items: accessibilityItems });
      
      const currentPage = screen.getByText('当前页面').closest('a');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
      
      const otherPages = [
        screen.getByText('首页').closest('a'),
        screen.getByText('分类').closest('a')
      ];
      
      otherPages.forEach(page => {
        expect(page).not.toHaveAttribute('aria-current');
      });
    });

    it('应该为首页链接设置正确的aria-label', () => {
      renderBreadcrumb({ 
        items: accessibilityItems,
        showHome: true
      });
      
      const homeLink = screen.getByLabelText('Home');
      expect(homeLink).toBeInTheDocument();
    });
  });

  describe('性能优化', () => {
    it('应该正确使用useMemo优化项目处理', () => {
      const performanceItems: TechBreadcrumbItem[] = Array.from({ length: 20 }, (_, i) => ({
        key: `perf-${i}`,
        label: `性能项目${i + 1}`,
        href: `/perf/${i + 1}`
      }));
      
      const { rerender } = renderBreadcrumb({ 
        items: performanceItems,
        maxItems: 5
      });
      
      // 验证省略功能正常工作
      expect(screen.getByText('性能项目1')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByText('性能项目17')).toBeInTheDocument();
      expect(screen.getByText('性能项目18')).toBeInTheDocument();
      expect(screen.getByText('性能项目19')).toBeInTheDocument();
      expect(screen.getByText('性能项目20')).toBeInTheDocument();
      
      // 相同props重新渲染，应该避免重新计算
      rerender(
        <TechThemeProvider>
          <TechBreadcrumb items={performanceItems} maxItems={5} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('性能项目1')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();
    });

    it('应该避免不必要的重新渲染', () => {
      const stableItems: TechBreadcrumbItem[] = [
        { key: 'stable', label: '稳定项目', href: '/stable' }
      ];
      
      const { rerender } = renderBreadcrumb({ items: stableItems });
      
      const initialItem = screen.getByText('稳定项目');
      
      rerender(
        <TechThemeProvider>
          <TechBreadcrumb items={stableItems} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('稳定项目')).toBe(initialItem);
    });
  });
});

describe('TechBreadcrumbBuilder', () => {
  describe('基础构建功能', () => {
    it('应该正确构建基础面包屑', () => {
      const builder = new TechBreadcrumbBuilder();
      const items = builder
        .add('首页', '/')
        .add('用户管理', '/users')
        .add('当前页')
        .build();
      
      expect(items).toHaveLength(3);
      expect(items[0]).toEqual({
        key: 'item-0',
        label: '首页',
        href: '/',
        icon: undefined
      });
      expect(items[1]).toEqual({
        key: 'item-1',
        label: '用户管理',
        href: '/users',
        icon: undefined
      });
      expect(items[2]).toEqual({
        key: 'item-2',
        label: '当前页',
        href: undefined,
        icon: undefined
      });
    });

    it('应该支持添加图标', () => {
      const builder = new TechBreadcrumbBuilder();
      const items = builder
        .add('首页', '/', 'home')
        .add('设置', '/settings', 'settings')
        .build();
      
      expect(items[0].icon).toBe('home');
      expect(items[1].icon).toBe('settings');
    });

    it('应该支持添加可点击项目', () => {
      const mockClick = vi.fn();
      const builder = new TechBreadcrumbBuilder();
      const items = builder
        .addClickable('点击项目', mockClick, 'user')
        .build();
      
      expect(items[0]).toEqual({
        key: 'item-0',
        label: '点击项目',
        onClick: mockClick,
        icon: 'user'
      });
    });

    it('应该正确生成key值', () => {
      const builder = new TechBreadcrumbBuilder();
      const items = builder
        .add('项目1')
        .add('项目2')
        .addClickable('项目3', vi.fn())
        .build();
      
      expect(items[0].key).toBe('item-0');
      expect(items[1].key).toBe('item-1');
      expect(items[2].key).toBe('item-2');
    });
  });

  describe('链式调用', () => {
    it('应该支持完整的链式调用', () => {
      const onClick1 = vi.fn();
      const onClick2 = vi.fn();
      
      const items = new TechBreadcrumbBuilder()
        .add('首页', '/', 'home')
        .add('产品', '/products', 'book')
        .addClickable('分类', onClick1, 'book')
        .add('子分类', '/subcategory')
        .addClickable('当前', onClick2)
        .build();
      
      expect(items).toHaveLength(5);
      expect(items[0].label).toBe('首页');
      expect(items[1].label).toBe('产品');
      expect(items[2].label).toBe('分类');
      expect(items[3].label).toBe('子分类');
      expect(items[4].label).toBe('当前');
      
      expect(items[2].onClick).toBe(onClick1);
      expect(items[4].onClick).toBe(onClick2);
    });

    it('应该支持混合添加方式', () => {
      const builder = new TechBreadcrumbBuilder();
      const items = builder
        .add('普通项目1', '/1')
        .addClickable('点击项目', vi.fn())
        .add('普通项目2', '/2', 'settings')
        .add('最终项目')
        .build();
      
      expect(items).toHaveLength(4);
      expect(items[0].href).toBe('/1');
      expect(items[1].onClick).toBeDefined();
      expect(items[2].href).toBe('/2');
      expect(items[2].icon).toBe('settings');
      expect(items[3].href).toBeUndefined();
      expect(items[3].onClick).toBeUndefined();
    });
  });

  describe('便捷函数', () => {
    it('应该通过createBreadcrumb创建构建器', () => {
      const items = createBreadcrumb()
        .add('通过便捷函数', '/')
        .add('创建的面包屑')
        .build();
      
      expect(items).toHaveLength(2);
      expect(items[0].label).toBe('通过便捷函数');
      expect(items[1].label).toBe('创建的面包屑');
    });

    it('应该返回新的构建器实例', () => {
      const builder1 = createBreadcrumb();
      const builder2 = createBreadcrumb();
      
      expect(builder1).not.toBe(builder2);
      
      const items1 = builder1.add('构建器1').build();
      const items2 = builder2.add('构建器2').build();
      
      expect(items1[0].label).toBe('构建器1');
      expect(items2[0].label).toBe('构建器2');
    });
  });

  describe('Builder与组件集成', () => {
    it('应该正确与TechBreadcrumb组件集成', () => {
      const mockClick = vi.fn();
      const items = createBreadcrumb()
        .add('首页', '/', 'home')
        .add('用户', '/users', 'user')
        .addClickable('设置', mockClick, 'settings')
        .add('当前页')
        .build();
      
      renderBreadcrumb({ 
        items,
        variant: 'icon',
        showHome: true
      });
      
      // 验证所有项目都正确渲染
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('用户')).toBeInTheDocument();
      expect(screen.getByText('设置')).toBeInTheDocument();
      expect(screen.getByText('当前页')).toBeInTheDocument();
      
      // 验证图标（首页图标会出现两次：home按钮和第一个项目）
      expect(screen.getAllByTestId('tech-icon-home')).toHaveLength(2);
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      
      // 验证点击事件
      fireEvent.click(screen.getByText('设置'));
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });
});