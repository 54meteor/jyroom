<template lang="html">

  <div class="container">
    <mt-header title="个人中心" fixed>
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="content-panel">
        <img src="../assets/ava.jpeg" alt="">
        <h3>O(∩_∩)O哈哈哈~</h3>
    </div>
    <mt-cell
    title="订单"
    to="orderList"
    is-link
    style="margin-top:10px;text-align:left;">
      <img slot="icon" src="../assets/order-b.png" width="24" height="24">
    </mt-cell>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" >
.container{
  padding: 0;
  margin: 0;
  margin-top: 40px;
}

.content-panel{
  width: 100%;
  height: 3rem;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.content-panel img{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

</style>
