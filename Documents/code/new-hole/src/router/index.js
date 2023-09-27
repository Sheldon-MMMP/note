import router from 'vue-router';
import Vue from 'vue'
import holeHome from '@/pages/tabBar/compnents/hole-home.vue'
import tabRouter from '@/pages/tabBar/tab-router.vue'
import holeGift from '@/pages/tabBar/compnents/hole-gift.vue'
import holeUser from '@/pages/tabBar/compnents/hole-user.vue'
import clerkDetail from '@/pages/clerk/clerkDetail.vue'
import errPage from '@/pages/error/err-page.vue'
import orderList from '@/pages/order/order-list.vue'
import clerkApplication from '@/pages/clerk/application-clerk.vue'
import * as path from "./path"
import store from '@/store';
Vue.use(router)


const routes = [
  {
    path: '/',
    name: '/init',
    component: tabRouter,
    redirect: path.homePath,
    meta: {
      keepAlive: true, //此组件需要被缓存
    },
    children: [
      {
        path: path.homePath,
        component: holeHome,
        name: path.homePath,
        meta: {
          keepAlive: true, //此组件需要被缓存
        }
      },
      {
        path: path.giftPath,
        name: path.giftPath,
        component: holeGift,
        meta: {
          keepAlive: true, //此组件需要被缓存
        }
      },
      { path: path.userPath, name: path.userPath, component: holeUser }
    ],
  },
  {
    name: path.clerkDetailPath,
    path: path.clerkDetailPath,
    component: clerkDetail,
  },
  {
    name: path.errPath,
    path: path.errPath,
    component: errPage
  },
  {
    name: path.orderListPath,
    path: path.orderListPath,
    component: orderList
  },
  {
    name: path.orderMenuPath,
    path: path.orderMenuPath,
    component: () => import("@/pages/order/order-menu.vue")
  },
  {
    name: path.clerkApplicationPath,
    path: path.clerkApplicationPath,
    component: clerkApplication,
    redirect: path.clerkApplicationBasicPath,
    children: [
      {
        path: path.clerkApplicationBasicPath,
        name: path.clerkApplicationBasicPath,
        component: () => import("@/pages/clerk/components/basic-info.vue")
      },
      {
        path: path.clerkApplicationWorkPath,
        name: path.clerkApplicationWorkPath,
        component: () => import("@/pages/clerk/components/work-info.vue")
      },
      {
        path: path.clerkApplicationFilesPath,
        name: path.clerkApplicationFilesPath,
        component: () => import("@/pages/clerk/components/files-info.vue")
      }
    ],
  },
  {
    name: path.searchPagePath,
    path: path.searchPagePath,
    component: () => import("@/pages/search/search-page.vue")
  },
  {
    path:path.orderTakePath,
    name:path.orderTakePath,
    component :()=>import('@/pages/order/order-take.vue')
  }
]

export default new router({
  routes,
  // 对于页面跳转，全部都返回到页面顶部。
  scrollBehavior(to, from, savedPosition) {
    if(to.name!==from.name){
      store.dispatch("setParams", to.params)
    }
    return { x: 0, y: 0 };
  },
})
