/**
 * YGG React Layout 科技风主题组件库 - 入口文件
 * 
 * 这是专门为科技感、未来感界面设计的主题组件包。
 * 提供完整的科技风格界面解决方案，适合后台管理系统、监控面板、数据可视化等场景。
 * 
 * 设计特色：
 * - 深色系配色方案：深蓝色背景配合青色荧光效果
 * - 高科技视觉效果：发光边框、毛玻璃质感、渐变背景
 * - 流畅的交互动画：悬停效果、过渡动画、状态变化
 * - 完整的组件生态：从布局到功能组件的全覆盖
 * 
 * @example
 * ```tsx
 * import { TechThemeProvider, TechLayout, TechHeader, TechSidebar } from 'yggjs_rlayout/tech';
 * 
 * function App() {
 *   return (
 *     <TechThemeProvider>
 *       <TechLayout>
 *         <TechLayout.Header>
 *           <TechHeader title="管理后台" />
 *         </TechLayout.Header>
 *         <TechLayout.Sidebar>
 *           <TechSidebar menuItems={menuData} />
 *         </TechLayout.Sidebar>
 *         <TechLayout.Content>
 *           <div>主要内容区域</div>
 *         </TechLayout.Content>
 *       </TechLayout>
 *     </TechThemeProvider>
 *   );
 * }
 * ```
 */

// ===== 主题和全局样式 =====

/** 科技风主题上下文提供器 */
export { TechThemeProvider } from './TechThemeProvider';

/** 全局CSS样式注入组件 */
export { TechGlobalStyles } from './TechGlobalStyles';

// ===== 布局组件 =====

/** 科技风完整页面布局组件 */
export { TechLayout } from './TechLayout';

/** 科技风页面头部导航组件 */
export { TechHeader } from './TechHeader';

/** 科技风侧边栏组件 */
export { TechSidebar } from './TechSidebar';

/** 科技风页面底部组件 */
export { TechFooter } from './TechFooter';

/** 科技风页面头部信息组件 */
export { TechPageHeader } from './TechPageHeader';

// ===== 导航组件 =====

/** 科技风菜单组件 */
export { TechMenu } from './TechMenu';

/** 科技风面包屑导航组件及其构建工具 */
export { TechBreadcrumb, TechBreadcrumbBuilder, createBreadcrumb } from './TechBreadcrumb';

// ===== 功能组件 =====

/** 科技风搜索框组件 */
export { TechSearch } from './TechSearch';

/** 科技风用户中心组件 */
export { TechUserCenter } from './TechUserCenter';

// ===== 基础组件 =====

/** 科技风按钮组件 */
export { TechButton } from './TechButton';

/** 科技风卡片组件 */
export { TechCard } from './TechCard';

/** 科技风图标组件 */
export { TechIcon } from './TechIcon';

// ===== TypeScript 类型导出 =====

/** 基础类型：主题配置和图标名称 */
export type { TechTheme, TechIconName } from './types';

/** 页脚组件相关类型 */
export type { TechFooterProps, TechFooterLink, TechFooterSection } from './TechFooter';

/** 全局样式组件相关类型 */
export type { TechGlobalStylesProps } from './TechGlobalStyles';

/** 卡片组件相关类型 */
export type { TechCardProps } from './TechCard';

/** 面包屑组件相关类型 */
export type { TechBreadcrumbProps, TechBreadcrumbItem } from './TechBreadcrumb';

/** 菜单组件相关类型 */
export type { TechMenuItem, TechMenuProps } from './TechMenu';

/** 用户中心组件相关类型 */
export type { TechUserCenterProps, TechUserCenterItem } from './TechUserCenter';
