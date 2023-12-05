<template>
  <div class="mall"> 
    <div class="gz">
      <router-link to="/PointsRules">
      <div class="gz-z">{{ $t('规则') }}</div>
      </router-link>
      <div class="yu-e">
        <div>{{ points }}</div>
        <img v-if="isShowRefresh" class="yu-e-img rotateImages" src="../../assets/image/me/refresh.png" />
        <img @click="refreshPointAction" v-if="!isShowRefresh" class="yu-e-img" src="../../assets/image/me/refresh.png" />
      </div>
      <div class="yu-e-title">{{ $t('当前积分') }}</div>
    </div>
    <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('没有更多了')"
          @load="onLoad"
      >
    <div class="shangp">

      <div v-for="(item,index) in listDatas" :key="index" @click="pushDetail(item.id)" class="shangp-item">
        <img class="shangp-img" :src="''+item.iconImg" />
        <!-- src="''+前缀拼接 -->
        <div class="van-multi-ellipsis--l3 shangp-title">
         {{item.name}}
        </div>
        <div class="shangp-jiage">
          <div class="t1"> {{item.prize}} </div>
          <div class="t2"> {{ $t('积分') }}</div>
        </div>
      </div>

    </div>
      </van-list>
    </van-pull-refresh>
    <div style="width: 100%;height: 90px;"></div>
  </div>
</template>


<script lang="ts"> 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
 
