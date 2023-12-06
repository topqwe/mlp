// .gitignore
// node_modules
// .DS_Store
// dist
// dist-ssr
// *.local

// npm i --save-dev @types/node

// "lib-flexible": "^0.3.2",
// "moment": "^2.29.1",
// "path": "^0.12.7",
// "@element-plus/icons": "^0.0.11",
// "@element-plus/icons-vue": "^1.1.3",
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//命令：npm install -D unplugin-auto-import unplugin-vue-components
// types路径自动生成
// 配置组件自动注册的插件 vue函数
// 配置 vant UI 组件库的解析器
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'


import path from 'path'; 
const pathSrc = path.resolve(__dirname,'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //自动导入vue相关的函数
    // defineComponent,reactive, ref,toRefs,onMounted,watch, watchEffect} from 'vue';
   AutoImport(
    {
    imports:['vue'],
    dts:path.resolve(pathSrc,'types','auto-import.d.ts') 
    }
   ) ,
  // 样式重复引入，类型声明文件重复了
  Components({
    dts:path.resolve(pathSrc,'types','components.d.ts')
    // dts: false,
    // resolvers: [VantResolver({ importStyle: false })]
  }),

],
  base:"./",//打包路径
  resolve: {
    alias:{
      '@': pathSrc//设置别名
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
//   define: {
//     // By default, Vite doesn't include shims for NodeJS/
//     // necessary for segment analytics lib to work
//     global: '({})',
//     process: { env: { HOME: './src' } },
// },
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
