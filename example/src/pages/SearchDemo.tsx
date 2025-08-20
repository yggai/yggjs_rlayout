import React, { useState } from 'react';
import { Search } from 'yggjs_rlayout';

const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const paths = {
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
};

export default function SearchDemo() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // 模拟搜索延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 模拟搜索结果
    const mockResults = [
      `Found "${value}" in Documentation`,
      `Found "${value}" in Components`,
      `Found "${value}" in Examples`,
      `Found "${value}" in API Reference`,
      `Found "${value}" in Tutorials`
    ].filter(() => Math.random() > 0.3); // 随机显示一些结果
    
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <style>{`
        .search-demo-container {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .demo-section {
          margin-bottom: 40px;
        }
        
        .demo-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .demo-subtitle {
          color: #6b7280;
          margin-bottom: 24px;
          font-size: 16px;
        }
        
        .search-examples {
          display: grid;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .search-example {
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .example-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .search-results {
          margin-top: 20px;
          padding: 16px;
          background: #f0f9ff;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        
        .result-item {
          padding: 8px 0;
          color: #1e40af;
          border-bottom: 1px solid #e0f2fe;
        }
        
        .result-item:last-child {
          border-bottom: none;
        }
        
        .no-results {
          color: #6b7280;
          font-style: italic;
        }
        
        .feature-list {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-top: 32px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          color: #374151;
        }
        
        .feature-icon {
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>

      <div className="search-demo-container">
        <div className="demo-section">
          <h1 className="demo-title">🔍 Enhanced Search Component</h1>
          <p className="demo-subtitle">
            Beautiful, interactive search component with right-side icon and Enter key support
          </p>

          <div className="search-examples">
            <div className="search-example">
              <div className="example-label">🎯 主搜索 (带实时结果)</div>
              <Search
                placeholder="试试搜索 'react', 'components', 或 'documentation'..."
                size="large"
                variant="outlined"
                showSearchIcon={true}
                allowClear={true}
                loading={isSearching}
                style={{ width: '100%' }}
                onSearch={handleSearch}
              />
              
              {(searchResults.length > 0 || isSearching) && (
                <div className="search-results">
                  <strong>Search Results:</strong>
                  {isSearching ? (
                    <div className="result-item">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <div key={index} className="result-item">{result}</div>
                    ))
                  ) : (
                    <div className="result-item no-results">No results found</div>
                  )}
                </div>
              )}
            </div>

            <div className="search-example">
              <div className="example-label">🎨 幽灵样式 (适用于深色主题)</div>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <Search
                  size="medium"
                  variant="ghost"
                  showSearchIcon={true}
                  allowClear={true}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#f9fafb'
                  }}
                  inputStyle={{ color: '#f9fafb' }}
                  onSearch={(value) => alert(`深色主题搜索: ${value}`)}
                />
              </div>
            </div>

            <div className="search-example">
              <div className="example-label">📝 带前缀图标</div>
              <Search
                placeholder="搜索用户..."
                size="medium"
                variant="filled"
                showSearchIcon={true}
                allowClear={true}
                prefix={<Icon d={paths.user} size={16} />}
                style={{ width: '100%' }}
                onSearch={(value) => alert(`用户搜索: ${value}`)}
              />
            </div>

            <div className="search-example">
              <div className="example-label">🔧 紧凑尺寸</div>
              <Search
                size="small"
                variant="outlined"
                showSearchIcon={true}
                allowClear={true}
                style={{ width: '300px' }}
                onSearch={(value) => alert(`快速搜索: ${value}`)}
              />
            </div>
          </div>
        </div>

        <div className="feature-list">
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#1f2937' }}>✨ Key Features</h3>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Right-side search icon</strong> - Clickable icon positioned in the input field</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Enter key support</strong> - Press Enter to trigger search</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Beautiful animations</strong> - Smooth hover and click effects</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Multiple variants</strong> - Outlined, filled, and ghost styles</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Flexible sizing</strong> - Small, medium, and large sizes</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Loading states</strong> - Built-in loading indicator</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span><strong>Clear functionality</strong> - Easy-to-use clear button</span>
          </div>
        </div>
      </div>
    </div>
  );
}
