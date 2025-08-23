/**
 * 菜单组件模块
 * 
 * 提供导航菜单组件，支持多级菜单和路径选择
 * 包含菜单项配置、模式切换、路径匹配等功能
 */

// 导出菜单组件 - 主要的菜单组件，支持多级导航
export { Menu } from './Menu';

// 导出菜单类型定义 - 菜单项、模式、属性等TypeScript类型
export type { MenuItem, MenuMode, MenuProps } from './Menu';

// 导出路径选择工具 - 根据路径计算菜单选中状态的工具函数
export { computeSelectionFromPath } from './pathSelect';

// 导出路径选择类型 - 路径匹配相关的TypeScript类型定义
export type { MenuPathItem, PathMatchMode } from './pathSelect';

