<template>
  <div class="investResultInfo">
    <vnavibar title="详情" />
    <div style="width: 100%;height: 46px;"></div>
    <div class="bt">
      <div class="ye">
        <div class="y1">
          <div class="l1">{{ headData.incomeReal }}</div>
          <div class="l2">{{ $t('已持有') }} (AA)</div>
        </div>
        <!--        <div class="y2">Ongoing</div>-->
        <div class="y2 s1" v-if="headData.status==0">{{ $t('进行中') }}</div>
        <div class="y2 s2" v-if="headData.status==1">{{ $t('已完成') }}</div>
        <div class="y2 s3" v-if="headData.status==2">{{ $t('已关闭') }}</div>
        <div class="y2 s4" v-if="headData.status=='-1'">{{ $t('已取消') }}</div>
      </div>
      <div class="jindu">
        <div class="xn">
          <div class="t1">{{ headData.amount }}</div>
          <div class="t2">{{ $t('数额') }}</div>
        </div>
        <div class="xn">
          <div class="t1">{{
              headData['type'] < 3 ?
                  headData['passDays'] + $t('小时') :
                  headData['passDays'] + $t('天')
            }}
          </div>
          <div class="t2">{{ $t('已生产') }}</div>
        </div>
        <div class="xn">
          <div class="t1">{{ headData.valDay }}</div>
          <div class="t2">{{ headData['type'] < 3 ? $t('每小时产值') : $t('每日产值') }}</div>
        </div>
      </div>
      <div class="jindu">
        <div class="xn">
          <div class="t1" style="display: flex;align-items: start;"><div>{{(headData['bonusRate'] * 100).toFixed(1)}}%</div><span style="font-style: normal;font-weight: 400;font-size: 10px;
          margin-left: 2px;line-height: 1px;color: #0ECB81;">+{{ ((headData['bonusRateVip']-headData['bonusRate']) * 100).toFixed(1) }}%</span></div>
          <div class="t2">{{ $t('比率') }}</div>
        </div>
        <div class="xn">
          <div class="t1">{{ headData['type']<3? headData['remainDays']+$t('小时'):
              headData['remainDays']+$t('天') }}</div>
          <div class="t2">{{ $t('剩余时间') }}</div>
        </div>
        <div class="xn">
          <div class="t1">{{ headData['incomeWill'] }}</div>
          <div class="t2">{{ $t('预计') }}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%;background: #F3F5F9;height: 8px;"></div>
    <div class="nr">

      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <div v-for="(item,index) in listDatas" :key="index">
            <div class="liebiao">
              <div class="liebiao-xinxi">
                <div class="title">{{ item.name }} {{ $t('AA') }}</div>
                <div class="time">{{ item.realTime }}</div>
              </div>
              <div class="jine-lv">+{{ item.prize }}</div>
             
              
            </div>
            <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
     
  </div>
</template>

<script lang="ts">
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

    const router = useRouter();
    const state = reactive({
      headData: {'aa':'aa','cc':'cc'} as any,
      active: '0',//必须字符串
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

    const pushDetail=(e:any,z:any)=>{
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/InvestmentIncome?orderId='+e+'&name='+z)
    }


    return {
      ...toRefs(state),

      onRefresh,
      onLoad,

      // requestList,
      changeTab,//tabs固定个数，这里请求了
      pushDetail,
    }
  },
  
   
}
</script>

<style lang="scss" scoped>
.investResultInfo {
  width: 100%;
  height: 100%;

  .nr {
    width: 100%;

    .liebiao {
      border-radius: 6px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;

      .liebiao-img {
        width: 20px;
        height: 20px;
      }

      .liebiao-xinxi {
        //margin-left: 15px;
        .title {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;

          color: #000000;
        }

        .time {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          /* identical to box height */
          color: #999999;
          margin-top: 8px;
        }
      }

      .jine-hong {
        flex: 1;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #FF4141;
      }

      .jine-lv {
        flex: 1;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #0ECB81;
      }
    }
  }

  .bt {
    padding: 15px;
    box-sizing: border-box;

    .ye {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .y1 {
        flex: 1;

        .l1 {

          font-style: normal;
          font-weight: 600;
          font-size: 30px;
          line-height: 36px;
          /* identical to box height */

          //text-align: center;
          letter-spacing: -0.3px;

          color: #333333;
        }

        .l2 {
          margin-top: 6px;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          letter-spacing: -0.3px;

          /* 999 */

          color: #999999;
        }
      }

      .y2 {
        width: 57px;
        height: 22px;
        //background: #0ECB81;
        border-radius: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        /* identical to box height */

        text-align: center;

        /* ffff */

        color: #FFFFFF
      }
    }
  }

  .s1 {
    background: #0ECB81;
  }

  .s2 {
    background: var(--cp-primary);
  }

  .s3 {
    background: #FF3E3E;
  }

  .s4 {
    background: #999999;
  }

  .jindu {
    margin-top: 15px;
    width: 100%;
    //padding: 17px 15px;
    box-sizing: border-box;
    //background: #F6F6F6;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;

    .xn {
      text-align: left;

      .t1 {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        /* identical to box height */


        /* #333333 */

        color: #333333;
      }

      .t2 {
        margin-top: 6px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */
        color: #999999;
      }
    }
  }
}
</style>

