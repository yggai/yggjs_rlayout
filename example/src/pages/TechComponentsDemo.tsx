import { useLocation } from 'react-router-dom';
import { 
  TechLayout, 
  TechButton,
  TechCard,
  TechBreadcrumb,
  createBreadcrumb,
  type TechMenuItem 
} from 'yggjs_rlayout';

export default function TechComponentsDemo() {
  const location = useLocation();

  // 侧边栏菜单项
  const sidebarItems: TechMenuItem[] = [
    { key: 'home', label: 'Home', icon: 'home', href: '/tech-layout' },
    { key: 'components', label: 'Components', icon: 'api', href: '/tech-components' },
    { key: 'guide', label: 'Guide', icon: 'guide', href: '/docs/guide' },
  ];

  // 创建面包屑导航（简约版）
  const breadcrumbItems = createBreadcrumb()
    .add('Home', '/tech-layout')
    .add('Components', '/tech-components')
    .add('卡片与面包屑')
    .build();

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    if (value.trim()) {
      alert(`正在搜索: "${value}"`);
    }
  };

  return (
    <TechLayout
      // Header配置
      brand="YGG Admin"
      selectedHeaderKey="components"
      onSearch={handleSearch}
      version="v0.1.0"
      
      // Sidebar配置
      sidebarItems={sidebarItems}
      selectedSidebarKey="components"
      
      // 页面头部
      breadcrumb={breadcrumbItems}
      title="卡片与面包屑组件"
      pageActions={
        <>
          <TechButton variant="secondary" icon="plus">新建</TechButton>
          <TechButton variant="primary" icon="deploy">部署</TechButton>
        </>
      }
    >
      {/* 面包屑演示区域 */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          🍞 面包屑导航演示
        </h2>
        
        <TechCard title="简约文字版面包屑（默认）" variant="outlined" style={{ marginBottom: '16px' }}>
          <TechBreadcrumb
            variant="simple"
            items={[
              { key: '1', label: 'Home', href: '/' },
              { key: '2', label: 'Products', href: '/products' },
              { key: '3', label: 'Electronics', href: '/products/electronics' },
              { key: '4', label: 'Smartphones' }
            ]}
          />
        </TechCard>

        <TechCard title="图标版面包屑" variant="outlined" style={{ marginBottom: '16px' }}>
          <TechBreadcrumb
            variant="icon"
            showHome={true}
            items={[
              { key: '1', label: 'Home', href: '/', icon: 'home' },
              { key: '2', label: 'Products', href: '/products', icon: 'api' },
              { key: '3', label: 'Electronics', href: '/products/electronics', icon: 'guide' },
              { key: '4', label: 'Smartphones' }
            ]}
          />
        </TechCard>

        <TechCard title="限制显示项目数（简约版）" variant="outlined" style={{ marginBottom: '16px' }}>
          <TechBreadcrumb
            variant="simple"
            maxItems={3}
            items={[
              { key: '1', label: 'Home', href: '/' },
              { key: '2', label: 'Category', href: '/category' },
              { key: '3', label: 'Subcategory', href: '/subcategory' },
              { key: '4', label: 'Product Type', href: '/product-type' },
              { key: '5', label: 'Specific Product' }
            ]}
          />
        </TechCard>

        <TechCard title="自定义分隔符（简约版）" variant="outlined" style={{ marginBottom: '16px' }}>
          <TechBreadcrumb
            variant="simple"
            separator={<span style={{ color: 'var(--tech-accent)' }}>→</span>}
            items={[
              { key: '1', label: 'Dashboard', href: '/dashboard' },
              { key: '2', label: 'Settings', href: '/settings' },
              { key: '3', label: 'Profile' }
            ]}
          />
        </TechCard>

        <TechCard title="对比：图标版 vs 简约版" variant="gradient">
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: 'var(--tech-text)', fontSize: '13px' }}>图标版：</strong>
            <div style={{ marginTop: '6px' }}>
              <TechBreadcrumb
                variant="icon"
                showHome={true}
                items={[
                  { key: '1', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
                  { key: '2', label: 'Settings', href: '/settings', icon: 'settings' },
                  { key: '3', label: 'Profile' }
                ]}
              />
            </div>
          </div>
          <div>
            <strong style={{ color: 'var(--tech-text)', fontSize: '13px' }}>简约版：</strong>
            <div style={{ marginTop: '6px' }}>
              <TechBreadcrumb
                variant="simple"
                items={[
                  { key: '1', label: 'Dashboard', href: '/dashboard' },
                  { key: '2', label: 'Settings', href: '/settings' },
                  { key: '3', label: 'Profile' }
                ]}
              />
            </div>
          </div>
        </TechCard>
      </div>

      {/* 卡片演示区域 */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          🃏 卡片组件演示
        </h2>
        
        <div className="tech-cards">
          <TechCard
            title="默认卡片"
            subtitle="基础样式的卡片"
            icon="dashboard"
            variant="default"
            hoverable
          >
            这是一个默认样式的卡片，具有渐变背景和内阴影效果。
            悬停时会显示发光边框。
          </TechCard>

          <TechCard
            title="描边卡片"
            subtitle="只有边框的简洁卡片"
            icon="api"
            variant="outlined"
            hoverable
          >
            这是一个描边卡片，背景透明，只有边框线条。
            适合需要简洁设计的场景。
          </TechCard>

          <TechCard
            title="填充卡片"
            subtitle="实色背景的卡片"
            icon="guide"
            variant="filled"
            hoverable
          >
            这是一个填充卡片，使用实色背景。
            提供更强的视觉对比度。
          </TechCard>

          <TechCard
            title="玻璃卡片"
            subtitle="毛玻璃效果的现代卡片"
            icon="book"
            variant="glass"
            hoverable
          >
            这是一个玻璃效果卡片，具有毛玻璃背景和模糊效果。
            非常适合现代化的界面设计。
          </TechCard>

          <TechCard
            title="渐变卡片"
            subtitle="带有渐变背景的卡片"
            icon="deploy"
            variant="gradient"
            hoverable
          >
            这是一个渐变卡片，使用科技风的渐变色彩。
            营造出未来感的视觉效果。
          </TechCard>

          <TechCard
            title="可点击卡片"
            subtitle="点击我试试看"
            icon="user"
            variant="default"
            clickable
            onClick={() => alert('卡片被点击了！')}
          >
            这是一个可点击的卡片，点击会触发相应的事件。
            鼠标悬停时会有特殊的交互效果。
          </TechCard>
        </div>
      </div>

      {/* 卡片尺寸演示 */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          📏 卡片尺寸演示
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TechCard
            title="小卡片"
            icon="home"
            variant="outlined"
            size="small"
            hoverable
            style={{ flex: '0 0 200px' }}
          >
            小尺寸卡片
          </TechCard>

          <TechCard
            title="中等卡片"
            subtitle="默认尺寸"
            icon="api"
            variant="default"
            size="medium"
            hoverable
            style={{ flex: '0 0 250px' }}
          >
            中等尺寸卡片，这是默认的尺寸。
          </TechCard>

          <TechCard
            title="大卡片"
            subtitle="更大的卡片适合更多内容"
            icon="deploy"
            variant="gradient"
            size="large"
            hoverable
            style={{ flex: '0 0 300px' }}
          >
            大尺寸卡片，可以容纳更多的内容和信息。
            适合作为主要的内容展示区域。
          </TechCard>
        </div>
      </div>

      {/* 卡片状态演示 */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          ⚡ 卡片状态演示
        </h2>
        
        <div className="tech-cards">
          <TechCard
            title="正常状态"
            subtitle="可以正常交互"
            icon="dashboard"
            variant="default"
            hoverable
          >
            这是正常状态的卡片，可以正常交互。
          </TechCard>

          <TechCard
            title="加载状态"
            subtitle="正在加载中..."
            icon="api"
            variant="default"
            loading
          >
            这个卡片正在加载中，会显示加载遮罩。
          </TechCard>

          <TechCard
            title="禁用状态"
            subtitle="无法交互"
            icon="settings"
            variant="default"
            disabled
          >
            这个卡片被禁用了，无法进行交互。
          </TechCard>
        </div>
      </div>

      {/* 带操作按钮的卡片 */}
      <div>
        <h2 style={{ color: 'var(--tech-text)', marginBottom: '16px' }}>
          🎛️ 带操作的卡片
        </h2>
        
        <div className="tech-cards">
          <TechCard
            title="用户设置"
            subtitle="管理用户账户和偏好"
            icon="user"
            variant="default"
            hoverable
            extra={<TechButton variant="ghost" size="small" icon="settings" iconOnly />}
            actions={
              <>
                <TechButton variant="ghost" size="small">取消</TechButton>
                <TechButton variant="primary" size="small">保存</TechButton>
              </>
            }
          >
            这个卡片包含了额外的操作按钮，右上角有设置按钮，
            底部有操作按钮区域。
          </TechCard>

          <TechCard
            title="项目部署"
            subtitle="部署到生产环境"
            icon="deploy"
            variant="gradient"
            hoverable
            actions={
              <>
                <TechButton variant="secondary" size="small" icon="guide">查看日志</TechButton>
                <TechButton variant="primary" size="small" icon="deploy">立即部署</TechButton>
              </>
            }
          >
            准备将项目部署到生产环境。请确认所有配置都已正确设置。
          </TechCard>
        </div>
      </div>
    </TechLayout>
  );
}
