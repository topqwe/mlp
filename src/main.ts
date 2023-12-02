import { createApp } from 'vue'
import App from './App.vue'
// import { NavBar } from 'vant';
import router from "./router";
import store from "./store";
// 将store、router挂载到全局变量上, 方便使用
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router";
 
import ant from "./utils/ant"; 


import Vant from 'vant'  
import 'vant/lib/index.css';// 移动端全局引入样式

// Toast
import { Toast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { Dialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { Notify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { ImagePreview } from 'vant';
import 'vant/es/image-preview/style';
// Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。
// 在使用函数组件时，unplugin-vue-components 
// 无法自动引入对应的样式，因此需要手动引入样式。

import { Image as VanImage } from 'vant';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

import i18n  from './i18n' 

import 'lib-flexible/flexible' 
import "./utils/rem" 

import '@/assets/css/element-variables.scss';
const app = createApp(App)

app.config.globalProperties.$store = useStore();
app.config.globalProperties.$router = useRouter();
app.config.globalProperties.$router= useRoute();

app
.use(router)
.use(store) 
.use(ant)
.use(i18n)
.use(Vant)
// .use(NavBar)
.use(Toast)
.use(Dialog)
.use(VanImage)
.use(ElementPlus) 
.mount('#app')
