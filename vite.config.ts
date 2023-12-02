import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"./",//打包路径
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')//设置别名
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    port:7000,//启动端口
    open: true,
    proxy: {
      // 选项写法
      '/api': 
      // 'http://123.56.85.24:5000'//代理网址
{
  target: 'http://123.56.85.24:5000',
  //'真实接口服务地址',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')     // 注意代理地址的重写
}
      
    },
    cors:true
  }

})
