import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/login'
import MainPage from '@/pages/main'
import MinePage from '@/pages/mine'
import OrderListPage from '@/pages/orderList'
import NewOrderPage from '@/pages/neworder'
import RoomsPage from '@/pages/rooms'

Vue.use(Router)

var router =  new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/rooms',
      name: 'RoomsPage',
      component: RoomsPage
    },
    {
      path: '/mine',
      name: 'MinePage',
      component: MinePage
    },
    {
      path: '/orderList',
      name: 'OrderListPage',
      component: OrderListPage
    },
    {
      path: '/neworder',
      name: 'NewOrderPage',
      component: NewOrderPage
    }
  ]
})

export default router;
