<template>
  <div class="rechargeRecord2">
    <vnavibar title="OTC" />
    <!-- <van-nav-bar
        fixed
        :title="'OTC'"
        left-arrow
        @click-left="onClickLeft"
        :right-text="$t('记录')"
        @click-right="onClickRight"
    /> -->
    <div style="width: 100%;height: 46px;"></div> 

    <div class="nr">
      <!--      <div style="width: 100%;height: 1px;background: #F6F6F6;margin-left: 50px;"></div>-->
      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <!--          <div >{{ item }}</div>-->
          <div class="" v-for="(item,index) in listDatas" :key="index">
            <div class="liebiao">
              <img class="liebiao-img"
                   :src="''+item.iconImg"/>
              <div class="f1">
                <div class="t1">{{ item.name }} {{ $t('比率') }}：{{ item.currency_symbol }} {{ item.prize }}</div>
                <div class="t2">{{ $t('金额') }}：{{ item.excMin }} - {{ item.excMax }} {{ item.currency }}</div>
              </div>
              <div class="c1" @click="tapListItem(item)">{{ $t('出售') }}</div>
            </div>
            <div style="height: 1px;background: #F6F6F6;margin: 0 15px;"></div>
          </div>
          <!--          <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>-->
        </van-list>
      </van-pull-refresh>
      
      <van-action-sheet v-model:show="isShowActionSheet" title="Exchange">
        <div class="content">
          <div class="t1">
            {{ $t('当前比率') }}<span style="color: var(--cp-primary);">1  ≈ {{ actionSheetData.prize }} {{
              actionSheetData.name
            }}</span>
          </div>
          <div class="tab">
            <div class="tab-b" :class="selectedType==0?'x1':'x2'" style="margin-right: 10px;"
                 @click="selectedInput='',selectedType=0">{{ $t('按数出售') }}
            </div>
            <div class="tab-b" :class="selectedType==1?'x1':'x2'" @click="selectedInput='',selectedType=1">{{ $t('按额出售') }}</div>
          </div>
          <el-input
              placeholder="0.00"
              v-model="selectedInput">
            <i slot="suffix" class="el-input__icon" style="margin-right: 10px;color: var(--cp-primary);"
               @click="tapAllEvent">{{ $t('全部') }}</i>
          </el-input>
          <div class="tishi1">{{ $t('限额') }}：{{ actionSheetData.currency_symbol }}{{ actionSheetData.excMin }} - {{
              actionSheetData.currency_symbol
            }}{{ actionSheetData.excMax }}
          </div>
          <div class="tishi1">{{ $t('当前可') }}：{{ actionSheetData.balance }} A</div>
          <div class="tishi3" v-if="selectedType==0">{{ $t('可得') }}：{{
              actionSheetData.currency_symbol
            }}{{ (actionSheetData.rata * selectedInput).toFixed(2) }}
          </div>
          <div class="tishi3" v-if="selectedType==1">{{ $t('可得') }}：{{ actionSheetData.currency_symbol }}{{
              selectedInput == '' ? 0 : selectedInput
            }}
          </div>
          <div class="shoukuan">
            <div class="c1">{{ $t('账户') }}</div>
            <div class="c2" v-if="actionSheetData.name" @click="showPicker=true">{{ actionSheetData.name }}</div>
            <div class="c2" v-else @click="jumpToBind">{{ $t('未绑定') }}</div>
            <img src="../../assets/image/public/arrow_right.png" style="width: 18px"/>
          </div>
          <div class="anniu" @click="submmitEvent">{{ $t('出售') }}</div>
        </div>
      </van-action-sheet>

      <!-- :columns-field-names="customPickData" -->
      <!-- v-model="selectedValues" -->
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            show-toolbar

            :columns="pickList"
            
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
      </van-popup>

      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
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
  </div>
