import axios from "axios";
import router from "../router";
import { useI18n } from 'vue-i18n' 

import i18n  from '../i18n' 
import { showToast,showLoadingToast,
  showSuccessToast,showFailToast } from 'vant';

function getQueryString(name: string): number {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return Number(unescape(r[2]));
  return 0;
}



let baseURL = "http://123.56.85.24:5000/api/";
if (getQueryString("ip") == 1) {
  baseURL = "http://123.56.85.24:5000/api/";
} else if (getQueryString("ip") == 2) {
  baseURL = "http://fq.lycent.cn/api";
} else {
  baseURL = "http://123.56.85.24:5000/api";
}

axios.defaults.headers.post['Content-Type'] = 
'application/json;charset=UTF-8'
// 'application/x-www-form-urlencoded'

const BASE_URL = 
'http://t.weather.sojson.com/api/weather/city'
//process.env.NODE_ENV ===  'production' ? 'https://rfbhabkjk.com/wap/' : 'https://rfbhabkjk.com/wap/'

const service = axios.create({
  baseURL:BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },//;charset=UTF-8
  //baseURL,
  timeout: 5000 // request timeout
});

// 发起请求之前的拦截器
service.interceptors.request.use(
  config => {
    // showToast(config.baseURL)
    // 如果有token 就携带tokon accessToken //不要随便加，但是入参可以随便加
    // const token = window.localStorage.getItem("token");
    // if (token) {
    //   config.headers.common.Authorization = token;
    // }
    // if (config.loading) {
    //   showLoadingToast({duration: 0, forbidClick: true})
    // }

    if (!config.params) { // 放在哪里
      config.params = {}
    }
    if (localStorage.getItem('token')) {
      config.params['token'] = localStorage.getItem('token')
    }
    if (window.localStorage.getItem('language')=='en_US'){
      config.params['lang'] = 'en'
    }else {
      config.params['lang'] = 'cn'
    }
    return config;
  },
  error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  response => {
    // const res = response.data;
    const { status, data:Any, message  } = response.data

    
    if (response.status !== 200) {
      showFailToast('网络波动请刷新页面')
      return Promise.reject(new Error(response.data.message || "Error"));
    } 
    else {
      
      switch(status / 1) {
        case 200: 
          // showSuccessToast('success')
          return Promise.resolve(response.data)
        case 403:
          localStorage.removeItem('token')
          router.back()
          router.replace('/login')
          // window.location = '/#/login'
          return
        default:
          showFailToast(
            // i18n.global.t(msg)
            // useI18n.t(msg)
            message, 
            // $i18n.locale
            // icon: 'none',
            // message: i18n.t(msg)
            // $t(msg) 
            // {{ $t(msg) }},
          )
          console.log('错误------')
          return Promise.reject(response.data)//data
    }
    
      // return response;
    }
    
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址不存在: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default:
          error.message = 
          showFailToast('网络波动请刷新页面')
          // Toast.fail({
          // icon: 'none',
          // message: i18n.t(msg)
          // message: '网络波动请刷新页面'
        // });//$i18n.t
           Promise.reject(error)
        break
      }
    }
    // console.log('dgvsdfdsf'+error.message)
    const { t, locale } = useI18n()
    showFailToast(t(error.message))
    return Promise.reject(error);
  }
);
export default service;
