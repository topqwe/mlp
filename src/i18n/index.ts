// 引入必要的库
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import { createI18n } from 'vue-i18n'
// import {Locale} from 'vant'
import zh_CN from './zh_CN'
import en_US from './en_US'
// import enUS from 'vant/lib/locale/lang/en-US'
// import zhCN from 'vant/lib/locale/lang/zh-CN'

// 引入工具函数
// import { getStorage, getBrowserLang } from '../utils/utis'

// 引入项目中需要用到的中英文文案配置js
// import enLocale from './en-US'
// import cnLocale from './zh-CN'
// const getLanguage = () => sessionStorage.getItem("lang");
// 获取当前语言（初始化时localStorage里没有存语言，默认为浏览器当前的语言）

// export const lang = getStorage('lang') || getBrowserLang()
// const config = localStorage.getItem('config') // 当前使用的语言类型
// let lang = 'zhCN'
// if (config) {
//   lang = JSON.parse(config).lang || 'zhCN'
// }
 

// 使用vue-i18n库
// Vue.use(VueI18n)

// 获取当前语言（初始化时localStorage里没有存语言，默认为浏览器当前的语言）
// const lang = getStorage('lang') || getBrowserLang()

// 组合element ui 和 项目自身的文案文件
// const messages = {
//     'en-US': {
//         ...enUS,
//         // ...enLocale
//     },
//     'zh-CN': {
//         ...zhCN,
//         // ...cnLocale
//     }
// }
const messages = {
    'zh_CN': zh_CN,   // 中文语言包
    'en_US': en_US,    // 英文语言包
  }
// export function vantLocales (lang: string) {
//     if (lang === 'en-US') {
//         Locale.use(lang, enUS)
//     } else if (lang === 'zh-CN') {
//         Locale.use(lang, zhCN)
//     }
// }
// export const getLocale = () => {
//     const sessionlang = lang();
//     if (sessionlang) {
//         return sessionlang;
//     }
//     const language = navigator.language.toLowerCase();
//     const locales = Object.keys(messages);
//     for (const locale of locales) {
//         if (language.indexOf(locale) > -1) {
//             return locale;
//         }
//     }
//     // Default language is english
//     return "zh-CN";
// };

// export const i18n = createI18n({
//     legacy: false,
//     locale: lang,
//     //sessionStorage.getItem("lang") || "zh-CN",
//     messages: messages,
// });

// export const i18n = createI18n({
//     legacy: false, // componsition API需要设置为false 
//     locale: lang,
//     globalInjection: true, // 可以在template模板中使用$t
//     messages: {
//       enUS,
//       zhCN
//     }
//   })
const i18n = {
    globalInjection: true,
    legacy: false, // composition API
    locale: localStorage.getItem('language') || 'zh_CN',
    messages,
    }
export default createI18n(i18n);
    

// 创建vueI18n实例并输出，在main.js中调用
// export const i18n = new VueI18n({
//     locale: lang,
//     messages
// })

// const i18n = createI18n({
//     locale: 'cn', // 设置语言类型
//     legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
//     globalInjection: true, // 全局注册$t方法
//     messages: messages,
//   }) 

// const i18n = createI18n({
//     fallbackLocale: 'ch',
//     globalInjection:true,
//     legacy: false, // you must specify 'legacy: false' option
//     locale: language.split("-")[0] || "zh",
//     messages:messages,
//   });
  
// 更新vant组件库本身的语言变化，支持国际化
// export function vantLocales (lang: any) {
//     if (lang === 'en-US') {
//         Locale.use(lang, enUS)
//     } else if (lang === 'zh-CN') {
//         Locale.use(lang, zhCN)
//     }
// }
// export default i18n;//,vantLocales
// export default i18n;//no