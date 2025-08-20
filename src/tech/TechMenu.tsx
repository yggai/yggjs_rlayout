import React from 'react';
import { Menu, type MenuProps } from '../components/menu';
import type { MenuItem as BaseMenuItem } from '../components/menu';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';

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
          <span className={`tech-nav-text ${collapsed ? 'collapsed' : ''}`}>
            {item.label}
          </span>
        </>
      );

      let labelNode: React.ReactNode;
      if (isLeaf) {
        if (Link && item.to) {
          labelNode = (
            <Link to={item.to} className="tech-nav">
              {inner}
            </Link>
          );
        } else if (item.href) {
          labelNode = (
            <a href={item.href} className="tech-nav">
              {inner}
            </a>
          );
        } else {
          labelNode = <span className="tech-nav">{inner}</span>;
        }
      } else {
        labelNode = <span className="tech-nav">{inner}</span>;
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

  return (
    <>
      <style>{`
        .tech-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--tech-text);
          text-decoration: none;
          opacity: 0.9;
        }

        .tech-nav-text.collapsed {
          display: none;
        }

        .tech-nav:hover {
          opacity: 1;
        }

        /* 水平菜单样式 */
        .ygg-menu-horizontal .ygg-menu-item-selected {
          color: var(--tech-accent) !important;
          border-bottom: 2px solid var(--tech-accent) !important;
        }

        /* 垂直菜单样式 */
        .ygg-menu-vertical .ygg-menu-item {
          position: relative;
          padding: 6px 8px;
          border-radius: 8px;
          margin-bottom: 2px;
        }

        .ygg-menu-vertical .ygg-menu-item:hover {
          background: rgba(90, 162, 255, 0.08);
        }

        .ygg-menu-vertical .ygg-menu-item-selected {
          background: linear-gradient(180deg, rgba(39,224,255,.10), rgba(90,162,255,.08));
          box-shadow: var(--tech-glow);
        }

        .ygg-menu-vertical .ygg-menu-item-selected::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: var(--tech-accent);
          border-radius: 2px;
        }

        .collapsed .ygg-menu .tech-nav {
          justify-content: center;
        }
      `}</style>
      <Menu
        mode={mode}
        items={processedItems}
        vars={techVars}
        onSelect={handleSelect}
        {...props}
      />
    </>
  );
}
