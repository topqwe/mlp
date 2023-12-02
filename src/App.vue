<template>
  <!-- <RouterView /> -->
  <div id="app"> 
      <router-view></router-view>

      <!-- <keep-alive>
         <router-view></router-view>
      </keep-alive> -->
      
      <!-- <tabbar></tabbar> -->
    
  </div>
</template>

<script lang="ts"> 
import { defineComponent } from "vue";
import vtabbar from "./components/vtabbar.vue"
// import tabbar from "./components/tabbar.vue"
import HelloWorld from "./components/HelloWorld.vue";
 
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    // tabbar
    // vtabbar,
  },
});
</script>
 
<style>
/* lang="scss" */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* 整个app的头部会多出的距离 */
}

/* @import "@/assets/init.scss";
 
.van-nav-bar .van-icon{
  color: #333333;
} 

.van-uploader__upload-icon{
 font-size:48px !important;
}

.van-uploader__upload{
  background-color:white !important;
  border:2px dashed #B8BCC5;
}


 
.van-tabs__line{
  background-color:#1552F0 !important;
}

.van-tab__text{
  font-size:14px !important;
}

.van-nav-bar__text{
  color: #999999;
} */
</style>