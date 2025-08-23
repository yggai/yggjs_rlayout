/**
 * CSS 模块声明文件
 * 
 * 为 TypeScript 提供 CSS 模块的类型定义支持。
 * 该文件声明了 *.module.css 文件的模块类型，使得在 TypeScript 项目中
 * 可以安全地导入和使用 CSS 模块的类名。
 * 
 * CSS 模块的优势：
 * - 样式局部化：避免全局样式冲突
 * - 类型安全：TypeScript 可以检查类名的正确性
 * - 按需加载：只加载组件使用的样式
 * - 维护性好：样式与组件紧密绑定
 * 
 * @example
 * ```tsx
 * // 导入CSS模块
 * import styles from './Component.module.css';
 * 
 * // 使用CSS类名
 * function Component() {
 *   return (
 *     <div className={styles.container}>
 *       <h1 className={styles.title}>标题</h1>
 *     </div>
 *   );
 * }
 * ```
 */

declare module '*.module.css' {
  /** CSS 模块导出的类名映射对象，键为CSS类名，值为编译后的类名字符串 */
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * 扩展vitest的expect断言方法，支持@testing-library/jest-dom的自定义匹配器
 * 解决TypeScript类型检查错误
 */
declare namespace Vi {
  interface Assertion<T = any> {
    /** 检查元素是否在DOM中存在 */
    toBeInTheDocument(): void;
    /** 检查元素是否具有指定的CSS样式 */
    toHaveStyle(style: string | Record<string, any>): void;
    /** 检查元素是否具有指定的属性 */
    toHaveAttribute(attribute: string, value?: string): void;
    /** 检查表单元素是否具有指定的值 */
    toHaveValue(value: string | number): void;
    /** 检查元素是否具有指定的CSS类 */
    toHaveClass(className: string): void;
    /** 检查元素是否被禁用 */
    toBeDisabled(): void;
  }
}

/**
 * 全局开发环境标识符
 * 用于条件编译和开发调试
 */
declare const __DEV__: boolean;

