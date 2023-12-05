<template>
  <div class="Authentication">
    <vnavibar title='身份认证'/>
    <div style="width: 100%;height: 46px;"></div>
    <div class="nr">
      <div class="title" v-if="listDatas.status!=0">
        
        <img src="../../assets/image/auth/shenhe.png" v-if="listDatas.status==1" />
        <img src="../../assets/image/auth/zhengque.png" v-if="listDatas.status==2" />
        <img src="../../assets/image/auth/cuowu.png" v-if="listDatas.status==3" />
        <div class="f2" v-if="listDatas.status==1">{{ $t('审核中') }}</div>
        <div class="f2" v-if="listDatas.status==2">{{ $t('已认证') }}</div>
        <div class="f2" v-if="listDatas.status==3">{{ $t('认证失败') }}</div>

      </div>
      <div class="t1">{{ $t('国籍') }}</div>
      <div>
        <!--        <el-select v-model="value" filterable placeholder="请选择" style="width: 100%;">-->
        <!--          <el-option-->
        <!--              v-for="item in options"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value">-->
        <!--          </el-option>-->
        <!--        </el-select>-->
<!--        {{listDatas.status}}-->
        <div v-if="listDatas.status==0" data-v-3ec469dc="" class="el-select" style="width: 100%;" @click="openEvent"><!---->
          <div class="el-input el-input--suffix"><!----><input type="text" readonly="readonly" autocomplete="off"
                                                               :placeholder="countryName" class="el-input__inner">
            <!----><span
                class="el-input__suffix"><span class="el-input__suffix-inner"><i
                class="el-select__caret el-input__icon el-icon-arrow-up"></i><!----><!----><!----><!----><!----></span>
              <!----></span><!----><!----></div>
          <div class="el-select-dropdown el-popper" style="display: none; min-width: 345px;">
            <div class="el-scrollbar" style="">
              <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                  <li data-v-3ec469dc="" class="el-select-dropdown__item"><span>黄金糕</span></li>
                </ul>
              </div>
              <div class="el-scrollbar__bar is-horizontal">
                <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
              </div>
              <div class="el-scrollbar__bar is-vertical">
                <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
              </div>
            </div><!----></div>
        </div>
        <div v-else data-v-3ec469dc="" class="el-select" style="width: 100%;"><!---->
          <div class="el-input el-input--suffix"><!----><input type="text" readonly="readonly" autocomplete="off"
                                                               :placeholder="countryName" class="el-input__inner">
            <!----><span
                class="el-input__suffix"><span class="el-input__suffix-inner"><i
                class="el-select__caret el-input__icon el-icon-arrow-up"></i><!----><!----><!----><!----><!----></span>
              <!----></span><!----><!----></div>
          <div class="el-select-dropdown el-popper" style="display: none; min-width: 345px;">
            <div class="el-scrollbar" style="">
              <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                  <li data-v-3ec469dc="" class="el-select-dropdown__item"><span>黄金糕</span></li>
                </ul>
              </div>
              <div class="el-scrollbar__bar is-horizontal">
                <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
              </div>
              <div class="el-scrollbar__bar is-vertical">
                <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
              </div>
            </div><!----></div>
        </div>
      </div>
      <div class="t1">{{ $t('真实姓名') }}</div>
      <div>

        <el-input
            :placeholder="''"
            maxlength="20"
            v-model="input2"
            :disabled="listDatas.status==0||listDatas.status==3?false:true"
            clearable>
        </el-input>
      </div>
      <div class="t1">{{ $t('/照号码') }}</div>
      <div>
        <el-input
            :placeholder="''"
            maxlength="30"
            v-model="input3"
            :disabled="listDatas.status==0||listDatas.status==3?false:true"
            clearable>
        </el-input>
      </div>
      <div class="t1">{{ $t('上传照') }}</div>
      <div class="shangchaun">
        <div class="c1">
          <van-uploader v-if="listDatas.status==0||listDatas.status==3" v-model="fileList" multiple :max-count="1" preview-size="105px" :after-read="afterRead"
                        style=""/>
          <van-uploader v-else v-model="fileList" multiple :max-count="1" preview-size="105px"
                        style=""/>
          <div>{{ $t('正面') }}</div>
        </div>
        <div style="flex: 1;"></div>
        <div class="c1">
          <van-uploader v-if="listDatas.status==0||listDatas.status==3" v-model="fileList2" multiple :max-count="1" preview-size="105px" :after-read="afterRead2"
                        style=""/>
          <van-uploader v-else v-model="fileList2" multiple :max-count="1" preview-size="105px"
                        style=""/>
          <div>{{ $t('反面') }}</div>
        </div>
        <div style="flex: 1;"></div>
        <div class="c1">
          <van-uploader v-if="listDatas.status==0||listDatas.status==3" v-model="fileList3" multiple :max-count="1" preview-size="105px" :after-read="afterRead3"
                        style=""/>
          <van-uploader v-else v-model="fileList3" multiple :max-count="1" preview-size="105px"
                        style=""/>
          <div>{{ $t('手持照') }}</div>
        </div>
      </div>
      <div class="t1" v-if="listDatas.status==0||listDatas.status==3">拍摄示例</div>
      <div class="shangchaun" v-if="listDatas.status==0||listDatas.status==3">
        <div class="c1">
          <img class="c1-a-img" src="../../assets/image/auth/xuan1.png"/>
          <img class="" src="../../assets/image/auth/zhengque.png" style="width: 19px;height: 19px;"/>
        </div>
        <div style="flex: 1;">

        </div>
        <div class="c1">
          <img class="c1-a-img" src="../../assets/image/auth/xuan2.png"/>
          <img class="" src="../../assets/image/auth/cuowu.png" style="width: 19px;height: 19px;"/>
        </div>
        <div style="flex: 1;"></div>
        <div class="c1">
          <img class="c1-a-img" src="../../assets/image/auth/xuan3.png"/>
          <img class="" src="../../assets/image/auth/cuowu.png" style="width: 19px;height: 19px;"/>

        </div>
      </div>
      <div class="rz" v-if="listDatas.status==0||listDatas.status==3" @click="submmitEvent">申请认证</div>
      <div style="width: 100%;height: 20px;"></div>

    </div>
     <!-- 给子组件绑定了一个 ref='controlChild'  -->
    <nationality-list ref='controlChild' @getName="getName" v-if="!disabled()"></nationality-list>
  </div>