</template>
<script lang="ts"> 
import vnavibar from "../../components/vnavibar.vue"
import { defineComponent,reactive, ref,toRefs,onMounted,watch, watchEffect} from 'vue';
import {  requestDummy } from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast, closeToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'  
export default {
  components: {  
    vnavibar
  }, 
  setup() {
    const { t, locale } = useI18n()
    const store = useStore();
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
'name':'AA',
'id':0,
'prize':90091,'progress':0.08,'isSellOut':1,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
},

{
  'children':customList0,
'content':"<a href='https://www.baidu.com/' target='_blank'>兮动人</a><p>content</p><style></style>",
// '<p v-html="text">dfbfgbfghbf</p>', 
'name':'BB',
'id':1,
'prize':90092,'progress':0.9,'isSellOut':0,
'iconImg':
'https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/images/1.1.mac.png?raw=true',
}

      ]

     const state = reactive({
      listDatas: [] as any,
      loading: false,
      finished: false,
      refreshing: false,
      page_no: 0,
       
      listItem:{} as any,

      isShowActionSheet: false,
      actionSheetData: {} as any,

      selectedType: 0 as any,
      selectedInput: '' as any,
      
      pickDatas:[] as any,
      
      pickedPara:'' as any,
      
      showPicker: false,
      pickList:[] as any,//'AA','BB'
      // selectedValues:{} as any,
      

      // shaixuan_index: 0,

      value:'',
      showKeyboard: true,
      show:false,
     })

     const onRefresh = () => {
      //第一次列表不执行，下啦执行
      // showToast('onRefresh')
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      
      onLoad();
 
    }

    const onLoad = () => {
      //第一次列表执行
      // showToast('onLoad')
      if (state.refreshing) {
        // showToast('refreshing')
        state.listDatas = [];
        state.refreshing = false;
      }
      requestList() 
      
    };

    const requestList = () => {
      state.page_no++
      var data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        // 'baseId': state.active,
      }
      // showToast(state.page_no.toString())
      requestDummy(data).then((res: any) => {
          // showToast('dgdgdf'+res.message)

      state.listDatas = state.listDatas.concat(<any>customList);
      state.loading = false;
      //   if (res.pageList.length == 0) {
        //一定要按照返回数据写 真的没数据了 finished = true;
        //否则mock 数据就finished = false
        state.finished = false;
      //   }  

        // changeTab()
      
    })
     
      // project_listProject_action_post(data).then(res => {
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
    

    const getPickDatas=()=>{

      state.pickDatas = state.pickDatas.concat(customList) 
      for (var i = 0;i<state.pickDatas.length;i++){
          state.pickList.push({
            text:state.pickDatas[i].name,
            value:i,
          })
        }

      // p_method_list_action_post().then(res=>{
      //   console.log(res)
      //   this.pickDatas = res.pageList
      //   for (var i = 0;i<res.pageList.length;i++){
      //     this.pickList.push(res.pageList[i].name)
      //   }
      // })
      }

    const tapListItem =(e: any)=>{ 
          showActionSheetData(e)
          // kyc_get_action_post({}).then(res=>{
          //   console.log(res)
          //   if(res.status==2){
          //     // t.$router.push('/ProductOrder?projectId='+e)
          //     // this.submmitEvent()
          //     t.showActionSheetData(e)
          //   }else {
          //     t.$router.push('/Authentication')
          //   }
          // })

    }

    const showActionSheetData=(e: any)=> {
      // console.log(e)
      state.listItem  = e

      // await new Promise(resolve => setTimeout(resolve, 1000));


      // exchangerate_get_action_post({id: e.id}).then(res => {
        // this.actionSheetData = res
        state.actionSheetData = state.listItem
        state.isShowActionSheet = true
      // })
    }

    const submmitEvent=()=> {
      if (state.selectedInput==''){
        showToast(t('请输入数额'))
        return
      }
      state.isShowActionSheet = false

      state.show = true

      // checkFPWPost({}).then(res=>{
      //   if (res.safeword==1){
      //     console.log(444)
      //     state.show = true
      //   }else {
      //     router.push('/fPWSet')
      //   }
      // })

    }

    const submmitPost=()=> {
      var amount = state.selectedInput
      if (state.selectedType == 1){
        amount = (state.selectedInput/state.actionSheetData.prize).toFixed(2)
      }
      var data = {
        safeword: state.value,
        id: state.listItem.id,
        amount: amount,
        name: state.actionSheetData.name, 
        pickedPara:state.pickedPara,
      }
      state.show = false
      state.selectedInput = ''
      state.value = ''
      router.push('/succeed?path=otcRecordList')
      // exchangerate_exchange_action_post(data).then(res => {
      //   // console.log(res)
      //   router.push('/SubmitCompleted?path=OTCExchangeList')
      // })
    }

    const tapAllEvent=()=>  {
      if (state.selectedType == 0) {
        state.selectedInput = state.actionSheetData.balance
      } else {
        state.selectedInput = (state.actionSheetData.balance * state.actionSheetData.prize).toFixed(2)
      }
    }

    const onConfirm =({ selectedOptions }:any)=> {
      // { selectedValues }//value要赋值
      showToast(`当前值：${selectedOptions[0].text}
            ,当前索引：${selectedOptions[0].value}`);
      // ,当前索引：${selectedValues.join(',')} 

      //text
      // state.pickedPara =  `${selectedValues}`

      //value
      state.pickedPara = 
      state.pickDatas[Number(`${selectedOptions[0].value}`)].name
      // state.pickDatas[index]
      showToast(state.pickedPara);

      state.actionSheetData.name = `${selectedOptions[0].text}`
      state.showPicker = false

      // state.content_type = state.pickDatas[index]
      // state.page_no = 0
      // state.finished = false;
      // requestList()
      // state.showPicker = false
      // state.listDatas = [];  
    }
    
    const onCancel=() =>{
      state.showPicker = false 
    } 

    const onClickLeft=() =>{
      history.go(-1)
    }
    const onClickRight=() => {
      router.push('/otcRecordList')
    }
    const jumpToBind=() =>{
      router.push('/accountList')
    }


    getPickDatas() 

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

    return { 
      ...toRefs(state),

      onRefresh,
      onLoad,


      tapListItem,
      submmitEvent,

      tapAllEvent,
      onConfirm,
      onCancel,

      jumpToBind,

      onClickLeft,
      onClickRight,


    };
  },
     
};

