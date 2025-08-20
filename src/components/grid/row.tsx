import React, { createContext, useContext } from 'react';

const GutterContext = createContext<number | undefined>(undefined);
export function useGutter() { return useContext(GutterContext); }

export type RowProps = React.PropsWithChildren<{
  gutter?: number; // horizontal gutter in px (like Bootstrap gutter)
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Row({ gutter, className, style, children, 'data-testid': dataTestId }: RowProps) {
  const half = gutter ? gutter / 2 : 0;
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: gutter ? `-${half}px` : undefined,
    marginRight: gutter ? `-${half}px` : undefined,
    ...style
  };
  return (
    <GutterContext.Provider value={gutter}>
      <div className={className} style={rowStyle} data-testid={dataTestId}>
        {children}
      </div>
    </GutterContext.Provider>
  );
}

