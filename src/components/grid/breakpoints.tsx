import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useGridConfig } from './config';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function detectBreakpoint(mins: Record<Breakpoint, number>): Breakpoint {
  if (typeof window === 'undefined') return 'lg';
  const w = window.innerWidth || 1024;
  if (w >= mins.xl) return 'xl';
  if (w >= mins.lg) return 'lg';
  if (w >= mins.md) return 'md';
  if (w >= mins.sm) return 'sm';
  return 'xs';
}

const BreakpointContext = createContext<Breakpoint>('lg');

export function useBreakpoint(): Breakpoint {
  return useContext(BreakpointContext);
}

export const BreakpointProvider: React.FC<React.PropsWithChildren<{ value?: Breakpoint }>> = ({ value, children }) => {
  const { breakpoints } = useGridConfig();
  const [bp, setBp] = useState<Breakpoint>(value ?? detectBreakpoint(breakpoints));

  useEffect(() => {
    if (value) { setBp(value); return; }
    function onResize() { setBp(detectBreakpoint(breakpoints)); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [value, breakpoints]);

  const ctx = useMemo(() => (value ?? bp), [value, bp]);
  return <BreakpointContext.Provider value={ctx}>{children}</BreakpointContext.Provider>;
};

