import React from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';
import styles from './TechCard.module.css';

export interface TechCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: TechIconName;
  variant?: 'default' | 'outlined' | 'filled' | 'glass' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  actions?: React.ReactNode;
  extra?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

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
  const hasHeader = title || subtitle || icon || extra;
  const hasActions = actions;

  const handleClick = () => {
    if (clickable && !disabled && !loading && onClick) {
      onClick();
    }
  };

  const cardClasses = [
    styles.card,
    styles[variant],
    styles[size],
    hoverable && styles.hoverable,
    clickable && styles.clickable,
    disabled && styles.disabled,
    loading && styles.loading,
    className
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
            {icon && (
              <div className={styles.icon}>
                <TechIcon name={icon} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
              </div>
            )}
            {(title || subtitle) && (
              <div className={styles.titleWrapper}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            )}
          </div>
          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      )}

      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>

      {hasActions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
}
