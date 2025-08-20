import React from 'react';
import { useBreakpoint, Breakpoint } from '../grid/breakpoints';

export type ContainerVariant = 'fixed' | 'fluid' | 'responsive';

export type ContainerProps = React.PropsWithChildren<{
  variant?: ContainerVariant;
  breakpoint?: Exclude<Breakpoint, 'xs'>; // for responsive mode, threshold
  maxWidth?: number | string; // for fixed/responsive when active
  paddingX?: number; // horizontal padding(px)
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Container({ variant='fixed', breakpoint='md', maxWidth=1200, paddingX=16, as='div', className, style, children, 'data-testid': dataTestId }: ContainerProps) {
  const bp = useBreakpoint();
  const isAtOrAbove = (bp: Breakpoint, thr: Breakpoint) => {
    const order: Breakpoint[] = ['xs','sm','md','lg','xl'];
    return order.indexOf(bp) >= order.indexOf(thr);
  };

  const isFixed = variant === 'fixed' || (variant === 'responsive' && isAtOrAbove(bp, breakpoint));

  const styles: React.CSSProperties = {
    width: '100%',
    maxWidth: isFixed ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
    marginLeft: isFixed ? 'auto' : undefined,
    marginRight: isFixed ? 'auto' : undefined,
    paddingLeft: paddingX ? `${paddingX}px` : undefined,
    paddingRight: paddingX ? `${paddingX}px` : undefined,
    ...style,
  };

  const El = as as any;
  return <El className={className} style={styles} data-testid={dataTestId}>{children}</El>;
}

