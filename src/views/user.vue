<template>
  <div class="user">
    <div>
      <!-- 当前用户图像 -->
      <span class="user-img"></span>
    </div>
    <!-- 当前用户账号 -->
    <div class="user-name">
      <span>{{currentUser}}</span>
    </div>
    <div class="user-exit">
      <mt-button type="danger" size="large" @click.native="exit">退出</mt-button>
    </div>
  </div>
</template>
<script type="es6">
import Vue from 'vue'
  import { Button  } from 'mint-ui'
  Vue.component(Button.name, Button);
  export default {
    // mixins: [PLAY_AUDIO],
    data(){
      return {
        currentUser:localStorage.getItem("currentUser")||''//设置当前账号
      }
    },
    methods: {
      exit(){//退出
        this.$router.push({path: '/'});
        localStorage.clear("currentUser");
      }
    }
  }
</script>
<style>
  .user-img{
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../assets/images/user.jpg) no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
    border:1px solid #ccc;
  }
  .user{
    text-align: center;
  }
  .user-name{
    margin-top: 20px;
  }
  .user-exit{
    margin-top: 150px;
  }
</style>
