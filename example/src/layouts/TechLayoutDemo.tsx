import { useLocation, Outlet } from 'react-router-dom';
import {
  TechLayout,
  TechFooter,
  TechPageHeader,
  TechButton,
  TechUserCenter,
  createBreadcrumb,
  type TechMenuItem,
  type TechUserCenterItem,
} from 'yggjs_rlayout/tech';
import { LinkAdapter } from '../components/LinkAdapter';
import { 
  headerMenuItems, 
  sidebarItems, 
  userCenterItems, 
  footerSections, 
  socialLinks 
} from '../config/menuConfig';
import { useMenuSelection } from '../hooks/useMenuSelection';

export default function TechLayoutDemo() {
  const location = useLocation();
  const { selectedHeaderKey, selectedSidebarKey } = useMenuSelection(location.pathname);

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    if (value.trim()) {
      alert(`正在搜索: "${value}"`);
    }
  };

  const handleMenuSelect = (key: string) => {
    console.log('Header menu selected:', key);
  };

  const handleSidebarSelect = (key: string) => {
    console.log('Sidebar menu selected:', key);
  };

  const breadcrumbItems = createBreadcrumb()
    .add('Dashboard', '/')
    .add('SPA 导航演示')
    .build();

  return (
    <TechLayout
      brand="YGG Admin"
      headerMenuItems={headerMenuItems}
      selectedHeaderKey={selectedHeaderKey}
      onHeaderMenuSelect={handleMenuSelect}
      onSearch={handleSearch}
      headerExtra={
        <TechUserCenter
          username="张三"
          userInfo="zhangsan@example.com"
          items={userCenterItems}
          showUsername={false}
          onAvatarClick={() => console.log('Avatar clicked')}
        />
      }
      version="v0.1.0"
      sidebarItems={sidebarItems}
      selectedSidebarKey={selectedSidebarKey}
      onSidebarSelect={handleSidebarSelect}
      headerMenuLinkComponent={LinkAdapter}
      sidebarLinkComponent={LinkAdapter}
    >
      <TechPageHeader
        breadcrumb={breadcrumbItems}
        title="YGG Admin - SPA 导航演示"
        actions={
          <>
            <TechButton variant="secondary">New</TechButton>
            <TechButton variant="primary" icon="deploy">Deploy</TechButton>
          </>
        }
      />

      <Outlet />

      <TechFooter
        brand="YGG Admin"
        version="v0.1.0"
        description="YGG Admin 是一个现代化的科技风管理后台框架，提供完整的布局解决方案和组件库。"
        sections={footerSections}
        socialLinks={socialLinks}
        copyright="© 2024 YGG Admin. All rights reserved."
      />
    </TechLayout>
  );
}