import { ExtractPropTypes } from 'vue';

export const motionSwitchProps = {
  type: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  direction: {
    type: String,
    default: 'up'
  },
  disable: {
    type: Boolean,
    default: false
  }
};

export type MontionSwitchProps = ExtractPropTypes<typeof motionSwitchProps>;
