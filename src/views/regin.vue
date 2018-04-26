<template>
	<div id="regin">
      <div class="regin-content">
        <mt-field label="手机号" placeholder="请输入手机号" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="regin-btn">
          <mt-button type="primary" size="large" @click.native="regin">注册</mt-button>
          <span class="go-login"><span @click="go_login">去登录</span></span>
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
        username:'',
        password:''
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods:{
      go_login(){
        this.$router.push({path: '/'});
      },
      regin(){
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
          if(this.user[i].username == this.username){
              Indicator.open({
                text: '该账号已存在'
              });
              setTimeout(function () {
                Indicator.close();
              }, 1000);
              return false;
          }else{
              Indicator.open({
                text: '注册成功'
              });
              this.user.push({
                username:this.username,
                password:this.password
              })
              this.$store.commit('user', this.user)
              console.log(this.user)
              setTimeout(function () {
                Indicator.close();
                _this.$router.push({path: '/'});
              }, 1000);
              return false;
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
  #regin{
    height: 100%;
    background-image: url(../assets/images/kugou_bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .regin-content{
    height: 105px;
    width: 80%;
    position: absolute;
    bottom: 40%;
    left: 10%;
  }
  .regin-btn{
    margin-top: 30px;
  }
  .go-login{
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 15px 0; 
    color: #fff;
  }
</style>

