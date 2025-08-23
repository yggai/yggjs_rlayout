// YGG Admin 示例项目 - 科技风布局演示组件
// 本组件是整个示例应用的主布局容器，演示了完整的科技风界面和 SPA 导航功能
import React from 'react';
// React Router 相关：用于实现单页应用导航
import { useLocation, Link, Outlet } from 'react-router-dom';
// YGG Admin 组件库核心组件导入
import {
  TechLayout,        // 主布局组件，提供完整的页面结构
  TechFooter,        // 页脚组件，展示版权和链接信息
  TechPageHeader,    // 页面头部组件，提供标题和操作按钮
  TechButton,        // 科技风按钮组件
  TechUserCenter,    // 用户中心组件，提供用户菜单功能
  createBreadcrumb,  // 面包屑导航构建器
  type TechMenuItem,      // 菜单项类型定义
  type TechUserCenterItem, // 用户中心菜单项类型定义
} from 'yggjs_rlayout/tech';

/**
 * Link 适配器组件
 * 
 * 功能说明：
 * - 将 react-router-dom 的 Link 组件适配为 YGG Admin 所需的接口
 * - 实现 SPA 导航功能，确保页面切换无刷新
 * - 保持与 TechLayout 组件的兼容性
 * 
 * @param to - 目标路由路径
 * @param className - CSS 类名
 * @param children - 子元素内容
 * 
 * @example
 * // 在 TechLayout 中使用
 * <TechLayout linkComponent={LinkAdapter} />
 */
const LinkAdapter: React.FC<{ to: string; className?: string; children?: React.ReactNode }> = ({
  to,
  className,
  children,
}) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

/**
 * TechLayoutDemo 组件 - 科技风布局演示
 * 
 * 功能说明：
 * - 作为整个示例应用的主布局容器
 * - 演示 TechLayout 组件的完整功能和配置选项
 * - 实现完整的 SPA 导航体系
 * - 展示科技风主题的视觉效果
 * 
 * 主要演示特性：
 * - 头部导航菜单配置和 SPA 导航
 * - 侧边栏菜单配置和路由匹配
 * - 用户中心组件的集成使用
 * - 搜索功能的实现
 * - 面包屑导航的动态生成
 * - 页脚组件的配置和使用
 * 
 * 技术要点：
 * - 使用 useLocation 获取当前路由信息
 * - 根据路由动态计算选中的菜单项
 * - 通过 linkComponent 属性实现 SPA 导航
 * - 使用 Outlet 渲染子路由内容
 * 
 * @returns {JSX.Element} 科技风布局演示的 JSX 元素
 * 
 * @example
 * // 在路由中使用作为布局容器
 * <Route path="/" element={<TechLayoutDemo />}>
 *   <Route index element={<Dashboard />} />
 *   <Route path="docs" element={<Docs />} />
 * </Route>
 */
