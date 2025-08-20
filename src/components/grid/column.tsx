import React from 'react';
import { useGutter } from './row';
import { Breakpoint, useBreakpoint } from './breakpoints';

export type ColumnProps = React.PropsWithChildren<{
  span?: number; // 1..12 base
  offset?: number; // 0..11 base
  spanSm?: number; spanMd?: number; spanLg?: number; spanXl?: number;
  offsetSm?: number; offsetMd?: number; offsetLg?: number; offsetXl?: number;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

const TOTAL = 12;

function pickByBreakpoint<T extends number | undefined>(bp: Breakpoint, base: T, sm?: T, md?: T, lg?: T, xl?: T): T {
  if (bp === 'xl') return (xl ?? lg ?? md ?? sm ?? base) as T;
  if (bp === 'lg') return (lg ?? md ?? sm ?? base) as T;
  if (bp === 'md') return (md ?? sm ?? base) as T;
  if (bp === 'sm') return (sm ?? base) as T;
  return base;
}

export function Column(props: ColumnProps) {
  const {
    span = TOTAL,
    offset = 0,
    spanSm, spanMd, spanLg, spanXl,
    offsetSm, offsetMd, offsetLg, offsetXl,
    className,
    style,
    children,
    'data-testid': dataTestId
  } = props;

  const bp = useBreakpoint();
  const gutter = useGutter();

  const effSpan = Math.min(pickByBreakpoint(bp, span, spanSm, spanMd, spanLg, spanXl) ?? TOTAL, TOTAL);
  const effOffset = Math.min(pickByBreakpoint(bp, offset, offsetSm, offsetMd, offsetLg, offsetXl) ?? 0, TOTAL - 1);

  const widthPercent = `${((effSpan / TOTAL) * 100).toFixed(4)}%`;
  const marginLeftPercent = effOffset ? `${(effOffset / TOTAL) * 100}%` : undefined;

  const halfX = gutter?.x ? gutter.x / 2 : 0;
  const halfY = gutter?.y ? gutter.y / 2 : 0;

  const colStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    paddingLeft: gutter?.x ? `${halfX}px` : undefined,
    paddingRight: gutter?.x ? `${halfX}px` : undefined,
    paddingTop: gutter?.y ? `${halfY}px` : undefined,
    paddingBottom: gutter?.y ? `${halfY}px` : undefined,
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

