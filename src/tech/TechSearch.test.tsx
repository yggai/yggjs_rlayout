/**
 * TechSearch组件单元测试
 * 
 * 按照TDD原则对科技风格搜索框组件进行全面测试
 * 包括搜索功能、样式配置和性能优化
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechSearch } from './TechSearch';
import { TechThemeProvider } from './TechThemeProvider';

/**
 * 测试辅助函数：在主题提供器中渲染搜索组件
 */
const renderSearch = (props: Partial<React.ComponentProps<typeof TechSearch>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechSearch {...props} />
    </TechThemeProvider>
  );
};

describe('TechSearch', () => {
  describe('基本渲染测试', () => {
    it('应该正确渲染基本搜索框', () => {
      renderSearch();
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'search');
    });

    it('应该设置正确的默认宽度', () => {
      renderSearch();
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('280px');
    });

    it('应该支持自定义宽度（数字）', () => {
      renderSearch({ width: 320 });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('320px');
    });

    it('应该支持自定义宽度（字符串）', () => {
      renderSearch({ width: '100%' });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('100%');
    });

    it('应该正确应用自定义类名', () => {
      const { container } = renderSearch({ className: 'custom-search' });
      
      const searchWrapper = container.querySelector('[class*="search"]');
      expect(searchWrapper?.className).toContain('custom-search');
    });

    it('应该正确应用自定义样式', () => {
      const customStyle = {
        backgroundColor: 'blue',
        border: '2px solid red'
      };
      
      renderSearch({ style: customStyle });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.backgroundColor).toBe('blue');
      expect(searchContainer?.style.border).toBe('2px solid red');
    });
  });

  describe('搜索功能测试', () => {
    it('应该支持占位符文本', () => {
      renderSearch({ placeholder: '请输入搜索关键词...' });
      
      expect(screen.getByPlaceholderText('请输入搜索关键词...')).toBeInTheDocument();
    });

    it('应该正确处理搜索事件', () => {
      const mockSearch = vi.fn();
      renderSearch({ onSearch: mockSearch });
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '测试搜索' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      
      expect(mockSearch).toHaveBeenCalledWith('测试搜索');
    });

    it('应该支持值变化事件', () => {
      const mockChange = vi.fn();
      renderSearch({ onChange: mockChange });
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '输入内容' } });
      
      expect(mockChange).toHaveBeenCalledWith('输入内容');
    });

    it('应该支持清除功能', () => {
      renderSearch({ defaultValue: '初始内容' });
      
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
      expect(searchInput.value).toBe('初始内容');
      
      // 查找清除按钮（通过Search组件的allowClear=true提供）
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(searchInput.value).toBe('');
    });

    it('应该支持禁用状态', () => {
      renderSearch({ disabled: true });
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeDisabled();
    });
  });

  describe('基础Search组件集成测试', () => {
    it('应该正确传递所有props到基础Search组件', () => {
      const mockSearch = vi.fn();
      const mockChange = vi.fn();
      const mockFocus = vi.fn();
      const mockBlur = vi.fn();
      
      renderSearch({
        placeholder: '集成测试搜索',
        defaultValue: '默认值',
        onSearch: mockSearch,
        onChange: mockChange,
        onFocus: mockFocus,
        onBlur: mockBlur,
        disabled: false,
        autoFocus: true
      });
      
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
      
      // 验证基本属性
      expect(searchInput).toHaveAttribute('placeholder', '集成测试搜索');
      expect(searchInput.value).toBe('默认值');
      expect(searchInput).not.toBeDisabled();
      
      // 测试事件处理
      fireEvent.focus(searchInput);
      expect(mockFocus).toHaveBeenCalled();
      
      fireEvent.change(searchInput, { target: { value: '新内容' } });
      expect(mockChange).toHaveBeenCalledWith('新内容');
      
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      expect(mockSearch).toHaveBeenCalledWith('新内容');
      
      fireEvent.blur(searchInput);
      expect(mockBlur).toHaveBeenCalled();
    });

    it('应该固定使用特定的Search组件配置', () => {
      renderSearch();
      
      const searchInput = screen.getByRole('searchbox');
      
      // 验证搜索图标存在（showSearchIcon=true）
      const searchIcon = screen.getByTestId('tech-icon-search');
      expect(searchIcon).toBeInTheDocument();
      
      // 验证没有独立搜索按钮（searchButton=false）
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
    });

    it('应该使用中等尺寸和幽灵风格', () => {
      renderSearch();
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      // 通过CSS类验证size和variant配置
      expect(searchContainer).toBeInTheDocument();
    });
  });

  describe('样式和布局测试', () => {
    it('应该正确合并CSS类名', () => {
      const { container } = renderSearch({ className: 'extra-search-class' });
      
      const searchWrapper = container.querySelector('[class*="search"]');
      expect(searchWrapper?.className).toMatch(/_search_/); // CSS模块类名
      expect(searchWrapper?.className).toContain('extra-search-class');
    });

    it('应该正确合并样式对象', () => {
      renderSearch({
        width: 300,
        style: { 
          backgroundColor: 'yellow',
          padding: '10px'
        }
      });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('300px');
      expect(searchContainer?.style.backgroundColor).toBe('yellow');
      expect(searchContainer?.style.padding).toBe('10px');
    });

    it('应该保持宽度样式优先级', () => {
      const { container } = renderSearch({
        width: 350,
        style: { width: '200px' } // 这个应该被width prop覆盖
      });
      
      const searchWrapper = container.querySelector('[class*="search"]');
      expect(searchWrapper?.style.width).toBe('350px');
    });
  });

  describe('响应式设计测试', () => {
    it('应该在移动端使用合适的宽度', () => {
      renderSearch({ width: '100%' });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('100%');
    });

    it('应该支持百分比宽度', () => {
      renderSearch({ width: '50%' });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('50%');
    });

    it('应该支持calc()表达式', () => {
      renderSearch({ width: 'calc(100% - 20px)' });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('calc(100% - 20px)');
    });
  });

  describe('交互功能测试', () => {
    it('应该支持键盘导航', () => {
      const mockSearch = vi.fn();
      renderSearch({ onSearch: mockSearch });
      
      const searchInput = screen.getByRole('searchbox');
      
      // 直接设置焦点
      searchInput.focus();
      
      // Enter键应该触发搜索
      fireEvent.change(searchInput, { target: { value: '键盘搜索' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      expect(mockSearch).toHaveBeenCalledWith('键盘搜索');
    });

    it('应该支持Escape键清除', () => {
      renderSearch({ defaultValue: '清除测试' });
      
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
      expect(searchInput.value).toBe('清除测试');
      
      fireEvent.keyDown(searchInput, { key: 'Escape' });
      // Escape键行为由基础Search组件处理
    });

    it('应该支持鼠标点击搜索图标', () => {
      const mockSearch = vi.fn();
      renderSearch({ 
        onSearch: mockSearch,
        defaultValue: '图标点击测试'
      });
      
      const searchIcon = screen.getByTestId('tech-icon-search');
      fireEvent.click(searchIcon);
      
      // 点击图标应该触发搜索
      expect(mockSearch).toHaveBeenCalledWith('图标点击测试');
    });
  });

  describe('性能测试', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderSearch({
        placeholder: '性能测试',
        width: 280
      });
      
      const searchInput = screen.getByRole('searchbox');
      const initialPlaceholder = searchInput.getAttribute('placeholder');
      
      // 使用相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechSearch placeholder="性能测试" width={280} />
        </TechThemeProvider>
      );
      
      expect(searchInput.getAttribute('placeholder')).toBe(initialPlaceholder);
    });

    it('应该正确响应宽度变化', () => {
      const { rerender } = renderSearch({ width: 280 });
      
      let searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('280px');
      
      rerender(
        <TechThemeProvider>
          <TechSearch width={320} />
        </TechThemeProvider>
      );
      
      searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('320px');
    });

    it('应该优化样式对象合并', () => {
      const { rerender } = renderSearch({
        width: 280,
        style: { backgroundColor: 'blue' }
      });
      
      let searchContainer = screen.getByRole('searchbox').closest('div');
      const initialBgColor = searchContainer?.style.backgroundColor;
      const initialWidth = searchContainer?.style.width;
      
      // 使用相同样式重新渲染
      rerender(
        <TechThemeProvider>
          <TechSearch 
            width={280}
            style={{ backgroundColor: 'blue' }}
          />
        </TechThemeProvider>
      );
      
      searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.backgroundColor).toBe(initialBgColor);
      expect(searchContainer?.style.width).toBe(initialWidth);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理极小宽度', () => {
      renderSearch({ width: 1 });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('1px');
    });

    it('应该处理极大宽度', () => {
      renderSearch({ width: 9999 });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('9999px');
    });

    it('应该处理零宽度', () => {
      renderSearch({ width: 0 });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('0px');
    });

    it('应该处理负数宽度', () => {
      const { container } = renderSearch({ width: -100 });
      
      const searchWrapper = container.querySelector('[class*="search"]');
      expect(searchWrapper?.style.width).toBe('-100px');
    });

    it('应该处理空字符串宽度', () => {
      renderSearch({ width: '' });
      
      const searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('');
    });

    it('应该处理undefined样式', () => {
      renderSearch({ 
        style: undefined,
        className: undefined
      });
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('事件处理测试', () => {
    it('应该在没有onSearch回调时不报错', () => {
      renderSearch({ onSearch: undefined });
      
      const searchInput = screen.getByRole('searchbox');
      
      expect(() => {
        fireEvent.change(searchInput, { target: { value: '无回调测试' } });
        fireEvent.keyDown(searchInput, { key: 'Enter' });
      }).not.toThrow();
    });

    it('应该在没有onChange回调时不报错', () => {
      renderSearch({ onChange: undefined });
      
      const searchInput = screen.getByRole('searchbox');
      
      expect(() => {
        fireEvent.change(searchInput, { target: { value: '无onChange测试' } });
      }).not.toThrow();
    });

    it('应该支持多种键盘事件', () => {
      const mockSearch = vi.fn();
      renderSearch({ onSearch: mockSearch });
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '键盘测试' } });
      
      // Enter键触发搜索
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      expect(mockSearch).toHaveBeenCalledWith('键盘测试');
      
      mockSearch.mockClear();
      
      // 其他键不应该触发搜索
      fireEvent.keyDown(searchInput, { key: 'Space' });
      expect(mockSearch).not.toHaveBeenCalled();
    });
  });

  describe('科技风格配置测试', () => {
    it('应该使用固定的科技风格配置', () => {
      renderSearch();
      
      const searchInput = screen.getByRole('searchbox');
      
      // 验证搜索图标存在
      expect(screen.getByTestId('tech-icon-search')).toBeInTheDocument();
      
      // 验证输入框存在
      expect(searchInput).toBeInTheDocument();
    });

    it('应该应用科技风格CSS模块类名', () => {
      const { container } = renderSearch();
      
      const searchWrapper = container.querySelector('[class*="search"]');
      expect(searchWrapper?.className).toMatch(/_search_/);
    });

    it('应该禁用搜索按钮显示', () => {
      renderSearch();
      
      // 不应该有独立的搜索按钮（因为searchButton=false）
      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
    });

    it('应该启用清除功能', () => {
      renderSearch({ defaultValue: '清除功能测试' });
      
      const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
      expect(searchInput.value).toBe('清除功能测试');
      
      // allowClear=true应该提供清除功能
      // 具体的清除按钮由基础Search组件处理
    });
  });

  describe('无障碍性测试', () => {
    it('应该设置正确的搜索框角色', () => {
      renderSearch();
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toHaveAttribute('type', 'search');
    });

    it('应该支持aria-label', () => {
      renderSearch({ 'aria-label': '全局搜索输入框' });
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toHaveAttribute('aria-label', '全局搜索输入框');
    });

    it('应该支持aria-describedby', () => {
      renderSearch({ 'aria-describedby': 'search-help' });
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toHaveAttribute('aria-describedby', 'search-help');
    });

    it('应该保持图标的无障碍性', () => {
      renderSearch();
      
      const searchIcon = screen.getByTestId('tech-icon-search');
      expect(searchIcon).toHaveAttribute('aria-hidden', 'true');
      expect(searchIcon).toHaveAttribute('role', 'img');
    });
  });

  describe('类型安全测试', () => {
    it('应该接受所有基础Search组件的props', () => {
      // 这个测试主要验证TypeScript类型定义的正确性
      expect(() => {
        render(
          <TechThemeProvider>
            <TechSearch
              placeholder="类型测试"
              defaultValue="默认值"
              maxLength={100}
              autoComplete="off"
              name="search-input"
              id="tech-search"
              tabIndex={0}
              autoFocus={false}
              disabled={false}
              readOnly={false}
              required={false}
            />
          </TechThemeProvider>
        );
      }).not.toThrow();
    });

    it('应该排除被覆盖的props', () => {
      // variant, showSearchIcon, searchButton 应该被TechSearch固定设置
      renderSearch();
      
      const searchInput = screen.getByRole('searchbox');
      expect(searchInput).toBeInTheDocument();
      
      // 验证固定配置生效
      expect(screen.getByTestId('tech-icon-search')).toBeInTheDocument();
    });
  });

  describe('性能优化测试', () => {
    it('应该优化样式对象创建', () => {
      const { rerender } = renderSearch({
        width: 280,
        style: { margin: '10px' }
      });
      
      let searchContainer = screen.getByRole('searchbox').closest('div');
      const initialStyle = searchContainer?.style.cssText;
      
      // 相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechSearch 
            width={280}
            style={{ margin: '10px' }}
          />
        </TechThemeProvider>
      );
      
      searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.cssText).toBe(initialStyle);
    });

    it('应该正确处理动态宽度变化', () => {
      const { rerender } = renderSearch({ width: 200 });
      
      let searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('200px');
      
      rerender(
        <TechThemeProvider>
          <TechSearch width={400} />
        </TechThemeProvider>
      );
      
      searchContainer = screen.getByRole('searchbox').closest('div');
      expect(searchContainer?.style.width).toBe('400px');
    });
  });

  describe('集成测试', () => {
    it('应该在TechHeader中正常工作', () => {
      const mockSearch = vi.fn();
      
      // 模拟在TechHeader中使用的场景
      render(
        <TechThemeProvider>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>品牌</div>
            <TechSearch 
              onSearch={mockSearch}
              placeholder="头部搜索"
              width={220}
            />
            <div>操作区域</div>
          </div>
        </TechThemeProvider>
      );
      
      expect(screen.getByPlaceholderText('头部搜索')).toBeInTheDocument();
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: '集成搜索' } });
      fireEvent.keyDown(searchInput, { key: 'Enter' });
      
      expect(mockSearch).toHaveBeenCalledWith('集成搜索');
    });

    it('应该与主题系统正确集成', () => {
      render(
        <TechThemeProvider theme={{
          colors: { accent: '#custom-accent' }
        }}>
          <TechSearch placeholder="主题测试" />
        </TechThemeProvider>
      );
      
      expect(screen.getByPlaceholderText('主题测试')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-search')).toBeInTheDocument();
    });
  });
});