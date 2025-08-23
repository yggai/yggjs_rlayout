/**
 * 科技风格头部导航组件
 * 
 * 提供科技风格的应用头部导航，包含品牌logo、水平菜单、搜索框和操作按钮
 * 具有响应式设计和科技感的视觉效果
 */

import React from 'react';
import { Header } from '../components/header';
import { Container } from '../components/container';
import { TechMenu, type TechMenuItem, type LinkLikeComponent } from './TechMenu';
import { TechSearch } from './TechSearch';
import { TechButton } from './TechButton';
import styles from './TechHeader.module.css';

export interface TechHeaderProps {
  brand?: React.ReactNode;
  menuItems?: TechMenuItem[];
  selectedMenuKey?: string;
  onMenuSelect?: (key: string) => void;
  onMenuSelectItem?: (item: TechMenuItem) => void;
  menuLinkComponent?: LinkLikeComponent;
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
  onMenuSelectItem,
  menuLinkComponent,
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
    <Header
      fixed
      top={0}
      height={56}
      className={[styles.header, className].filter(Boolean).join(' ')}
      style={style}
    >
      <Container variant="fluid" paddingX={16}>
        <div className={styles.container}>
          {/* 左侧：切换按钮和品牌 */}
          <div className={styles.left}>
            {onToggleSidebar && (
              <TechButton
                variant="toggle"
                icon="menu"
                iconOnly
                onClick={onToggleSidebar}
                aria-label="toggle sidebar"
              />
            )}
            <div className={styles.brand}>{brand}</div>
          </div>

          {/* 中间：导航菜单 */}
          {menuItems.length > 0 && (
            <div className={styles.menuContainer}>
              <TechMenu
                mode="horizontal"
                items={menuItems}
                selectedKeys={selectedMenuKey ? [selectedMenuKey] : []}
                onSelect={onMenuSelect ? (info) => onMenuSelect(info.key) : undefined}
                onSelectItem={onMenuSelectItem}
                linkComponent={menuLinkComponent}
              />
            </div>
          )}

          {/* 右侧：搜索和操作 */}
          <div className={styles.actions}>
            {onSearch && (
              <TechSearch
                placeholder={searchPlaceholder}
                onSearch={onSearch}
              />
            )}
            {actions}
            {extra}
            {version && <span className={styles.version}>{version}</span>}
          </div>
        </div>
      </Container>
    </Header>
  );
}
