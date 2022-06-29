/**
 * @file 存放公共的 PATH
 */

import path from 'path';

// 项目根目录
export const projectRoot = path.resolve(__dirname, '../../');

// 打包输出目录
export const outDir = path.resolve(__dirname, '../../dist');

// sw-plus 和 index.ts 的入口
export const swpRoot = path.resolve(__dirname, '../../packages/sw-plus');

// 组件目录
export const compRoot = path.resolve(projectRoot, 'packages/components');
