<template>
  <div
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.m(direction),
      ns.is('disable', disable)
    ]"
  >
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { motionSwitchProps } from './index';
import { useNamespace, useDisable } from '@sw-plus/utils/hook/index';

export default defineComponent({
  name: 'SwMotionSwitch',
  props: motionSwitchProps,
  setup(props) {
    const ns = useNamespace('motion-switch');
    const type = computed(() => props.type);
    const disable = useDisable();
    const size = computed(() => props.size);
    const direction = computed(() => props.direction);

    return {
      ns,
      type,
      disable,
      size,
      direction
    };
  }
});
</script>
