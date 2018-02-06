<template>
  <div>
      <!--商品分类对齐-->
      <div class="classifytwo">
          <div :class="{'classifystyle':classifystatetwo}" :title="classifytwo" :style="'background-color:'+classifytwobg+';color:'+classifytwocolor+';font-size:'+classifytwofont+';'">{{classifytwo}}</div>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    //   商品分类内容
      classifytwo:{
          type:String,
          default:""
      },
    //   背景颜色
      classifytwobg:{
          type:String,
          default:"#28C192"
      },
    //   字体颜色
      classifytwocolor:{
          type:String,
          default:"#fff"
      },
    //   字体大小
      classifytwofont:{
          type:String,
          default:"12px"
      },
    //   切换样式
      classifystatetwo:{
          type:Boolean,
          default:true
      }
  },
  data(){
      return{}
  }
}
</script>
<style scoped>
    .classifytwo{
        width:32%;
        float: left;
        text-align: center
    }
    .classifytwo>div{
        padding:5px;
        margin:2% 0 2% 10%;
    }
    .classifystyle{
        background-color: #fff!important;
        color:#000!important;
    }
</style>


