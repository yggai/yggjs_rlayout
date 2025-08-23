/**
 * 科技风格卡片组件
 * 
 * 提供科技风格的卡片容器组件，具有以下特性：
 * - 多种视觉变体：default、outlined、filled、glass、gradient
 * - 三种尺寸：small、medium、large
 * - 支持标题、副标题、图标展示
 * - 可配置的交互效果（悬停、点击）
 * - 支持头部、主体、操作区域的结构化布局
 * 
 * 视觉特色：
 * - 深色半透明背景配科技蓝色边框
 * - 毛玻璃效果和渐变背景
 * - 悬停时的发光边框效果
 * - 平滑的过渡动画
 */

import React from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';
import styles from './TechCard.module.css';

/**
 * 科技风格卡片组件的属性接口
 */
export interface TechCardProps {
  /** 卡片主要内容 */
  children: React.ReactNode;
  /** 卡片标题 */
  title?: string;
  /** 卡片副标题 */
  subtitle?: string;
  /** 标题左侧图标 */
  icon?: TechIconName;
  /** 视觉变体风格 */
  variant?: 'default' | 'outlined' | 'filled' | 'glass' | 'gradient';
  /** 卡片尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否显示悬停效果 */
  hoverable?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 底部操作区域内容 */
  actions?: React.ReactNode;
  /** 头部额外内容 */
  extra?: React.ReactNode;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 额外的CSS类名 */
  className?: string;
  /** 卡片整体样式 */
  style?: React.CSSProperties;
  /** 卡片主体样式 */
  bodyStyle?: React.CSSProperties;
  /** 卡片头部样式 */
  headerStyle?: React.CSSProperties;
}

/**
 * 科技风格卡片组件
 * 
 * 提供结构化的卡片容器，支持标题、内容、操作区域的布局
 * 
 * @example
 * ```tsx
 * // 基本卡片
 * <TechCard title="标题" subtitle="副标题">
 *   卡片内容
 * </TechCard>
 * 
 * // 带图标和操作的卡片
 * <TechCard 
 *   title="设置" 
 *   icon="settings"
 *   variant="glass"
 *   clickable
 *   onClick={handleClick}
 *   actions={<button>操作</button>}
 * >
 *   卡片内容
 * </TechCard>
 * ```
 */
export function TechCard({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  size = 'medium',
  hoverable = true,
  clickable = false,
  loading = false,
  disabled = false,
  actions,
  extra,
  onClick,
  className = '',
  style = {},
  bodyStyle = {},
  headerStyle = {}
}: TechCardProps) {
  // 检查是否需要显示头部区域
  const hasHeader = title || subtitle || icon || extra;
  // 检查是否需要显示操作区域
  const hasActions = actions;

  // 点击事件处理
  const handleClick = () => {
    if (clickable && !disabled && !loading && onClick) {
      onClick();
    }
  };

  // 构建卡片的CSS类名
  const cardClasses = [
    styles.card, // 基础卡片样式
    styles[variant], // 视觉变体样式
    styles[size], // 尺寸样式
    hoverable && styles.hoverable, // 悬停效果
    clickable && styles.clickable, // 点击样式
    disabled && styles.disabled, // 禁用状态
    loading && styles.loading, // 加载状态
    className // 用户自定义类名
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      style={style}
      onClick={handleClick}
    >
      {hasHeader && (
        <div className={styles.header} style={headerStyle}>
          <div className={styles.headerContent}>
            {/* 标题图标 */}
            {icon && (
              <div className={styles.icon}>
                <TechIcon name={icon} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
              </div>
            )}
            {/* 标题和副标题 */}
            {(title || subtitle) && (
              <div className={styles.titleWrapper}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            )}
          </div>
          {/* 头部额外内容 */}
          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      )}

      {/* 卡片主体内容区域 */}
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>

      {/* 卡片底部操作区域 */}
      {hasActions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
}
