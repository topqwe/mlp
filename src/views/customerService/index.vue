<template>
   <div class="service-box pb-150">
    <!-- v-if="route.path=='/customerService'" -->
      <vnavibar title='在线客服' />
      <!-- <van-nav-bar  :title="$t('在线客服')" left-arrow @click-left="onClickLeft" fixed /> -->
     <div style="width: 100%;height: 46px;"></div>
<!--      <div class="h-10 bg-grey w-full"></div> -->
      <div class="content">
        <div class="flex flex-col px-15 box-border">
            <div class="w-full py-10 text-grey text-center pt-100" @click="onMore" :style="{'visibility': finished ? 'hidden' : 'visiable'}" style="font-size: 14px;">
              {{ $t('历史消息') }}</div>
            <ul class="flex flex-col pt-20">
                <li v-for="(item,index) in listDatas" :key="item.id" class="flex flex-col mt-20">
                    <p class="font-26 text-center py-20 text-grey" v-if="showTime(index)" style="font-size: 14px;">{{item.createtime && item.createtime.split(' ')[0]}}</p>
                    <div class="flex" :class="item.send_receive === 'send' ? 'justify-end': ''">
                        <template v-if="item.send_receive === 'receive'" >
                            <img src="@/assets/image/service/responser.png" class="w-44 h-44 mr-10" />
                            <div class="responser bg-grey px-15 py-12 font-30 rounded-lg" style="font-size: 14px;" >
                                <p  class="break-word" style="max-width: 230px;" v-if="item.type === 'text'">{{item.content}}</p>
                                <img v-else :src="item.content" class="w-200 h-200" @click="onPreview(item.content)"/>
                            </div>
                        </template>
                        <div class="border-solid py-12 px-15 rounded-lg flex flex-col" v-else style="font-size: 14px;" >
                            <img :src="`${item.content}`" class="w-200 h-200"
                                v-if="item.type === 'img'" @click="onPreview(item.content)"/>
                            <p class="break-word" v-else style="max-width: 230px;">{{item.content}}</p>
                        </div>
                      <img v-if="item.send_receive === 'send'"  src="../../assets/image/head_default.png" style="width: 44px;height: 44px;margin-left: 10px;" />
                    </div>
                </li>
            </ul>
        </div>
      </div>
      <div class="bottom flex justify-between h-49 items-center w-full fixed bottom-0 border-t-grey px-10 box-border bg-white">
        <van-uploader :after-read="afterRead">
<!--          <van-uploader :after-read="afterRead" :capture="androidAttrs ? 'camera' : null" >-->
            <img src="@/assets/image/service/photo.png" class="w-24 h-24"/>
          </van-uploader>
        <input type="text" v-model="value" :placeholder="$t('请输入您的消息...')" class="flex-1 mx-20 h-full border-none" style="font-size: 14px;" />
<!--        <img src="@/assets/image/service/send.png" class="w-34 h-34" @click="send('text', value)"/>-->
        <div class="fasong" @click="sendEvent('text', value)">发送</div>
      </div>
   </div>
</template>

<script lang="ts">  
import vnavibar from "../../components/vnavibar.vue"
import { defineComponent,reactive, ref,toRefs,onBeforeUnmount,onMounted,watch, watchEffect} from 'vue';
import { requestDummy, requestUploadFile,
    getMsg, getUnreadMsg, sendMsg} from "../../api";
import { showToast,showLoadingToast,
    showSuccessToast,showFailToast, closeToast, ImagePreview } from 'vant';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router"; 
import { useI18n } from 'vue-i18n'  

