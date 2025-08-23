/**
 * 科技风格搜索框组件
 * 
 * 基于基础搜索组件的科技风格封装，提供一致的视觉效果和交互体验
 */

import React from 'react';
import { Search, type SearchProps } from '../components/search';
import styles from './TechSearch.module.css';

export interface TechSearchProps extends Omit<SearchProps, 'variant' | 'showSearchIcon' | 'searchButton'> {
  width?: number | string;
}

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
