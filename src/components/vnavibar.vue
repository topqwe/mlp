<template>
  <div id="NavBar">
      <!-- <van-nav-bar
          fixed
          :title="$t('相关问题')"
          left-arrow
          @click-left="onClickLeft"
      />  -->
      <!-- //会滚没的 -->

      <!-- <van-sticky> -->
        <!-- "$t('')" -->
        <!-- <van-nav-bar :title="title" :left-arrow="isleftarrow" @click-left="onClickLeft" /> -->
  
        <!-- "title"    "rightText" -->
        <van-nav-bar
      :title= $t(title) 
      fixed
      :right-text=$t(rightText) 
      @click-right="onClickRight"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
      z-index="999"
    >
    <!-- <slot name="right"></slot> -->
  </van-nav-bar>

   <!-- </van-sticky> -->

      <!-- <div style="width: 100%;height: 46px;"></div> -->
   
  </div>
</template>
  
<script lang="ts"> 
import {defineEmits,defineComponent} from 'vue'
import { useRouter } from "vue-router";
import { showToast,showLoadingToast,
      showSuccessToast,showFailToast } from 'vant';
  export default {
    
  
      name: 'vnavibar',
      // components: { 
           
      // },
      props: 
      // ["title",'rightText'],
      {
        title:{
          type:String,
          default:''
        },
        rightText:{
          type:String,
          default:''
        }
      },
      setup(props,ctx){
        const router = useRouter();

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

//     const emit = defineEmits<{
//   (e: 'click-right'): void
// }>()

// 2. 使用emit函数来触发自定义事件（点击右侧文字按钮）
const onClickRight = () => {
   ctx.emit('click-right') 
}

    // const onClickRight= () =>{
    //   showToast('Right返回');
      // console.log(this.$i18n.locale)
      // history.go(-1) 
      // 判断历史记录中是否有回退
  // if (history.state?.back) {
  //   router.back()
  // } else {
  //   router.push('/')
  // }
      // this.$route.replace('/') 
    // }
 
        return{  
          onClickLeft,
          onClickRight
        }
      },

      methods:{ 
        // onClickRight(){

        // },
          // onClickLeft() {
    
              // 判断历史记录中是否有回退
  // if (history.state?.back) {
    // router.back()
  // } else {
    // router.push('/')
  // }
              // showToast('返回');
              // showLoadingToast({
              //     message: '加载中...',
              //     forbidClick: true,
              //     });
              // showSuccessToast('成功文案');
              // showFailToast('失败文案');

          // },
      
      }
  }
  </script>

<style lang="scss" scoped>
#NavBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  width:100%;
  z-index: 100;
}
.van-nav-bar{
  // font-size: 18px!important; 
  /* 设置导航栏的渐变色 */
  // background: linear-gradient(to right, #ff2e29, #fe6e49)!important;
  // background: -webkit-linear-gradient(to right, #ff2e29, #fe6e49)!important;  
    border:0;
  
}  
/* .van-icon-arrow-left {
    color: #0000;
  } */

  :deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-primary)
      // #ffc0cb
      // --cp-primary
    }
    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}


// .van-hairline--bottom::after {
//      /* 去除导航栏底部的白色横线 */
//     border-bottom-width: 0px!important;
// } 
</style>