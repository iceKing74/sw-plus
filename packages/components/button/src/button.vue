<template>
  <button
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('disable', disable),
      ns.is('plain', plain),
      ns.is('loading', loading)
    ]"
    :disabled="disable || loading"
  >
    <sw-icon v-if="loading" :class="ns.is('loading', loading)">
      <slot name="loading">
        <i class="sw-icon-loading"></i>
      </slot>
    </sw-icon>

    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { buttonProps } from './index';
import SwIcon from '@sw-plus/components/icon';
import { useNamespace, useDisable } from '@sw-plus/utils/hook';

export default defineComponent({
  components: {
    SwIcon
  },
  name: 'SwButton',
  props: buttonProps,
  setup(props) {
    const ns = useNamespace('button');
    const type = computed(() => props.type);
    const size = computed(() => props.size);
    const disable = useDisable();
    const plain = computed(() => props.plain);
    const loading = computed(() => props.loading);

    return {
      ns,
      type,
      size,
      disable,
      plain,
      loading
    };
  }
});
</script>
