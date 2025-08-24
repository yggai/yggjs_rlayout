# TechFooter 页脚组件

## 简介

`TechFooter` 是科技风格的页面页脚组件，提供完整的页脚功能，包含品牌信息、链接分组、社交链接、版权信息和返回顶部等功能。适用于各种类型的网站和应用。

## 基础使用

### 最简单的页脚

```tsx
import { TechFooter } from 'yggjs_rlayout/tech';

<TechFooter
  brand="我的网站"
  copyright="© 2024 我的网站. 保留所有权利."
/>
```

### 带链接分组的页脚

```tsx
const footerSections = [
  {
    title: '产品',
    links: [
      { label: '功能特性', href: '/features' },
      { label: '价格方案', href: '/pricing' },
      { label: '更新日志', href: '/changelog' },
    ]
  },
  {
    title: '支持',
    links: [
      { label: '帮助文档', href: '/docs' },
      { label: '联系我们', href: '/contact' },
      { label: '社区论坛', href: '/community' },
    ]
  }
];

<TechFooter
  brand="科技公司"
  description="构建未来的科技解决方案"
  sections={footerSections}
  copyright="© 2024 科技公司. 版权所有."
/>
```

## 完整示例

```tsx
import { TechFooter, TechCard } from 'yggjs_rlayout/tech';
import { useState } from 'react';

function FooterDemo() {
  // 完整的页脚配置
  const footerSections = [
    {
      title: '产品',
      links: [
        { label: '科技风组件库', href: '/components', icon: 'package' },
        { label: '设计系统', href: '/design', icon: 'palette' },
        { label: '模板库', href: '/templates', icon: 'template' },
        { label: '定制服务', href: '/custom', icon: 'tool' },
      ]
    },
    {
      title: '开发者',
      links: [
        { label: 'API 文档', href: '/api', icon: 'code' },
        { label: '快速开始', href: '/getting-started', icon: 'rocket' },
        { label: 'GitHub', href: 'https://github.com', icon: 'github' },
        { label: '更新日志', href: '/changelog', icon: 'history' },
      ]
    },
    {
      title: '支持',
      links: [
        { label: '帮助中心', href: '/help', icon: 'help' },
        { label: '社区论坛', href: '/community', icon: 'message' },
        { label: '联系我们', href: '/contact', icon: 'mail' },
        { label: '问题反馈', href: '/feedback', icon: 'bug' },
      ]
    },
    {
      title: '公司',
      links: [
        { label: '关于我们', href: '/about', icon: 'info' },
        { label: '团队介绍', href: '/team', icon: 'users' },
        { label: '招聘信息', href: '/careers', icon: 'briefcase' },
        { label: '新闻动态', href: '/news', icon: 'newspaper' },
      ]
    }
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Discord', href: 'https://discord.com', icon: 'discord' },
    { label: '微信', href: 'javascript:void(0)', icon: 'wechat' },
    { label: '微博', href: 'https://weibo.com', icon: 'weibo' },
  ];

  return (
    <div>
      {/* 页面内容示例 */}
      <div style={{ minHeight: '60vh', padding: '40px 0' }}>
        <TechCard title="页脚组件演示">
          <p style={{ color: '#7c89bf', marginBottom: '20px' }}>
            滚动到页面底部查看页脚效果，或者查看下方的不同配置示例。
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>功能特点</h4>
              <ul style={{ color: '#7c89bf', fontSize: '14px', lineHeight: '1.6' }}>
                <li>响应式设计</li>
                <li>链接分组管理</li>
                <li>社交媒体链接</li>
                <li>返回顶部功能</li>
                <li>版权信息显示</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#27e0ff', marginBottom: '8px' }}>使用场景</h4>
              <ul style={{ color: '#7c89bf', fontSize: '14px', lineHeight: '1.6' }}>
                <li>企业官网</li>
                <li>产品展示页</li>
                <li>管理后台</li>
                <li>文档站点</li>
                <li>博客网站</li>
              </ul>
            </div>
          </div>
        </TechCard>
      </div>

      {/* 完整页脚 */}
      <TechFooter
        brand={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, var(--tech-primary), var(--tech-accent))',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              T
            </div>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>
              科技风组件库
            </span>
          </div>
        }
        description="专业的科技风格 React 组件库，助力构建未来感的用户界面。提供完整的设计系统和开发工具，让创新更简单。"
        sections={footerSections}
        socialLinks={socialLinks}
        version="v0.1.2"
        copyright="© 2024 科技风组件库. 保留所有权利."
        showBackToTop={true}
      />
    </div>
  );
}
```

## 属性详解

### 品牌属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `brand` | `ReactNode` | - | 品牌信息，通常是logo和公司名 |
| `description` | `string` | - | 品牌描述文字 |

### 内容属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sections` | `TechFooterSection[]` | `[]` | 链接分组数据 |
| `socialLinks` | `TechFooterLink[]` | `[]` | 社交媒体链接 |

