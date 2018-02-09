<template>
  <div id="c13" :style="`margin:${content.modulePadding}px 0;min-height:160px;`">
    <div class="main0" v-if="content.layout == 0">
      <div
        :class="'m'+i"
        @click="herfs(n.link)"
        v-for="(n,i) in content.dataset" :key="i">
        <img :src="n.pic | imgs">
        <p v-if="n.showTitle == 1">{{n.title}}</p>
      </div>
    </div>
    <div
      class="main1"
      @click="herfs(n.link)"
      v-if="content.layout == 1">
      <div class="m"
           v-for="(n,i) in content.dataset" :key="i">
        <img :src="n.pic | imgs">
        <p v-if="n.showTitle == 1">{{n.title}}</p>
      </div>
    </div>
    <div style="clear: both"></div>
    <!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {}
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  .main0,.main1{
    width: 100%;
  }
  .main0>div{
    width: 50%;
    float: left;
    padding: 2px;
    box-sizing: border-box;
    position: relative;
  }
  .main0 p,
  .main1 p{
    width: calc(100% - 4px);
    padding: 4px 10px;
    box-sizing: border-box;
    background: rgba(0,0,0,.6);
    color: #fff;
    position: absolute;
    bottom: 2px;
  }
  .main0 .m0{
    height: 100vw;
  }
  .main0 .m1{
    height: 50vw;
  }
  .main0 .m2{
    height: 50vw;
  }

  .main1 div{
    width: 33.3%;
    height: 60vw;
    float: left;
    box-sizing: border-box;
    position: relative;
    padding: 2px;
  }

</style>