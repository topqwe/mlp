<template>
  <div class="aboutUs">

    <vnavibar title= '关于我们'/>
   <!-- <div class="fanhui">
     {{ $t('关于我们') }}
     <router-link to="/me">
       <img class="fanhui-img" src="../../assets/image/public/arrow_left_black.png"/>
     </router-link>
   </div> -->

    <div style="box-sizing: border-box;">
      <div class="nr-padd">
        <div class="logo-wenzi">Quick Shop</div>
        <div class="wenben1" style="margin-top: 25px;">
          {{ $t('Content0') }}
        </div>
        <div>
          <img src="../../assets/image/AppDownload/Rectangle922.png" style="width: 100%;margin-top: 15px;" />
        </div>
        <div class="wenben1">
          {{ $t('Content1') }}
        </div>
        <div class="biaoti-t">
          {{ $t('1.Title') }}
        </div>
        <div class="wenben1">{{ $t('Content') }}</div>
         
        <div class="biaoti-t">
          {{ $t('2.Title') }}
        </div>
        <div class="wenben1">{{ $t('Content') }}</div>
        <div class="biaoti-t">
          {{ $t('3.Title') }}
        </div>
        <div class="wenben1">{{ $t('Content3.0') }}</div>
        <div class="wenben1">{{ $t('Content3.1') }}</div>
         
      </div>
    </div>


    
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import vnavibar from "../../components/vnavibar.vue" 
onMounted(() => {
  
})

// export default {
//     components:{
//     vnavibar,
//     },
//   setup(){ 
//     return{
      
//     }
// }, 
// }
</script>

<style lang="scss" scoped>
.aboutUs {
  width: 100%;
  //height: 100%;

  background: #F3F5F9;

  .fanhui {
    background: white;
    text-align: center;
    position: relative;
    width: 100%;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    /* identical to box height */

    color: #333333;

    .fanhui-img {
      position: absolute;
      width: 18px;
      height: 18px;
      top: 14px;
      left: 15px;
    }
  }

  .nr-padd {
    width: 100%;
    padding: 15px 15px;
    box-sizing: border-box;
    //margin-top: 15px;
    background: white;
    border-radius: 6px;
    .logo-wenzi{
      margin-top: 24px;
      font-style: normal;
      font-weight: 900;
      font-size: 30px;
      //line-height: 18px;
      text-align: center;
      letter-spacing: -0.3px;

      /* 审核中 */

      color: var(--cp-primary);


    }
    .wenben1 {
      margin-top: 15px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: #333333;
    }
    .biaoti-t{
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */
      margin-top: 15px;
      color: #333333;
    }
  }

}
</style>
