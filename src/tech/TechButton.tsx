/**
 * 科技风格按钮组件
 * 
 * 提供科技风格的按钮组件，具有以下特性：
 * - 多种视觉风格：primary、secondary、ghost、toggle
 * - 三种尺寸：small、medium、large
 * - 支持图标展示（左侧图标或仅图标模式）
 * - 加载状态和禁用状态
 * 
 * 视觉特色：
 * - 深色背景配科技蓝色边框
 * - 悬停和激活状态的发光效果
 * - 平滑的过渡动画
 */

import React from 'react';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';
import styles from './TechButton.module.css';

/**
 * 科技风格按钮组件的属性接口
 */
export interface TechButtonProps {
  /** 按钮内容 */
  children?: React.ReactNode;
  /** 按钮视觉风格，默认为secondary */
  variant?: 'primary' | 'secondary' | 'ghost' | 'toggle';
  /** 按钮尺寸，默认为medium */
  size?: 'small' | 'medium' | 'large';
  /** 按钮左侧显示的图标名称 */
  icon?: TechIconName;
  /** 是否为纯图标按钮（不显示文本） */
  iconOnly?: boolean;
  /** 是否禁用按钮 */
  disabled?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 额外的CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 无障碍标签，特别适用于仅图标按钮 */
  'aria-label'?: string;
}

/**
 * 科技风格按钮组件
 * 
 * 提供多种视觉风格和功能的按钮组件，支持图标、加载状态等
 * 
 * @param props - 按钮组件属性
 * @param props.children - 按钮文本内容
 * @param props.variant - 视觉风格，primary（主要）、secondary（次要）、ghost（透明）、toggle（切换）
 * @param props.size - 尺寸，small、medium、large
 * @param props.icon - 左侧图标
 * @param props.iconOnly - 仅显示图标
 * @param props.disabled - 禁用状态
 * @param props.loading - 加载状态
 * @param props.onClick - 点击事件
 * 
 * @example
 * ```tsx
 * // 基本按钮
 * <TechButton>Click me</TechButton>
 * 
 * // 主要按钮带图标
 * <TechButton variant="primary" icon="plus" onClick={handleAdd}>
 *   新增
 * </TechButton>
 * 
 * // 仅图标按钮
 * <TechButton 
 *   icon="settings" 
 *   iconOnly 
 *   aria-label="设置" 
 *   onClick={openSettings}
 * />
 * 
 * // 加载状态
 * <TechButton loading disabled>
 *   处理中...
 * </TechButton>
 * ```
 */
export function TechButton({
  children,
  variant = 'secondary',
  size = 'medium',
  icon,
  iconOnly = false,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}: TechButtonProps) {

  // 构建按钮的CSS类名
  const buttonClasses = [
    styles.button, // 基础按钮样式
    styles[variant], // 视觉风格样式
    styles[size], // 尺寸样式
    className, // 用户自定义类名
  ].filter(Boolean).join(' ');

  // 动态样式：根据图标和文本是否共存设置间距
  const dynamicStyle: React.CSSProperties = {
    gap: icon && !iconOnly ? '8px' : '0', // 有图标且非仅图标模式时设置间距
    ...style,
  };

  // 点击事件处理：检查按钮状态后执行回调
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={buttonClasses}
      style={dynamicStyle}
      onClick={handleClick}
      disabled={disabled || loading} // 加载时也视为禁用
      aria-label={ariaLabel || (iconOnly && icon ? icon : undefined)} // 仅图标按钮自动设置标签
      {...props}
    >
      {loading ? (
        // 加载状态显示旋转动画
        <div className={styles.loader} />
      ) : (
        <>
          {/* 左侧图标：根据按钮尺寸调整图标大小 */}
          {icon && <TechIcon name={icon} size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />}
          {/* 按钮文本：仅图标模式下不显示 */}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
}
