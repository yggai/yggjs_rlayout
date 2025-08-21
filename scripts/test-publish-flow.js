#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing complete publish flow...\n');

// 1. 确保从开发配置开始
console.log('1️⃣ Ensuring development configuration...');
execSync('node scripts/restore-dev.js', { stdio: 'inherit' });

// 2. 删除dist目录（模拟没有构建的情况）
console.log('2️⃣ Removing dist directory...');
try {
  fs.rmSync(path.join(__dirname, '../dist'), { recursive: true, force: true });
  console.log('   ✅ dist directory removed');
} catch (error) {
  console.log('   ℹ️ dist directory was not present');
}

// 3. 验证示例代码能在没有dist的情况下运行
console.log('3️⃣ Testing example without dist directory...');
try {
  // 这里我们只检查能否解析模块，不实际启动服务器
  execSync('cd example && pnpm build', { stdio: 'pipe' });
  console.log('   ✅ Example builds successfully without dist');
} catch (error) {
  console.log('   ❌ Example failed to build without dist');
  console.error(error.message);
  process.exit(1);
}

// 4. 运行prepublishOnly（构建、测试、准备发布）
console.log('4️⃣ Running prepublishOnly...');
try {
  execSync('pnpm run prepublishOnly', { stdio: 'inherit' });
  console.log('   ✅ prepublishOnly completed successfully');
} catch (error) {
  console.log('   ❌ prepublishOnly failed');
  console.error(error.message);
  process.exit(1);
}

// 5. 验证package.json指向dist
console.log('5️⃣ Verifying package.json points to dist...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
if (packageJson.main === './dist/index.cjs' && packageJson.module === './dist/index.js') {
  console.log('   ✅ package.json correctly points to dist');
} else {
  console.log('   ❌ package.json does not point to dist');
  process.exit(1);
}

// 6. 验证dist目录存在
console.log('6️⃣ Verifying dist directory exists...');
if (fs.existsSync(path.join(__dirname, '../dist'))) {
  console.log('   ✅ dist directory exists');
} else {
  console.log('   ❌ dist directory does not exist');
  process.exit(1);
}

// 7. 测试npm pack
console.log('7️⃣ Testing npm pack...');
try {
  execSync('npm pack --dry-run', { stdio: 'pipe' });
  console.log('   ✅ npm pack works correctly');
} catch (error) {
  console.log('   ❌ npm pack failed');
  console.error(error.message);
  process.exit(1);
}

// 8. 运行postpublish（恢复开发配置）
console.log('8️⃣ Running postpublish...');
try {
  execSync('pnpm run postpublish', { stdio: 'inherit' });
  console.log('   ✅ postpublish completed successfully');
} catch (error) {
  console.log('   ❌ postpublish failed');
  console.error(error.message);
  process.exit(1);
}

// 9. 验证package.json恢复指向src
console.log('9️⃣ Verifying package.json restored to src...');
const restoredPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
if (restoredPackageJson.main === './src/index.ts' && restoredPackageJson.module === './src/index.ts') {
  console.log('   ✅ package.json correctly restored to src');
} else {
  console.log('   ❌ package.json was not restored to src');
  process.exit(1);
}

console.log('\n🎉 All tests passed! The publish flow works correctly.');
console.log('\n📋 Summary:');
console.log('   • Development mode: package.json points to src/');
console.log('   • Example works without dist directory');
console.log('   • prepublishOnly: builds, tests, and prepares for publish');
console.log('   • Publish mode: package.json points to dist/');
console.log('   • npm pack includes all necessary files');
console.log('   • postpublish: restores development configuration');
