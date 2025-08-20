import React from 'react';

export type SidebarProps = React.PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  side?: 'left' | 'right';
  sticky?: boolean;
  fixed?: boolean;
  width?: number | string;
  top?: number; // px for sticky/fixed
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}>;

export function Sidebar({ as='aside', side='left', sticky=false, fixed=false, width, top=0, prefixCls='ygg', className, style, children, 'data-testid': dataTestId }: SidebarProps) {
  const El = as as any;
  const styles: React.CSSProperties = {
    position: sticky ? 'sticky' : fixed ? 'fixed' : undefined,
    top: sticky || fixed ? `${top}px` : undefined,
    left: (sticky || fixed) && side === 'left' ? '0px' : undefined,
    right: (sticky || fixed) && side === 'right' ? '0px' : undefined,
    width: typeof width === 'number' ? `${width}px` : width,
    ...style,
  };

  const cls = [
    `${prefixCls}-sidebar`,
    `${prefixCls}-sidebar-${side}`,
    sticky ? `${prefixCls}-sidebar-sticky` : undefined,
    fixed ? `${prefixCls}-sidebar-fixed` : undefined,
    className
  ].filter(Boolean).join(' ');

  return (
    <El className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </El>
  );
}