</script>
<style lang="scss" scoped>
.rechargeRecord2 {
  width: 100%;
  //height: 100%;
  background: #ffffff;
  min-height: 100%;

  .nr {
    width: 100%;
    //padding: 0 15px;
    //box-sizing: border-box;
    .liebiao {
      border-radius: 6px;
      //margin-top: 15px;
      width: 100%;
      //background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 15px;
      box-sizing: border-box;

      .liebiao-img {
        width: 40px;
        height: 40px;
        margin-right: 14px;
        border-radius: 35px;

      }

      .f1 {
        font-size: 14px;
        flex: 1;

        .t1 {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;

          /* #333333 */

          color: #333333;
        }

        .t2 {
          flex: 1;
    text-align: left;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          /* identical to box height */


          /* 999 */

          color: #999999;
          margin-top: 8px;
        }
      }

      .c1 {
        flex: 1;
        text-align: left;
        margin-left: 10px;
        width: 62px;
        height: 28px;
        background: var(--cp-primary);
        border-radius: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 28px;
        /* identical to box height, or 114% */

        text-align: center;

        color: #FFFFFF;
      }
    }
  }

  .t1 {
    flex: 1;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    /* or 129% */


    color: #000000;
    margin-bottom: 16px;
  }

  .tab {
    width: 100%;
    margin-bottom: 20px;
    display: flex;

    .tab-b {
      width: 89px;
      height: 34px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 34px;
      /* identical to box height, or 117% */

      text-align: center;

      /* f6f6f6 */


      border-radius: 4px;
    }

    .x1 {
      color: #F6F6F6;
      background: var(--cp-primary);
    }

    .x2 {
      background: #EEEEEE;
      color: #333333;
    }
  }

  .tishi1 {
    flex: 1;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #999999;
    margin-top: 10px;
  }

  .tishi3 {
    flex: 1;
    text-align: left;
    margin-top: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }

  .shoukuan {
    margin-top: 15px;
    height: 50px;
    display: flex;
    //padding: 0 15px;
    justify-content: center;
    align-items: center;

    .c1 {
      flex: 1;
      flex: 1;
        text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      //line-height: 16px;

      color: #333333;

    }

    .c2 {
      margin-right: 6px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      //line-height: 16px;
      text-align: right;

      /* 999 */

      color: #999999;
    }
  }

  .anniu {
    margin-top: 27px;
    width: 100%;
    height: 44px;
    /* 主题色 */

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
}
</style>
<style>
.rechargeRecord2 .van-hairline--bottom::after {
  border-bottom-width: 0
}
</style>
<style>
.content {
  padding: 0px 16px 15px;
  box-sizing: border-box;
}
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>