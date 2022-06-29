// 存放props与公共方法
import type { ExtractPropTypes } from 'vue';

// as const 会让对象的每个属性都变成只读
export const iconProps = {
  size: {
    type: Number
  },
  color: {
    type: String
  }
} as const;

export type iconProps = ExtractPropTypes<typeof iconProps>;
