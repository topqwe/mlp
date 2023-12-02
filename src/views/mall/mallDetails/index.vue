<template>
  <div class="mallDetails">
    <vnavibar title='详情'/>

    <div style="width: 100%;height: 50px;"></div>

    <div>
      <img class="shangpin-img" :src="''+listDatas.iconImg">
    </div>
    <div class="mallDetails-padding">
      <div class="van-multi-ellipsis--l3 title">
<!--        这是一段最多显示三行的文字，多余的内容会被省略-->
        {{listDatas.name}}
      </div>
      <div class="jg">{{ listDatas.prize }}<span style="margin-left: 5px;">{{ $t('积分') }}</span></div>
      <div class="gui-ge">
        <div class="l1">{{ $t('商品总数') }}</div>
        <div class="r1">{{ listDatas.total }}</div>
      </div>
      <div class="gui-ge">
        <div class="l1">{{ $t('剩余数量') }}</div>
        <div class="r1">{{ listDatas.lastAmount }}</div>
      </div>
      <div class="nr">
        <p v-html="listDatas.des"></p>
      </div>
    </div>

    <div class="" style="width: 100%;height: 70px;"></div>
    <div class="bottomBtnLayout">
      <div class="button" v-if="listDatas.lastAmount<=0" style="background: #FF3E3E;">{{ $t('商品已被全部兑换') }}</div>
      <div class="button" v-else @click="pushDetail(listDatas.id)">{{ $t('立即兑换') }}</div>
    </div>


  </div>
</template>
<script lang="ts">
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast,  } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
import vnavibar from "../../../components/vnavibar.vue"

export default {
  components:{
    vnavibar
  },
  setup() {
    const { t, locale } = useI18n()
    const store = useStore();
    const route = useRoute();
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
      listDatas:{} as any
    })
    
    requestDummy({'id':route.query.id}).then((res: any) => {
          // showToast('dgdgdf'+res.message) 
        //   state.listDatas = res
        //正式html的内容
        // const regex = new RegExp('<img', 'gi')
        // state.listDatas.des = 
        // state.listDatas.des.replace(regex, '<img style="max-width: 100%;height:auto"')
        state.listDatas = customList[0]
    })

    const pushDetail=(e:any)=>{
      router.push('/mallPay?goodsId='+e)
    }
    

    return{
      ...toRefs(state),
      pushDetail,
      
    }
  }
  
   
   
}
</script>


<style lang="scss" scoped>
.mallDetails{
  width: 100%;
  min-height: 100%;
  .shangpin-img{
    width: 100%;
    height: 375px;
  }
  .mallDetails-padding{
    padding: 15px;
    box-sizing: border-box;
    .title{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      /* or 112% */


      color: #000000;

    }
    .jg{
      flex: 1;
      text-align: left;
      margin-top: 15px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;

      /* 主题色 */

      color: #1552F0;
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
    .gui-ge{
      margin-top: 29px;
      display: flex;
      justify-content: center;
      align-items: center;
      .l1{
        flex: 1;
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        /* 999 */

        color: #999999;
      }
      .r1{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #333333;
      }
    }
    .nr{
      font-size: 14px;
      margin-top: 24px;
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
      background: #1552F0;
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
.mallDetails .van-hairline--bottom::after{
  border-bottom-width:0
}
</style>
