import React from 'react';

export type HeaderProps = React.PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  sticky?: boolean;
  fixed?: boolean;
  top?: number;
  height?: number;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Header({ as='header', sticky=false, fixed=false, top=0, height, prefixCls='ygg', className, style, children, 'data-testid': dataTestId }: HeaderProps) {
  const El = as as any;
  const styles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: fixed ? '100%' : undefined,
    position: sticky ? 'sticky' : fixed ? 'fixed' : undefined,
    top: sticky || fixed ? `${top}px` : undefined,
    left: fixed ? 0 : undefined,
    right: fixed ? 0 : undefined,
    height: height !== undefined ? `${height}px` : undefined,
    ...style,
  };
  const cls = [
    `${prefixCls}-header`,
    sticky ? `${prefixCls}-header-sticky` : undefined,
    fixed ? `${prefixCls}-header-fixed` : undefined,
    className,
  ].filter(Boolean).join(' ');
  return (
    <El className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

