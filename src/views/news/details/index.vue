<template>
  <div class="newsDetails">
    <vnavibar title= '详情'/>  
    <div style="width: 100%;height: 46px;"></div>
    <div class="newsDetails-padding">
      <div class="title"> {{ news_title }}   </div>
      <div class="time"> {{ news_time }}   </div>
      <div class="nr" v-html= "news" >
      </div>
    </div>

  </div>
</template>
<script lang="ts">
// import {NavBar} from 'vant';
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router"; 
import vnavibar from "../../../components/vnavibar.vue"
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import { showToast,  } from 'vant' 
export default {
  components:{
    vnavibar,
    // [NavBar.name]:NavBar,
  },
  setup(){
    // const router = useRouter() 
    const route  = useRoute() 
    // //获取id 可当入参
    // console.log(router.currentRoute.value.query.id)
    // showToast(router.currentRoute.value.query.id.toString())

    //vue3使用vue-router4.0
    let name= 
    //刷新网页没有了，彻底无法请求
    // route.params.id

    //刷新网页还是有，还是可以根据id请求详情
    route.query.id as any
    
    //刷新网页还是有，还是可以根据id请求详情
    // history.state.id
    showToast(name) 
    
    const state = reactive({
      news:'' as any,
      news_title:'' as any,
      news_time:'' as any
    });
    onMounted(() => {
      // requestList() 
      //拿着id进行数据的请求
      // const res = await getTopic(id)
//      topic.value = res.data

    state.news=localStorage.getItem('news')
    const regex = new RegExp('<img','gi')
    state.news = state.news.replace(regex,'<img style="max-width: 100%;height:auto"')
    state.news_title=localStorage.getItem('news_title')
    state.news_time=localStorage.getItem('news_time')
    
  })
   
    return {
      ...toRefs(state)
    }
  },
  
   
  
}
</script>
<style lang="scss" scoped>
.newsDetails{
  width: 100%;
  min-height: 100%;
  .newsDetails-padding{
    padding: 15px;
  }
  .title{
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;

    color: #000000;
  }
  .time{
    margin-top: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */


    /* 999 */

    color: #999999;
  }
  .nr{
    margin-top: 15px;
    font-size: 14px;
  }

}
</style>
