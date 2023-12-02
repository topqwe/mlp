import request from "../utils/request";
import axios from "axios"; 
import { showToast,showLoadingToast,
  showSuccessToast,showFailToast } from 'vant';
// import {compress} from 'image-conversion';  

const BASE_URL = process.env.NODE_ENV === 'production' ? 'baidu.com' : 'baidu.com'
export function article() {
  return request({
    url: "/profile",
    method: "get"
  });
}

//params:any 必填 params={} 隐式
export function requestDummy(params?:any) {
  return request({
    params:params,
    url: "/101030100",
    method: "get"
  });
}

//params:any 必填 params={} 隐式
export function requestUploadFile(params?:any) {
  return request({ 
    data:params,//上传用data:
    url: "/101030100",
    method: "get"//一定post
  });
}

export function postUploadFile (file?:any,token?:any, callback?:any){
  const isLt2M = file.file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    showFailToast('上传头像图片大小不能超过 2MB!');
      return false;
  }
  // Toast.loading()
  return new Promise((resolve, reject) => {
      // compress(file.file, 0.6).then(res => {
          const formData = new FormData()
          formData.append('file',file.file )//res
          formData.append('token', token)
          formData.append('type', 'img')
          // ${BASE_URL}api/onlinechat!send.action
          axios.post(`/101030100`,
              formData,
              {
                  onDownloadProgress: (progressEvent) => {
                      console.log(progressEvent)
                      if (progressEvent.lengthComputeable) {
                          callback(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2))
                      }
                  },
                  headers:
                  {"Content-Type":'multipart/form-data',
                  'Authorization': 'Bearer ' + token}
              },
               
              ).then(res => {
                  // Toast.clear()
                  const { code, data } =res.data
                  if (code / 1=== 0) {
                      resolve(data)
                  }
              }).catch(err => {
                  // Toast.clear()
                  reject(err)
              })
          })
      // })
}

 


export function getMsg(params?:any)  {
  return request({
      url: "/101030100",
      // "api/onlinechat!list.action",
      // loading: true,
      method: "get",
      params: {
          token:params.token,
          message_id: params.message_id || '',  // 翻页用到
          show_img: params.show_img || true,
      }
  })
}

export function getUnreadMsg(){
  return request({
      url:"/101030100",
      //  "api/newOnlinechat!unread.action",
      method: "get",
  })
}

export function sendMsg(type = 'text', content = '',token='') {
  return request({
      url: "/101030100",
      // "api/onlinechat!send.action",
      method: "get",
      params: {
          type, 
          content,
          token
      }
  })
}