export default {
  components: {
    vnavibar,
  }, 
    setup() {

    const { t, locale } = useI18n()
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
            listDatas: [] as any,
            value: ''  as any,
            lastMsgId: ''  as any,
            interval: null as any,
            unread: 0  as any,
            finished: false, // 没有历史消息
            androidAttrs:null as any,
            token_url : '' as any
   })

   const setBaseConfig=()=>{
    if (route.query.token){
        state.token_url = route.query.token
      }else {
        if (localStorage.getItem('token')) {
            state.token_url = localStorage.getItem('token')
        }
      }
      if (route.query.lang){

        if (route.query.lang=='cn'){ 

        }else {
            
        }
      }

      const model= navigator.userAgent;
        // 判断是否是安卓手机，是则是true
        state.androidAttrs=model.indexOf('Android') > -1 
    || model.indexOf('Linux') >-1

   }
   setBaseConfig()

        const onPreview =(url:any)=> { // 预览
                    ImagePreview([url])
                }

        const showTime =(index:any)=> { // 时间显示
            if (index === 0) {
                return true
            }
            if (index === state.listDatas.length - 1) {
                return false
            }
            if (state.listDatas[index].createtime.split(' ')[0] === 
            state.listDatas[index + 1].createtime.split(' ')[1]) {
                return false
            }
        }

        const afterRead =(file:any)=> { // 文件上传
             
            showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ""
      })
      let formData=new FormData();//通过formdata上传
      formData.append('file',file.file)

            requestUploadFile(file,).then(data => {
              // this.$toast('成功')
                closeToast()
                // this.sendEvent('img', data)
            }).catch((e) => {
              // this.$toast('失败')
              // this.$toast(e)
              closeToast()
            })
        }

        const fetchList=(message_id = '')=> { // 获取消息列表
            getMsg({token:state.token_url,message_id}).then((data: any) => { // this.lastMsgId
                if (data==null){
                  data = []  
                }
                if(!state.lastMsgId) {
                    state.lastMsgId = data.length && data[data.length -1]['id']
                }
                if(data.length) {
                    if (message_id) { // 加载更多
                        state.lastMsgId = data[data.length -1]['id']
                        state.listDatas = [...data.reverse(), ...state.listDatas]
                    } else  {
                        state.listDatas = [...state.listDatas, ...data.reverse()]
                        let hash = {};
                        state.listDatas = state.listDatas.reduce(function(preVal, curVal) {
                            hash[curVal.id] ? ' ' : hash[curVal.id] = true && preVal.push(curVal);
                            return preVal
                        }, []);
                    }
                    if (data.length < 10) {
                        state.finished = true
                    }
                } else  {
                    state.listDatas = [{id: '1', send_receive: 'receive', 
                    content: '你好，欢迎来到我们的平台！', type: 'text'}]
                }
                if (!message_id) {
                    clearInterval()
                    state.interval = setInterval(() => {
                        fetchList()
                    }, 1000)
                }
            })
        }

        const onMore=() =>{ // 加载更多
            fetchList(state.lastMsgId)
        }

        const clearInterval=(e?:any) =>{
            if(state.interval) {
                clearInterval(state.interval)
                state.interval = null
            }
        }
        const fetchUnread=() =>{ // 获取未读
            getUnreadMsg().then(data => {
                state.unread = data
                // console.log(data)
            })
        }
        
        const sendEvent =(type = 'text', content = '')=> { // 发送消息, img 也当消息text
            if (!content){
                showToast('请输入消息内容')
                return
            }
            sendMsg(type, content,state.token_url).then(data => {
                console.log(data)
                state.value = ''
                // document.getElementById('bottom').click()
                fetchList()
            })
        }
        const onClickLeft=()=> { // 返回
            history.back();
        }


        fetchList()

        onBeforeUnmount(() => {
            clearInterval(state.interval)
        }) 
        
        return {
            route,
            ...toRefs(state),
            onPreview,
            showTime,

            afterRead,
            onMore,
            clearInterval,
            fetchUnread,
            sendEvent,

            onClickLeft
        }
    }
 
}
</script>


<style lang="scss" scoped>
.break-word {
    word-break: break-all;
}
.max-w-230 {
    //max-width: 230px;
}
.responser {
    position: relative;
    //&::after {
    //    content: '';
    //    width:0;
    //    height:0;
    //    border-top:10px solid transparent;
    //    border-bottom:10px solid transparent;
    //    border-right:20px solid #f3f3f3;
    //    position: absolute;
    //    left: -20px;
    //    top: 20px;
    //}
}
.fasong{
  width: 74px;
  height: 34px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 34px;
  text-align: center;
  color: #FFFFFF;
  background: #1552F0;
  border-radius: 45px;
}
</style>
