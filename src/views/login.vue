<template>
	<div id="logo">
      <div class="logo-content">
        <mt-field label="手机号" placeholder="请输入手机号" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="login-btn">
          <mt-button type="primary" size="large" @click.native="login">开启音乐之旅</mt-button>
          <span class="go-regin"><span @click="registered">没有账号?去注册</span></span>
        </div>
      </div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Indicator,Toast  } from 'mint-ui'
  export default {
    data(){
      return {
        username:15558588585,
        password:123456
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods:{
      registered(){
        this.$router.push({path: '/regin'});
      },
      login(){
        let _this = this;
        if(this.username == ""){
          Toast({
            message: '账号不能为空',
            position: 'middle',
            duration: 1000
          });
          return false;
        }else if(this.password == ""){
          Toast({
            message: '密码不能为空',
            position: 'middle',
            duration: 1000
          });
          return false;
        }
        for(let i = 0;i < this.user.length;i++){
          if(this.user[i].username == this.username&& this.user[i].password == this.password){
              Indicator.open({
                text: '登陆中...',
                spinnerType: 'snake'
              });
              localStorage.setItem('currentUser',this.username);
              setTimeout(function () {
                Indicator.close();
                _this.$router.push({path: '/home'});
              }, 1000);
          }else if(i == this.user.length-1&&this.user[i].username != this.username){
              Toast({
                message: '账号不存在',
                position: 'middle',
                duration: 1000
              });
          }else if(this.user[i].username == this.username&& this.user[i].password != this.password){
              Toast({
                message: '密码错误',
                position: 'middle',
                duration: 1000
              });
          }
        }
      }
    }
  }
</script>
<style>
  .mint-cell,input{
    background-color: transparent;
  }
</style>
<style scoped>
  #logo{
    height: 100%;
    background-image: url(../assets/images/kugou_bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .logo-content{
    height: 105px;
    width: 80%;
    position: absolute;
    bottom: 40%;
    left: 10%;
  }
  .login-btn{
    margin-top: 30px;
  }
  .go-regin{
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 15px 0; 
    color: #fff;
  }
</style>

