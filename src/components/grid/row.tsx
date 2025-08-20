import React, { createContext, useContext } from 'react';

const GutterContext = createContext<{ x?: number; y?: number } | undefined>(undefined);
export function useGutter() { return useContext(GutterContext); }

export type RowProps = React.PropsWithChildren<{
  gutter?: number; // shorthand for horizontal gutter in px
  gutterX?: number; // horizontal gutter in px
  gutterY?: number; // vertical gutter in px
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Row({ gutter, gutterX, gutterY, className, style, children, 'data-testid': dataTestId }: RowProps) {
  const gx = gutterX ?? gutter ?? 0;
  const gy = gutterY ?? 0;
  const halfX = gx / 2;
  const halfY = gy / 2;

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: gx ? `-${halfX}px` : undefined,
    marginRight: gx ? `-${halfX}px` : undefined,
    marginTop: gy ? `-${halfY}px` : undefined,
    marginBottom: gy ? `-${halfY}px` : undefined,
    ...style
  };
  return (
    <GutterContext.Provider value={{ x: gx || undefined, y: gy || undefined }}>
      <div className={className} style={rowStyle} data-testid={dataTestId}>
        {children}
      </div>
    </GutterContext.Provider>
  );
}

