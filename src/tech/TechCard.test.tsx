/**
 * TechCard组件单元测试
 * 
 * 按照TDD原则对科技风格卡片组件进行全面测试
 * 包括多种变体、尺寸、交互功能和性能优化
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechCard } from './TechCard';
import { TechThemeProvider } from './TechThemeProvider';

/**
 * 测试辅助函数：在主题提供器中渲染卡片组件
 */
const renderCard = (props: Partial<React.ComponentProps<typeof TechCard>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechCard {...props}>
        {props.children || '默认卡片内容'}
      </TechCard>
    </TechThemeProvider>
  );
};

describe('TechCard', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染基本卡片', () => {
      renderCard({ children: '测试卡片内容' });
      
      expect(screen.getByText('测试卡片内容')).toBeInTheDocument();
    });

    it('应该应用正确的默认CSS类名', () => {
      renderCard();
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_card_/);
      expect(card?.className).toMatch(/_default_/);
      expect(card?.className).toMatch(/_medium_/);
      expect(card?.className).toMatch(/_hoverable_/);
    });

    it('应该正确应用自定义类名和样式', () => {
      renderCard({
        className: 'custom-card',
        style: { backgroundColor: 'red' }
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toContain('custom-card');
      expect(card?.style.backgroundColor).toBe('red');
    });
  });

  describe('头部区域测试', () => {
    it('应该在有标题时显示头部区域', () => {
      renderCard({ title: '测试标题' });
      
      expect(screen.getByText('测试标题')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('应该在有副标题时显示副标题', () => {
      renderCard({ 
        title: '主标题',
        subtitle: '这是副标题'
      });
      
      expect(screen.getByText('主标题')).toBeInTheDocument();
      expect(screen.getByText('这是副标题')).toBeInTheDocument();
    });

    it('应该在有图标时显示图标', () => {
      renderCard({ 
        title: '带图标标题',
        icon: 'settings'
      });
      
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      expect(screen.getByText('带图标标题')).toBeInTheDocument();
    });

    it('应该支持头部额外内容', () => {
      renderCard({
        title: '标题',
        extra: <button data-testid="header-extra">额外按钮</button>
      });
      
      expect(screen.getByTestId('header-extra')).toBeInTheDocument();
    });

    it('应该在没有头部内容时隐藏头部区域', () => {
      renderCard({
        title: undefined,
        subtitle: undefined,
        icon: undefined,
        extra: undefined
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const header = card?.querySelector('[class*="header"]');
      expect(header).not.toBeInTheDocument();
    });

    it('应该支持自定义头部样式', () => {
      renderCard({
        title: '自定义头部',
        headerStyle: { backgroundColor: 'blue', padding: '20px' }
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const header = card?.querySelector('[class*="header"]');
      expect(header?.style.backgroundColor).toBe('blue');
      expect(header?.style.padding).toBe('20px');
    });
  });

  describe('视觉变体测试', () => {
    const variants: Array<'default' | 'outlined' | 'filled' | 'glass' | 'gradient'> = [
      'default', 'outlined', 'filled', 'glass', 'gradient'
    ];

    variants.forEach(variant => {
      it(`应该正确应用${variant}变体样式`, () => {
        renderCard({ variant });
        
        const card = screen.getByText('默认卡片内容').closest('div');
        expect(card?.className).toMatch(new RegExp(`_${variant}_`));
      });
    });

    it('应该在未指定变体时使用default', () => {
      renderCard({ variant: undefined });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_default_/);
    });
  });

  describe('尺寸测试', () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`应该正确应用${size}尺寸样式`, () => {
        renderCard({ size });
        
        const card = screen.getByText('默认卡片内容').closest('div');
        expect(card?.className).toMatch(new RegExp(`_${size}_`));
      });

      it(`应该根据${size}尺寸调整图标大小`, () => {
        renderCard({ 
          title: '标题',
          icon: 'dashboard',
          size
        });
        
        const icon = screen.getByTestId('tech-icon-dashboard');
        const expectedSize = size === 'small' ? '16' : size === 'large' ? '20' : '18';
        expect(icon).toHaveAttribute('width', expectedSize);
        expect(icon).toHaveAttribute('height', expectedSize);
      });
    });
  });

  describe('交互功能测试', () => {
    it('应该支持点击功能', () => {
      const mockClick = vi.fn();
      renderCard({ 
        clickable: true,
        onClick: mockClick
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_clickable_/);
      
      fireEvent.click(card!);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该在非可点击状态下不响应点击', () => {
      const mockClick = vi.fn();
      renderCard({ 
        clickable: false,
        onClick: mockClick
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      fireEvent.click(card!);
      
      expect(mockClick).not.toHaveBeenCalled();
    });

    it('应该在禁用状态下阻止点击', () => {
      const mockClick = vi.fn();
      renderCard({ 
        clickable: true,
        disabled: true,
        onClick: mockClick
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_disabled_/);
      
      fireEvent.click(card!);
      expect(mockClick).not.toHaveBeenCalled();
    });

    it('应该在加载状态下阻止点击', () => {
      const mockClick = vi.fn();
      renderCard({ 
        clickable: true,
        loading: true,
        onClick: mockClick
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_loading_/);
      
      fireEvent.click(card!);
      expect(mockClick).not.toHaveBeenCalled();
    });

    it('应该支持悬停效果配置', () => {
      const { rerender } = renderCard({ hoverable: true });
      
      let card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_hoverable_/);
      
      rerender(
        <TechThemeProvider>
          <TechCard hoverable={false}>
            默认卡片内容
          </TechCard>
        </TechThemeProvider>
      );
      
      card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).not.toMatch(/_hoverable_/);
    });
  });

  describe('操作区域测试', () => {
    it('应该在有操作内容时显示操作区域', () => {
      renderCard({
        actions: (
          <>
            <button data-testid="action-1">操作1</button>
            <button data-testid="action-2">操作2</button>
          </>
        )
      });
      
      expect(screen.getByTestId('action-1')).toBeInTheDocument();
      expect(screen.getByTestId('action-2')).toBeInTheDocument();
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const actionsArea = card?.querySelector('[class*="actions"]');
      expect(actionsArea).toBeInTheDocument();
    });

    it('应该在没有操作内容时隐藏操作区域', () => {
      renderCard({ actions: undefined });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const actionsArea = card?.querySelector('[class*="actions"]');
      expect(actionsArea).not.toBeInTheDocument();
    });

    it('应该支持复杂的操作内容', () => {
      renderCard({
        actions: (
          <div data-testid="complex-actions">
            <button>编辑</button>
            <button>删除</button>
            <span>|</span>
            <a href="#">更多</a>
          </div>
        )
      });
      
      expect(screen.getByTestId('complex-actions')).toBeInTheDocument();
      expect(screen.getByText('编辑')).toBeInTheDocument();
      expect(screen.getByText('删除')).toBeInTheDocument();
      expect(screen.getByText('更多')).toBeInTheDocument();
    });
  });

  describe('主体内容测试', () => {
    it('应该正确渲染主体内容', () => {
      renderCard({
        children: (
          <div data-testid="card-body">
            <p>段落内容</p>
            <ul>
              <li>列表项1</li>
              <li>列表项2</li>
            </ul>
          </div>
        )
      });
      
      expect(screen.getByTestId('card-body')).toBeInTheDocument();
      expect(screen.getByText('段落内容')).toBeInTheDocument();
      expect(screen.getByText('列表项1')).toBeInTheDocument();
      expect(screen.getByText('列表项2')).toBeInTheDocument();
    });

    it('应该支持自定义主体样式', () => {
      renderCard({
        bodyStyle: { 
          backgroundColor: 'green',
          padding: '30px',
          minHeight: '200px'
        }
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const body = card?.querySelector('[class*="body"]');
      expect(body?.style.backgroundColor).toBe('green');
      expect(body?.style.padding).toBe('30px');
      expect(body?.style.minHeight).toBe('200px');
    });

    it('应该保持主体内容的可访问性', () => {
      renderCard({
        children: (
          <div>
            <button>可访问按钮</button>
            <input type="text" placeholder="可访问输入框" />
          </div>
        )
      });
      
      expect(screen.getByRole('button', { name: '可访问按钮' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('可访问输入框')).toBeInTheDocument();
    });
  });

  describe('完整卡片结构测试', () => {
    it('应该支持完整的卡片结构', () => {
      renderCard({
        title: '完整测试卡片',
        subtitle: '这是一个功能完整的测试卡片',
        icon: 'dashboard',
        variant: 'glass',
        size: 'large',
        hoverable: true,
        clickable: true,
        extra: <span data-testid="header-badge">新</span>,
        actions: (
          <div data-testid="card-actions">
            <button>编辑</button>
            <button>删除</button>
          </div>
        ),
        children: (
          <div data-testid="card-content">
            <p>这是卡片的主要内容区域</p>
            <div>可以包含任意复杂的内容</div>
          </div>
        )
      });
      
      // 验证头部区域
      expect(screen.getByText('完整测试卡片')).toBeInTheDocument();
      expect(screen.getByText('这是一个功能完整的测试卡片')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('header-badge')).toBeInTheDocument();
      
      // 验证主体区域
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByText('这是卡片的主要内容区域')).toBeInTheDocument();
      
      // 验证操作区域
      expect(screen.getByTestId('card-actions')).toBeInTheDocument();
      expect(screen.getByText('编辑')).toBeInTheDocument();
      expect(screen.getByText('删除')).toBeInTheDocument();
      
      // 验证样式类名
      const card = screen.getByText('完整测试卡片').closest('div');
      expect(card?.className).toMatch(/_glass_/);
      expect(card?.className).toMatch(/_large_/);
      expect(card?.className).toMatch(/_hoverable_/);
      expect(card?.className).toMatch(/_clickable_/);
    });

    it('应该正确处理完整卡片的点击事件', () => {
      const mockClick = vi.fn();
      renderCard({
        title: '可点击卡片',
        clickable: true,
        onClick: mockClick
      });
      
      const card = screen.getByText('可点击卡片').closest('div');
      fireEvent.click(card!);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('状态管理测试', () => {
    it('应该正确处理加载状态', () => {
      renderCard({ 
        title: '加载状态卡片',
        loading: true
      });
      
      const card = screen.getByText('加载状态卡片').closest('div');
      expect(card?.className).toMatch(/_loading_/);
    });

    it('应该正确处理禁用状态', () => {
      renderCard({ 
        title: '禁用状态卡片',
        disabled: true
      });
      
      const card = screen.getByText('禁用状态卡片').closest('div');
      expect(card?.className).toMatch(/_disabled_/);
    });

    it('应该同时处理多种状态', () => {
      renderCard({ 
        title: '多状态卡片',
        loading: true,
        disabled: true,
        clickable: true,
        hoverable: false
      });
      
      const card = screen.getByText('多状态卡片').closest('div');
      expect(card?.className).toMatch(/_loading_/);
      expect(card?.className).toMatch(/_disabled_/);
      expect(card?.className).toMatch(/_clickable_/);
      expect(card?.className).not.toMatch(/_hoverable_/);
    });
  });

  describe('头部布局测试', () => {
    it('应该正确布局图标和标题', () => {
      renderCard({
        title: '布局测试',
        icon: 'user'
      });
      
      const card = screen.getByText('布局测试').closest('div');
      const headerContent = card?.querySelector('[class*="headerContent"]');
      const iconDiv = card?.querySelector('[class*="icon"]');
      const titleWrapper = card?.querySelector('[class*="titleWrapper"]');
      
      expect(headerContent).toBeInTheDocument();
      expect(iconDiv).toBeInTheDocument();
      expect(titleWrapper).toBeInTheDocument();
    });

    it('应该在只有标题时正确布局', () => {
      renderCard({ title: '仅标题卡片' });
      
      const card = screen.getByText('仅标题卡片').closest('div');
      const titleWrapper = card?.querySelector('[class*="titleWrapper"]');
      const iconDiv = card?.querySelector('[class*="icon"]');
      
      expect(titleWrapper).toBeInTheDocument();
      expect(iconDiv).not.toBeInTheDocument();
    });

    it('应该在只有图标时正确布局', () => {
      renderCard({ icon: 'settings' });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const iconDiv = card?.querySelector('[class*="icon"]');
      const titleWrapper = card?.querySelector('[class*="titleWrapper"]');
      
      expect(iconDiv).toBeInTheDocument();
      expect(titleWrapper).not.toBeInTheDocument();
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderCard({
        title: '性能测试',
        variant: 'default',
        size: 'medium'
      });
      
      const card = screen.getByText('性能测试').closest('div');
      const initialClassName = card?.className;
      
      // 使用相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechCard title="性能测试" variant="default" size="medium">
            默认卡片内容
          </TechCard>
        </TechThemeProvider>
      );
      
      const newCard = screen.getByText('性能测试').closest('div');
      expect(newCard?.className).toBe(initialClassName);
    });

    it('应该优化状态检查逻辑', () => {
      const { rerender } = renderCard({
        title: '状态优化测试',
        icon: 'dashboard',
        extra: <span>额外</span>
      });
      
      // 验证头部正确显示
      expect(screen.getByText('状态优化测试')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
      
      // 移除头部内容
      rerender(
        <TechThemeProvider>
          <TechCard>
            默认卡片内容
          </TechCard>
        </TechThemeProvider>
      );
      
      // 头部应该隐藏
      const card = screen.getByText('默认卡片内容').closest('div');
      const header = card?.querySelector('[class*="header"]');
      expect(header).not.toBeInTheDocument();
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空字符串标题', () => {
      renderCard({ 
        title: '',
        subtitle: ''
      });
      
      const card = screen.getByText('默认卡片内容').closest('div');
      const header = card?.querySelector('[class*="header"]');
      expect(header).not.toBeInTheDocument();
    });

    it('应该处理null和undefined内容', () => {
      renderCard({
        title: undefined,
        subtitle: null as any,
        icon: undefined,
        extra: null,
        actions: undefined
      });
      
      expect(screen.getByText('默认卡片内容')).toBeInTheDocument();
    });

    it('应该处理复杂的children内容', () => {
      renderCard({
        children: (
          <>
            <div>第一部分</div>
            {null}
            {false && <div>不应该显示</div>}
            <div>第二部分</div>
          </>
        )
      });
      
      expect(screen.getByText('第一部分')).toBeInTheDocument();
      expect(screen.getByText('第二部分')).toBeInTheDocument();
      expect(screen.queryByText('不应该显示')).not.toBeInTheDocument();
    });

    it('应该处理所有可选props为默认值', () => {
      renderCard({});
      
      const card = screen.getByText('默认卡片内容').closest('div');
      expect(card?.className).toMatch(/_default_/);
      expect(card?.className).toMatch(/_medium_/);
      expect(card?.className).toMatch(/_hoverable_/);
      expect(card?.className).not.toMatch(/_clickable_/);
      expect(card?.className).not.toMatch(/_disabled_/);
      expect(card?.className).not.toMatch(/_loading_/);
    });
  });

  describe('无障碍性测试', () => {
    it('应该为可点击卡片提供合适的交互提示', () => {
      renderCard({ 
        title: '可点击卡片',
        clickable: true,
        onClick: vi.fn()
      });
      
      const card = screen.getByText('可点击卡片').closest('div');
      // 可点击卡片应该有适当的cursor样式
      expect(card?.className).toMatch(/_clickable_/);
    });

    it('应该保持标题的语义化结构', () => {
      renderCard({ title: '语义化标题' });
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('语义化标题');
    });

    it('应该为图标提供正确的无障碍属性', () => {
      renderCard({ 
        title: '图标测试',
        icon: 'help'
      });
      
      const icon = screen.getByTestId('tech-icon-help');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('role', 'img');
    });
  });

  describe('样式继承和级联测试', () => {
    it('应该正确处理样式级联', () => {
      renderCard({
        style: { border: '1px solid blue' },
        bodyStyle: { padding: '20px' },
        headerStyle: { backgroundColor: 'gray' },
        title: '样式级联测试'
      });
      
      const card = screen.getByText('样式级联测试').closest('div');
      const header = card?.querySelector('[class*="header"]');
      const body = card?.querySelector('[class*="body"]');
      
      expect(card?.style.border).toBe('1px solid blue');
      expect(header?.style.backgroundColor).toBe('gray');
      expect(body?.style.padding).toBe('20px');
    });

    it('应该保持CSS模块的作用域隔离', () => {
      renderCard({ title: 'CSS模块测试' });
      
      const card = screen.getByText('CSS模块测试').closest('div');
      const header = card?.querySelector('[class*="header"]');
      const body = card?.querySelector('[class*="body"]');
      
      // 验证CSS模块类名的哈希化
      expect(card?.className).toMatch(/_card_[a-z0-9]+/);
      expect(header?.className).toMatch(/_header_[a-z0-9]+/);
      expect(body?.className).toMatch(/_body_[a-z0-9]+/);
    });
  });
});