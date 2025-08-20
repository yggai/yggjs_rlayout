import React, { createContext, useContext, PropsWithChildren } from 'react';
import type { Breakpoint } from './breakpoints';

export type GridConfig = {
  totalColumns?: number;
  breakpoints?: Partial<Record<Breakpoint, number>>;
};

const defaultBreakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const defaultConfig: Required<GridConfig> = {
  totalColumns: 12,
  breakpoints: {},
};

const GridConfigContext = createContext<GridConfig>(defaultConfig);

export function GridConfigProvider({ value, children }: PropsWithChildren<{ value?: GridConfig }>) {
  return <GridConfigContext.Provider value={value ?? defaultConfig}>{children}</GridConfigContext.Provider>;
}

export function useGridConfig() {
  const cfg = useContext(GridConfigContext) || defaultConfig;
  return {
    totalColumns: cfg.totalColumns ?? defaultConfig.totalColumns,
    breakpoints: { ...defaultBreakpoints, ...(cfg.breakpoints || {}) } as Record<Breakpoint, number>,
  };
}

export { defaultBreakpoints };

