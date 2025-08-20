import React from 'react';

export type MenuMode = 'horizontal' | 'vertical' | 'inline';
export type MenuItem = { key: string; label: React.ReactNode; disabled?: boolean; children?: MenuItem[] };

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
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
};

export function Menu({ items, mode='vertical', trigger='click', selectedKeys=[], openKeys, defaultOpenKeys=[], onOpenChange, onSelect, prefixCls='ygg', className, style, 'data-testid': dataTestId }: MenuProps) {
  const isHorizontal = mode === 'horizontal';
  const isInline = mode === 'inline';
  const [innerOpen, setInnerOpen] = React.useState<string[]>(defaultOpenKeys);
  const mergedOpen = openKeys ?? innerOpen;

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

