import React from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';

export interface TechBreadcrumbItem {
  key: string;
  label: React.ReactNode;
  href?: string;
  icon?: TechIconName;
  onClick?: () => void;
}

export interface TechBreadcrumbProps {
  items: TechBreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeIcon?: TechIconName;
  onHomeClick?: () => void;
  variant?: 'simple' | 'icon'; // 新增：简约版或图标版
  className?: string;
  style?: React.CSSProperties;
}

export function TechBreadcrumb({
  items,
  separator,
  maxItems,
  showHome = false, // 简约版默认不显示Home
  homeIcon = 'home',
  onHomeClick,
  variant = 'simple', // 默认使用简约版
  className = '',
  style = {}
}: TechBreadcrumbProps) {
  // 处理项目数量限制
  const processedItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    
    return [
      firstItem,
      { key: 'ellipsis', label: '...', href: undefined },
      ...lastItems
    ];
  }, [items, maxItems]);

  const defaultSeparator = variant === 'simple' ? (
    <span>/</span>
  ) : (
    <TechIcon name="chevron-right" size={12} />
  );

  const handleItemClick = (item: TechBreadcrumbItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  return (
    <>
      <style>{`
        .tech-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--tech-text-muted);
          line-height: 1.4;
        }

        .tech-breadcrumb-simple {
          gap: 6px;
          font-size: 12px;
        }
        
        .tech-breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .tech-breadcrumb-simple .tech-breadcrumb-item {
          gap: 0;
          padding: 1px 2px;
          border-radius: 2px;
        }

        .tech-breadcrumb-item:hover {
          color: var(--tech-accent);
          background: rgba(39, 224, 255, 0.1);
        }

        .tech-breadcrumb-simple .tech-breadcrumb-item:hover {
          background: transparent;
          text-decoration: underline;
        }
        
        .tech-breadcrumb-item-disabled {
          cursor: default;
          pointer-events: none;
        }
        
        .tech-breadcrumb-item-current {
          color: var(--tech-text);
          font-weight: 500;
          cursor: default;
        }
        
        .tech-breadcrumb-item-current:hover {
          color: var(--tech-text);
          background: transparent;
        }
        
        .tech-breadcrumb-separator {
          display: flex;
          align-items: center;
          color: var(--tech-border);
          opacity: 0.6;
          flex-shrink: 0;
        }

        .tech-breadcrumb-simple .tech-breadcrumb-separator {
          color: var(--tech-text-muted);
          opacity: 0.8;
          font-size: 11px;
        }
        
        .tech-breadcrumb-home {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--tech-text-muted);
          text-decoration: none;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .tech-breadcrumb-home:hover {
          color: var(--tech-accent);
          background: rgba(39, 224, 255, 0.1);
        }
        
        .tech-breadcrumb-ellipsis {
          color: var(--tech-text-muted);
          cursor: default;
          padding: 2px 4px;
          user-select: none;
        }
        
        .tech-breadcrumb-icon {
          flex-shrink: 0;
          opacity: 0.8;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .tech-breadcrumb {
            font-size: 12px;
            gap: 6px;
          }
          
          .tech-breadcrumb-item {
            gap: 4px;
          }
          
          .tech-breadcrumb-home {
            gap: 4px;
          }
        }
        
        /* 截断长文本 */
        .tech-breadcrumb-item-label {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        @media (max-width: 480px) {
          .tech-breadcrumb-item-label {
            max-width: 100px;
          }
        }
      `}</style>
      
      <nav
        className={`tech-breadcrumb ${variant === 'simple' ? 'tech-breadcrumb-simple' : ''} ${className}`}
        style={style}
        aria-label="Breadcrumb"
      >
        {/* Home链接 */}
        {showHome && (
          <>
            <a
              className="tech-breadcrumb-home"
              href="/"
              onClick={handleHomeClick}
              aria-label="Home"
            >
              <TechIcon name={homeIcon} size={14} className="tech-breadcrumb-icon" />
            </a>
            {processedItems.length > 0 && (
              <span className="tech-breadcrumb-separator">
                {separator || defaultSeparator}
              </span>
            )}
          </>
        )}
        
        {/* 面包屑项目 */}
        {processedItems.map((item, index) => {
          const isLast = index === processedItems.length - 1;
          const isEllipsis = item.key === 'ellipsis';
          
          return (
            <React.Fragment key={item.key}>
              {isEllipsis ? (
                <span className="tech-breadcrumb-ellipsis">
                  {item.label}
                </span>
              ) : (
                <a
                  className={`
                    tech-breadcrumb-item
                    ${isLast ? 'tech-breadcrumb-item-current' : ''}
                    ${!item.href && !item.onClick ? 'tech-breadcrumb-item-disabled' : ''}
                  `.trim()}
                  href={item.href}
                  onClick={(e) => handleItemClick(item, e)}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {variant === 'icon' && item.icon && (
                    <TechIcon
                      name={item.icon}
                      size={12}
                      className="tech-breadcrumb-icon"
                    />
                  )}
                  <span className="tech-breadcrumb-item-label">
                    {item.label}
                  </span>
                </a>
              )}
              
              {!isLast && (
                <span className="tech-breadcrumb-separator">
                  {separator || defaultSeparator}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

// 便捷的面包屑构建器
export class TechBreadcrumbBuilder {
  private items: TechBreadcrumbItem[] = [];

  add(label: React.ReactNode, href?: string, icon?: TechIconName): this {
    this.items.push({
      key: `item-${this.items.length}`,
      label,
      href,
      icon
    });
    return this;
  }

  addClickable(label: React.ReactNode, onClick: () => void, icon?: TechIconName): this {
    this.items.push({
      key: `item-${this.items.length}`,
      label,
      onClick,
      icon
    });
    return this;
  }

  build(): TechBreadcrumbItem[] {
    return this.items;
  }
}

// 便捷函数
export function createBreadcrumb(): TechBreadcrumbBuilder {
  return new TechBreadcrumbBuilder();
}
