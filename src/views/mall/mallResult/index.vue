<template>
  <div class="mallResult">
    <vnavibar title='记录' />
    <div style="width: 100%;height: 46px;"></div>
    <div style="flex: 1;display: flex;flex-direction: column;">
      
    <van-tabs sticky v-model:active= "active" 
    @click-tab="changeTab" style="margin-bottom: 1px;">
          <van-tab :title="$t('实物兑换记录')" name="0">
          </van-tab>
          <van-tab :title="$t('余额兑换记录')" name="1">
          </van-tab>
      </van-tabs> 
       
        <!--/*      <div style="width: 100%;height: 1px;background: #F6F6F6;margin-left: 50px;"></div>*/-->
        <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
          <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('没有更多了')"
              @load="onLoad"
          > 
            <div  v-for="(item,index) in listDatas" :key="index" @click="pushDetail(item.id)">
              <div class="liebiao">
                <div class="pinglie">
                  <div class="l1" >{{ $t('单号') }}</div>
                  <div class="van-ellipsis r1 " @click="copyData(item.id)">{{ item.id }}</div>
                  <img @click="copyData(item.id)" src="../../../assets/image/public/copy.png" style="width: 18px;height: 18px;margin-left: 4px;" />
                </div>
                <div class="pinglie">
                  <div class="l1">{{ $t('创建时间') }}</div>
                  <div class="r1">{{ item.name }}</div>
                </div>
                <div class="pinglie">
                  <div class="l1">{{ $t('兑换类型') }}</div>
                  <div class="r1" v-if="active=='0'">{{ $t('实物') }}</div>
                  <div class="r1" v-if="active=='1'">{{ $t('余额') }}</div>
                </div>
                <div class="pinglie">
                  <div class="l1">{{ $t('支付积分') }}</div>
                  <div class="r1">{{ item.prize }}{{ $t('积分') }}</div>
                </div>
                <div class="pinglie">
                  <div class="l1">{{ $t('订单状态') }}</div>
                  <div class="r1 s1" v-if="item.id==0" >{{ $t('处理中') }}</div>
                  <div class="r1 s2" v-if="item.id==1" >{{ $t('已发货') }}</div>
                  <div class="r1 s3" v-if="item.id==2||item.id=='-1'" >{{ $t('已取消') }}</div>
                </div>

              </div>
            </div>
            <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
          </van-list>
        </van-pull-refresh> 

    </div>
<!--    <div style="width: 100%;height: 46px;"></div>-->


  </div>
</template>

<script lang="ts">
import clipboard3 from 'vue-clipboard3'
import vnavibar from "../../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
 
export default {
  components: {
    vnavibar
  }, 
  setup() {
    const {toClipboard} = clipboard3()
    const { t, locale } = useI18n()
    const router  = useRouter() 
    const customList = Array()

    for (var i = 0; i < 3; i++) {
      var vv = {
        // 'children':customList0,
          'content':'abcdfgdfdgdgdgd',
          'name':i===0?'abcdfg':'dfeeedgff',
          'id':i,
          'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
          'iconImg':
          'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
      }
      customList.push(vv)
    }
    const state = reactive({ 
      active: '0' ,
      listDatas: [] as any,
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,
    })
    const pushDetail=(e:any)=>{
       router.push('/mallResultInfo?id='+e+'&type='+state.active)
    }
    const copyData = async (ea:any)=>  {
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
    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    }
    const onLoad = () =>  {
      if (state.refreshing) {
        state.listDatas = [];
        state.refreshing = false;
      }
      requestList()
    }
     
    const requestList = () => {
      state.page_no++
      var data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        'level': state.active,
      }

      showToast(state.active.toString())
      requestDummy(data).then((res: any) => {
          // showToast('dgdgdf'+res.message)

      state.listDatas = state.listDatas.concat(customList);
      state.loading = false;

       //   if (res.pageList.length == 0) {
        //一定要按照返回数据写 真的没数据了 finished = true;
        //否则mock 数据就finished = false

        state.finished = false;
      //   } 

    })
      

      // wodetuandui_post(data).then(res => {
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
    const changeTab = (e?:any) => {
      state.active =  typeof e === 'undefined' ? '0':e.name
      state.listDatas = [];
      state.loading = false;
      state.finished = false;
      state.refreshing = false;
      state.page_no = 0;
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      onLoad()//tabs固定个数，所以这里请求了
    }


    return {
      ...toRefs(state),

      onRefresh,
      onLoad,

      // requestList,
      changeTab,//tabs固定个数，这里请求了
      
      pushDetail,
      copyData,
    }
  },
  
   
}
</script>
<style lang="scss" scoped>
.mallResult{
  width: 100%;
  //height: 100%;
  background: #F3F5F9;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .s1{
    color: #FF8934!important;
  }
  .s2{
    color: #0ECB81!important;
  }
  .s3{
    color: #FF3E3E!important;
  }
   
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

          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #999999;
        }
        .r1{
          flex: 1;
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
</style>
<style>
.rechargeRecord2 .van-hairline--bottom::after{
  border-bottom-width:0
}
.van-sticky--fixed{
  /*top: 46px!important;*/
}
</style>