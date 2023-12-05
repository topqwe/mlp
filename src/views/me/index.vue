<template>
  <div class="me"> 
    <!-- <van-nav-bar v-show="false"
        fixed
        :title="$t('语言设置')"
        left-arrow
        @click-left="onClickLeft"
    /> -->
    <div class="me-top">
      <div class="xinxi">
        <div style="width: 68px;height: 68px;border-radius: 50%;background: white;text-align: center">
          
          <!-- :src="require('../../assets/image/avatar/ava.png')" -->
          <!-- :src="Utils.getImagePath(`head_${info_data.avatar}`)" -->
          
          <van-image v-if="info_data.avatar" style="width: 64px;height: 64px;border-radius: 50%;margin: 2px auto 0;"
          
          :src= 'getImagePath(`head_${info_data.avatar}`)'
          round
          
          />  

        </div>

        <div class="xinxi-flex">
          <div class="name-eyt">
            <div>{{ info_data.username }}</div>
            <!-- :src="require('../../assets/image/avatar/vip'+info_data.vip_level+'.png')"   -->
            <!-- :src="Utils.getImagePath(`vip${info_data.vip_level}`)" -->
            
            <img v-if="info_data.vip_level" class="name-eyt-vip"
             
            :src="getImagePath(`vip${info_data.vip_level}`)"
                 
            />

          </div>
          <div class="name-id">ID：{{ info_data.usercode }}vuex:{{ store.state.num }}</div>
          
        </div>
      </div>
      <div class="jine-xinxi">
        <div class="yue-buju">
          <div class="yue-flex">
            <div class="yue-biaoti">{{ $t('余额') }}($)</div>
            <div class="yue-neirong">{{ yue.money }}</div>
          </div>
          <router-link to="/withdraw" >
            <div class="withdraw">{{ $t('WW') }}</div>
          </router-link>
          <router-link to="/rechargeList">
            <div class="topup">{{ $t('RR') }}</div>
          </router-link>
        </div>
        <div
            style="width: 100%;margin-top: 15px;padding: 0 15px;box-sizing: border-box;height: 1px;background: #F6F6F6;"></div>
        <router-link to="/CommissionRecord">
          <div class="yongjin-buju">
            <div class="yongjine">{{ $t('总的') }}：<span class="yonge-t">{{ yue.rebate }}</span></div>
            <img src="../../assets/image/public/arrow_right.png" style="width: 18px;height: 18px;"/>
          </div>
        </router-link>
      </div>
    </div>
   <div style="display: flex;padding: 5px 15px 15px;">

   </div>

    <router-link to="/inviteFriends">
      <div class="banner">
        <!-- <van-image v-if="$i18n.locale==='en_US'" src="require('../../assets/image/me/Invite_banner_eng.png')" />
        <van-image v-else src="require('../../assets/image/me/Invite_banner_ch.png')" /> -->
        <img v-if="$i18n.locale==='en_US'" src="../../assets/image/me/Invite_banner_eng.png" >
        <img v-else src="../../assets/image/me/Invite_banner_ch.png" >
      </div>
    </router-link>
    <div class="caidan">
      <router-link to="/investResult">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/invest.png"/>
          <div class="caidan-neirong">{{ $t('投资记录') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      
      <router-link to="/mallResult">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/Exchange.png"/>
          <div class="caidan-neirong">{{ $t('商品记录') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>

      <router-link to="/transRecord">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/record.png"/>
          <div class="caidan-neirong">{{ $t('筛选记录') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>

       
      
     
      <!--      //language-->
      <router-link to="/language">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/feedback.png"/>
          <div class="caidan-neirong">{{ $t('语言') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      <router-link to="/setting">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/set.png"/>
          <div class="caidan-neirong">{{ $t('设置') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      <router-link to="/stateExp">
       <div class="caidan-list">
         <img class="caidan-icon" src="../../assets/image/me/team.png"/>
         <div class="caidan-neirong">{{ $t('计数') }}</div>
         <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
       </div>
     </router-link>
      <router-link to="/howTo">
       <div class="caidan-list">
         <img class="caidan-icon" src="../../assets/image/me/aboutus.png"/>
         <div class="caidan-neirong">{{ $t('如何玩') }}</div>
         <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
       </div>
     </router-link>
      <router-link to="/aboutUs">
       <div class="caidan-list">
         <img class="caidan-icon" src="../../assets/image/me/aboutus.png"/>
         <div class="caidan-neirong">{{ $t('关于我们') }}</div>
         <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
       </div>
     </router-link>
      <router-link to="/appDownload">
        <div class="caidan-list">
          <img class="caidan-icon" src="../../assets/image/me/download.png"/>
          <div class="caidan-neirong">{{ $t('下载客户端') }}</div>
          <img src="../../assets/image/public/arrow_right.png" style="width: 20px;height: 20px;"/>
        </div>
      </router-link>
      
    </div>
    <div style="width: 100%;height: 100px;"></div>

  </div>
</template>



<script lang="ts">
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import vnavibar from "../../../components/vnavibar.vue"
import {  requestDummy } from "../../api";
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import { showToast,  } from 'vant'
// import * as useAssets from "../../utils/useAssets";  
// import * as Utils from "../../utils/utis";  
// import { getImagePath } from "../../utils/utis"; 

export default { 
  setup() {  
    const store = useStore();
    const state = reactive({
      info_data: {
        avatar:11,
        username:'babd',
        vip_level:9,
        usercode:'123'
      },
      yue: {
        money:88888,
        rebate:88889,
      }
    })

    // getImagePath(name:string){
    //   return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
    // },

    const getImagePath =(name:string)=>{
      return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
    }

    requestDummy().then((res: any) => {
      state.yue.money = res.status
    })

    requestDummy()

    onMounted(() => {
      
    })

    return {
      store,
      ...toRefs(state),
      getImagePath,
    }

  },
   
}
</script>
<style lang="scss" scoped>
 /* lang="scss" 不写的话，页面会很大*/
.me { 
   width: 100%;
   height: 100%;
  .me-top {
    
    width: 100%;
    // height: 100;
    background-color: var(--cp-primary);
  //  background: url("../../assets/image/me/bg2.png" ) no-repeat;
    background-size: 100%;

    .xinxi {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 40px;
      box-sizing: border-box;

      .xinxi-flex {
        margin-left: 12px;
        flex: 1;

        .name-eyt {
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          /* identical to box height */
          color: #FFFFFF;
          display: flex;
          justify-content: stretch;
          align-items: center;

          .name-eyt-vip {
            width: 45px;
            height: 18px;
            margin-left: 5px;
          }
        }

        .name-id {
          flex: 1;
        text-align: left;
          margin-top: 10px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #FFFFFF;
        }
      }
    }

    .jine-xinxi {
      margin: 20px 15px 15px 15px;
      padding: 15px 15px;
      box-sizing: border-box;
      background: white;
      box-shadow: 0px 5px 8px #EAEDF3;
      border-radius: 6px;

      .yue-buju {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .yue-flex {
          flex: 1;
          .yue-biaoti {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            /* identical to box height */
            color: #000000;
          }

          .yue-neirong {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 23px;

            color: #000000;
            margin-top: 8px;
          }
        }

      }

      .yongjin-buju {
        margin-top: 15px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .yongjine {
          flex: 1;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          /* identical to box height */


          /* 999 */

          color: #999999;

          .yonge-t {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;

            color: #000000;
          }
        }
      }
    }

  }

  .withdraw {
    /* flex: 1; */
    width: 80px;
    height: 33px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 33px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid var(--cp-primary);
    /* 审核中 */

    color: var(--cp-primary);
    margin-right: 10px;
  }

  .topup {
    /* flex: 1; */
    width: 80px;
    height: 34px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 34px;
    text-align: center;

    /* 白色 */
    background: var(--cp-primary);
    border-radius: 4px;
    color: #FFFFFF;

  }

  .banner {
    padding: 0 15px;
    box-sizing: border-box;

    img {
      width: 100%;
    }
  }

  .caidan {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;

    .caidan-list {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .caidan-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      .caidan-neirong {
        flex: 1;
        text-align: left;
        width: 100;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #333333;
      }
    }
  }
}
</style>
