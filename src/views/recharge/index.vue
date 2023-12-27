<template>

  <div class="rechargeOperate">
 
    
    <!-- <van-stick fixed>
      <van-nav-bar
        
        :title="$t('')"
        left-arrow
        @click-left="onClickLeft"
        :right-text="$t('记录')"
        @click-right="onClickRight"
        safe-area-inset-top
      z-index="999"
    />
    </van-stick> -->
    <!-- vnavibar -->
    <!-- cp-nav-bar -->
    <vnavibar
      title=''
      right-text='记录'
      @click-right="$router.push('/rechRecord')"
    ></vnavibar>  
    
    <div style="width: 100%;height: 46px;"></div>

    <div class="biaoti">{{ $t('网络') }}</div>
    <div class="duoxuan">
<!--      <div class="xuan1 weixuan">111</div>-->
<!--      {{seletedData}}-->
      <div  v-for="(item,indx) in listDatas" :key="indx" class="xuan1 " :class="seletedData.name===item.name?'xuanzhong':'weixuan'" @click="changeTab(item)">{{ item.name }}
        <img class="xuanzhong-img" v-if="seletedData.name===item.name" src="../../assets/image/public/block_choose.png"/>
      </div>
    </div>
    <div class="qrcode" style="display: flex;justify-content: center;margin-top: 20px;width: 100%;float: left;">
      <canvas id="canvas" style="display:none"></canvas>
      <img :src="imgUrl" style="width: 150px;height: 150px;"/>
    </div>
    <div class="baocunerweima">
      <div class="baocunerweima-buuon" @click="saveEvent">{{ $t('保存二维码') }}</div>
    </div>
    <div class="biaoti">{{ $t('地址') }}</div>
    <div class="chongzhifuzhi">
      <div class="chongzhifuzhi2">
        <div class="dizhi">{{ seletedData.address }}</div>
        <div style="flex: 1;"></div>
        <div class="fuzhi11" style="color: #4AA8FF;" @click="copyData(seletedData.address)">{{ $t('复制') }}</div>
      </div>
    </div>
    <div class="biaoti" style="margin-bottom: 5px;">{{ $t('数量') }}</div>
    <div class="shuru">
      <el-input
          :placeholder="$t('请输入数量')"
          maxlength="10"
          v-model="textField.input1"
          clearable>
      </el-input>
    </div>
    <div class="biaoti">{{ $t('到账') }}({{$t('比率')}} 1:{{ seletedData.fee }})</div>
    <div class="chongzhifuzhi">
      <div class="chongzhifuzhi2">
        <div class="dizhi">{{ (textField.input1*seletedData.fee).toFixed(2) }}</div>
        <div style="flex: 1;"></div>
        <div class="fuzhi11" style="" >{{ $t('') }}</div>
      </div>
    </div>
    <div class="biaoti" style="margin-bottom: 10px;">{{ $t('上传图片（上传支付详情截图）') }}</div>
    <div class="shangchaun" style="margin-left: 15px;width:100%;float: left;">
      <van-uploader v-model="fileList" multiple :max-count="1" preview-size="120px" :after-read="afterRead"/>
    </div>
    <div class="tijiao">
      <div class="tijiao2" @click="submmitEvent">{{ $t('提交') }}</div>
    </div>


  </div>


  
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

 


</template>

