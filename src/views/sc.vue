<template>
	<div class="sc-info-list" v-if="this.songList.length>0">
		<!-- 收藏歌曲列表 -->
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
    <div class="sc-null" v-else>
    	暂无收藏
    </div>
</template>

<script type="es6">
	import {mapGetters} from 'vuex'
	import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins'
	export default {
		mixins: [PLAY_AUDIO],
		data(){
			return {
				
			}
		},
		computed: {
	      ...mapGetters(['songList']),
	    },
		created(){
		},
		mounted(){
			console.log(this.songList)
		},
		methods: {
			
		}
	}
</script>
<style>
	.sc-null{
		text-align: center;
		padding:20px; 
	}
</style>
