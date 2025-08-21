#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 恢复入口点指向src目录（开发模式）
packageJson.main = './src/index.ts';
packageJson.module = './src/index.ts';
packageJson.types = './src/index.ts';
packageJson.exports = {
  ".": {
    "types": "./src/index.ts",
    "import": "./src/index.ts",
    "require": "./src/index.ts"
  },
  "./tech": {
    "types": "./src/tech/index.ts",
    "import": "./src/tech/index.ts",
    "require": "./src/tech/index.ts"
  }
};

// 写回package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('✅ Package.json restored for development (pointing to src)');
