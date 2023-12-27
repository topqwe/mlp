<template>
  <div class="home"> 
 
      <!-- <div style="background: #2D78F9;">
        <heah-navigation>

        </heah-navigation>
      </div>

      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    
      <div class="box">
        {{$t("首页")}}
      </div> -->
 
    <div class="CustomNavi">
      <img class="LogoImgView" src="../../assets/image/index/nav_logo.png" style=""/>
      
      <router-link to="/customerServiceIndex">
      <img class="ChatImgView" src="../../assets/image/index/kefu_icon.png"/>
      </router-link>
    </div>
      
    <!-- Top margin margin: 64px;-->
    <div style="height: 64px;width: 100%;"></div> 
    
    <!-- ../../assets/image/avatar/Vec.png -->
    <!-- <van-sticky>
    <van-nav-bar>
            <template #left>
                <van-image :src="image" round />
            </template>
            <template #title>
                <van-search placeholder="搜索" disabled />
            </template>
            <template #right>
                <van-icon name="sign" size="28" />已签
            </template>
        </van-nav-bar>
      </van-sticky>  -->


    <div class="BannerView">
      <van-swipe class="my-swipe" style="border-radius: 4px;" :autoplay="3000" indicator-color="white" height="150" v-if="banner">
        <van-swipe-item v-for="(item,index) in banner" :key="index" style="border-radius: 4px;">
          <van-image radius="4px" :src="item" style="width: 100%;  border-radius: 4px;" height="150">
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="Bar">
      <img class="BarImgView" src="../../assets/image/index/gongao_icon.png"/>
      <div class="BarFlex">
        <!--{{ announce}} "announce" announ-->
        <van-notice-bar
            :text= announce
        />
      </div>
    </div>

     <!-- ToolView -->  
    <div style="background: #FFFFFF;border-radius: 4px;">
    <!-- Row -->  
      <div class="ToolView"> 
        <!-- stateExp -->
        <router-link to="/news">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/news.png"/>
            <div class="ToolTextView">{{ $t('新闻动态') }}</div>
          </div>
        </router-link> 

        <router-link to="/membership">
        <div class="ToolItemView">
          <img style="width: 28px;" src="../../assets/image/index/VIP.png"/>
          <div class="ToolTextView">{{ $t('等级') }}</div>
        </div>
        </router-link> 

        <router-link to="/members">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/app.png"/>
            <div class="ToolTextView">{{ $t('团队') }}</div>
          </div>
        </router-link>

        <router-link to="/inviteFriends">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/invite.png"/>
            <div class="ToolTextView">{{ $t('邀请') }}</div>
          </div>
        </router-link>
        
       
      </div>


      <!-- Row -->  
      <div class="ToolView" style="margin-top: 0;padding-bottom: 15px;">

        <router-link to="/rechargeList">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/earn.png"/>
            <div class="ToolTextView">{{ $t('RR') }}</div>
          </div>
        </router-link>

        <router-link to="/withdraw">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/Withdrawal.png"/>
            <div class="ToolTextView">{{ $t('WW') }}</div>
          </div>
        </router-link>

        <router-link to="/otc">
          <div class="ToolItemView">
            <img style="width: 28px;" src="../../assets/image/index/exchange.png"/>
            <div class="ToolTextView">{{ $t('OTC') }}</div>
          </div>
        </router-link>

        <router-link to="/qa">
        <div class="ToolItemView">
          <img style="width: 28px;" src="../../assets/image/index/live.png"/>
          <div class="ToolTextView">{{ $t('问题') }}</div>
        </div>
        </router-link>

      </div>

    </div>


   

    <div class="SectionHeaderView" style="display: flex;justify-content: center;align-items: center;">
      <div style="flex: 1; text-align: left;">{{ $t('专家') }}</div>
      <!--      <img src="../../assets/image/me/arrow_right.png" style="width: 18px;height: 18px;" /> -->
    </div>

    <div class="ExpertHList">
      <div v-for="(item,index) in expertList" :key="index" :class="expertIndex==index?'zhuanjia-item':'zhuanjia-item2'" @click="expertIndex=index">
        <div class="" :class="expertIndex==index?'sanjiao':'sanjiao2'"></div>
        <img class="item-avatar"  :src="''+item.iconImg"/>
        <div class="t1">{{ item.name }}</div>
        <div class="t2">{{ item.name }}</div>

      </div>
    </div>

    <div class="ExpertContentWidget" v-if="expertList.length!==0">
      {{expertList[expertIndex]['content']}}
    </div>

    <div class="SectionHeaderView" style="display: flex;justify-content: center;align-items: center;" @click="jumpIndex1">
      <div style="flex: 1; text-align: left;">{{ $t('新手推荐') }}</div>
      <img src="../../assets/image/public/arrow_right.png" style="width: 18px;height: 18px;"/>
    </div>

    <div class="padd-15">
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >

    <div v-for="(item,index) in listDatas" :key="index" @click="pushDetail(item.id)" class="RecList">
      <div class="xm-title">
        <!-- <div style="flex: 1; text-align: left;"> -->
          {{ item.name }}
        <!-- </div> -->

      </div>
      <div class="xm-xinxi">
        <div class="xinxi-k1">
          <div class="k-n">{{ item.progress }}</div>
          <div class="k-title">{{ $t('AAA') }}</div>
        </div>
        <div class="xinxi-k1">
          <div class="k-n">{{ (item.progress * 100).toFixed(2) }}%</div>
          <div class="k-title">{{ $t('BBB') }}</div>
        </div>
        <div class="xinxi-k1">
          <div class="k-n" v-if="2 <3">{{ 2 }}{{ $t('时') }}</div>
          <div class="k-n" v-else>{{ 2 }}{{ $t('天') }}</div>
          <div class="k-title">{{ $t('CCC') }}</div>
        </div>
      </div>


      <div class="ProgressView">
        <div style="flex: 1;margin-right: 15px;">
          <div class="Progress">
            <div :class="item.isSellOut==1?'ProgressGrey':'ProgressHight'"
                 :style="'width:'+(item.progress*100).toFixed(2)+'%'"></div>
          </div>
          <div class="ProgressTitle">
            <div class="t1">Progress</div>
            <div class="t2">{{ (item.progress * 100).toFixed(2) }}%</div>
          </div>
        </div>
        <div class="Btn" :class="(item.isSellOut==1?'BtnGrey':'BtnHight')">
          {{ $t('立即参与') }}
        </div>
      </div>

    </div>

  </van-list>
      </van-pull-refresh>
    </div>

    <!-- Bottom -->
    <div style="width: 100%;height: 80px;"></div>

    <!-- Dialog -->
    <van-overlay :show="isShowBonus" @click="isShowBonus = false">
      <div class="WelcomeDialog" 
      style="display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;">
        <div class="zhengti">
          <div class="zhengti-top">
            <div class="zhengt1">
              <img src="../../assets/image/public/fu1.png" />
              <div style="margin-left: 9px;margin-right: 9px;">HI~{{ $t('初次见面') }}</div>
              <img src="../../assets/image/public/f2.png" />
            </div>
            <div class="zhengti2">
              {{ $t('新人奖励') }}
            </div>
            <div class="NewcomerBonus-div">
              <img class="NewcomerBonus" src="../../assets/image/public/NewcomerBonus.png" />
              <div class="s1">{{ $t('已存入您的余额') }}</div>
              <div class="s2">Click the button to recivce award</div>
              <div class="s3">{{ bonus }}</div>
              <div class="s4">A</div>
            </div>
            <div class="dialog" @click="pushRecord">{{ $t('查看') }}</div>
          </div>
          <div style="display: flex;justify-content: center;">
            <img @click="isShowBonus = false"  src="../../assets/image/public/x-circle.png" class="CloseBtn" style="width: 30px;height: 30px;margin-top: 20px;"/>
          </div>

        </div>
      </div>
    </van-overlay>


  </div>
