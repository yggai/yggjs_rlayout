/**
 * 科技风格面包屑导航组件
 * 
 * 提供科技风格的面包屑导航，支持图标、省略显示和多种视觉风格
 * 包含便捷的构建器类用于快速创建面包屑
 */

import React from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';
import styles from './TechBreadcrumb.module.css';

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
  variant?: 'simple' | 'icon';
  className?: string;
  style?: React.CSSProperties;
}

export function TechBreadcrumb({
  items,
  separator,
  maxItems,
  showHome = false,
  homeIcon = 'home',
  onHomeClick,
  variant = 'simple',
  className = '',
  style = {}
}: TechBreadcrumbProps) {
  const processedItems = React.useMemo(() => {
    // 确保每个项目都有key属性
    const itemsWithKeys = items.map((item, index) => ({
      ...item,
      key: item.key || `item-${index}`
    }));
    
    if (!maxItems || itemsWithKeys.length <= maxItems) return itemsWithKeys;
    const firstItem = itemsWithKeys[0];
    const lastItems = itemsWithKeys.slice(-(maxItems - 1));
    return [
      firstItem, 
      { key: `ellipsis-${itemsWithKeys.length}-${maxItems}`, label: '...' }, 
      ...lastItems
    ];
  }, [items, maxItems]);

  const defaultSeparator = variant === 'simple' ? <span>/</span> : <TechIcon name="chevron-right" size={12} />;

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

  const navClasses = [
    styles.breadcrumb,
    variant === 'simple' && styles.simple,
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClasses} style={style} aria-label="Breadcrumb">
      {showHome && (
        <>
          <a className={styles.home} href="/" onClick={handleHomeClick} aria-label="Home">
            <TechIcon name={homeIcon} size={14} className={styles.icon} />
          </a>
          {processedItems.length > 0 && (
            <span className={styles.separator}>{separator || defaultSeparator}</span>
          )}
        </>
      )}
      {processedItems.map((item, index) => {
        const isLast = index === processedItems.length - 1;
        const isEllipsis = item.key && item.key.startsWith('ellipsis-');

        const itemClasses = [
          styles.item,
          isLast && styles.itemCurrent,
          !item.href && !item.onClick && styles.itemDisabled
        ].filter(Boolean).join(' ');

        return (
          <React.Fragment key={item.key}>
            {isEllipsis ? (
              <span className={styles.ellipsis}>{item.label}</span>
            ) : (
              <a
                className={itemClasses}
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                aria-current={isLast ? 'page' : undefined}
              >
                {variant === 'icon' && item.icon && (
                  <TechIcon name={item.icon} size={12} className={styles.icon} />
                )}
                <span className={styles.itemLabel}>{item.label}</span>
              </a>
            )}
            {!isLast && (
              <span className={styles.separator}>{separator || defaultSeparator}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
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
