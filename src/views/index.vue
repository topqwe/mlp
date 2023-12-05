<template>
  <div class="tabbar-box">
    <!-- <router-view></router-view> -->
    <div>

      
  <!-- <navibar v-show="true">
    <template v-slot:title>通讯录</template>
  </navibar> -->
  
  <!--  阻止actionbar组件挡住内容-->
  <!-- <div style="width: 100vw;height: 45px"></div> -->
    <router-view></router-view>

  <!--  阻止tabbar组件挡住内容-->
  <!-- <div style="width: 100vw;height: 80px"></div> -->

<!-- <tabbar></tabbar>  -->
<vtabbar></vtabbar>

    </div>
  
  </div>

</template>

<script lang="ts">
import { showToast } from 'vant';
import { reactive,onMounted,watchEffect,watch} from "vue";
import tabbar from "../components/tabbar.vue" 
import vtabbar from "../components/vtabbar.vue" 
import navibar from "../components/navibar.vue"  
import { useRoute,useRouter } from "vue-router"; 
export default ({
  // name: "index",
  setup () {
    const route = useRoute();
    const router = useRouter();
    
    const state = reactive({
      idx: 0,
    })
    const change=(index: any)=>{
      showToast('22222222222')
      showToast(`111标签 ${index}`)
      state.idx = index
      localStorage.setItem("tabIndex", state.idx as unknown as string);
    }

    onMounted(() => {

      // showToast('111111111111')
    console.log(route.path) 
    if (route.path=='/invest'){ 
      state.idx = 1
    }
    if (route.path=='/mall'){ 
      state.idx = 2
    }
    if (route.path=='/introduceweb'){ 
      state.idx = 3
    }
    if (route.path=='/task'){ 
      state.idx = 4
    }
    if (route.path=='/me'){ 
      state.idx = 5
    }

    state.idx = localStorage.getItem("tabIndex") as unknown as number;

    if (
      !localStorage.getItem('token')
      ||
      localStorage.getItem('token')!='1110'){
      
        // localStorage.clear()
        localStorage.removeItem('token');
        localStorage.removeItem('investActiveIndex');
        localStorage.removeItem('taskActiveIndex');

      
        router.push('/login')
    }
    
    
    })

  //   watch(()=>route,(newVal,oldVal)=>{
  //     //指定对象属性
  //     if (newVal.meta.index >= 0) {
  //         state.idx = newVal.meta.index;
  //         localStorage.setItem("tabIndex", state.idx as unknown as string);
  //     }

  //  },{deep:true})

    return {
      state,
      change,

    }
  },
  
  components: { 
    // tabbar,
    // "v-navbar": tabbar,
    // navibar,
    vtabbar,
    // "v-navbar": vtabbar,
  },  
   
});
</script>

<style scoped>
.tabbar-box{
  width: 100%;
  height: 100%;
}
</style>
