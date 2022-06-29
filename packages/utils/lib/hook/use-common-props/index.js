'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useDisable = void 0;
const vue_1 = require('vue');
const use_prop_1 = require('../use-prop');
const useDisable = () => {
  const disable = (0, use_prop_1.useProp)('disable');
  return (0, vue_1.computed)(() => disable.value || false);
};
exports.useDisable = useDisable;
