<template>
  <div>
      <!--广告滚动-->
      <div class="notice" v-show="true">
          <marquee :class="notice" :style="'font-size:'+noticefont+';color:'+noticecolor+';background-color:'+noticebg+';text-align:'+noticetext+';'">{{notice}}</marquee>
      </div> 
  </div>
</template>
<script>
export default {
  props:{
    //   广告内容
      notice:{
          type:String,
          default:""
      },
    //   广告字体大小
      noticefont:{
          type:String,
          default:'14px'
      },
    //   广告栏字体颜色
      noticecolor:{
          type:String,
          default:'#FFCA5F'
      },
    //   广告背景颜色
      noticebg:{
          type:String,
          default:'#FFFFCC'
      },
    //   广告内容位置
      noticetext:{
          type:String,
          default:'center'
      }
  },
  data(){
      return{}
  }
}
</script>
<style scoped>
    .notice{
        width:95%;
        margin:0 auto;
    }
    .notice>marquee{
        padding:3px 10px;
    }
</style>

