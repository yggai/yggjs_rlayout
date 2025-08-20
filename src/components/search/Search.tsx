import React, { useState, useRef, useEffect } from 'react';

export type SearchSize = 'small' | 'medium' | 'large';
export type SearchVariant = 'outlined' | 'filled' | 'ghost';

export type SearchProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: SearchSize;
  variant?: SearchVariant;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  searchButton?: boolean; // 是否显示搜索按钮（已废弃，保留兼容性）
  searchButtonText?: string; // 搜索按钮文本（已废弃，保留兼容性）
  showSearchIcon?: boolean; // 是否显示搜索图标
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  prefixCls?: string;
  'data-testid'?: string;
};

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ClearIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LoadingIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
);

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
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;

  // Inject base styles
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = `${prefixCls}-search-base-style`;
    if (document.getElementById(id)) return;
    
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInnerValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    onKeyDown?.(e);
  };

  const handleSearch = () => {
    if (!disabled && !loading) {
      onSearch?.(currentValue);
    }
  };

  const handleClear = () => {
    const newValue = '';
    if (!isControlled) {
      setInnerValue(newValue);
    }
    onChange?.(newValue);
    onClear?.();
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const sizeClass = `${prefixCls}-search-${size}`;
  const variantClass = `${prefixCls}-search-${variant}`;
  const focusedClass = focused ? `${prefixCls}-search-focused` : '';
  const disabledClass = disabled ? `${prefixCls}-search-disabled` : '';

  const containerClass = [
    `${prefixCls}-search`,
    sizeClass,
    variantClass,
    focusedClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;
  const showClear = allowClear && currentValue && !disabled && !loading;

  const buttonClass = [
    `${prefixCls}-search-button`,
    `${prefixCls}-search-button-${size}`
  ].filter(Boolean).join(' ');

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
