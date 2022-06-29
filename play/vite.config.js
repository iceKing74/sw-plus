import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// TODO 这TM在干嘛呢？
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3010,
    host: true
  }
});
