<template>
  <div class="succeedlayout"> 
    <vnavibar
        fixed
        :title="$t('提交成功')"
    />
    <div class="nr">
      <div class="icon">
        <img class="icon-img" src="../../assets/image/public/chengong.png" />
      </div>
      <div class="t1">{{$t('提交成功')}}</div>
      <div class="t2">{{ $t('请注意查收信息，如有疑问请联系客服') }}</div>
      <div class="backHomeBtn" @click="backHome">{{ $t('返回首页') }}</div>
      <div class="JumpBtn" @click="jumpTo">{{ $t('查看订单') }}</div>
    </div>
  </div>
</template>
<script lang="ts"> 
import vnavibar from "../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
 
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
      url:route.query.path
    })
    const jumpTo=()=>{
      router.push('/'+state.url)
    }
    const backHome=()=>{
      router.push('/')
    }
    return{
      ...toRefs(state),
      backHome,
      jumpTo
    }
  },
  components:{
    vnavibar
  }, 
   
}
</script>
<style lang="scss" scoped>
.succeedlayout{
  width: 100%;
  min-height: 100%;
  .nr{
    padding: 0 15px;
    box-sizing: border-box;
    .icon{
      //width: 50px;
      //height: 50px;
      width: 100%;
      display: flex;
      margin-top: 74px;
      justify-content: center;
      margin-bottom: 15px;
      .icon-img{
        width: 50px;
        height: 50px;
      }
    }
    .t1{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 14px;
      /* identical to box height, or 88% */

      text-align: center;

      color: #333333;
    }
    .t2{
      margin-top: 15px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */

      text-align: center;

      color: #999999;
    }
    .backHomeBtn{
      margin-top: 30px;
      width: 100%;
      height: 44px;
      background: var(--cp-primary);
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      /* identical to box height, or 100% */
      text-align: center;
      color: #FFFFFF;
    }
    .JumpBtn{
      border: 1px solid var(--cp-primary);
      border-radius: 4px;
      margin-top: 15px;
      width: 100%;
      height: 42px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 42px;
      /* identical to box height, or 100% */
      text-align: center;
      color: var(--cp-primary);
    }
  }
}
</style>
