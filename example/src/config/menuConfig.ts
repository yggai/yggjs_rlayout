import type { TechMenuItem, TechUserCenterItem } from 'yggjs_rlayout/tech';

// 头部菜单配置
export const headerMenuItems: TechMenuItem[] = [
  { key: 'dash', label: 'Dashboard', icon: 'dashboard', to: '/' },
  { key: 'docs', label: 'Docs', icon: 'book', to: '/docs' },
  { key: 'about', label: 'About', icon: 'info', to: '/about' },
];

// 侧边栏菜单配置  
export const sidebarItems: TechMenuItem[] = [
  { key: 'home', label: 'Home', icon: 'home', to: '/' },
  { key: 'guide', label: 'Guide', icon: 'guide', to: '/docs' },
  { key: 'api', label: 'API', icon: 'api', to: '/docs/api' },
  { key: 'about', label: 'About', icon: 'info', to: '/about' },
];

// 用户中心菜单配置
export const userCenterItems: TechUserCenterItem[] = [
  {
    key: 'profile',
    label: '个人资料',
    icon: 'profile',
    onClick: () => alert('跳转到个人资料页面'),
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
    danger: true,
    onClick: () => {
      if (confirm('确定要退出登录吗？')) {
        alert('已退出登录');
      }
    },
  },
];

// 页脚链接配置
export const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs', icon: 'book' as const },
      { label: 'API Reference', href: '#api', icon: 'api' as const },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Status', href: '#status' },
      { label: 'Feedback', href: '#feedback' },
    ],
  },
];

// 社交媒体链接配置
export const socialLinks = [
  { label: 'GitHub', href: '#github', icon: 'api' as const },
  { label: 'Twitter', href: '#twitter', icon: 'info' as const },
  { label: 'Discord', href: '#discord', icon: 'guide' as const },
];