<template>
  <div class="appxiazai">
    <vnavibar title= '如何玩'/>
    
    <div style="padding: 50px 15px 15px;
  box-sizing: border-box;">
    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px" />
        <span class="text">{{ $t('工作模式') }}</span>
        <img  src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <div class="wenben1">
        {{ $t('1.Content') }}
      </div>
      <div class="wenben1">
        {{ $t('2.Content') }}
      </div>
    </div>
    <div class="nr-padd">
      <div class="neirong-title">
        <img src="../../assets/image/AppDownload/title_2.png" style="width: 16px;height: 13px" />
        <span class="text">{{ $t('规则') }}</span>
        <img  src="../../assets/image/AppDownload/title_1.png" style="width: 16px;height: 13px"/>
      </div>
      <div class="wenben1">
        {{ $t('1.Content') }}
      </div>
      <div class="wenben1">
        {{ $t('2.Content') }}
      </div>
       
    </div> 
    </div>
  </div>
</template>

<script lang="ts" setup>
import vnavibar from "../../components/vnavibar.vue"
 
// export default { 
//   components:{
//     vnavibar,
//     },
     
// }
</script>

<style lang="scss" scoped>
.appxiazai{
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
    .fanhui-img{
      position: absolute;
      width: 18px;
      height: 18px;
      top: 14px;
      left: 15px;
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
    }
  }

}
</style>
