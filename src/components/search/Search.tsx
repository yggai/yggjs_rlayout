import React, { useState, useRef, useEffect } from 'react';

/** 搜索框尺寸类型 */
export type SearchSize = 'small' | 'medium' | 'large';

/** 搜索框外观变体类型 */
export type SearchVariant = 'outlined' | 'filled' | 'ghost';

/**
 * Search 组件的属性类型定义
 * @description 定义了搜索框组件所有可配置的属性
 */
export type SearchProps = {
  /** 搜索框的值（受控模式） */
  value?: string;
  /** 搜索框的默认值（非受控模式） */
  defaultValue?: string;
  /** 占位符文本，默认为 '搜索...' */
  placeholder?: string;
  /** 搜索框尺寸，默认为 'medium' */
  size?: SearchSize;
  /** 搜索框外观变体，默认为 'outlined' */
  variant?: SearchVariant;
  /** 是否禁用搜索框 */
  disabled?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否显示清除按钮，默认为 true */
  allowClear?: boolean;
  /** 是否显示搜索按钮（已废弃，保留兼容性） */
  searchButton?: boolean;
  /** 搜索按钮文本（已废弃，保留兼容性） */
  searchButtonText?: string;
  /** 是否显示搜索图标，默认为 true */
  showSearchIcon?: boolean;
  /** 前缀元素，显示在输入框左侧 */
  prefix?: React.ReactNode;
  /** 后缀元素，显示在输入框右侧 */
  suffix?: React.ReactNode;
  /** 搜索触发时的回调函数 */
  onSearch?: (value: string) => void;
  /** 输入值改变时的回调函数 */
  onChange?: (value: string) => void;
  /** 清除输入时的回调函数 */
  onClear?: () => void;
  /** 输入框获得焦点时的回调函数 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 输入框失去焦点时的回调函数 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 按键按下时的回调函数 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 输入框的自定义样式对象 */
  inputStyle?: React.CSSProperties;
  /** CSS 类名前缀，默认为 'ygg' */
  prefixCls?: string;
  /** 测试标识符 */
  'data-testid'?: string;
};

/**
 * 搜索图标组件
 * @description 渲染一个放大镜样式的搜索图标
 * @param props - 图标属性
 * @param props.size - 图标尺寸，默认为 16
 * @returns React.JSX.Element
 */
const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/**
 * 清除图标组件
 * @description 渲染一个X形状的清除图标
 * @param props - 图标属性
 * @param props.size - 图标尺寸，默认为 14
 * @returns React.JSX.Element
 */
const ClearIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * 加载图标组件
 * @description 渲染一个旋转的加载图标
 * @param props - 图标属性
 * @param props.size - 图标尺寸，默认为 14
 * @returns React.JSX.Element
 */
const LoadingIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
);

/**
 * Search 搜索框组件
 * @description 一个功能完整的搜索输入框组件，支持多种尺寸、外观变体和交互功能
 * @param props - Search组件的属性
 * @returns React.JSX.Element
 * 
 * @example
 * ```tsx
 * // 基础搜索框
 * <Search placeholder="请输入搜索关键词" onSearch={(value) => console.log(value)} />
 * 
 * // 受控搜索框
 * const [searchValue, setSearchValue] = useState('');
 * <Search 
 *   value={searchValue} 
 *   onChange={setSearchValue}
 *   onSearch={(value) => handleSearch(value)}
 * />
 * 
 * // 大尺寸带前缀的搜索框
 * <Search 
 *   size="large"
 *   prefix={<UserIcon />}
 *   variant="filled"
 *   allowClear
 * />
 * ```
 */
