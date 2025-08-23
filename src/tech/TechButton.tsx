import React from 'react';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';
import styles from './TechButton.module.css';

export interface TechButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'toggle';
  size?: 'small' | 'medium' | 'large';
  icon?: TechIconName;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

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

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  const dynamicStyle: React.CSSProperties = {
    gap: icon && !iconOnly ? '8px' : '0',
    ...style,
  };

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
      disabled={disabled || loading}
      aria-label={ariaLabel || (iconOnly && icon ? icon : undefined)}
      {...props}
    >
      {loading ? (
        <div className={styles.loader} />
      ) : (
        <>
          {icon && <TechIcon name={icon} size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
}
