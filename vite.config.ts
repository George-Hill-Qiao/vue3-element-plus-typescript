import { UserConfigExport, ConfigEnv } from 'vite';

import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
  };
};