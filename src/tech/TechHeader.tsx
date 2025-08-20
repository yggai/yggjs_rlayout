import React from 'react';
import { Header } from '../components/header';
import { Container } from '../components/container';
import { TechMenu, type TechMenuItem } from './TechMenu';
import { TechSearch } from './TechSearch';
import { TechButton } from './TechButton';

export interface TechHeaderProps {
  brand?: React.ReactNode;
  menuItems?: TechMenuItem[];
  selectedMenuKey?: string;
  onMenuSelect?: (key: string) => void;
  onToggleSidebar?: () => void;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  extra?: React.ReactNode;
  version?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TechHeader({
  brand = 'YGG Admin',
  menuItems = [],
  selectedMenuKey,
  onMenuSelect,
  onToggleSidebar,
  onSearch,
  searchPlaceholder,
  actions,
  extra,
  version,
  className = '',
  style = {}
}: TechHeaderProps) {
  return (
    <>
      <style>{`
        .tech-header {
          backdrop-filter: var(--tech-backdrop);
          border-bottom: 1px solid var(--tech-border);
          background: rgba(13, 18, 40, 0.8);
          z-index: 1000;
        }
        
        .tech-header .tech-brand {
          color: var(--tech-accent);
          font-weight: 700;
          letter-spacing: 0.6px;
          font-size: 16px;
        }
        
        .tech-header .ygg-menu-horizontal {
          gap: 18px;
        }
        
        .tech-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }
        
        .tech-version {
          opacity: 0.7;
          font-size: 12px;
          color: var(--tech-text-muted);
        }
      `}</style>
      
      <Header 
        fixed 
        top={0} 
        height={56} 
        className={`tech-header ${className}`}
        style={style}
      >
        <Container variant="fluid" paddingX={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 左侧：切换按钮和品牌 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {onToggleSidebar && (
                <TechButton
                  variant="toggle"
                  icon="menu"
                  iconOnly
                  onClick={onToggleSidebar}
                  aria-label="toggle sidebar"
                />
              )}
              <div className="tech-brand">{brand}</div>
            </div>

            {/* 中间：导航菜单 */}
            {menuItems.length > 0 && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <TechMenu
                  mode="horizontal"
                  items={menuItems}
                  selectedKeys={selectedMenuKey ? [selectedMenuKey] : []}
                  onSelect={onMenuSelect ? (info) => onMenuSelect(info.key) : undefined}
                />
              </div>
            )}

            {/* 右侧：搜索和操作 */}
            <div className="tech-actions">
              {onSearch && (
                <TechSearch
                  placeholder={searchPlaceholder}
                  onSearch={onSearch}
                />
              )}
              {actions}
              {extra}
              {version && <span className="tech-version">{version}</span>}
            </div>
          </div>
        </Container>
      </Header>
    </>
  );
}
