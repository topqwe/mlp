<template>
      
 <div class="language">
    <vnavibar title= '语言设置'/>

   <div style="width: 100%;height: 46px;"></div>
   <div class="segmentation-max"></div>
   <button @click="changeLang('zh_CN')">中文</button>
 <button @click="changeLang('en_US')">英文</button>
 
 <div>
<el-button @click="changeLang('zh_CN')">点击切换中文</el-button>
<el-button @click="changeLang('en_US')">点击切换英文</el-button>
</div>
    <div v-for="(item,index) in state.option" :key="index" class="lang-padding" @click="changeLang(item.key)">
      <!-- <img class="lang-icon" src="../../assets/image/me/invest.png"/> -->
      <!-- <div class="lang-icon"> -->
        <img class="lang-icon" v-if="item.key==='en_US'" src="../../assets/image/public/english.png">
      <img class="lang-icon" v-else src="../../assets/image/public/china.png">
      <!-- </div> -->
      
      <div class="lang-title">{{item.title}}</div>
      <div class="lang-flex"></div>
      <img v-if="item.key==$i18n.locale" src="../../assets/image/public/checked.png" style="width: 20px;height: 20px;"/>
    </div>

  </div>
  <!-- "item.key==$i18n.locale" -->
 
       

            <!-- v-model="state.currentLang" -->
    <el-select @change="changeLang" v-model=$i18n.locale placeholder=$i18n.locale>
        <el-option
            v-for="item in state.option"
            :key="item.key"
            :label="item.title"
            :value="item.key"
        ></el-option>
    </el-select>  
       
</template>

<script lang="ts" setup="props">
import vnavibar from "../../components/vnavibar.vue"
// import { useI18n } from 'vue-i18n'
// const {locale:i18nL} = useI18()
// const toggle = (languageKey)=>{ 
// }
// import { computed } from 'vue'
// import { useI18n } from 'vue-i18n'

// const { locale } = useI18n() // 先调用此方法，然后再使用
// const changeLang = (lang: string) => {
//   locale.value = lang
//   localStorage.setItem('lang', lang)
// }
// const getCurrentLang = computed(() => {
//   return locale.value
// })
// import vnavibar from "../../components/vnavibar.vue"
import { useRouter } from "vue-router";
const router = useRouter();
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()
const { t, locale } = useI18n()

 
const changeLang = (val:string):void => {
  //  = (e) => {
  // locale.value = e.target.value
 
    console.log(23333, val, locale)
    // i18n.global.locale.value = e
    // 刷新当前页面 不然有的时候国际化不生效
    locale.value = val 
    localStorage.setItem('language', val)
    // location.reload()
    history.go(-1)
}
 const onClickLeft  = () =>{
      // console.log(this.$i18n.locale)
      // history.go(-1) 
      // 判断历史记录中是否有回退
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
      // this.$route.replace('/') 
    }

// const langList = [
//         {title: 'English',key: 'en_US'}
//         {title:'繁体中文',key: 'zh_CN'},
//       ]
const state = reactive({
    option: [
        {
          key: 'zh_CN',
          title: '中文',
        },
        {
          key: 'en_US',
          title: 'English',
        },
         
    ],
    currentLang: 'zh_CN'
})
 
 

</script>

<style scoped> 
.segmentation-max{
  width: 100%;
  height: 20px;
  background: #F5F5F5;
}
.lang-padding{
  padding: 15px 15px 15px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #E5E7ED;
  font-weight: 400;
  font-size: 35px;
  color: #000000;
  display: flex;
}
.lang-flex{
  flex: 1;
}
.lang-title{
  flex: 1;
        text-align: left;
  font-size: 14px;
}

.lang-icon {
  /* padding: 0 15px;
    box-sizing: border-box;

    img {
      height: 20px;
      width: 100%;
    } */
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
</style>