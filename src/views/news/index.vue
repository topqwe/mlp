<template>
  <div class="news-list"> 
    <vnavibar title= '新闻'/> 
    <div style="width: 100%;height: 46px;"></div>
    
    <div class="news-list-padding">
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <!--          <div >{{ item }}</div>-->
      <div class="news-list-item" v-for="(item,index) in listDatas" :key="index" @click="pushDetail(item)">
        <img class="news-list-item-img" :src="''+item.iconImg" />
        <!-- 最多显示两行 -->
        <div class="van-multi-ellipsis--l2 title">
          {{ item.name }}
        </div>
        <div class="time">{{ item.prize }}</div>
      </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <div style="width: 100%;height: 60px;"></div>
  </div>
</template>

<script lang="ts">
import vnavibar from "../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
 
export default defineComponent({
  components: {  
    vnavibar
  }, 
  setup () {  
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const customList0 = [
      {
        'content':'abcdfgdfdgdgdgd',
'name':'abcdfg',
'id':0,
'prize':90091,'progress':0.08,'isSellOut':1,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
},
{
        'content':'abcdfgdfdgdgdgd',
'name':'abcd',
'id':1,
'prize':90092,'progress':0.9,'isSellOut':0,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
}

      ]

    const customList = [
      {
        'children':customList0,
        'content':"<a href='https://www.baidu.com/' target='_blank'>兮动人</a><p>content</p><style></style>",
// '<p v-html="text">dfbfgbfghbf</p>', 
'name':'abcdfg',
'id':0,
'prize':90091,'progress':0.08,'isSellOut':1,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
},

{'children':customList0,
'content':"<a href='https://www.baidu.com/' target='_blank'>兮动人</a><p>content</p><style></style>",
// '<p v-html="text">dfbfgbfghbf</p>', 
'name':'abcd',
'id':1,
'prize':90092,'progress':0.9,'isSellOut':0,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
}

      ]
      
    const state = reactive({
      active:0,  
      listDatas: Array(),
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,
    });

    const onRefresh = () => {
      //第一次列表不执行，下啦执行
      // showToast('onRefresh')
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      
      onLoad();
 
    }

    const onLoad = () => {
      //第一次列表执行
      // showToast('onLoad')
      if (state.refreshing) {
        // showToast('refreshing')
        state.listDatas = [];
        state.refreshing = false;
      }
      requestList() 
      
    };

    const requestList = () => {
      state.page_no++
      var data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        // 'baseId': state.active,
      }
      // showToast(state.page_no.toString())
      requestDummy(data).then((res: any) => {
          // showToast('dgdgdf'+res.message)

      state.listDatas = state.listDatas.concat(<any>customList);
      state.loading = false;
      //   if (res.pageList.length == 0) {
        //一定要按照返回数据写 真的没数据了 finished = true;
        //否则mock 数据就finished = false
        state.finished = false;
      //   }  

        // changeTab()
      
    })
     
      // project_listProject_action_post(data).then(res => {
      //   console.log(res)
      //   for (let i = 0; i < res.pageList.length; i++) {
      //     this.listDatas.push(res.pageList[i]);
      //   }
      //   console.log(this.listDatas)
      //   this.loading = false;

      //   if (res.pageList.length == 0) {
      //     this.finished = true;
      //   }
      // })

    } 
    

    const changeTab = () => {
      state.listDatas = [];
      state.loading = false;
      state.finished = false;
      state.refreshing = false;
      state.page_no = 0;
      // document.body.scrollTop = 0
      // firefox
      // document.documentElement.scrollTop = 0
      // onLoad()
      // onRefresh()
    }
 
 
    const pushDetail = (e:any) => {
      localStorage.setItem('news', e.content)
      localStorage.setItem('news_title', e.name)
      localStorage.setItem('news_time', e.prize) 
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      //最简写
      router.push('/newsDetails?id='+e.id) 
      //vue3使用vue-router4.0  
      
      // router.push({
      //   path: '/newsDetails',
      //   query:e  
      // })//链接拼的长 query后只能对象，不能单独id
       

      // router.push({
      //   name: 'newsDetails',
      //   params:e  
      // })//刷新详情详情页面会丢失，要在router配id
      // router.push({
      //   name: 'newsDetails',
      //   params:{id:e.id}  
      // })

      // router.push({
      //   name: 'newsDetails',
      //   state:{
      //     id:e.id
      //   }  
      // })//最合适

    }
 
    onMounted(() => {
      // requestList() 
    
  })
     
      
    return { 
      ...toRefs(state),
  
      onRefresh,
      onLoad,
      // requestList,  
      changeTab, 
      pushDetail, 
    }
  },
  
});


// export default {
//   data(){ 
//     return{ 
//       listDatas: [],
//       loading: false,
//       finished: false,
//       refreshing: false,
//       page_no:0,
//     }
//   },
//   components:{
//     vnavibar,
//   //   [NavBar.name]:NavBar,
//   //   [List.name]:List,
//   //   [PullRefresh.name]:PullRefresh,
//   },
//   created() {
//     // this.requestList()
//   },
//   methods:{
//     requestList(){ 
//       this.page_no++

//       var customList = []  
//       const dic = {
// name:'abcdfgdfdgdgdgdcbgdgbdgddfdfd',
// content:
// "<a href='https://www.baidu.com/' target='_blank'>兮动人</a><p>content</p><style></style>",
// // '<p v-html="text">dfbfgbfghbf</p>',
// prize:90091,
// iconImg:'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// }


//       customList.push(dic)

//       this.listDatas = this.listDatas.concat(customList);
//       this.loading = false;
//       this.finished = true;

//       // news_list_action_post({pageNum:this.page_no}).then(res=>{
//       //   console.log(res)
//       //   for (let i = 0; i < res.pageList.length; i++) {
//       //     this.listDatas.push(res.pageList[i]);
//       //   }
//       //   console.log(this.listDatas)
//       //   this.loading = false;

//       //   if (res.pageList.length==0) {
//       //     this.finished = true;
//       //   }
//       // })

//     },
//     onLoad() {
//       if (this.refreshing) {
//         this.listDatas = [];
//         this.refreshing = false;
//       }
//       this.requestList()
//     },
//     onRefresh() {
//       // 清空列表数据
//       this.finished = false;
//       this.page_no = 0
//       // 重新加载数据
//       // 将 loading 设置为 true，表示处于加载状态
//       this.loading = true;
//       this.onLoad();
//     }, 
//     pushDetail(e){ 
//       // showToast(e.name); 
//       console.log(e)
//       localStorage.setItem('news', e.content)
//       localStorage.setItem('news_title', e.name)
//       localStorage.setItem('news_time', e.prize) 
//       this.$router.push({path:'/newsDetails'})
//     }, 
//   }
// }

</script>
<style lang="scss" scoped>
.news-list{
  width: 100%;
  min-height: 100%;
  background: #F3F5F9;
  .news-list-padding{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .news-list-item{
      margin-top: 15px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      background: #FFFFFF;
      .news-list-item-img{
        width: 100%;
        height: 150px;
      }
      .title{
        margin-top: 10px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
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
    }
  }
}
</style>
