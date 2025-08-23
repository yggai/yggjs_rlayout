/**
 * 科技风格图标组件
 * 
 * 提供科技风格的SVG图标组件，包含：
 * - 统一的图标样式和尺寸
 * - 支持多种常用图标（菜单、搜索、用户、设置等）
 * - 可自定义颜色和尺寸
 * - 基于Feather Icons风格设计
 * 
 * 主要特色：
 * - 统一的线条风格
 * - 支持currentColor继承颜色
 * - 具有无障碍支持
 */

import React from 'react';
import type { TechIconProps, TechIconName } from './types';

/**
 * 图标路径数据映射
 * 存储所有可用图标的SVG路径数据
 */
const iconPaths: Record<TechIconName, string> = {
  /** 菜单图标 - 三条水平线 */
  menu: "M3 6h18M3 12h18M3 18h18",
  /** 仪表盘图标 - 网格布局 */
  dashboard: "M3 3h7v7H3zM14 3h7v4h-7zM14 9h7v11h-7zM3 12h7v8H3z",
  /** 书籍图标 - 打开的书本 */
  book: "M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3V4z",
  /** 信息图标 - 带i的圆圈 */
  info: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 8v6m0-8h.01",
  /** 主页图标 - 房子形状 */
  home: "M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  /** 指南图标 - 书签 */
  guide: "M4 19.5V5a2 2 0 012-2h12v15.5a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19.5zM6 6h8",
  /** API图标 - 代码符号 */
  api: "M4 12h4m8 0h4M9 5l6 14",
  /** 搜索图标 - 放大镜 */
  search: "M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z",
  /** 用户图标 - 人物头像 */
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
  /** 设置图标 - 齿轮 */
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  /** 登出图标 - 向右箭头和门 */
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  /** 左箭头图标 */
  'chevron-left': "M15 18l-6-6 6-6",
  /** 右箭头图标 */
  'chevron-right': "M9 18l6-6-6-6",
  /** 下箭头图标 */
  'chevron-down': "M6 9l6 6 6-6",
  /** 加号图标 - 十字形 */
  plus: "M12 5v14M5 12h14",
  /** 部署图标 - 包裹盒 */
  deploy: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
  /** 个人资料图标 - 人物头像 */
  profile: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  /** 帮助图标 - 问号 */
  help: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
};

/**
 * 科技风格图标组件
 * 
 * 渲染指定名称的SVG图标，支持自定义尺寸和样式
 * 所有图标均采用线条风格设计，与科技主题风格一致
 * 
 * @param props - 图标组件属性
 * @param props.name - 图标名称，必须是预定义的图标之一
 * @param props.size - 图标尺寸（像素），默认为18
 * @param props.className - 额外的CSS类名
 * @param props.style - 自定义内联样式
 * 
 * @returns 渲染的SVG图标元素，如果图标不存在则返回null
 * 
 * @example
 * ```tsx
 * // 基本用法
 * <TechIcon name="menu" />
 * 
 * // 自定义尺寸和样式
 * <TechIcon 
 *   name="search" 
 *   size={24} 
 *   className="text-blue-500" 
 *   style={{ color: '#27e0ff' }}
 * />
 * 
 * // 在按钮中使用
 * <button>
 *   <TechIcon name="settings" size={16} />
 *   设置
 * </button>
 * ```
 */
export function TechIcon({ 
  name, 
  size = 18, 
  className = '', 
  style = {} 
}: TechIconProps) {
  // 获取指定图标的路径数据
  const path = iconPaths[name];
  
  // 如果图标不存在，输出警告并返回null
  if (!path) {
    console.warn(`TechIcon: Unknown icon name "${name}"`);
    return null;
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" // 使用当前文本颜色作为描边颜色
      strokeWidth="1.6" // 统一的描边宽度，保持线条一致性
      strokeLinecap="round" // 圆角线帽，更加平滑
      strokeLinejoin="round" // 圆角连接，更加平滑
      className={`tech-icon ${className}`}
      style={style}
      aria-hidden="true" // 对屏幕阅读器隐藏，适用于装饰性图标
    >
      <path d={path} />
    </svg>
  );
}
