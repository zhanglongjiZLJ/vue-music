/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user:[//注册过的用户
			{
				username:15558588585,
				password:123456
			}
		],
		songList:[],//存储歌曲
		currentSong:'',//当前歌曲
		is_collection:false,//是否收藏
		listColor: [//皮肤
			{
				select:true,
				color: '#2CA2F9',
				name: '天空蓝'
			},{
				select:false,
				color: '#ff4949',
				name: '经典红'
			},{
				select:false,
				color: '#66b969',
				name: '草原绿'
			},{
				select:false,
				color: '#EE82EE',
				name: '少女粉'
			}
			,{
				select:false,
				color: '#A9A9A9',
				name: '雾霾灰'
			}
			,{
				select:false,
				color: '#000',
				name: '精湛黑'
			}
		],
		firstPlay:false,//第一次播放
		audio: {
			songUrl: '',
			imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			title: '',
			singer: '',
			currentLength: 0,
			songLength: 0,
			currentFlag: false
		},
		head: {//标题颜色
			toggle: false,
			title: '',
			style: {'background': 'rgba(43,162,251,0)'}
		},
		headNav: 'head-nav1',//默认头部导航
		audioLoadding: false,//歌曲加载
		detailPlayerFlag: false,//歌曲详情是否展示
		showPlayer: false,//底部播放器是否显示
		listenCount: 0,
		isPlay: true,//是否播放
		listInfo: {
			songList: [],
			songIndex: 0
		}
	},
	getters: {
		user:state => state.user,//用户
		songList:state => state.songList,//歌曲列表
		currentSong:state => state.currentSong,//当前歌曲
		is_collection:state => state.is_collection,//收藏
		listColor:state => state.listColor,//皮肤颜色
		firstPlay:state => state.firstPlay,//第一次播放
		headNav: state => state.headNav,//默认导航
		audio: state => state.audio,//当前歌曲
		head: state => state.head,
		audioLoadding: state => state.audioLoadding,//歌曲加载
		detailPlayerFlag: state => state.detailPlayerFlag,//歌曲详情
		showPlayer: state => state.showPlayer,//底部播放显示
		isPlay: state => state.isPlay//是否播放
	},
	mutations: {//该模块为提交改变的state
		user(state,user){//提交当前用户
			state.user = user
		},
		songList(state,songList){//提交歌曲列表
			state.songList = songList
		},
		currentSong(state,currentSong){//提交当前歌曲
			state.currentSong = currentSong
		},
		is_collection(state,is_collection){//提交是否收藏
			state.is_collection = is_collection
		},
		listColor(state,listColor){//提交皮肤颜色
			state.listColor = listColor
		},
		firstPlay(state,firstPlay){//提交是否第一次播放
			state.firstPlay = firstPlay
		},
		setAudio(state, audio){
			if (!state.listenCount) {
				state.showPlayer = true  //首次进入应用时不可打开播放详情
			}
			state.listenCount++
			state.audio = {...(state.audio), ...audio}
		},
		setAudioTime(state, time){//歌曲当前播放进度
			state.audio.currentLength = time
		},
		setCurrent(state, flag){
			state.audio.currentFlag = flag
		},
		showHead(state, flag){
			state.head.toggle = flag
		},
		setHeadTitle(state, title){
			state.head.title = title
		},
		setHeadStyle(state, style){//标题颜色
			state.head.style = style
		},
		resetHeadStyle: state => {
			state.head.style = {'background': 'rgba(43,162,251,0)'}
		},
		toggleAudioLoadding: (state, flag) => {
			state.audioLoadding = flag
		},
		setHeadNav: (state, nav) => {
			state.headNav = nav
		},
		showDetailPlayer: (state, flag) => {//歌曲详情
			state.detailPlayerFlag = flag
		},
		showPlayer: (state, flag) => {//底部播放器
			state.showPlayer = flag
		},
		isPlay: (state, flag) => {//是否播放
			state.isPlay = flag
		},
		setLrc: (state, lrc) => {//设置歌词
			state.audio = {...(state.audio), lrc}
		},
		setListInfo: (state, {list, index}) => {
			state.listInfo.songList = list
			state.listInfo.songIndex = index
		}
	},
	actions: {//同mutations异步提交
		user({dispatch, state}){
			dispatch('user', user)
		},
		songList({dispatch, state}){
			dispatch('songList', songList)
		},
		currentSong({dispatch, state}){
			dispatch('currentSong', currentSong)
		},
		firstPlay({dispatch, state}){
			dispatch('firstPlay', firstPlay)
		},
		listColor({dispatch, state}){
			dispatch('listColor', listColor)
		},
		getSong({commit, state}, hash){
			commit('toggleAudioLoadding', true)
			axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
				data = data.data
				const songUrl = data.play_url
				const imgUrl = data.img
				const title = data.audio_name
				const songLength = data.timelength / 1000
				const singer = data.author_name
				const currentLength = 0;
				const lrc = data.lyrics
				const	audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
				commit('setAudio', audio)
				commit('setLrc', lrc)
				commit('toggleAudioLoadding', false)
			})
		},
		prev({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == 0) {
				state.listInfo.songIndex = list.length
			} else {
				state.listInfo.songIndex--
			}
			var hash = list[state.listInfo.songIndex].hash
			dispatch('getSong', hash)
			dispatch('getLrc', hash)
		},
		next({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == list.length - 1) {
				state.listInfo.songIndex = 0
			} else {
				++state.listInfo.songIndex
			}
			var hash = list[state.listInfo.songIndex].hash
			dispatch('getSong', hash)
			dispatch('getLrc', hash)
		}
	}
})

export default store
