import React from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';

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

  return (
    <>
      <style>{`
        .tech-card {
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: ${clickable ? 'pointer' : 'default'};
        }
        
        .tech-card-small {
          padding: 12px;
        }
        
        .tech-card-medium {
          padding: 20px;
        }
        
        .tech-card-large {
          padding: 24px;
        }
        
        .tech-card-default {
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
          border: 1px solid var(--tech-border);
          box-shadow: 0 2px 30px rgba(16,19,40,.35) inset;
        }
        
        .tech-card-outlined {
          background: transparent;
          border: 1px solid var(--tech-border);
        }
        
        .tech-card-filled {
          background: var(--tech-panel);
          border: 1px solid var(--tech-border);
        }
        
        .tech-card-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .tech-card-gradient {
          background: linear-gradient(135deg, 
            rgba(39, 224, 255, 0.1) 0%, 
            rgba(90, 162, 255, 0.05) 50%, 
            rgba(39, 224, 255, 0.1) 100%
          );
          border: 1px solid rgba(39, 224, 255, 0.2);
        }
        
        .tech-card-hoverable:hover {
          transform: translateY(-2px);
          box-shadow: var(--tech-glow);
        }
        
        .tech-card-clickable:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(39, 224, 255, 0.2);
        }
        
        .tech-card-clickable:active {
          transform: translateY(0);
        }
        
        .tech-card-disabled {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }
        
        .tech-card-loading {
          position: relative;
          pointer-events: none;
        }
        
        .tech-card-loading::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(14, 22, 48, 0.8);
          backdrop-filter: blur(2px);
          z-index: 10;
          border-radius: inherit;
        }
        
        .tech-card-loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 2px solid var(--tech-border);
          border-top: 2px solid var(--tech-accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          z-index: 11;
        }
        
        .tech-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .tech-card-header-content {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }
        
        .tech-card-icon {
          flex-shrink: 0;
          color: var(--tech-accent);
          margin-top: 2px;
        }
        
        .tech-card-title-wrapper {
          flex: 1;
          min-width: 0;
        }
        
        .tech-card-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--tech-text);
          line-height: 1.4;
        }
        
        .tech-card-subtitle {
          margin: 4px 0 0 0;
          font-size: 13px;
          color: var(--tech-text-muted);
          line-height: 1.4;
        }
        
        .tech-card-extra {
          flex-shrink: 0;
          margin-left: 12px;
        }
        
        .tech-card-body {
          color: var(--tech-text);
          line-height: 1.6;
        }
        
        .tech-card-actions {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--tech-border);
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        
        /* 尺寸变体 */
        .tech-card-small .tech-card-title {
          font-size: 14px;
        }
        
        .tech-card-small .tech-card-subtitle {
          font-size: 12px;
        }
        
        .tech-card-small .tech-card-header {
          margin-bottom: 12px;
        }
        
        .tech-card-small .tech-card-actions {
          margin-top: 12px;
          padding-top: 12px;
        }
        
        .tech-card-large .tech-card-title {
          font-size: 18px;
        }
        
        .tech-card-large .tech-card-subtitle {
          font-size: 14px;
        }
        
        .tech-card-large .tech-card-header {
          margin-bottom: 20px;
        }
        
        .tech-card-large .tech-card-actions {
          margin-top: 20px;
          padding-top: 20px;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div
        className={`
          tech-card 
          tech-card-${variant} 
          tech-card-${size}
          ${hoverable ? 'tech-card-hoverable' : ''}
          ${clickable ? 'tech-card-clickable' : ''}
          ${disabled ? 'tech-card-disabled' : ''}
          ${loading ? 'tech-card-loading' : ''}
          ${className}
        `.trim()}
        style={style}
        onClick={handleClick}
      >
        {hasHeader && (
          <div className="tech-card-header" style={headerStyle}>
            <div className="tech-card-header-content">
              {icon && (
                <div className="tech-card-icon">
                  <TechIcon name={icon} size={size === 'small' ? 16 : size === 'large' ? 20 : 18} />
                </div>
              )}
              {(title || subtitle) && (
                <div className="tech-card-title-wrapper">
                  {title && <h3 className="tech-card-title">{title}</h3>}
                  {subtitle && <p className="tech-card-subtitle">{subtitle}</p>}
                </div>
              )}
            </div>
            {extra && <div className="tech-card-extra">{extra}</div>}
          </div>
        )}
        
        <div className="tech-card-body" style={bodyStyle}>
          {children}
        </div>
        
        {hasActions && (
          <div className="tech-card-actions">
            {actions}
          </div>
        )}
      </div>
    </>
  );
}
