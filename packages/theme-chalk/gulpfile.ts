/**
 * @file 打包样式
 * 安装相关依赖: pnpm install gulp-sass @types/gulp-sass @types/sass gulp-autoprefixer @types/gulp-autoprefixer @types/gulp-clean-css gulp-clean-css -w -D
 * gulp-autoprefixer:添加样式前缀  gulp-clean-css：压缩css
 */

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import path from 'path';

/**
 * TIPS
 * gulp 流式操作,从出发点依次执行到结束点,一步步依次执行(正统说法:管道一样的执行)
 */
import { series, src, dest } from 'gulp';

// 处理 sass 文件
function compile() {
  const sass = gulpSass(dartSass);

  /**
   * 这些流都在做些什么?
   * 从scr的 sass 文件开始 => 编译成css 添加前缀 => 压缩 => 最终输出到当前目录的dist的css目录下
   */
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .on('data', (data) => {
      let content = data.contents.toString();
      content = content.replaceAll('./fonts', '../fonts'); // sw-plus/theme-chalk/fonts
      data.contents = new Buffer(content);
    })
    .pipe(cleancss())
    .pipe(dest('./dist/css'));
}

// 处理font文件
function copyfont() {
  // 这里也是简单的将font下的三个格式文件复制 => 压缩 => 输出到打包放置文件中
  return src(path.resolve(__dirname, './src/fonts/**')).pipe(
    dest('./dist/fonts')
  );
}

// 将打包好的 css 输出到根目录的dist
function copyfullstyle() {
  const rootDistPath = path.resolve(__dirname, '../../dist/theme-chalk');
  return src(path.resolve(__dirname, './dist/**')).pipe(dest(rootDistPath));
}

export default series(compile, copyfont, copyfullstyle);
