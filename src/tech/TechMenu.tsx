import React from 'react';
import { Menu, type MenuProps } from '../components/menu';
import type { MenuItem as BaseMenuItem } from '../components/menu';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';
import styles from './TechMenu.module.css';

export type LinkLikeComponent = React.ComponentType<{
  to: string;
  className?: string;
  children?: React.ReactNode;
}>;

export interface TechMenuItem extends Omit<BaseMenuItem, 'label'> {
  label: string;
  icon?: TechIconName;
  href?: string; // fallback for non-SPA
  to?: string;   // SPA route
  children?: TechMenuItem[];
}

export interface TechMenuProps extends Omit<MenuProps, 'items' | 'onSelect'> {
  items: TechMenuItem[];
  collapsed?: boolean;
  linkComponent?: LinkLikeComponent;
  onSelectItem?: (item: TechMenuItem) => void;
  onSelect?: MenuProps['onSelect'];
}

export function TechMenu({
  items,
  collapsed = false,
  mode = 'vertical',
  linkComponent,
  onSelectItem,
  onSelect,
  ...props
}: TechMenuProps) {
  const key2item = React.useMemo(() => {
    const map = new Map<string, TechMenuItem>();
    const walk = (arr: TechMenuItem[]) => {
      arr.forEach((it) => {
        map.set(it.key, it);
        if (it.children?.length) walk(it.children);
      });
    };
    walk(items);
    return map;
  }, [items]);

  const processedItems: BaseMenuItem[] = React.useMemo(() => {
    const Link = linkComponent;
    const build = (item: TechMenuItem): BaseMenuItem => {
      const isLeaf = !item.children || item.children.length === 0;
      const inner = (
        <>
          {item.icon && <TechIcon name={item.icon} />}
          <span className={collapsed ? styles.navTextCollapsed : styles.navText}>
            {item.label}
          </span>
        </>
      );

      let labelNode: React.ReactNode;
      if (isLeaf) {
        if (Link && item.to) {
          labelNode = <Link to={item.to} className={styles.nav}>{inner}</Link>;
        } else if (item.href) {
          labelNode = <a href={item.href} className={styles.nav}>{inner}</a>;
        } else {
          labelNode = <span className={styles.nav}>{inner}</span>;
        }
      } else {
        labelNode = <span className={styles.nav}>{inner}</span>;
      }

      return {
        ...(item as any),
        label: labelNode,
        children: item.children?.map(build),
      } as BaseMenuItem;
    };

    return items.map(build);
  }, [items, collapsed, linkComponent]);

  const techVars = React.useMemo(() => {
    if (mode === 'horizontal') {
      return {
        menuItemPadding: '6px 10px',
        menuGap: '14px',
        menuRadius: '8px',
        menuLabelGap: '8px'
      };
    }
    return {
      menuLabelGap: '10px'
    };
  }, [mode]);

  const handleSelect: MenuProps['onSelect'] = (info) => {
    onSelect?.(info);
    const item = key2item.get(info.key);
    if (item && onSelectItem) onSelectItem(item);
  };

  const menuClassName = [
    props.className,
    styles.menu,
    collapsed && styles.collapsed
  ].filter(Boolean).join(' ');

  return (
    <Menu
      mode={mode}
      items={processedItems}
      vars={techVars}
      onSelect={handleSelect}
      {...props}
      className={menuClassName}
    />
  );
}
