<template>
  <div class="investPay">
    <vnavibar title='确认'/>

    <div style="width: 100%;height: 46px;"></div>
    <div class="zhengti-padding">
      <div class="gz">
        <div class="gz-z" @click="jumpToRecharge">{{ $t('充值') }}</div>
        <div class="yu-e">
          <div>{{ points }}</div>
          <img v-if="isShowRefresh" class="yu-e-img rotateImages" src="../../../assets/image/me/refresh.png" />
          <img @click="refreshPointAction" v-if="!isShowRefresh" class="yu-e-img" src="../../../assets/image/me/refresh.png" />
        </div>
        <div class="yu-e-title">{{ $t('余额') }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">
          {{ $t('起点') }}</div>
        <div class="bao2">{{ listDatas.name }}AA</div>
      </div>
      
      <div class="xinxi1">
        <div class="bao1">{{ $t('重复') }}</div>
        <div class="bao2"  v-if="listDatas.repeating">{{ $t('可') }}</div>
        <div class="bao2" v-if="!listDatas.repeating">{{ $t('不可') }}</div>
      </div> 

      <div class="xinxi1">
        <div class="bao1">{{ $t('时间') }}</div>
        <div class="bao2" v-if="listDatas.type==1">{{ $t('满') }}1{{$t('小时')}}{{$t('')}}</div>
        <div class="bao2" v-else-if="listDatas.type==2">{{ $t('满') }}{{listDatas.bonus}}{{ $t('小时') }}{{ $t('自动结息') }}</div>
        <div class="bao2"  v-else-if="listDatas.type==3">{{ $t('满') }}1{{ $t('天') }}{{$t('')}}</div>
        <div class="bao2" v-else-if="listDatas.type!==1&&listDatas.type!==2&&listDatas.type!==3">
          {{ $t('满') }}{{listDatas.bonus}}{{ $t('天') }}{{ $t('') }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('期限') }}</div>
        <div class="bao2" v-if="listDatas.type==1">{{ $t('A') }}{{(listDatas.bonusRate*100).toFixed(1)}}%，{{ $t('B') }}</div>
        <div class="bao2" v-else-if="listDatas.type==2">{{ $t('AA') }}{{(listDatas.bonusRate*100).toFixed(1)}}%，{{listDatas.bonus}}{{ $t('BB') }}</div>
        <div class="bao2" v-else-if="listDatas.type!==1&&listDatas.type!==2&&listDatas.type!==3">
          {{ $t('AAA') }}{{(listDatas.bonusRate*100).toFixed(1)}}%，{{listDatas.bonus}}{{ $t('BBB') }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('赠送') }}</div>
        <div class="bao2">{{ $t('总的') }} {{(listDatas.pointRate*100).toFixed(1)}} %</div>
      </div> 

    </div>
    <div style="width: 100%;background: #F3F5F9;height: 8px;"></div>
    <div class="zhengti-padding">
      <div class="Exchange">{{ $t('金额') }}</div>
      <div class="Exchange-input">
        <el-input

            :placeholder="$t('请输入数额')"
            maxlength="20"
            v-model="input2"
            clearable>
        </el-input>
      </div>
      <div style="color: #999999;font-size: 12px;margin-top: 8px;">{{$t('得到')}} <span style="color: #1552F0;margin-right: 2px;">{{ (input2*1).toFixed(1) }}</span>AA,
        <span v-if="listDatas.type==1&&listDatas.type==2">{{ $t('每天') }}</span>
        <span v-else>{{ $t('每小时') }}</span>{{ $t('可收益') }}<span style="color: #1552F0;margin-right: 2px;">{{ (listDatas.bonusRate*input2).toFixed(1) }}</span>AA,
        {{ $t('可得积分') }}
        <span style="color: #1552F0;margin-right: 2px;">{{ (listDatas.pointRate*input2).toFixed(0) }}</span>
        {{ $t('积分') }}</div>
      <div class="wc-bj" @click="submmitEvent">
        {{ $t('立即') }}
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <!--        <div class="block" />-->
        <div style="width: 300px;height: 150px;background:  #F3F5F9;border-radius: 5px;">
          <van-password-input
              style="margin-top: 30px;"
              :value="value"
              :gutter="10"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
          />
          <div style="text-align: center;font-size: 14px;margin-top: 30px;">{{ $t('') }}</div>
        </div>
        <!-- 数字键盘 -->
        <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = true"
        />
      </div>
    </van-overlay>
  </div>