</template>
<script lang="ts">
import nationalityList from './components/nationalityList.vue'
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast, closeToast } from 'vant';
import vnavibar from "../../components/vnavibar.vue"

import { defineComponent,reactive, ref,toRefs,onMounted, nextTick} from 'vue';
import {  requestDummy,requestUploadFile } from "../../api";

import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n' 
export default {
  components: { 
    vnavibar,
    nationalityList
  },
  setup(props:any,context:any) {

    const controlChild = ref(null) as any

    // const controlChild: any = 
    // ref<InstanceType<typeof nationalityList>>();
       
    //vue3没有this.$refs，所以要实例化,又refs函数所以使用要.value

    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      countryName: t("请选择国家"),
      countryCode: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input2: '',
      input3: '',
      fileList: [],
      fileList2: [],
      fileList3: [],
      shangchuanurl: '',
      shangchuanurl2:'',
      shangchuanurl3:'',
      status: '', // 0
      listDatas: {status:0}
    })

    const submmitEvent=()=>{
      // if (state.countryCode=== '') {
      //   showToast(t('请选择国籍'));
      //   return
      // }
      // if (state.input2=== '') {
      //   showToast(t('请输入真实姓名'));
      //   return
      // } 
      // if (state.input3=== '') {
      //   showToast(t('请输入号码'));
      //   return
      // }
      // if(state.fileList2.length==0||
      // state.fileList3.length==0||
      // state.fileList.length==0){
      //   showToast(t('请完善照片上传'));
      //   return
      // }
      var data = {
        nationality: state.countryCode,
        name: state.input2, 
        idnumber:state.input3,
        idimg_1:state.shangchuanurl,
        idimg_2:state.shangchuanurl2,
        idimg_3:state.shangchuanurl3
      }

      requestList()
      // location.reload();
      router.push('/authSucceed')

      // submmitPost(data).then(res => {
      //   // requestList()
      //   location.reload();
      // })

    }
    const requestList=() => {
      console.log('reqqqqq')
      nextTick(() => {
        //res.nationality是dialCode test:86 376
            
        // this.$refs.controlChild.getData('86')
        // vue3没有this.$refs，所以要实例化
        controlChild.value.getData('86')
      })
      // requestListPost({}).then(res => {
      //   console.log(res)
      //   this.listDatas = res
      //   if (res.status!==0){

          // this.$nextTick(() => {//res.nationality是dialCode
          //   this.$refs.controlChild.getData(res.nationality)
          // })
      //     this.input2 = res.name
      //     this.input3 = res.idnumber
      //     this.fileList.push({url:res.idimg_1_path})
      //     this.fileList2.push({url:res.idimg_2_path})
      //     this.fileList3.push({url:res.idimg_3_path})
      //   }

      // })
    }
    //打开国家列表底部弹窗
    const openEvent = () => {
      console.log(123)
      // if (!this.disabled()) {
        
        // this.$refs.controlChild.open()
        //vue3没有this.$refs，所以要实例化
        controlChild.value.openEvent()

      // }
    }
    const disabled =()  =>{ // 是否禁用按钮
      return ![0, 3, ''].includes(state.status)
    }
    //获取到当前选中国家的code值
    const getName =(params:any)=> {
      console.log('ddfdfd');
      console.log(params)
      state.countryName = params[0];
      state.countryCode = params[1];
    }

    const afterRead=(file:any)=> {
      console.log(file)
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      });
      let formData = new FormData();//通过formdata上传
      formData.append('file', file.file);

      // closeToast()
      requestUploadFile(formData).then((res:any) => {
        closeToast()
        state.shangchuanurl = res.message
      }).catch(function (err) {
        console.log(err)
        closeToast()
        showToast(t('添加失败'));
        state.fileList = []
      })
    }
    const afterRead2=(file:any)=> {
      console.log(file)
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      });
      let formData = new FormData();//通过formdata上传
      formData.append('file', file.file);

      // closeToast()
      requestUploadFile(formData).then((res:any) => {
        closeToast()
        state.shangchuanurl2 = res.message
      }).catch(function (err) {
        console.log(err)
        closeToast()
        showToast(t('添加失败'));
        state.fileList2 = []
      })
    }
    const afterRead3=(file:any)=> {
      console.log(file)
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      });
      let formData = new FormData();//通过formdata上传
      formData.append('file', file.file);

      // closeToast()
      requestUploadFile(formData).then((res:any) => {
        closeToast()
        state.shangchuanurl3 = res.message
      }).catch(function (err) {
        console.log(err)
        closeToast()
        showToast(t('添加失败'));
        state.fileList3 = []
      })
    }

    requestList()

    return {
      controlChild,
      ...toRefs(state),

      submmitEvent,

      openEvent,
      disabled,
      getName,


      afterRead3,
      afterRead2,
      afterRead,

    }
  } 
   
}
</script>


<style lang="scss" scoped>
.Authentication {
  width: 100%;
  min-height: 100%;

  .nr {
    padding: 0 15px;
    box-sizing: border-box;

    .t1 {
      text-align: left;
      margin-top: 20px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #333333;
      margin-bottom: 10px;
    }

    .shangchaun {
      width: 100%;
      display: flex;

      .c1 {
        margin-top: 6px;
        //width: 105px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //height: 105px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */

        text-align: center;

        /* 999 */

        color: #999999;

        .c1-a-img {
          margin-bottom: 15px;
          width: 99px;
          height: 64px;
        }
      }
    }

    .rz {
      margin-top: 60px;
      width: 344px;
      height: 44px;
      /* 主题色 */
      background: var(--cp-primary);
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      color: #FFFFFF;
    }

    .title{
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 16px;
        height: 16px;
      }
      .f1{
        flex: 1;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
      }
      .f2{
        margin-left: 6px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
    }
  }
}

.van-uploader__upload {
  width: 90px !important;
  height: 90px !important;
}
</style>
