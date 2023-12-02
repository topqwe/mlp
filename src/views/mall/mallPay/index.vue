<template>
  <div class="mallPay">
    <vnavibar title='兑换'/>

    <div style="width: 100%;height: 46px;"></div>

    <van-tabs sticky v-model:active= "active" 
    @click-tab="changeTab" style="margin-bottom: 20px;">

      <van-tab :title="$t('兑换为实物')" name="1">
      </van-tab>
      <van-tab :title="$t('兑换为余额')" name="2">
      </van-tab>
       
    </van-tabs>


    <div class="zhengti-padding">
      <router-link v-if="active==1" :to="'/AddressList?orderId='+listDatas.goodsId">
        <div class="wsh-dizhi">
          <div class="wsh-text" v-if="listDatas.address==''">{{ $t('您尚未添加收货地址') }}</div>
          <div class="wsh-text" v-else>
            <div class="tex1">{{ listDatas.contacts }}&#32; &#32; {{ listDatas.phone }}</div>
            <div class="tex2">{{ listDatas.address }}</div>
          </div>
          <img src="../../../assets/image/public/arrow_right.png" class="xtb"/>
        </div>
      </router-link>
      
      <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
      <div class="shangpin-xinxi">
        <img class="" :src="''+listDatas.iconImg"
             style="width: 80px;height: 80px;"/>
        <div class="xinxi">
          <div class="van-multi-ellipsis--l3 te1" style="text-align: left; ">
            {{ listDatas.name }}
          </div>
          
          
          <div class="te3">
            <div>{{ listDatas.prize }}<span style="color: #333333;margin-left: 4px;">{{ $t('积分') }}</span></div>
            
          </div>
        </div>
      </div>
      <div class="fenge"></div> 
      <div class="exchange">{{ $t("兑换数量") }}</div>
      <div class="exchange-input">
        <el-input

            :placeholder="$t('请输入兑换数量')"
            maxlength="20"
            v-model="input2"
            clearable>
        </el-input>
      </div>
      <div class="xinxi1" v-if="active==2">
        <div class="bao1">{{ $t('消耗积分') }}</div>
        <div class="bao2">{{(listDatas.prize*input2).toFixed(0)}}</div>

      </div>
      <div class="xinxi1" v-if="active==2">
        <div class="bao1">{{ $t('折算金额') }}</div>
        <div class="bao3">{{ listDatas.prize*input2/Number((listDatas.scale*1).toFixed(0)) }}</div>
      </div>
      <div class="xinxi1" v-if="active!=2">
        <div class="bao1">{{ $t('支付积分') }}</div>
        <div class="bao2">{{(listDatas.prize*input2).toFixed(0)}}</div>
      </div>
      <div v-if="active==2" style="color: #1552F0;font-size: 12px; text-align: left;">
        {{ $t('商品比例') }}：{{listDatas.scale}}{{ $t('积分') }} = 1A</div>
      
      <div v-if="active==1" class="wc-bj" @click="actionEvent1">
        {{ $t('立即兑换') }}
      </div>

      <div v-if="active==2" class="wc-bj" @click="actionEvent2">
        {{ $t('立即兑换') }}
      </div>
    </div> 
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import {showConfirmDialog,showDialog, showToast,showLoadingToast,
    showSuccessToast,showFailToast,  } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
