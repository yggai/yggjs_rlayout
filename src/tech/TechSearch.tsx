import React from 'react';
import { Search, type SearchProps } from '../components/search';

export interface TechSearchProps extends Omit<SearchProps, 'variant' | 'showSearchIcon' | 'searchButton'> {
  width?: number | string;
}

import styles from './TechSearch.module.css';

export function TechSearch({
  width = 280,
  className,
  style = {},
  ...props
}: TechSearchProps) {
  const combinedStyle: React.CSSProperties = {
    width,
    ...style
  };

  return (
    <Search
      size="medium"
      variant="ghost"
      showSearchIcon={true}
      searchButton={false}
      allowClear={true}
      className={[styles.search, className].filter(Boolean).join(' ')}
      style={combinedStyle}
      {...props}
    />
  );
}
