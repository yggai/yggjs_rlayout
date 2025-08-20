import React from 'react';

export type MenuMode = 'horizontal' | 'vertical' | 'inline';
export type MenuItem = { key: string; label: React.ReactNode; disabled?: boolean; children?: MenuItem[] };

export type MenuBaseStyle = 'none' | 'soft';
export type MenuVars = {
  menuBg?: string;
  menuColor?: string;
  menuMuted?: string;
  menuHoverBg?: string;
  menuSelectedBg?: string;
  menuSelectedColor?: string;
  menuRadius?: string;
  menuItemPadding?: string; // e.g. '8px 12px'
  menuGap?: string;          // horizontal gap between items
  menuLabelGap?: string;     // gap between icon and text inside a menu item
};

export type MenuProps = {
  items: MenuItem[];
  mode?: MenuMode;
  trigger?: 'click' | 'hover';
  selectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenChange?: (keys: string[]) => void;
  onSelect?: (info: { key: string }) => void;
  prefixCls?: string;
  baseStyle?: MenuBaseStyle; // inject minimal default CSS
  vars?: MenuVars;           // CSS variables overrides applied on root
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
};

function ensureBaseStyle(prefix: string) {
  if (typeof document === 'undefined') return;
  const id = `${prefix}-menu-base-style`;
  if (document.getElementById(id)) return;
  const css = `
  /* Scoped CSS reset for Menu */
  .${prefix}-menu, .${prefix}-menu ul, .${prefix}-menu li, .${prefix}-menu a,
  .${prefix}-menu div, .${prefix}-menu span, .${prefix}-menu svg{
    margin:0; padding:0; border:0; background:none; list-style:none; box-sizing:border-box;
  }
  .${prefix}-menu a{ color:inherit; text-decoration:none; }

  .${prefix}-menu{list-style:none;margin:0;padding:0;color:var(--menu-color, #cfe1ff);}
  .${prefix}-menu-horizontal{display:flex;align-items:center;gap:var(--menu-gap,12px);}
  .${prefix}-menu > li > div{padding:var(--menu-item-padding,8px 12px);border-radius:var(--menu-radius,10px);}
  .${prefix}-menu > li > div > span{display:inline-flex;align-items:center;gap:var(--menu-label-gap,8px);}
  .${prefix}-menu .nav{display:inline-flex;align-items:center;gap:var(--menu-label-gap,8px);}
  .${prefix}-menu > li:hover > div{background:var(--menu-hover-bg, rgba(90,162,255,.10));}
  .${prefix}-menu .${prefix}-menu-item-selected > div{background:var(--menu-selected-bg, linear-gradient(180deg, rgba(39,224,255,.10), rgba(90,162,255,.08)));}
  .${prefix}-menu .${prefix}-menu-item-selected > div{box-shadow:0 0 0 1px rgba(39,224,255,.16), 0 6px 20px rgba(25,34,83,.35);}
  .${prefix}-menu .${prefix}-menu-item-disabled > div{opacity:.5;cursor:not-allowed;}
  .${prefix}-submenu > ul{list-style:none;margin:6px 0 0;padding-left:16px;}
  `;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export function Menu({ items, mode='vertical', trigger='click', selectedKeys=[], openKeys, defaultOpenKeys=[], onOpenChange, onSelect, prefixCls='ygg', baseStyle='soft', vars, className, style, 'data-testid': dataTestId }: MenuProps) {
  const isHorizontal = mode === 'horizontal';
  const isInline = mode === 'inline';
  const [innerOpen, setInnerOpen] = React.useState<string[]>(defaultOpenKeys);
  const mergedOpen = openKeys ?? innerOpen;
  if (baseStyle !== 'none') ensureBaseStyle(prefixCls);

  const setOpen = (keys: string[]) => {
    if (onOpenChange) onOpenChange(keys);
    if (openKeys === undefined) setInnerOpen(keys);
  };

  const styles: React.CSSProperties = {
    display: isHorizontal ? 'flex' : undefined,
    gap: isHorizontal ? 8 : undefined,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    background: vars?.menuBg,
    color: vars?.menuColor,
    ...(vars?.menuGap ? ({ ['--menu-gap' as any]: vars.menuGap } as any) : {}),
    ...(vars?.menuItemPadding ? ({ ['--menu-item-padding' as any]: vars.menuItemPadding } as any) : {}),
    ...(vars?.menuRadius ? ({ ['--menu-radius' as any]: vars.menuRadius } as any) : {}),
    ...(vars?.menuHoverBg ? ({ ['--menu-hover-bg' as any]: vars.menuHoverBg } as any) : {}),
    ...(vars?.menuSelectedBg ? ({ ['--menu-selected-bg' as any]: vars.menuSelectedBg } as any) : {}),
    ...(vars?.menuSelectedColor ? ({ ['--menu-selected-color' as any]: vars.menuSelectedColor } as any) : {}),
    ...(vars?.menuLabelGap ? ({ ['--menu-label-gap' as any]: vars.menuLabelGap } as any) : {}),
    ...style,
  };

  const rootCls = [
    `${prefixCls}-menu`,
    `${prefixCls}-menu-${isHorizontal ? 'horizontal' : isInline ? 'inline' : 'vertical'}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <ul role={isHorizontal ? 'menubar' : 'menu'} className={rootCls} style={styles} data-testid={dataTestId}>
      {items.map((it) => (
        <MenuNode key={it.key} item={it} isHorizontal={isHorizontal} isInline={isInline} trigger={trigger} selectedKeys={selectedKeys} openKeys={mergedOpen} setOpen={setOpen} onSelect={onSelect} prefixCls={prefixCls} />
      ))}
    </ul>
  );
}

function MenuNode({ item, isHorizontal, isInline, trigger, selectedKeys, openKeys, setOpen, onSelect, prefixCls }: { item: MenuItem; isHorizontal: boolean; isInline: boolean; trigger: 'click' | 'hover'; selectedKeys: string[]; openKeys: string[]; setOpen: (keys: string[]) => void; onSelect?: (info: { key: string }) => void; prefixCls: string; }) {
  const selected = selectedKeys.includes(item.key);
  const open = openKeys.includes(item.key);

  const toggleOpen = () => {
    const exists = openKeys.includes(item.key);
    const next = exists ? openKeys.filter(k => k !== item.key) : [...openKeys, item.key];
    setOpen(next);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;
    if (item.children && isInline) {
      toggleOpen();
      return;
    }
    if (!item.children) onSelect?.({ key: item.key });
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover' && item.children && !isInline) {
      if (!open) setOpen([...openKeys, item.key]);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && item.children && !isInline) {
      if (open) setOpen(openKeys.filter(k => k !== item.key));
    }
  };

  const liStyle: React.CSSProperties = {
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.6 : 1,
  };

  const liCls = [
    item.children ? `${prefixCls}-submenu` : `${prefixCls}-menu-item`,
    item.children && open ? `${prefixCls}-submenu-open` : undefined,
    !item.children ? `${prefixCls}-menu-item${selected ? '-selected' : ''}` : undefined,
    !item.children && item.disabled ? `${prefixCls}-menu-item-disabled` : undefined,
  ].filter(Boolean).join(' ');

  return (
    <li role="none" className={liCls} style={liStyle} aria-disabled={item.disabled || undefined} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div role="menuitem" aria-selected={selected ? 'true' : undefined} onClick={handleClick}>
        <span>{item.label}</span>
      </div>
      {item.children && open && (
        <ul role="menu" style={{ listStyle: 'none', margin: 0, paddingLeft: isHorizontal ? 0 : 16 }}>
          {item.children.map((child) => (
            <MenuNode key={child.key} item={child} isHorizontal={false} isInline={isInline} trigger={trigger} selectedKeys={selectedKeys} openKeys={openKeys} setOpen={setOpen} onSelect={onSelect} prefixCls={prefixCls} />
          ))}
        </ul>
      )}
    </li>
  );
}