<script lang="ts">
import QRCode from 'qrcode'
import clipboard3 from 'vue-clipboard3' 
// import vnavibar from "../../components/vnavibar.vue"
// import { defineComponent,reactive, ref,toRefs,onMounted,watch, watchEffect} from 'vue';
import { requestDummy, requestUploadFile } from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast, closeToast } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'  
export default { 
  setup() {
    const router  = useRouter() 
    const {toClipboard} = clipboard3()
    const { t, locale } = useI18n()
    const state = reactive({
      listDatas:[] as any,
      seletedData:{} as any,
      textField:{
        input1:'',
      } as any,

      imgUrl: '',
      fileList: [] as any ,
      picUrl:'',

      value:'' as any,
      showKeyboard: true,
      show:false
    })

    const submmitEvent=()=>{ 
      // if (state.textField.input1 === '') {
      //   showToast(t('请输入数量'));
      //   return
      // }
      // if (state.picUrl === '') {
      //   showToast(t('请上传图片'));
      //   return
      // }
      if ((state.textField.input1*state.seletedData.fee).toFixed(2)<state.seletedData.recharge_limit_min){
        showToast(t('价值不得小于最小限额')+state.seletedData.recharge_limit_min+'')
        return
      }
      if ((state.textField.input1*state.seletedData.fee).toFixed(2)>state.seletedData.recharge_limit_max){
        showToast(t('价值不得大于最大限额')+state.seletedData.recharge_limit_max+'')
        return
      } 

      checkFPWPost()
      // submmit()
    }

    const checkFPWPost = async()=>{

    await new Promise(resolve => setTimeout(resolve, 1000));
    state.show = true
    // router.push('/fPWSet')
  
    }

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
       submmit()
     }else{
      showFailToast('错误')
      state.value = ''
     }
    }
   },)


    const submmit=()=>{
      var data = {
        'amount':state.textField.input1,
        'name':state.seletedData.name,
        'img':state.picUrl,
        'channel_address':state.seletedData.address, 
        'sw':state.value
      };
      state.show = false
      state.value = ''
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      });
      requestDummy(data).then(res=>{
        // console.log(res)
        closeToast();
        showSuccessToast(t('提交成功'));
        state.textField.input1 = ''
        state.fileList = []
        state.picUrl = ''
        router.push('/succeed?path=rechRecord')
      })
      .catch((err: { msg: any; }) => {
        closeToast();
        console.log(err)
        showFailToast(t(err.msg));
          }
      )
    }


    const requestData = async()=>{

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      state.listDatas = [{
        address:'https://www.baidu.com/',
        name:'AAA',
        fee:0.02
      },
      {
        address:'https://www.google.com/',
        name:'BBB',
        fee:0.03
      }]
      // 一定要异步，否则getContext报错
      state.seletedData = state.listDatas[0]
      useqrcode()
      
    }

    const afterRead = (file:any) =>{
      console.log(file)
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      })
      let formData=new FormData();//通过formdata上传
      formData.append('file',file.file)

      requestUploadFile(formData).then((res: any) => {
          // showToast('dgdgdf'+res.message)
          closeToast()
          state.picUrl = 'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png'
          // state.picUrl = res

    })
    .catch(function (err) {
        console.log(err)
        closeToast()
        showFailToast(t('添加失败'));
        state.fileList = []
        state.picUrl = ''
      })
 
    }

    const copyData = async (ea:any)=>  {
      try{
        await toClipboard(ea)
        // alert(('复制成功'))
        showToast(t('复制成功'))
      }catch (err){
        console.log(err)
        showToast('复制失败')
      }
    }

    const changeTab=(e:any)=>{
      state.seletedData = e
      useqrcode()
    }
     
    const useqrcode=()=> {//生成二维码
      let canvas = document.getElementById('canvas')
      let url = state.seletedData.address
      QRCode.toCanvas(canvas, url, function (error:any) {
        if (error) {
          console.error(error)
        } else {
          console.log('success!');
        }
      })
      saveImg()//保存图片
    }

    const saveEvent =()=> {
      let myCanvas = document.getElementsByTagName('canvas');
      state.imgUrl = myCanvas[0].toDataURL('image/png')
      getUrlBase64(state.imgUrl).then(base64 => {
        let link = document.createElement('a')
        link.href = base64 as string
        link.download = 'qrCode.png'
        link.click()
      })
    }

    const getUrlBase64=(url:any)=> {
      return new Promise(resolve => {
        let canvas = document.createElement('canvas') as any
        let ctx = canvas.getContext('2d') as any
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function () {
          canvas.height = 300
          canvas.width = 300
          ctx.drawImage(img, 0, 0, 300, 300)
          let dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    }
    
    const saveImg =()=>{
      let myCanvas = document.getElementsByTagName('canvas');
      state.imgUrl = myCanvas[0].toDataURL('image/png')
    }
    // const onClickLeft =()=>{
    //   history.go(-1)
    // }
    // const onClickRight =()=>{
    //  router.push('/rechargeRecord')
    // }

    requestData() 

    

    return { 
      ...toRefs(state),

      copyData,
      useqrcode,
      saveImg,
      saveEvent,
      getUrlBase64,

      changeTab,
      afterRead,
      submmitEvent,
      submmit,

      // onClickLeft,
    }
    
  },
  
     
 
   

}


// export default {
//   data() {
//     return {
//       seletedData:{},
//       imgUrl: '',
//       listDatas:[],
//       textField:{
//         input1:'',
//       },
//       fileList: [],
//       picUrl:'',
//     }
//   },
//   components: {
//     vnavibar,
//   },
//   created() {
//     this.requestData()

//   },
//   methods: {
//     submmitEvent(){
//       var t = this
//       if (this.textField.input1 === '') {
//         Toast(t.$t('请输入数量'));
//         return
//       }
//       if (this.picUrl === '') {
//         Toast(t.$t('请上传图片'));
//         return
//       }
//       if ((this.textField.input1*this.seletedData.fee).toFixed(2)<this.seletedData.recharge_limit_min){
//         Toast(t.$t('价值不得小于最小限额')+this.seletedData.recharge_limit_min+'')
//         return
//       }
//       if ((this.textField.input1*this.seletedData.fee).toFixed(2)>this.seletedData.recharge_limit_max){
//         Toast(t.$t('价值不得大于最大限额')+this.seletedData.recharge_limit_max+'')
//         return
//       }
//       //   this.submmit()
//     },

//     // submmit(){
//     //   var data = {
//     //     'amount':this.textField.input1,
//     //     'name':this.seletedData.name,
//     //     'img':this.picUrl,
//     //     'channel_address':this.seletedData.address,
//     //     'tx':'123',
//     //   };
//     //   Toast.loading({
//     //     duration: 0,
//     //     forbidClick: true,
//     //     loadingType: "spinner",
//     //     message: ""
//     //   });
//     //   submmitPost(data).then(res=>{
//     //     console.log(res)
//     //     Toast.clear();
//     //     Toast(this.$t('提交成功'));
//     //     this.textField.input1 = ''
//     //     this.fileList = []
//     //     this.picUrl = ''
//     //     this.$router.push('/SubmitCompleted?path=rechargeRecord')


//     //   }).catch(err => {
//     //         // Toast.clear()
//     //         // reject(err)
//     //     Toast.clear();
//     //     console.log(err)
//     //     Toast(this.$t(err.msg));
//     //       }
//     //   )
//     // },

//     changeTab(e){
//       this.seletedData = e
//       this.useqrcode()
//     },

//     async requestData(){

//       await new Promise(resolve => setTimeout(resolve, 1000));
//       this.listDatas = [{
//         address:'https://www.baidu.com/',
//         name:'AAA',
//         fee:0.02
//       },
//       {
//         address:'https://www.google.com/',
//         name:'BBB',
//         fee:0.03
//       }]
//       // 一定要异步，否则getContext报错
//       this.seletedData = this.listDatas[0]
//       this.useqrcode()


//       // requestData({}).then(res22=>{
//       //   console.log(res22)
//       //   // this.code = this.$route.query.usercode

//       //   for(var i=0;i<res22.length;i++){
//       //     if (res22[i]['coin']===this.$route.query.type){
//       //       this.listDatas.push(res22[i])
//       //       console.log(this.listDatas)
//       //     }
//       //   }
//       //   this.seletedData = this.listDatas[0]
//       //   this.useqrcode()
//       // })
//     },

//     afterRead(file){
//       console.log(file)
//       // Toast.loading({
//       //   duration: 0,
//       //   forbidClick: true,
//       //   loadingType: "spinner",
//       //   message: ""
//       // });
//       let formData=new FormData();//通过formdata上传
//       formData.append('file',file.file);
//       // picUrlPost(formData).then(res=>{
//       //   console.log(res)
//       //   Toast.clear();
//       //   this.picUrl = res
//       // }).catch(function (err) {
//       //   console.log(err)
//       //   Toast.clear();
//       //   Toast(this.$t('添加失败'));
//       //   this.fileList = []
//       // })
//     },

//     copyData(ea) {
//       //如果需要回调：
//       this.$copyText(ea).then(e => {
//         alert(this.$t('复制成功'))
//         console.log(e)
//       }, function (e) {
//         alert(this.$t('复制失败'))
//         console.log(e)
//       })
//     },
     
//     useqrcode() {//生成二维码
//       let canvas = document.getElementById('canvas')
//       let url = this.seletedData.address
//       QRCode.toCanvas(canvas, url, function (error) {
//         if (error) {
//           console.error(error)
//         } else {
//           console.log('success!');
//         }
//       })
//       this.saveImg()//保存图片
//     },

//     saveEvent() {
//       let myCanvas = document.getElementsByTagName('canvas');
//       this.imgUrl = myCanvas[0].toDataURL('image/png')
//       this.getUrlBase64(this.imgUrl).then(base64 => {
//         let link = document.createElement('a')
//         link.href = base64
//         link.download = 'qrCode.png'
//         link.click()
//       })
//     },

//     getUrlBase64(url) {
//       return new Promise(resolve => {
//         let canvas = document.createElement('canvas')
//         let ctx = canvas.getContext('2d')
//         let img = new Image()
//         img.crossOrigin = 'Anonymous' //允许跨域
//         img.src = url
//         img.onload = function () {
//           canvas.height = 300
//           canvas.width = 300
//           ctx.drawImage(img, 0, 0, 300, 300)
//           let dataURL = canvas.toDataURL('image/png')
//           canvas = null
//           resolve(dataURL)
//         }
//       })
//     },
    
//     saveImg() {
//       let myCanvas = document.getElementsByTagName('canvas');
//       this.imgUrl = myCanvas[0].toDataURL('image/png')
//     },
//     onClickLeft() {
//       history.go(-1)
//     },
//     onClickRight() {
//       this.$router.push('/rechargeRecord')
//     }
//   }

// }
</script>



<style lang="scss" scoped>
 .rechargeOperate {
  // width: 100%;
  // height: 100%;
  // min-height: 100%;
  background: #F3F5F9;
  width: 100%;
  height: 100%;
  .biaoti {
    float: left;
    // flex: 1;
    text-align: left;
    margin-top: 20px;
    width: 100%;
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    margin-left: 15px;
  }

  .duoxuan {
    width: 100%;

    .xuan1 {
      float: left;
      margin-left: 15px;
      width: 100px;
      height: 40px;
      text-align: center;
      position: relative;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 40px;
      border-radius: 4px;
    }

    .weixuan {
      color: #999999;
      border: 1px solid #999999;
    }

    .xuanzhong {
      color: var(--cp-primary);
      border: 1px solid var(--cp-primary);
    }

    .xuanzhong-img {
      width: 23px;
      height: 23px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .baocunerweima {
    display: flex;
    justify-content: center;
    //margin-top: 30px;
    width: 100%;
    float: left;

    .baocunerweima-buuon {
      width: 114px;
      height: 40px;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 40px; //
      text-align: center;

      /* 333 */

      color: #333333;
    }
  }

  .chongzhifuzhi {
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    width: 100%;

    .chongzhifuzhi2 {
      padding: 0 10px;
      box-sizing: border-box;
      width: 100%;
      height: 44px;
      border: 1px solid #DDDDDD;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 44px;
      display: flex;

      /* 333 */

      color: #333333;

      .dizhi {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .shuru{
    width: 100%;
    float: left;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .tijiao{
    width: 100%;
    padding: 25px 15px;
    box-sizing: border-box;
    float: left;
    .tijiao2{
      width: 100%;
      height: 44px;
      background: var(--cp-primary);
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      /* identical to box height */

      text-align: center;

      color: #FFFFFF;
    }
  }

  .wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
}
</style>

<style>
.recharge.van-uploader__upload{
  width: 120px!important;
  height: 120px!important;
}
</style>
