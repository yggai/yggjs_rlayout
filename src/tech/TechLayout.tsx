import React, { useState } from 'react';
import { Container } from '../components/container';
import { TechThemeProvider } from './TechThemeProvider';
import { TechHeader, type TechHeaderProps } from './TechHeader';
import { TechSidebar, type TechSidebarProps } from './TechSidebar';
import { TechButton } from './TechButton';

export interface TechLayoutProps {
  children: React.ReactNode;
  
  // Header props
  brand?: React.ReactNode;
  headerMenuItems?: TechHeaderProps['menuItems'];
  selectedHeaderKey?: string;
  onHeaderMenuSelect?: (key: string) => void;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  headerActions?: React.ReactNode;
  version?: string;
  
  // Sidebar props
  sidebarItems: TechSidebarProps['items'];
  selectedSidebarKey?: string;
  onSidebarSelect?: (key: string) => void;
  
  // Layout props
  defaultCollapsed?: boolean;
  sidebarWidth?: number;
  collapsedWidth?: number;
  headerHeight?: number;
  
  // Content props
  contentMaxWidth?: number;
  contentPadding?: number;
  
  // Page header
  breadcrumb?: string;
  title?: string;
  pageActions?: React.ReactNode;
  
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
  onSearch,
  searchPlaceholder,
  headerActions,
  version,
  
  // Sidebar
  sidebarItems,
  selectedSidebarKey,
  onSidebarSelect,
  
  // Layout
  defaultCollapsed = false,
  sidebarWidth = 240,
  collapsedWidth = 72,
  headerHeight = 56,
  
  // Content
  contentMaxWidth = 1280,
  contentPadding = 16,
  
  // Page header
  breadcrumb,
  title,
  pageActions,
  
  className = '',
  style = {}
}: TechLayoutProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const currentSidebarWidth = collapsed ? collapsedWidth : sidebarWidth;

  return (
    <TechThemeProvider>
      <div className={`tech-layout ${className}`} style={style}>
        <style>{`
          .tech-layout {
            min-height: 100vh;
            color: var(--tech-text);
          }
          
          .tech-content {
            color: var(--tech-text);
            padding-top: ${headerHeight}px;
            padding-left: ${currentSidebarWidth}px;
            transition: padding-left 0.2s ease;
          }
          
          .tech-page-header {
            display: flex;
            align-items: end;
            justify-content: space-between;
            padding: 16px 0 10px;
            margin-bottom: 24px;
          }
          
          .tech-breadcrumb {
            color: var(--tech-muted);
            font-size: 12px;
            margin-bottom: 6px;
          }
          
          .tech-title {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: var(--tech-text);
          }
          
          .tech-page-actions {
            display: flex;
            gap: 10px;
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
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          actions={headerActions}
          version={version}
        />

        {/* Sidebar */}
        <TechSidebar
          items={sidebarItems}
          selectedKey={selectedSidebarKey}
          onSelect={onSidebarSelect}
          collapsed={collapsed}
          width={sidebarWidth}
          collapsedWidth={collapsedWidth}
          headerHeight={headerHeight}
        />

        {/* Content */}
        <div className="tech-content">
          <Container variant="fixed" maxWidth={contentMaxWidth} paddingX={contentPadding}>
            {/* Page Header */}
            {(breadcrumb || title || pageActions) && (
              <div className="tech-page-header">
                <div>
                  {breadcrumb && <div className="tech-breadcrumb">{breadcrumb}</div>}
                  {title && <h1 className="tech-title">{title}</h1>}
                </div>
                {pageActions && (
                  <div className="tech-page-actions">
                    {pageActions}
                  </div>
                )}
              </div>
            )}
            
            {/* Main Content */}
            {children}
          </Container>
        </div>
      </div>
    </TechThemeProvider>
  );
}
