import { computed, getCurrentInstance } from 'vue';
export const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => {
    var _a;
    return (
      ((_a = vm === null || vm === void 0 ? void 0 : vm.proxy) === null ||
      _a === void 0
        ? void 0
        : _a.$props[name]) || undefined
    );
  });
};
