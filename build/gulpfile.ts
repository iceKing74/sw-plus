// 打包方式:  series(串行)  parallel(并行)
import { series, parallel } from 'gulp';
import { genTypes } from './gen-types';
import { withTaskName, run } from './utils';
import { outDir, swpRoot } from './utils/paths';

// gulp 并不是打包,而是代码转化 vite

const copySourceCode = () => async () => {
  await run(`cp ${swpRoot}/package.json ${outDir}/package.json`);
};

/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每一个组件
 * 5. 生成一个组件库
 * 6. 发布
 */
export default series(
  withTaskName('clean', async () => run('rm -rf ./dist')), // 删除dist目录,终端启用git bash模式打开

  parallel(
    withTaskName('buildPackages', () =>
      run('pnpm run --filter ./packages/** --parallel build')
    ),
    withTaskName('buildFullComponent', () =>
      run('pnpm run build buildFullComponent')
    ),
    withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
  ),

  parallel(genTypes, copySourceCode())
);

// 任务执行器 gulp 任务名 就会执行对应的任务
export * from './full-component';
export * from './component';
