import React from 'react';

export type FlexProps = React.PropsWithChildren<{
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  gap?: number | { x?: number; y?: number };
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Flex({
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  as = 'div',
  className,
  style,
  children,
  'data-testid': dataTestId
}: FlexProps) {
  const El = as as any;
  const isRow = direction.startsWith('row');
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
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent:
      justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: gapValue,
    ...style
  };

  return (
    <El className={className} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

