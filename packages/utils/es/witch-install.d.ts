import type { Plugin } from 'vue';
export declare type SFCWitchInstall<T> = T & Plugin;
export declare const withInstall: <T>(comp: T) => SFCWitchInstall<T>;
