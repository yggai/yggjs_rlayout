import React from 'react';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';

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
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon && !iconOnly ? '8px' : '0',
    border: 'none',
    borderRadius: variant === 'toggle' ? '8px' : '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    fontWeight: '500',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--tech-primary)',
      border: '1px solid var(--tech-primary)',
      color: '#0b1020',
      padding: size === 'small' ? '6px 10px' : size === 'large' ? '10px 16px' : '8px 12px',
    },
    secondary: {
      background: 'transparent',
      border: '1px solid var(--tech-border)',
      color: 'var(--tech-text)',
      padding: size === 'small' ? '6px 10px' : size === 'large' ? '10px 16px' : '8px 12px',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: 'var(--tech-text)',
      padding: size === 'small' ? '4px 8px' : size === 'large' ? '8px 12px' : '6px 10px',
    },
    toggle: {
      background: 'transparent',
      border: '1px solid var(--tech-border)',
      color: 'var(--tech-text)',
      padding: '6px',
      minWidth: iconOnly ? 'auto' : undefined,
    }
  };

  const finalStyle = {
    ...baseStyle,
    ...variantStyles[variant]
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`tech-button tech-button-${variant} tech-button-${size} ${className}`}
      style={finalStyle}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || (iconOnly && icon ? icon : undefined)}
      {...props}
    >
      {loading ? (
        <div style={{ 
          width: '16px', 
          height: '16px', 
          border: '2px solid currentColor', 
          borderTop: '2px solid transparent', 
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      ) : (
        <>
          {icon && <TechIcon name={icon} size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
}
