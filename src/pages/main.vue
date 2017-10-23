<template lang="html">
  <div class="main-page">
    <mt-header title="积云招待处" fixed>
      <router-link to="/mine" slot="left">
        <mt-button >
          <img style="width:20px;" src="../assets/mine.png" alt="">
        </mt-button>
      </router-link>
    </mt-header>

    <div class="content-block" @click="openCheckin">
      入住时间：{{check_in_time | date}}
    </div>
    <div class="content-block" @click="openCheckout">
      退房时间：{{check_out_time | date }}
    </div>
    <mt-datetime-picker
      v-model="check_in_time"
      ref="check_in_time"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirmCheckin"
      @cancel="cancelCheckin"
      style="z-index:9999"
    />
    <mt-datetime-picker
      v-model="check_out_time"
      ref="check_out_time"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirmCheckout"
      @cancel="cancelCheckout"
      style="z-index:9999"
    />

    <mt-button type="primary" size="large" style="margin-top:20px;" @click.native="checkRoom">查询房间</mt-button>
  </div>
</template>

<script>

import { Indicator,Toast } from 'mint-ui';

export default {
  data:function(){
    return{
      check_in_time : new Date,
      check_out_time : new Date,
      roomList:[],
      hasRoom: false,
      time_before:''
    }
  },
  created:function(){
    var iy = this.check_in_time.getFullYear();
    var im = this.check_in_time.getMonth() + 1;
    var id = this.check_in_time.getDate();
    this.check_in_time =  iy + '-' + im + '-' + id;

    var oy = this.check_out_time.getFullYear();
    var om = this.check_out_time.getMonth() + 1;
    var od = this.check_out_time.getDate() + 1;
    this.check_out_time =  oy + '-' + om + '-' + od;
  },
  filters:{
      date: function(ele){
        var date = new Date(ele);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        return year + '-' + month + '-' + day;
      }
  },
  computed: {
    checkInTime(){
        var y = this.check_in_time.getFullYear();
        var m = this.check_in_time.getMonth() + 1;
        var d = this.check_in_time.getDate();
        return y + '-' + m + '-' + d;
    },
    checkOutTime(){
        var y = this.check_out_time.getFullYear();
        var m = this.check_out_time.getMonth() + 1;
        var d = this.check_out_time.getDate();
        return y + '-' + m + '-' + d;
    }
  },
  methods: {
      openCheckin() {
        this.time_before = this.check_in_time;
        this.$refs.check_in_time.open();
      },
      openCheckout() {
        this.time_before = this.check_out_time;
        this.$refs.check_out_time.open();
      },
      cancelCheckin(){
        this.check_in_time = this.time_before;
      },
      cancelCheckout(){
        this.check_out_time = this.time_before;
      },
      checkRoom() {

         Indicator.open();
          this.$store.dispatch('checkRoom',{
            token: this.$store.getters.getToken,
            check_in_time: this.checkInTime,
            check_out_time: this.checkOutTime
          })
          .then( (res) => {
              Indicator.close();
              if(res.data.message == 'ok'){

                var checkInTime = this.checkInTime;
                var checkOutTime = this.checkOutTime;
                this.$store.dispatch('setRooms',{
                  rooms:res.data.info.rooms,
                  checkInTime:checkInTime,
                  checkOutTime:checkOutTime
                })
                this.hasRoom = true;
                this.$router.push({path:'rooms'})
              }else {
                Toast({
                  message: res.data.message,
                  duration: 1000
                });
              }
          })
      },
      confirmCheckin(date){
        this.check_in_time = date;
      },
      confirmCheckout(date){
        this.check_out_time = date;
      }
    }
}
</script>

<style lang="css">
.main-page{
  padding: 15px;
  margin-top: 50px;
}
.content-block{
  width: 9rem;
  height: 1.5rem;
  background-color: #fff;
  margin: 0px auto;
  line-height: 1.5rem;
  font-size: 0.5rem;
  margin-bottom: 10px;
}
input{
  font-size: 0.5rem;
  text-align: center;
}
.mint-popup{
  z-index: 9999;
}
</style>
