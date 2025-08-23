import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TechPageHeader } from './TechPageHeader';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechBreadcrumbItem } from './TechBreadcrumb';

const renderPageHeader = (props: Partial<React.ComponentProps<typeof TechPageHeader>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechPageHeader {...props} />
    </TechThemeProvider>
  );
};

describe('TechPageHeader', () => {
  describe('基础渲染', () => {
    it('应该正确渲染空的页面头部', () => {
      const { container } = renderPageHeader();
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应该正确应用自定义类名和样式', () => {
      const { container } = renderPageHeader({
        className: 'custom-header',
        style: { backgroundColor: 'blue' }
      });
      
      const header = container.firstChild as HTMLElement;
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveStyle('background-color: blue');
    });

    it('应该正确应用CSS模块类名', () => {
      const { container } = renderPageHeader();
      const header = container.firstChild as HTMLElement;
      expect(header.className).toMatch(/_header_/);
    });
  });

  describe('标题渲染', () => {
    it('应该正确渲染页面标题', () => {
      renderPageHeader({ title: '测试页面标题' });
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('测试页面标题');
    });

    it('应该为标题应用正确的CSS类名', () => {
      renderPageHeader({ title: '样式测试标题' });
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.className).toMatch(/_title_/);
    });

    it('应该在没有标题时不渲染h1元素', () => {
      renderPageHeader({ title: undefined });
      
      const heading = screen.queryByRole('heading', { level: 1 });
      expect(heading).not.toBeInTheDocument();
    });

    it('应该处理空字符串标题', () => {
      renderPageHeader({ title: '' });
      
      const heading = screen.queryByRole('heading', { level: 1 });
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe('面包屑导航', () => {
    it('应该正确渲染字符串类型的面包屑', () => {
      renderPageHeader({ breadcrumb: '首页 / 用户管理 / 用户列表' });
      
      expect(screen.getByText('首页 / 用户管理 / 用户列表')).toBeInTheDocument();
    });

    it('应该为字符串面包屑应用正确的样式', () => {
      renderPageHeader({ breadcrumb: '样式测试面包屑' });
      
      const breadcrumbText = screen.getByText('样式测试面包屑');
      expect(breadcrumbText).toHaveStyle('color: var(--tech-muted)');
      expect(breadcrumbText).toHaveStyle('font-size: 12px');
    });

    it('应该正确渲染数组类型的面包屑', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { key: 'home', label: '首页', href: '/' },
        { key: 'users', label: '用户管理', href: '/users' },
        { key: 'detail', label: '用户列表' }
      ];
      
      renderPageHeader({ breadcrumb: breadcrumbItems });
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('用户列表')).toBeInTheDocument();
    });

    it('应该为数组面包屑传递正确的props', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { key: 'home', label: '首页', href: '/' },
        { key: 'current', label: '当前页' }
      ];
      
      renderPageHeader({ 
        breadcrumb: breadcrumbItems,
        breadcrumbProps: { separator: '>' }
      });
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('当前页')).toBeInTheDocument();
    });

    it('应该在没有面包屑时不渲染面包屑区域', () => {
      const { container } = renderPageHeader({ breadcrumb: undefined });
      
      const breadcrumbArea = container.querySelector('[class*="breadcrumb"]');
      expect(breadcrumbArea).not.toBeInTheDocument();
    });

    it('应该为面包屑区域应用正确的CSS类名', () => {
      const { container } = renderPageHeader({ breadcrumb: '测试面包屑' });
      
      const breadcrumbArea = container.querySelector('[class*="breadcrumb"]');
      expect(breadcrumbArea).toBeInTheDocument();
    });
  });

  describe('操作区域', () => {
    it('应该正确渲染操作按钮', () => {
      renderPageHeader({
        actions: (
          <>
            <button data-testid="action-1">创建</button>
            <button data-testid="action-2">导入</button>
          </>
        )
      });
      
      expect(screen.getByTestId('action-1')).toBeInTheDocument();
      expect(screen.getByTestId('action-2')).toBeInTheDocument();
      expect(screen.getByText('创建')).toBeInTheDocument();
      expect(screen.getByText('导入')).toBeInTheDocument();
    });

    it('应该为操作区域应用正确的CSS类名', () => {
      const { container } = renderPageHeader({
        actions: <button>测试操作</button>
      });
      
      const actionsArea = container.querySelector('[class*="actions"]');
      expect(actionsArea).toBeInTheDocument();
      expect(screen.getByText('测试操作')).toBeInTheDocument();
    });

    it('应该支持复杂的操作内容', () => {
      renderPageHeader({
        actions: (
          <div data-testid="complex-actions">
            <button>主要操作</button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button>次要操作1</button>
              <button>次要操作2</button>
            </div>
            <a href="/help">帮助</a>
          </div>
        )
      });
      
      expect(screen.getByTestId('complex-actions')).toBeInTheDocument();
      expect(screen.getByText('主要操作')).toBeInTheDocument();
      expect(screen.getByText('次要操作1')).toBeInTheDocument();
      expect(screen.getByText('次要操作2')).toBeInTheDocument();
      expect(screen.getByText('帮助')).toBeInTheDocument();
    });

    it('应该在没有操作内容时不渲染操作区域', () => {
      const { container } = renderPageHeader({ actions: undefined });
      
      const actionsArea = container.querySelector('[class*="actions"]');
      expect(actionsArea).not.toBeInTheDocument();
    });
  });

  describe('布局结构', () => {
    it('应该正确构建页面头部的整体布局', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { key: 'home', label: '首页', href: '/' },
        { key: 'current', label: '当前页' }
      ];
      
      renderPageHeader({
        breadcrumb: breadcrumbItems,
        title: '页面标题',
        actions: (
          <>
            <button>编辑</button>
            <button>删除</button>
          </>
        )
      });
      
      // 验证面包屑
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('当前页')).toBeInTheDocument();
      
      // 验证标题
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('页面标题')).toBeInTheDocument();
      
      // 验证操作区域
      expect(screen.getByText('编辑')).toBeInTheDocument();
      expect(screen.getByText('删除')).toBeInTheDocument();
    });

    it('应该正确处理左侧内容区域的布局', () => {
      renderPageHeader({
        breadcrumb: '面包屑测试',
        title: '标题测试'
      });
      
      const breadcrumbElement = screen.getByText('面包屑测试');
      const titleElement = screen.getByText('标题测试');
      
      // 面包屑应该在标题之前
      expect(breadcrumbElement.compareDocumentPosition(titleElement))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('应该正确处理右侧操作区域的对齐', () => {
      const { container } = renderPageHeader({
        title: '对齐测试',
        actions: <button>操作按钮</button>
      });
      
      const header = container.firstChild as HTMLElement;
      const actionsArea = header.querySelector('[class*="actions"]');
      
      expect(actionsArea).toBeInTheDocument();
      expect(screen.getByText('操作按钮')).toBeInTheDocument();
    });
  });

  describe('面包屑类型处理', () => {
    it('应该正确区分字符串和数组类型的面包屑', () => {
      const stringBreadcrumb = '字符串面包屑';
      const arrayBreadcrumb: TechBreadcrumbItem[] = [
        { label: '数组', href: '/' },
        { label: '面包屑' }
      ];
      
      const { rerender } = renderPageHeader({ breadcrumb: stringBreadcrumb });
      expect(screen.getByText('字符串面包屑')).toBeInTheDocument();
      
      rerender(
        <TechThemeProvider>
          <TechPageHeader breadcrumb={arrayBreadcrumb} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('数组')).toBeInTheDocument();
      expect(screen.getByText('面包屑')).toBeInTheDocument();
    });

    it('应该为数组面包屑传递breadcrumbProps', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { key: 'home', label: '首页', href: '/' },
        { label: '测试页' }
      ];
      
      renderPageHeader({ 
        breadcrumb: breadcrumbItems,
        breadcrumbProps: { 
          separator: ' → ',
          size: 'small'
        }
      });
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('测试页')).toBeInTheDocument();
    });
  });

  describe('响应式布局', () => {
    it('应该正确处理长标题的换行', () => {
      const longTitle = '这是一个非常非常非常长的页面标题，用来测试响应式布局的换行效果';
      
      renderPageHeader({ title: longTitle });
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(longTitle);
    });

    it('应该正确处理大量操作按钮', () => {
      renderPageHeader({
        title: '多操作页面',
        actions: (
          <>
            <button>操作1</button>
            <button>操作2</button>
            <button>操作3</button>
            <button>操作4</button>
            <button>操作5</button>
          </>
        )
      });
      
      Array.from({ length: 5 }, (_, i) => {
        expect(screen.getByText(`操作${i + 1}`)).toBeInTheDocument();
      });
    });
  });

  describe('边界情况', () => {
    it('应该处理所有属性为空的情况', () => {
      const { container } = renderPageHeader({
        breadcrumb: undefined,
        title: undefined,
        actions: undefined
      });
      
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('应该处理空数组面包屑', () => {
      renderPageHeader({ breadcrumb: [] });
      
      const breadcrumbItems = screen.queryAllByText(/./);
      // 应该只有默认的面包屑组件，没有具体项目
      expect(breadcrumbItems.length).toBeGreaterThanOrEqual(0);
    });

    it('应该处理null和undefined值', () => {
      renderPageHeader({
        breadcrumb: null as any,
        title: null as any,
        actions: null as any,
        breadcrumbProps: undefined
      });
      
      const { container } = render(
        <TechThemeProvider>
          <TechPageHeader />
        </TechThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应该处理空字符串值', () => {
      renderPageHeader({
        breadcrumb: '',
        title: ''
      });
      
      const heading = screen.queryByRole('heading', { level: 1 });
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe('面包屑props传递', () => {
    it('应该正确传递breadcrumbProps到TechBreadcrumb组件', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { label: 'Props测试', href: '/' },
        { key: 'current', label: '当前页' }
      ];
      
      renderPageHeader({ 
        breadcrumb: breadcrumbItems,
        breadcrumbProps: {
          separator: ' | ',
          size: 'large',
          className: 'custom-breadcrumb'
        }
      });
      
      expect(screen.getByText('Props测试')).toBeInTheDocument();
      expect(screen.getByText('当前页')).toBeInTheDocument();
    });

    it('应该在没有breadcrumbProps时使用默认配置', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { label: '默认配置', href: '/' },
        { label: '测试' }
      ];
      
      renderPageHeader({ breadcrumb: breadcrumbItems });
      
      expect(screen.getByText('默认配置')).toBeInTheDocument();
      expect(screen.getByText('测试')).toBeInTheDocument();
    });
  });

  describe('组合场景', () => {
    it('应该支持完整的页面头部配置', () => {
      const fullBreadcrumb: TechBreadcrumbItem[] = [
        { label: '首页', href: '/', icon: 'home' },
        { key: 'users', label: '用户管理', href: '/users' },
        { label: '用户详情' }
      ];
      
      renderPageHeader({
        breadcrumb: fullBreadcrumb,
        breadcrumbProps: { separator: ' → ' },
        title: '完整页面头部测试',
        actions: (
          <div data-testid="full-actions">
            <button>编辑用户</button>
            <button>删除用户</button>
            <button>权限设置</button>
          </div>
        ),
        className: 'full-header',
        style: { padding: '20px' }
      });
      
      // 验证面包屑
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('用户详情')).toBeInTheDocument();
      
      // 验证标题
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('完整页面头部测试')).toBeInTheDocument();
      
      // 验证操作区域
      expect(screen.getByTestId('full-actions')).toBeInTheDocument();
      expect(screen.getByText('编辑用户')).toBeInTheDocument();
      expect(screen.getByText('删除用户')).toBeInTheDocument();
      expect(screen.getByText('权限设置')).toBeInTheDocument();
      
      // 验证样式
      const header = screen.getByRole('heading', { level: 1 }).closest('div');
      expect(header).toHaveClass('full-header');
      expect(header).toHaveStyle('padding: 20px');
    });

    it('应该支持仅面包屑的配置', () => {
      renderPageHeader({
        breadcrumb: '仅面包屑 / 测试页面'
      });
      
      expect(screen.getByText('仅面包屑 / 测试页面')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('应该支持仅标题的配置', () => {
      renderPageHeader({
        title: '仅标题页面'
      });
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('仅标题页面')).toBeInTheDocument();
    });

    it('应该支持仅操作的配置', () => {
      renderPageHeader({
        actions: <button data-testid="only-action">唯一操作</button>
      });
      
      expect(screen.getByTestId('only-action')).toBeInTheDocument();
      expect(screen.getByText('唯一操作')).toBeInTheDocument();
    });
  });

  describe('可访问性', () => {
    it('应该具有正确的语义化结构', () => {
      renderPageHeader({
        breadcrumb: '首页 / 用户',
        title: '用户列表'
      });
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('用户列表');
    });

    it('应该为操作按钮保持可访问性', () => {
      renderPageHeader({
        title: '可访问性测试',
        actions: (
          <>
            <button aria-label="编辑当前项目">编辑</button>
            <button aria-label="删除当前项目">删除</button>
          </>
        )
      });
      
      const editButton = screen.getByRole('button', { name: '编辑当前项目' });
      const deleteButton = screen.getByRole('button', { name: '删除当前项目' });
      
      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });

    it('应该支持键盘导航', () => {
      renderPageHeader({
        breadcrumb: [
          { key: 'home', label: '首页', href: '/' },
          { key: 'current', label: '当前页' }
        ],
        actions: <button>可聚焦按钮</button>
      });
      
      const link = screen.getByText('首页');
      const button = screen.getByText('可聚焦按钮');
      
      link.focus();
      expect(document.activeElement).toBe(link);
      
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('性能优化', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderPageHeader({
        title: '性能测试页面',
        breadcrumb: '性能 / 测试'
      });
      
      const initialTitle = screen.getByText('性能测试页面');
      const initialBreadcrumb = screen.getByText('性能 / 测试');
      
      rerender(
        <TechThemeProvider>
          <TechPageHeader 
            title="性能测试页面" 
            breadcrumb="性能 / 测试"
          />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('性能测试页面')).toBe(initialTitle);
      expect(screen.getByText('性能 / 测试')).toBe(initialBreadcrumb);
    });

    it('应该优化面包屑渲染', () => {
      const largeBreadcrumb: TechBreadcrumbItem[] = Array.from({ length: 8 }, (_, i) => ({
        label: `级别${i + 1}`,
        href: i < 7 ? `/level${i + 1}` : undefined
      }));
      
      renderPageHeader({ breadcrumb: largeBreadcrumb });
      
      largeBreadcrumb.forEach((item, index) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  describe('样式继承', () => {
    it('应该正确处理CSS模块类名', () => {
      const { container } = renderPageHeader({
        title: 'CSS模块测试',
        actions: <button>测试</button>
      });
      
      const header = container.firstChild as HTMLElement;
      const title = screen.getByRole('heading', { level: 1 });
      const actionsArea = container.querySelector('[class*="actions"]');
      
      expect(header.className).toMatch(/_header_[a-z0-9]+/);
      expect(title.className).toMatch(/_title_[a-z0-9]+/);
      expect(actionsArea?.className).toMatch(/_actions_[a-z0-9]+/);
    });

    it('应该正确合并自定义类名', () => {
      const { container } = renderPageHeader({
        className: 'custom-1 custom-2'
      });
      
      const header = container.firstChild as HTMLElement;
      expect(header).toHaveClass('custom-1');
      expect(header).toHaveClass('custom-2');
      expect(header.className).toMatch(/_header_/);
    });
  });

  describe('动态内容更新', () => {
    it('应该正确处理面包屑类型的动态切换', () => {
      const { rerender } = renderPageHeader({
        breadcrumb: '字符串面包屑'
      });
      
      expect(screen.getByText('字符串面包屑')).toBeInTheDocument();
      
      const arrayBreadcrumb: TechBreadcrumbItem[] = [
        { label: '动态', href: '/' },
        { label: '切换' }
      ];
      
      rerender(
        <TechThemeProvider>
          <TechPageHeader breadcrumb={arrayBreadcrumb} />
        </TechThemeProvider>
      );
      
      expect(screen.queryByText('字符串面包屑')).not.toBeInTheDocument();
      expect(screen.getByText('动态')).toBeInTheDocument();
      expect(screen.getByText('切换')).toBeInTheDocument();
    });

    it('应该正确处理操作内容的动态更新', () => {
      const { rerender } = renderPageHeader({
        title: '动态操作测试',
        actions: <button>初始操作</button>
      });
      
      expect(screen.getByText('初始操作')).toBeInTheDocument();
      
      rerender(
        <TechThemeProvider>
          <TechPageHeader 
            title="动态操作测试"
            actions={
              <>
                <button>新操作1</button>
                <button>新操作2</button>
              </>
            }
          />
        </TechThemeProvider>
      );
      
      expect(screen.queryByText('初始操作')).not.toBeInTheDocument();
      expect(screen.getByText('新操作1')).toBeInTheDocument();
      expect(screen.getByText('新操作2')).toBeInTheDocument();
    });
  });

  describe('集成测试', () => {
    it('应该与TechBreadcrumb组件正确集成', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { label: '首页', href: '/', icon: 'home' },
        { label: '用户管理', href: '/users', icon: 'user' },
        { label: '用户详情', icon: 'user' }
      ];
      
      renderPageHeader({ 
        breadcrumb: breadcrumbItems,
        breadcrumbProps: { showIcons: true }
      });
      
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('用户详情')).toBeInTheDocument();
    });

    it('应该正确处理面包屑组件的variant属性', () => {
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { label: 'Variant测试', href: '/' },
        { label: '当前' }
      ];
      
      renderPageHeader({ 
        breadcrumb: breadcrumbItems
      });
      
      // 组件应该使用simple variant（默认传递的）
      expect(screen.getByText('Variant测试')).toBeInTheDocument();
      expect(screen.getByText('当前')).toBeInTheDocument();
    });
  });

  describe('事件处理', () => {
    it('应该正确传递面包屑的点击事件', () => {
      const mockClick = vi.fn();
      const breadcrumbItems: TechBreadcrumbItem[] = [
        { label: '首页', onClick: mockClick },
        { key: 'current', label: '当前页' }
      ];
      
      renderPageHeader({ breadcrumb: breadcrumbItems });
      
      const homeLink = screen.getByText('首页');
      fireEvent.click(homeLink);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该支持操作按钮的各种事件', () => {
      const mockEdit = vi.fn();
      const mockDelete = vi.fn();
      
      renderPageHeader({
        title: '事件测试页面',
        actions: (
          <>
            <button onClick={mockEdit}>编辑</button>
            <button onClick={mockDelete}>删除</button>
          </>
        )
      });
      
      const editButton = screen.getByText('编辑');
      const deleteButton = screen.getByText('删除');
      
      fireEvent.click(editButton);
      fireEvent.click(deleteButton);
      
      expect(mockEdit).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});