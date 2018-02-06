<template>
  <div>
         <!--正方形图片建议尺寸：370px*370px 长方形图片建议尺寸：370px*750px-->
         <!--橱窗两列-->
      <div class="showcase" v-show="caseshow">
            <!--showcase 左图-->
        <div class="left">
            <img :src="leftone" alt="">
            <span v-if="titlestate" :class="caseleft">{{caseleft}}</span>
        </div>
            <!--右图-->
        <div class="right">
            <!--右一-->
            <p>
                <img :src="rightone" alt="">
                <span v-if="titlestate" :class="caserightone">{{caserightone}}</span>
            </p>
            <!--右二-->
            <p>
                <img :src="righttwo" alt="">
                <span v-if="titlestate" :class="caserighttwo">{{caserighttwo}}</span>
            </p>
        </div>
      </div>     
  </div>
</template>
<script>
export default {
  props:{
    //   左图路径
      leftone:{},
    //   右图一路径
      rightone:{},
    //   右图二路径
      righttwo:{},
    //   左图标题
      caseleft:{
          type:String,
          default:""
      },
    //   右图一标题
      caserightone:{
          type:String,
          default:""
      },
    //   右图二标题
      caserighttwo:{
          type:String,
          default:""
      },
    //   标题是否隐藏
      titlestate:{
          type:Boolean,
          default:true
      },
      caseshow:{
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
    .showcase{
        width:95%;
        height:375px;
        margin:0 auto;
    }
    .left{
        width:49%;
        height:375px;
        box-sizing: border-box;
        float: left;
        overflow: hidden;
        position: relative;        
    }
    .left span{
        display: block;
        width:100%;
        background-color: rgba(0,0,0,.5);
        text-align: center;
        color:#fff;
        position: absolute;
        bottom:0;
        left:0;
    }
    .left img{
        width:100%;
        height:375px;
        box-sizing: border-box;
    }
    .right{
        width:49%;
        float:right;
        height:375px;
        overflow: hidden;
    }
    .right p:nth-child(1){
       position: relative;
    }
    .right p:nth-child(1) span{
        display: block;
        width:100%;
        background-color: rgba(0,0,0,.5);
        text-align: center;
        color:#fff;
        position: absolute;
        bottom:6px;
        left:0;
    }
    .right p:nth-child(2){
       position: relative;
    }
    .right p:nth-child(2) span{
        display: block;
        width:100%;
        background-color: rgba(0,0,0,.5);
        text-align: center;
        color:#fff;
        position: absolute;
        bottom:6px;
        left:0;
    }
    .right img{
        width:100%;
        height:185px;
    }
</style>


