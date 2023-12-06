import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
    path: '/',
    redirect:'/home',
    component: () => import('../views/index.vue'),
    children:[
        // {
        //     path:'/',
        //     name:'index',/* index */
        //     // redirect:'/home',
        //     component:()=>import('../views/home/index.vue')
        // },
        {
            path:'/home',
            // meta:{
            //   title:'首页',
            //   index: 0,
            // },
            component:()=>import('../views/home/index.vue')
        },
        {
            path:'/invest',
            component:()=>import('../views/invest/index.vue')
        },
        
        {
            path:'/mall',
            component:() => import('../views/mall/index.vue')
        }, 
        {
          path:'/task',
          component:() => import('../views/task/index.vue')
        },
        
        {
          path:'/introduceweb',
          component:() => import('../views/introduceweb/index.vue')
        },
        {
            path:'/me',
            component:() => import('../views/me/index.vue')
        },
        
    ]
},
// {
//   path: '*',
//   redirect: '/home'
// },
  {
    path: "/home",
    // name: "Home", //和index 的要不一样
    component: () => import("../views/home/index.vue"),
  },
  {
    path:'/taskDetails',
    component:() => import('../views/task/taskDetails/index.vue')
  },
  {
    
    path:'/mallDetails',
    component:() => import('@/views/mall/mallDetails/index.vue')
  },
  {
    
    path:'/mallPay',
    component:() => import('@/views/mall/mallPay/index.vue')
  },
  {
    
    path:'/mallResult',
    component:() => import('@/views/mall/mallResult/index.vue')
  },

  {
    
    path:'/investDetails',
    component:() => import('@/views/invest/investDetails/index.vue')
  },
  {
    path:'/investPay',
    component:() => import('@/views/invest/investPay/index.vue')
  },
  {
    path:'/investResult',
    component:() => import('@/views/invest/investResult/index.vue')
  },
  {
    path:'/investResultInfo',
    component:() => import('@/views/invest/investResultInfo/index.vue')
  },
  {
    path:'/stateExp',
    component:() => import('../views/stateExp/index.vue')
  },
  {
    path:'/news',
    component:() => import('@/views/news/index.vue')
  },
  {
    path:'/otc',
    component:() => import('@/views/otc/index.vue')
  },
  {
    path:'/otcRecordList',
    component:() => import('@/views/otc/recordList/index.vue')
  },
  {
    
    // path:'/newsDetails/:id',
    //刷新详情详情页面会丢失，要在router配id传下去
    path:'/newsDetails',
    component:() => import('@/views/news/details/index.vue')
  },
  { 
    path:'/rechargeList',
    component:() => import('@/views/recharge/list/index.vue')
  },
  {
    path:'/recharge',
    component:() => import('@/views/recharge/index.vue')
  },
  {
    path:'/rechRecord',
    component:() => import('@/views/recharge/rechRecord/index.vue')
  },
  {
    path:'/rechRecordDetails',
    component:() => import('@/views/recharge/rechRecordDetails/index.vue')
  },
  {
  path:'/succeed',
  component:() => import('@/views/succeed/index.vue')
  },
  {
    path:'/members',
    component:() => import('@/views/members/index.vue')
  },
  {
    path:'/membership',
    component:() => import('@/views/membership/index.vue')
  },
  {
    path:'/inviteFriends',
    component:() => import('@/views/inviteFriends/index.vue')
  },
  {
    path:'/qa',
    component:() => import('../views/qa/index.vue')
  },
  {
    path:'/aboutUs',
    component:() => import('../views/aboutUs/index.vue')
  },
  {
    path:'/appDownload',
    component:() => import('../views/appDownload/index.vue')
  },
  {
    path:'/howTo',
    component:() => import('../views/howTo/index.vue')
  },
  {
    path:'/transRecord',
    component:() => import('@/views/transRecord/index.vue')
  },
  {
    path: "/language",
    component: () => import("../views/language/index.vue"),
  },
  { //客服
    path: '/customerService',
    component: () => import('@/views/customerService/index.vue')
  },
  { //客服 引导
    path: '/customerServiceIndex',
    component: () => import('@/views/customerServiceIndex/index.vue')
  },
  {
    path:'/setting',
    component:() => import('@/views/setting/index.vue')
  },
  {
    path:'/loginPWReset',
    component:() => import('@/views/setting/loginPWReset/index.vue')
  },
  {
    path:'/fPWReset',
    component:() => import('@/views/setting/fPWReset/index.vue')
  },
  {
    path:'/accountList',
    component:() => import('@/views/setting/accountList/index.vue')
  },
  {
    path:'/accountDetails',
    component:() => import('@/views/setting/accountList/accountDetails/index.vue')
  },
  { 
    path:'/authenticate',
    component:() => import('@/views/authenticate/index.vue')
  },
  { 
    path:'/authSucceed',
    component:() => import('@/views/authenticate/authSucceed.vue')
  },
  {
    path: "/register",
    component: () => import("../views/register/index.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;

// 用来做一些进入页面的配置与限制
router.beforeEach((to, from, next) => {
  console.log({ to, from })
  /*路由发生改变修改页面的title */
  // if (to.meta.title) {
	// document.title = to.meta.title.toString()
  // }else{
	document.title = "小鱼"
  // } 
  //白名单
  if (to.path === '/register')  next()
  if (to.path === '/customerService')  next()
  if (to.path === '/customerServiceIndex')  next()
  if (to.path === '/language')  next()
  if (to.path === '/login')  next()
    if (!localStorage.getItem('token')) {
      next({ path: '/login' })
    } else {
      console.log('ok')
      next()
    }
  /*判断路由是否需要权限才能进入，即路由拦截 */
  // if(to.meta.needLogin){
	// if(localStorage.getItem('token')){ //从vuex里面获取userId
	//   next()
	// }else{
	//   next({path:'/login'})
	// }
  // // }
  // next();
});