# TechSearch 搜索组件

## 简介

`TechSearch` 是科技风格的搜索输入框组件，提供统一的搜索交互体验，具有科技感的外观设计和流畅的用户体验。

## 基础使用

### 最简单的搜索框

```tsx
import { TechSearch } from 'yggjs_rlayout/tech';

<TechSearch onSearch={(value) => console.log('搜索:', value)} />
```

### 带占位符的搜索框

```tsx
<TechSearch 
  placeholder="搜索用户、内容或功能..."
  onSearch={(value) => console.log('搜索内容:', value)}
/>
```

## 完整示例

```tsx
import { TechSearch, TechCard } from 'yggjs_rlayout/tech';
import { useState, useEffect } from 'react';

function SearchExample() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 模拟搜索数据
  const mockData = [
    { id: 1, title: '用户管理', category: '功能' },
    { id: 2, title: '数据统计', category: '功能' },
    { id: 3, title: '系统设置', category: '配置' },
    { id: 4, title: '张三', category: '用户' },
    { id: 5, title: '李四', category: '用户' },
  ];

  // 搜索处理函数
  const handleSearch = async (value) => {
    setSearchValue(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // 模拟API搜索延迟
    setTimeout(() => {
      const results = mockData.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }, 300);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <TechCard title="搜索示例">
        {/* 搜索输入框 */}
        <div style={{ marginBottom: '20px' }}>
          <TechSearch
            placeholder="搜索用户、功能或配置..."
            onSearch={handleSearch}
            width="100%"
          />
        </div>

        {/* 搜索结果 */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#7c89bf' }}>
            正在搜索...
          </div>
        )}

        {!loading && searchValue && (
          <div>
            <p style={{ color: '#7c89bf', fontSize: '14px' }}>
              找到 {searchResults.length} 个结果
            </p>
            
            {searchResults.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {searchResults.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{item.title}</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#27e0ff',
                      padding: '2px 8px',
                      background: 'rgba(39,224,255,0.2)',
                      borderRadius: '4px'
                    }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#7c89bf' }}>
                没有找到相关结果
              </div>
            )}
          </div>
        )}
      </TechCard>
    </div>
  );
}
```

## 高级用法

### 1. 实时搜索（防抖）

```tsx
import { useState, useCallback } from 'react';
import { debounce } from 'lodash'; // 需要安装 lodash

function RealTimeSearch() {
  const [results, setResults] = useState([]);

  // 防抖搜索函数
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setResults([]);
        return;
      }
      
      // 执行搜索API
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('搜索失败:', error);
      }
    }, 300), // 300ms 防抖延迟
    []
  );

  return (
    <TechSearch
      placeholder="输入即搜索..."
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
}
```

### 2. 搜索历史