### 信息属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `copyright` | `string` | - | 版权信息 |
| `version` | `string` | - | 版本号 |

### 功能属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showBackToTop` | `boolean` | `true` | 是否显示返回顶部按钮 |

### 样式属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 数据结构定义

### 链接分组 (TechFooterSection)

```tsx
interface TechFooterSection {
  title: string;                    // 分组标题
  links: TechFooterLink[];          // 链接列表
}
```

### 链接项 (TechFooterLink)

```tsx
interface TechFooterLink {
  label: string;                    // 链接文本
  href?: string;                    // 链接地址
  onClick?: () => void;             // 点击事件回调
  icon?: TechIconName;              // 可选图标
}
```

## 常见配置示例

### 1. 企业官网页脚

```tsx
function CorporateFooter() {
  const sections = [
    {
      title: '产品服务',
      links: [
        { label: '云计算服务', href: '/cloud' },
        { label: '人工智能', href: '/ai' },
        { label: '大数据分析', href: '/bigdata' },
        { label: '物联网平台', href: '/iot' },
      ]
    },
    {
      title: '解决方案',
      links: [
        { label: '企业数字化', href: '/enterprise' },
        { label: '智慧城市', href: '/smart-city' },
        { label: '金融科技', href: '/fintech' },
        { label: '教育科技', href: '/edtech' },
      ]
    },
    {
      title: '支持与服务',
      links: [
        { label: '技术支持', href: '/support' },
        { label: '培训服务', href: '/training' },
        { label: '咨询服务', href: '/consulting' },
        { label: '合作伙伴', href: '/partners' },
      ]
    },
    {
      title: '关于我们',
      links: [
        { label: '公司简介', href: '/about' },
        { label: '发展历程', href: '/history' },
        { label: '企业文化', href: '/culture' },
        { label: '投资者关系', href: '/investor' },
      ]
    }
  ];

  const socialLinks = [
    { label: '微信公众号', icon: 'wechat', onClick: () => showQRCode('wechat') },
    { label: '新浪微博', href: 'https://weibo.com/company', icon: 'weibo' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/...', icon: 'linkedin' },
  ];

  return (
    <TechFooter
      brand="科技创新公司"
      description="致力于用科技改变世界，为企业提供全方位的数字化转型解决方案。"
      sections={sections}
      socialLinks={socialLinks}
      copyright="© 2024 科技创新公司. 保留所有权利. | 京ICP备12345678号"
    />
  );
}
```

### 2. 开源项目页脚

```tsx
function OpenSourceFooter() {
  const sections = [
    {
      title: '文档',
      links: [
        { label: '快速开始', href: '/docs/getting-started', icon: 'rocket' },
        { label: '组件文档', href: '/docs/components', icon: 'package' },
        { label: 'API 参考', href: '/docs/api', icon: 'code' },
        { label: '示例代码', href: '/examples', icon: 'template' },
      ]
    },
    {
      title: '社区',
      links: [
        { label: 'GitHub', href: 'https://github.com/project', icon: 'github' },
        { label: '问题反馈', href: 'https://github.com/project/issues', icon: 'bug' },
        { label: '讨论区', href: 'https://github.com/project/discussions', icon: 'message' },
        { label: '贡献指南', href: '/contributing', icon: 'heart' },
      ]
    },
    {
      title: '资源',
      links: [
        { label: '更新日志', href: '/changelog', icon: 'history' },
        { label: '设计资源', href: '/design-resources', icon: 'palette' },
        { label: '博客文章', href: '/blog', icon: 'newspaper' },
        { label: 'Awesome List', href: '/awesome', icon: 'star' },
      ]
    }
  ];

  return (
    <TechFooter
      brand="开源组件库"
      description="免费开源的 React 组件库，MIT 许可证，欢迎贡献代码。"
      sections={sections}
      socialLinks={[
        { label: 'GitHub', href: 'https://github.com', icon: 'github' },
        { label: 'Discord', href: 'https://discord.gg', icon: 'discord' },
        { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      ]}
      version="v2.1.0"
      copyright="© 2024 开源组件库. MIT License."
    />
  );
}
```

### 3. 简洁版页脚

```tsx
function MinimalFooter() {
  return (
    <TechFooter
      brand="简洁应用"
      socialLinks={[
        { label: 'GitHub', href: 'https://github.com', icon: 'github' },
        { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
        { label: '邮箱', href: 'mailto:contact@example.com', icon: 'mail' },
      ]}
      copyright="© 2024 简洁应用. 保留所有权利."
      showBackToTop={false}
    />
  );
}
```

### 4. 电商网站页脚

