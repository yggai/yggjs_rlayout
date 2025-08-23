/**
 * 科技风格主题类型定义文件
 * 
 * 定义了科技风格主题系统中使用的所有TypeScript类型接口，包括：
 * - TechTheme: 主题配置接口
 * - TechIconName: 图标名称类型
 * - TechIconProps: 图标组件属性接口
 * - MenuItem: 菜单项接口
 */

import React from 'react';

/**
 * 科技风格主题配置接口
 * 定义了完整的主题色彩、效果和渐变配置
 */
export interface TechTheme {
  /** 主题颜色配置 */
  colors: {
    /** 主背景色 */
    bg: string;
    /** 面板背景色 */
    panel: string;
    /** 次级面板背景色 */
    panel2: string;
    /** 弱化文本颜色 */
    muted: string;
    /** 主色调 */
    primary: string;
    /** 强调色（青色荧光） */
    accent: string;
    /** 边框颜色 */
    border: string;
    /** 焦点环颜色 */
    ring: string;
    /** 主文本颜色 */
    text: string;
    /** 次要文本颜色 */
    textMuted: string;
  };
  /** 视觉效果配置 */
  effects: {
    /** 发光效果样式 */
    glow: string;
    /** 毛玻璃背景效果 */
    backdrop: string;
  };
  /** 渐变效果配置 */
  gradients: {
    /** 页面背景渐变 */
    background: string;
    /** 侧边栏渐变 */
    sidebar: string;
    /** 卡片渐变 */
    card: string;
  };
}

/**
 * 可用的图标名称类型
 * 包含所有预定义的科技风格图标
 */
export type TechIconName =
  | 'menu' // 菜单图标
  | 'dashboard' // 仪表盘图标
  | 'book' // 书籍图标
  | 'info' // 信息图标
  | 'home' // 主页图标
  | 'guide' // 指南图标
  | 'api' // API图标
  | 'search' // 搜索图标
  | 'user' // 用户图标
  | 'settings' // 设置图标
  | 'logout' // 登出图标
  | 'chevron-left' // 左箭头
  | 'chevron-right' // 右箭头
  | 'chevron-down' // 下箭头
  | 'plus' // 加号图标
  | 'deploy' // 部署图标
  | 'profile' // 个人资料图标
  | 'help'; // 帮助图标

/**
 * 科技图标组件的属性接口
 */
export interface TechIconProps {
  /** 图标名称 */
  name: TechIconName;
  /** 图标尺寸（像素），默认18 */
  size?: number;
  /** 额外的CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
}

/**
 * 菜单项接口定义
 */
export interface MenuItem {
  /** 菜单项唯一标识 */
  key: string;
  /** 菜单项显示内容 */
  label: React.ReactNode;
  /** 菜单项图标 */
  icon?: TechIconName;
  /** 菜单项链接地址 */
  href?: string;
  /** 子菜单项 */
  children?: MenuItem[];
}
