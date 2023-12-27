<template>
  <div class="taskDetails">
    <vnavibar title='详情'/>
    <div style="width: 100%;height: 46px;"></div>
    
    <div class="zhengti-padding">
      <router-link v-if="Number(listDatas.status) !== 2" :to="'/addressList?orderId='+listDatas.id">
      <div class="addreLayout">
        <div class="wsh-text" v-if="listDatas.address==''">{{ $t('您尚未添加收货地址') }}</div>
        <div class="wsh-text" v-else>
          <div class="tex1">{{listDatas.contacts}}&#32; &#32; {{listDatas.phone}}</div>
          <div class="tex2">{{listDatas.address}}</div>
        </div>
        <img src="../../../assets/image/public/arrow_right.png" class="xtb" />
      </div>
      </router-link>
        <div class="addreLayout" v-if="listDatas.status == 2">
          <div class="wsh-text" v-if="listDatas.address==''">{{ $t('您尚未添加收货地址') }}</div>
          <div class="wsh-text" v-else>
            <div class="tex1">{{listDatas.contacts}}&#32; &#32; {{listDatas.phone}}</div>
            <div class="tex2">{{listDatas.address}}</div>
          </div>
          <img src="../../../assets/image/public/arrow_right.png" class="xtb" />
        </div>
      <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
      <div class="shangpin-xinxi">
        <img class="" :src="''+listDatas.iconImg" style="width: 80px;height: 80px;" />
        <div class="xinxi">
          <div class="van-multi-ellipsis--l2 te1" style=" ">
            {{ listDatas.name }}
          </div>
          <div class="te2">{{ $t('奖励') }}：${{listDatas.rebate}}({{ $t('比例') }}{{(listDatas.rebateOdd*100).toFixed(1)}}%)</div>
          <div class="te3">
            <div>{{ listDatas.prize }}</div>
            <div>x{{ listDatas.name }}</div>
          </div>
        </div>
      </div>
      <div class="xinxi2">
        <div>{{ $t('本产品来自') }}：{{ listDatas.platName }}</div>
        <div>{{ $t('需支付') }}：<span class="chengs">{{ listDatas.prize }}</span></div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('任务编号') }}</div>
        <div class="bao2">{{ listDatas.id }}</div>
        <img src="../../../assets/image/public/copy.png" @click="copyData(listDatas.id.toString())" style="margin-left: 4px;width: 18px;height: 18px;" />
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('比例') }}</div>
        <div class="bao2">{{(listDatas.rebateOdd*100).toFixed(1)}}%</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('总额') }}</div>
        <div class="bao2">{{ listDatas.rebate }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('下单时间') }}</div>
        <div class="bao2">{{ listDatas.createTime }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1" v-if="listDatas.status == 0">{{ $t('剩余时间') }}</div>
        <div class="bao1" v-if="listDatas.status == 1">{{ $t('返佣时间') }}</div>
        <div class="bao1" v-if="listDatas.status == 2">{{ $t('解冻时间') }}</div>
        <div class="bao1" v-if="listDatas.status == 3">{{ $t('剩余时间') }}</div>
        <div class="bao2">
          <van-count-down  
          ref="countDown" :time="cutDown" 
          @finish="onFinish"
          />
        </div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('比例') }}</div>
        <div class="bao2" style="color: #2DBD85;">${{ listDatas.progress }}</div>
      </div>
      <div class="xinxi1">
        <div class="bao1">{{ $t('任务状态') }}</div>
        <div class="bao2" v-if="listDatas.status == 0" style="color: #4AA8FF;">{{ $t('进行中') }}</div>
        <div class="bao2" v-if="listDatas.status == 1" style="color: #2DBD85;">{{ $t('已支付') }}</div>
        <div class="bao2" v-if="listDatas.status == 2" style="color: #FF4141;">{{ $t('处理中') }}</div>
        <div class="bao2" v-if="listDatas.status == 3" style="color: #999999;">{{ $t('已完成') }}</div>
      </div>
      <!-- <div style="width: 100%;height: 44px;"></div> -->
    </div>

    <div class="" style="width: 100%;height: 70px;"></div>
    <div class="bottomBtnLayout">
      <div class="button" v-if="Number(route.query.orderId) == 0"  @click="submmitEvent">
      {{ $t('立即') }}
    </div>
      <div class="button" v-else @click="unclockEvent(listDatas.id)">
      {{ $t('解锁') }}
      <!-- v-if="listDatas.status == 2" -->
    </div>
    </div>


    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click="show = false">
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
import clipboard3 from 'vue-clipboard3' 
import vnavibar from "../../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted,watchEffect} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
 
