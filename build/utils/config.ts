import path from 'path';
import { outDir } from './paths';
export const buildConfig = {
  esm: {
    module: 'ESNext', // tsconfig 输出 esm 模块
    format: 'esm', // 输出格式为 esm, 作为一个前端开发, 不需要介绍什么叫esm模式吧
    output: {
      name: 'es', // 打包到dist的那个目录下
      path: path.resolve(outDir, 'es')
    },
    bundle: {
      path: 'sw-plus/es'
    }
  },
  cjs: {
    module: 'CommonJS', // tsconfig 输出 esm 模块
    format: 'cjs', // 输出格式为 esm, 作为一个前端开发, 不需要介绍什么叫esm模式吧
    output: {
      name: 'lib', // 打包到dist的那个目录下
      path: path.resolve(outDir, 'lib')
    },
    bundle: {
      path: 'sw-plus/lib'
    }
  }
};

export type BuildConfig = typeof buildConfig;
