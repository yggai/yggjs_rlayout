import React from 'react';
import { Search, type SearchProps } from '../components/search';

export interface TechSearchProps extends Omit<SearchProps, 'variant' | 'showSearchIcon' | 'searchButton'> {
  width?: number | string;
}

export function TechSearch({ 
  width = 280,
  style = {},
  inputStyle = {},
  ...props 
}: TechSearchProps) {
  const techStyle: React.CSSProperties = {
    background: 'rgba(11, 20, 48, 0.8)',
    border: '1px solid var(--tech-border)',
    color: 'var(--tech-text)',
    width,
    ...style
  } as React.CSSProperties & {
    '--search-icon-color': string;
    '--search-icon-hover-color': string;
    '--search-icon-hover-bg': string;
    '--search-icon-active-bg': string;
  };

  // 设置CSS变量
  Object.assign(techStyle, {
    '--search-icon-color': 'var(--tech-text)',
    '--search-icon-hover-color': 'var(--tech-accent)',
    '--search-icon-hover-bg': 'rgba(39, 224, 255, 0.15)',
    '--search-icon-active-bg': 'rgba(39, 224, 255, 0.25)'
  });

  const techInputStyle: React.CSSProperties = {
    color: 'var(--tech-text)',
    ...inputStyle
  };

  return (
    <Search
      size="medium"
      variant="ghost"
      showSearchIcon={true}
      searchButton={false}
      allowClear={true}
      style={techStyle}
      inputStyle={techInputStyle}
      {...props}
    />
  );
}
