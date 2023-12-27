<template>
  <div class="MyTeam">
    <vnavibar title= '团队'/> 
    <div style="width: 100%;height: 46px;"></div>
    <div class="tuanduimingxi">
      <div class="l1">
        <div class="text">{{ $t('AA') }}</div>
        <div class="nr">{{ headData.aa }}</div>
      </div>
      <div class="r1">
        <div class="text">{{ $t('BB') }}</div>
        <div class="nr">{{ headData.bb }}</div>
      </div>
    </div>
    <div class="tuanduimingxi">
      <div class="l1">
        <div class="text">{{ $t('CC') }}</div>
        <div class="nr">{{ headData.cc }}</div>
      </div>
      <div class="r1">
        <div class="text">{{ $t('DD') }}</div>
        <div class="nr">{{ headData.dd }}</div>
      </div>
    </div>
      
 
    <div style="width: 100%;height: 8px;background: #F6F6F6;"></div>
    <div>
      <van-tabs v-model:active= "active" 
    @click-tab="changeTab">
        <van-tab :title="$t('一级')" name='0'>
        </van-tab>
        <van-tab :title="$t('二级')" name='1'></van-tab>
      </van-tabs>
      
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
              <div class="touxiang">
<!--                {{item.avatar}}-->
                <img class="touxiang-img" v-if="listDatas.length!==0"  src='../../assets/image/avatar/head_20.png' />
              </div>
              <div class="xinxi">
                <div class="title1">{{item.name}}</div>
                <div class="title2">{{ $t('AA') }}：{{ item.rebate }}</div>
                <div class="title3">{{ $t('BB') }}：{{ item.countOrder }}</div>
              </div>
              <div class="riqi">
                <div class="text2">{{ $t('日期') }}：{{ item.regTime }}</div>
                <div class="" style="width: 100%;height: 10px;"></div>
<!--                <div class="text1">推荐：312 人</div>-->
              </div>

            </div>
            <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
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
      // onLoad()//tabs固定个数，所以这里请求了
      onRefresh()
    }


    return {
      ...toRefs(state),

      onRefresh,
      onLoad,

      // requestList,
      changeTab,//tabs固定个数，这里请求了
    }
  },
  
   
}
</script>
<style lang="scss" scoped>
.MyTeam {
  width: 100%;

  .tuanduimingxi {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;

    .l1 {
      flex: 1;
      padding: 18px 0;
      box-sizing: border-box;
      border-right: 1px solid #F6F6F6;
      border-bottom: 1px solid #F6F6F6;
    }

    .r1 {
      flex: 1;
      padding: 18px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #F6F6F6;
    }

    .text {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      color: #999999;
    }

    .nr {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
      margin-top: 10px;
    }
  }

  .daili-liebiao {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 15px;
    box-sizing: border-box;
    .touxiang{
      display: flex;
      align-items:flex-start;
      margin-right: 20px;
      .touxiang-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .xinxi{
      text-align: left;
      flex: 2;
      //display: flex;
      .title1{
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        /* identical to box height */


        color: #999999;
      }
      .title2{
        margin-top: 15px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        /* identical to box height */


        color: #333333;
      }
      .title3{
        margin-top: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        /* identical to box height */


        color: #333333;

      }
    }
    .riqi{
      display: flex;
      flex-direction:column-reverse;
      align-items: end;
      .text1{
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */


        /* #2DBD85 */

        color: #0ECB81;
      }
      .text2{
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */

        text-align: right;

        color: #333333;

      }
    }
  }
}
</style>

