import React from 'react';
import { Sidebar } from '../components/sidebar';
import { TechMenu, type TechMenuItem } from './TechMenu';

export interface TechSidebarProps {
  items: TechMenuItem[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
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
  collapsed = false,
  width = 240,
  collapsedWidth = 72,
  headerHeight = 56,
  className = '',
  style = {}
}: TechSidebarProps) {
  const sidebarWidth = collapsed ? collapsedWidth : width;

  return (
    <>
      <style>{`
        .tech-sidebar {
          height: calc(100vh - ${headerHeight}px);
          border-right: 1px solid var(--tech-border);
          box-shadow: inset -1px 0 0 var(--tech-border);
          overflow: auto;
          background: linear-gradient(180deg, rgba(39,224,255,.06), rgba(90,162,255,.04));
        }
        
        .tech-sidebar .ygg-menu {
          padding: 8px;
        }
        
        .tech-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        
        .tech-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .tech-sidebar::-webkit-scrollbar-thumb {
          background: var(--tech-border);
          border-radius: 2px;
        }
        
        .tech-sidebar::-webkit-scrollbar-thumb:hover {
          background: var(--tech-muted);
        }
      `}</style>
      
      <Sidebar
        fixed
        width={sidebarWidth}
        className={`tech-sidebar ${collapsed ? 'collapsed' : ''} ${className}`}
        style={{
          top: headerHeight,
          ...style
        }}
      >
        <div style={{ padding: 8 }}>
          <TechMenu
            items={items}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onSelect={onSelect ? (info) => onSelect(info.key) : undefined}
            collapsed={collapsed}
          />
        </div>
      </Sidebar>
    </>
  );
}
