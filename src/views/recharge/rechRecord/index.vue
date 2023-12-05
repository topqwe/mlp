<template>
  <div class="rechargeRecord">
    <vnavibar title='记录'
    />
    <div style="width: 100%;height: 46px;"></div>
    <div class="nr">
<!--/*      <div style="width: 100%;height: 1px;background: #F6F6F6;margin-left: 50px;"></div>*/-->
      <van-pull-refresh style="min-height: 100vh;" 
      v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <!--          <div >{{ item }}</div>-->
          <!-- @click="pushDetail(item)" -->
          
          <div class=""  v-for="(item,index) in listDatas" 
          :key="index" @click="pushDetail(item)">
           <div class="liebiao">
             <div class="pinglie">
               <div class="l1">{{ $t('订单号') }}</div>
               <div class="r1" @click="copyData(item.name)">{{ item.name }}</div>
               <img @click="copyData(item.name)" src="../../../assets/image/public/copy.png" style="width: 18px;height: 18px;margin-left: 4px;" />
             </div>
             <div class="pinglie">
               <div class="l1">{{ $t('创建时间') }}</div>
               <div class="r1">{{ item.createTime }}</div>
             </div>
             <div class="pinglie">
               <div class="l1">{{ $t('数量') }}</div>
               <div class="r1">{{ item.amount }} {{item.coin}}</div>
             </div>
             <div class="pinglie">
               <div class="l1">{{ $t('状态') }}</div>
               <div class="r1 chulizhi" v-if="item.state==0" >{{ $t('处理中') }}</div>
               <div class="r1 chenggong" v-if="item.state==1" >{{ $t('成功') }}</div>
               <div class="r1 shibai" v-if="item.state==2" >{{ $t('失败') }}</div>
             </div>

           </div>
          </div>
          <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import clipboard3 from 'vue-clipboard3' 
// import vnavibar from "../../../components/vnavibar.vue" 
// import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
 
export default {
  // components: {  
  //   vnavibar
  // }, 
  setup () {  
    const {toClipboard} = clipboard3()
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
    
    const copyData = async (ea:any)=>  {
//       if(window.getSelection.toString()===''){
//  return;
//       }
      try{
        await toClipboard(ea)
        // alert(('复制成功'))
        showToast(t('复制成功'))
      }catch (err){
        console.log(err)
        // alert(('复制失败'))
        showToast('复制失败')
      }
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
      
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      //最简写
      router.push('/rechRecordDetails?id='+e.id)  

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

      copyData
    }
  },
  
}

 

</script>
<style lang="scss" scoped>
.rechargeRecord{
  width: 100%;
  //height: 100%;
  background: #F3F5F9;
  min-height: 100%;
  .nr{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .liebiao{
      border-radius: 6px;
      margin-top: 15px;
      width: 100%;
      background: white;
      .pinglie{
        padding: 15px 15px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .l1{
          flex: 1;
          text-align: left;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #999999;
        }
        .r1{
          flex: 2;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          text-align: right;

          color: #333333;

        }
        .chulizhi{
          color: #4AA8FF!important;
        }
        .shibai{
          color: #FF4141;
        }
        .chenggong{
          color: #0ECB81;
        }
      }

    }
  }
}
</style>