</template>
<script lang="ts"> 
import vnavibar from "../../../components/vnavibar.vue"
import { defineComponent,reactive, ref,toRefs,onMounted,watchEffect} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
export default {
  setup(){
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      listDatas:{'name':'dfdfdf',} as any,

      isShowRefresh:false, 
      points:'99999',

      input2:'' as any,

      value:'',
      showKeyboard: true,
      show:false,
    })

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
    const jumpToRecharge =()=>{
      router.push('/rechargeList')
    }
    const requestDatas=()=>{
      // project_projectInfo_action_post({projectId:this.$route.query.projectId}).then(res=>{
      //   console.log(res.project)
      //   this.listDatas = res.project
      // })
    }
    const submmitEvent=()=>{
      if (state.input2==''){
        showToast(t('请输入数额'))
        return
      }
      state.show = true
      // checkFPWPost({}).then(res=>{
      //   if (res.safeword==1){
      //     console.log(444)
      //     this.show = true
      //   }else {
      //     this.$router.push('/fPWSet')
      //   }
      // })
    }
    
     
    const submmitPost=()=>{
      var data = {
        projectId:state.listDatas.id,
        amount:state.input2,
        safeword:state.value,
      }
      state.show = false
      state.input2 = ''
      state.value = ''

      router.push('/succeed?path=investResult')
      // project_buy_action_post(data).then(res=>{
      //   // Toast(this.$t('成功'));
     // })
    }

  //   watch(()=>state.value,(newVal,oldVal)=>{
  //     //指定对象属性
  //    if (newVal.length === 6) {
  //      submmit()
  //    }
  //  },{deep:true})
    watchEffect(()=>{
    //不指定对象属性
    if (state.value.length === 6){
    if(state.value === '111111') {
       submmitPost()
     }else{
      showFailToast('错误')
      state.value = ''
     }
    }
   },)

    refreshPointAction()
    requestDatas()
    return{   
      ...toRefs(state),
      refreshPointAction,
      submmitEvent,
      jumpToRecharge,
    }
  },
  components:{
    vnavibar
  },
   
   
}
</script>
<style lang="scss" scoped>
.investPay{
  width: 100%;
  height: 100%;
  position: relative;
  .zhengti-padding{
    padding: 0 15px 15px 15px;
    box-sizing: border-box;
    .wsh-dizhi{
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .wsh-text{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      /* 全局主标题灰色 */

      color: #999999;
      flex: 1;
      .tex1{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        //line-height: 16px;

        /* 333 */

        color: #333333;
      }
      .tex2{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        //line-height: 16px;
        margin-top: 10px;
        /* 全局主标题灰色 */

        color: #999999;
      }
    }
    .xtb{
      width: 18px;
      height: 18px;
    }



    .shangpin-xinxi{
      width: 100%;
      display: flex;
      margin-top: 15px;
      .xinxi{
        flex: 1;
        width: 0;
        margin-left: 14px;
        box-sizing: border-box;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        .te1{
          width: 243px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;

          /* 333 */

          color: #333333;
        }
        .te2{
          margin-top: 7px;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;

          color: #999999;
        }
        .te3{
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
    .fenge{
      margin-top: 15px;
      width: 100%;
      height: 1px;
      background: #F6F6F6;
    }
    .xinxi2{
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
      .chengs{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 14px;
        color: #1552F0;
      }
    }

    .Exchange{
      margin-top: 15px;
      margin-bottom: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */


      color: #333333;
    }



    .xinxi1{
      margin-top: 24px;
      width: 100%;
      display: flex;
      margin-bottom: 24px;
      //justify-content: center;
      //align-items: center;
      .bao1{
        margin-right: 40px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 全局主标题灰色 */

        color: #999999;
      }
      .bao2{
        flex: 1;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #333333;
      }
      .bao3{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 全局主标题灰色 */

        color: #999999;
      }
    }
  }
  .gz{
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: 86px;
    background: #1552F0;
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
      //background: url("../../../assets/image/mall/Rectangle1372.png") no-repeat 100% 100%;
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 26px;
      color: #1552F0;
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
      margin-top: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #FFFFFF;
    }
  }
  .wc-bj{
    position:fixed;
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