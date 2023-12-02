<template>
<div class="qa">
    <vnavibar title='问题'></vnavibar>

    <div style="width: 100%;height: 46px;"></div>

    <van-collapse accordion :border="true" v-model="activeNames" >
        <van-collapse-item :title='item.title' :name='item.id' icon="question-o" v-for="(item,index) in listDatas" :key=index>
            
            <div slot="title">oo<van-icon name="shop-o" /></div>
            <ul class="flex flex-col">
                
                <li v-for="(_item, _index) in item.content" :key="_index" class="mb-32">{{_item}}</li>
            </ul>
        </van-collapse-item>
    </van-collapse>


    <!-- <van-collapse v-model="activeNames">
  <van-collapse-item title="标题1" name=1>
    代码是写出来给人看的，附带能在机器上运行。
  </van-collapse-item>
  <van-collapse-item title="标题2" name=2>
    技术无非就是那些开发它的人的共同灵魂。
  </van-collapse-item>
  <van-collapse-item title="标题3" name=3>
    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
  </van-collapse-item>
</van-collapse> -->

</div>
</template>

<script lang="ts"> 
import vnavibar from "../../components/vnavibar.vue" 
import { defineComponent,reactive, ref,toRefs,onMounted} from 'vue';
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast } from 'vant';  
export default {
    components: { 
        vnavibar 
    },
     
    setup() { 
        //动态接口更新导航标题<vnavibar :title=title></vnavibar>
            //写死<vnavibar title='问题'></vnavibar>
            // title:'fgfdgfdgfd', 
            // const activeNames = ref(['3']);
       const state = reactive({
        listDatas: [
        { id: 1, title: '1.能做什麼？', content: ['您代码是写出来给人看的，附带能在机器上运行。']},
        { id: 2, title: '2.安全嗎？', content: ['技术无非就是那些开发它的人的共同灵魂。']},
        { id: 3, title: '3.如何加入？', content: ['在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。']},
         
          ],
        activeNames: ['1']
         
       })     
            
        return {
            // activeNames,
            ...toRefs(state),
        }
    }
}
</script>