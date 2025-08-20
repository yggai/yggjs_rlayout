import React from 'react';
import { useGutter } from './row';

export type ColumnProps = React.PropsWithChildren<{
  span?: number; // 1..12
  offset?: number; // 0..11
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

const TOTAL = 12;

export function Column({ span = TOTAL, offset = 0, className, style, children, 'data-testid': dataTestId }: ColumnProps) {
  const gutter = useGutter();
  const widthPercent = `${(Math.min(span, TOTAL) / TOTAL) * 100}%`;
  const marginLeftPercent = offset ? `${(offset / TOTAL) * 100}%` : undefined;
  const half = gutter ? gutter / 2 : 0;
  const colStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    paddingLeft: gutter ? `${half}px` : undefined,
    paddingRight: gutter ? `${half}px` : undefined,
    width: widthPercent,
    marginLeft: marginLeftPercent,
    ...style
  };
  return (
    <div className={className} style={colStyle} data-testid={dataTestId}>
      {children}
    </div>
  );
}

