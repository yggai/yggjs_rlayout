/**
 * 科技风格菜单组件
 * 
 * 基于基础菜单组件的科技风格封装，支持图标和折叠状态
 * 提供水平和垂直两种布局模式
 */

import React, { memo, useMemo, useCallback } from 'react';
import { Menu, type MenuProps } from '../components/menu';
import type { MenuItem as BaseMenuItem } from '../components/menu';
import type { TechIconName } from './types';
import { TechIcon } from './TechIcon';
import styles from './TechMenu.module.css';

/**
 * 类似链接组件的类型定义，支持React Router等路由组件
 */
export type LinkLikeComponent = React.ComponentType<{
  /** 路由路径 */
  to: string;
  /** CSS类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}>;

/**
 * 科技风格菜单项接口，扩展基础菜单项功能
 */
export interface TechMenuItem extends Omit<BaseMenuItem, 'label'> {
  /** 菜单项显示文本 */
  label: string;
  /** 菜单项图标 */
  icon?: TechIconName;
  /** 普通链接地址（适用于非单页应用） */
  href?: string;
  /** SPA路由路径（适用于单页应用） */
  to?: string;
  /** 子菜单项 */
  children?: TechMenuItem[];
}

/**
 * 科技风格菜单组件属性接口
 */
export interface TechMenuProps extends Omit<MenuProps, 'items' | 'onSelect'> {
  /** 菜单项数据 */
  items: TechMenuItem[];
  /** 是否折叠状态 */
  collapsed?: boolean;
  /** 自定义链接组件（如React Router的Link） */
  linkComponent?: LinkLikeComponent;
  /** 菜单项选中事件回调（传入完整菜单项数据） */
  onSelectItem?: (item: TechMenuItem) => void;
  /** 基础菜单选中事件回调 */
  onSelect?: MenuProps['onSelect'];
}

/**
 * 科技风格菜单组件
 * 
 * 基于基础菜单组件的科技风格封装，支持图标和折叠状态
 * 提供水平和垂直两种布局模式
 * 
 * @param props 菜单组件属性
 */
export const TechMenu = memo<TechMenuProps>(function TechMenu({
  items,
  collapsed = false,
  mode = 'vertical',
  linkComponent,
  onSelectItem,
  onSelect,
  ...props
}) {
  // 使用useMemo优化菜单项key到对象的映射，只在items变化时重新计算
  const key2item = useMemo(() => {
    const map = new Map<string, TechMenuItem>();
    
    // 递归遍历菜单项，构建完整的key映射
    const walkMenuItems = (menuItems: TechMenuItem[]) => {
      menuItems.forEach((item) => {
        map.set(item.key, item);
        if (item.children?.length) {
          walkMenuItems(item.children);
        }
      });
    };
    
    walkMenuItems(items);
    return map;
  }, [items]);

  // 使用useCallback优化菜单项构建函数
  const buildMenuItem = useCallback((item: TechMenuItem): BaseMenuItem => {
    const isLeaf = !item.children || item.children.length === 0;
    
    // 菜单项内容：图标 + 文本
    const inner = (
      <>
        {item.icon && <TechIcon name={item.icon} />}
        <span className={collapsed ? styles.navTextCollapsed : styles.navText}>
          {item.label}
        </span>
      </>
    );

    // 根据是否为叶子节点和是否有链接来决定渲染方式
    let labelNode: React.ReactNode;
    if (isLeaf) {
      if (linkComponent && item.to) {
        // SPA路由链接
        const Link = linkComponent;
        labelNode = <Link to={item.to} className={styles.nav}>{inner}</Link>;
      } else if (item.href) {
        // 普通链接
        labelNode = <a href={item.href} className={styles.nav}>{inner}</a>;
      } else {
        // 无链接
        labelNode = <span className={styles.nav}>{inner}</span>;
      }
    } else {
      // 非叶子节点（有子菜单）
      labelNode = <span className={styles.nav}>{inner}</span>;
    }

    return {
      ...(item as BaseMenuItem),
      label: labelNode,
      children: item.children?.map(buildMenuItem),
    };
  }, [collapsed, linkComponent]);
  
  // 使用useMemo优化处理后的菜单项数据
  const processedItems = useMemo((): BaseMenuItem[] => {
    return items.map(buildMenuItem);
  }, [items, buildMenuItem]);

  // 使用useMemo优化主题变量计算，根据模式设置不同的样式变量
  const techVars = useMemo(() => {
    if (mode === 'horizontal') {
      return {
        menuItemPadding: '6px 10px',
        menuGap: '14px',
        menuRadius: '8px',
        menuLabelGap: '8px'
      };
    }
    return {
      menuLabelGap: '10px'
    };
  }, [mode]);

  // 计算默认展开的子菜单：为包含子项的节点自动展开，确保多级菜单可见
  const autoDefaultOpenKeys = useMemo(() => {
    const keys: string[] = [];
    const walk = (arr: TechMenuItem[]) => {
      arr.forEach(it => {
        if (it.children && it.children.length) {
          keys.push(it.key);
          walk(it.children);
        }
      });
    };
    walk(items);
    return keys;
  }, [items]);

  // 使用useCallback优化选中事件处理函数
  const handleSelect = useCallback((info: Parameters<NonNullable<MenuProps['onSelect']>>[0]) => {
    // 先执行基础选中事件
    onSelect?.(info);

    // 再执行高级选中事件（传入完整菜单项数据）
    const item = key2item.get(info.key);
    if (item && onSelectItem) {
      onSelectItem(item);
    }
  }, [onSelect, onSelectItem, key2item]);

  // 使用useMemo优化类名计算
  const menuClassName = useMemo(() => [
    props.className,
    styles.menu,
    collapsed && styles.collapsed
  ].filter(Boolean).join(' '), [props.className, collapsed]);

  return (
    <Menu
      mode={mode}
      items={processedItems}
      vars={techVars}
      onSelect={handleSelect}
      defaultOpenKeys={(props as any).defaultOpenKeys ?? (props as any).openKeys ?? autoDefaultOpenKeys}
      {...props}
      className={menuClassName}
    />
  );
});
