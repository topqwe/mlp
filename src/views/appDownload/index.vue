<template>
  <div class="appDownload">
    <div class="fanhui">
      <router-link to="/me" v-if="!$route.query.AppDStatue">
        <img class="fanhui-img" src="../../assets/image/public/arrow_left_black.png"/>
      </router-link>
    </div>
    <!-- <vnavibar title= '下载'/> -->

    <div class="logo-flex">
      <img class="logo-img" src="../../assets/image/AppDownload/logo_download3.png"/>
    </div>
    <div class="title">{{ $t("Quick Shop") }}</div>
    <div class="xiazai-button" @click="xiazai">{{ $t('下载客户端') }}</div>
    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px"/>
        <span class="text">{{ $t('关于我们') }}</span>
        <img src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <div class="wenben1">
        {{ $t('Content') }}
      </div>
      <img src="../../assets/image/AppDownload/Rectangle922.png" style="width: 100%;margin-top: 20px"/>
    </div> 


    <div class="nr-padd">
     <div class="neirong-title">
       <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px"/>
       <span class="text">{{ $t("流程") }}</span>
       <img src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
     </div>
     <div class="liuchenbuju">
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/distribution.png" style="width: 60px;"/>
         <div style="margin-top: 10px;">{{ $t("分配") }}</div>
       </div>
       <div class="buju-flex">
         <img src="../../assets/image/AppDownload/arrow1.png" style="width: 52px;height: 24px;"/>
       </div>
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/products.png" style="width: 60px;"/>
         <div style="margin-top: 10px">{{ $t('商品') }}</div>
       </div>
     </div>
     <div class="liuchenbuju">
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/arrow12.png" style="width: 24px;"/>
       </div>
       <div class="buju-flex">
         <div style="width: 52px;height: 24px;"></div>
          <!-- <img src="../../assets/image/AppDownload/arrow1.png" style="width: 52px;height: 24px;" /> -->
       </div>
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/arrow14.png" style="width: 24px;margin-left: 1px;"/>
       </div>
     </div>
     <div class="liuchenbuju">
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/commission.png" style="width: 60px;"/>
         <div style="margin-top: 10px;">{{ $t('领取') }}</div>
       </div>
       <div class="buju-flex">
         <img src="../../assets/image/AppDownload/arrow1.png" style="width: 52px;height: 24px;"/>
       </div>
       <div class="liuchen-wen">
         <img src="../../assets/image/AppDownload/audit.png" style="width: 60px;"/>
         <div style="margin-top: 10px">{{ $t('审核') }}</div>
       </div>
     </div>
   </div>


    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px"/>
        <span class="text">{{ $t('技术优势') }}</span>
        <img src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <div class="jishubuju">
        <div class="biaoti">1</div>
        <div class="neirong">{{ $t('高效撮合引擎，高性能、高稳定性') }}</div>
      </div>
      <div class="jishubuju">
        <div class="biaoti">2</div>
        <div class="neirong">{{ $t('"冷双机制"的智能系统') }}</div>
      </div>
       
    </div>
    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px"/>
        <span class="text">{{ $t('合规') }}</span>
        <img src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <img src="../../assets/image/AppDownload/Rectangle922.png" style="width: 100%;margin-top: 20px"/>
    </div>
    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px"/>
        <span class="text">{{ $t('联系我们') }}</span>
        <img src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <div class="lainxiwom">
        <img src="../../assets/image/AppDownload/Group1236.png" style="width: 30px;height: 30px;margin-right: 10px"/>
        <div class="">Whatsapp: +</div>
      </div>
      <div class="lainxiwom">
        <img src="../../assets/image/AppDownload/logos_telegram.png"
             style="width: 30px;height: 30px;margin-right: 10px"/>
        <div class="">Telegram: @</div>
      </div>
      <div class="lainxiwom">
        <img src="../../assets/image/AppDownload/Subtract.png" style="width: 30px;height: 30px;margin-right: 10px"/>
        <div class="">{{ $t('官方地址') }}：www.baidu.com</div>
      </div>

    </div>
    <div style="width: 100%;height: 100px;"></div>
  </div>
</template>
<script lang="ts" setup> 
import {reactive,toRefs,onMounted,ref} from 'vue'
import {  requestDummy } from "../../api";
import vnavibar from "../../components/vnavibar.vue"  

const downloadUrl = ref('')

const xiazai = () => {
      
      // 'https://baidu.com'
  requestDummy().then((res: any) => {

    downloadUrl.value = 'https://baidu.com'
    window.location.href= downloadUrl.value

      })
}

 
//执行
// requestDummy()

onMounted(() => {
  //或者这里执行  
})

// export default {
//   components:{
// vnavibar,
// },
//   setup() {
//     const state = reactive({
//       downloadUrl:'https://baidu.com'
//     })

  //  const xiazai = () => {
  //     window.location.href= state.downloadUrl
  //   }
//     return {
//       ...toRefs(state),
//       xiazai
      
//     }
//   },  
// }
</script>
<style lang="scss" scoped>
.appDownload {
  width: 100%;
  //height: 100%;
  padding: 5px 15px 15px;
  box-sizing: border-box;
  background: url("../../assets/image/AppDownload/bg.jpg");

  .fanhui {
    display: flex;
    position: absolute;
    width: 100%;

    .fanhui-img {
      padding: 10px;
      margin-left: 15px;
      width: 18px;
      height: 18px;
    }
  }

  .logo-flex {
    margin-top: 15px;
    display: flex;
    justify-content: center;

    .logo-img {
      width: 161px;
      //height: 161px;
    }
  }

  .title {
    margin-top: 15px;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #333333;
  }

  .xiazai-button {
    width: 100%;
    margin-top: 20px;
    background: var(--cp-primary);
    border-radius: 4px;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    /* identical to box height, or 100% */

    text-align: center;

    color: #FFFFFF;

  }

  .nr-padd {
    width: 100%;
    padding: 20px 15px;
    box-sizing: border-box;
    margin-top: 15px;
    background: white;
    border-radius: 6px;

    .neirong-title {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        margin-right: 12px;
        margin-left: 12px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        /* 审核中 */

        color: var(--cp-primary);
      }
    }

    .wenben1 {
      margin-top: 20px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: #333333;
    }
  }

  .liuchenbuju {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: center;

    .liuchen-wen {
      width: 80px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      text-align: center;
      color: #000000;
    }

    .buju-flex {
      margin: 0 20px;
      margin-top: 10px;
      //flex: 1;

    }
  }

  .jishubuju {
    width: 100%;
    display: flex;
    margin-top: 20px;

    .biaoti {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      /* identical to box height */
      background: var(--cp-primary);
      text-align: center;

      color: #FFFFFF;
      margin-right: 10px;
    }

    .neirong { 
      margin-right: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
      color: #000000;
    }
  }

  .lainxiwom {
    display: flex;
    margin-top: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;

    color: #000000;
  }

}
</style>
