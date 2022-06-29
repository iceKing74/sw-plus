/**
 * @file 一些公共方法
 */

import { spawn } from 'child_process';
import { projectRoot } from './paths';

// 自定义每一个 task 的 name
export const withTaskName = <T>(name: string, fn: T) => {
  return Object.assign(fn, { displayName: name });
};

/**
 * 在node中开启一个子进程来运行脚本
 *
 * 子进程
 * child_process.spawn(command[, args][, options])
 * command <string> 要运行的命令。
 * args <string[]> 字符串参数列表。
 * options <Object>
 *  - cwd <string> | <URL> 子进程的当前工作目录
 *  - stdio <Array> | <string> 子进程的标准输入输出配置。'inherit'：通过相应的标准输入输出流传入/传出父进程
 * - shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用    process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）x
 */
export const run = async (command: string) => {
  return new Promise((resolve) => {
    // 命令分割,诸如rm -rf 分割为  ['rm', '-rf']
    const [cmd, ...args] = command.split(' ');
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    // 在进程已结束并且子进程的标准输入输出流已关闭后,则触发'close'事件
    app.on('close', resolve);
  });
};

// 重写打包后的 @sw-plus 路径
export const pathRewriter = (format) => {
  return (id: string) => {
    id = id.replaceAll('@sw-plus', `sw-plus/${format}`);
    return id;
  };
};
