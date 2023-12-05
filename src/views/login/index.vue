<template>
  <!-- <router-view></router-view> -->
  <div class="login">
  <div class="lang-right" >
      <router-link to="/language">
      <img class="lang-icon" src="../../assets/image/public/feedback.png"/>
      </router-link>
    </div>
  <div class="login-title">{{ $t('登录') }}</div>
  
  <div class="login-tab">
      <div class="tab-button" :class="TabShow===1?'tab-button-show2':'tab-button-show1'" @click="changeTab(1)">{{ $t('账号') }}</div>
      <div class="tab-button" :class="TabShow===2?'tab-button-show2':'tab-button-show1'" @click="changeTab(2)">{{ $t('手机号') }}</div>
    </div>
    <div v-if="TabShow ===1" class="account_form">
      <div class="title-lab">{{ $t('账号') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入账号')"
            maxlength="20"
            v-model="textField.input1"
            clearable
            >
        </el-input>
      </div>
      <div class="title-lab">{{ $t('密码') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入密码')"
            maxlength="20"
            v-model="textField.input2" 
            type="password" 
            show-password
          >
        </el-input>
      </div>
    </div>
    <div v-if="TabShow===2" class="phone_form">
      <div class="title-lab">{{ $t('手机号') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入手机号')"
            type="text"
            value=""
            maxlength="20" 
            v-model="textField.input1"
            >
        </el-input>
      </div>
      <div class="title-lab">{{ $t('密码') }}</div>
      <div class="login-input">
        <el-input
            :placeholder="$t('请输入密码')"
            maxlength="20"
            v-model="textField.input2" 
            type="password" 
            >
        </el-input>
      </div>
    </div>
 

    


    <div class="forgetpw-btn" @click="pushService">{{ $t('忘记密码？') }}</div>
    
    <div class="login-btn" @click="submmitEvent">{{ $t('登录') }}</div>
    <div class="register-btn">
      <div class="register-btn-flex"></div>
      <div class="register-btn-text1">{{ $t('还没有账号？') }}</div>
      <router-link to="/register"><div class="register-btn-text2">{{ $t('去注册') }}</div></router-link>
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
    
    <img @click="pushService" 
    src="../../assets/image/AppDownload/homeTool1.png" class="kefu-icon" />
  
  
  <div>
    <van-button type="primary" @click="goLogin">跳转到首页</van-button>
  </div>
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
// import store from '../../store';
// const { t, locale } = useI18n()

// import {i18n } from '../../i18n'
// const { t } = i18n.global
// const sayHello = t('say', { name: 'Lisa'})

// 语言包方法
// function t(key: string): string {
//   return Utils.i18nt("usefffr", key);
// }
 
// const router = useRouter();
// const goLogin = () => {
//   router.push("/home");
// };
   
export default defineComponent({
  components: { 
    SlideVerify,
    
  },

  setup () {
 
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();

    const goLogin = () => {
      router.push("/");//index Home
    }

    const changeTab=(e:any)=> {
       state.textField = {
        input1: '',
        input2: '',
      };
      state.TabShow = e; 
    }


function submmitEvent() {
  // state.show = true
  
  localStorage.removeItem('token')
  //         router.back()
  //         router.replace('/login')
  // Toast('请输入账号');
  //         return;
      if (state.TabShow === 1) {
        if (state.textField.input1 === '') {
          showToast('请输入账号');
          return
        }
        if (state.textField.input2 === '') {
          showToast('请输入密码');
          return;
        }
      }
      if (state.TabShow === 2) {
        if (state.textField.input1 === '') {
          showToast('请输入手机号');
          return
        }
        if (state.textField.input2 === '') {
          showToast('请输入密码');
          return;
        }
      }
      state.show = true
    };

    function  pushService(){
      // var url = 'https://ld.ebvsjbv.site/chat/#/customerServiceH5?lang='+this.$i18n.locale
      // if (localStorage.getItem('token')){
      //   url+='&token='+localStorage.getItem('token')
      // }
      // window.location.href=url
      router.push('customerServiceIndex')
    };
    
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

    // getImagePath(name:string){
    //   return new URL(`/src/assets/image/avatar/${name}.png`, import.meta.url).href
    // }, 
    const getImagePath = (name:string)=>{
      return new URL(`/src/assets/image/public/${name}.png`, import.meta.url).href
    };
    
    /* 
    定义响应式数据对象
    */
    const state = reactive({
        num: 10,
        color: "#ccc",
        TabShow: 1,
        textField: {
              input1: '',
              input2: '',
            },


      show: false,
      
      imgs: [
        getImagePath(`Rectangle3333`),
      // '../../assets/image/public/Rectangle874.png'
      // require('../../assets/image/public/Rectangle874.png')
      ], //可以将所需的图片放在一个数组中，刷新后组件会自动随机抽取图片

    });

    
    const textt = '安全检测，向右滑动'

    return {
      ...toRefs(state),
      
      goLogin,
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
  mounted() {
  },
  methods: {
  }
});
 
</script>
 
<!-- <script lang="ts" setup="props">// 
 
// import index from "../Home";
import {Overlay, Toast} from 'vant';
import { reactive } from 'vue';
import { useRouter } from "vue-router";
// import { i18nt } from '../../utils';
import * as Utils from "../../utils/utis"; 
//utis = index "../../utils"; 
 
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

// import {i18n } from '../../i18n'
// const { t } = i18n.global
// const sayHello = t('say', { name: 'Lisa'})

// 语言包方法
// function t(key: string): string {
//   return Utils.i18nt("usefffr", key);
// }
const router = useRouter();
const goLogin = () => {
  router.push("/home");
};

   

function changeTab(e:any) {
  state.textField = {
        input1: '',
        input2: '',
      };
  state.TabShow = e; 
};

function submmitEvent() {
      
      if (state.TabShow === 1) {
        if (state.textField.input1 === '') {
          Toast('请输入账号');
          return
        }
        if (state.textField.input2 === '') {
          Toast('请输入密码');
          return;
        }
      }
      if (state.TabShow === 2) {
        if (state.textField.input1 === '') {
          Toast('请输入手机号');
          return
        }
        if (state.textField.input2 === '') {
          Toast('请输入密码');
          return;
        }
      }
      // this.show = true
    };

    function   pushService(){
      // var url = 'https://ld.ebvsjbv.site/chat/#/customerServiceH5?lang='+this.$i18n.locale
      // if (localStorage.getItem('token')){
      //   url+='&token='+localStorage.getItem('token')
      // }
      // window.location.href=url
      // this.$router.push('customerServiceIndex')
    };

    let clientWidth = document.documentElement.clientWidth; //获取HTML文档所在窗口的当前宽度
    console.log(clientWidth)
    if (clientWidth>570){
      clientWidth = 570
    }
    let ratio = (clientWidth / 375) * 20; //计算基数为40的比例,然后动态计算画布在当前窗口的宽高，撑开弹窗
     

const state = reactive({
  num: 10,
  color: "#ccc",
  TabShow: 1,
  textField: {
        input1: '',
        input2: '',
      },


      show: false,
       
       
});
  
</script> -->


<style lang="scss" scoped>
/* color: v-bind("state.color"); */
.login {
  width: 100%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;

  .lang-right {
    width: 100%;
    display: flex;
    justify-content: end;

    .lang-icon {
      padding: 12px 0 12px 10px;
      width: 20px;
      height: 20px;
    }
  }

  .login-title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;

    color: #333333;
    margin-top: 10px;
  }

  .login-tab {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: left;

    .tab-button {
      border-radius: 4px;
      // padding: 8px 8px;
      width: 64px;
      height: 34px;
      text-align: center;
      margin-right:20px;  
      line-height: 34px;
    }

    .tab-button-show1 {
      background: #EEEEEE;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 34px;
      /* identical to box height, or 117% */
      color: #333333;
    }

    .tab-button-show2 {
      background: var(--cp-primary);
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 34px;
      /* identical to box height, or 100% */
      color: #FFFFFF;
    }
  }

  .title-lab {
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

  .forgetpw-btn {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px; 
    color: var(--cp-primary);
    margin-top: 10px; 
  }

  .login-btn {
    // margin-left: 20px;
    // margin-right: 20px;
     padding-right: 0; 
    /* height: 44px; */
    background: var(--cp-primary);
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 44px; 
    text-align: center;
    color: #FFFFFF;
  }


  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .register-btn {
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .register-btn-flex {
    flex: 1;
  }

  .register-btn-text1 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #333333;

  }

  .register-btn-text2 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #4AA8FF;
  }

  .login-input  {
    // margin-left: 20px;
    // margin-right: 20px; 
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