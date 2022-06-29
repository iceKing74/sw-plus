/**
 * @file 专门打包 util, hook, 指令
 */

import { series, parallel, src, dest } from 'gulp';
import { buildConfig } from './utils/config';
import path from 'path';
import { outDir, projectRoot } from './utils/paths';
import ts from 'gulp-typescript';
import { withTaskName } from './utils';

// 打包处理,安装依赖 gulp-typescript
export const buildPackages = (dirname: string, name: string) => {
  /**
   * 那么这个地方是干嘛呢?
   * 遍历 buildConfig里写好的两种输出模式,即 esm 和 cjs
   */
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name);

    // 处理ts文件
    return series(
      withTaskName(`build${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json');
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules'];
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 需要生成声明文件
              strict: false, // 关闭严格模式
              module: config.module
            })()
          )
          .pipe(dest(output));
      }),
      withTaskName(`copy:${dirname}`, () => {
        // 将打包好的文件放到 es=> utils 和 lib => utils.再将utils模块宝贝到dist木下的es和lib目录
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        );
      })
    );
  });

  // 并行执行 esm 和 cjs 流,串行执行各自的打包过程
  return parallel(...tasks);
};
