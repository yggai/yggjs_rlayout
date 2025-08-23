import React from 'react';

/** 菜单显示模式类型 */
export type MenuMode = 'horizontal' | 'vertical' | 'inline';

/**
 * 菜单项数据结构
 * @description 定义单个菜单项的数据结构
 */
export type MenuItem = {
  /** 菜单项的唯一标识符 */
  key: string;
  /** 菜单项显示的标签内容 */
  label: React.ReactNode;
  /** 是否禁用该菜单项 */
  disabled?: boolean;
  /** 子菜单项列表 */
  children?: MenuItem[];
};

/** 菜单基础样式类型 */
export type MenuBaseStyle = 'none' | 'soft';

/**
 * 菜单样式变量配置
 * @description 用于自定义菜单的外观样式
 */
export type MenuVars = {
  /** 菜单背景色 */
  menuBg?: string;
  /** 菜单文字颜色 */
  menuColor?: string;
  /** 菜单静音状态颜色 */
  menuMuted?: string;
  /** 菜单项悬停背景色 */
  menuHoverBg?: string;
  /** 菜单项选中背景色 */
  menuSelectedBg?: string;
  /** 菜单项选中文字颜色 */
  menuSelectedColor?: string;
  /** 菜单项圆角大小 */
  menuRadius?: string;
  /** 菜单项内边距，例如 '8px 12px' */
  menuItemPadding?: string;
  /** 水平菜单项之间的间距 */
  menuGap?: string;
  /** 菜单项图标和文字之间的间距 */
  menuLabelGap?: string;
};

/**
 * Menu 组件的属性类型定义
 * @description 定义了菜单组件所有可配置的属性
 */
export type MenuProps = {
  /** 菜单项数据数组 */
  items: MenuItem[];
  /** 菜单显示模式：水平、垂直或内联，默认为 'vertical' */
  mode?: MenuMode;
  /** 子菜单触发方式：点击或悬停，默认为 'click' */
  trigger?: 'click' | 'hover';
  /** 当前选中的菜单项key数组 */
  selectedKeys?: string[];
  /** 当前展开的子菜单key数组 */
  openKeys?: string[];
  /** 默认展开的子菜单key数组 */
  defaultOpenKeys?: string[];
  /** 展开/收起子菜单时的回调函数 */
  onOpenChange?: (keys: string[]) => void;
  /** 选择菜单项时的回调函数 */
  onSelect?: (info: { key: string }) => void;
  /** CSS 类名前缀，默认为 'ygg' */
  prefixCls?: string;
  /** 基础样式类型，是否注入默认的最小CSS样式 */
  baseStyle?: MenuBaseStyle;
  /** CSS 变量覆盖配置，应用于根元素 */
  vars?: MenuVars;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 测试标识符 */
  'data-testid'?: string;
};

/**
 * 确保菜单基础样式已注入到页面中
 * @description 在客户端环境中向页面注入菜单组件的基础CSS样式
 * @param prefix - CSS类名前缀
 */
