import { computed } from 'vue';
import { useProp } from '../use-prop';
export const useDisable = () => {
  const disable = useProp('disable');
  return computed(() => disable.value || false);
};
