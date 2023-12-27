<template>
  <div class="transRecord">


    <van-nav-bar
        fixed
        :title="$t('记录')"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="filter-o" size="18" />

      </template>
    </van-nav-bar>

    <!-- <vnavibar
      title='记录'
      right-text='筛选'
      @click-right="onClickRight"
    > -->

    <!-- <div slot="right"><slot name="screen">默认内容</slot></div> -->
    <!-- <van-icon name="filter-o" size="18" slot="right" /> -->
    <!-- <template #right>
        <van-icon name="filter-o" size="18" />
      </template> -->

  <!-- </vnavibar> -->

    <!-- <div style="width: 100%;height: 46px;"></div> -->
    <!-- <div class="nr"> -->

      <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('没有更多了')"
            @load="onLoad"
        >
          <div v-for="(item,index) in listDatas" 
          :key="index">

          <div class="liebiao"  >
            <img v-if=" 
             item.id==1
            ||item.id==2
            " 
            class="liebiao-img" 
            src="../../assets/image/public/in.png" />

            <img v-else class="liebiao-img" src="../../assets/image/public/out.png" />
            <div class="liebiao-xinxi">
              <div class="title">{{item.name}}</div>
              <div class="time">{{ item.name }}</div>
            </div>
            <div v-if="

            item.id==1
            ||item.id==2
            " 
            
            class="jine-lv">+{{item.prize}}</div>
            <div v-else class="jine-hong">{{item.amount}}</div>

          </div>
            <div style="width: 100%;height: 1px;background: #F6F6F6;"></div>
       </div>
        </van-list>
      </van-pull-refresh>
    <!-- </div> -->

    <!-- :columns-field-names="customPickData" -->
      <!-- v-model="selectedValues" -->
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            show-toolbar

        :columns="pickList"
        @confirm="onConfirm"
        @cancel="onCancel"
    />
    <!-- @change="onChange" -->
    <!-- :default-index="shaixuan_index" -->
    </van-popup>


  </div>
</template>

<script lang="ts"> 
import vnavibar from "../../components/vnavibar.vue"
import { defineComponent,reactive, ref,toRefs,onMounted,} from 'vue';
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

    const customList = Array()

    for (var i = 0; i < 3; i++) {
      var vv = {
        'children':customList0,
          'content':'abcdfgdfdgdgdgd',
          'name':i===0?'abcdfg':'dfeeedgff',
          'id':i,
          'prize':9009+i,'progress':i===0?0.18:0.9,'isSellOut':i,
          'iconImg':
          'https://cn.vuejs.org/assets/lifecycle.DLmSwRQE.png',
      }
      customList.push(vv)
    }
    const state = reactive({
      listDatas: [] as any,
      loading: false,
      finished: false,
      refreshing: false,
      page_no:0,

      pickDatas: ['','aa',
      'bb','cc', ],

      pickedPara:'' as any,

      pickList: [] as any,
      showPicker:false,
      // shaixuan_index:0
    })
    
    
    const getPickDatas=()=>{

var pickLis = [
      t('全部'),t('AA'), 
      t('BB'),t('CC'), 
      ]
// state.pickDatas = state.pickDatas.concat(customList) 
for (var i = 0;i<pickLis.length;i++){
  state.pickList.push({
      text:pickLis[i],
      value:i,
    })
    
  }
  // console.log(state.pickList)

// p_method_list_action_post().then(res=>{
//   console.log(res)
//   this.pickDatas = res.pageList
//   for (var i = 0;i<res.pageList.length;i++){
//     this.pickList.push(res.pageList[i].name)
//   }
// })
}

getPickDatas()

    const onRefresh = () => {
      //第一次列表不执行，下啦执行
      // showToast('onRefresh')
      // 清空列表数据
      state.finished = false;
      state.page_no = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      
      onLoad()
 
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
      
    }

    const requestList = () => {
      state.page_no++
      var data = {
        'pageNum': state.page_no,
        'pageSize': 10,
        'baseId': state.pickedPara,
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

    const onConfirm =({ selectedOptions }:any)=> {
      // { selectedValues }//value要赋值
      showToast(`当前值：${selectedOptions[0].text}
      ,当前索引：${selectedOptions[0].value}`);
      // ,当前索引：${selectedValues.join(',')}

      //text
      // state.pickedPara =  `${selectedValues}`

      //value
      state.pickedPara = state.pickDatas[Number(`${selectedOptions[0].value}`)]
      // state.pickDatas[index]
      
      state.page_no = 0
      state.finished = false;
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      requestList()
      state.showPicker = false
      state.listDatas = [];
      
    }
    
    const onCancel=() =>{
      state.showPicker = false 
    } 


    
    const onClickLeft=() =>{
      history.go(-1)
    }
    const onClickRight=() => {
      state.showPicker = true
    } 

    return {
      ...toRefs(state),
      getPickDatas,
      onRefresh,
      onLoad,

      onConfirm,
      onCancel,
 

      onClickLeft,
      onClickRight,
    }

  }
   
};
</script>
<style lang="scss" scoped>
.transRecord{
  width: 100%;
  height: 100%;
   
  .liebiao{
    border-radius: 6px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    .liebiao-img{
      width: 20px;
      height: 20px;
    }
    .liebiao-xinxi{
      margin-left: 15px;
      .title{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #000000;
      }
      .time{
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        /* identical to box height */
        color: #999999;
        margin-top: 8px;
      }
    }
    .jine-hong{
      flex: 1;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: right;
      color: #FF4141;
    }
    .jine-lv{
      flex: 1;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: right;
      color: #0ECB81;
    }
  }
  
}
</style>

