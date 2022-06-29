'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useProp = void 0;
const vue_1 = require('vue');
const useProp = (name) => {
  const vm = (0, vue_1.getCurrentInstance)();
  return (0, vue_1.computed)(() => {
    var _a;
    return (
      ((_a = vm === null || vm === void 0 ? void 0 : vm.proxy) === null ||
      _a === void 0
        ? void 0
        : _a.$props[name]) || undefined
    );
  });
};
exports.useProp = useProp;
