<template>
  <div>
      <!--商品分类 瀑布流-->
      <div class="classify">
          <div :class="{'classifystyle':classifystate}" :title="classify" :style="'color:'+classifycolor+';background-color:'+classifybg+';font-size:'+classifyfont+';'">{{classify}}</div>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    // 商品分类内容
      classify:{
          type:String,
          default:''
      },
    //   商品分类字体颜色
      classifycolor:{
          type:String,
          default:'#fff'
      },
    //   商品分类字体
      classifyfont:{
          type:String,
          default:'14px'
      },
    //   商品分类背景颜色
      classifybg:{
          type:String,
          default:'#28C192'
      },
    //   商品分类样式切换
      classifystate:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return{
        //   classifyState:false
      }
  }
}
</script>
<style scoped>
    .classify{
        /*width:22.5%;*/
        width:20%;
        float:left;
       
        text-align: center;
        /*background-color: #28C192;*/
        /*margin:1% 0 1% 2%;*/
        margin: 1% 0 1% 2.5%;
       
    }
    .classify>div{
         padding:5px 0;
        width:100%; border-radius:22px;
    }
    .classifystyle{
        background-color: #fff!important;
        color:#000!important;
    }
</style>


