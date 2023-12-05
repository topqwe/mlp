<template>
  <div class="investDetails">
    <vnavibar title= '详情'/>
    <div style="width: 100%;height: 46px;"></div>
    <div class="investDetails-padding"> 

      <div class="shangpin-img">
        <img class="" :src="''+listDatas.iconImg" style="vertical-align: top;width: 100%;height: 100%; border-radius: 4px;">
        <div class="shangpin-status" :class="'status1'" v-if="listDatas.isSellOut==0">{{ $t('进行中') }}</div>
        <div class="shangpin-status" :class="'status2'" v-else>{{ $t('已售完') }}</div>
      </div>
<!--      </div>-->
      <div class="van-multi-ellipsis--l3 title">
        <!--        这是一段最多显示三行的文字，多余的内容会被省略-->
        {{listDatas.name}}
      </div>
      <div class="jindu">
        <div class="xn">
          <div class="t1">{{listDatas.investSize}}</div>
          <div class="t2">{{ $t('规模') }}</div>
        </div>
        <div class="xn">
          <div class="t1">{{(listDatas.progress*100).toFixed(2)}}%</div>
          <div class="t2">{{ $t('比率') }}</div>
        </div>
        <div class="xn">
          <div class="t1" v-if="listDatas.type<3">{{listDatas.bonus}}{{ $t('小时') }}</div>
          <div class="t1" v-else>{{listDatas.bonus}}{{ $t('天') }}</div>
          <div class="t2">{{ $t('期限') }}</div>
        </div>
      </div>
<!--      <div class="jg">8456<span>Points</span></div>-->
      <div class="gui-ge">
        <div class="l1">
          {{ $t('方式') }}: </div>
        <div class="r1" v-if="listDatas.type==1">{{ $t('AA') }}</div>
        <div class="r1" v-if="listDatas.type==2">{{ $t('BB') }}</div>
        <div class="r1" v-if="listDatas.type==3">{{ $t('CC') }}</div>
        <div class="r1" v-if="listDatas.type!==1&&listDatas.type!==2&&listDatas.type!==3">
          {{ $t('DD') }}</div>
      </div>
      <div class="gui-ge">
        <div class="l1">{{ $t('机构') }}:</div>
        <div class="r1">{{listDatas.guarantyAgency}}</div>
      </div>
      <div class="gui-ge">
        <div class="l1">{{ $t('重复') }}:</div>
        <div class="r1" v-if="listDatas.repeating">{{ $t('可') }}</div>
        <div class="r1" v-if="!listDatas.repeating">{{ $t('不可') }}</div>
      </div>
      <div class="jin-s"><div class="jin-z" :style="'width:'+(listDatas.progress*100).toFixed(2)+'%;'"></div></div>
      <div class="n1">
        <div class="n12">{{ $t('进度') }}</div>
        <div class="n13">{{ (listDatas.progress*100).toFixed(2) }}%</div>
      </div>
      <div class="nr">
        <div class="n-t" style="margin-top: 1px;">
          {{ $t('时间') }}：</div>
        <div class="n-n">{{listDatas.name}}</div>
         
      </div>
    </div>
    <div class="" style="width: 100%;height: 70px;"></div>
    <div class="bottomBtnLayout">
      <div class="button" :class="'status1'" style="background: var(--cp-primary);" @click="pushDetail(listDatas.id)" v-if="listDatas.isSellOut==0">
        {{ $t('马上') }}</div>
      <div class="button" :class="'status2'"  v-else>{{ $t('已售完') }}</div>
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
  setup(){
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
      'id':i,
      'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
      'iconImg':
      'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
  }
  customList.push(vv)
}
      
    const router = useRouter() 
    const route  = useRoute() 
    const state = reactive({
      listDatas:{} as any
    })
    const requestDatas=()=>{ 
      requestDummy().then((res: any) => { 
        state.listDatas = customList[0]
    })
    }
    const pushDetail=(e:any)=>{ 
      router.push('/investPay?projectId='+e)
    }
    requestDatas()
    return{
      ...toRefs(state),
      pushDetail
    }
  },
  components:{ 
    vnavibar
  },
   
}
</script>
<style lang="scss" scoped>
.investDetails{
  .status1{
    background: #0ECB81;
  }
  .status2{
    background: #FF3E3E;
  }
  width: 100%;
  min-height: 100%;
  .shangpin-img{
    width: 100%;
    height: 180px;
    position: relative;
    .shangpin-status{
      width: 57px;
      height: 22px;
      border-radius: 2px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 22px;
      /* identical to box height */
      text-align: center;
      color: #FFFFFF;
    }
  }
  .investDetails-padding{
    padding: 15px;
    box-sizing: border-box;
    .title{
      margin-top: 12px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      /* or 112% */


      color: #000000;

    }
    .jg{
      margin-top: 15px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;

      /* 主题色 */

      color: var(--cp-primary);
      span{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        /* identical to box height */

        text-align: center;

        color: #000000;
      }
    }
    .jindu{
      margin-top: 15px;
      width: 100%;
      padding: 17px 15px;
      box-sizing: border-box;
      background: #F6F6F6;
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
    .gui-ge{
      margin-top: 29px;
      display: flex;
      justify-content: center;
      //align-items: center;
      .l1{
        margin-right: 50px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 999 */

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
    }
    .jin-s{
      margin-top: 26px;
      width: 100%;
      height: 8px;
      background: #EEEEEE;
      border-radius: 27px;
      .jin-z{
        height: 8px;
        background: var(--cp-primary);
        border-radius: 27px;
      }
    }
    .n1{
      margin-top: 10px;
      display: flex;
      .n12{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
      .n13{
        flex: 1;
        text-align: right;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
    }
    .nr{
      flex: 1;
      text-align: left;
      font-size: 14px;
      margin-top: 23px;
      .n-t{
      //   flex: 1;
      // text-align: left;
        margin-top: 15px;
        margin-bottom: 12px;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        /* #333333 */

        color: #333333;

      }
      .n-n{
      //   flex: 1;
      // text-align: right;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        /* or 129% */


        color: #000000;

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
      //background: var(--cp-primary);
      border-radius: 4px;
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      /* identical to box height, or 100% */

      text-align: center;

      color: #FFFFFF
    }
  }
}
</style>
<style>
.investDetails .van-hairline--bottom::after{
  border-bottom-width:0
}
</style>
