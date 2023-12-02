<template>
  <div class="introduce-layout">
    <iframe :src="weblink" scrolling="auto" frameborder="0" class="nq-ys"></iframe>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs} from 'vue';
import {  requestDummy } from "../../api";
export default {
  setup() {
    const state = reactive({
      weblink:''
    })
    // const requestX =()=>{
      requestDummy().then((res: any) => { 
      state.weblink =  
      'https://www.baidu.com/'
});
    // }
    // requestX()
    
    return {
      ...toRefs(state), 
      
    }
  },
 
}
</script>
<style lang="scss" scoped>
.introduce-layout{
  width: 100%;
  height: 100%;
  .nq-ys{
    width: 100%;
    height: 100%;
  }

}
</style>
<style>
/*- scrollbar -*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb{
  background-color: #999;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:vertical:hover{
  background-color: #666;
}
::-webkit-scrollbar-thumb:vertical:active{
  background-color: #333;
}
::-webkit-scrollbar-button{
  display: none;
}
::-webkit-scrollbar-track{
  background-color: #f1f1f1;
}
</style>