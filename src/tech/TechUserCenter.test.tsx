import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TechUserCenter } from './TechUserCenter';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechUserCenterItem } from './TechUserCenter';

const renderUserCenter = (props: Partial<React.ComponentProps<typeof TechUserCenter>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechUserCenter {...props} />
    </TechThemeProvider>
  );
};

describe('TechUserCenter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.removeEventListener('mousedown', vi.fn());
    document.removeEventListener('keydown', vi.fn());
  });

  describe('基础渲染', () => {
    it('应该正确渲染基本用户中心', () => {
      renderUserCenter();
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('用')).toBeInTheDocument(); // 默认用户名的首字母
    });

    it('应该正确应用CSS模块类名', () => {
      const { container } = renderUserCenter();
      
      const userCenter = container.firstChild as HTMLElement;
      expect(userCenter.className).toMatch(/_userCenter_/);
    });

    it('应该正确应用自定义类名', () => {
      renderUserCenter({ className: 'custom-user-center' });
      
      const userCenter = screen.getByRole('button').closest('div');
      expect(userCenter).toHaveClass('custom-user-center');
    });
  });

  describe('用户信息显示', () => {
    it('应该显示自定义用户名', () => {
      renderUserCenter({ username: '张三' });
      
      expect(screen.getByText('张')).toBeInTheDocument();
    });

    it('应该在showUsername为true时显示完整用户名', () => {
      renderUserCenter({ 
        username: '张三',
        showUsername: true
      });
      
      expect(screen.getByText('张三')).toBeInTheDocument();
    });

    it('应该显示用户附加信息', () => {
      renderUserCenter({ 
        username: '张三',
        userInfo: 'admin@example.com',
        showUsername: true
      });
      
      expect(screen.getByText('张三')).toBeInTheDocument();
      expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    });

    it('应该正确渲染用户头像', () => {
      renderUserCenter({ 
        avatar: '/avatar.jpg',
        username: '张三'
      });
      
      const avatarImg = screen.getByAltText('张三');
      expect(avatarImg).toBeInTheDocument();
      expect(avatarImg).toHaveAttribute('src', '/avatar.jpg');
    });

    it('应该在没有头像时显示用户名首字母', () => {
      renderUserCenter({ username: '李四' });
      
      expect(screen.getByText('李')).toBeInTheDocument();
    });
  });

  describe('尺寸变体', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      it(`应该正确处理${size}尺寸`, () => {
        renderUserCenter({ 
          username: '测试用户',
          size
        });
        
        const avatar = screen.getByText('测').closest('div');
        const sizeMap = {
          small: { avatar: 28, icon: 14 },
          medium: { avatar: 32, icon: 16 },
          large: { avatar: 40, icon: 18 }
        };
        
        const expectedSize = sizeMap[size];
        expect(avatar).toHaveStyle(`width: ${expectedSize.avatar}px`);
        expect(avatar).toHaveStyle(`height: ${expectedSize.avatar}px`);
      });
    });

    it('应该根据尺寸调整图标大小', () => {
      renderUserCenter({ size: 'large' });
      
      const chevronIcon = screen.getByTestId('tech-icon-chevron-down');
      expect(chevronIcon).toHaveAttribute('width', '18');
      expect(chevronIcon).toHaveAttribute('height', '18');
    });
  });

  describe('下拉菜单功能', () => {
    it('应该在点击触发器时打开下拉菜单', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
    });

    it('应该在再次点击时关闭下拉菜单', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      // 打开
      fireEvent.click(trigger);
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      // 关闭
      fireEvent.click(trigger);
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });

    it('应该支持键盘交互', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      // Enter键应该打开菜单
      fireEvent.keyDown(trigger, { key: 'Enter' });
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      // 重置状态
      fireEvent.click(trigger);
      
      // 空格键应该打开菜单
      fireEvent.keyDown(trigger, { key: ' ' });
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
    });

    it('应该在Escape键时关闭下拉菜单', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });

    it('应该在点击外部时关闭下拉菜单', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      // 模拟点击外部
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });
  });

  describe('菜单项功能', () => {
    const customItems: TechUserCenterItem[] = [
      { key: 'profile', label: '个人中心', icon: 'user', onClick: vi.fn() },
      { key: 'settings', label: '设置', icon: 'settings', href: '/settings' },
      { key: 'logout', label: '退出登录', icon: 'logout', danger: true, onClick: vi.fn() }
    ];

    it('应该正确渲染自定义菜单项', async () => {
      renderUserCenter({ items: customItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('个人中心')).toBeInTheDocument();
        expect(screen.getByText('设置')).toBeInTheDocument();
        expect(screen.getByText('退出登录')).toBeInTheDocument();
      });
    });

    it('应该正确处理菜单项的点击事件', async () => {
      const mockProfileClick = vi.fn();
      const mockLogoutClick = vi.fn();
      
      const itemsWithClick: TechUserCenterItem[] = [
        { key: 'profile', label: '个人中心', onClick: mockProfileClick },
        { key: 'logout', label: '退出', onClick: mockLogoutClick, danger: true }
      ];
      
      renderUserCenter({ items: itemsWithClick });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('个人中心')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('个人中心'));
      expect(mockProfileClick).toHaveBeenCalledTimes(1);
      
      // 菜单应该关闭
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });

    it('应该正确处理href链接项目', async () => {
      // Mock window.location.href
      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true
      });
      
      const hrefItems: TechUserCenterItem[] = [
        { key: 'settings', label: '设置', href: '/settings' }
      ];
      
      renderUserCenter({ items: hrefItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('设置')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('设置'));
      expect(window.location.href).toBe('/settings');
    });

    it('应该为危险操作项目应用danger样式', async () => {
      const dangerItems: TechUserCenterItem[] = [
        { key: 'logout', label: '危险操作', danger: true }
      ];
      
      renderUserCenter({ items: dangerItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const dangerButton = screen.getByText('危险操作').closest('button');
        expect(dangerButton).not.toBeNull();
        expect(dangerButton!.className).toMatch(/_danger_/);
      });
    });

    it('应该正确渲染菜单项图标', async () => {
      const iconsItems: TechUserCenterItem[] = [
        { key: 'profile', label: '个人中心', icon: 'user' },
        { key: 'settings', label: '设置', icon: 'settings' }
      ];
      
      renderUserCenter({ items: iconsItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
        expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      });
    });
  });

  describe('下拉菜单头部', () => {
    it('应该在下拉菜单中显示用户信息', async () => {
      renderUserCenter({ 
        username: '王五',
        userInfo: 'wang@example.com',
        avatar: '/wang.jpg'
      });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 下拉菜单中应该有用户信息
        const dropdownUsernames = screen.getAllByText('王五');
        expect(dropdownUsernames.length).toBeGreaterThan(0);
        
        const dropdownEmails = screen.getAllByText('wang@example.com');
        expect(dropdownEmails.length).toBeGreaterThan(0);
      });
    });

    it('应该在下拉菜单头部显示头像', async () => {
      renderUserCenter({ 
        username: '赵六',
        avatar: '/zhao.jpg'
      });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const avatars = screen.getAllByAltText('赵六');
        expect(avatars.length).toBe(2); // 触发器中一个，下拉菜单中一个
      });
    });

    it('应该在没有头像时显示首字母', async () => {
      renderUserCenter({ username: '孙七' });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const sunChars = screen.getAllByText('孙');
        expect(sunChars.length).toBe(2); // 触发器中一个，下拉菜单中一个
      });
    });
  });

  describe('默认菜单项', () => {
    it('应该使用默认菜单项', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('个人中心')).toBeInTheDocument();
        expect(screen.getByText('设置')).toBeInTheDocument();
        expect(screen.getByText('帮助')).toBeInTheDocument();
        expect(screen.getByText('注销')).toBeInTheDocument();
      });
    });

    it('应该为默认的注销项目应用danger样式', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const logoutButton = screen.getByText('注销').closest('button');
        expect(logoutButton).not.toBeNull();
        expect(logoutButton!.className).toMatch(/_danger_/);
      });
    });

    it('应该为默认项目显示正确的图标', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tech-icon-profile')).toBeInTheDocument();
        expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
        expect(screen.getByTestId('tech-icon-help')).toBeInTheDocument();
        expect(screen.getByTestId('tech-icon-logout')).toBeInTheDocument();
      });
    });
  });

  describe('回调函数', () => {
    it('应该正确调用onAvatarClick回调', () => {
      const mockAvatarClick = vi.fn();
      
      renderUserCenter({ onAvatarClick: mockAvatarClick });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      expect(mockAvatarClick).toHaveBeenCalledTimes(1);
    });

    it('应该在菜单项点击后关闭菜单', async () => {
      const mockClick = vi.fn();
      const testItems: TechUserCenterItem[] = [
        { key: 'test', label: '测试项目', onClick: mockClick }
      ];
      
      renderUserCenter({ items: testItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      fireEvent.click(screen.getByText('测试项目'));
      
      expect(mockClick).toHaveBeenCalledTimes(1);
      
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });
  });

  describe('键盘交互', () => {
    it('应该支持触发器的键盘交互', () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      // Enter键
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(trigger.className).toMatch(/_active_/);
      
      // 重置
      fireEvent.click(trigger);
      
      // 空格键
      fireEvent.keyDown(trigger, { key: ' ' });
      expect(trigger.className).toMatch(/_active_/);
    });

    it('应该阻止空格键的默认行为', () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      const preventDefaultSpy = vi.spyOn(spaceEvent, 'preventDefault');
      
      fireEvent(trigger, spaceEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('应该忽略其他按键', () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      fireEvent.keyDown(trigger, { key: 'Tab' });
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      
      expect(trigger.className).not.toMatch(/_active_/);
    });
  });

  describe('事件监听器管理', () => {
    it('应该在打开时添加事件监听器', async () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });

    it('应该在关闭时移除事件监听器', async () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      });
    });
  });

  describe('样式状态', () => {
    it('应该为打开状态的下拉菜单应用open类名', async () => {
      const { container } = renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const dropdown = container.querySelector('[class*="dropdown"]');
        expect(dropdown?.className).toMatch(/_open_/);
      });
    });

    it('应该为关闭状态的下拉菜单移除open类名', async () => {
      const { container } = renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      // 打开
      fireEvent.click(trigger);
      await waitFor(() => {
        const dropdown = container.querySelector('[class*="dropdown"]');
        expect(dropdown?.className).toMatch(/_open_/);
      });
      
      // 关闭
      fireEvent.click(trigger);
      await waitFor(() => {
        const dropdown = container.querySelector('[class*="dropdown"]');
        expect(dropdown?.className).not.toMatch(/_open_/);
      });
    });

    it('应该正确应用各种CSS类名', () => {
      const { container } = renderUserCenter({ showUsername: true });
      
      expect(container.querySelector('[class*="trigger"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="avatar"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="userInfo"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="username"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="chevronIcon"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="dropdown"]')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理空的菜单项数组', async () => {
      renderUserCenter({ items: [] });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const { container } = render(
          <TechThemeProvider>
            <TechUserCenter items={[]} />
          </TechThemeProvider>
        );
        
        // 下拉菜单应该存在但为空
        const dropdown = container.querySelector('[class*="dropdown"]');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('应该处理undefined用户信息', () => {
      renderUserCenter({ 
        username: undefined as any,
        userInfo: undefined
      });
      
      expect(screen.getByText('用')).toBeInTheDocument(); // 默认用户名
    });

    it('应该处理空字符串用户名', () => {
      renderUserCenter({ username: '' });
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('应该处理无效的头像URL', () => {
      renderUserCenter({ 
        avatar: '',
        username: '测试用户'
      });
      
      expect(screen.getByText('测')).toBeInTheDocument();
    });
  });

  describe('可访问性', () => {
    it('应该具有正确的role属性', () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('tabIndex', '0');
    });

    it('应该为头像图片设置正确的alt属性', () => {
      renderUserCenter({ 
        avatar: '/test-avatar.jpg',
        username: '可访问性测试用户'
      });
      
      const avatarImg = screen.getByAltText('可访问性测试用户');
      expect(avatarImg).toBeInTheDocument();
    });

    it('应该支持键盘导航', () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      trigger.focus();
      
      expect(document.activeElement).toBe(trigger);
    });

    it('应该为菜单项提供正确的button语义', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const menuButtons = screen.getAllByRole('button');
        // 应该包括触发器和菜单项按钮
        expect(menuButtons.length).toBeGreaterThan(1);
      });
    });
  });

  describe('性能优化', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderUserCenter({
        username: '性能测试',
        userInfo: 'performance@test.com'
      });
      
      const initialTrigger = screen.getByRole('button');
      
      rerender(
        <TechThemeProvider>
          <TechUserCenter 
            username="性能测试" 
            userInfo="performance@test.com"
          />
        </TechThemeProvider>
      );
      
      expect(screen.getByRole('button')).toBe(initialTrigger);
    });

    it('应该正确处理大量菜单项', async () => {
      const manyItems: TechUserCenterItem[] = Array.from({ length: 20 }, (_, i) => ({
        key: `item-${i}`,
        label: `菜单项${i + 1}`,
        icon: 'user',
        onClick: vi.fn()
      }));
      
      renderUserCenter({ items: manyItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('菜单项1')).toBeInTheDocument();
        expect(screen.getByText('菜单项20')).toBeInTheDocument();
      });
    });
  });

  describe('组合场景', () => {
    it('应该支持完整配置的用户中心', async () => {
      const mockAvatarClick = vi.fn();
      const mockProfileClick = vi.fn();
      const mockLogoutClick = vi.fn();
      
      const fullConfig = {
        avatar: '/full-avatar.jpg',
        username: '完整配置用户',
        userInfo: 'full@config.com',
        showUsername: true,
        size: 'large' as const,
        onAvatarClick: mockAvatarClick,
        items: [
          { key: 'profile', label: '个人资料', icon: 'user' as const, onClick: mockProfileClick },
          { key: 'settings', label: '账户设置', icon: 'settings' as const, href: '/settings' },
          { key: 'logout', label: '安全退出', icon: 'logout' as const, danger: true, onClick: mockLogoutClick }
        ],
        className: 'full-user-center'
      };
      
      renderUserCenter(fullConfig);
      
      // 验证触发器显示
      expect(screen.getByText('完整配置用户')).toBeInTheDocument();
      expect(screen.getByText('full@config.com')).toBeInTheDocument();
      expect(screen.getByAltText('完整配置用户')).toBeInTheDocument();
      
      // 验证自定义类名
      const userCenter = screen.getByRole('button').closest('div');
      expect(userCenter).toHaveClass('full-user-center');
      
      // 测试头像点击
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      expect(mockAvatarClick).toHaveBeenCalledTimes(1);
      
      // 验证下拉菜单
      await waitFor(() => {
        expect(screen.getByText('个人资料')).toBeInTheDocument();
        expect(screen.getByText('账户设置')).toBeInTheDocument();
        expect(screen.getByText('安全退出')).toBeInTheDocument();
      });
      
      // 测试菜单项点击
      fireEvent.click(screen.getByText('个人资料'));
      expect(mockProfileClick).toHaveBeenCalledTimes(1);
    });

    it('应该支持最小配置', () => {
      renderUserCenter({});
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('用')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-chevron-down')).toBeInTheDocument();
    });
  });

  describe('状态管理', () => {
    it('应该正确管理打开关闭状态', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      
      // 初始状态应该是关闭的
      expect(trigger.className).not.toMatch(/_active_/);
      
      // 点击打开
      fireEvent.click(trigger);
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      // 再次点击关闭
      fireEvent.click(trigger);
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });

    it('应该在组件卸载时清理事件监听器', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });

  describe('外部点击检测', () => {
    it('应该正确检测点击范围', async () => {
      renderUserCenter();
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(trigger.className).toMatch(/_active_/);
      });
      
      // 点击触发器内部不应该关闭菜单
      fireEvent.mouseDown(trigger);
      expect(trigger.className).toMatch(/_active_/);
      
      // 点击外部应该关闭菜单
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(trigger.className).not.toMatch(/_active_/);
      });
    });
  });

  describe('动态内容更新', () => {
    it('应该正确处理用户信息的动态更新', () => {
      const { rerender } = renderUserCenter({ 
        username: '初始用户',
        userInfo: 'initial@test.com'
      });
      
      expect(screen.getByText('初')).toBeInTheDocument();
      
      rerender(
        <TechThemeProvider>
          <TechUserCenter 
            username="更新用户" 
            userInfo="updated@test.com"
            showUsername={true}
          />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('更')).toBeInTheDocument();
      expect(screen.getByText('更新用户')).toBeInTheDocument();
      expect(screen.getByText('updated@test.com')).toBeInTheDocument();
    });

    it('应该正确处理菜单项的动态更新', async () => {
      const initialItems: TechUserCenterItem[] = [
        { key: 'initial', label: '初始项目' }
      ];
      
      const { rerender } = renderUserCenter({ items: initialItems });
      
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('初始项目')).toBeInTheDocument();
      });
      
      const updatedItems: TechUserCenterItem[] = [
        { key: 'updated', label: '更新项目', icon: 'plus' }
      ];
      
      rerender(
        <TechThemeProvider>
          <TechUserCenter items={updatedItems} />
        </TechThemeProvider>
      );
      
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.queryByText('初始项目')).not.toBeInTheDocument();
        expect(screen.getByText('更新项目')).toBeInTheDocument();
        expect(screen.getByTestId('tech-icon-plus')).toBeInTheDocument();
      });
    });
  });
});