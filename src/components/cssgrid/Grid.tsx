import React from 'react';

export type GridProps = React.PropsWithChildren<{
  columns?: number | string; // number => repeat(n, 1fr) | string => custom template
  rows?: number | string;    // number => repeat(n, auto) | string => custom template
  gap?: number | { x?: number; y?: number };
  autoFlow?: React.CSSProperties['gridAutoFlow'];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Grid({ columns = 1, rows, gap, autoFlow, as='div', className, style, children, 'data-testid': dataTestId }: GridProps) {
  const El = as as any;
  const cols = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
  const rws = rows === undefined ? undefined : typeof rows === 'number' ? `repeat(${rows}, auto)` : rows;

  const isNumberGap = typeof gap === 'number';
  const gapX = isNumberGap ? gap : gap?.x;
  const gapY = isNumberGap ? gap : gap?.y;
  const gapValue = isNumberGap
    ? `${gap}px`
    : gapX !== undefined && gapY !== undefined
      ? `${gapY}px ${gapX}px`
      : gapX !== undefined
        ? `${gapX}px`
        : gapY !== undefined
          ? `${gapY}px`
          : undefined;

  const styles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: cols,
    gridTemplateRows: rws,
    gridAutoFlow: autoFlow,
    gap: gapValue,
    ...style,
  };

  return <El className={className} style={styles} data-testid={dataTestId}>{children}</El>;
}

export type GridItemProps = React.PropsWithChildren<{
  colSpan?: number | 'auto';
  rowSpan?: number | 'auto';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

Grid.Item = function GridItem({ colSpan='auto', rowSpan='auto', as='div', className, style, children, 'data-testid': dataTestId }: GridItemProps) {
  const El = as as any;
  const s: React.CSSProperties = {
    gridColumn: colSpan === 'auto' ? undefined : `span ${colSpan}`,
    gridRow: rowSpan === 'auto' ? undefined : `span ${rowSpan}`,
    ...style,
  };
  return <El className={className} style={s} data-testid={dataTestId}>{children}</El>;
};

