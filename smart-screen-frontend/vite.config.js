import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 给 ./src 起别名为 @
  resolve: {
    alias: {
        '@': resolve('src')
    }
  },
  // 强制启用 hmr 热更新
  server: {
    hmr: true
  }
})
