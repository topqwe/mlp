<template>
  <div class="rechargeList">
    <!-- <van-nav-bar
        fixed
        :title="$t('')"
        :right-text="$t('记录')"
        @click-right="onClickRight"
        left-arrow
        @click-left="onClickLeft"
    /> -->
    <vnavibar
      title=''
      right-text='记录'
      @click-right="$router.push('/rechRecord')"
    ></vnavibar>

    <div style="width: 100%;height: 46px;"></div>

    <img style="width: 100%;" v-if="$i18n.locale==='en_US'" src="../../../assets/image/me/Invite_banner_eng.png">
      <img style="width: 100%;" v-else src="../../../assets/image/me/Invite_banner_ch.png">
    
      <div class="tishi">
      {{ $t('introduce') }}
    </div>
    <router-link to="/recharge?type=AA">
    <div class="rrr-fs">
      <img class="rrr-logo" src="../../../assets/image/me/aboutus.png" />
      <div class="rrr-title">AA</div>
      <img class="rrr-right" src="../../../assets/image/public/arrow_right.png" />
    </div>
    </router-link>
    <router-link to="/recharge?type=BB">
      <div class="rrr-fs">
        <img class="rrr-logo" src="../../../assets/image/me/aboutus.png" />
        <div class="rrr-title">BB</div>
        <img class="rrr-right" src="../../../assets/image/public/arrow_right.png" />
      </div>
    </router-link>
    <router-link to="/recharge?type=CC">
      <div class="rrr-fs">
        <img class="rrr-logo" src="../../../assets/image/me/aboutus.png" />
        <div class="rrr-title">CC</div>
        <img class="rrr-right" src="../../../assets/image/public/arrow_right.png" />
      </div>
    </router-link>
  </div>

  
</template>

<script lang="ts">
import { useRoute,useRouter } from "vue-router"; 
// import Vnavibar from "../../../components/vnavibar.vue";
export default {
    setup() {
        const router = useRouter();
        const onClickLeft = () => {
            history.go(-1);
        };
        const onClickRight = () => {
            router.push('/rechRecord');
        };
        return {
            onClickLeft,
            onClickRight
        };
    }, 
}
</script>
<style lang="scss" scoped>
.rechargeList{
  width: 100%;
  height: 100%;
  
  .tishi{
    flex: 1;
    text-align: left;
    margin-top: 13px;
    margin-left: 15px;
    margin-right: 15px;
    padding: 13px 11px;
    box-sizing: border-box;
    background: #F6F6F6;
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
  }
  .rrr-fs{
    margin-top: 15px;
    width: 100%;
    padding: 11px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .rrr-logo{
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
    .rrr-title{
      flex: 1;
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
    }
    .rrr-right{
      width: 18px;
      height: 18px;
    }
  }
}
</style> 