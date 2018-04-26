<template>
  <div v-show="detailPlayerFlag">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer()"></span>
        {{audio.title}}
      </div>
      <div class="detail_player-img">
        <img id="img_rotate" :src="audio.imgUrl">
      </div>
      <div class="detail_player-lrc">
        <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
          <p v-for="(item,index) in songLrc"
             :class="{isCurrentLrc:item.seconds >= audio.currentLength,Color:item.seconds < audio.currentLength}">
            {{item.lrcContent}}</p>
        </div>
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <!--input事件会一直触发，所以禁用range，改为onclick-->
        <mt-range
          id="range"
          :min="0"
          :max="audio.songLength"
          v-model="audio.currentLength"
          :bar-height="3"
          @click.native="rangeChange($event)" disabled style="width: 80%"></mt-range>
        <span class="detail_player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail_player-control player-padding">
        <i class="detail_player-btn play-prev player_btn-sm" @click="prev()"></i>
        <i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>
        <i class="detail_player-btn play-next player_btn-sm" @click="next()"></i>
        <i class="play-collection player_btn-sm" :class="{'play-collection-no':!is_collection,'play-collection-yes':is_collection}" @click="collectionFun()">
        </i>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {mapGetters} from 'vuex'
  import { Toast  } from 'mint-ui'
  export default {
    data(){
      return {
        is_collection:false,
        time:0,
        rangeValue: 0,
        rot:0,
        collection:[]
      }
    },
    filters: {
      time(value){
        var length = Math.floor(parseInt(value));
        var minute = Math.floor(value / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        var second = length % 60;
        if (second < 10) {
          second = '0' + second;
        }
        return minute + ':' + second;
      }
    },
    mounted(){
      this.zhuan()
    },
    watch:{
      isPlay(val,oldVal){//监听当前音乐是否播放
          this.zhuan()
      },
      audio(val,oldVal){//监听当前播放音乐是否收藏
        for(let i = 0;i < this.songList.length;i++){
          if(this.audio.title.indexOf(this.songList[i].filename) != -1 ){
            this.is_collection = true
            return false
          }else if(i == this.songList.length-1 && this.audio.title.indexOf(this.songList[i].filename) == -1){
            this.is_collection = false
          }
        }
      }
    },
    computed: {
      ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay','songList','currentSong']),
      songLrc(){//歌曲歌词
        if (this.audio.lrc) {
          var temp = this.audio.lrc.split('\r\n')
          temp = temp.splice(0, temp.length - 1)
          temp = temp.map((value)=> {
            var time = value.substr(1, 5)
            var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
            var lrcContent = value.substr(10)
            return {
              seconds,
              lrcContent
            }
          })
          return temp;
        }
      },
      lrcOffset(){//当前音乐进度
        if (this.songLrc) {
          var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 3) * (-20)
          return this.audio.currentLength + offset - this.audio.currentLength
        }
      }
    },
    methods: {
      begin(time){//开始播放
          document.getElementById("img_rotate").style.transform="rotatez("+this.rot+"deg)";
          this.rot+=1;
      },
      zhuan (){//logo旋转
        if(this.isPlay==false){
            window.clearInterval(this.time);
        }
        else{
            this.time=window.setInterval(this.begin,10);
        }
      },
      hideDetailPlayer(){//隐藏音乐详情
        this.$store.commit("showDetailPlayer", false)
        // this.is_collection = false
      },
      rangeChange(event){//点击进度条
        var offset = event.offsetX
        var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20
        var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
        if (offset < rangeWidth) {
          this.$store.commit('setAudioTime', clickLength)
          this.$store.commit('setCurrent', true)
        }
      },
      toggleStatus(){//播放暂停
        if (this.isPlay) {
          document.getElementById('audioPlay').pause()
        } else {
          document.getElementById('audioPlay').play()
        }
        this.$store.commit('isPlay', !this.isPlay)
      },
      prev(){//上一曲
        this.$store.dispatch('prev')
        this.$store.commit('isPlay', !this.isPlay)
      },
      next(){//下一曲
        this.$store.dispatch('next')
        this.$store.commit('isPlay', !this.isPlay)
      },
      collectionFun(){//收藏
        this.is_collection = !this.is_collection
        if(this.is_collection == true){
          this.songList.push(this.currentSong)
        }else{
          this.songList.splice(this.songList.findIndex(item => item.remark == this.currentSong.remark), 1)
        }
        this.$store.commit('songList', this.songList)
      }
    }
  }
</script>
