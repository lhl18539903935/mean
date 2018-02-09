<template>
  <div id="c16" :style="`margin:${content.modulePadding}px 0;`">
    <div class="main" :style="`font-size: ${content.fontSize};color: ${content.fontColor};background-color:${content.bgColor}`">
      <template v-if="content.showtitle.length<18">
        <!--兼容火狐，stop事件不能用-->
        <p :class="{pad:content.noticeStyle==2}">{{content.showtitle}}</p>
      </template>
      <template v-else>
        <marquee ref="mq" :class="{pad:content.noticeStyle==2}">{{content.showtitle}}</marquee>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {

      }
    },
    methods: {},
    created() {

    },
    mounted() {
//      if(this.content.showtitle.length<18){
//        this.$refs.mq.stop()
//      }
    }
  }

</script>

<style scoped>
  .main{
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
  }
.pad{
  margin-left:20px;
}
</style>