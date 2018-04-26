import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
	{
		path: '/',
		component: require('../views/login'),//第一次进去为登录页
	},{
		path: '/regin',
		component: require('../views/regin'),//注册页
	},{
		path: '/detailplayer',
		component: require('../components/detailplayer'),//音乐详情
	},{
		path: '/home',
		component: require('../views/home'),//首页
		children:[
			{
				path: '/',
				component: require('../views/NewSongs')//新隔夜
				
			},{
				path: '/rank',
				component: require('../views/Rank')//排行页
			}, {
				path: '/plist',
				component: require('../views/Plist')//推荐页
			}, {
				path: '/singer',
				component: require('../views/Singer')//歌手页
			}, {
				path: '/search',
				component: require('../views/Search')//搜索页
			}, {
				path: '/me',
				component: require('../views/Me'),//我的页
				children:[
					{
						path: '/',
						component: require('../views/user')//用户
					},{
						path: '/me/skin',
						component: require('../views/Skin')//皮肤
					},
					{
						path: '/me/sc',
						component: require('../views/sc')//收藏
					}
				]
			}, {
				path: '/rank/info/:id',
				component: require('../views/RankInfo')//排行歌曲
			}, {
				path: '/plist/info/:id',
				component: require('../views/PlistInfo')//推荐歌曲
			}, {
				path: '/singer/list/:id',
				component: require('../views/SingerList')//歌手分类列表
			}, {
				path: '/singer/info/:id',
				component: require('../views/SingerInfo')//歌手列表详情
			}, {
				path: '*', redirect: '/'
			}
		]
	}]
})

export default router
