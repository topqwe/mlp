<template>
  <div class="fPWReset">
    <vnavibar title='重置密码'/>
    <div style="width: 100%;height: 46px;"></div>
    <div class="nr">
      <div class="biaoti">{{ $t('原密码') }}</div>
      <div class="shuru">
        <el-input
            maxlength="6"
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="$t('请输入6位数数字原密码')"
            v-model="textField.input1"
            show-password
            clearable>
        </el-input>
      </div>
      <div class="biaoti">{{ $t('新密码') }}</div>
      <div class="shuru">
        <el-input
            maxlength="6"
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="$t('请输入6位数数字新密码')"
            v-model="textField.input2"
            show-password
            clearable>
        </el-input>
      </div>
      <div class="biaoti">{{ $t('再次输入新密码') }}</div>
      <div class="shuru">
        <el-input
            maxlength="6"
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="$t('请再次输入6位数数字新密码')"
            v-model="textField.input3"
            show-password
            clearable>
        </el-input>
      </div>
      <div class="submmitBtn" @click="submmitEvent">{{ $t('提交') }}</div>
    </div>
  </div>
</template>
<script lang="ts">  
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast,  } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
import vnavibar from "../../../components/vnavibar.vue"

export default {
  setup(){
    const { t, locale } = useI18n()
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      textField:{
        input1:'',
        input2:'',
        input3:'',
      }
    })

    const submmitEvent=()=>{ 
      if (state.textField.input1===''){
        showToast(t('请输入6位数数字原密码'));
        return
      }
      if (state.textField.input2===''){
        showToast(t('请输入6位数数字新密码'));
        return
      }
      if (state.textField.input3===''){
        showToast(t('请再次输入6位数数字新密码'));
        return
      }
      var data ={
        'old_safeword':state.textField.input1,
        'safeword':state.textField.input2,
        're_safeword':state.textField.input3,
      }
      showToast(t('修改成功'))
      router.push('/setting')
      // xiugai_zijinmima_post(data).then(res=>{
      //   console.log(res)
        // showToast(t('修改成功'));
        // router.push('/Setting')
      // })
    }
    return{
      ...toRefs(state),

      submmitEvent,
    }
  },
  components:{ 
    vnavibar
  }, 
   
}
 
</script>

<style lang="scss" scoped>
.fPWReset{
  width: 100%;
  .nr{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .biaoti{
    text-align: left;
      margin-top: 20px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #333333;
    }

    .shuru{
      width: 100%;
      margin-top: 5px;
    }
    .submmitBtn{
      margin-top: 20px;
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
  }
}
</style>
