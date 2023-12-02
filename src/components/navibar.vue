<script setup>

import {reactive,ref} from "vue";

const config = reactive({
  backimgshow:true,
  rightimgshow:false,
  // upWidth: config.upimgshow===true? ref('30px') : ref('0px'),
  
})
// const rightOpacity= config.rightimgshow==true? ref(1) : ref(0)

let back = ()=>{
  $router.back()
alert("返回")
}

let up = ()=>{
alert("前进")
}
</script>

<template>
  <div style="position: fixed;top: 0;z-index: 998">
  <div class="actionbar">
    <div class="sc">
    <img src="~@/assets/image/public/arrow_left.png" class="bk" @click="back()" v-show="config.backimgshow"/>
      <div class="titletv" v-bind:margin-right="config.rightimgshow==true?('45px'):('0px')">
      <slot name="title"></slot>
      </div>
      <img src="~@/assets/image/public/arrow_right.png" 
      class="up" @click="up()" v-show="config.rightimgshow"  
       
      />
    </div>
  </div>
  </div>
</template>

<style scoped>
.titletv{
  flex: 1;
  /* margin-left: 30px;*/
  /* margin-right: 30px;  */
  /* display: flex; */
  text-align: center;
}
.sc{
  width: 100vw;
  height: 45px;
  display: flex;
  align-items: center;
}
.actionbar {
  text-align: center;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 45px;
  background: rgb(228, 203, 194);
  font-size: 18px;
  color: white;
}
.bk{
  width: 30px;
  height: 30px;
  margin-left: 15px;

}
.up{
  /* opacity:v-bind(rightOpacity); */
  width:30px;
  height: 30px;
  margin-right:15px;

}



</style>