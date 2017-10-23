<template lang="html">
  <div class="container">
    <mt-header title="订单列表" fixed>
      <router-link to="/mine" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">

        <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore">
          <ul class="orders"
          v-infinite-scroll="loadMore"
          infinite-scroll-distance="10">
            <li v-for="order in orderList" class="order-item">
              <mt-cell title="订单号：" :value="order.order_sn"></mt-cell>
              <mt-cell title="创建时间：" :value="order.create_time"></mt-cell>
              <mt-cell title="入住时间：" :value="order.check_in"></mt-cell>
              <mt-cell title="退房时间：" :value="order.check_out"></mt-cell>
              <ul>
                <li v-for="bed in order.beds">
                  <mt-cell :title="bed.bed_name" :value="'￥'+bed.price/100"></mt-cell>
                </li>
              </ul>
              <mt-cell title="押金：" :value="'￥'+order.deposit/100"></mt-cell>
              <mt-cell title="共计：" :value="'￥'+order.total/100"></mt-cell>
              <mt-cell title="状态：" :value="order.status | status"></mt-cell>
              <mt-cell title="申请退房" v-if="order.status=='close' || order.status=='pay'">
                <mt-button type="primary" @click.native="settleAccounts(order.order_sn)">退房</mt-button>
              </mt-cell>
              <mt-cell title="支付" v-if="order.status=='new'">
                <mt-button type="primary" @click.native="settlepay(order.order_sn)">支付</mt-button>
              </mt-cell>
            </li>
          </ul>
        </mt-loadmore>

    </div>
  </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui';
export default {
  data(){
    return{
      orderList:null,
      loading:false,
      page:0,
      pageSize:5,
      allLoaded:false,
      enter:0,
      spage:0,
      hasNext:null
    }
  },
  created(){
    if(!this.$store.getters.getToken){
      this.$router.push({path:'/'})
    }else {
      this.getOrders()
    }
  },
  filters:{
    status(ele){
      switch (ele) {
        case 'new':
          return '待支付'
          break;
        case 'pay':
          return '已支付'
          break;
        case 'close':
          return '已入住'
          break;
        case 'cancel':
          return '已取消'
          break;
        case "settlement":
          return '已退房'
        default: return '';
      }
    }
  },
  methods:{
    settleAccounts(order_sn){
      var token = this.$store.getters.getToken;
      this.$store.dispatch('settleAccounts',{
          token,order_sn
      })
      .then((res) => {

          Toast({
            message: '退房成功！',
            duration: 1000
          });

          this.getOrders();
      })
    },
    settlepay(order_sn){
        var token = this.$store.getters.getToken;
        //支付方式  写死了！！！！！！！
        var pay_id =1;
        var callback = 'http://pay.usian.cn/success.html';
        this.$store.dispatch('pay',{token,pay_id,order_sn,callback})
        .then((res) => {
          if(res.data.message=='ok'){
              window.location.href = res.data.info.pay_url
          }else {
            Toast({
              message: res.data.message,
              duration: 1000
            });
          }
        })
    },
    loadMore(){
      if(this.enter === 1){
        console.log('load more...<<<<')
        this.page += this.pageSize;
        var orders = this.$store.getters.orders;
        if(orders){
          if(this.page < orders.length){
            Indicator.open();
            setTimeout(() => {
              this.orderList = orders.slice(0,this.page);
              Indicator.close();
            },500)
          }else{
            Toast({
              message: '没有更多订单啦 😊',
              duration: 1000
            });
            console.log(this.page)
          }
        }
      }
    },
    getOrders(fn){
      console.log('get orders--->>>')
        Indicator.open();
        this.$store.dispatch('getOrderList',this.spage)
        .then((res) =>{
          Indicator.close();
          if(res.data.message == 'ok'){
            console.log(res)
            this.orderList = res.data.info.ordres.slice(0,5);
            this.$store.dispatch('saveOrders',res.data.info.ordres)
            if(typeof fn == 'function'){
              fn();
            }
            this.enter = 1;
            this.hasNext = res.data.info.hasNext;
          }else {
            Toast({
              message: res.data.message,
              duration: 1000
            });
          }
        })
    },
    loadTop(){
        // console.log('load top...')
        this.getOrders(this.$refs.loadmore.onTopLoaded);

    },
    loadBottom(){
        console.log('load bottom...')
    }
  }
}
</script>

<style lang="css">
.container{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: 40px;
  text-align: left;
}
.content .orders{
  width: 9.5rem;
  margin: 0 auto;
  margin-bottom: 50px;
}
.order-item{
  margin-bottom: 10px;
}
</style>
