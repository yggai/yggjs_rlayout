/**
 * 测试环境类型定义
 * 
 * 扩展Vitest的类型定义，包含@testing-library/jest-dom的自定义匹配器
 */

/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="node" />

import '@testing-library/jest-dom/vitest';

// 扩展全局变量
declare global {
  const global: typeof globalThis;
  
  // 扩展process变量用于测试环境
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      [key: string]: string | undefined;
    }
  }
}