</template>

<script lang="ts"> 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
 
export default defineComponent({
  components: {  
  }, 
  props: {
    // 标题
    title: String,
    // 颜色
    color: String
  },
  setup (props) { 
    // 这里可以使用父组件传过来的 props 属性值
    // 复用组件，并传入 props 值，让组件呈现对应的状态 
    // <Header title="Eno" color="red" />
    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();

    const announ = ref('')

    const customList = Array()

      for (var i = 0; i < 3; i++) {
        var vv = {
            'content':'abcdfgdfdgdgdgd',
            'name':i===0?'abcdfg':'dfeeedgff',
            'id':i,
            'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
            'iconImg':
            'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
        }
        customList.push(vv)
      }
    // 定义响应式数据  
    const state = reactive({
      announce: '',
      banner: Array(), 

      expertList: Array(),
      expertIndex:0,

      listDatas: Array(),
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,

      isShowBonus:false,
      vipData: {}, 
      value: '',
      showKeyboard: true, 
      bonus:'',
    });

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      
      onLoad();
    }

    const onLoad = () => {
      if (state.refreshing) {
        state.listDatas = [];
        state.refreshing = false;
      }
      requestList() 
    }

    const requestList = () => {
      // state.active = localStorage.getItem('investActiveIndex')
      // ?localStorage.getItem('investActiveIndex'):'0'

      state.page_no++
      const data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        'baseId': '0',
      }
      // showToast(state.active?.toString())
      requestDummy(data).then((res: any) => {
          // showToast('dgdgdf'+res.message)

      state.listDatas = state.listDatas.concat(customList);
      state.loading = false;

       //   if (res.pageList.length == 0) {
        //一定要按照返回数据写 真的没数据了 finished = true;
        //否则mock 数据就finished = false 还能继续page++

        state.finished = false;
      //   } 

    })
      

      // requestList_post(data).then(res => {
      //   console.log(res)
      //   for (let i = 0; i < res.pageList.length; i++) {
      //     this.listDatas.push(res.pageList[i]);
      //   }
      //   console.log(this.listDatas)
      //   this.loading = false;

      //   if (res.pageList.length == 0) {
      //     this.finished = true;
      //   }
      // })

    }

// 异步操作
    const homeInfo = () => {
      // console.log(this.$i18n.locale)

 state.announce = 'opooppopoopopppoopp'.toString();
 state.banner = [
'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
]
//可单独写出去
requestDummy().then((res: any) => {
      // announ.value = res.time.toString()
      state.announce = 
      res.time.toString()
      +res.time.toString()+res.time.toString()
      // state.announce = 'opooppopoopopppoopp'.toString();
      // state.isShowBonus = true

      state.expertList = state.expertList.concat(customList)
      
        // showToast('ddfdfdf');
        showToast('dgdgdf'+res.message) 
    })

    } 

     
    const pushRecord = () => {
      state.isShowBonus = false
      router.push("/TransactionRecord"); 
    };

    const pushDetail = (e:any) => {
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      router.push('/investDetails?projectId='+e) 
    };
    const jumpIndex1 = () => {
      router.push("/invest"); 
    };

    const openChatUrl = () => {
      var url = 'https://vvvvv.site/chat/#/customerServiceH5?lang=' + 
      localStorage.getItem('language')
      // locale
      if (localStorage.getItem('token')) {
        url += '&token=' + localStorage.getItem('token')
      }
      window.location.href = url
    }

    // 异步操作
    const asyncOperation = async () => {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 设置响应式数据的值
      state.announce = '9090909009009000000';
    };
    // 在组件实例被创建之前执行异步请求操作
    homeInfo()
    
    // 在组件实例被创建之前执行异步操作
    asyncOperation()
    
    // 在组件实例被创建之后执行
    onMounted(() => {
      // homeInfo()
    })
    
    
     
    return {
      announ,
      ...toRefs(state),

      // requestDummy,
      // homeInfo, 
      onRefresh,
      onLoad,

      pushRecord,
      pushDetail,
      jumpIndex1,
      openChatUrl, 
    }
  },
  // mounted() {
  //   this.homeInfo
  // },
   
});

