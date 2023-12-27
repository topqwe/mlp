<template>
  <div class="accountList">
    <vnavibar title='账户管理' />
    <div style="width: 100%;height: 46px;"></div>
    <div class="accountList-padding">
      <van-swipe-cell  v-for="(item,index) in listDatas" :key="index">
      <div class="dizhi " :class="'c'+Math.ceil(Math.random()*4)">

        <div class="title">
          <div class="van-ellipsis t1">{{item.name}}</div>
          <div class="t2"  v-if="item.use == 1">Default</div>
        </div>
        <div class="Number">
          <div class="xh">* * * *</div>
          <div class="xh">* * * *</div>
          <div class="xh">* * * *</div>
          <div class="xh" style="line-height: 22px;">{{item.name.substring(item.name.length-4, item.name.length)}}</div>
        </div>
      </div>
        <template #right>
          <van-button square :text="$t('删除')" type="danger" @click="deleteEvent(item.id)" class="delete-button" />
          <van-button square type="primary" :text="$t('修改')" @click="pushDetail(item.id)" class="delete-button" />
        </template>
      </van-swipe-cell>

      <router-link to="/accountDetails">
      <div class="zengjia">
        <img class="zengjia-icon" src="../../../assets/image/public/addIcon.png">
        <div class="title">{{ $t('新增') }}</div>
      </div>
      </router-link>

    </div>
    <div style="width: 100%;height: 120px;"></div>
  </div>
</template>
<script lang="ts">
import vnavibar from "../../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import {  requestDummy } from "../../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast,  } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'  

export default {
  setup(){
    const { t, locale } = useI18n()
    const store = useStore();
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
            'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
        }
        customList.push(vv)
      }
    const state = reactive({
      listDatas:[] as any
    })

    const pushDetail=(e:any)=>{
      showToast(e.toString())
      router.push('/accountDetails?id='+e)
    }
    const deleteEvent=(e:any)=>{
      for(var i=0;i<state.listDatas.length;i++){
        if(e==state.listDatas[i].id){
          state.listDatas.splice(i,1)
        }
      }
      // p_method_del_action_post({id:e}).then(res=>{
      //   console.log(res)
      //   Toast(this.$t('成功'));
      //   this.requestList()
      // })
    }
    const requestList =()=>{
      state.listDatas = state.listDatas.concat(customList)
      // p_method_list_action_post().then(res=>{
      //   console.log(res)
      //   this.listDatas = res.pageList
      // })
    }

    requestList()
    return{
      ...toRefs(state),
      pushDetail,
      deleteEvent,
    }
  },
  components:{
    vnavibar
  },
   
}
</script>
<style lang="scss" scoped>
.accountList{
  width: 100%;
  min-height: 100%;
  .accountList-padding{
    padding: 0 15px;
    box-sizing: border-box;
  }
  .dizhi{
    margin-top: 15px;
    padding: 18px 20px;
    box-sizing: border-box;
    border-radius: 6px;
    .title{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      //line-height: 16px;
      color: #FFFFFF;
      display: flex;
      justify-content: start;
      align-items: center;
      .t1{
        flex: 1;
      }
      .t2{
        margin-left: 10px;
        //width: 47px;
        //height: 18px;
        //background: #FFFFFF;
        border-radius: 2px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        /* identical to box height */


        //color: #FF5252;

      }
      .c00{
        color: #FF5252;
      }
      .c01{
        color: #FF5252;
      }
      .c02{
        color: #426AB0;
      }
      .c03{
        color: #19B092;
      }
      .c04{
        color: #4378FF;
      }
    }
    .Number{
      margin-top: 20px;
      display: flex;
      //align-items: center;
      .xh{
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        //line-height: 23px;

        /* ffff */

        color: #FFFFFF;

        margin-right: 20px;
      }
    }
  }
  .c0{
    background: #FF5252;
  }
  .c1{
    background: #FF5252;
  }
  .c2{
    background: #426AB0;
  }
  .c3{
    background: #19B092;
  }
  .c4{
    background: #4378FF;
  }
  .zengjia{
    margin-top: 20px;
    width: 100%;
    height: 44px;
    border: 1px solid var(--cp-primary);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    .zengjia-icon{
      width: 16px;
      height: 16px;
    }
    .title{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      /* identical to box height, or 100% */


      /* 主题色 */

      color: var(--cp-primary);
      margin-left: 9px;

    }

  }
}
</style>
<style>
.delete-button {
  height: 100%;
}
</style>
