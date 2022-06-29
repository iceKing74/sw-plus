'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useNamespace = void 0;
const defaultNamespace = 'sw';
const statePrefix = 'is';
const _bem = (namespace, block, blockSuffix, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += blockSuffix;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const useNamespace = (block) => {
  const namespace = defaultNamespace;
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '');
  const m = (modifier = '') =>
    modifier ? _bem(namespace, block, '', modifier) : '';
  const is = (name, state) => {
    return name && state ? `${statePrefix}-${name}` : '';
  };
  return {
    b,
    m,
    is
  };
};
exports.useNamespace = useNamespace;