import vnavibar from "../../../components/vnavibar.vue"   
export default {
  setup() {
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      active: '1' as any,
      listDatas: 
      {'name':'dfdfdf','scale':0.2 ,
      'phone':'12323334','contacts':'dgfdedfefe'} as any,
      input2: '' as any
    })
    const requestData=()=> {
 
    }
    requestData()


    const changeTab= (e: any)=> {
      state.active =  typeof e === 'undefined' ? '1':e.name
      // state.listDatas = [];
      // state.loading = false;
      // state.finished = false;
      // state.refreshing = false;
      // state.page_no = 0;
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      // onLoad()//tabs固定个数，所以这里请求了
    }
     
    const actionEvent1=()=> {
      // checkFPWPost({}).then(res => {
      //   if (res.safeword == 1) {
      //     console.log(444)
      //     this.show = true
      //   } else {
      //     this.$router.push('/fPWSet')
      //   }
      // })
      // const t = this
      // if(this.listDatas.address==''){
      //   showToast(this.$t('地址不能为空'))
      //   return
      // }
      if (state.input2 === '') {
        showToast(t('请输入兑换数量'));
        return
      }
      var data = {
        // goodsId:t.listDatas.goodsId,
        // goodsNum:t.input2,
        // contacts:t.listDatas.contacts,
        // phone:t.listDatas.phone,
        // address:t.listDatas.address,
        // use:null
      }
      showConfirmDialog({
        title: t('提示'),
        message: t('确认要兑换吗？'),
      })
          .then(() => {
            state.input2 = ''
            showToast(t('成功'));
              router.push('/succeed?path=mallResult')

            // goods_goodsBuy_action_post(data).then(res=>{
            //   console.log(res)
            //   t.input2 = ''
            //   // Toast(this.$t('成功'));
            //   t.$router.push('/succeed?path=PointsRedemptionRecord')
            // })


          })
          .catch(() => {

            // on cancel
          });
    }

    const actionEvent2=()=> {
      // checkFPWPost({}).then(res => {
      //   if (res.safeword == 1) {
      //     console.log(444)
      //     this.show = true
      //   } else {
      //     this.$router.push('/fPWSet')
      //   }
      // })
      // const t = this
      // if(this.listDatas.address==''){
      //   showToast(t.$t('地址不能为空'))
      //   return
      // }
      if (state.input2 === '') {
        showToast(t('请输入兑换数量'));
        return
      }
      var data = {
        // goodsId:t.listDatas.goodsId,
        // goodsNum:t.input2,
      }
      showConfirmDialog({
        title: t('提示'),
        message: t('确认要兑换吗？'),
      })
          .then(() => {
            state.input2 = ''
              router.push(
                '/succeed?path=mallResult')

            // goods_uExchange_action_post(data).then(res=>{
            //   console.log(res)
            //   t.input2 = ''
            //   t.$router.push(
            //     '/succeed?path=PointsRedemptionRecord')
            // })
          })
          .catch(() => {
 
          });
    }
    return {
        ...toRefs(state),

        changeTab,
        actionEvent1,
        actionEvent2
     
    }
  },
  components: {
     vnavibar
  }, 
  
   
}
</script>
<style lang="scss" scoped>
.mallPay {
  width: 100%;
  height: 100%;
  position: relative;

  .zhengti-padding {
    padding: 0 15px 15px 15px;
    box-sizing: border-box;

    .wsh-dizhi {
      padding: 15px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .wsh-text {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      /* 全局主标题灰色 */

      color: #999999;
      flex: 1;

      .tex1 {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        //line-height: 16px;

        /* 333 */

        color: #333333;
      }

      .tex2 {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        //line-height: 16px;
        margin-top: 10px;
        /* 全局主标题灰色 */

        color: #999999;
      }
    }

    .xtb {
      width: 18px;
      height: 18px;
    }


    .shangpin-xinxi {
      width: 100%;
      display: flex;
      margin-top: 15px;

      .xinxi {
        flex: 1;
        width: 0;
        margin-left: 14px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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

          color: #1552F0;

        }
      }
    }

    .fenge {
      margin-top: 15px;
      width: 100%;
      height: 1px;
      background: #F6F6F6;
    }

    .xinxi2 {
      padding: 18px 0;
      margin-bottom: 15px;
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
        color: #1552F0;
      }
    }

    .exchange {
      text-align: left;
      margin-top: 15px;
      margin-bottom: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */


      color: #333333;
    }


    .xinxi1 {
      margin-top: 24px;
      width: 100%;
      display: flex;
      margin-bottom: 24px;
      justify-content: center;
      align-items: center;

      .bao1 {
        flex: 1;
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 全局主标题灰色 */

        color: #999999;
      }

      .bao2 {
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #1552F0;
      }

      .bao3 {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 全局主标题灰色 */

        color: #999999;
      }
    }
  }

  .wc-bj {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    //width: fit-content;
    box-sizing: content-box;
    bottom: 0px;
    //right: 0;
    //left: 0;
    width: 345px;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    /* identical to box height, or 100% */
    text-align: center;
    background: #1552F0;
    border-radius: 4px;
    color: #FFFFFF;
  }

  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

</style>

