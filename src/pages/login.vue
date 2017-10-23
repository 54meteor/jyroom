<template lang="html">
  <div class="login-page">
    <div class="cover">
      <img src="../assets/jylogo.png" alt="">
      <mt-field  label="用户名" placeholder="请输入用户名..." v-model="username"></mt-field>
      <mt-field  label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" size="large" style="margin-top:20px;" @click.native="login">登 录</mt-button>
    </div>
  </div>
</template>

<script>

export default {
  data:function(){
    return{
      username:'',
      password:''
    }
  },
  mounted: function(){

    var token = this.$store.getters.getToken;
    if(token != 'undefined' && token != '' && token != null){
      this.$router.push({path:'main'})
    }
  },
  methods:{
    login(){
      var username = this.username;
      var password = this.password;
        if(username != '' && password !=''){
          this.$store.dispatch('login',{
            username,password
          })
          .then( (res) => {
            console.log(res)
              if(res.data.message == 'ok'){
                this.$store.dispatch('setToken',res.data.info.token)
                this.$router.push({
                  path:'main'
                })
              }
          })
        }

    }
  }
}
</script>

<style lang="css" scoped>
.login-page{
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: solid 1px #fff;
}
.cover{
  width: 9rem;
  margin: 3rem auto;
}

</style>
