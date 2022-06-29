/**
 * @file install函数，供 app实例 use（） 时挂载组件
 * use便会执行install方法，则会挂在组件
 */

import type { App, Plugin } from 'vue';

// 类型必须导出，否则无法生成.d.ts文件
export type SFCWitchInstall<T> = T & Plugin;

/**
 * 定义一个witchInstall，use时是挂载操作
 * @param comp 组件实例
 */
export const withInstall = <T>(comp: T) => {
  // 直接写comp.intall 会报错，因为组件本身没有install方法，所以在vue引用此类型，断言 comp为T&Plugin
  (comp as SFCWitchInstall<T>).install = function (app: App) {
    app.component((comp as any).name, comp);
  };
  return comp as SFCWitchInstall<T>;
};