//no ts

// export default {
//   name: "HomePage",
//   components: {
//     // HeahNavigation,
//     // "v-navbar": HeahNavigation,
//     // [SwipeItem.name]: SwipeItem,
//     // [Swipe.name]: Swipe,
//     // [NoticeBar.name]: NoticeBar,
//     // [Skeleton.name]: Skeleton,
//     // [VanImage.name]: VanImage,
//     // [loading.name]: loading,
//     // [Dialog.Component.name]: Dialog.Component,
//     // [Overlay.name]: Overlay,
//     // [PasswordInput.name]: PasswordInput,
//     // [NumberKeyboard.name]: NumberKeyboard
//   },
//   created() {
//     this.init();
//   },
//   data() {
//     return {
//       announce: '',
//       banner: [], 
//       vipData: {}, 
//       value: '',
//       showKeyboard: true, 
//       listDatas: [],
//       expertList: [],
//       expertIndex:0,
//       bonus:'',
//       isShowBonus:true,
//     }
//   },
   
//   methods: {
//     async init() {
//       // if (this.$route.query.bonus){
//         this.isShowBonus = false
//         this.bonus = '10'
//         // this.$route.query.bonus
//         window.location.href=window.location.href.split('?')[0]
//       // }
//       this.homeInfo()
//       this.walletInfo()
//       this.homeRec()
//       this.homeExpert()
//     },
    