```tsx
function EcommerceFooter() {
  const sections = [
    {
      title: '购物指南',
      links: [
        { label: '如何下单', href: '/help/order' },
        { label: '支付方式', href: '/help/payment' },
        { label: '配送说明', href: '/help/shipping' },
        { label: '退换货政策', href: '/help/return' },
      ]
    },
    {
      title: '客户服务',
      links: [
        { label: '联系客服', href: '/contact', icon: 'phone' },
        { label: '在线咨询', href: '/chat', icon: 'message' },
        { label: '常见问题', href: '/faq', icon: 'help' },
        { label: '投诉建议', href: '/feedback', icon: 'mail' },
      ]
    },
    {
      title: '关于商城',
      links: [
        { label: '关于我们', href: '/about' },
        { label: '联系方式', href: '/contact' },
        { label: '招聘信息', href: '/careers' },
        { label: '友情链接', href: '/links' },
      ]
    }
  ];

  return (
    <TechFooter
      brand="科技商城"
      description="专业的科技产品购物平台，提供最新最优质的科技产品。"
      sections={sections}
      socialLinks={[
        { label: '微信小程序', icon: 'wechat' },
        { label: '官方微博', href: 'https://weibo.com', icon: 'weibo' },
        { label: '手机App', href: '/download', icon: 'mobile' },
      ]}
      copyright="© 2024 科技商城. 保留所有权利. | 增值电信业务经营许可证：京B2-12345678"
    />
  );
}
```

## 响应式设计

### 移动端适配

```tsx
function ResponsiveFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 移动端显示简化版本
  const mobileSections = [
    {
      title: '快速链接',
      links: [
        { label: '关于我们', href: '/about' },
        { label: '联系我们', href: '/contact' },
        { label: '帮助中心', href: '/help' },
        { label: '隐私政策', href: '/privacy' },
      ]
    }
  ];

  return (
    <TechFooter
      brand="响应式网站"
      description={isMobile ? "专业服务平台" : "为您提供专业、可靠的服务解决方案"}
      sections={isMobile ? mobileSections : desktopSections}
      socialLinks={socialLinks}
      copyright="© 2024 响应式网站"
      showBackToTop={!isMobile} // 移动端可能不需要返回顶部
    />
  );
}
```

## 自定义样式

### 主题色定制

```css
.custom-footer {
  --footer-bg: linear-gradient(135deg, var(--tech-panel), var(--tech-panel-2));
  --footer-text: var(--tech-text);
  --footer-link: var(--tech-muted);
  --footer-link-hover: var(--tech-accent);
  --footer-border: var(--tech-border);
}

.custom-footer .tech-footer-section-title {
  color: var(--tech-accent);
  font-weight: 600;
  margin-bottom: 16px;
}

.custom-footer .tech-footer-link:hover {
  color: var(--footer-link-hover);
  transform: translateX(4px);
  transition: all 0.2s ease;
}
```

### 布局定制

```tsx
<TechFooter
  style={{
    background: 'linear-gradient(135deg, #0a0f1e 0%, #0e1630 100%)',
    borderTop: '1px solid var(--tech-accent)',
    padding: '60px 0 20px',
  }}
  className="custom-footer-layout"
/>
```

## 事件处理

### 链接点击追踪

```tsx
function AnalyticsFooter() {
  const handleLinkClick = (label, href) => {
    // 发送点击事件到分析服务
    analytics.track('Footer Link Click', {
      label: label,
      href: href,
      timestamp: new Date().toISOString()
    });
  };

  const sectionsWithAnalytics = sections.map(section => ({
    ...section,
    links: section.links.map(link => ({
      ...link,
      onClick: () => {
        handleLinkClick(link.label, link.href);
        if (link.href) {
          window.open(link.href, '_blank');
        }
      }
    }))
  }));

  return (
    <TechFooter
      sections={sectionsWithAnalytics}
      // ... 其他属性
    />
  );
}
```

### 社交链接分享

```tsx
function SocialFooter() {
  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const title = document.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const socialLinks = [
    { label: 'Twitter', icon: 'twitter', onClick: () => handleSocialShare('twitter') },
    { label: 'Facebook', icon: 'facebook', onClick: () => handleSocialShare('facebook') },
    { label: 'LinkedIn', icon: 'linkedin', onClick: () => handleSocialShare('linkedin') },
  ];

  return <TechFooter socialLinks={socialLinks} />;
}
```

## 常见问题

### 1. 页脚不显示在页面底部？

确保页面有足够的高度或使用粘性布局：

```css
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.tech-footer {
  margin-top: auto;
}
```

### 2. 返回顶部按钮不工作？

检查是否有其他元素遮挡或样式冲突：

```css
.tech-footer-back-to-top {
  z-index: 100;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

### 3. 链接点击没有反应？

确保链接配置正确：

```tsx
// ✅ 正确配置
{ label: '关于我们', href: '/about' }
{ label: '联系我们', onClick: () => navigate('/contact') }

// ❌ 错误配置 - 缺少 href 或 onClick
{ label: '关于我们' }
```

### 4. 移动端布局混乱？

使用响应式断点：

```css
@media (max-width: 768px) {
  .tech-footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .tech-footer-section {
    margin-bottom: 32px;
  }
}
```