export default defineComponent({
  components: {  
  }, 
  setup () {  
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();

    const customList0 = [
      {
        'content':'abcdfgdfdgdgdgd',
'name':'abcdfg',
'id':0,
'prize':90091,'progress':0.08,'isSellOut':1,
'iconImg':
'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
},
{
        'content':'abcdfgdfdgdgdgd',
'name':'abcd',
'id':1,
'prize':90092,'progress':0.9,'isSellOut':0,
'iconImg':
'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
}

      ]

const customList = Array()

for (var i = 0; i < 3; i++) {
  var vv = {
    'children':customList0,
      'content':'abcdfgdfdgdgdgd',
      'name':i===0?'abcdfg':'dfeeedgff',
      'id':i,
      'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
      'iconImg':
      'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
  }
  customList.push(vv)
}
      
    const state = reactive({
      active:0,
      points:'999999', 
      isShowRefresh:false,
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
      showToast(state.page_no.toString())
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
      // this.onLoad()
    }

   const refreshPointAction= async ()=>{ 
    state.isShowRefresh = true 

    await new Promise(resolve => setTimeout(resolve, 1000));

    requestDummy().then((res: any) => {
      showToast('已刷新'+res.message)

      state.isShowRefresh = false
      state.points = res.status
        
    })
      // goods_points_action_post({}).then(res=>{
      //   console.log(res)

      //   this.isShowRefresh = false
      //   this.points = res.points
      // })

    }

 
    const pushDetail = (e:any) => {
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/mallDetails?id='+e) 
    } 

    refreshPointAction()
    
    onMounted(() => {
      // requestList()

    //   requestDummy().then((res: any) => {
    //   showToast('dgdgdf'+res.message)
 
    // state.listDatas = state.listDatas.concat(customList);

    // changeTab()
        
    // })
  })
     
      
    return { 
      ...toRefs(state),
  
      onRefresh,
      onLoad,
      // requestList, 

      refreshPointAction,
      
      changeTab,
      pushDetail, 
    }
  },
  
});



// export default {
//   components:{
//     // [List.name]: List,
//     // [PullRefresh.name]: PullRefresh,
//   },
//   data(){
//     return{
//       active:0,
//       points:'999999',
//       isShowRefresh:false,
//       listDatas: [
//         {
// name:'abcdfgdfdgdgdgdcbgdgbdgddfdfd',
// id:0,
// prize:90090,
// iconImg:
// 'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// },

// // {
// // name:'abcdfgdfdgdgdgdcbgdgbdgddfdfd',
// // id:0,
// // prize:90090,
// // iconImg:
// // 'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// // },


//       ],
//       loading: false,
//       finished: false,
//       refreshing: false,
//       page_no: 0,
//     }
//   },
  
//   created() {
//     this.refreshPointAction()
//   },
//   methods:{
//     onRefresh() {
//       // 清空列表数据
//       this.finished = false;
//       this.page_no = 0
//       // 重新加载数据
//       // 将 loading 设置为 true，表示处于加载状态
//       this.loading = true;
//       this.onLoad();
//     },
//     onLoad() {
//       if (this.refreshing) {
//         this.listDatas = [];
//         this.refreshing = false;
//       }
//       this.requestList()
//     },
//     requestList() {
//       this.page_no++
//       var data = {
//         'pageNum': this.page_no,
//         'pageSize': 10,
//       }

//       const dic = {
// name:'abcdfgdfdgdgdgdcbgdgbdgddfdfd',
// id:1,
// prize:90091,
// iconImg:
// 'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// }


//       this.listDatas.push(dic);

       
//       this.loading = false;
//       this.finished = true;

//       // goods_list_action_post(data).then(res => {
//       //   console.log(res)
//       //   for (let i = 0; i < res.pageList.length; i++) {
//       //     this.listDatas.push(res.pageList[i]);
//       //   }
//       //   console.log(this.listDatas)
//       //   this.loading = false;

//       //   if (res.pageList.length == 0) {
//       //     this.finished = true;
//       //   }
//       // })


//     },
    
//     refreshPointAction(){
//       this.isShowRefresh = true

//       this.isShowRefresh = false

//       // goods_points_action_post({}).then(res=>{
//       //   console.log(res)

//       //   this.isShowRefresh = false
//       //   this.points = res.points
//       // })


//     },
//     clearListData() {
//       this.listDatas = [];
//       this.loading = false;
//       this.finished = false;
//       this.refreshing = false;
//       this.page_no = 0;
//       // this.onLoad()
//     },
//     pushDetail(e) {
//       console.log(e)
//       this.$router.push('/InvestmentDetails?id='+e)
//     }, 
//   }
// }
</script>
<style lang="scss" scoped>
.mall{
  position: relative;
  //background: #EFF2F7;
  min-height: 100%;
  font-size: 14px;
  padding: 0 15px;
  box-sizing: border-box;
  .gz{
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: 86px;
    background: var(--cp-primary);
    padding: 15px;
    box-sizing: border-box;
    border-radius: 4px;
    .gz-z{
      position: absolute;
      width: 70px;
      height: 26px;
      right: -1px;
      top: 0;
      bottom: 0;
      margin-top: auto;
      margin-bottom: auto;
      border-radius: 30px 0 0 30px;
      background: #F1F5FF;
      //background: url("../../assets/image/mall/bg.png") no-repeat 100% 100%;
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 26px;
      color: var(--cp-primary);//var(--cp-primary)
    }
    .yu-e{
      display: flex;
      font-weight: 600;
      font-size: 30px;
      line-height: 36px;
      align-items: center;
      /* identical to box height */
      color: #FFFFFF;
      .yu-e-img{
        width: 22px;
        height: 22px;
        margin-left: 3px;
      }
    }
    .yu-e-title{
      flex: 1;
      text-align: left;
      margin-top: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #FFFFFF;
    }
  }
  .shangp{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    //justify-content: center;
    gap: 15px;
    .shangp-item{
      width: 165px;
      .shangp-img{
        width: 165px;
        height: 165px;

      }
      .shangp-title{
        margin-top: 11px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
      .shangp-jiage{
        margin-top: 12px;
        display: flex;
        .t1{
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 16px;
          /* identical to box height */


          /* 主题色 */

          color: var(--cp-primary);
        }
        .t2{
          margin-left: 5px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;

          /* #333333 */

          color: #333333;

        }
      }
    }
  }
  .rotateImages{
    -webkit-animation:myRotate 1s linear infinite;
    animation:myRotate 1s linear infinite;
  }
  @-webkit-keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
  @keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
}
</style>


<style>
.invest [class*=van-hairline]::after{
  border:none;
}
</style>
