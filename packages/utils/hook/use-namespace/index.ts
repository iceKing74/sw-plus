const defaultNamespace = 'sw';
const statePrefix = 'is';

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += blockSuffix;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block: string) => {
  const namespace = defaultNamespace;
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '');
  const m = (modifier = '') =>
    modifier ? _bem(namespace, block, '', modifier) : '';
  const is = (name: string, state: boolean | undefined): string => {
    return name && state ? `${statePrefix}-${name}` : '';
  };
  return {
    b,
    m,
    is
  };
};
