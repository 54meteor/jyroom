<template lang="html">
    <div class="container">

      <mt-header title="房间列表" fixed>
        <router-link to="/main" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>

      <div class="content">
          <ul v-infinite-scroll="loadMore"
              infinite-scroll-distance="10">
            <li v-for="room in renderList">
                <mt-checklist
                :title="room.room_name"
                v-model="bed_selected_lists"
                align="right"
                :options="room.beds.map((bed)=> ({label:bed.bed_name+' ' + '￥'+bed.price/100,value:bed.bed_id}))">
                </mt-checklist>
            </li>
          </ul>

      </div>
      <div class="footer">
          <mt-button  type="primary" size="large" @click.native="reservation">订房</mt-button>
      </div>
    </div>
</template>

<script>

import { Indicator,Toast } from 'mint-ui';
export default {
  data(){
    return {
      renderList:[],
      bed_selected_lists:[],
      page:0,
      pageSize:5
    }
  },
  mounted(){

    var rooms = this.$store.getters.getRooms;
    if(!rooms || rooms.length == 0){
      this.$router.push({path:'/'})
    }else {
      var rooms = this.$store.getters.getRooms;
      this.renderList = rooms.splice(0,this.page+this.pageSize)
    }

  },
  methods:{
    reservation(){

      var token = this.$store.getters.getToken;
      var check_in_time = this.$store.getters.getCheckTime.check_in_time;
      var check_out_time = this.$store.getters.getCheckTime.check_out_time;
      var beds = this.bed_selected_lists;

      var params = {token,check_in_time,check_out_time,beds}
      this.$store.dispatch('reservation',params)
      .then( (res) => {
          if(res.data.message == 'ok'){
              this.$store.dispatch('saveOrder',res.data.info);
              this.$router.push({path:'neworder'})
          }else {
            Toast({
              message: res.data.message,
              duration: 1000
            });
          }
      })
    },
    loadMore(){
      console.log('>>load more...')

      var rooms = this.$store.getters.getRooms;
      if(this.page < rooms.length){
        this.page += this.pageSize;
        Indicator.open();
        setTimeout(() => {
          this.renderList = rooms.slice(0,this.page);
          Indicator.close();
        },500)
      }else{
        Toast({
          message: '没有更多房间啦 😁',
          duration: 1500
        });
      }
    }
  }
}
</script>

<style lang="css" scoped>

.container{
  width: 100%;height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  margin-top: 40px;
  overflow: scroll;
  text-align: left;
}
.content ul{
  width: 9.5rem;
  margin: 0 auto;
  padding-bottom: 2rem;;
}
.content ul li{
  background-color: #fff;
  margin-bottom: 10px;
}
.mint-checklist{
  padding-top: 5px;
}
.mint-checklist label{
  font-size: 16px;
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
  margin:0 auto;
}
</style>
