<template>
  <div class="invest">
    <div>

    </div>
    <!-- <van-nav-bar 
//会滚没的
        :title="$t('AA')"
    /> -->
    <van-sticky>
    <van-nav-bar
    :title="$t('AA')"
    @click-right=""
    fixed
    right-text=""
    safe-area-inset-top
    z-index="999"
  />
 </van-sticky>
 
    <!-- <div style="width: 100%;height: 46px;"></div> -->
    <!-- type="card"  -->
    <van-tabs sticky v-model:active= "active" 
    @click-tab="changeTab" style="position: fixed;z-index: 999;" class="tab-width">

      <van-tab v-for="(item,index) in tabDatas" :key="index" :title="item.name" :name="item.id"></van-tab>

    </van-tabs>
    <div style="width: 100%;height: 44px;"></div>

    <div class="padd-15">
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >

      <div v-for="(item,index) in listDatas" :key="index" @click="pushDetail(item.id)" class="RecList">
        <div class="xm-title">
          <!-- <div class="van-multi-ellipsis--l2"> -->
            {{ item.name }}
          <!-- </div> -->

        </div>
        <div class="xm-xinxi">
          <div class="xinxi-k1">
            <div class="k-n">{{ item.name }}</div>
            <div class="k-title">AAA</div>
          </div> 
          <div class="xinxi-k1">
            <div class="k-n">{{ (item.progress * 100).toFixed(2) }}%</div>
            <div class="k-title">BBB</div>
          </div>
          <div class="xinxi-k1">
<!--            <div class="k-n">1000.00</div>-->
            <div class="k-n" v-if="2 <3">{{ 2 }}{{ $t('时') }}</div>
            <div class="k-n" v-else>{{ 2 }}{{ $t('天') }}</div>
            <div class="k-title">CCC</div>
          </div>
        </div>
        
        
        <div class="ProgressView">
        <div style="flex: 1;margin-right: 15px;">
          <div class="Progress">
            <div :class="item.isSellOut==1?'ProgressGrey':'ProgressHight'"
                 :style="'width:'+(item.progress*100).toFixed(2)+'%'"></div>
          </div>
          <div class="ProgressTitle">
            <div class="t1">Progress</div>
            <div class="t2">{{ (item.progress * 100).toFixed(2) }}%</div>
          </div>
        </div>
        <div class="Btn" :class="(item.isSellOut==1?'BtnGrey':'BtnHight')">
          {{ $t('立即参与') }}
        </div>
      </div>

      </div>

        </van-list>
      </van-pull-refresh>
    </div>
    
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
            'id':i.toString(),
            'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
            'iconImg':
            'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
        }
        customList.push(vv)
      }

     
    //listDatas:[]初始化出现 类型“never”上不存在属性“”。ts问题，用Array()
    //active必须string
    const state = reactive({
      active: localStorage.getItem('investActiveIndex')
      ?localStorage.getItem('investActiveIndex'):'0',
      tabDatas: Array(),
      listDatas: Array(),
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,
    });

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      
      onLoad();
    }

    const onLoad = () => {
      if (state.refreshing) {
        state.listDatas = [];
        state.refreshing = false;
      }
      requestList() 
    };

    const requestList = () => {
      // state.active = localStorage.getItem('investActiveIndex')
      // ?localStorage.getItem('investActiveIndex'):'0'

      state.page_no++
      const data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        'baseId': state.active,
      }
      // showToast(state.active?.toString())
      requestDummy(data).then((res: any) => {
          // showToast('dgdgdf'+res.message)

      state.listDatas = state.listDatas.concat(<any>state.tabDatas[Number(state.active)]['children']);
      state.loading = false;

       //   if (res.pageList.length == 0) {
        //一定要按照返回数据写 真的没数据了 finished = true;
        //否则mock 数据就finished = false 还能继续page++

        state.finished = false;
      //   } 

    })
      

      // requestList_post(data).then(res => {
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

    const requestTabData =()=> {

      requestDummy().then((res: any) => {
          // showToast('dgdgdf'+res.message)
        state.tabDatas = state.tabDatas.concat(<any>customList)
        state.active = 
        // state.tabDatas[0]['id'].toString()
        state.tabDatas[Number(localStorage.getItem('investActiveIndex'))]['id']
        
        // state.tabDatas[0]['id']
        // localStorage.setItem('investActiveIndex',state.active?state.active.toString():'0')

        // changeTab()
 
    })

      // project_listCategory_action_post({}).then(res=>{
      //   console.log(res.pageList)
      //   this.tabDatas = res.pageList
      //   if (res.pageList.length!==0){
      //     this.active = res.pageList[0]['baseId']
      //   }
      //   this.changeTab()
      // })
    }

    const changeTab = (e?:any) => {//index:number
      // console.log(e)
      //{name: 0, title: 'abcdfg', 
      //event: PointerEvent, disabled: false}

      // let data = {
      //   0:'',
      //   1:1,
      //   2:0
      // }
      // data[e]
      //
state.active =  typeof e === 'undefined' ? 
localStorage.getItem('investActiveIndex')?localStorage.getItem('investActiveIndex'):'0':(e.name)
// showToast(state.active.toString())

localStorage.setItem('investActiveIndex',state.active?state.active:'0')
// showToast(localStorage.getItem('investActiveIndex')?.toString())
// console.log(localStorage.getItem('investActiveIndex')?.toString())      
state.listDatas = [];
      state.loading = false;
      state.finished = false;
      state.refreshing = false;
      state.page_no = 0;
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      // onLoad()
      onRefresh()
    }

 
    const pushDetail = (e:any) => {
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/investDetails?projectId='+e) 
    }

    
    requestTabData()

    onMounted(() => {
    // state.active= localStorage.getItem('investActiveIndex')
    // showToast(localStorage.getItem('investActiveIndex')?.toString())
    changeTab() 
  })
     
      
    return { 
      ...toRefs(state),
  
      onRefresh,
      onLoad,
      // requestList,
      // requestTabData,
      
      changeTab,
      pushDetail, 
    }
  },
  
});


