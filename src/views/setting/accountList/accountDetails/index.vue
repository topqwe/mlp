<template>
  <div class="AddressDetails">
    <vnavibar title='账户' />
    <div style="width: 100%;height: 46px;"></div>
    <div class="nr"> 
      <div class="biaoti">{{ $t('真实姓名（仅支持本人）') }}</div>
      <div class="shuru">
        <el-input

            :placeholder="$t('请输入真实姓名')"
            maxlength="50"
            disabled
            v-model="textField.input1"
            clearable>
        </el-input>
      </div>
      <div class="biaoti">{{ $t('名称') }}</div>
      <div class="shuru">
        <el-input

            :placeholder="$t('请输入名称')"
            maxlength="50"
            v-model="textField.input2"
            clearable>
        </el-input>
      </div>
      <div class="biaoti">{{ $t('卡号') }}</div>
      <div class="shuru">
        <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="$t('请输入卡号')"
            maxlength="50"
            v-model="textField.input3"
            clearable>
        </el-input>
      </div>
      <div class="moren">
        <div style="flex: 1;">{{ $t('设为默认收款账户') }}</div>
        <van-switch v-model="checked" size="20px" />
      </div>
      <div class="tijiao" @click="submmitEvent">{{ $t('提交') }}</div>
    </div>
  </div>
</template>
<script lang="ts"> 
import vnavibar from "../../../../components/vnavibar.vue" 
import {nextTick,  defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast,  } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'   
 
export default {
  setup() {
    const { t, locale } = useI18n()
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const customList = Array()

      for (var i = 0; i < 3; i++) {
        var vv = {
            'content':'abcdfgdfdgdgdgd',
            'name':i===0?'abcdfg':'dfeeedgff',
            'id':i,
            'use':i,
            'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
            'iconImg':
            'https://cn.vuejs.org/assets/lifecycle.16e4c08e.png',
        }
        customList.push(vv)
      }

    const state = reactive({
      textField:{
        input1:'',
        input2:'',
        input3:'',
      },
      checked:true,
      listDatas:[] as any, 
    })

    const requestList=()=> {
      if(route.query.id){//编辑
        
        nextTick(() => {//异步更新 永远固定
          state.textField.input1 = 'dsef'
        })
        
        state.listDatas = state.listDatas.concat(customList)

        for(var i=0;i<state.listDatas.length;i++){
        if(route.query.id==state.listDatas[i].id){
          state.textField.input1 = state.listDatas[i]['name']
            state.textField.input2 = state.listDatas[i]['name']
            state.textField.input3 = state.listDatas[i]['id']
            state.checked = state.listDatas[i]['use'] == 0 ? false : true
        }
      }


      // p_method_list_action_post({}).then(res => {
      //   console.log(res) 
      //   for (let i = 0; i < res.pageList.length; i++) {
      //     state.listDatas.push({
      //       'id': i,
      //       'name': res.pageList[i]['contacts'],
      //       'tel': res.pageList[i]['phone'],
      //       'address': res.pageList[i]['address'],
      //       'isDefault': res.pageList[i]['use'] == 0 ? false : true,
      //       'id2':res.pageList[i]['id']
      //     })
      //     if (route.query.id==res.pageList[i]['id']){
            
      //       state.textField.input1 = res.pageList[i]['contacts']
      //       state.textField.input2 = res.pageList[i]['bankName']
      //       state.textField.input3 = res.pageList[i]['bankAccount']
      //       state.checked = res.pageList[i]['use'] == 0 ? false : true
      //     }
      //   }
      // })

      

    }
    } 

    const submmitEvent=()=>{
      if (route.query.id){
        var data = {
        'realName':state.textField.input1,
        'bankName':state.textField.input2,
        'bankAccount':state.textField.input3,
        'use':state.checked?1:0,
        'id':route.query.id
        }
      showSuccessToast(t('编辑成功'))
      history.go(-1)
      // p_method_edit_action_post(data).then(res=>{
      //   console.log(res)
      //   Toast(this.$t('成功'));
      //   history.go(-1)
      // })

      }
      
      else {
        var data2 = {
        'realName':state.textField.input1,
        'bankName':state.textField.input2,
        'bankAccount':state.textField.input3,
        'use':state.checked?1:0
        }
      showSuccessToast(t('新增成功'))
      history.go(-1)
      // p_method_add_action_post(data).then(res=>{
      //   console.log(res)
      //   Toast(this.$t('成功'));
      //   history.go(-1)
      // })
      }

    }


    requestList()

    return{
      ...toRefs(state),

      submmitEvent
    }
    
  },

   
  components:{ 
    vnavibar
  },
   
}
</script>
<style lang="scss" scoped>
.AddressDetails{
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
    .tijiao{
      margin-top: 20px;
      width: 100%;
      height: 44px;
      background: #1552F0;
      border-radius: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 44px;
      /* identical to box height, or 100% */

      text-align: center;

      color: #FFFFFF;
    }
    .moren{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #333333;
      margin-top: 22px;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style>
.van-switch--on{
  background-color: #1552F0!important;
}
</style>