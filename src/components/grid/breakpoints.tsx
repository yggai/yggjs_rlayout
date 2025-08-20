import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const breakpointMin: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function detectBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'lg';
  const w = window.innerWidth || 1024;
  if (w >= breakpointMin.xl) return 'xl';
  if (w >= breakpointMin.lg) return 'lg';
  if (w >= breakpointMin.md) return 'md';
  if (w >= breakpointMin.sm) return 'sm';
  return 'xs';
}

const BreakpointContext = createContext<Breakpoint>('lg');

export function useBreakpoint(): Breakpoint {
  return useContext(BreakpointContext);
}

export const BreakpointProvider: React.FC<React.PropsWithChildren<{ value?: Breakpoint }>> = ({ value, children }) => {
  const [bp, setBp] = useState<Breakpoint>(value ?? detectBreakpoint());

  useEffect(() => {
    if (value) { setBp(value); return; }
    function onResize() { setBp(detectBreakpoint()); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [value]);

  const ctx = useMemo(() => (value ?? bp), [value, bp]);
  return <BreakpointContext.Provider value={ctx}>{children}</BreakpointContext.Provider>;
};

