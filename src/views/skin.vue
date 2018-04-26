<template>
	<div class="skin">
		<!-- 皮肤种类 -->
		<div class="skin_p" :style="{backgroundColor:item.color}" v-for="(item,index) in listColor" :key="index" @click="selectTheme(item.select,index)">
			<span class="skip_select" v-if="item.select == true">使用</span>
			<span class="skip_name">{{item.name}}</span>
		</div>
	</div>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				selected:0,
				currentSelect:[]
			}
		},
		computed: {
	      ...mapGetters(['listColor'])
	    },
		created(){
		},
		mounted(){
		},
		methods: {
			selectTheme(select,index){//选择皮肤
				for(let i = 0;i < this.listColor.length;i++){
					if(index == i){
						this.listColor[i].select = true
					}else{
						this.listColor[i].select = false
					}
				}
				this.$store.commit('listColor', this.listColor);
			}
		}
	}
</script>
