<template>
  <div class="logo-container">
    <div style="padding: 10px;height: 51px;" v-for="(item,index) in listColor" :style="{backgroundColor:item.color}" v-if="item.select == true">
      <div class="head-logo">
        <a href="#">
          <img src="http://m.kugou.com/v3/static/images/index/logo.png">
        </a>
      </div>
      <div class="head-search" @click="searchRouter">
        <!-- <img src="../../assets/images/kugou.jpg"> -->
        <img src="http://m.kugou.com/v3/static/images/index/search.png">
      </div>
    </div>
  </div>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        itemColor:''
      }
    },
    computed: {
      ...mapGetters(['listColor'])
    },
    created(){
    },
    methods: {
      searchRouter(){
        this.$store.commit('showDetailPlayer',false);
        this.$router.push({path: '/search'});
      }
    }
  }
</script>
