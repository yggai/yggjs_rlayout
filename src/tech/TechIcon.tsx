import React from 'react';
import type { TechIconProps, TechIconName } from './types';

const iconPaths: Record<TechIconName, string> = {
  menu: "M3 6h18M3 12h18M3 18h18",
  dashboard: "M3 3h7v7H3zM14 3h7v4h-7zM14 9h7v11h-7zM3 12h7v8H3z",
  book: "M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3V4z",
  info: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 8v6m0-8h.01",
  home: "M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  guide: "M4 19.5V5a2 2 0 012-2h12v15.5a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19.5zM6 6h8",
  api: "M4 12h4m8 0h4M9 5l6 14",
  search: "M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  'chevron-left': "M15 18l-6-6 6-6",
  'chevron-right': "M9 18l6-6-6-6",
  plus: "M12 5v14M5 12h14",
  deploy: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
};

export function TechIcon({ 
  name, 
  size = 18, 
  className = '', 
  style = {} 
}: TechIconProps) {
  const path = iconPaths[name];
  
  if (!path) {
    console.warn(`TechIcon: Unknown icon name "${name}"`);
    return null;
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`tech-icon ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
