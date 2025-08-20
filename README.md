## yggjs_rlayout

一个专为 React 项目打造的页面布局组件库。提供一致、可复用、可测试的布局原子能力，帮助你快速搭建复杂页面布局。

- 作者: 源滚滚
- 邮箱: 1156956636@qq.com
- 许可证: PolyForm Noncommercial License 1.0.0（学习与研究免费，商业使用需联系作者取得书面授权）
- 项目定位: 个人研究项目，不接受代码合并（PR），但欢迎提交 Issue
- 包管理工具: pnpm

---

### 为什么是 yggjs_rlayout
- 以“无样式/低样式”为默认，聚焦布局语义与行为，样式可完全接管
- 强类型 API，尽量在编译期发现问题
- TDD 驱动，核心逻辑都有可回归的单元测试
- 每个组件独立目录，便于维护与拓展

---

### 特性与路线图（规划中）
- Layout 组件：水平/垂直、分栏/栅格、吸顶/固定、响应式断点
- 统一的间距系统与令牌化样式（Design Tokens）
- SSR/CSR 兼容，良好的 TypeScript 类型提示
- 完整的单元测试与可视化示例

Roadmap（优先级从上到下）：
1) Layout 基础能力（direction/gap/align/justify/wrap）
2) Item 弹性能力（flex/grow/shrink/order）
3) 栅格/分栏（span、gutter、响应式断点）
4) 固定/吸顶/Sticky 能力
5) 无障碍与键盘导航细节

---

### 安装与使用

1) 在本仓库中安装依赖（中国大陆网络建议使用 npmmirror 源）：

```bash
pnpm install --registry=https://registry.npmmirror.com
```

2) 在你的项目中安装（当库发布到 npm 后）：

```bash
pnpm add yggjs_rlayout
```

Peer 依赖（建议）：React 18+，TypeScript 5+

3) 基本用法（API 尚在设计中，以下为预期用法草案）：

```tsx
import { Layout } from 'yggjs_rlayout';

export default function Demo() {
  return (
    <Layout direction="horizontal" gap={8} align="center" justify="space-between">
      <Layout.Item flex={1}>Left</Layout.Item>
      <Layout.Item width={240}>Right</Layout.Item>
    </Layout>
  );
}
```

---

### 目录结构（建议）

```text
yggjs_rlayout/
├─ src/
│  ├─ components/
│  │  └─ layout/
│  │     ├─ Layout.tsx           # 组件实现
│  │     ├─ index.ts             # 组件导出
│  │     ├─ Layout.test.tsx      # TDD 单测
│  │     ├─ Layout.stories.tsx   # 可选：组件示例
│  │     └─ README.md            # 组件内说明
│  └─ index.ts                   # 包主入口
├─ tests/                        # 跨组件/集成测试（可选）
├─ docs/                         # 文档与教程
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts              # 或 jest.config.ts
├─ LICENSE
└─ README.md
```

每个组件一个单独目录，内含实现、测试、说明，便于维护与独立发布。

---

### 开发环境与脚本（建议）
- Node.js ≥ 18，pnpm ≥ 8（包管理工具使用 pnpm）
- 代码风格建议：ESLint + Prettier

建议在 package.json 中添加脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsup src/index.ts --dts --format esm,cjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

常用命令：
- 安装依赖：pnpm install --registry=https://registry.npmmirror.com
- 运行测试：pnpm test 或 pnpm test:watch
- 构建产物：pnpm build（产出 ESM/CJS 与 d.ts）

---

### TDD 测试驱动（建议流程）
1. 先写测试：明确组件行为与边界条件
2. 实现最小逻辑：仅满足测试通过
3. 重构与完善：在测试保护下优化性能/类型

测试栈推荐：
- 测试运行器：Vitest
- React 测试：@testing-library/react + jsdom
- 覆盖率：vitest --coverage（可选）

示例测试（预期 API）：

```tsx
import { render } from '@testing-library/react';
import { Layout } from '@/components/layout';

it('renders horizontal layout with gap', () => {
  const { getByTestId } = render(
    <Layout direction="horizontal" gap={8} data-testid="layout">
      <Layout.Item>Item</Layout.Item>
    </Layout>
  );
  expect(getByTestId('layout')).toBeInTheDocument();
});
```

---

### Layout 组件 API（草案）
- Layout props：
  - direction: 'horizontal' | 'vertical'（默认 vertical）
  - gap: number | { x?: number; y?: number }
  - align: 'start' | 'center' | 'end' | 'stretch'
  - justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  - wrap: boolean
  - as?: keyof JSX.IntrinsicElements（渲染元素，默认 div）
  - className?: string; style?: React.CSSProperties
- Layout.Item props：
  - flex?: number | string（例如 1 或 '0 0 auto'）
  - grow?: number; shrink?: number; order?: number
  - span?: number（用于栅格），width?: number | string

---

### 发布与版本策略（建议）
- 版本管理：SemVer
- 变更记录：Changesets 或 Conventional Commits
- 构建产物：ESM + CJS + 类型声明（.d.ts）
- 浏览器支持：现代浏览器 + SSR 兼容

---

### 贡献
- 本项目为个人研究项目：不接受 PR
- 欢迎提交 Issue 进行讨论、反馈与需求建议

---

### 许可证
- PolyForm Noncommercial License 1.0.0
- 学习/研究用途免费，商业使用请联系作者（1156956636@qq.com）获得书面授权

---

### 联系方式
- 作者：源滚滚
- 邮箱：1156956636@qq.com