export default {
  components: {
    vnavibar,
  },   
  setup(){
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
          'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
      }
      customList.push(vv)
    }

    const router = useRouter();
    const route = useRoute();
    const {toClipboard} = clipboard3()
    const { t, locale } = useI18n()

    const countDown = ref(null) as any;

    const state = reactive({
      listDatas:{} as any,

      cutDown:0 as any, 
      value:'',
      showKeyboard: true,
      show:false
    })

    const onFinish = () => showToast('倒计时结束');

    const requestList=()=>{
      state.listDatas = customList[0]
      state.cutDown = 3000
      // countDown.value = ''
      // this.cutDown = res.cutDown*1000 
      countDown.value?.reset();

      // requestList_post({orderId:this.$route.query.orderId}).then(res=>{
      //   console.log(res)
      //   this.listDatas = res
      //   // if (res.status==0){
      //     this.cutDown = res.cutDown*1000
      //   // }
      //   // console.log(res.cutDown*1000)
      //   // this.cutDown = 123000
      //   this.$refs.countDown.reset();
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

    const unclockEvent=(e:any)=> {
      router.push('/task')
      showToast(t('已解锁'));
      // jiesuornwu_post({'orderId': e}).then(res => {
      //   console.log(res)
      //   Toast(this.$t('已解锁'));
      //   // this.qiehuan()
      // })
    }


    const submmitEvent=()=>{
      // checkFPWPost({}).then(res=>{
      //   if (res.safeword==1){
      //     console.log(444)
          state.show = true
        // }else {
        //   this.$router.push('/fPWSet')
        // }
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
    const submmitPost=()=>{
      var data = {
        orderId:state.listDatas.id,
        safeword:state.value
      }
      
      state.show = false
      state.value = ''
      router.push('/task')
      // renwuzhifu_post(data).then(res=>{
      //   Toast(this.$t('成功')); 
      // })
    }
    requestList()

    return{
      ...toRefs(state),

      route,

      submmitEvent,

      countDown,
      onFinish,

      unclockEvent,
      copyData
    }
  }, 
  
    
}
</script>
<style lang="scss" scoped>
.taskDetails{
  width: 100%;
  height: 100%;
  position: relative;
  .zhengti-padding{
    padding: 0 15px 15px 15px;
    box-sizing: border-box;
    .addreLayout{
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
        text-align: left;
        width: 0;
        margin-left: 14px;
        box-sizing: border-box;
        display: flex;
        flex-direction:column;
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

          color: var(--cp-primary);

        }
      }
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
        color: var(--cp-primary);
      }
    }


    .xinxi1{
      width: 100%;
      display: flex;
      margin-bottom: 30px;
      justify-content: center;
      align-items: center;
      .bao1{
        flex: 1;
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 全局主标题灰色 */

        color: #999999;
      }
      .bao2{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #333333;
      }
    }
  }
  
  .bottomBtnLayout{
    position: fixed;
    width: 375px;
    height: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #FFFFFF;
    padding: 15px;
    box-sizing: border-box;
    .button{
      width: 100%;
      height: 100%;
      background: var(--cp-primary);
      border-radius: 4px;
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      /* identical to box height, or 100% */

      text-align: center;

      color: #FFFFFF
    }
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