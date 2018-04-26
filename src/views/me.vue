<template>
	<div class="me">
		<div class="me-menu">
			<mt-cell  v-for="(item,index) in meList" :title="item.name" is-link :to="item.path" :key="index" @click.native="selectMe(index)">
			</mt-cell>
		</div>
		<div class="me-content">
			<!-- 我的页面路由部分 -->
			<keep-alive>
		        <router-view></router-view>
		     </keep-alive>
		</div>
	</div>
</template>

<script type="es6">
	import skin from './skin'
	import sc from './sc'
	export default {
		data(){
			return {
				meList: [
					{
						name:'用户'
					},{
						name:'皮肤'
					},{
						name:'收藏'
					}
				]
			}
		},
		created(){
		},
		methods: {
			selectMe(index){
				switch (index){
					case 0:
					// 路由到用户
						this.$router.push({path: '/me'});
						break;
					case 1:
					//路由到皮肤
						this.$router.push({path: '/me/skin'});
						break;
					case 2:
					//路由到收藏
						this.$router.push({path: '/me/sc'});
						break;
				}
			}
		},
		components: {
	      skin,sc
	    }
	}
</script>
<style>
	.me{
		height: 100%;
		position: relative;
	}
	.me-menu{
		display: inline-block;
		width: 30%;
		vertical-align: top;	
	}
	.me-content{
		position: absolute;
		top: 0;
		left: 30%;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		vertical-align: top;
		border-left:1px solid #ccc;
	}
</style>

