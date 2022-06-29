/**
 * @file 打包每一个组件
 * 安装依赖 pnpm install fast-glob -w -D
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { series, parallel } from 'gulp';
import { sync } from 'fast-glob'; // 同步查找文件
import { compRoot, outDir, projectRoot, swpRoot } from './utils/paths';
import path from 'path';
import { rollup, OutputOptions } from 'rollup';
import { buildConfig } from './utils/config';
import { pathRewriter, run } from './utils';
import { Project, SourceFile } from 'ts-morph';
import glob from 'fast-glob';
import * as VueCompiler from '@vue/compiler-sfc';
import fs from 'fs/promises';

const buildEachComponent = async () => {
  // 打包每一个组件,查找components下的所有组件目录
  const files = sync('*', {
    cwd: compRoot,
    onlyDirectories: true // 只查找文件夹
  });

  const builds = files.map(async (file: string) => {
    const input = path.resolve(compRoot, file, 'index.ts');
    const config = {
      input,
      plugins: [nodeResolve(), typescript(), vue(), commonjs()],
      external: (id) => /^vue/.test(id) || /^@w-plus/.test(id) // 排除掉vue和@w-plus的依赖
    };
    const bundle = await rollup(config);
    const options = Object.values(buildConfig).map((config) => {
      return {
        format: config.format,
        file: path.resolve(config.output.path, `components/${file}/index.js`),
        paths: pathRewriter(config.output.name), // @sw-plus => @sw-plus/es @sw-plus/lin 处理路径
        exports: 'named'
      };
    });

    await Promise.all(
      options.map((options) => {
        return bundle.write(options as OutputOptions);
      })
    );
  });

  return Promise.all(builds);
};

async function genTypes() {
  const project = new Project({
    // 生成一个.d.ts文件,就必须要也给tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, 'types'),
      baseUrl: projectRoot,
      paths: {
        '@sw-plus/*': ['packages/*']
      },
      skipLibCheck: true,
      strict: false
    },
    tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  });

  const filePaths = await glob('**/*', {
    // ** 任意目录 * 任意文件
    cwd: compRoot,
    onlyFiles: true,
    absolute: true
  });

  const sourceFiles: SourceFile[] = [];

  await Promise.all(
    filePaths.map(async function (file) {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8');
        const sfc = VueCompiler.parse(content);
        const { script } = sfc.descriptor;
        if (script) {
          let content = script.content; // 拿到脚本 icon.vue.ts => icon.vue.d.ts
          const sourceFile = project.createSourceFile(file + '.ts', content);
          sourceFiles.push(sourceFile);
        } else {
          const sourceFile = project.addSourceFileAtPath(file); // 把所有的ts文件都放在一起,发射成 .d.ts 文件
          sourceFiles.push(sourceFile);
        }
      }
    })
  );

  await project.emit({
    // 默认都是放在内存中的
    emitOnlyDtsFiles: true
  });

  const tasks = sourceFiles.map(async (sourceFiles: any) => {
    const emitOutput = sourceFiles.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFiles: any) => {
      const filepath = outputFiles.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true
      });
      await fs.writeFile(filepath, pathRewriter('es')(outputFiles.getText()));
    });
    await Promise.all(tasks);
  });

  await Promise.all(tasks);
}

function copyTypes() {
  const src = path.resolve(outDir, 'types/components/');
  const copy = (module) => {
    let output = path.resolve(outDir, module, 'components');
    return () => run(`cp -r ${src}/* ${output}`);
  };
  return parallel(copy('es'), copy('lib'));
}

async function buildComponentEntry() {
  const config = {
    input: path.resolve(compRoot, 'index.ts'),
    plugins: [typescript()],
    external: () => true
  };

  const bundle = await rollup(config);
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => {
        return {
          format: config.format,
          file: path.resolve(config.output.path, 'components/index.js')
        };
      })
      .map((config) => bundle.write(config as OutputOptions))
  );
}

export const buildComponent = series(
  buildEachComponent,
  genTypes,
  copyTypes(),
  buildComponentEntry
);
