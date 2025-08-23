import React, { useState } from 'react';
import { Container } from '../components/container';
import { TechThemeProvider } from './TechThemeProvider';
import { TechGlobalStyles } from './TechGlobalStyles';
import { TechHeader, type TechHeaderProps } from './TechHeader';
import { TechSidebar, type TechSidebarProps } from './TechSidebar';
import type { TechMenuItem } from './TechMenu';
import styles from './TechLayout.module.css';

export interface TechLayoutProps {
  children: React.ReactNode;

  // Header props
  brand?: React.ReactNode;
  headerMenuItems?: TechHeaderProps['menuItems'];
  selectedHeaderKey?: string;
  onHeaderMenuSelect?: (key: string) => void;
  onHeaderMenuSelectItem?: (item: TechMenuItem) => void;
  headerMenuLinkComponent?: React.ComponentProps<typeof TechHeader>['menuLinkComponent'];
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  headerActions?: React.ReactNode;
  headerExtra?: React.ReactNode;
  version?: string;

  // Sidebar props
  sidebarItems: TechSidebarProps['items'];
  selectedSidebarKey?: string;
  onSidebarSelect?: (key: string) => void;
  onSidebarSelectItem?: (item: TechMenuItem) => void;
  sidebarLinkComponent?: React.ComponentProps<typeof TechSidebar>['linkComponent'];

  // Layout props
  defaultCollapsed?: boolean;
  sidebarWidth?: number;
  collapsedWidth?: number;
  headerHeight?: number;

  // Content props
  contentMaxWidth?: number;
  contentPadding?: number;
  enableGlobalStyles?: boolean;
  enableScrollbarStyling?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export function TechLayout({
  children,

  // Header
  brand,
  headerMenuItems,
  selectedHeaderKey,
  onHeaderMenuSelect,
  onHeaderMenuSelectItem,
  headerMenuLinkComponent,
  onSearch,
  searchPlaceholder,
  headerActions,
  headerExtra,
  version,

  // Sidebar
  sidebarItems,
  selectedSidebarKey,
  onSidebarSelect,
  onSidebarSelectItem,
  sidebarLinkComponent,

  // Layout
  defaultCollapsed = false,
  sidebarWidth = 240,
  collapsedWidth = 72,
  headerHeight = 56,

  // Content
  contentMaxWidth = 1280,
  contentPadding = 16,
  enableGlobalStyles = true,
  enableScrollbarStyling = true,

  className = '',
  style = {}
}: TechLayoutProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const currentSidebarWidth = collapsed ? collapsedWidth : sidebarWidth;

  const layoutStyle = {
    ...style,
    '--sidebar-width': `${currentSidebarWidth}px`,
    '--header-height': `${headerHeight}px`,
    '--header-height-mobile': `${headerHeight + 8}px`,
  } as React.CSSProperties;

  return (
    <TechThemeProvider>
      <TechGlobalStyles
        enableScrollbarStyling={enableScrollbarStyling}
        enableGlobalReset={enableGlobalStyles}
      />
      <div className={[styles.layout, className].filter(Boolean).join(' ')} style={layoutStyle}>
        {/* Header */}
        <TechHeader
          brand={brand}
          menuItems={headerMenuItems}
          selectedMenuKey={selectedHeaderKey}
          onMenuSelect={onHeaderMenuSelect}
          onMenuSelectItem={onHeaderMenuSelectItem}
          menuLinkComponent={headerMenuLinkComponent}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          actions={headerActions}
          extra={headerExtra}
          version={version}
        />

        {/* Main Content Area */}
        <div className={styles.mainWrapper}>
          {/* Sidebar */}
          <TechSidebar
            items={sidebarItems}
            selectedKey={selectedSidebarKey}
            onSelect={onSidebarSelect}
            onSelectItem={onSidebarSelectItem}
            linkComponent={sidebarLinkComponent}
            collapsed={collapsed}
            width={sidebarWidth}
            collapsedWidth={collapsedWidth}
            headerHeight={headerHeight}
          />

          {/* Content Wrapper */}
          <div className={styles.contentWrapper}>
            {/* Scrollable Content */}
            <div className={styles.content}>
              <Container variant="fixed" maxWidth={contentMaxWidth} paddingX={contentPadding}>
                {/* Main Content */}
                <div className={styles.contentInner}>
                  {children}
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </TechThemeProvider>
  );
}