```tsx
function SearchWithHistory() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = (value) => {
    if (value.trim()) {
      // 添加到搜索历史
      setSearchHistory(prev => {
        const newHistory = [value, ...prev.filter(item => item !== value)];
        return newHistory.slice(0, 10); // 保留最近10条
      });
      
      // 执行搜索逻辑
      console.log('搜索:', value);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <TechSearch
        placeholder="搜索内容..."
        onSearch={handleSearch}
        onFocus={() => setShowHistory(true)}
        onBlur={() => setTimeout(() => setShowHistory(false), 200)}
      />
      
      {showHistory && searchHistory.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--tech-panel)',
          border: '1px solid var(--tech-border)',
          borderRadius: '6px',
          marginTop: '4px',
          zIndex: 1000
        }}>
          <div style={{ padding: '8px 12px', fontSize: '12px', color: '#7c89bf' }}>
            搜索历史
          </div>
          {searchHistory.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderTop: index > 0 ? '1px solid var(--tech-border)' : 'none'
              }}
              onClick={() => handleSearch(item)}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3. 搜索过滤器

```tsx
function SearchWithFilters() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const filters = [
    { key: 'users', label: '用户' },
    { key: 'content', label: '内容' },
    { key: 'settings', label: '设置' },
  ];

  const toggleFilter = (filterKey) => {
    setActiveFilters(prev => 
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  return (
    <TechCard title="高级搜索">
      {/* 搜索框 */}
      <div style={{ marginBottom: '16px' }}>
        <TechSearch
          placeholder="搜索所有内容..."
          onSearch={setSearchValue}
          width="100%"
        />
      </div>

      {/* 过滤器 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <span style={{ color: '#7c89bf', fontSize: '14px', alignSelf: 'center' }}>
          筛选:
        </span>
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => toggleFilter(filter.key)}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid var(--tech-border)',
              background: activeFilters.includes(filter.key) 
                ? 'var(--tech-primary)' 
                : 'transparent',
              color: activeFilters.includes(filter.key) 
                ? '#ffffff' 
                : 'var(--tech-text)',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 搜索结果显示 */}
      {searchValue && (
        <div style={{ color: '#7c89bf' }}>
          搜索 "{searchValue}"
          {activeFilters.length > 0 && (
            <span> 在 {activeFilters.join(', ')} 中</span>
          )}
        </div>
      )}
    </TechCard>
  );
}
```

## 属性详解

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onSearch` | `(value: string) => void` | - | 搜索回调函数 |
| `placeholder` | `string` | "搜索..." | 占位符文本 |
| `width` | `number \| string` | `280` | 搜索框宽度 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `allowClear` | `boolean` | `true` | 是否显示清空按钮 |
| `value` | `string` | - | 受控模式的值 |
| `defaultValue` | `string` | - | 默认值 |
| `onChange` | `(e: ChangeEvent) => void` | - | 输入变化回调 |
| `onFocus` | `(e: FocusEvent) => void` | - | 获得焦点回调 |
| `onBlur` | `(e: FocusEvent) => void` | - | 失去焦点回调 |
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 与布局组件集成

### 在 TechLayout 中使用

```tsx
<TechLayout
  brand="我的应用"
  sidebarItems={menuItems}
  onSearch={(value) => {
    console.log('全局搜索:', value);
    // 处理全局搜索逻辑
  }}
  searchPlaceholder="全局搜索..."
>
  <div>页面内容</div>
</TechLayout>
```

### 在表格中使用

```tsx
function DataTable() {
  const [data, setData] = useState(originalData);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setData(originalData);
      return;
    }
    
    const filtered = originalData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setData(filtered);
  };

  return (
    <TechCard title="数据表格">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3>用户列表</h3>
        <TechSearch
          placeholder="搜索用户..."
          onSearch={handleSearch}
          width={300}
        />
      </div>
      {/* 表格内容 */}
      <table>{/* 表格数据 */}</table>
    </TechCard>
  );
}
```

## 样式定制

### 自定义宽度

```tsx
<TechSearch width={400} />      {/* 数字：像素值 */}
<TechSearch width="50%" />      {/* 字符串：百分比 */}
<TechSearch width="100%" />     {/* 全宽 */}
```

### 自定义样式

```tsx
<TechSearch
  style={{
    maxWidth: '500px',
    margin: '0 auto'
  }}
  className="my-custom-search"
/>
```

### CSS 变量定制

```css
.my-custom-search {
  --search-bg: var(--tech-panel-2);
  --search-border: var(--tech-accent);
  --search-focus-glow: var(--tech-glow);
}
```

## 键盘交互

- `Enter`: 触发搜索
- `Escape`: 清空搜索框（如果有内容）
- `Ctrl/Cmd + K`: 聚焦搜索框（需要自行实现）

### 实现全局搜索快捷键

```tsx
function GlobalSearch() {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K 聚焦搜索框
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TechSearch
      ref={searchRef}
      placeholder="搜索... (Ctrl+K)"
      onSearch={handleGlobalSearch}
    />
  );
}
```

## 常见问题

### 1. 搜索框无法获取焦点？

检查是否有其他元素阻挡或CSS样式问题：

```css
.search-container {
  position: relative;
  z-index: 1;
}
```

### 2. 如何实现搜索建议？

```tsx
function SearchWithSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 获取搜索建议
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TechSearch
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSearch(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3. 搜索性能优化？

使用防抖和缓存：

```tsx
import { useMemo } from 'react';
import { debounce } from 'lodash';

function OptimizedSearch() {
  const [cache, setCache] = useState(new Map());
  
  const debouncedSearch = useMemo(
    () => debounce(async (query) => {
      // 检查缓存
      if (cache.has(query)) {
        setResults(cache.get(query));
        return;
      }
      
      // 执行搜索并缓存结果
      const results = await performSearch(query);
      setCache(prev => new Map(prev).set(query, results));
      setResults(results);
    }, 300),
    [cache]
  );

  return <TechSearch onChange={(e) => debouncedSearch(e.target.value)} />;
}
```