<template>
  <!-- <navibar >
    <template v-slot:title >通讯录</template>
  </navibar> -->

  <!--  阻止actionbar组件挡住内容-->
  <!-- <div style="width: 100vw;height: 45px"></div> -->
    <!-- <router-view></router-view> -->

  <!--  阻止tabbar组件挡住内容-->
  <!-- <div style="width: 100vw;height: 80px"></div> -->

  <h1 class="text">{{'我是'+$t('首页') }}</h1>
  vuex:{{ store.state.num }}
  <!-- $store.state.num -->
  <button @click="add">++</button>
  {{ state.name }}
  {{ state.num }}
  <div class="home">
    <!-- <van-button type="primary" @click="goLogin">跳转登录页</van-button> -->
  
    
  
  </div>
  
</template>


<script lang="ts" >//setup="props"
import {getCurrentInstance, reactive,defineComponent } from "vue";
import navibar from "../../components/navibar.vue" 
// ComponentInternalInstance 
import { useStore } from "vuex";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant'; 
// const router = useRouter();
// const store = useStore();
// const goLogin = () => {
//   router.push("/");
// };
// const add = () => {
//   store.commit("addNum");
//   state.num = store.state.num;
//   state.num > 20 ? (state.color = "pink") : (state.color = "#ccc");
// };
// article().then((res: any) => {
//   console.log(res);
// });
// const state = reactive({
//   name: "霍庆祝",
//   num: 10,
//   color: "#ccc",
// });

export default defineComponent({
  components:{
    navibar
  } , 
setup () {
//   const router = useRouter();
const store = useStore();
  const { proxy }:any = getCurrentInstance() 
  // as ComponentInternalInstance
  const goLogin = () => {
// proxy?.$router.push("/login");
};
const add = () => { 
  proxy?.$store.commit("addNum");
state.num = proxy?.$store.state.num;
state.num > 20 ? (state.color = "pink") : (state.color = "#ccc");
};

// article().then((res: any) => {
// console.log(res);
// });
 

  /* 
  定义响应式数据对象
  */
  const state = reactive({
        name: "霍庆祝",
        num: 10,
        color: "#ccc",
  });

  const update = () => {
    // state.name += '--'
    // state.age += 1
    // state.wife.name += '++'
    // state.wife.age += 2
  } 

  return {
    store,
    state,
    update,
    goLogin, 
    add, 
    

  }
},
 
});




</script>



<style scoped>
.text {
  color: v-bind("state.color");
} 
</style>
