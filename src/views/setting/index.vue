<template>
  <div class="setting">
    <vnavibar title="设置"/>
    
    <div style="width: 100%;height: 46px;"></div>
    <div class="caidan">

      <router-link to="/loginPWReset">
        <div class="caidan-list">
          <div class="caidan-neirong">{{ $t('登录密码') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
<!--      <router-link >-->
        <div class="caidan-list" @click="fPWEvent">
          <div class="caidan-neirong">{{ $t('6位密码') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      <router-link to="/authenticate">
        <div class="caidan-list">
          <div class="caidan-neirong">{{ $t('身份验证') }}</div>
          <div style="margin-right: 5px;">{{ listDatas.status==2?$t('已认证'):$t('未设置') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      
<!--      </router-link>-->
      <div style="width: 100%;height: 8px;background: #F3F5F9;"></div>
      <router-link to="/AddressList">
        <div class="caidan-list">
          <div class="caidan-neirong">{{ $t('收货地址') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      <router-link to="/accountList">
        <div class="caidan-list">
          <div class="caidan-neirong">{{ $t('收款账户') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
<!--      <div style="width: 100%;height: 8px;background: #F3F5F9;"></div>-->
<!--      <div class="caidan-list">-->
<!--        <div class="caidan-neirong">检查更新</div>-->
<!--        <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>-->
<!--      </div>-->
<!--      <div style="width: 100%;height: 8px;background: #F3F5F9;"></div>-->
    </div>
    <div class="logoutLayout" @click="logoutEvent">{{ $t('退出') }}</div>
    <div style="width: 100%;height: 120px;"></div>
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
export default defineComponent({
  components:{
    vnavibar
  }, 
  setup(){
    const { t, locale } = useI18n()
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      listDatas:{} as any, 
    })
    const requestList=()=> {
      // gerenxinxi_post({}).then(res => {
      //   this.listDatas = res
      //   console.log(res)
      // })
    }
    requestList()
    
    const fPWEvent=()=> { 
      router.push('/fPWReset')
      // shifoushezhi_zijinmima_post().then(res=>{
      //   if (res.safeword==0){
      //     t.$router.push('/fPWSet')
      //   }else {
      //     t.$router.push('/FundPasswordReset')
      //   }
      // })
    }
    const logoutEvent=()=>{
      // localStorage.clear()
      localStorage.removeItem('token')
      localStorage.removeItem('language')
      localStorage.removeItem('investActiveIndex');
      localStorage.removeItem('taskActiveIndex');
      router.push('/')
    }
    return{
      ...toRefs(state),
      fPWEvent,
      logoutEvent,
    }
  },
  
  
});
</script>

<style lang="scss" scoped>
.setting{
  .caidan {
    width: 100%;
    //padding: 10px 0;
    box-sizing: border-box;

    .caidan-list {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #333333;
      .caidan-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      .caidan-neirong {
        flex: 1;
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #333333;
      }
    }
  }
  .logoutLayout{
    margin: 15px 15px;
    background: #FF4141;
    border-radius: 4px;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px;
    /* identical to box height */

    text-align: center;

    color: #FFFFFF;
  }
}
</style>
<style>

</style>
