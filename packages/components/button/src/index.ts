import type { ExtractPropTypes } from 'vue';

export const buttonProps = {
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
