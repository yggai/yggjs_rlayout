#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 修改入口点指向dist目录
packageJson.main = './dist/index.cjs';
packageJson.module = './dist/index.js';
packageJson.types = './dist/index.d.ts';
packageJson.exports = {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./tech": {
    "types": "./dist/tech/index.d.ts",
    "import": "./dist/tech/index.js",
    "require": "./dist/tech/index.cjs"
  }
};

// 写回package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('✅ Package.json updated for publishing (pointing to dist)');
