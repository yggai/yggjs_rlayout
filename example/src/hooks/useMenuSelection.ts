import { useMemo } from 'react';

export function useMenuSelection(pathname: string) {
  const selectedHeaderKey = useMemo(() => {
    if (pathname.startsWith('/docs')) return 'docs';
    if (pathname.startsWith('/about')) return 'about';
    return 'dash';
  }, [pathname]);

  const selectedSidebarKey = useMemo(() => {
    if (pathname.startsWith('/docs/api')) return 'api';
    if (pathname.startsWith('/docs')) return 'guide';
    if (pathname.startsWith('/about')) return 'about';
    return 'home';
  }, [pathname]);

  return { selectedHeaderKey, selectedSidebarKey };
}