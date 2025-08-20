# Menu 组件 v0.1.0

一个精简、易定制的菜单组件，API 对齐 antd 的常见用法。默认无样式/低样式输出，便于按需自定义皮肤。

## API
- items: MenuItem[]
  - { key: string; label: ReactNode; disabled?: boolean; children?: MenuItem[] }
- mode?: 'horizontal' | 'vertical' | 'inline'（默认 vertical）
- trigger?: 'click' | 'hover'（默认 'click'）
- selectedKeys?: string[] 受控选中项
- openKeys?: string[] 受控展开的子菜单 key；defaultOpenKeys?: string[] 非受控初始展开
- onOpenChange?: (keys: string[]) => void 展开项变化时触发
- onSelect?: (info: { key: string }) => void 点击叶子项时触发
- prefixCls?: string 类名前缀（默认 'ygg'）
- className?: string; style?: React.CSSProperties

可访问性（a11y）：
- 容器：role=menubar（横向）或 role=menu（纵向）
- 项：role=menuitem；选中项 aria-selected=true；禁用项 aria-disabled

视觉预设 classNames（可覆盖）：
- 根：ygg-menu、ygg-menu-horizontal、ygg-menu-vertical、ygg-menu-inline
- 子菜单：ygg-submenu、ygg-submenu-open
- 菜单项：ygg-menu-item、ygg-menu-item-selected、ygg-menu-item-disabled
- 支持 prefixCls 覆盖前缀（默认 'ygg'）

## 用法
```tsx
import { Menu, type MenuItem, computeSelectionFromPath } from 'yggjs_rlayout';

const items: MenuItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Docs', children: [
    { key: 'guide', label: 'Guide' },
    { key: 'api', label: 'API' },
  ]},
  { key: 'about', label: 'About', disabled: true },
];

export default function Demo(){
  const [selected, setSelected] = useState<string[]>(['home']);
  const location = useLocation();
  const { selectedKey, openKeys } = computeSelectionFromPath(
    items.map(({ key, label, disabled, children }) => ({ key, path: (items as any).find((i:any)=>i.key===key)?.path, children })),
    location.pathname,
    { match: 'startsWith' }
  );

  useEffect(() => {
    if (selectedKey) setSelected([selectedKey]);
  }, [selectedKey]);

  return (
    <>
      {/* 顶部导航（根据当前路由自动高亮）*/}
      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={selected}
        onSelect={({ key }) => setSelected([key])}
        style={{ gap: 16 }}
        openKeys={openKeys}
      />

      {/* 侧边栏（根据路由展开）*/}
      <Menu
        items={items}
        openKeys={openKeys}
        selectedKeys={selected}
        style={{ padding: 8 }}
      />
    </>
  );
}
```

## 自定义样式建议
- 使用 className/style 在外部控制排版、颜色、间距、选中态样式
- 可为选中项添加父级选择器规则：[aria-selected="true"] { font-weight: 600; }
- 禁用项可使用 [aria-disabled="true"] { opacity: .5; cursor: not-allowed; }

示例主题覆盖（放到项目样式中）：
```css
.ygg-menu-horizontal { gap: 12px; }
.ygg-menu-item-selected { color: var(--primary); border-bottom: 2px solid var(--primary); }
.ygg-submenu > ul { margin-top: 6px; }
.ygg-menu-item-disabled { opacity: .5; cursor: not-allowed; }
```

