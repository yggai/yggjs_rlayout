import React from 'react';

export interface TechTheme {
  colors: {
    bg: string;
    panel: string;
    panel2: string;
    muted: string;
    primary: string;
    accent: string;
    border: string;
    ring: string;
    text: string;
    textMuted: string;
  };
  effects: {
    glow: string;
    backdrop: string;
  };
  gradients: {
    background: string;
    sidebar: string;
    card: string;
  };
}

export type TechIconName = 
  | 'menu'
  | 'dashboard'
  | 'book'
  | 'info'
  | 'home'
  | 'guide'
  | 'api'
  | 'search'
  | 'user'
  | 'settings'
  | 'logout'
  | 'chevron-left'
  | 'chevron-right'
  | 'plus'
  | 'deploy';

export interface TechIconProps {
  name: TechIconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: TechIconName;
  href?: string;
  children?: MenuItem[];
}
