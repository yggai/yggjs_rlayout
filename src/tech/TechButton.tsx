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

import React, { memo, useMemo, useCallback } from 'react';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';
import styles from './TechButton.module.css';

/**
 * 科技风格按钮组件的属性接口
 */
export interface TechButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'style' | 'className'> {
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
  /** 点击事件处理函数，传入原生事件对象 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 额外的CSS类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 无障碍标签，特别适用于仅图标按钮 */
  'aria-label'?: string;
  /** 按钮类型，HTML原生属性 */
  type?: 'button' | 'submit' | 'reset';
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
export const TechButton = memo<TechButtonProps>(function TechButton({
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
  type = 'button',
  ...props
}) {

  // 使用useMemo优化类名计算，只在依赖变化时重新计算
  const buttonClasses = useMemo(() => [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' '), [variant, size, className]);

  // 使用useMemo优化动态样式计算，避免每次渲染时重新创建对象
  const dynamicStyle = useMemo((): React.CSSProperties => ({
    gap: icon && !iconOnly ? '8px' : '0',
    ...style,
  }), [icon, iconOnly, style]);
  
  // 使用useMemo优化图标尺寸计算
  const iconSize = useMemo(() => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  }, [size]);

  // 使用useCallback优化点击事件处理函数，避免不必要的重新创建
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // 只在按钮可用且非加载状态时执行回调
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  }, [disabled, loading, onClick]);
  
  // 使用useMemo优化无障碍标签计算
  const computedAriaLabel = useMemo(() => {
    return ariaLabel || (iconOnly && icon ? `${icon} 按钮` : undefined);
  }, [ariaLabel, iconOnly, icon]);

  return (
    <button
      type={type}
      className={buttonClasses}
      style={dynamicStyle}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={computedAriaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        // 加载状态显示旋转动画
        <div className={styles.loader} />
      ) : (
        <>
          {/* 左侧图标：使用计算好的尺寸值 */}
          {icon && <TechIcon name={icon} size={iconSize} />}
          {/* 按钮文本：仅图标模式下不显示 */}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
});
