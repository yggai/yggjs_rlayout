import React, { useState } from 'react';
import { Container } from '../components/container';
import { TechThemeProvider } from './TechThemeProvider';
import { TechGlobalStyles } from './TechGlobalStyles';
import { TechHeader, type TechHeaderProps } from './TechHeader';
import { TechSidebar, type TechSidebarProps } from './TechSidebar';
import type { TechMenuItem } from './TechMenu';

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

  return (
    <TechThemeProvider>
      <TechGlobalStyles
        enableScrollbarStyling={enableScrollbarStyling}
        enableGlobalReset={enableGlobalStyles}
      />
      <div className={`tech-layout ${className}`} style={style}>
        <style>{`
          .tech-layout {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: var(--tech-text);
            overflow-x: hidden;
          }

          .tech-main-wrapper {
            display: flex;
            flex: 1;
            min-height: 0;
          }

          .tech-content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            margin-left: ${currentSidebarWidth}px;
            transition: margin-left 0.2s ease;
          }

          .tech-content {
            flex: 1;
            color: var(--tech-text);
            padding-top: ${headerHeight}px;
            overflow-y: auto;
            overflow-x: hidden;
          }

          .tech-content-inner {
            flex: 1;
            min-height: 0;
          }

          .tech-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 16px;
          }

          .tech-card {
            background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
            border: 1px solid var(--tech-border);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 30px rgba(16,19,40,.35) inset;
            transition: all 0.2s ease;
          }

          .tech-card:hover {
            box-shadow: var(--tech-glow);
          }

          /* 响应式布局 */
          @media (max-width: 768px) {
            .tech-content-wrapper {
              margin-left: ${collapsed ? collapsedWidth : sidebarWidth}px;
            }

            .tech-cards {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .tech-content-wrapper {
              margin-left: 0;
            }

            .tech-content {
              padding-top: ${headerHeight + 8}px;
            }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

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
        <div className="tech-main-wrapper">
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
          <div className="tech-content-wrapper">
            {/* Scrollable Content */}
            <div className="tech-content">
              <Container variant="fixed" maxWidth={contentMaxWidth} paddingX={contentPadding}>
                {/* Main Content */}
                <div className="tech-content-inner">
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