//     homeInfo() {
//       console.log(this.$i18n.locale)

//       this.announce = 'gtrhyrthrthrthrthtrhtrhtrhrthtrhtrdgdgdgdgdgdgdgd';
//       this.banner = [
//       'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
//       'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
//       ]


//       // homeInfoPost({}).then(res => {
//       //   console.log(res)
//       //   this.announce = res.announcement.toString()
//       //   this.banner = res.banner
//       // })
//     },
//     homeRec() {


//       var list = [];
//     // for (int i = 0; i < 11; i++) {
//       var vv = {'name': 'gdfgf','prize':1500.8,'id': 0,
//       'progress':0.08,'isSellOut':1};
//       var vv1 = {'name': 'gdfgf','prize':1500.9,'id': 1,
//       'progress':0.9,'isSellOut':0};
//       list.push(vv);
//       list.push(vv1);
//     // }
//     var listP = [];
//     // for (int i = 0; i < 11; i++) {
//       var vv2 = {'name': 'gdfgf0','prize':1800.8,'id': 0,'children':list};
//       var vv3 = {'name': 'gdfgf1','prize':1800.8,'id': 1,'children':list};
//       listP.push(vv2);
//       listP.push(vv3);
//     // }
    

//     this.listDatas = this.listDatas.concat(list);

//       // homeRecPost({}).then(res => {
//       //   console.log(res)
//       //   this.listDatas = res.pageList
//       // })


//     },
//     homeExpert() {

//       var dic = {
//         'content':'abcdfgdfdgdgdgd',
// 'name':'abcdfg',
// 'id':1,
// 'prize':90091,
// 'iconImg':
// 'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// }
// var dic2 = {
//         'content':'abcdfgdfdgdgdgd',
// 'name':'abcd',
// 'id':1,
// 'prize':90091,
// 'iconImg':
// 'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
// }

//       this.expertList.push(dic);
//       this.expertList.push(dic2);
//       // homeExpertPost({}).then(res => {
//       //   console.log(res)
//       //   this.expertList = res.pageList
//       // })
//     }, 
    
//     pushRecord(){
//       this.$router.push('/TransactionRecord')
//     },
//     pushDetail(e) {
//       document.body.scrollTop = 0
//       // firefox
//       document.documentElement.scrollTop = 0
//       this.$router.push('/ProductDetails?projectId='+e)
//     },
//     jumpIndex1() {
//       this.$router.push('/invest')
//       // location.reload();
//     },
    
