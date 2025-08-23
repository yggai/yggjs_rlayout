/**
 * 科技风格侧边栏组件
 * 
 * 提供可折叠的垂直导航侧边栏，支持多级菜单和科技风格视觉效果
 */

import React from 'react';
import { TechMenu, type TechMenuItem, type LinkLikeComponent } from './TechMenu';
import styles from './TechSidebar.module.css';

export interface TechSidebarProps {
  items: TechMenuItem[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
  onSelectItem?: (item: TechMenuItem) => void;
  linkComponent?: LinkLikeComponent;
  collapsed?: boolean;
  width?: number;
  collapsedWidth?: number;
  headerHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TechSidebar({
  items,
  selectedKey,
  onSelect,
  onSelectItem,
  linkComponent,
  collapsed = false,
  width = 240,
  collapsedWidth = 72,
  headerHeight = 56,
  className = '',
  style = {}
}: TechSidebarProps) {
  const sidebarWidth = collapsed ? collapsedWidth : width;

  const sidebarStyle = {
    width: sidebarWidth,
    '--header-height': `${headerHeight}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={[
        styles.sidebar,
        'tech-scrollbar-thin',
        className
      ].filter(Boolean).join(' ')}
      style={sidebarStyle}
    >
      <TechMenu
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : []}
        onSelect={onSelect ? (info) => onSelect(info.key) : undefined}
        onSelectItem={onSelectItem}
        linkComponent={linkComponent}
        collapsed={collapsed}
      />
    </div>
  );
}
