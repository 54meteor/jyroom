import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex);

var store =  new Vuex.Store({
  // state 保存数据
  state:{
      username: '',
      token: '',
      rooms: [],
      check_in_time: null,
      check_out_time: null,
      newOrderInfo: null,
      orders:null
  },
  // mutations 中修改数据
  mutations:{
      setToken(state,token){
          state.token = token;
          window.localStorage.token = token;
      },
      setRooms(state,params){
        state.rooms = params.rooms;
        state.check_in_time = params.checkInTime;
        state.check_out_time = params.checkOutTime;
      },
      saveOrder(state,info){
        state.newOrderInfo = info;
      },
      saveOrders(state,orders){
        state.orders = orders;
      }
  },
  // 提交mutations
  actions:{
      login({commit},params){
        return axios.post('http://pay.usian.cn/api/user/login.html',qs.stringify({
          username:params.username,
          password:params.password
        }))
      },
      setToken({commit},token){
        commit('setToken',token)
      },
      checkRoom({commit},params){

        return axios.post('http://pay.usian.cn/Api/Room/check.html',qs.stringify({
          token: params.token,
          check_in_time: params.check_in_time,
          check_out_time: params.check_out_time
        }))
      },
      setRooms({commit},params){
          commit('setRooms',params)
      },
      reservation( {commit,state},params){

          return axios.post('http://pay.usian.cn/Api/Order/create.html',qs.stringify({
            token:params.token,
            check_in_time:params.check_in_time,
            check_out_time:params.check_out_time,
            beds:params.beds
          }))
      },
      saveOrder( { commit } ,info){
        commit('saveOrder',info)
      },
      pay({commit},params){
        console.log(params)
        return axios.post('http://pay.usian.cn/Api/OrderPay/create.html',qs.stringify({
          token:params.token,
          pay_id:params.pay_id,
          order_sn:params.order_sn,
          callback:params.callback
        }))
      },
      getOrderList({state},page){
        return axios.post('http://pay.usian.cn/Api/OrderQuery/query.html',qs.stringify({
          token:state.token,
          page:page
        }))
      },
      saveOrders({commit},orders){
        commit('saveOrders',orders)
      },
      settleAccounts({commit},params){
        return axios.post('http://pay.usian.cn/Api/OrderRefund/finish.html',qs.stringify({
          token: params.token,
          order_sn: params.order_sn
        }))
      }

  },
  //获取状态
  getters:{
      getToken: ( state ) => state.token,
      getRooms: ( state ) => state.rooms,
      getCheckTime: ( state ) => ({check_in_time:state.check_in_time,check_out_time:state.check_out_time}),
      newOrderInfo: (state) => state.newOrderInfo,
      orders: (state) => state.orders

  }
})

if(window.localStorage){
  var token = window.localStorage.token;
  if(token){
    store.dispatch('setToken',token)
  }else {
    store.dispatch('setToken','')
  }
}

export default store;
