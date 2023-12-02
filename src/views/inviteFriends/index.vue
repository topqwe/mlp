<template>
  <div class="appxiazai">
    <!-- <vnavibar title= '邀请'/>  -->
    <div class="fanhui">
      <!-- <router-link to="/" v-if="!$route.query.AppDStatue"> -->
        <img @click="onClickLeft" class="fanhui-img" src="../../assets/image/public/arrow_left_black.png"/>
      <!-- </router-link> -->
    </div>
    
    <div style="width: 100%;height: 60px;"></div>
    <div class="banner" style="">
      <img style="width: 100%;" v-if="$i18n.locale==='en_US'" src="../../assets/image/me/Invite_banner_eng.png">
      <img style="width: 100%;" v-else src="../../assets/image/me/Invite_banner_ch.png">
    </div> 

    <div style="padding: 0px 15px 15px;
  box-sizing: border-box;">
      <div class="nr-padd">
        <div class="neirong-title">
          <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px" />
          <span class="text">{{ $t('分享链接') }}</span>
          <img  src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
        </div>

        <div class="fnexiang-flex">
          <div class="yang1">{{ $t('一级') }} / {{ $t('二级') }}</div>
          <div class="yang2" style="color:#1552F0;"> {{ (data.rebate1*100).toFixed(1) }}% / {{ (data.rebate2*100).toFixed(1) }}%</div>
        </div>
        <div class="fnexiang-flex">
          <div class="yang1">{{ $t('邀请码') }}</div>
          <div @click="copyData(data.code)" class="yang2" >{{ data.code }}</div>
          <img @click="copyData(data.code)" src="../../assets/image/public/copy.png" style="width: 18px;height: 18px;margin-left: 4px;" />
        </div>
        <div class="fnexiang-flex">

          <div class="yang1">{{ $t('邀请链接') }}</div>
          <div class="yang2" @click="copyData(data.download+'?usercode='+data.code)" style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;">
            {{ data.download }}?usercode={{data.code}}</div>
          <img src="../../assets/image/public/copy.png" @click="copyData(data.download+'?usercode='+data.code)" style="width: 18px;height: 18px;margin-left: 4px;" />
        </div>
        <div class="qrcode" style="display: flex;justify-content: center;margin-top: 10px;">
          <canvas id="canvas" style="display:none"></canvas>
          <img :src="imgUrl"/>
        </div>
        <div class="baocunhaibao" @click="saveEvent">{{ $t('保存') }}</div>
      </div>
      <div class="nr-padd">
        <div class="neirong-title">
          <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px" />
          <span class="text">{{ $t('邀请规则') }}</span>
          <img  src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
        </div>
        <div class="wenben1">
          {{ $t('1. content') }}。
        </div>
        <div class="wenben1">
          AA{{ $t('你将获得') }} <span>{{ (data.rebate1*100).toFixed(1) }}%</span> {{ $t('分') }}
        </div>
        <div class="wenben1">
          BB{{ $t('你将获得') }} <span>{{ (data.rebate2*100).toFixed(1) }}%</span> {{ $t('分') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import QRCode from 'qrcode'
import clipboard3 from 'vue-clipboard3' 
import { useRoute, useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
import {  requestDummy } from "../../api";
import vnavibar from "../../components/vnavibar.vue" 
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { reactive, toRefs,defineComponent } from 'vue'

export default defineComponent({
  components: {
    QRCode,
    vnavibar
  },
  setup(){
    const router  = useRouter() 
    const {toClipboard} = clipboard3()
    const { t, locale } = useI18n()
    const state = reactive({
      data:{} as any, 
      imgUrl:''
    })
    const copyData = async (ea:any)=>  {
      try{
        await toClipboard(ea)
        // alert(('复制成功'))
        showToast(t('复制成功'))
      }catch (err){
        console.log(err)
        // alert(('复制失败'))
        showToast('复制失败')
      }
    }

    const  useqrcode =()=> {//生成二维码
      let canvas = document.getElementById('canvas')
      let url=state.data.download+'?usercode='+state.data.code
      QRCode.toCanvas(canvas, url, function(error: any) {
        if (error) { console.error(error) } else { console.log('success!'); }
      })
      saveImg()//保存图片
    }

    const saveEvent =()=> {
      let myCanvas = document.getElementsByTagName('canvas');
      state.imgUrl=myCanvas[0].toDataURL('image/png')
      getUrlBase64(state.imgUrl).then(base64 => {
        let link = document.createElement('a')
        link.href = base64 as string
        link.download = 'qrCode.png'
        link.click()
      })
    }

    const getUrlBase64 = (url: string)  => {
      return new Promise(resolve => {
        var canvas = document.createElement('canvas') as any
        var ctx = canvas.getContext('2d') as any
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function() {
          canvas.height = 300
          canvas.width = 300
          ctx.drawImage(img, 0, 0, 300, 300)
          let dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    }
    //保存图片
    const saveImg =()=>{
      let myCanvas = document.getElementsByTagName('canvas');
      state.imgUrl=myCanvas[0].toDataURL('image/png')
    }

    const requestData = async()=> {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      state.data = {
        download:'https://www.baidu.com/',
        code:'dfdfffdfddf',
      }
      // 一定要异步，否则getContext报错
      useqrcode();
    }

    const onClickLeft  = () =>{
          // showToast('返回');
          
      // console.log(this.$i18n.locale)
      // history.go(-1) 
      // 判断历史记录中是否有回退
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
      // this.$route.replace('/') 
    }

    requestData() 

    return{ 
      ...toRefs(state),

      copyData,
      useqrcode,
      saveImg,
      saveEvent,
      getUrlBase64,

      onClickLeft,
    }
  },
   
})

// export default {
//   data(){
//     return{
//       data:{}, 
//       imgUrl:''
//     }
//   },
//   components: {
//     QRCode: QRCode
//   },
//   created() {
//     this.requestData()
//   }, 
//   methods:{
//     async copyData(ea){
//       try{
//         await toClipboard(ea)
//         alert(('复制成功'))
//       }catch (err){
//         console.log(err)
//         alert(('复制失败'))
//       }
//     },
    
//     useqrcode() {//生成二维码
//       let canvas = document.getElementById('canvas')
//       let url=this.data.download+'?usercode='+this.data.code
//       QRCode.toCanvas(canvas, url, function(error) {
//         if (error) { console.error(error) } else { console.log('success!'); }
//       })
//       this.saveImg()//保存图片
//     },

//     saveEvent(){
//       let myCanvas = document.getElementsByTagName('canvas');
//       this.imgUrl=myCanvas[0].toDataURL('image/png')
//       this.getUrlBase64(this.imgUrl).then(base64 => {
//         let link = document.createElement('a')
//         link.href = base64
//         link.download = 'qrCode.png'
//         link.click()
//       })
//     },

//     getUrlBase64(url) {
//       return new Promise(resolve => {
//         let canvas = document.createElement('canvas')
//         let ctx = canvas.getContext('2d')
//         let img = new Image()
//         img.crossOrigin = 'Anonymous' //允许跨域
//         img.src = url
//         img.onload = function() {
//           canvas.height = 300
//           canvas.width = 300
//           ctx.drawImage(img, 0, 0, 300, 300)
//           let dataURL = canvas.toDataURL('image/png')
//           canvas = null
//           resolve(dataURL)
//         }
//       })
//     },
//     //保存图片
//     saveImg(){
//       let myCanvas = document.getElementsByTagName('canvas');
//       this.imgUrl=myCanvas[0].toDataURL('image/png')
//     },

//     async requestData()  {
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       this.data = {
//         download:'https://www.baidu.com/',
//         code:'dfdfffdfddf',
//       }
//       // 一定要异步，否则getContext报错
//       this.useqrcode();
      
//     }
//   }
// }
</script>
<style lang="scss" scoped>
.appxiazai{
  width: 100%;
  //height: 100%;

  background: #F3F5F9;
  //.fanhui {
  //  background: white;
  //  text-align: center;
  //  position: relative;
  //  width: 100%;
  //  height: 44px;
  //  font-style: normal;
  //  font-weight: 400;
  //  font-size: 16px;
  //  line-height: 44px;
  //  /* identical to box height */
  //
  //  color: #333333;
  //  .fanhui-img{
  //    position: absolute;
  //    width: 18px;
  //    height: 18px;
  //    top: 14px;
  //    left: 15px;
  //  }
  //}
  .fanhui {
    display: flex;
    position: absolute;
    width: 100%;
    .fanhui-img{
      padding: 10px;
      margin-left: 15px;
      width: 18px;
      height: 18px;
    }
  }
  .nr-padd{
    width: 100%;
    padding: 15px 15px;
    box-sizing: border-box;
    margin-top: 15px;
    background: white;
    border-radius: 6px;
    .neirong-title{
      display: flex;
      justify-content: center;
      align-items: center;
      .text{
        margin-right: 12px;
        margin-left: 12px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        /* 审核中 */

        color: #1552F0;
      }
    }
    .wenben1{
      margin-top: 20px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: #333333;
      span{
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;

        /* 审核中 */

        color: #1552F0;
      }
    }

  }
  .fnexiang-flex{
    width: 100%;
    margin-top: 20px;
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #333333;
    .yang1{
      flex: 1;
      text-align: left;
    }
    .yang2{
      // width: auto;
      flex: 2;
      text-align: right;
    }
  }
  .baocunhaibao{
    width: 100%;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
    background: #1552F0;
    border-radius: 4px;
    /* identical to box height */


    color: #FFFFFF;

  }

}
</style>
