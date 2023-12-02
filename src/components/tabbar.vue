<script setup> 
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
const  router = useRouter(); 
let styleclass = ref({
  "margin-top": "5px",
  "color":"#666666"

})
let styleclass1 = ref({
  "margin-top": "5px",
  "color":"blue"

})


let itemck = (item, index) => {
     for(let i=0;i< itemtab.length;i++){
       itemtab[i].active=false;
     }
      item.active=true;
     if(item.routerpath!=""){
    router.replace(item.routerpath)
     }
  document.title = item.text
}
const  getimg=(name)=>{//此方法必须有，传递图片地址
  return new URL(`/src/assets/${name}`, import.meta.url).href
}
let itemtab = reactive([{
  // ../../assets/image/bottom/home.png
  unurl: getimg("image/bottom/home.png"),//未选中图片地址
  url:getimg("image/bottom/home2.png")//选中图片地址
  ,
  text: "首页",//单项模块名
  active: true,//是否为选中状态
  badage:10,//角标
  routerpath:"/home"
}, 
{
  unurl: getimg("image/bottom/chongzhi.png"),
  url:getimg("image/bottom/chongzhi2.png")
  ,
  text: "投资",
  active: false,
  badage:0,
  routerpath:"/invest"
}, 
{
  unurl: getimg("image/bottom/renwu.png"),
  url:getimg("image/bottom/renwu2.png"),
  text: "商城",
  active: false,
  badage:0,
  routerpath:"/mall"

},
{
  unurl: getimg("image/bottom/introduce.png"),
  url:getimg("image/bottom/introduce2.png"),
  text: "介绍",
  active: false,
  badage:0,
  routerpath:"/introduceweb"

},
{
  unurl: getimg("image/bottom/wode.png"),
  url:getimg("image/bottom/wode2.png"),
  text: "我的",
  active: false,
  badage:0,
  routerpath:"/me"

}, 
]);


</script>

<template>
  <div class="posi">
    <div class="view"></div>
    <div class="posi_content">

      <div class="item" v-for="(item,index) in itemtab" :key="index" @click="itemck(item,index)">
        <div class="badgenum"  v-show="item.badage==0?false:true">{{item.badage}}</div>
        <img class="imgitem" :src="item.active?item.url:item.unurl"/>
        <div  :style="item.active?styleclass1:styleclass">{{ $t(item.text) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgitem {
  height: 30px;
  width: 30px;
}

.posi {
  background: #ffffff;
  z-index: 9999;
  width: 100vw;
  height: 80px;
  position: fixed;
  bottom: 0;
}

.posi_content {
  display: flex;
  flex-direction: row;

}

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #666666;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.view {
  height: .5px;
  width: 100%;
  background: blue;
  position: absolute;
  top: 0;
}
.badgenum {
  font-size: 13px;
  text-align: center;
  min-width: 25px;
  line-height: 20px;
  color: #ffffff;
  background: red;
  border-radius:  50% ;
  position: absolute;
  right: 20px;
  top:0
}
.nonebage{
  display: none;
}
</style>