//     onClickLeft() {
//     },
//     onClickRight() {
//     },
     
//     openChatUrl() {
//       var url = 'https://ld.ebvsjbv.site/chat/#/customerServiceH5?lang=' + this.$i18n.locale
//       if (localStorage.getItem('token')) {
//         url += '&token=' + localStorage.getItem('token')
//       }
//       window.location.href = url

//     },
//     shengji2() {
//       console.log()
//       var data = {
//         amount: this.vipData.prize,
//         level: this.vipData.id,
//         valid_day: this.vipData.validDay,
//         safeword: this.value
//       } 
//       this.value = ''
//       vipListPost(data).then(res => {
//         console.log(res)
//         this.walletInfo()
//         this.homeInfo()
//       })
//     },

    
//   },
//   watch: {
//     // value(value) {
//     //   console.log(value)
//     //   if (value.length === 6) {
//     //     this.shengji2()
//     //   }
//     // },
//   }
// };

</script>


<style lang="scss" scoped>
.home {
  width: 100%;
  background: #F3F5F9;
  padding: 0 15px;
  box-sizing: border-box;


  .CustomNavi {
    width: 100%;//375px
    height: 46px;
    position: fixed;
    top: 0;
    z-index: 999;
    left: 0;
    right: 0;
    margin:  0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    background: #F3F5F9;

    .LogoImgView {
      padding-top: 8px;
      padding-bottom: 8px;
      width: 148px;
    }

    .ChatImgView {
      width: 20px;
      height: 20px;
    }
  }

  .BannerView {
    width: 100%;
    //background: white;
    filter: drop-shadow(0px 6px 12px rgba(55, 63, 69, 0.1));
    border-radius: 4px;
  }

  .Bar {
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 54px;

    .BarImgView {
      padding: 8px 9px 7px 10px;
      width: 18px;
      height: 16px;
    }

    .BarFlex {
      flex: 1;
      margin-right: 18px;
    }
  }

  .ToolView {
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    //background: #FFFFFF;
    padding-top: 15px;

    .ToolItemView {
      width: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .ToolTextView {
        margin-top: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */

        text-align: center;

        color: #000000;

      }
    }
  }

  .padd-15 {
    // padding: 0 15px;
    box-sizing: border-box;
  }

  .RecList {
    margin-top: 15px;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;

    .xm-title {
      flex: 1;
      text-align: left;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;

      color: #000000;

    }

    .xm-xinxi {
      margin-top: 15px;
      display: flex;

      .k-n {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        /* identical to box height */
        color: #333333;
        //text-align: center;
      }

      .k-title {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        //line-height: 14px;
        /* identical to box height */

        //text-align: center;

        color: #999999;
      }

      .xinxi-k1 {
        flex: 1;
      }

       
    }

    .ProgressView {
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      .Progress {
        margin-top: 2px;
        width: 140px;
        height: 8px;
        background: #EEEEEE;
        border-radius: 27px;

        .ProgressHight {
          height: 8px;
          background: var(--cp-primary);
          border-radius: 27px;
        }

        .ProgressGrey {
          height: 8px;
          background: var(--cp-dark);
          border-radius: 27px;
        }
      }

      .ProgressTitle {
        width: 140px;
        margin-top: 8px;
        display: flex;
        justify-content: space-between;

        .t1 {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #000000;
        }

        .t2 {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #000000;
        }
      }

      .Btn{
        width: 96px;
        height: 36px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 36px;
        /* identical to box height, or 114% */

        text-align: center;

        color: #FFFFFF;


        border-radius: 4px;
      }

      .BtnHight {
        background: var(--cp-primary);
      }

      .BtnGrey {
        background: var(--cp-dark);
      }
    }

  }


  .ExpertHList {
    //box-sizing: border-box;
    //width: 200px;
    height: 160px;
    margin-top: 15px;
    text-align: center;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none !important;
    }

    .sanjiao {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -11px;
      width: 0;
      //height: 60px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #FFFFFF;
      transform: rotate(180deg);
    }

    .sanjiao2 {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -11px;
      width: 0;
      //height: 60px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #E5E8ED;
      transform: rotate(180deg);
    }

    .t1 {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #999999;
    }

    .t2 {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      //line-height: 16px;
      text-align: center;
      color: #333333;
      margin-top: 2px;
    }

    .item-avatar {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      margin: 12px auto;
    }

    .zhuanjia-item {
      width: 120px;
      height: 140px;
      background: #FFFFFF;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-block;
      box-sizing: border-box;
      margin-right: 15px;
      box-shadow: 0px 4px 8px rgba(78, 82, 90, 0.15);
      position: relative;
    }

    .zhuanjia-item2 {
      width: 120px;
      height: 140px;
      background: #E5E8ED;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-block;
      box-sizing: border-box;
      margin-right: 15px;
      position: relative;
    }
  }

  .ExpertContentWidget {
    margin-top: 10px;
    background: #FFFFFF;
    padding: 15px;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }

  .SectionHeaderView {
    margin-top: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }

}