export default function TechLayoutDemo() {
  // 获取当前路由位置信息，用于动态计算菜单选中状态
  const location = useLocation();

  /**
   * 头部菜单配置
   * 
   * 配置说明：
   * - 使用 `to` 属性而不是 `href`，实现 SPA 导航
   * - 每个菜单项包含 key、label、icon 和 to 属性
   * - key 用于标识菜单项，label 显示文本，icon 显示图标
   */
  const headerMenuItems: TechMenuItem[] = [
    { key: 'dash', label: 'Dashboard', icon: 'dashboard', to: '/' },
    { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
    { key: 'about', label: 'About', icon: 'info', to: '/about' },
  ];

  /**
   * 用户中心菜单配置
   * 
   * 配置说明：
   * - 提供用户相关的功能入口（资料、设置、帮助等）
   * - 使用 onClick 回调函数处理点击事件
   * - danger 属性标记危险操作（如退出登录）
   * - 演示了用户交互的实现方式
   */
  const userCenterItems: TechUserCenterItem[] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: 'profile',
      onClick: () => alert('跳转到个人资料页面'), // 示例操作：实际应用中可以使用路由跳转
    },
    {
      key: 'settings',
      label: '账户设置',
      icon: 'settings',
      onClick: () => alert('跳转到账户设置页面'),
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: 'help',
      onClick: () => alert('跳转到帮助中心'),
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: 'logout',
      danger: true, // 标记为危险操作，显示为红色
      onClick: () => {
        // 退出登录确认逻辑
        if (confirm('确定要退出登录吗？')) {
          alert('已退出登录'); // 示例操作：实际应用中可以清除用户信息并跳转登录页
        }
      },
    },
  ];

  /**
   * 侧边栏菜单配置
   * 
   * 配置说明：
   * - 与头部菜单类似，但提供更详细的导航选项
   * - 包含更多的子页面导航（如 API 文档）
   * - 同样使用 SPA 导航方式
   */
  const sidebarItems: TechMenuItem[] = [
    { key: 'home', label: 'Home', icon: 'home', to: '/' },
    { key: 'guide', label: 'Guide', icon: 'guide', to: '/docs' },
    { key: 'api', label: 'API', icon: 'api', to: '/docs/api' },
    { key: 'about', label: 'About', icon: 'info', to: '/about' },
  ];

  /**
   * 动态计算选中的菜单项
   * 
   * 实现原理：
   * - 根据当前 URL 路径匹配对应的菜单项
   * - 使用三元运算符进行条件判断
   * - 首先匹配更具体的路径，然后匹配一般路径
   * - 确保菜单项能正确高亮显示当前页面
   */
  const selectedHeaderKey = location.pathname.startsWith('/docs')
    ? 'docs'
    : location.pathname.startsWith('/about')
      ? 'about'
      : 'dash'; // 默认选中 Dashboard

  // 侧边栏选中逻辑：需要更精确地区分 API 文档和一般文档
  const selectedSidebarKey = location.pathname.startsWith('/docs/api')
    ? 'api'      // API 文档页面
    : location.pathname.startsWith('/docs')
      ? 'guide'  // 一般文档页面
      : location.pathname.startsWith('/about')
        ? 'about' // 关于页面
        : 'home'; // 默认主页

  /**
   * 搜索功能处理函数
   * 
   * 功能说明：
   * - 处理用户在头部搜索框中输入的内容
   * - 在实际应用中可以集成搜索 API 或本地搜索逻辑
   * - 当前为演示版本，使用 alert 显示搜索结果
   */
  const handleSearch = (value: string) => {
    console.log('Search:', value);
    if (value.trim()) {
      alert(`正在搜索: "${value}"`);
    }
  };

  /**
   * 头部菜单选中处理函数
   * 
   * 功能说明：
   * - 处理头部菜单项的点击事件
   * - 由于使用了 SPA 导航，实际路由跳转由 React Router 处理
   * - 此函数主要用于日志记录和额外的业务逻辑
   */
  const handleMenuSelect = (key: string) => {
    console.log('Header menu selected:', key);
  };

  /**
   * 侧边栏菜单选中处理函数
   * 
   * 功能说明：
   * - 处理侧边栏菜单项的点击事件
   * - 同样由 React Router 处理实际的路由跳转
   * - 可用于统计用户行为或触发其他副作用
   */
  const handleSidebarSelect = (key: string) => {
    console.log('Sidebar menu selected:', key);
  };

  /**
   * 页脚区域链接配置
   * 
   * 配置说明：
   * - 按照功能分类组织链接（产品、公司、支持）
   * - 支持图标展示，增强视觉识别度
   * - 示例中使用 # 链接，实际应用中可替换为真实 URL
   */
  const footerSections = [
    {
      title: 'Product', // 产品相关链接
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Documentation', href: '#docs', icon: 'book' as const },
        { label: 'API Reference', href: '#api', icon: 'api' as const },
      ],
    },
    {
      title: 'Company', // 公司相关链接
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Careers', href: '#careers' },
        { label: 'Blog', href: '#blog' },
      ],
    },
    {
      title: 'Support', // 支持相关链接
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Community', href: '#community' },
        { label: 'Status', href: '#status' },
        { label: 'Feedback', href: '#feedback' },
      ],
    },
  ];

  /**
   * 社交媒体链接配置
   * 
   * 配置说明：
   * - 常见的开发者社交媒体平台
   * - 每个链接都包含标签、链接和图标
   * - 图标使用组件库内置的图标系统
   */
  const socialLinks = [
    { label: 'GitHub', href: '#github', icon: 'api' as const },
    { label: 'Twitter', href: '#twitter', icon: 'info' as const },
    { label: 'Discord', href: '#discord', icon: 'guide' as const },
  ];

  /**
   * 面包屑导航创建
   * 
   * 实现说明：
   * - 使用 createBreadcrumb() 构建器模式创建面包屑
   * - add() 方法可以链式调用，添加多级导航
   * - 第一个参数是显示文本，第二个参数是链接（可选）
   * - 最后调用 build() 方法生成最终的面包屑数据
   */
  const breadcrumbItems = createBreadcrumb()
    .add('Dashboard', '/') // 可点击的面包屑项
    .add('SPA 导航演示')     // 当前页面，不可点击
    .build();

  return (
    <>
      {/* 
        TechLayout 主布局组件
        这是整个应用的核心布局容器，包含了所有主要的界面元素和功能
      */}
      {/* ==========  头部区域配置  ========== */}
      <TechLayout
        brand="YGG Admin" // 品牌名称，显示在左上角
        headerMenuItems={headerMenuItems} // 头部菜单项列表
        selectedHeaderKey={selectedHeaderKey} // 当前选中的头部菜单项
        onHeaderMenuSelect={handleMenuSelect} // 头部菜单点击事件处理
        onSearch={handleSearch} // 搜索功能处理
        headerExtra={
          // 头部右侧额外内容：用户中心组件
          <TechUserCenter
            username="张三" // 用户名
            userInfo="zhangsan@example.com" // 用户邮箱信息
            items={userCenterItems} // 用户中心菜单项
            showUsername={false} // 是否显示用户名文本
            onAvatarClick={() => console.log('Avatar clicked')} // 头像点击事件
          />
        }
        version="v0.1.0" // 版本号，显示在底部
        
        // 侧边栏区域配置
        sidebarItems={sidebarItems} // 侧边栏菜单项列表
        selectedSidebarKey={selectedSidebarKey} // 当前选中的侧边栏菜单项
        onSidebarSelect={handleSidebarSelect} // 侧边栏菜单点击事件处理
        
        // SPA 导航配置 - 这是实现 SPA 导航的关键配置！
        headerMenuLinkComponent={LinkAdapter} // 头部菜单使用的链接组件
        sidebarLinkComponent={LinkAdapter} // 侧边栏菜单使用的链接组件

      >
        {/* 
          TechPageHeader 页面头部组件
          功能说明：
          - 提供页面标题、面包屑导航和操作按钮
          - 可选使用，适合需要明确页面结构的场景
          - 与 TechLayout 组件配合使用，形成完整的页面布局
        */}
        <TechPageHeader
          breadcrumb={breadcrumbItems} // 面包屑导航数据
          title="YGG Admin - SPA 导航演示" // 页面标题
          actions={
            // 页面操作按钮组
            <>
              <TechButton variant="secondary">New</TechButton> {/* 次要操作按钮 */}
              <TechButton variant="primary" icon="deploy">Deploy</TechButton> {/* 主要操作按钮，带图标 */}
            </>
          }
        />

        {/* 
          React Router Outlet 组件
          功能说明：
          - 渲染当前路由匹配的子组件内容
          - 在这里会渲染 Dashboard、Docs、About 等页面组件
          - 实现嵌套路由的关键组件
        */}
        <Outlet />

        {/* 
          TechFooter 页脚组件
          功能说明：
          - 提供完整的页脚信息展示
          - 包含品牌介绍、链接分类、社交媒体和版权信息
          - 可独立使用，也可与 TechLayout 组合使用
          - 支持响应式布局，适配不同屏幕尺寸
        */}
        <TechFooter
          brand="YGG Admin" // 品牌名称
          version="v0.1.0" // 版本号
          description="YGG Admin 是一个现代化的科技风管理后台框架，提供完整的布局解决方案和组件库。" // 项目描述
          sections={footerSections} // 链接分类数据
          socialLinks={socialLinks} // 社交媒体链接
          copyright="© 2024 YGG Admin. All rights reserved." // 版权信息
        />
      </TechLayout>
    </>
  );
}
