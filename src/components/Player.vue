<template>
  <div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
    <audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change()" @ended="next()"></audio>
    <div class="audio-panel-control" @click="togglePanel">
      <mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
    </div>
    <div class="audio-panel" :style="{backgroundColor:item.color}" v-for="(item,index) in listColor" v-if="item.select == true">
      <img alt="" class="player-img" :src="audio.imgUrl" @click="showDetailPlayer()">
      <div class="player-status" @click="showDetailPlayer()">
        <p class="player-title ellipsis">{{audio.title||"歌名"}}</p>
        <p class="player-singer ellipsis">{{audio.singer||"歌星"}}</p>
      </div>
      <div class="player-controls">
        <span class="player-Play" @click="toggleStatus()" :class="{'player-Pause':isPlay}"></span>
        <span class="player-nextSong" @click="next()"></span>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui';
  import DetailPlayer from '../components/DetailPlayer'

  export default {
    name: 'player',
    data(){
      return {
        toggleHide: false
      }
    },
    computed: {
      ...mapGetters(['firstPlay','audio', 'audioLoadding', 'showPlayer', 'isPlay','listColor'])
    },
    mounted(){
    },
    methods: {
      toast(){
        Toast({
          message: '请选择歌曲',
          duration: 1000
        });
      },
      togglePanel(){
        this.toggleHide = !this.toggleHide;
      },
      toggleStatus(){
        if(this.firstPlay == true){
          if (this.isPlay) {
            document.getElementById('audioPlay').pause();
          } else {
            document.getElementById('audioPlay').play();
          }
          this.$store.commit('isPlay', !this.isPlay);
        }else{
          this.toast()
        }
      },
      showDetailPlayer(){
        if (this.showPlayer) {
          this.$store.commit('showDetailPlayer', true)
        }else{
          this.toast()
        }
      },
      change(){
        var time = document.getElementById('audioPlay').currentTime
        if (this.audio.currentFlag) {
          document.getElementById('audioPlay').currentTime = this.audio.currentLength;
          this.$store.commit('setCurrent', false);
        } else {
          this.$store.commit('setAudioTime', time);
        }
      },
      next(){
        if(this.firstPlay == true){
          this.$store.dispatch('next');
        }else{
          this.toast()
        }
      }
    },
    components:{DetailPlayer}
  }
</script>