.WelcomeDialog {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  //width: 100%;
}
.zhengti{
  width: 100%;
  max-width: 570px;
  padding: 0 30px;
  //padding-top: 60px;
  box-sizing: border-box;
  .zhengti-top{
    box-sizing: border-box;
    padding: 10px 15px 20px 15px;
    background: #FFFFFF;
    border-radius: 6px;
    position: relative;
    .zhengt1{
      display: flex;
      justify-content: center;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 17.2866px;
      line-height: 20px;
      text-align: center;

      /* 999 */

      color: #999999;
      img{
        width: 48px;
      }
    }
    .zhengti2{
      margin-top: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: 28.811px;
      line-height: 34px;
      /* identical to box height */
      text-align: center;
      color: #000000;
    }
    .NewcomerBonus-div{
      margin-top: 20px;
      width: 100%;
      height: 110px;
      position: relative;
    }
    .NewcomerBonus{
      width: 100%;
      height: 100%;
      //height: 92px;
    }
    .s1{
      position: absolute;
      left: 12px;
      top: 17px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;

      color: #FFFFFF;

    }
    .s2{
      position: absolute;
      left: 12px;
      bottom: 18px;
      width: 114px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;

      color: #FFFFFF;
    }
    .s3{
      position: absolute;
      right: 19px;
      top: 25px;
      font-style: normal;
      font-weight: 600;
      font-size: 24.9695px;
      line-height: 29px;
      color: #000000;
    }
    .s4{
      position: absolute;
      right: 19px;
      bottom: 23px;
      font-style: normal;
      font-weight: 600;
      font-size: 16.5854px;
      line-height: 19px;
      /* identical to box height, or 112% */


      color: #000000;
    }
    .dialog{
      margin-top: 20px;
      width: 100%;
      height: 44px;
      /* 主题色 */
      background: var(--cp-primary);
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 44px;
      /* identical to box height, or 114% */
      text-align: center;
      color: #FFFFFF;
    }
  }
  .CloseBtn{
    width: 30px;
    height: 30px;
    margin-top: 20px;
  }
}
</style>

<style>

.home .van-nav-bar__text {
  color: #999999;
}

.home .van-notice-bar {
  background: none;
  height: 36px;
  color: #333333;
}

.home .van-skeleton__row, .van-skeleton__title {
  background: #B0B0B0;
}

.home .van-overlay{
  z-index: 9999!important;
}

/*.van-swipe__indicator{*/

/*  background: rgba(0, 0, 0, 0.4);*/
/*  opacity: 0.6;*/
/*}*/
/*.van-swipe__indicator--active{*/
/*  !*background: var(--cp-primary)!important;*!*/
/*  background: rgba(0, 0, 0, 0.6)!important;*/
/*}*/
</style>
