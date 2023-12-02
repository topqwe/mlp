export const getImagePath = (name:string) => {
    return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
} 

export const arrIsNull = (arr: any[]): boolean => {
    let result: boolean;
    if (arr && arr.length > 0) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };
// export default {
//     getImagePath(name:string){
//         return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
//       }
// } 

// export function getImagePath(name:string){
//     return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
//   }

// import i18n from "../i18n";
// // // 国际化支持函数
// export function i18nt(prefix: string, key: string): string {
//     const { t } = i18n.global;
//     let message = t(prefix + "." + key);
//     // 返回的字符串开头是prefix，则认为没有找到翻译信息，直接返回key
//     if (String(message).startsWith(prefix)) {
//         return key;
//     }
//     return String(message);
// }
/**
 * @description 时间格式处理
 */


//  export const formatData = (data) => {
//     let thisData = formatTime(new Date(), "yyyy-MM-dd");
//     let myData = data.substr(0, 10);
//     if (thisData == myData) {
//         let Time = data.substr(11, 5);
//         return Time
//     } else {
//         if (thisData.substr(0, 4) == myData.substr(0, 4) && thisData != myData) {
//             let Data = data.substr(5, 11);
//             return Data
//         } else {
//             let Year = myData;
//             return Year
//         }
//     }
// }

// /**
//  * @description 时间格式转化
//  * @param {String} date 日期
//  * @param {String} fmt 需要的格式
//  */
// export const formatTime = (date, fmt) => {
//     let o = {
//         "M+": date.getMonth() + 1, //月份
//         "d+": date.getDate(), //日
//         "h+": date.getHours(), //小时
//         "m+": date.getMinutes(), //分
//         "s+": date.getSeconds(), //秒
//         "q+": Math.floor((date.getMonth() + 3) / 3), //季度
//         "S": date.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (let k in o)
//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }

// /**
//  * @description 验证手机号格式是否正确
//  * @param {String} mobile 电话号码
//  */
// export const checkMobileformat = mobile => /^1[345789]\d{9}$/.test(mobile);

// /**
//  * @description Array clear empty item.
//  * @param {Array} array
//  */
// export const arrayClearEmptyItem = array => {
//     return array.filter(item => item);
// }

// /**
//  * @description 判断一个日期是过去还是未来
//  * @param {String} d 要判断的日期
//  * @returns past => false   future => true
//  */
// export const judgeDateIsPastOrFuture = (d) => {
//     if (!d) {
//         return false;
//     }
//     const nowDate = new Date();
//     const nowTimeStamp = nowDate.getTime();
//     const date = new Date(d.replace(/-/g, "/"));
//     const dateTimeStamp = date.getTime();
//     return nowTimeStamp < dateTimeStamp;
// }

// /**
//  * @description 判断一个字符串中是否有重复的项（0-9, a-z, A-Z）
//  * @param {String} str 判断的目标字符串
//  * @returns {Boolean} true: 有重复项   false: 无重复项
//  */
// export const strIsReplace = str => {
//     const passwordRule = /[0-9a-zA-Z]/;
//     const arr = str.split("");
//     for (let i = 0; i < arr.length; i++) {
//         const element = arr[i];
//         if (passwordRule.test(element)) {
//             if (i === arr.length - 1) {
//                 return false;
//             }
//             if (str.includes(element, i + 1)) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// 设置localStorage
export const setStorage = function(key: string, obj: any) {
    let json = JSON.stringify(obj)
    window.localStorage.setItem(key, json)
}

// 获取localStorage
export const getStorage = function(key: string) {
    const str = window.localStorage.getItem(key)
    if (!str) {
        return null
    }
    return JSON.parse(str)
}

// // 移除localStorage
export const removeStorage = function(key: string) {
    window.localStorage.removeItem(key)
}

// 获取浏览器默认语言
export const getBrowserLang = function() {
    let browserLang = navigator.language 
    //? navigator.language: navigator.browserLanguage
    let defaultBrowserLang = ''
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh-CN'
    } else {
        defaultBrowserLang = 'en-US'
    }
    return defaultBrowserLang
}
