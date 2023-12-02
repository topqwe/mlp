<template>
    
   <div class="authSucceed">
        <vnavibar title='成功'/>
        <div style="width: 100%;height: 55px;"></div>
        <!-- <div class="flex flex-col px-30 justify-center items-center pt-124"> -->
            <img src="../../assets/image/public/chengong.png" style="height: 48px;width: 48px;"/>
            <div class="font-55 text-black mt-55">{{ $t('提交成功') }}</div>
            <div class="font-26 text-grey mt-23">{{$t('您的资料已经成功上传！')}}</div>
            <div style="width: 100%;height: 55px;"></div>
            <button class="" @click="$router.go(-1)" style="height: 40px;width: 150px;">{{ $t('返回') }} </button>
        <!-- </div> -->
   </div>
</template>

<script lang="ts" setup>
import vnavibar from "../../components/vnavibar.vue"  
</script>
<style lang="scss" scoped>
.authSucceed{
    width: 100%;
    box-sizing: border-box;
}
</style>
