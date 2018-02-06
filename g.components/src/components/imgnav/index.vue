<template>
  <div class="styleone">
      <!--图片导航样式1-->
    <div class="imgnav" v-if="navstyleone">
        <div class="navimg">
           <img :src="navimg" alt=""> 
        </div>  
        <p class="navp" :class="navname" :style="'background-color:'+navbg+';'">{{navname}}</p>
    </div>
    <!--<div style="clear:both"></div>-->
    <!--样式2-->
    <div class="navstyletwo" v-if="navstyletwo">
        <div class="navtwoimg">
            <img :src="navimgtwo" alt="">
        </div>
        <span class="navspan" :style="'font-size:'+navfont+';'" :class="navnametwo">{{navnametwo}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    //   图片导航样式1 显示隐藏
      navstyleone:{
          type:Boolean,
          default:false
      },
    // 图片导航
    navimg:{},
    // 图片导航文本内容
    navname:{
        type:String,
    },
    // 图片导航样式二
    navstyletwo:{
        type:Boolean,
        default:true
    },
    navimgtwo:{},
    navnametwo:{
        type:String,
        default:""
    },
    // 标题背景颜色
    navbg:{
        type:String,
        default:"#FE9303"
    },
    // 字体大小
    navfont:{
        type:String,
        default:'12px;'
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
    .styleone{
        width:95%;
        margin:0 auto;
        /*clear: both;*/
    }
    .imgnav{
        width:20%;
        /*margin:0 auto;*/
        float:left;
        box-sizing: border-box;
        position: relative;
    }
    .navimg{
        width:90%;
        height:80px;
        margin: 0 auto;
    }
    .navimg img{
        width:100%;      
    }
    .navp{
        width:80%;
        border-radius: 14px;
        text-align: center;
        margin:0 auto;
        position: absolute;
        bottom:9px;
        left:10%;
        font-size: 12px;
    }
    .navstyletwo{
        width:43%;
        float:left;
        /*border:1px solid #000;*/
        background-color:#fff;
        margin-left:5%;
        box-sizing: border-box;
        margin-bottom:0.5rem;
    }
    .navtwoimg{
        width:22%;
        /*height:60px;*/
        float:left;
        /*line-height:60px;*/
    }
    .navtwoimg img{
        width:100%;
        margin:5px 5px 0 5px;
        display: inline-block;
    }
    .navspan{
        display: inline-block;
        margin:8%;
    }
</style>
