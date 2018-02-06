<template>
  <div>
    <!--辅助空白-->
    <div class="gap" :style="'height:'+gap+';'"></div>
  </div>
</template>

<script>
export default {
  props:{
    //   辅助空白高度 单位：%  rem em px...
      gap:{
          type:String,
          default:"1rem"
      }
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .gap{
        width:90%;
        margin:0 auto;
        /*border:1px solid #000;*/
    }
</style>