function ensureBaseStyle(prefix: string) {
  // 服务端渲染环境下直接返回
  if (typeof document === 'undefined') return;
  
  const id = `${prefix}-menu-base-style`;
  // 如果样式已存在则不重复注入
  if (document.getElementById(id)) return;
  
  // 菜单组件的基础CSS样式
  const css = `
  /* 菜单组件的CSS重置样式 */
  .${prefix}-menu, .${prefix}-menu ul, .${prefix}-menu li, .${prefix}-menu a,
  .${prefix}-menu div, .${prefix}-menu span, .${prefix}-menu svg{
    margin:0; padding:0; border:0; background:none; list-style:none; box-sizing:border-box;
  }
  .${prefix}-menu a{ color:inherit; text-decoration:none; }

  .${prefix}-menu{list-style:none;margin:0;padding:0;color:var(--menu-color, #cfe1ff);}
  .${prefix}-menu-horizontal{display:flex;align-items:center;gap:var(--menu-gap,12px);}
  .${prefix}-menu > li > div{padding:var(--menu-item-padding,8px 12px);border-radius:var(--menu-radius,10px);}
  .${prefix}-menu > li > div > span{display:inline-flex;align-items:center;gap:var(--menu-label-gap,8px);}
  .${prefix}-menu .nav{display:inline-flex;align-items:center;gap:var(--menu-label-gap,8px);}
  .${prefix}-menu > li:hover > div{background:var(--menu-hover-bg, rgba(90,162,255,.10));}
  .${prefix}-menu .${prefix}-menu-item-selected > div{background:var(--menu-selected-bg, linear-gradient(180deg, rgba(39,224,255,.10), rgba(90,162,255,.08)));}
  .${prefix}-menu .${prefix}-menu-item-selected > div{box-shadow:0 0 0 1px rgba(39,224,255,.16), 0 6px 20px rgba(25,34,83,.35);}
  .${prefix}-menu .${prefix}-menu-item-disabled > div{opacity:.5;cursor:not-allowed;}
  .${prefix}-submenu > ul{list-style:none;margin:6px 0 0;padding-left:16px;}
  `;
  
  // 创建style元素并添加到页面头部
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Menu 菜单组件
 * @description 用于创建可交互的导航菜单，支持多种显示模式和交互方式
 * @param props - Menu组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础垂直菜单
 * const items = [
 *   { key: '1', label: '首页' },
 *   { key: '2', label: '产品', children: [
 *     { key: '2-1', label: '产品A' },
 *     { key: '2-2', label: '产品B' }
 *   ]},
 *   { key: '3', label: '关于我们' }
 * ];
 * <Menu items={items} onSelect={(info) => console.log(info.key)} />
 * 
 * // 水平菜单
 * <Menu items={items} mode="horizontal" />
 * 
 * // 悬停触发的菜单
 * <Menu items={items} trigger="hover" />
 * ```
 */
export function Menu({ items, mode='vertical', trigger='click', selectedKeys=[], openKeys, defaultOpenKeys=[], onOpenChange, onSelect, prefixCls='ygg', baseStyle='soft', vars, className, style, 'data-testid': dataTestId }: MenuProps) {
  // 判断菜单显示模式
  const isHorizontal = mode === 'horizontal';
  const isInline = mode === 'inline';
  
  // 内部管理的展开状态
  const [innerOpen, setInnerOpen] = React.useState<string[]>(defaultOpenKeys);
  const mergedOpen = openKeys ?? innerOpen; // 优先使用外部传入的openKeys
  
  // 如果启用了基础样式，则注入CSS
  if (baseStyle !== 'none') ensureBaseStyle(prefixCls);

  // 更新展开状态的统一处理函数
  const setOpen = (keys: string[]) => {
    if (onOpenChange) onOpenChange(keys); // 触发外部回调
    if (openKeys === undefined) setInnerOpen(keys); // 非受控模式下更新内部状态
  };

  // 构建菜单根元素的样式
  const styles: React.CSSProperties = {
    display: isHorizontal ? 'flex' : undefined, // 水平模式使用flex布局
    gap: isHorizontal ? 8 : undefined, // 水平模式设置间距
    listStyle: 'none', // 去除列表样式
    margin: 0,
    padding: 0,
    background: vars?.menuBg, // 自定义背景色
    color: vars?.menuColor, // 自定义文字颜色
    // 将样式变量转换为CSS变量
    ...(vars?.menuGap ? ({ ['--menu-gap' as any]: vars.menuGap } as any) : {}),
    ...(vars?.menuItemPadding ? ({ ['--menu-item-padding' as any]: vars.menuItemPadding } as any) : {}),
    ...(vars?.menuRadius ? ({ ['--menu-radius' as any]: vars.menuRadius } as any) : {}),
    ...(vars?.menuHoverBg ? ({ ['--menu-hover-bg' as any]: vars.menuHoverBg } as any) : {}),
    ...(vars?.menuSelectedBg ? ({ ['--menu-selected-bg' as any]: vars.menuSelectedBg } as any) : {}),
    ...(vars?.menuSelectedColor ? ({ ['--menu-selected-color' as any]: vars.menuSelectedColor } as any) : {}),
    ...(vars?.menuLabelGap ? ({ ['--menu-label-gap' as any]: vars.menuLabelGap } as any) : {}),
    ...style, // 合并自定义样式
  };

  // 构建根元素CSS类名
  const rootCls = [
    `${prefixCls}-menu`, // 基础类名
    `${prefixCls}-menu-${isHorizontal ? 'horizontal' : isInline ? 'inline' : 'vertical'}`, // 模式类名
    className // 自定义类名
  ].filter(Boolean).join(' ');

  return (
    <ul role={isHorizontal ? 'menubar' : 'menu'} className={rootCls} style={styles} data-testid={dataTestId}>
      {items.map((it) => (
        <MenuNode key={it.key} item={it} isHorizontal={isHorizontal} isInline={isInline} trigger={trigger} selectedKeys={selectedKeys} openKeys={mergedOpen} setOpen={setOpen} onSelect={onSelect} prefixCls={prefixCls} />
      ))}
    </ul>
  );
}

/**
 * MenuNode 菜单节点组件
 * @description 渲染单个菜单项，处理选中状态、展开状态和用户交互
 * @param props - 菜单节点的属性
 * @param props.item - 菜单项数据
 * @param props.isHorizontal - 是否为水平布局
 * @param props.isInline - 是否为内联模式
 * @param props.trigger - 子菜单触发方式
 * @param props.selectedKeys - 选中的菜单项key数组
 * @param props.openKeys - 展开的子菜单key数组
 * @param props.setOpen - 设置展开状态的回调函数
 * @param props.onSelect - 选择菜单项的回调函数
 * @param props.prefixCls - CSS类名前缀
 * @returns React.JSX.Element
 */
function MenuNode({ item, isHorizontal, isInline, trigger, selectedKeys, openKeys, setOpen, onSelect, prefixCls }: { item: MenuItem; isHorizontal: boolean; isInline: boolean; trigger: 'click' | 'hover'; selectedKeys: string[]; openKeys: string[]; setOpen: (keys: string[]) => void; onSelect?: (info: { key: string }) => void; prefixCls: string; }) {
  // 判断当前菜单项是否被选中
  const selected = selectedKeys.includes(item.key);
  // 判断当前子菜单是否展开
  const open = openKeys.includes(item.key);

  // 切换子菜单展开/收起状态
  const toggleOpen = () => {
    const exists = openKeys.includes(item.key);
    const next = exists ? openKeys.filter(k => k !== item.key) : [...openKeys, item.key];
    setOpen(next);
  };

  // 处理菜单项点击事件
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return; // 禁用状态下不处理点击
    
    // 如果是带子菜单的内联模式，则切换展开状态
    if (item.children && isInline) {
      toggleOpen();
      return;
    }
    
    // 如果是叶子节点，触发选择回调
    if (!item.children) onSelect?.({ key: item.key });
  };

  // 处理鼠标进入事件（用于悬停触发）
  const handleMouseEnter = () => {
    if (trigger === 'hover' && item.children && !isInline) {
      if (!open) setOpen([...openKeys, item.key]);
    }
  };

  // 处理鼠标离开事件（用于悬停触发）
  const handleMouseLeave = () => {
    if (trigger === 'hover' && item.children && !isInline) {
      if (open) setOpen(openKeys.filter(k => k !== item.key));
    }
  };

  // 菜单项的样式
  const liStyle: React.CSSProperties = {
    cursor: item.disabled ? 'not-allowed' : 'pointer', // 禁用时显示禁止光标
    opacity: item.disabled ? 0.6 : 1, // 禁用时降低透明度
  };

  // 构建菜单项的CSS类名
  const liCls = [
    item.children ? `${prefixCls}-submenu` : `${prefixCls}-menu-item`, // 区分子菜单和普通菜单项
    item.children && open ? `${prefixCls}-submenu-open` : undefined, // 子菜单展开状态
    !item.children ? `${prefixCls}-menu-item${selected ? '-selected' : ''}` : undefined, // 普通菜单项选中状态
    !item.children && item.disabled ? `${prefixCls}-menu-item-disabled` : undefined, // 禁用状态
  ].filter(Boolean).join(' ');

  return (
    <li role="none" className={liCls} style={liStyle} aria-disabled={item.disabled || undefined} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div role="menuitem" aria-selected={selected ? 'true' : undefined} onClick={handleClick}>
        <span>{item.label}</span>
      </div>
      {/* 渲染子菜单 */}
      {item.children && open && (
        <ul role="menu" style={{ listStyle: 'none', margin: 0, paddingLeft: isHorizontal ? 0 : 16 }}>
          {item.children.map((child) => (
            <MenuNode key={child.key} item={child} isHorizontal={false} isInline={isInline} trigger={trigger} selectedKeys={selectedKeys} openKeys={openKeys} setOpen={setOpen} onSelect={onSelect} prefixCls={prefixCls} />
          ))}
        </ul>
      )}
    </li>
  );
}

