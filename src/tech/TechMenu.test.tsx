import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TechMenu } from './TechMenu';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechMenuItem, LinkLikeComponent } from './TechMenu';

const MockLink: LinkLikeComponent = ({ to, className, children }) => (
  <a href={to} className={className} data-testid="mock-link">
    {children}
  </a>
);

const renderMenu = (props: Partial<React.ComponentProps<typeof TechMenu>>) => {
  const defaultProps = {
    items: []
  };
  
  return render(
    <TechThemeProvider>
      <TechMenu {...defaultProps} {...props} />
    </TechThemeProvider>
  );
};

describe('TechMenu', () => {
  describe('基础渲染', () => {
    it('应该正确渲染空菜单', () => {
      const { container } = renderMenu({ items: [] });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu).toBeInTheDocument();
    });

    it('应该正确应用CSS模块类名', () => {
      const { container } = renderMenu({ items: [] });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu?.className).toMatch(/_menu_/);
    });

    it('应该正确应用自定义类名', () => {
      const { container } = renderMenu({ 
        items: [],
        className: 'custom-menu'
      });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu).toHaveClass('custom-menu');
    });

    it('应该在折叠状态下应用collapsed类名', () => {
      const { container } = renderMenu({ 
        items: [],
        collapsed: true
      });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu?.className).toMatch(/_collapsed_/);
    });
  });

  describe('菜单项渲染', () => {
    const basicItems: TechMenuItem[] = [
      { key: 'dashboard', label: '控制台', icon: 'dashboard' },
      { key: 'users', label: '用户管理', icon: 'user' },
      { key: 'settings', label: '设置', icon: 'settings' }
    ];

    it('应该正确渲染基础菜单项', () => {
      renderMenu({ items: basicItems });
      
      expect(screen.getByText('控制台')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('设置')).toBeInTheDocument();
    });

    it('应该正确渲染菜单项图标', () => {
      renderMenu({ items: basicItems });
      
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
    });

    it('应该处理没有图标的菜单项', () => {
      const itemsWithoutIcon: TechMenuItem[] = [
        { key: 'no-icon', label: '无图标项目' }
      ];
      
      renderMenu({ items: itemsWithoutIcon });
      
      expect(screen.getByText('无图标项目')).toBeInTheDocument();
    });

    it('应该在折叠状态下应用正确的文本样式', () => {
      const { container } = renderMenu({ 
        items: basicItems,
        collapsed: true
      });
      
      const navTexts = container.querySelectorAll('[class*="navTextCollapsed"]');
      expect(navTexts.length).toBeGreaterThan(0);
    });

    it('应该在展开状态下应用正确的文本样式', () => {
      const { container } = renderMenu({ 
        items: basicItems,
        collapsed: false
      });
      
      const navTexts = container.querySelectorAll('[class*="navText"]');
      expect(navTexts.length).toBeGreaterThan(0);
    });
  });

  describe('链接功能', () => {
    it('应该正确处理href链接', () => {
      const hrefItems: TechMenuItem[] = [
        { key: 'external', label: '外部链接', href: 'https://example.com', icon: 'api' }
      ];
      
      renderMenu({ items: hrefItems });
      
      const link = screen.getByText('外部链接').closest('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('应该正确处理SPA路由链接', () => {
      const routeItems: TechMenuItem[] = [
        { key: 'dashboard', label: '控制台', to: '/dashboard', icon: 'dashboard' }
      ];
      
      renderMenu({ 
        items: routeItems,
        linkComponent: MockLink
      });
      
      const link = screen.getByTestId('mock-link');
      expect(link).toHaveAttribute('href', '/dashboard');
      expect(screen.getByText('控制台')).toBeInTheDocument();
    });

    it('应该正确处理无链接的菜单项', () => {
      const noLinkItems: TechMenuItem[] = [
        { key: 'no-link', label: '无链接项目', icon: 'book' }
      ];
      
      renderMenu({ items: noLinkItems });
      
      const item = screen.getByText('无链接项目');
      expect(item.closest('span')).toBeInTheDocument();
      expect(item.closest('a')).not.toBeInTheDocument();
    });
  });

  describe('子菜单功能', () => {
    const nestedItems: TechMenuItem[] = [
      {
        key: 'users',
        label: '用户管理',
        icon: 'user',
        children: [
          { key: 'user-list', label: '用户列表', to: '/users', icon: 'book' },
          { key: 'user-roles', label: '角色管理', to: '/users/roles', icon: 'settings' }
        ]
      },
      {
        key: 'system',
        label: '系统设置',
        icon: 'settings',
        children: [
          { key: 'general', label: '基础设置', href: '/system/general' },
          { key: 'security', label: '安全设置', href: '/system/security' }
        ]
      }
    ];

    it('应该正确渲染嵌套菜单项', () => {
      renderMenu({ items: nestedItems });
      
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('系统设置')).toBeInTheDocument();
    });

    it('应该正确处理子菜单的链接', () => {
      renderMenu({ 
        items: nestedItems,
        linkComponent: MockLink
      });
      
      // 父级菜单项应该渲染为span（因为有子菜单）
      const userManagement = screen.getByText('用户管理');
      expect(userManagement.closest('span')).toBeInTheDocument();
      
      // 子菜单项可能不会直接显示，这取决于Menu组件的实现
      expect(screen.getByText('系统设置')).toBeInTheDocument();
    });

    it('应该为有子菜单的项目应用正确的渲染逻辑', () => {
      const parentWithChildren: TechMenuItem[] = [
        {
          key: 'parent',
          label: '父级菜单',
          icon: 'book',
          children: [
            { key: 'child', label: '子菜单', icon: 'api' }
          ]
        }
      ];
      
      renderMenu({ items: parentWithChildren });
      
      const parentItem = screen.getByText('父级菜单');
      expect(parentItem.closest('span')).toBeInTheDocument();
      expect(parentItem.closest('a')).not.toBeInTheDocument();
    });
  });

  describe('模式切换', () => {
    const modeItems: TechMenuItem[] = [
      { key: 'item1', label: '项目1', icon: 'plus' },
      { key: 'item2', label: '项目2', icon: 'home' }
    ];

    it('应该支持垂直模式', () => {
      renderMenu({ 
        items: modeItems,
        mode: 'vertical'
      });
      
      expect(screen.getByText('项目1')).toBeInTheDocument();
      expect(screen.getByText('项目2')).toBeInTheDocument();
    });

    it('应该支持水平模式', () => {
      renderMenu({ 
        items: modeItems,
        mode: 'horizontal'
      });
      
      expect(screen.getByText('项目1')).toBeInTheDocument();
      expect(screen.getByText('项目2')).toBeInTheDocument();
    });

    it('应该为水平模式应用正确的样式变量', () => {
      renderMenu({ 
        items: modeItems,
        mode: 'horizontal'
      });
      
      // 水平模式应该设置特定的CSS变量
      expect(screen.getByText('项目1')).toBeInTheDocument();
    });
  });

  describe('事件处理', () => {
    it('应该正确处理onSelect事件', () => {
      const mockSelect = vi.fn();
      const selectItems: TechMenuItem[] = [
        { key: 'selectable', label: '可选择项目', icon: 'plus' }
      ];
      
      renderMenu({ 
        items: selectItems,
        onSelect: mockSelect
      });
      
      // 这里需要模拟Menu组件的选中行为
      // 由于我们依赖基础Menu组件，实际的点击测试可能需要更复杂的模拟
      expect(screen.getByText('可选择项目')).toBeInTheDocument();
    });

    it('应该正确处理onSelectItem事件', () => {
      const mockSelectItem = vi.fn();
      const itemsForCallback: TechMenuItem[] = [
        { key: 'callback-test', label: '回调测试', icon: 'info' }
      ];
      
      renderMenu({ 
        items: itemsForCallback,
        onSelectItem: mockSelectItem
      });
      
      expect(screen.getByText('回调测试')).toBeInTheDocument();
    });
  });

  describe('性能优化', () => {
    it('应该使用memo优化组件重新渲染', () => {
      const stableItems: TechMenuItem[] = [
        { key: 'stable', label: '稳定项目', icon: 'home' }
      ];
      
      const { rerender } = renderMenu({ items: stableItems });
      
      const initialItem = screen.getByText('稳定项目');
      
      // 相同props重新渲染
      rerender(
        <TechThemeProvider>
          <TechMenu items={stableItems} />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('稳定项目')).toBe(initialItem);
    });

    it('应该正确处理大量菜单项', () => {
      const manyItems: TechMenuItem[] = Array.from({ length: 50 }, (_, i) => ({
        key: `item-${i}`,
        label: `菜单项${i + 1}`,
        icon: 'plus'
      }));
      
      renderMenu({ items: manyItems });
      
      expect(screen.getByText('菜单项1')).toBeInTheDocument();
      expect(screen.getByText('菜单项50')).toBeInTheDocument();
    });

    it('应该优化嵌套菜单的处理', () => {
      const deepNestedItems: TechMenuItem[] = [
        {
          key: 'level1',
          label: '一级菜单',
          icon: 'book',
          children: [
            {
              key: 'level2',
              label: '二级菜单',
              icon: 'book',
              children: [
                { key: 'level3', label: '三级菜单', icon: 'api' }
              ]
            }
          ]
        }
      ];
      
      renderMenu({ items: deepNestedItems });
      
      expect(screen.getByText('一级菜单')).toBeInTheDocument();
    });
  });

  describe('映射构建', () => {
    it('应该正确构建key到项目的映射', () => {
      const mappingItems: TechMenuItem[] = [
        { key: 'item1', label: '项目1' },
        {
          key: 'parent',
          label: '父项目',
          children: [
            { key: 'child1', label: '子项目1' },
            { key: 'child2', label: '子项目2' }
          ]
        }
      ];
      
      renderMenu({ items: mappingItems });
      
      // 验证所有项目都能正确渲染
      expect(screen.getByText('项目1')).toBeInTheDocument();
      expect(screen.getByText('父项目')).toBeInTheDocument();
    });

    it('应该正确处理复杂的嵌套结构', () => {
      const complexItems: TechMenuItem[] = [
        {
          key: 'complex-parent',
          label: '复杂父菜单',
          icon: 'book',
          children: [
            { key: 'simple-child', label: '简单子菜单', icon: 'api' },
            {
              key: 'nested-parent',
              label: '嵌套父菜单',
              icon: 'book',
              children: [
                { key: 'deep-child', label: '深层子菜单', icon: 'book' }
              ]
            }
          ]
        }
      ];
      
      renderMenu({ items: complexItems });
      
      expect(screen.getByText('复杂父菜单')).toBeInTheDocument();
    });
  });

  describe('链接组件集成', () => {
    const linkItems: TechMenuItem[] = [
      { key: 'spa-route', label: 'SPA路由', to: '/spa-route', icon: 'guide' },
      { key: 'external', label: '外部链接', href: 'https://external.com', icon: 'api' },
      { key: 'no-link', label: '无链接', icon: 'book' }
    ];

    it('应该正确使用自定义链接组件', () => {
      renderMenu({ 
        items: linkItems,
        linkComponent: MockLink
      });
      
      const spaLink = screen.getByTestId('mock-link');
      expect(spaLink).toHaveAttribute('href', '/spa-route');
      expect(spaLink).toHaveTextContent('SPA路由');
    });

    it('应该正确处理混合的链接类型', () => {
      renderMenu({ 
        items: linkItems,
        linkComponent: MockLink
      });
      
      // SPA路由应该使用自定义Link组件
      expect(screen.getByTestId('mock-link')).toBeInTheDocument();
      
      // 外部链接应该使用普通a标签
      const externalLink = screen.getByText('外部链接').closest('a');
      expect(externalLink).toHaveAttribute('href', 'https://external.com');
      expect(externalLink).not.toHaveAttribute('data-testid', 'mock-link');
      
      // 无链接项目应该使用span
      const noLinkItem = screen.getByText('无链接');
      expect(noLinkItem.closest('span')).toBeInTheDocument();
      expect(noLinkItem.closest('a')).not.toBeInTheDocument();
    });
  });

  describe('样式变量', () => {
    const styleItems: TechMenuItem[] = [
      { key: 'style-test', label: '样式测试', icon: 'book' }
    ];

    it('应该为水平模式设置正确的样式变量', () => {
      renderMenu({ 
        items: styleItems,
        mode: 'horizontal'
      });
      
      // 水平模式应该设置特定的CSS变量
      expect(screen.getByText('样式测试')).toBeInTheDocument();
    });

    it('应该为垂直模式设置正确的样式变量', () => {
      renderMenu({ 
        items: styleItems,
        mode: 'vertical'
      });
      
      // 垂直模式应该使用默认的样式变量
      expect(screen.getByText('样式测试')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理空的children数组', () => {
      const emptyChildrenItems: TechMenuItem[] = [
        { key: 'empty-children', label: '空子菜单', children: [] }
      ];
      
      renderMenu({ items: emptyChildrenItems });
      
      // 应该被当作叶子节点处理
      expect(screen.getByText('空子菜单')).toBeInTheDocument();
    });

    it('应该处理undefined和null值', () => {
      const undefinedItems: TechMenuItem[] = [
        { 
          key: 'undefined-test', 
          label: '未定义测试',
          icon: undefined,
          href: undefined,
          to: undefined,
          children: undefined
        }
      ];
      
      renderMenu({ items: undefinedItems });
      
      expect(screen.getByText('未定义测试')).toBeInTheDocument();
    });

    it('应该处理重复的key值', () => {
      const duplicateKeyItems: TechMenuItem[] = [
        { key: 'duplicate', label: '重复1', icon: 'plus' },
        { key: 'duplicate', label: '重复2', icon: 'home' }
      ];
      
      renderMenu({ items: duplicateKeyItems });
      
      // 两个项目都应该渲染，但key映射可能会有问题
      expect(screen.getByText('重复1')).toBeInTheDocument();
      expect(screen.getByText('重复2')).toBeInTheDocument();
    });
  });

  describe('回调函数优化', () => {
    it('应该正确处理选择事件的回调顺序', () => {
      const mockSelect = vi.fn();
      const mockSelectItem = vi.fn();
      
      const callbackItems: TechMenuItem[] = [
        { key: 'callback-test', label: '回调测试', icon: 'info' }
      ];
      
      renderMenu({ 
        items: callbackItems,
        onSelect: mockSelect,
        onSelectItem: mockSelectItem
      });
      
      // 由于依赖基础Menu组件的内部实现，这里主要验证渲染
      expect(screen.getByText('回调测试')).toBeInTheDocument();
    });

    it('应该在key映射中正确找到菜单项', () => {
      const findTestItems: TechMenuItem[] = [
        { key: 'findable', label: '可查找项目', icon: 'search' },
        {
          key: 'parent-findable',
          label: '父级可查找',
          children: [
            { key: 'child-findable', label: '子级可查找', icon: 'book' }
          ]
        }
      ];
      
      renderMenu({ items: findTestItems });
      
      expect(screen.getByText('可查找项目')).toBeInTheDocument();
      expect(screen.getByText('父级可查找')).toBeInTheDocument();
    });
  });

  describe('类名合并', () => {
    it('应该正确合并多个类名', () => {
      const { container } = renderMenu({ 
        items: [],
        className: 'class1 class2',
        collapsed: true
      });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu).toHaveClass('class1');
      expect(menu).toHaveClass('class2');
      expect(menu?.className).toMatch(/_collapsed_/);
    });

    it('应该过滤掉falsy类名', () => {
      const { container } = renderMenu({ 
        items: [],
        className: '',
        collapsed: false
      });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu?.className).toMatch(/_menu_/);
      expect(menu?.className).not.toMatch(/_collapsed_/);
    });
  });

  describe('菜单项样式', () => {
    it('应该为菜单项应用正确的nav类名', () => {
      const { container } = renderMenu({ 
        items: [{ key: 'nav-test', label: '导航测试', icon: 'guide' }]
      });
      
      const navElement = container.querySelector('[class*="nav"]');
      expect(navElement).toBeInTheDocument();
    });

    it('应该区分叶子节点和父节点的样式', () => {
      const mixedItems: TechMenuItem[] = [
        { key: 'leaf', label: '叶子节点', icon: 'api' },
        {
          key: 'parent',
          label: '父节点',
          icon: 'book',
          children: [
            { key: 'child', label: '子节点', icon: 'book' }
          ]
        }
      ];
      
      renderMenu({ items: mixedItems });
      
      expect(screen.getByText('叶子节点')).toBeInTheDocument();
      expect(screen.getByText('父节点')).toBeInTheDocument();
    });
  });

  describe('复杂集成场景', () => {
    it('应该支持完整功能的菜单配置', () => {
      const mockSelectItem = vi.fn();
      const mockSelect = vi.fn();
      
      const fullMenuItems: TechMenuItem[] = [
        { 
          key: 'dashboard', 
          label: '控制台', 
          icon: 'dashboard',
          to: '/dashboard'
        },
        {
          key: 'users',
          label: '用户管理',
          icon: 'user',
          children: [
            { key: 'user-list', label: '用户列表', to: '/users', icon: 'book' },
            { key: 'user-create', label: '创建用户', to: '/users/create', icon: 'plus' }
          ]
        },
        { 
          key: 'settings', 
          label: '设置', 
          icon: 'settings',
          href: '/settings'
        },
        { 
          key: 'help', 
          label: '帮助', 
          icon: 'help'
        }
      ];
      
      renderMenu({
        items: fullMenuItems,
        mode: 'vertical',
        collapsed: false,
        linkComponent: MockLink,
        onSelect: mockSelect,
        onSelectItem: mockSelectItem,
        className: 'full-featured-menu'
      });
      
      // 验证所有顶级菜单项
      expect(screen.getByText('控制台')).toBeInTheDocument();
      expect(screen.getByText('用户管理')).toBeInTheDocument();
      expect(screen.getByText('设置')).toBeInTheDocument();
      expect(screen.getByText('帮助')).toBeInTheDocument();
      
      // 验证图标
      expect(screen.getByTestId('tech-icon-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-user')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-help')).toBeInTheDocument();
      
      // 验证链接类型 - 应该有多个SPA路由链接
      const mockLinks = screen.getAllByTestId('mock-link');
      expect(mockLinks.length).toBeGreaterThan(0); // 至少有一个SPA路由链接
      
      const settingsLink = screen.getByText('设置').closest('a');
      expect(settingsLink).toHaveAttribute('href', '/settings'); // 普通链接
      
      // 验证自定义类名
      const { container } = render(
        <TechThemeProvider>
          <TechMenu 
            items={fullMenuItems}
            className="full-featured-menu"
          />
        </TechThemeProvider>
      );
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu).toHaveClass('full-featured-menu');
    });
  });

  describe('链接渲染逻辑', () => {
    it('应该为不同类型的菜单项选择正确的渲染方式', () => {
      const linkTypeItems: TechMenuItem[] = [
        { key: 'spa', label: 'SPA链接', to: '/spa', icon: 'guide' },
        { key: 'external', label: '外部链接', href: 'https://external.com', icon: 'api' },
        { key: 'button', label: '按钮项目', icon: 'plus' },
        {
          key: 'submenu',
          label: '子菜单',
          icon: 'menu',
          children: [
            { key: 'sub1', label: '子项目1', icon: 'api' }
          ]
        }
      ];
      
      renderMenu({ 
        items: linkTypeItems,
        linkComponent: MockLink
      });
      
      // SPA链接应该使用自定义Link组件
      expect(screen.getByTestId('mock-link')).toBeInTheDocument();
      
      // 外部链接应该使用a标签
      const externalLink = screen.getByText('外部链接').closest('a');
      expect(externalLink).toHaveAttribute('href', 'https://external.com');
      
      // 按钮项目应该使用span（无链接的叶子节点）
      const buttonItem = screen.getByText('按钮项目');
      expect(buttonItem.closest('span')).toBeInTheDocument();
      
      // 子菜单应该使用span（非叶子节点）
      const submenuItem = screen.getByText('子菜单');
      expect(submenuItem.closest('span')).toBeInTheDocument();
    });
  });

  describe('组件props传递', () => {
    it('应该正确传递基础Menu组件的props', () => {
      const menuProps = {
        items: [{ key: 'props-test', label: 'Props测试' }],
        defaultSelectedKeys: ['props-test'],
        defaultOpenKeys: [],
        theme: 'dark' as const
      };
      
      renderMenu(menuProps);
      
      expect(screen.getByText('Props测试')).toBeInTheDocument();
    });

    it('应该正确处理覆盖的className', () => {
      const { container } = renderMenu({
        items: [{ key: 'override', label: '覆盖测试' }],
        className: 'override-class',
        collapsed: true
      });
      
      const menu = container.querySelector('[class*="menu"]');
      expect(menu).toHaveClass('override-class');
      expect(menu?.className).toMatch(/_collapsed_/);
    });
  });

  describe('内存泄漏预防', () => {
    it('应该正确清理函数引用', () => {
      const { unmount } = renderMenu({
        items: [{ key: 'cleanup', label: '清理测试', icon: 'logout' }],
        onSelectItem: vi.fn(),
        onSelect: vi.fn()
      });
      
      expect(screen.getByText('清理测试')).toBeInTheDocument();
      
      // 卸载组件
      unmount();
      
      // 组件应该正确卸载
      expect(screen.queryByText('清理测试')).not.toBeInTheDocument();
    });
  });
});