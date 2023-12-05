<template>
  <div class="task">

    <div class="headLayout">

      <div class="tou1">

        <div class="yu-e">{{ headData.aa }}
          <img v-if="isShowRefresh" class="yu-e-img rotateImages" src="../../assets/image/me/refresh.png" />
        <img @click="refreshPointAction" v-if="!isShowRefresh" class="yu-e-img" src="../../assets/image/me/refresh.png" />
        </div>
        
        <div class="yu-e-title">
          <div>{{ $t('余额') }} (AA)</div>
        </div>

      </div>


      <div class="tou2">
        <div class="fx1">
          <div class="nr2">{{ headData.aa }}</div>
          <div class="biaoti2">{{ $t('归还本金') }}</div>
        </div>
        <div class="fx2">
          <div class="nr2">{{ headData.bb }}</div>
          <div class="biaoti2">{{ $t('处理订单') }}</div>
        </div>
        <div class="fx3">
          <div class="nr2">{{ headData.cc }}</div>
          <div class="biaoti2">{{ $t('处理金额') }}</div>
        </div>
      </div>


      <div class="tou2">
        <div class="fx1">
          <div class="nr2">{{ headData.aa }}/{{ headData.bb }}</div>
          <div class="biaoti2">{{ $t('今日任务') }}</div>
        </div>
        <div class="fx2">
          <div class="nr2">{{ headData.bb }}</div>
          <div class="biaoti2">{{ $t('今日收入') }}</div>
        </div>
        <div class="fx3">
          <div class="nr2">{{ headData.cc }}</div>
          <div class="biaoti2">{{ $t('累计收入') }}</div>
        </div>
      </div>


    </div>


    <div>
      
      <van-tabs v-model:active= "active" 
    @click-tab="changeTab">

        <van-tab :title="$t('进行中')" name="0">
        </van-tab>
        <van-tab :title="$t('已支付')" name="1">
        </van-tab>
        <van-tab :title="$t('处理中')" name="2">
        </van-tab>
        <van-tab :title="$t('已完成')" name="3">
        </van-tab>
        
      </van-tabs>

      <div style="width: 100%;height: 4px;background: #F3F5F9;"></div>
     
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <div v-for="(item,index) in listDatas" :key="index">
            <!--            {{item}}/-->
            <div class="daili-liebiao">

              <div class="bianhao">
                <div class="biaoti">{{ $t('任务编号') }}：{{ item.id }}<img @click="copyData(item.id.toString())"
                  src="../../assets/image/public/copy.png"
                  style="width: 20px;height: 20px;margin-left: 5px;"/>
                </div>
                <div class="zhuangtai" v-if="item.status == 0">{{ $t('进行中') }}</div>
                <div class="zhuangtai" v-if="item.status == 1">{{ $t('已支付') }}</div>
                <div class="zhuangtai" v-if="item.status == 2">{{ $t('处理中') }}</div>
                <div class="zhuangtai" v-if="item.status == 3">{{ $t('已完成') }}</div>
              </div>

 
              <router-link :to="'/taskDetails?orderId='+item.id">
                <div class="shangpin-xinxi">
                  <img class=""
                       :src="''+item.iconImg"
                       style="width: 80px;height: 80px;"/>
                  <div class="xinxi">
                    <div class="van-multi-ellipsis--l2 te1" style=" ">
                      {{ item.name }}
                    </div>
                    <div class="te2">{{ $t('数量') }}：${{ item.prize }}({{ $t('比率') }}{{ (item.progress * 100).toFixed(1) }}%)</div>
                    <div class="te3">
                      <div>{{ item.prize }}</div>
                      <div>x{{ item.id }}</div>
                    </div>
                  </div>
                </div>
              </router-link>
              <div class="xinxi2">
                <div style="flex: 1">{{ $t('本产品来自') }}：{{ item.platName }}</div>
                <div >{{ $t('需支付') }}：<span class="chengs">{{ item.prizeReal }}</span></div>
              </div>
              <router-link :to="'/taskDetails?orderId='+item.id">
              <div class="ck-xiangqing" v-if="item.status == 1||item.status == 3">

                <div>{{ $t('查看详情') }}</div>
                <img src="../../assets/image/public/arrow_right.png" style="width: 18px;height: 18px;"/>

              </div>
              </router-link>
              <div class="ck-xiangqing2" v-if="item.status == 2" 
              @click="unclockEvent(item.id)">
                <div class="anniu">{{ $t('解锁') }}</div>
              </div>
              <div class="ck-xiangqing2" v-if="item.status == 0">
                <router-link :to="'/taskDetails?orderId='+item.id">
                  <div class="anniu">{{ $t('提交') }}</div>
                </router-link>
              </div>
            </div>
            <div style="width: 100%;height: 8px;background: #F3F5F9;"></div>
          </div>
          <div v-if="listDatas.length!=0" style="width: 100%;height: 33px;background: #F3F5F9;"></div>
        </van-list>
      </van-pull-refresh>

    </div>
  </div>
