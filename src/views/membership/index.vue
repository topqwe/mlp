<template>
  <div class="mall">
    <vnavibar title= 'VIP'/>
     
    <div style="width: 100%;height: 46px;"></div>
<!--    {{$route.path}}-->
    <div class="tuanduimingxi">
      <div class="l1">
        <div class="text">{{ $t('AA') }}</div>
        <div class="nr">{{ my_vip_action.vip_level }}</div>
      </div>
      <div class="r1">
        <div class="text">{{ $t('BB') }}</div>
        <div class="nr">{{ my_vip_action.subCount }}</div>
      </div>

    </div>
    <div class="tuanduimingxi">
      <div class="l1">
        <div class="text">{{ $t('CC') }}</div>
        <div class="nr">{{ my_vip_action.subSales }}</div>
      </div>
      <div class="r1">
        <div class="text">{{ $t('DD') }}</div>
        <div class="nr">{{ (my_vip_action.rebate1*100).toFixed(2) }}%</div>
      </div>
    </div> 


    <div style="width: 100%;background: #EFF2F6;height: 8px;"></div>
    
    
    <div style="padding: 0 15px;box-sizing: border-box;">
    <div class="biao-ti" style="margin-top: 20px;">1.{{ $t('Vip') }}</div>
    </div>
    <el-table
        :data="my_configs_action"
        style="width: 100%">
      <el-table-column
          min-width="70"
          prop="name"
          :label="$t('AA')"
         >
      </el-table-column>
      <el-table-column
          min-width="90"
          prop="subCount"
          :label="$t('BB')"
          >
      </el-table-column>
      <el-table-column
          min-width="120"
          prop="subSales"
          :label="$t('CC')">
      </el-table-column>
      <el-table-column
          min-width="90"
          prop="rebate1"
          :label="$t('DD')">
      </el-table-column>
      <el-table-column
          min-width="90"
          prop="rebate1"
          :label="$t('EE')">
      </el-table-column>
       
    </el-table>
    <div style="width: 100%;background: #EFF2F6;height: 8px;"></div>
    <div style="padding: 0 15px;box-sizing: border-box;">


    <div class="biao-ti" style="margin-top: 20px;">2.{{ $t('Title') }}</div>
    <div class="nr">{{ $t('*Content') }}</div>
    <div class="biao-ti" style="margin-top: 30px;">2.1 title</div>
    <div class="nr">{{ $t('content') }}</div>
    </div>
    <div style="width: 100%;height: 50px;"></div>
<!--     <div style="width: 100%;background: #EFF2F6;height: 50px;"></div>-->
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue'
import vnavibar from "../../components/vnavibar.vue" 
import { useI18n } from 'vue-i18n'

export default {
  components:{
    vnavibar,
  },
  setup(){ 
    const state = reactive({
      active:0,
       
      my_vip_action:{} as any ,
      my_configs_action:[] as any
    })

    const requsetData =()=>{
      state.my_vip_action =
         {'vip_level':'23',},
      
      
      state.my_configs_action =[
        {'name':'dgdge',}
      ]

    }
    requsetData()

    return{
      ...toRefs(state)
    }
  },
 
  
}
</script>

<style lang="scss" scoped>
.mall{
  position: relative;
  //background: #EFF2F7;
  min-height: 100%;
  font-size: 14px;
  //padding: 0 15px;
  //box-sizing: border-box;
  .tuanduimingxi {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;

    .l1 {
      flex: 1;
      padding: 18px 0;
      box-sizing: border-box;
      border-right: 1px solid #F6F6F6;
      border-bottom: 1px solid #F6F6F6;
    }

    .r1 {
      flex: 1;
      padding: 18px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #F6F6F6;
    }

    .text {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height */
      color: #999999;
    }

    .nr {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
      margin-top: 10px;
    }
  }
  .biao-ti{
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    color: #000000;
    margin-bottom: 12px;
  }
  .nr{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #000000;

  }
}
</style>
<style>
.invest [class*=van-hairline]::after{
  border:none;
}
.el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell{
  border-bottom:none!important;
}
.el-table th.el-table__cell > .cell{
  font-size: 12px!important;
  color: #999999!important;
}
</style>
