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
export default defineComponent({
  name: "App",
  components: {
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
</style>