/**
 * 科技风格布局组件
 * 
 * 提供完整的科技风格应用布局，集成了：
 * - 主题提供器和全局样式
 * - 响应式头部导航
 * - 可折叠侧边栏
 * - 内容区域容器
 * - 统一的布局管理
 * 
 * 布局特色：
 * - 深色科技主题的整体视觉风格
 * - 响应式设计，支持移动端适配
 * - 平滑的侧边栏折叠动画
 * - 灵活的内容区域配置
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Container } from '../components/container';
import { TechThemeProvider } from './TechThemeProvider';
import { TechGlobalStyles } from './TechGlobalStyles';
import { TechHeader, type TechHeaderProps } from './TechHeader';
import { TechSidebar, type TechSidebarProps } from './TechSidebar';
import type { TechMenuItem } from './TechMenu';
import styles from './TechLayout.module.css';

/**
 * 科技风格布局组件的属性接口
 * 整合了头部、侧边栏、内容区域的所有配置选项
 */
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

/**
 * 科技风格布局组件
 * 
 * 提供完整的应用布局解决方案，包括主题、导航、侧边栏和内容区域
 * 
 * @example
 * ```tsx
 * <TechLayout
 *   brand="我的应用"
 *   sidebarItems={menuItems}
 *   selectedSidebarKey="dashboard"
 *   onSidebarSelect={handleMenuSelect}
 * >
 *   <div>主要内容区域</div>
 * </TechLayout>
 * ```
 */
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
  
  // 使用useMemo优化侧边栏宽度计算
  const currentSidebarWidth = useMemo(() => 
    collapsed ? collapsedWidth : sidebarWidth, 
    [collapsed, collapsedWidth, sidebarWidth]
  );

  // 使用useMemo优化样式对象计算
  const layoutStyle = useMemo((): React.CSSProperties => ({
    ...style,
    '--sidebar-width': `${currentSidebarWidth}px`,
    '--header-height': `${headerHeight}px`,
    '--header-height-mobile': `${headerHeight + 8}px`,
  }), [style, currentSidebarWidth, headerHeight]);

  // 使用useCallback优化侧边栏切换函数
  const handleToggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

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
          onToggleSidebar={handleToggleSidebar}
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
