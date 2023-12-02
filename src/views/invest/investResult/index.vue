<template>
  <div class="investResult">
    <vnavibar title='记录' 
    />
    <div style="width: 100%;height: 46px;"></div>
    <div class="nr">
<!--      <div style="width: 100%;height: 1px;background: #F6F6F6;margin-left: 50px;"></div>-->
      <div class="bt">
        <div class="t1">
          <div class="c1">{{ headData.aa }}</div>
          <div class="c2">{{ $t('已持有') }} (AA)</div>
        </div>
        <div class="f1"></div>
        <div class="t1">
          <div class="c1">{{ headData.bb }}</div>
          <div class="c2">{{ $t('预期待') }} (BB)</div>
        </div>
      </div>
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <!--          <div >{{ item }}</div>-->
          <div class=""  v-for="(item,index) in listDatas" :key="index">
            <div class="liebiao-item" @click="pushDetail(item.id,item.name)">
              <div class="t1">
                <div class="n1">{{ item.name }}</div>
                <div class="n2 s1" v-if="item.status==0">{{ $t('进行中') }}</div>
                <div class="n2 s2"  v-if="item.status==1">{{ $t('已完成') }}</div>
                <div class="n2 s3"  v-if="item.status==2">{{ $t('已关闭') }}</div>
                <div class="n2 s4"  v-if="item.status=='-1'">{{ $t('已取消') }}</div>
              </div>
              <div class="t2">
<!--                剩余时间: 1 天 (每日产值: 2.00)-->
                {{item.type<3?$t('剩余时间')+':'+item.remainDays+$t('小时')+'('+$t('每小时产值')+item.valDay+')':$t('剩余时间')+':'+item['remainDays']+$t('天')+
              '('+$t('每日产值')+item['valDay']+')'}}
              </div>
              <div class="jindu">
                <div class="xn">
                  <div class="t1">{{ item['type']<3?item['passDays']+$t('小时'):item['passDays']+$t('天') }}</div>
                  <div class="t2">{{ $t('已生产') }}</div>
                </div>
                <div class="xn">
                  <div class="t1">{{ item.valPassDay }}</div>
                  <div class="t2">{{ $t('收益') }}</div>
                </div>
                <div class="xn">
                  <div class="t1">{{ item.incomeWill }}</div>
                  <div class="t2">{{ $t('预计') }}</div>
                </div>
              </div>
              <div style="background: #F6F6F6;height: 1px;width: 100%;margin-top: 15px;"></div>
              <div class="ck-xiangqing" >

                <div>{{ $t('时间') }}：{{ item.createTime }}</div>
                <img src="../../../assets/image/public/arrow_right.png" style="width: 18px;height: 18px;"/>

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
          'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
      }
      customList.push(vv)
    }

    const router = useRouter();
    const state = reactive({
      headData: {'aa':'aa','bb':'bb'} as any,
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
      // onLoad()//tabs固定个数，所以这里请求了
      onRefresh()
    }

    const pushDetail=(e:any,z:any)=>{
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/investResultInfo?orderId='+e+'&name='+z)
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
.investResult{
  width: 100%;
  //height: 100%;
  background: #F3F5F9;
  min-height: 100%;
  .bt{
    margin-top: 15px;
    padding: 17px 25px;
    background: #FFFFFF;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    .f1{
      height: 27px;
      width: 1px;
      background: #EEEEEE;
      margin: 0 28px;
    }
    .t1{
      flex: 1;
      .c1{
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: -0.3px;

        color: #333333;
      }
      .c2{
        margin-top: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: -0.3px;
        color: #999999;
      }
    }
  }
  .nr{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .liebiao-item{
      margin-top: 15px;
      width: 100%;
      background: #FFFFFF;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 4px;
      .t1{
        display: flex;
        .n1{
          flex: 1;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          /* identical to box height */


          color: #000000;
        }
        .n2{
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          /* identical to box height */

          text-align: right;

          /* green */


        }
        .s1{
          color: #0ECB81;
        }
        .s2{
          color: #1552F0;
        }
        .s3{
          color: #FF3E3E;
        }
        .s4{
          color: #999999;
        }
      }
      .t2{
        margin-top: 8px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */


        /* 999 */

        color: #999999;
      }
      .jindu{
        margin-top: 15px;
        width: 100%;
        //padding: 17px 15px;
        box-sizing: border-box;
        //background: #F6F6F6;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        .xn{
          text-align: left;
          .t1{
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 21px;
            /* identical to box height */


            /* #333333 */

            color: #333333;
          }
          .t2{
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
      .ck-xiangqing {
        padding: 15px 0 0 0;
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
    }
  }
}
</style>
<style>
.investResult .van-hairline--bottom::after{
  border-bottom-width:0
}
</style>