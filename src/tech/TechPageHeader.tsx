import React from 'react';
import { TechBreadcrumb, type TechBreadcrumbItem, type TechBreadcrumbProps } from './TechBreadcrumb';
import styles from './TechPageHeader.module.css';

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
    <div className={[styles.header, className].filter(Boolean).join(' ')} style={style}>
      <div>
        {breadcrumb && (
          <div className={styles.breadcrumb}>
            {typeof breadcrumb === 'string' ? (
              <div style={{ color: 'var(--tech-muted)', fontSize: '12px' }}>{breadcrumb}</div>
            ) : (
              <TechBreadcrumb items={breadcrumb} variant="simple" {...breadcrumbProps} />
            )}
          </div>
        )}
        {title && <h1 className={styles.title}>{title}</h1>}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}

