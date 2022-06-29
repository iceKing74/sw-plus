import * as compoents from '@sw-plus/components';
import { App } from 'vue';

const install = (app: App) => {
  Object.entries(compoents).forEach(([name, component]) => {
    app.component(name, component);
  });
};

export default {
  install
};

export * from '@sw-plus/components';
