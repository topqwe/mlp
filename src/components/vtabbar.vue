<template>

<div class="posi">
    <div class="view"></div> 
    <div class="posi_content">

    <van-tabbar v-model="active" :border="false" active-color='var(--cp-primary)' inactive-color="grey" @change="onChange" route> 

  <van-tabbar-item replace to='/home' badge="3">
    <span>{{ $t('首页') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon0.active : icon0.inactive" />
    </template>
  </van-tabbar-item>
  
  <van-tabbar-item replace to='/invest' badge="1">
    <span>{{ $t('投资') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon1.active : icon1.inactive" />
    </template>
  </van-tabbar-item>

  <van-tabbar-item replace to='/mall' badge="">
    <span>{{ $t('商城') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon2.active : icon2.inactive" />
    </template>
  </van-tabbar-item>
  
  <van-tabbar-item replace to='/task' badge="">
    <span>{{ $t('任务') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon3.active : icon3.inactive" />
    </template>
  </van-tabbar-item>

  <van-tabbar-item replace to='/introduceweb' badge="">
    <span>{{ $t('介绍') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon3.active : icon3.inactive" />
    </template>
  </van-tabbar-item>

  <van-tabbar-item replace to='/me' badge="">
    <span>{{ $t('我的') }}</span>
    <template #icon="props">
      <img class="imgitem" :src="props.active ? icon4.active : icon4.inactive" />
    </template>
  </van-tabbar-item>

        <!-- <van-tabbar-item icon="state.active ?'home-o':'fire-o'" replace to='/home'>{{ $t('首页') }}</van-tabbar-item>
        <van-tabbar-item icon="fire-o" replace to="/invest">{{ $t('投资') }}</van-tabbar-item>
        <van-tabbar-item icon="browsing-history-o" replace to="/mall">{{ $t('商城') }}</van-tabbar-item>
        <van-tabbar-item icon="coupon-o" replace to="/introduceweb">{{ $t('介绍') }}</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" replace to="/me">{{ $t('我的') }}</van-tabbar-item> -->
    
    
    </van-tabbar>
       
    </div>
  </div>

</template>
 
 <script lang="ts">
 import { showToast } from 'vant';
 import {reactive, toRefs,ref} from 'vue'
export default{
    created() {
        // showToast('3333333333')
    },
    
    setup(){

        const onChange = (index: any):void => { 
            // showToast(`标签 ${index}`)
        }
 
        const state = reactive({
            
            active:0,
            icon0: {
      active: '/src/assets/image/bottom/home2.png',
      inactive:
        '/src/assets/image/bottom/home.png',
    },
    icon1: {
      active: '/src/assets/image/bottom/chongzhi2.png',
      inactive:
        '/src/assets/image/bottom/chongzhi.png',
    },
    icon2: {
      active: '/src/assets/image/bottom/renwu2.png',
      inactive:
        '/src/assets/image/bottom/renwu.png',
    },
    icon3: {
      active: '/src/assets/image/bottom/introduce2.png',
      inactive:
        '/src/assets/image/bottom/introduce.png',
    },
    icon4: {
      active: '/src/assets/image/bottom/introduce2.png',
      inactive:
        '/src/assets/image/bottom/introduce.png',
    },
    icon5: {
      active: '/src/assets/image/bottom/wode2.png',
      inactive:
        '/src/assets/image/bottom/wode.png',
    }
        });
        return{
            onChange,
            ...toRefs(state)
        }
    }

    // setup() {
    // const active = ref(0);
    // const icon0 = {
    //     active: '/src/assets/image/bottom/home2.png',
    //     inactive:'/src/assets/image/bottom/home.png',
    // };
    // return {
    //   icon0,
    //   active,
    // };
    // },


} 
 </script>

<style scoped>
.imgitem {
  height:25px;
  width: 25px;
}

.posi {
  background: #ffffff;
  z-index: 9999;
  width: 100vw;
  height: 55px;
  position: fixed;
  bottom: 0;
}

.posi_content {
  display: flex;
  flex-direction: row;

}

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #666666;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.view {
  height: .5px;
  width: 100%;
  background: var(--cp-primary);
  position: absolute;
  top: 0;
}
.badgenum {
  font-size: 13px;
  text-align: center;
  min-width: 25px;
  line-height: 20px;
  color: #ffffff;
  background: red;
  border-radius:  50% ;
  position: absolute;
  right: 20px;
  top:0
}
.nonebage{
  display: none;
}
</style>