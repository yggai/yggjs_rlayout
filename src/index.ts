/**
 * YGG React Layout 组件库 - 主入口文件
 * 
 * 这是一个专业的React布局组件库，提供了丰富的布局组件和实用工具。
 * 包含响应式网格系统、弹性布局、容器组件、导航组件等。
 * 
 * 主要特性：
 * - 响应式设计：支持多种屏幕尺寸的自适应布局
 * - 灵活配置：提供丰富的配置选项和自定义能力
 * - TypeScript支持：完整的类型定义和智能提示
 * - 易于使用：简洁的API设计和详细的文档
 * 
 * @example
 * ```tsx
 * import { Container, Row, Column, Flex, Menu } from 'yggjs_rlayout';
 * 
 * function MyApp() {
 *   return (
 *     <Container>
 *       <Row>
 *         <Column span={12}>
 *           <Flex direction="row" justify="space-between">
 *             <Menu mode="horizontal" items={menuItems} />
 *           </Flex>
 *         </Column>
 *       </Row>
 *     </Container>
 *   );
 * }
 * ```
 */

// ===== 基础布局组件 =====

/** 弹性布局容器组件 */
export { Layout } from './components/layout';

/** 网格系统组件：行、列、断点提供器、断点hook、网格配置等 */
export { Row, Column, BreakpointProvider, useBreakpoint, GridConfigProvider, useGridConfig } from './components/grid';

/** 屏幕断点类型定义 */
export type { Breakpoint } from './components/grid';

/** Flexbox弹性布局组件 */
export { Flex } from './components/flex';

/** CSS Grid网格布局组件 */
export { Grid } from './components/cssgrid';

/** 响应式容器组件 */
export { Container } from './components/container';

// ===== 导航组件 =====

/** 多功能菜单组件 */
export { Menu } from './components/menu';

/** 菜单相关类型定义 */
export type { MenuItem, MenuMode, MenuProps } from './components/menu';

/** 页面头部组件 */
export { Header } from './components/header';

/** 侧边栏组件 */
export { Sidebar } from './components/sidebar';

// ===== 功能组件 =====

/** 搜索框组件 */
export { Search } from './components/search';

/** 搜索组件相关类型定义 */
export type { SearchProps, SearchSize, SearchVariant } from './components/search';

// ===== 重要提示 =====
/**
 * 科技风主题组件已移至独立的子包路径
 * 
 * 如需使用科技风格的组件，请从 'yggjs_rlayout/tech' 导入：
 * 
 * @example
 * ```tsx
 * import { TechLayout, TechHeader, TechButton } from 'yggjs_rlayout/tech';
 * ```
 * 
 * 这样的设计允许您按需导入，减少包体积。
 */

