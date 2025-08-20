export type PathMatchMode = 'exact' | 'startsWith';
export type MenuPathItem = { key: string; path?: string; children?: MenuPathItem[] };

export function computeSelectionFromPath(
  items: MenuPathItem[],
  currentPath: string,
  opts?: { match?: PathMatchMode }
): { selectedKey?: string; openKeys: string[] } {
  const match: PathMatchMode = opts?.match ?? 'exact';
  const parents = new Map<string, string | undefined>();
  const pathToKey: Array<{ path: string; key: string }>=[];

  const walk = (nodes: MenuPathItem[], parent?: string) => {
    for (const n of nodes) {
      parents.set(n.key, parent);
      if (n.path) pathToKey.push({ path: n.path, key: n.key });
      if (n.children) walk(n.children, n.key);
    }
  };
  walk(items);

  let selectedKey: string | undefined;
  if (match === 'exact') {
    selectedKey = pathToKey.find(x => x.path === currentPath)?.key;
  } else {
    let bestLen = -1;
    for (const rec of pathToKey) {
      if (currentPath.startsWith(rec.path) && rec.path.length > bestLen) {
        bestLen = rec.path.length;
        selectedKey = rec.key;
      }
    }
  }

  const openKeys: string[] = [];
  if (selectedKey) {
    let p = parents.get(selectedKey);
    while (p) { openKeys.unshift(p); p = parents.get(p); }
  }
  return { selectedKey, openKeys };
}

