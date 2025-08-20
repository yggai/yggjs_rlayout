import React from 'react';
import { useGutter } from './row';
import { Breakpoint, useBreakpoint } from './breakpoints';
import { useGridConfig } from './config';

export type ColumnProps = React.PropsWithChildren<{
  span?: number; // base span
  offset?: number; // base offset
  spanSm?: number; spanMd?: number; spanLg?: number; spanXl?: number;
  offsetSm?: number; offsetMd?: number; offsetLg?: number; offsetXl?: number;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

function pickByBreakpoint<T extends number | undefined>(bp: Breakpoint, base: T, sm?: T, md?: T, lg?: T, xl?: T): T {
  if (bp === 'xl') return (xl ?? lg ?? md ?? sm ?? base) as T;
  if (bp === 'lg') return (lg ?? md ?? sm ?? base) as T;
  if (bp === 'md') return (md ?? sm ?? base) as T;
  if (bp === 'sm') return (sm ?? base) as T;
  return base;
}

export function Column(props: ColumnProps) {
  const {
    span = undefined,
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
  const { totalColumns } = useGridConfig();

  const rawSpan = pickByBreakpoint(bp, span ?? totalColumns, spanSm, spanMd, spanLg, spanXl) ?? totalColumns;
  const rawOffset = pickByBreakpoint(bp, offset, offsetSm, offsetMd, offsetLg, offsetXl) ?? 0;

  // Dev-time validation and clamping
  let effSpan = Math.max(0, Math.min(rawSpan, totalColumns));
  let effOffset = Math.max(0, Math.min(rawOffset, totalColumns - 1));
  const isDev = typeof globalThis !== 'undefined' && (globalThis as any)?.process?.env?.NODE_ENV !== 'production';
  if (effOffset + effSpan > totalColumns) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[yggjs_rlayout][Column] offset(${effOffset}) + span(${effSpan}) > total(${totalColumns}), clamped.`);
    }
    effSpan = Math.max(0, totalColumns - effOffset);
  }
  if ((rawSpan ?? 0) !== effSpan || rawOffset !== effOffset) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[yggjs_rlayout][Column] props out of range: span=${rawSpan}, offset=${rawOffset}, total=${totalColumns}. Using span=${effSpan}, offset=${effOffset}.`);
    }
  }

  const widthPercent = `${((effSpan / totalColumns) * 100).toFixed(4)}%`;
  const marginLeftPercent = effOffset ? `${(effOffset / totalColumns) * 100}%` : undefined;

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

