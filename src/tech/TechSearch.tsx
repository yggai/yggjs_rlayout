/**
 * 科技风格搜索框组件
 * 
 * 基于基础搜索组件的科技风格封装，提供一致的视觉效果和交互体验
 */

import React, { memo, useMemo } from 'react';
import { Search, type SearchProps } from '../components/search';
import styles from './TechSearch.module.css';

export interface TechSearchProps extends Omit<SearchProps, 'variant' | 'showSearchIcon' | 'searchButton'> {
  width?: number | string;
}

export const TechSearch = memo<TechSearchProps>(function TechSearch({
  width = 280,
  className,
  style = {},
  ...props
}) {
  // 使用useMemo优化样式计算
  const combinedStyle = useMemo((): React.CSSProperties => ({
    ...style,
    width: typeof width === 'number' ? `${width}px` : width  // width prop 优先级更高
  }), [width, style]);

  // 使用useMemo优化类名计算
  const combinedClassName = useMemo(() => 
    [styles.search, className].filter(Boolean).join(' '), 
    [className]
  );

  return (
    <Search
      size="medium"
      variant="ghost"
      showSearchIcon={true}
      searchButton={false}
      allowClear={true}
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    />
  );
});
