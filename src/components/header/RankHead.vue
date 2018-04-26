<template>
  <div>
    <div class="rank-head container" v-for="(item,index) in listColor" :style="{backgroundColor:item.color}" v-if="item.select == true" id="transparent-header">
      <a class="rank-head-back" @click="routerBack"></a>
      {{title}}
    </div>
  </div>
</template>

<script type="es6">
import { mapGetters } from 'vuex'
  export default {
    props: ['title', 'to'],
    computed: {
      ...mapGetters(['listColor'])
    },
    methods: {
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
