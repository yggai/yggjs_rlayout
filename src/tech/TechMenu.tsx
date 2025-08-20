import React from 'react';
import { Menu, type MenuProps } from '../components/menu';
import type { MenuItem as BaseMenuItem } from '../components/menu';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';

export interface TechMenuItem extends Omit<BaseMenuItem, 'label'> {
  label: string;
  icon?: TechIconName;
  href?: string;
  children?: TechMenuItem[];
}

export interface TechMenuProps extends Omit<MenuProps, 'items'> {
  items: TechMenuItem[];
  collapsed?: boolean;
}

export function TechMenu({ 
  items, 
  collapsed = false,
  mode = 'vertical',
  ...props 
}: TechMenuProps) {
  const processedItems: BaseMenuItem[] = React.useMemo(() => {
    return items.map(item => ({
      ...item,
      label: (
        <span className="tech-nav">
          {item.icon && <TechIcon name={item.icon} />}
          <span className={`tech-nav-text ${collapsed ? 'collapsed' : ''}`}>
            {item.label}
          </span>
        </span>
      )
    }));
  }, [items, collapsed]);

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
        {...props}
      />
    </>
  );
}
