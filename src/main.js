// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'

import './assets/css/common.css'
import './assets/js/setrem.js'

import { InfiniteScroll} from 'mint-ui';

Vue.use(InfiniteScroll);


Vue.use(MintUI)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//
//   if(!window.localStorage.token){
//     router.push({path:'/'})
//   }else {
//     if(to.path == '/neworder' && !store.getters.newOrderInfo){
//       router.push({path:'/'})
//     }
//   }
//   next();
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
