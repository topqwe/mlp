<template>
  <div class="login">
    <div class="lang-right">
      <router-link to="/language">
      <img class="lang-icon" src="../../assets/image/public/feedback.png"/>
      </router-link>
    </div>
    <div class="login-title">{{ $t('注册') }}</div>
    <div class="login-tab">
      <div class="tab-button" :class="TabShow===1?'tab-button-show2':'tab-button-show1'" @click="changeTab(1)">{{ $t('账号') }}</div>
      <div class="tab-button" :class="TabShow===2?'tab-button-show2':'tab-button-show1'" @click="changeTab(2)">{{ $t('手机号') }}</div>
    </div>
    <div v-if="TabShow===1" class="account_form">
      <div class="title-input m-t20 m-b10">{{ $t('账号') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入账号')"
            maxlength="20"
            v-model="textField.input1"
            clearable>
        </el-input>
      </div>
      <div class="title-input m-t20 m-b10">{{ $t('密码') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入 6-12 位由数字或字母组成的密码')"
            maxlength="20"
            v-model="textField.input2"
            show-password
            clearable>
        </el-input>
      </div>
      <div class="title-input m-t20 m-b10">{{ $t('邀请码') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入邀请码')"
            maxlength="20"
            v-model="textField.input3"
            clearable>
        </el-input>
      </div>
    </div>
    <div v-if="TabShow===2" class="phone_form">
      <div class="title-input m-t20 m-b10">{{ $t('手机号') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入手机号')"
            maxlength="20"
            v-model="textField.input1"
            clearable>
        </el-input>
      </div>
      <div class="title-input m-t20 m-b10">{{ $t('密码') }}</div>
      <div class="login-input">
        <el-input

            :placeholder="$t('请输入 6-12 位由数字或字母组成的密码')"
            maxlength="20"
            v-model="textField.input2"
            show-password
            clearable>
        </el-input>
      </div>
      <div class="title-input m-t20 m-b10">{{ $t('邀请码') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入邀请码')"
            maxlength="20"
            v-model="textField.input3"
            clearable>
        </el-input>
      </div>
    </div>
 
    <div class="login-btn" @click="submmitEvent">{{ $t('注册') }}</div>
    <div class="register-btn">
      <div class="register-btn-flex"></div>
      <div class="register-btn-text1">{{ $t('已有账号？') }}  </div>
      <router-link to="/login"><div class="register-btn-text2">{{ $t('去登录') }}</div></router-link>
      <div class="register-btn-flex"></div>
    </div>

    <van-overlay :show="show" @click="show = false">
      <!-- @click="show = false" -->
      <div class="wrapper" @click.stop>
        <!-- @click.stop -->
        <!--        <div class="block" />-->
        <div class=''>
          <div>
            <!--            <button @click="demo=true">打开</button>-->
            <!-- 弹窗不要设置宽，因为页面是自适应的，如果设置了宽，而组件不能同步，可能会出现大片的空白或者图片溢出弹窗，所以弹窗的宽高要靠组件中图片撑开 -->
            <div class="line-two" style="font-size: 12px;">

              <!-- :imgs="state.imgs" -->
              <slide-verify
      ref="block"
      :slider-text=$t(text)
      :imgs="imgs"
      :accuracy="accuracy"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>

    <!-- <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button> -->
    <div style="color: black;font-size: medium;">{{ msg }}</div>
              
    <div style="width: 100%;display: flex;justify-content: center;">
                <img class="guanbi-img" src="../../assets/image/public/x-circle.png"
                     style="width: 30px;height: 30px;margin: 20px auto;" @click="show = false"/>
              </div>
               
            </div>
          </div>
        </div>
      </div>
    </van-overlay>

    <img @click="pushService" src="../../assets/image/AppDownload/homeTool1.png" class="kefu-icon" />
  </div>
</template>

<script lang="ts" >// setup="props"
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
// import {Overlay, Toast} from 'vant';
import { defineComponent,reactive, ref,toRefs} from 'vue';
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import { i18nt } from '../../utils';
import * as Utils from "../../utils/utis"; 
//utis = index "../../utils"; 
 
import { useI18n } from 'vue-i18n'

export default { 
  components: { 
    SlideVerify,
  },
  setup() {
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();
     // getImagePath(name:string){
    //   return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
    // }, 
    const getImagePath = (name:string)=>{
      return new URL(`/src/assets/image/public/${name}.png`, import.meta.url).href
    };

    const state = reactive({ 
        TabShow: 1,
        textField: {
              input1: '',
              input2: '',
              input3: '',
            },


      show: false,
      
      imgs: [
        getImagePath(`Rectangle3333`),
      // '../../assets/image/public/Rectangle874.png'
      // require('../../assets/image/public/Rectangle874.png')
      ], //可以将所需的图片放在一个数组中，刷新后组件会自动随机抽取图片

    });
    const textt = '安全检测，向右滑动'
    
    const changeTab=(e:any)=> {
       state.textField = {
        input1: '',
        input2: '',
        input3: '',
      };
      state.TabShow = e; 
    }
    const submmitEvent=()=>{ 
      if (state.TabShow === 1) {
        if (state.textField.input1 === '') {
          showToast(t('请输入账号'));
          return
        }
        if (state.textField.input2 === '') {
          showToast(t('请输入密码'));
          return;
        }
        // if (this.textField.input3 === '') {
        //   Toast(t.$t('请输入邀请码'));
        //   return;
        // }
      }
      if (state.TabShow === 2) {
        if (state.textField.input1 === '') {
          showToast(t('请输入手机号'));
          return
        }
        if (state.textField.input2 === '') {
          showToast(t('请输入密码'));
          return;
        }
        // if (this.textField.input3 === '') {
        //   Toast(t.$t('请输入邀请码'));
        //   return;
        // }
      }
      const reg = /^[a-zA-Z0-9]{6,11}$/;
      if (!reg.test(state.textField.input2)){
        showFailToast(t('请输入 6-12 位由数字或字母组成的密码'));
        return;
      }
      state.show=true
    }

    const msg = ref("");
    const block = ref<SlideVerifyInstance>();

    const onAgain = () => {
      msg.value = "检测到非人为操作的哦！ try again";
      block.value?.refresh();
    };

    const onSuccess = (times: number) => {
      state.show = false;
      block.value?.refresh();
      msg.value = '';
      // `login success, 耗时${(times / 1000).toFixed(1)}s`;
      
      // router.push("/home");

  localStorage.setItem('token', '1110')
  router.push("/");

  if (state.TabShow === 1) {
        var data = {
        'username': state.textField.input1,
        'password': state.textField.input2,
        'usercode': state.textField.input3
      }
      // loginAxios.registerA(data).then(res => {
      //       localStorage.setItem('token', res.token)
      //       this.$router.push({path: '/?bonus='+res.bonus})
      //     }
      // ).catch(function (err) {
      //   console.log(err)
      // })

      }

      if (state.TabShow === 2) {
        var data2 = {
        'phone': state.textField.input1,
        'password': state.textField.input2,
        'usercode': state.textField.input3
      }
      // loginAxios.registerP(data).then((res) => {
      //   localStorage.setItem('token', res.token)
      //   this.$router.push({path: '/?bonus='+res.bonus})
      // })

      }

    };

    const onFail = () => {
      msg.value = "验证不通过";
    };

    const onRefresh = () => {
      msg.value = "";//点击了刷新小图标
    };

    const handleClick = () => {
      block.value?.refresh();
      msg.value = "";
    };


    const pushService=()=>{
      // var url = 'https://ld.ebvsjbv.site/chat/#/customerServiceH5?lang='+this.$i18n.locale
      // if (localStorage.getItem('token')){
      //   url+='&token='+localStorage.getItem('token')
      // }
      // window.location.href=url
      router.push({path:'customerServiceIndex'})
    }

    return {
      ...toRefs(state),

      changeTab,
      submmitEvent,
      pushService,

      block,
      msg,
      text:textt,
      accuracy: 3,
      onAgain,
      onSuccess,
      onFail,
      onRefresh,
      handleClick,

    }
  },
  
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .lang-right{
    width: 100%;
    display: flex;
    justify-content: end;
    .lang-icon{
      padding: 12px 0 12px 10px;
      width: 20px;
      height: 20px;
    }
  }
  .login-title{
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;

    color: #333333;
    margin-top: 10px;
  }
  .login-tab{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: left;
    .tab-button{
      border-radius: 4px;
      //padding: 8px 10px;
      width: 64px;
      height: 34px;
      text-align: center;
      margin-right:20px;  
      line-height: 34px;
    }
    .tab-button-show1{
      background: #EEEEEE;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 34px;
      //line-height: 14px;
      /* identical to box height, or 117% */
      color: #333333;
    }
    .tab-button-show2{
      background: var(--cp-primary);
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 34px;
      //line-height: 12px;
      /* identical to box height, or 100% */
      color: #FFFFFF;
    }
  }
  .title-input{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    /* margin-right: 80%; */
      text-align: center;
      // margin-left:20px; 
      display: flex;
    justify-content: left;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #333333;
  }
  .wangjimima{
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */
    color: var(--cp-primary);
    margin-top: 10px;
  }
  .login-btn{
    margin-top: 20px;
    // width: 345px;
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
  .register-btn{
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .register-btn-flex{
    flex: 1;
  }
  .register-btn-text1{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #333333;

  }
  .register-btn-text2{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4AA8FF;
  }
  .login-input{
    //height: 44px;
  }
  .kefu-icon{
    position: fixed;
    width: 50px;
    height: 50px;
    right: 28px;
    bottom: 32px;
  }
}
</style>
