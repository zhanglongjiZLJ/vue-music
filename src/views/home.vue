<template>
	<div class="content">
    <!-- 头部 -->
    <Top/>
    <!-- 内容区域 -->
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部播放器 -->
    <Player />
    <!-- 播放器详情 -->
  	<DetailPlayer />
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Top from '../components/header/Head'
  import Player from '../components/Player'
  import DetailPlayer from '../components/DetailPlayer'
  export default {
    computed: {
      ...mapGetters(['isPlay'])
    },
    components: {
      Top, Player, DetailPlayer
    }
  }
</script>
<style>
  .content{
    height: 100%;
    position: relative;
  }
  .main{
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    width:100%;
  }
</style>

