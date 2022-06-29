export declare const useNamespace: (block: string) => {
  b: (blockSuffix?: string) => string;
  m: (modifier?: string) => string;
  is: (name: string, state: boolean | undefined) => string;
};