</template>
<script lang="ts">
import clipboard3 from 'vue-clipboard3' 
import vnavibar from "../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../api";
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
    const customList = Array()

    for (var i = 0; i < 3; i++) {
      var vv = {
        // 'children':customList0,
          'content':'abcdfgdfdgdgdgd',
          'name':i===0?'abcdfg':'dfeeedgff',
          'id':i,
          'status':i,
          'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
          'iconImg':
          'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
      }
      customList.push(vv)
    }

    const router = useRouter();
    const {toClipboard} = clipboard3()
    const { t, locale } = useI18n()
    const state = reactive({
      isShowRefresh:false,

      headData: {'aa':'8888','bb':'bb','cc':'cc'} as any,
      active: localStorage.getItem('taskActiveIndex')
      ?localStorage.getItem('taskActiveIndex'):'0',//必须字符串
      listDatas: [] as any,
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,
      
    })
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

      showToast(state.active?.toString())
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
      state.active =  typeof e === 'undefined' ? 
localStorage.getItem('taskActiveIndex')?localStorage.getItem('taskActiveIndex'):'0':(e.name)
// showToast(state.active.toString())

localStorage.setItem('taskActiveIndex',state.active?state.active:'0')

      state.listDatas = [];
      state.loading = false;
      state.finished = false;
      state.refreshing = false;
      state.page_no = 0;
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      // onLoad()//tabs固定个数，所以这里请求了
      onRefresh()
    }

    const pushDetail=(e:any,)=>{
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/taskDetails?orderId='+e)
    }

    const unclockEvent=(e:any,)=> {
      showToast(t('已解锁'));
      changeTab()
      // jiesuornwu_post({'orderId': e}).then(res => {
         
      //   showToast(t('已解锁'));
      //   this.changeTab()
      // })
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

    const refreshPointAction= async ()=>{ 
    state.isShowRefresh = true 

    await new Promise(resolve => setTimeout(resolve, 1000));

    requestDummy().then((res: any) => {
      showToast('已刷新'+res.message)
      state.headData.aa = res.status

      state.isShowRefresh = false
      // state.points = res.status
        
    })
      // goods_points_action_post({}).then(res=>{
      //   console.log(res)

      //   this.isShowRefresh = false
      //   this.points = res.points
      // })

    }

    refreshPointAction()
    
    return {
      ...toRefs(state),

      onRefresh,
      onLoad,

      // requestList,
      changeTab,//tabs固定个数，这里请求了
      
      pushDetail,
      unclockEvent,
      
      refreshPointAction,
      copyData,
    }
  },
  
   
}
</script>

<style lang="scss" scoped>
.task {
  width: 100%;
  height: 100%;

  .headLayout {
    margin: 10px 15px 0 15px;
    padding: 15px;
    box-sizing: border-box;
    background: var(--cp-primary);
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #FFFFFF;

    .tou1 {
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

    .tou2 {
      text-align: left; 

      width: 100%;
      margin-top: 20px;
      display: flex;

      .fx1 {
        flex: 1;
      }

      .fx2 {
        flex: 1;
      }

      .fx3 {

      }

      .nr2 { 
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: -0.3px;
        color: #FFFFFF;
      }

      .biaoti2 {
        margin-top: 8px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: -0.3px;
        color: #FFFFFF;
      }
    }
  }

  .daili-liebiao {
    padding: 15px 15px 0px 15px;
    box-sizing: border-box;
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #333333;

    .bianhao {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      border-bottom: 1px solid #F6F6F6;

      .biaoti {
        display: flex;
        align-items: center;
      }

      .zhuangtai {
        color: #999999;
      }
    }

    .shangpin-xinxi {
      width: 100%;
      display: flex;
      margin-top: 15px;

      .xinxi {
        flex: 1;
        text-align:left;
        width: 0;
        margin-left: 14px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .te1 {
          width: 243px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;

          /* 333 */

          color: #333333;
        }

        .te2 {
          margin-top: 7px;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;

          color: #999999;
        }

        .te3 {
          margin-top: 8px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          /* identical to box height */


          /* 审核中 */

          color: var(--cp-primary);

        }
      }
    }

    .xinxi2 {
      padding: 18px 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      border-bottom: 1px solid #F3F5F9;
      /* identical to box height */


      color: #999999;

      .chengs {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 14px;
        color: var(--cp-primary);
      }
    }

    .ck-xiangqing {
      padding: 17px 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #999999;
    }

    .ck-xiangqing2 {
      padding: 10px 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #999999;

      .anniu {
        width: 100px;
        height: 40px;
        background: var(--cp-primary);
        border-radius: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 40px;
        text-align: center;

        /* 白色 */

        color: #FFFFFF;

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
