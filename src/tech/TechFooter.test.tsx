import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TechFooter } from './TechFooter';
import { TechThemeProvider } from './TechThemeProvider';
import type { TechFooterSection, TechFooterLink } from './TechFooter';

const renderFooter = (props: Partial<React.ComponentProps<typeof TechFooter>> = {}) => {
  return render(
    <TechThemeProvider>
      <TechFooter {...props} />
    </TechThemeProvider>
  );
};

describe('TechFooter', () => {
  describe('基础渲染', () => {
    it('应该正确渲染基本页脚', () => {
      renderFooter();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('应该显示默认版权信息', () => {
      renderFooter();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
    });

    it('应该正确应用自定义类名和样式', () => {
      renderFooter({
        className: 'custom-footer',
        style: { backgroundColor: 'red' }
      });
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
  });

  describe('品牌区域', () => {
    it('应该正确渲染品牌名称', () => {
      renderFooter({ brand: '测试品牌' });
      expect(screen.getByText('测试品牌')).toBeInTheDocument();
    });

    it('应该正确渲染品牌描述', () => {
      renderFooter({ 
        brand: '品牌名',
        description: '这是品牌描述信息'
      });
      
      expect(screen.getByText('品牌名')).toBeInTheDocument();
      expect(screen.getByText('这是品牌描述信息')).toBeInTheDocument();
    });

    it('应该支持品牌区域的React节点', () => {
      renderFooter({
        brand: (
          <div data-testid="custom-brand">
            <img src="/logo.png" alt="Logo" />
            <span>自定义品牌</span>
          </div>
        )
      });
      
      expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
      expect(screen.getByText('自定义品牌')).toBeInTheDocument();
    });

    it('应该在没有品牌信息时隐藏品牌区域', () => {
      renderFooter();
      
      const footer = screen.getByRole('contentinfo');
      const brandName = footer.querySelector('[class*="brandName"]');
      const description = footer.querySelector('[class*="description"]');
      
      expect(brandName).not.toBeInTheDocument();
      expect(description).not.toBeInTheDocument();
    });
  });

  describe('链接区域', () => {
    const testSections: TechFooterSection[] = [
      {
        title: '产品',
        links: [
          { label: '功能介绍', href: '/features' },
          { label: '定价', href: '/pricing', icon: 'plus' },
          { label: '文档', onClick: vi.fn() }
        ]
      },
      {
        title: '支持',
        links: [
          { label: '帮助中心', href: '/help' },
          { label: '联系我们', href: '/contact', icon: 'info' }
        ]
      }
    ];

    it('应该正确渲染链接分组', () => {
      renderFooter({ sections: testSections });
      
      expect(screen.getByText('产品')).toBeInTheDocument();
      expect(screen.getByText('支持')).toBeInTheDocument();
      expect(screen.getByText('功能介绍')).toBeInTheDocument();
      expect(screen.getByText('定价')).toBeInTheDocument();
      expect(screen.getByText('文档')).toBeInTheDocument();
      expect(screen.getByText('帮助中心')).toBeInTheDocument();
      expect(screen.getByText('联系我们')).toBeInTheDocument();
    });

    it('应该正确处理链接的href属性', () => {
      renderFooter({ sections: testSections });
      
      const featuresLink = screen.getByText('功能介绍');
      expect(featuresLink).toHaveAttribute('href', '/features');
      
      const pricingLink = screen.getByText('定价');
      expect(pricingLink).toHaveAttribute('href', '/pricing');
    });

    it('应该正确处理链接的点击事件', () => {
      const mockClick = vi.fn();
      const sectionsWithClick: TechFooterSection[] = [
        {
          title: '测试区域',
          links: [
            { label: '点击测试', onClick: mockClick }
          ]
        }
      ];
      
      renderFooter({ sections: sectionsWithClick });
      
      const clickLink = screen.getByText('点击测试');
      fireEvent.click(clickLink);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该正确渲染链接图标', () => {
      renderFooter({ sections: testSections });
      
      expect(screen.getByTestId('tech-icon-plus')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-info')).toBeInTheDocument();
    });

    it('应该在没有链接分组时隐藏链接区域', () => {
      renderFooter({ sections: [] });
      
      const footer = screen.getByRole('contentinfo');
      const sectionsArea = footer.querySelector('[class*="sections"]');
      expect(sectionsArea).not.toBeInTheDocument();
    });
  });

  describe('社交链接', () => {
    const socialLinks: TechFooterLink[] = [
      { label: 'GitHub', href: 'https://github.com', icon: 'api' },
      { label: 'Twitter', href: 'https://twitter.com', icon: 'info' },
      { label: 'LinkedIn', onClick: vi.fn(), icon: 'help' }
    ];

    it('应该正确渲染社交链接', () => {
      renderFooter({ socialLinks });
      
      expect(screen.getByTestId('tech-icon-api')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-info')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-help')).toBeInTheDocument();
    });

    it('应该为社交链接设置正确的title属性', () => {
      renderFooter({ socialLinks });
      
      const githubLink = screen.getByTestId('tech-icon-api').closest('a');
      const twitterLink = screen.getByTestId('tech-icon-info').closest('a');
      
      expect(githubLink).toHaveAttribute('title', 'GitHub');
      expect(twitterLink).toHaveAttribute('title', 'Twitter');
    });

    it('应该正确处理社交链接的href和点击事件', () => {
      const mockClick = vi.fn();
      const linksWithClick: TechFooterLink[] = [
        { label: 'GitHub', href: 'https://github.com', icon: 'api' },
        { label: 'Custom', onClick: mockClick, icon: 'user' }
      ];
      
      renderFooter({ socialLinks: linksWithClick });
      
      const githubLink = screen.getByTestId('tech-icon-api').closest('a');
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
      
      const customLink = screen.getByTestId('tech-icon-user').closest('a');
      fireEvent.click(customLink!);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该在没有社交链接时隐藏社交区域', () => {
      renderFooter({ socialLinks: [] });
      
      const footer = screen.getByRole('contentinfo');
      const socialArea = footer.querySelector('[class*="social"]');
      expect(socialArea).not.toBeInTheDocument();
    });
  });

  describe('版权和版本信息', () => {
    it('应该显示自定义版权信息', () => {
      renderFooter({ copyright: '© 2024 自定义版权信息' });
      expect(screen.getByText('© 2024 自定义版权信息')).toBeInTheDocument();
    });

    it('应该显示版本信息', () => {
      renderFooter({ version: '1.2.3' });
      expect(screen.getByText('v1.2.3')).toBeInTheDocument();
    });

    it('应该同时显示版权和版本信息', () => {
      renderFooter({ 
        copyright: '© 2024 测试公司',
        version: '2.0.0'
      });
      
      expect(screen.getByText('© 2024 测试公司')).toBeInTheDocument();
      expect(screen.getByText('v2.0.0')).toBeInTheDocument();
    });
  });

  describe('回到顶部功能', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'scrollTo', {
        value: vi.fn(),
        writable: true
      });
    });

    it('应该默认显示回到顶部按钮', () => {
      renderFooter();
      expect(screen.getByText('Back to top')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-chevron-right')).toBeInTheDocument();
    });

    it('应该正确处理回到顶部点击事件', () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo');
      renderFooter();
      
      const backToTopButton = screen.getByText('Back to top');
      fireEvent.click(backToTopButton);
      
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('应该支持隐藏回到顶部按钮', () => {
      renderFooter({ showBackToTop: false });
      expect(screen.queryByText('Back to top')).not.toBeInTheDocument();
    });

    it('应该为回到顶部图标应用正确的旋转样式', () => {
      renderFooter();
      
      const icon = screen.getByTestId('tech-icon-chevron-right');
      expect(icon).toHaveStyle('transform: rotate(-90deg)');
    });
  });

  describe('布局结构', () => {
    it('应该正确构建页脚的整体结构', () => {
      renderFooter({
        brand: '测试品牌',
        description: '品牌描述',
        sections: [
          {
            title: '测试分组',
            links: [{ label: '测试链接', href: '/test' }]
          }
        ],
        socialLinks: [
          { label: 'GitHub', href: 'https://github.com', icon: 'api' }
        ],
        copyright: '© 2024 测试版权',
        version: '1.0.0'
      });
      
      // 验证容器
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      
      // 验证品牌区域
      expect(screen.getByText('测试品牌')).toBeInTheDocument();
      expect(screen.getByText('品牌描述')).toBeInTheDocument();
      
      // 验证链接分组
      expect(screen.getByText('测试分组')).toBeInTheDocument();
      expect(screen.getByText('测试链接')).toBeInTheDocument();
      
      // 验证底部区域
      expect(screen.getByText('© 2024 测试版权')).toBeInTheDocument();
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-api')).toBeInTheDocument();
      expect(screen.getByText('Back to top')).toBeInTheDocument();
    });

    it('应该使用正确的容器配置', () => {
      const { container } = renderFooter();
      
      // 验证Container组件的使用
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe('性能优化', () => {
    it('应该避免不必要的重新渲染', () => {
      const { rerender } = renderFooter({
        brand: '性能测试',
        version: '1.0.0'
      });
      
      const initialBrand = screen.getByText('性能测试');
      const initialVersion = screen.getByText('v1.0.0');
      
      rerender(
        <TechThemeProvider>
          <TechFooter brand="性能测试" version="1.0.0" />
        </TechThemeProvider>
      );
      
      expect(screen.getByText('性能测试')).toBe(initialBrand);
      expect(screen.getByText('v1.0.0')).toBe(initialVersion);
    });

    it('应该正确处理大量链接数据', () => {
      const largeSections: TechFooterSection[] = Array.from({ length: 10 }, (_, i) => ({
        title: `分组${i + 1}`,
        links: Array.from({ length: 5 }, (_, j) => ({
          label: `链接${i + 1}-${j + 1}`,
          href: `/link-${i}-${j}`
        }))
      }));
      
      renderFooter({ sections: largeSections });
      
      expect(screen.getByText('分组1')).toBeInTheDocument();
      expect(screen.getByText('分组10')).toBeInTheDocument();
      expect(screen.getByText('链接1-1')).toBeInTheDocument();
      expect(screen.getByText('链接10-5')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理空的链接分组', () => {
      renderFooter({
        sections: [
          { title: '空分组', links: [] }
        ]
      });
      
      expect(screen.getByText('空分组')).toBeInTheDocument();
    });

    it('应该处理没有图标的链接', () => {
      renderFooter({
        sections: [
          {
            title: '无图标链接',
            links: [
              { label: '普通链接', href: '/normal' }
            ]
          }
        ]
      });
      
      expect(screen.getByText('普通链接')).toBeInTheDocument();
      expect(screen.getByText('普通链接').querySelector('svg')).not.toBeInTheDocument();
    });

    it('应该处理undefined和null值', () => {
      renderFooter({
        brand: undefined,
        description: undefined,
        sections: undefined,
        socialLinks: undefined,
        copyright: undefined,
        version: undefined
      });
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
    });

    it('应该处理空字符串值', () => {
      renderFooter({
        brand: '',
        description: '',
        copyright: '',
        version: ''
      });
      
      // 空字符串应该不显示对应内容
      const footer = screen.getByRole('contentinfo');
      expect(footer.textContent).not.toContain('v');
    });
  });

  describe('交互功能', () => {
    it('应该正确处理混合的链接类型', () => {
      const mockClick1 = vi.fn();
      const mockClick2 = vi.fn();
      
      renderFooter({
        sections: [
          {
            title: '混合链接',
            links: [
              { label: 'href链接', href: '/href-link' },
              { label: '点击链接1', onClick: mockClick1 },
              { label: '点击链接2', onClick: mockClick2, icon: 'settings' }
            ]
          }
        ]
      });
      
      const hrefLink = screen.getByText('href链接');
      expect(hrefLink).toHaveAttribute('href', '/href-link');
      
      const clickLink1 = screen.getByText('点击链接1');
      fireEvent.click(clickLink1);
      expect(mockClick1).toHaveBeenCalledTimes(1);
      
      const clickLink2 = screen.getByText('点击链接2');
      fireEvent.click(clickLink2);
      expect(mockClick2).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('tech-icon-settings')).toBeInTheDocument();
    });

    it('应该正确处理社交链接的不同交互方式', () => {
      const mockSocialClick = vi.fn();
      
      renderFooter({
        socialLinks: [
          { label: 'GitHub', href: 'https://github.com', icon: 'api' },
          { label: 'Custom', onClick: mockSocialClick, icon: 'user' }
        ]
      });
      
      const githubLink = screen.getByTestId('tech-icon-api').closest('a');
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
      
      const customLink = screen.getByTestId('tech-icon-user').closest('a');
      fireEvent.click(customLink!);
      expect(mockSocialClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('可访问性', () => {
    it('应该具有正确的语义化标签', () => {
      renderFooter();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('应该为回到顶部按钮提供正确的可访问性', () => {
      renderFooter();
      
      const backToTopButton = screen.getByRole('button', { name: /back to top/i });
      expect(backToTopButton).toBeInTheDocument();
    });

    it('应该为社交链接提供正确的title属性', () => {
      renderFooter({
        socialLinks: [
          { label: 'GitHub', href: 'https://github.com', icon: 'api' },
          { label: 'Twitter', href: 'https://twitter.com', icon: 'info' }
        ]
      });
      
      const githubLink = screen.getByTestId('tech-icon-api').closest('a');
      const twitterLink = screen.getByTestId('tech-icon-info').closest('a');
      
      expect(githubLink).toHaveAttribute('title', 'GitHub');
      expect(twitterLink).toHaveAttribute('title', 'Twitter');
    });

    it('应该为链接提供正确的无障碍属性', () => {
      renderFooter({
        sections: [
          {
            title: '无障碍测试',
            links: [
              { label: '外部链接', href: 'https://example.com' },
              { label: '内部操作', onClick: vi.fn() }
            ]
          }
        ]
      });
      
      const externalLink = screen.getByText('外部链接');
      const internalLink = screen.getByText('内部操作');
      
      expect(externalLink.tagName).toBe('A');
      expect(internalLink.tagName).toBe('A');
    });
  });

  describe('样式自定义', () => {
    it('应该正确应用CSS模块类名', () => {
      renderFooter({
        brand: '样式测试',
        sections: [
          {
            title: '测试分组',
            links: [{ label: '测试链接', href: '/test' }]
          }
        ]
      });
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toMatch(/_footer_/);
      
      const main = footer.querySelector('[class*="main"]');
      expect(main).toBeInTheDocument();
      
      const grid = footer.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
      
      const brand = footer.querySelector('[class*="brand"]');
      expect(brand).toBeInTheDocument();
      
      const sections = footer.querySelector('[class*="sections"]');
      expect(sections).toBeInTheDocument();
      
      const bottom = footer.querySelector('[class*="bottom"]');
      expect(bottom).toBeInTheDocument();
    });

    it('应该正确应用各种CSS类名', () => {
      renderFooter({
        brand: '完整测试',
        sections: [
          {
            title: '测试',
            links: [{ label: '链接', href: '/test' }]
          }
        ],
        socialLinks: [
          { label: 'Test', href: 'https://test.com', icon: 'api' }
        ],
        version: '1.0.0'
      });
      
      const footer = screen.getByRole('contentinfo');
      
      expect(footer.querySelector('[class*="sectionTitle"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="links"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="link"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="social"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="socialLink"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="version"]')).toBeInTheDocument();
      expect(footer.querySelector('[class*="backToTop"]')).toBeInTheDocument();
    });
  });

  describe('组合场景测试', () => {
    it('应该支持完整配置的页脚', () => {
      const fullConfig = {
        brand: (
          <div data-testid="full-brand">
            <span>科技公司</span>
          </div>
        ),
        description: '提供创新的科技解决方案',
        sections: [
          {
            title: '产品',
            links: [
              { label: '核心功能', href: '/features', icon: 'plus' },
              { label: '高级功能', href: '/advanced' }
            ]
          },
          {
            title: '资源',
            links: [
              { label: '文档', href: '/docs', icon: 'book' },
              { label: 'API', href: '/api' },
              { label: '社区', onClick: vi.fn(), icon: 'user' }
            ]
          }
        ],
        socialLinks: [
          { label: 'GitHub', href: 'https://github.com', icon: 'api' },
          { label: 'Twitter', href: 'https://twitter.com', icon: 'info' }
        ],
        copyright: '© 2024 科技公司 保留所有权利',
        version: '3.1.4',
        showBackToTop: true,
        className: 'custom-footer-class',
        style: { borderTop: '1px solid #333' }
      };
      
      renderFooter(fullConfig);
      
      // 验证所有元素都正确渲染
      expect(screen.getByTestId('full-brand')).toBeInTheDocument();
      expect(screen.getByText('提供创新的科技解决方案')).toBeInTheDocument();
      expect(screen.getByText('产品')).toBeInTheDocument();
      expect(screen.getByText('资源')).toBeInTheDocument();
      expect(screen.getByText('核心功能')).toBeInTheDocument();
      expect(screen.getByText('社区')).toBeInTheDocument();
      expect(screen.getByTestId('tech-icon-api')).toBeInTheDocument();
      expect(screen.getByText('© 2024 科技公司 保留所有权利')).toBeInTheDocument();
      expect(screen.getByText('v3.1.4')).toBeInTheDocument();
      expect(screen.getByText('Back to top')).toBeInTheDocument();
      
      // 验证自定义样式
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('custom-footer-class');
      expect(footer).toHaveStyle('border-top: 1px solid #333');
    });

    it('应该在最小配置下正确工作', () => {
      renderFooter({});
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
      expect(screen.getByText('Back to top')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('应该正确处理部分配置的页脚', () => {
      renderFooter({
        brand: '部分配置',
        sections: [
          {
            title: '简单分组',
            links: [
              { label: '简单链接', href: '/simple' }
            ]
          }
        ],
        showBackToTop: false
      });
      
      expect(screen.getByText('部分配置')).toBeInTheDocument();
      expect(screen.getByText('简单分组')).toBeInTheDocument();
      expect(screen.getByText('简单链接')).toBeInTheDocument();
      expect(screen.queryByText('Back to top')).not.toBeInTheDocument();
      
      // 应该显示默认版权
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
    });
  });

  describe('事件处理', () => {
    it('应该正确阻止默认行为处理onClick事件', () => {
      const mockClick = vi.fn();
      
      renderFooter({
        sections: [
          {
            title: '事件测试',
            links: [
              { label: '点击事件', onClick: mockClick }
            ]
          }
        ]
      });
      
      const link = screen.getByText('点击事件');
      fireEvent.click(link);
      
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('应该支持键盘导航', () => {
      renderFooter({
        sections: [
          {
            title: '键盘测试',
            links: [
              { label: '可聚焦链接', href: '/keyboard' }
            ]
          }
        ]
      });
      
      const link = screen.getByText('可聚焦链接');
      link.focus();
      expect(document.activeElement).toBe(link);
    });
  });
});