// export default {
//   components: {
//     // [NavBar.name]: NavBar,
//     // [Tab.name]: Tab,
//     // [Tabs.name]: Tabs,
//     // [List.name]: List,
//     // [PullRefresh.name]: PullRefresh,
//   },
//   data() {
//     return {
//       active: 0,
//       tabDatas:[],
//       listDatas: [],
//       loading: false,
//       finished: false,
//       refreshing: false,
//       page_no: 0,
//     }
//   },
  
//   created() {
//     this.requestTabData()
//   },
//   methods: {
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
//         'baseId': this.active,
//       }
      
//       this.listDatas = this.listDatas.concat(this.tabDatas[this.active]['children']);
//       this.loading = false;
//       this.finished = true;

//       // project_listProject_action_post(data).then(res => {
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
    
//     requestTabData(){
//       var list = [];
//     // for (int i = 0; i < 11; i++) {
//       var vv = {'name': 'gdfgf','prize':1500.8,'id': 0,
//       'progress':0.08,'isSellOut':1};
//       var vv1 = {'name': 'gdfgf','prize':1500.9,'id': 1,
//       'progress':0.9,'isSellOut':0};
//       list.push(vv);
//       list.push(vv1);
//     // }
//     var listP = [];
//     // for (int i = 0; i < 11; i++) {
//       var vv2 = {'name': 'gdfgf0','prize':1800.8,'id': 0,'children':list};
//       var vv3 = {'name': 'gdfgf1','prize':1800.8,'id': 1,'children':list};
//       listP.push(vv2);
//       listP.push(vv3);
//     // }
    

//     this.tabDatas = this.tabDatas.concat(listP);
//     this.active = this.tabDatas[0]['id']

//     this.changeTab()


//       // project_listCategory_action_post({}).then(res=>{
//       //   console.log(res.pageList)
//       //   this.tabDatas = res.pageList
//       //   if (res.pageList.length!==0){
//       //     this.active = res.pageList[0]['baseId']
//       //   }
//       //   this.changeTab()
//       // })


//     },


//     changeTab() {
//       this.listDatas = [];
//       this.loading = false;
//       this.finished = false;
//       this.refreshing = false;
//       this.page_no = 0;
//       document.body.scrollTop = 0
//       // firefox
//       document.documentElement.scrollTop = 0
//       // this.onLoad()
//     },
//     pushDetail(e) {
//       document.body.scrollTop = 0
//       // firefox
//       document.documentElement.scrollTop = 0
//       this.$router.push('/ProductDetails?projectId='+e)
//     },
//     onClickLeft() {
//       this.$router.push('/me')
//     },
//   }
// }
</script>
<style lang="scss" scoped>
.invest {
  position: relative;
  background: #EFF2F7;
  min-height: 100%;
  .tab-width{
    width: 100%;//375px
  }

  .padd-15 {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .RecList {
    margin-top: 15px;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;

    .xm-title {
      flex: 1;
      text-align: left;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;

      color: #000000;

    }

    .xm-xinxi {
      margin-top: 15px;
      display: flex;

      .k-n {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        /* identical to box height */
        color: #333333;
        //text-align: center;
      }

      .k-title {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        //line-height: 14px;
        /* identical to box height */
        //text-align: center;
        color: #999999;
      }

      .xinxi-k1 {
        flex: 1;
      }
    }

    .ProgressView {
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      .Progress {
        margin-top: 2px;
        width: 140px;
        height: 8px;
        background: #EEEEEE;
        border-radius: 27px;

        .ProgressHight {
          height: 8px;
          background: var(--cp-primary);
          border-radius: 27px;
        }

        .ProgressGrey {
          height: 8px;
          background: var(--cp-dark);
          border-radius: 27px;
        }
      }

      .ProgressTitle {
        width: 140px;
        margin-top: 8px;
        display: flex;
        justify-content: space-between;

        .t1 {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #000000;
        }

        .t2 {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #000000;
        }
      }

      .Btn{
        width: 96px;
        height: 36px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 36px;
        /* identical to box height, or 114% */

        text-align: center;

        color: #FFFFFF;


        border-radius: 4px;
      }

      .BtnHight {
        background: var(--cp-primary);
      }

      .BtnGrey {
        background: var(--cp-dark);
      }
    }
  }
}
</style>
<style>
.invest [class*=van-hairline]::after {
  border: none;
}
</style>
