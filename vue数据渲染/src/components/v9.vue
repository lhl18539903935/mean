<template>
  <div id="c9" class="header" :style="'margin:'+content.modulePadding+'px 0 '">
    <div :id="s" style="width: 100%;position: relative;overflow: hidden;">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          @click="herfs(n.link)"
          v-for="(n,i) in content.dataset" :key="i">
          <img :src="n.pic | imgs" :title="n.showtitle" style="width: 100%;">
        </div>
      </div>
      <div :class=" content.dataset.length > 1 ?'swiper-pagination':''"></div>
    </div>
    <!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    props:['content'],
    data() {
      return {
        s:''
      }
    },
    methods: {},
    created() {},
    mounted() {
      let d = new Date()
      this.s = 's'+d.getTime()
      let ss = '#s'+d.getTime()
        setTimeout(()=>{
          if(this.content.dataset.length > 1){
            new Swiper(ss,{
              autoplay: true,
              delay:3000,
              pagination: {
                el: '.swiper-pagination'
              }
            })
          }
        },100)
    }
  }

</script>

<style>
  .swiper-pagination-bullet-active{
    background: #f60;
  }
  .swiper-pagination-bullet{
    width: 5px;
    height: 5px;
  }
</style>