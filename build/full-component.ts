/**
 * @file 打包组件库
 * 安装依赖 pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { parallel } from 'gulp';
import path from 'path';
import { outDir, swpRoot } from './utils/paths';
import { rollup, OutputOptions } from 'rollup';
import fs from 'fs/promises';
import { buildConfig } from './utils/config';
import { pathRewriter } from './utils';

const buildFull = async () => {
  // rollup配置信息
  const config = {
    input: path.resolve(swpRoot, 'index.ts'), // 打包入口
    plugins: [nodeResolve(), typescript(), vue(), commonjs()],
    external: (id) => /^vue/.test(id) // 不打包vue文件
  };

  // 组件库两种方式导入, 第一种import  第二种script标签

  // esm umd
  const buildConfig = [
    {
      name: 'swPlus',
      format: 'umd',
      file: path.resolve(outDir, 'index.js'),
      exports: 'named',
      global: {
        vue: 'Vue'
      }
    },
    {
      format: 'esm',
      file: path.resolve(outDir, 'index.esm.js')
    }
  ];

  let bundle = await rollup(config);

  return Promise.all(
    buildConfig.map((options) => {
      bundle.write(options as OutputOptions);
    })
  );
};

async function buildEntry() {
  const entryFiles = await fs.readdir(swpRoot, { withFileTypes: true });

  const enteryPoints = entryFiles
    .filter((f) => f.isFile())
    .filter((f) => !['package.json'].includes(f.name))
    .map((f) => path.resolve(swpRoot, f.name));

  const config = {
    input: enteryPoints,
    plugins: [nodeResolve(), vue(), typescript()],
    external: (id: string) => /^vue/.test(id) || /@sw-plus/.test(id)
  };
  const bunlde = await rollup(config);
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => {
        return {
          format: config.format,
          dir: config.output.path,
          paths: pathRewriter(config.output.name)
        };
      })
      .map((option) => {
        return bunlde.write(option as OutputOptions);
      })
  );
}

export const buildFullComponent = parallel(buildFull, buildEntry);