export function Search({
  value,
  defaultValue = '',
  placeholder = '搜索...',
  size = 'medium',
  variant = 'outlined',
  disabled = false,
  loading = false,
  allowClear = true,
  searchButton = false, // 默认不显示搜索按钮，改为显示搜索图标
  searchButtonText,
  showSearchIcon = true, // 默认显示搜索图标
  prefix,
  suffix,
  onSearch,
  onChange,
  onClear,
  onFocus,
  onBlur,
  onKeyDown,
  className,
  style,
  inputStyle,
  prefixCls = 'ygg',
  'data-testid': dataTestId
}: SearchProps) {
  // 内部管理的输入值（非受控模式）
  const [innerValue, setInnerValue] = useState(defaultValue);
  // 焦点状态
  const [focused, setFocused] = useState(false);
  // 输入框引用
  const inputRef = useRef<HTMLInputElement>(null);
  // 判断是否为受控组件
  const isControlled = value !== undefined;
  // 获取当前实际值
  const currentValue = isControlled ? value : innerValue;

  // 注入基础样式到页面
  useEffect(() => {
    if (typeof document === 'undefined') return; // SSR环境下跳过
    const id = `${prefixCls}-search-base-style`;
    if (document.getElementById(id)) return; // 样式已存在则跳过
    
    const css = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .${prefixCls}-search {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        box-sizing: border-box;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        width: 100%;
      }

      .${prefixCls}-search-small {
        height: 32px;
        font-size: 13px;
      }

      .${prefixCls}-search-medium {
        height: 36px;
        font-size: 14px;
      }

      .${prefixCls}-search-large {
        height: 44px;
        font-size: 16px;
      }

      .${prefixCls}-search-outlined {
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .${prefixCls}-search-filled {
        border: 1px solid transparent;
        border-radius: 10px;
        background: #f8fafc;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .${prefixCls}-search-ghost {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(8px);
      }

      .${prefixCls}-search:hover:not(.${prefixCls}-search-disabled) {
        border-color: #d1d5db;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .${prefixCls}-search-focused {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12), 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .${prefixCls}-search-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: #f9fafb;
      }

      .${prefixCls}-search-input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 14px;
        gap: 10px;
        position: relative;
      }

      .${prefixCls}-search-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: inherit;
        font-size: inherit;
        padding: 0;
        margin: 0;
        min-width: 0;
        font-weight: 400;
        line-height: 1.5;
      }

      .${prefixCls}-search-input::placeholder {
        color: #9ca3af;
        font-weight: 400;
      }

      .${prefixCls}-search-input:disabled {
        cursor: not-allowed;
      }

      .${prefixCls}-search-prefix {
        display: flex;
        align-items: center;
        color: #6b7280;
        flex-shrink: 0;
      }

      .${prefixCls}-search-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }

      .${prefixCls}-search-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #9ca3af;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 4px;
        border-radius: 6px;
        opacity: 0.7;
      }

      .${prefixCls}-search-clear:hover {
        color: #6b7280;
        background: rgba(0, 0, 0, 0.08);
        opacity: 1;
        transform: scale(1.1);
      }

      .${prefixCls}-search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--search-icon-color, #6b7280);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 6px;
        border-radius: 8px;
        opacity: 0.9;
        user-select: none;
        position: relative;
        flex-shrink: 0;
      }

      .${prefixCls}-search-icon:hover {
        color: var(--search-icon-hover-color, #3b82f6);
        background: var(--search-icon-hover-bg, rgba(59, 130, 246, 0.12));
        opacity: 1;
        transform: scale(1.05);
        box-shadow: 0 2px 8px var(--search-icon-hover-color, rgba(59, 130, 246, 0.2));
      }

      .${prefixCls}-search-icon:active {
        transform: scale(0.95);
        background: var(--search-icon-active-bg, rgba(59, 130, 246, 0.2));
      }

      .${prefixCls}-search-icon:disabled {
        cursor: not-allowed;
        opacity: 0.4;
        transform: none;
      }

      .${prefixCls}-search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3b82f6;
        color: white;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: inherit;
        padding: 0 12px;
        gap: 6px;
        border-radius: 0;
        height: 100%;
        min-width: fit-content;
      }

      .${prefixCls}-search-button:hover:not(:disabled) {
        background: #2563eb;
      }

      .${prefixCls}-search-button:active:not(:disabled) {
        background: #1d4ed8;
      }

      .${prefixCls}-search-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      .${prefixCls}-search-button-small {
        padding: 0 8px;
        gap: 4px;
      }

      .${prefixCls}-search-button-large {
        padding: 0 16px;
        gap: 8px;
      }

      .${prefixCls}-search-loading {
        color: #9ca3af;
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }, [prefixCls]);

  // 处理输入值变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInnerValue(newValue);
    }
    // 触发外部onChange回调
    onChange?.(newValue);
  };

  // 处理键盘按键事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 按下Enter键时执行搜索
    if (e.key === 'Enter') {
      handleSearch();
    }
    // 触发外部onKeyDown回调
    onKeyDown?.(e);
  };

  // 执行搜索操作
  const handleSearch = () => {
    if (!disabled && !loading) {
      onSearch?.(currentValue);
    }
  };

  // 处理清除输入内容
  const handleClear = () => {
    const newValue = '';
    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInnerValue(newValue);
    }
    // 触发相关回调
    onChange?.(newValue);
    onClear?.();
    // 清除后重新聚焦输入框
    inputRef.current?.focus();
  };

  // 处理输入框获得焦点
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  // 处理输入框失去焦点
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  // 构建各种CSS类名
  const sizeClass = `${prefixCls}-search-${size}`; // 尺寸类名
  const variantClass = `${prefixCls}-search-${variant}`; // 变体类名
  const focusedClass = focused ? `${prefixCls}-search-focused` : ''; // 焦点状态类名
  const disabledClass = disabled ? `${prefixCls}-search-disabled` : ''; // 禁用状态类名

  // 组合最终的容器类名
  const containerClass = [
    `${prefixCls}-search`,
    sizeClass,
    variantClass,
    focusedClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  // 根据尺寸确定图标大小
  const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;
  // 判断是否显示清除按钮
  const showClear = allowClear && currentValue && !disabled && !loading;

  // 搜索按钮的类名（兼容旧版本）
  const buttonClass = [
    `${prefixCls}-search-button`,
    `${prefixCls}-search-button-${size}`
  ].filter(Boolean).join(' ');

  // 处理搜索图标点击事件
  const handleSearchIconClick = () => {
    if (!disabled && !loading) {
      if (currentValue.trim()) {
        onSearch?.(currentValue);
      } else {
        // 如果没有输入内容，显示提示
        alert('请输入搜索内容');
        inputRef.current?.focus();
      }
    }
  };

  return (
    <div className={containerClass} style={style} data-testid={dataTestId}>
      <div className={`${prefixCls}-search-input-wrapper`}>
        {prefix && (
          <div className={`${prefixCls}-search-prefix`}>
            {prefix}
          </div>
        )}

        <input
          ref={inputRef}
          className={`${prefixCls}-search-input`}
          type="text"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
        />

        <div className={`${prefixCls}-search-actions`}>
          {loading && (
            <div className={`${prefixCls}-search-loading`}>
              <LoadingIcon size={iconSize} />
            </div>
          )}

          {showClear && (
            <div className={`${prefixCls}-search-clear`} onClick={handleClear}>
              <ClearIcon size={iconSize - 2} />
            </div>
          )}

          {showSearchIcon && !loading && (
            <div
              className={`${prefixCls}-search-icon`}
              onClick={handleSearchIconClick}
              title="点击搜索"
              role="button"
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSearchIconClick();
                }
              }}
              style={{
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : undefined
              }}
            >
              <SearchIcon size={iconSize} />
            </div>
          )}

          {suffix && suffix}
        </div>
      </div>

      {searchButton && (
        <button
          className={buttonClass}
          onClick={handleSearch}
          disabled={disabled || loading}
          type="button"
        >
          {loading ? (
            <LoadingIcon size={iconSize} />
          ) : (
            <SearchIcon size={iconSize} />
          )}
          {searchButtonText && <span>{searchButtonText}</span>}
        </button>
      )}
    </div>
  );
}
