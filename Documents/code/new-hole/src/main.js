import Vue from 'vue'
import App from './App.vue'
import element from './utility/element';
import '@/assets/styles/element-variables.scss'
import 'windi.css';
import { VueMasonryPlugin } from 'vue-masonry';
import 'animate.css';
import router from '@/router'
import imagePath from '@/tool/resourceUrl'
import store from '@/store'


Vue.config.productionTip = false
Vue.prototype.$Url = imagePath
// element-ui 按需引入
element.map(e=>Vue.use(e))
// 引入瀑布流
Vue.use(VueMasonryPlugin)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
