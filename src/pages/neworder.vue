<template lang="html">
    <div class="">
      <mt-header title="订单页" fixed>
        <router-link to="/rooms" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content" v-if="orderInfo">
          <mt-cell title="订单号" :value="orderInfo.order_sn"></mt-cell>
          <ul>
            <li v-for="bed in orderInfo.beds">
              <mt-cell :title="bed.bed_name" :value="'￥'+bed.price/100"></mt-cell>
            </li>
          </ul>
          <mt-cell title="入住时间" :value="orderInfo.check_in"></mt-cell>
          <mt-cell title="退房时间" :value="orderInfo.check_out"></mt-cell>
          <mt-cell title="订单创建时间：" :value="orderInfo.create_time"></mt-cell>
          <mt-cell title="押金" :value="'￥'+orderInfo.deposit/100"></mt-cell>
          <mt-cell title="共计" :value="'￥'+orderInfo.total/100"></mt-cell>

      </div>
      <div class="time-count">
          请在{{timer}}秒内完成支付
      </div>
      <div class="footer">
        <mt-button type="primary" size="large" @click.native="pay">支 付</mt-button>
      </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data(){
    return{
      orderInfo:'',
      timer:300
    }
  },
  created(){
    var orderInfo = this.$store.getters.newOrderInfo;
    if(!this.$store.getters.getToken || !orderInfo){
      this.$router.push({path:'/'})
    }else{
      this.orderInfo = orderInfo;
      var t = setInterval(() => {
          if(this.timer > 0){
            this.timer--;
          }else{
            clearInterval(t)
          }
        },1000)
    }
  },
  methods:{
    pay(){
        var token = this.$store.getters.getToken;
        var pay_id = this.$store.getters.newOrderInfo.pay[0].pay_id;
        var order_sn = this.$store.getters.newOrderInfo.order_sn;
        var callback = 'http://pay.usian.cn/#/orderList';

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
    }
  }
}
</script>

<style lang="css">

.content{
  margin-top: 40px;
  text-align: left;
}

.footer{
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.footer button{
  width: 100%;
  border-radius: 0;
}
.time-count{
  text-align: center;
  color: red;
  margin-top: 10px;
}
</style>
