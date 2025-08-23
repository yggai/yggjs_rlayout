/** 路径匹配模式类型 */
export type PathMatchMode = 'exact' | 'startsWith';

/**
 * 菜单路径项数据结构
 * @description 定义带路径信息的菜单项结构
 */
export type MenuPathItem = { 
  /** 菜单项的唯一标识符 */
  key: string; 
  /** 菜单项对应的路径 */
  path?: string; 
  /** 子菜单项列表 */
  children?: MenuPathItem[] 
};

/**
 * 根据当前路径计算菜单的选中状态和展开状态
 * @description 基于路由路径自动计算哪个菜单项应该被选中，以及哪些父级菜单应该展开
 * @param items - 菜单项数据数组
 * @param currentPath - 当前页面路径
 * @param opts - 配置选项
 * @param opts.match - 路径匹配模式，'exact'为精确匹配，'startsWith'为前缀匹配，默认为'exact'
 * @returns 包含选中菜单项key和需要展开的父级菜单keys的对象
 * 
 * @example
 * ```ts
 * const menuItems = [
 *   { key: 'home', path: '/' },
 *   { 
 *     key: 'products', 
 *     path: '/products',
 *     children: [
 *       { key: 'list', path: '/products/list' },
 *       { key: 'detail', path: '/products/detail' }
 *     ]
 *   }
 * ];
 * 
 * // 精确匹配
 * const result1 = computeSelectionFromPath(menuItems, '/products/list');
 * // result1: { selectedKey: 'list', openKeys: ['products'] }
 * 
 * // 前缀匹配
 * const result2 = computeSelectionFromPath(
 *   menuItems, 
 *   '/products/list/123', 
 *   { match: 'startsWith' }
 * );
 * // result2: { selectedKey: 'list', openKeys: ['products'] }
 * ```
 */
export function computeSelectionFromPath(
  items: MenuPathItem[],
  currentPath: string,
  opts?: { match?: PathMatchMode }
): { selectedKey?: string; openKeys: string[] } {
  const match: PathMatchMode = opts?.match ?? 'exact';
  
  // 构建父子关系映射表
  const parents = new Map<string, string | undefined>();
  // 构建路径到key的映射表
  const pathToKey: Array<{ path: string; key: string }>=[];

  // 递归遍历菜单树，构建映射关系
  const walk = (nodes: MenuPathItem[], parent?: string) => {
    for (const n of nodes) {
      // 记录每个节点的父节点
      parents.set(n.key, parent);
      // 如果节点有路径，记录路径到key的映射
      if (n.path) pathToKey.push({ path: n.path, key: n.key });
      // 递归处理子节点
      if (n.children) walk(n.children, n.key);
    }
  };
  walk(items);

  let selectedKey: string | undefined;
  
  if (match === 'exact') {
    // 精确匹配模式：路径完全相等
    selectedKey = pathToKey.find(x => x.path === currentPath)?.key;
  } else {
    // 前缀匹配模式：找到最长匹配的路径
    let bestLen = -1;
    for (const rec of pathToKey) {
      if (currentPath.startsWith(rec.path) && rec.path.length > bestLen) {
        bestLen = rec.path.length;
        selectedKey = rec.key;
      }
    }
  }

  // 构建需要展开的父级菜单keys数组
  const openKeys: string[] = [];
  if (selectedKey) {
    let p = parents.get(selectedKey);
    // 从选中项开始，向上查找所有父级节点
    while (p) { 
      openKeys.unshift(p); // 将父级key添加到数组开头
      p = parents.get(p); 
    }
  }
  
  return { selectedKey, openKeys };
}

