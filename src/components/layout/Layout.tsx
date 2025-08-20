import React from 'react';

export type Direction = 'horizontal' | 'vertical';

export type LayoutProps = React.PropsWithChildren<{
  direction?: Direction;
  gap?: number | { x?: number; y?: number };
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Layout({
  direction = 'vertical',
  gap,
  align,
  justify,
  wrap,
  as = 'div',
  className,
  style,
  children,
  'data-testid': dataTestId
}: LayoutProps) {
  const El = as as any;

  const isRow = direction === 'horizontal';
  const gapX = typeof gap === 'number' ? gap : gap?.x ?? (typeof gap === 'object' ? 0 : undefined);
  const gapY = typeof gap === 'number' ? gap : gap?.y ?? (typeof gap === 'object' ? 0 : undefined);

  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: isRow ? 'row' : 'column',
    gap: gapX !== undefined && gapY !== undefined ? `${gapY}px ${gapX}px` : gapX ?? gapY,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent:
      justify === 'start'
        ? 'flex-start'
        : justify === 'end'
        ? 'flex-end'
        : justify,
    flexWrap: wrap ? 'wrap' : undefined,
    ...style
  };

  return (
    <El className={className} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

export type ItemProps = React.PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  flex?: number | string;
  grow?: number;
  shrink?: number;
  order?: number;
  width?: number | string;
}>;

Layout.Item = function Item({
  as = 'div',
  className,
  style,
  children,
  flex,
  grow,
  shrink,
  order,
  width
}: ItemProps) {
  const El = as as any;
  const styles: React.CSSProperties = {
    flex: typeof flex === 'number' ? `${flex} ${flex} 0%` : flex,
    flexGrow: grow,
    flexShrink: shrink,
    order,
    width,
    ...style
  };
  return <El className={className} style={styles}>{children}</El>;
};

