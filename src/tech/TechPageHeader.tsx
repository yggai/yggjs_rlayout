import React from 'react';
import { TechBreadcrumb, type TechBreadcrumbItem, type TechBreadcrumbProps } from './TechBreadcrumb';

export interface TechPageHeaderProps {
  breadcrumb?: string | TechBreadcrumbItem[];
  breadcrumbProps?: Omit<TechBreadcrumbProps, 'items'>;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TechPageHeader({
  breadcrumb,
  breadcrumbProps,
  title,
  actions,
  className = '',
  style = {}
}: TechPageHeaderProps) {
  return (
    <div className={`tech-page-header ${className}`} style={style}>
      <style>{`
        .tech-page-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          padding: 16px 0 10px;
          margin-bottom: 24px;
          flex-shrink: 0;
        }
        .tech-page-breadcrumb { margin-bottom: 8px; }
        .tech-title { margin: 0; font-size: 24px; font-weight: 600; color: var(--tech-text); }
        .tech-page-actions { display: flex; gap: 10px; flex-shrink: 0; }
        @media (max-width: 768px) {
          .tech-page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .tech-page-actions { width: 100%; justify-content: flex-end; }
        }
      `}</style>

      <div>
        {breadcrumb && (
          <div className="tech-page-breadcrumb">
            {typeof breadcrumb === 'string' ? (
              <div style={{ color: 'var(--tech-muted)', fontSize: '12px' }}>{breadcrumb}</div>
            ) : (
              <TechBreadcrumb items={breadcrumb} variant="simple" {...breadcrumbProps} />
            )}
          </div>
        )}
        {title && <h1 className="tech-title">{title}</h1>}
      </div>

      {actions && <div className="tech-page-actions">{actions}</div>}
    </div>
  );
}

