import { createApp } from 'vue';
import App from './src/motion-switch.vue';
import { SwIcon, SwButton, SwMontionSwitch } from '@sw-plus/components';
import '@sw-plus/theme-chalk/src/index.scss';

const app = createApp(App);

app.use(SwIcon).use(SwButton).use(SwMontionSwitch).mount('#app');
