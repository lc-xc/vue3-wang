import {
  fileURLToPath,
  URL
} from 'node:url'

import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    },
  },
  // 开发环境的配置
  server: {
    hmr: true, // 启用热更新
    port: 5173, // 开发端口号
    host: true, // 指定本机ip作为服务地址
    https: true,
    open: false, // 自动打开默认浏览器
    proxy: { // 接口代理
      // '/backendName': {
      //   target: 'http://10.1.60.91:8889',
      //   changeOrigin: true
      // },
      // '/VC': {
      //   target: 'http://10.1.60.91:8008',
      //   changeOrigin: true
      // },
      // '/qin': {
      //   target: 'http://localhost:8086',
      //   // target: 'http://10.23.11.169:8086',
      //   // target: 'http://10.23.20.10:8086',
      //   changeOrigin: true
      // }
      // '/ureport': {
      //   target: 'http://10.23.12.11:8083',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/ureport/, '/ureport')
      // },
      // '/token3rd': {
      //   target: 'http://10.80.9.34',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/token3rd/, '/token3rd')
      // }
    }
  }
})
