<template>
  <div>
      <!--橱窗3列-->
      <div class="caseshowcol" :style="'margin-top:'+casemargin+';margin-bottom:'+casemargin+''">
        <p>
            <img :src="caseone" alt="">
            <span v-if="showcase" :class="casetitleone">{{casetitleone}}</span>  
        </p>
        <p>
           <img :src="casetwo" alt=""> 
           <span v-if="showcase"  :class="casetitletwo">{{casetitletwo}}</span>
        </p>
        <p>
            <img :src="casethree" alt="">
            <span v-if="showcase"  :class="casetitlethree">{{casetitlethree}}</span>
        </p>       
      </div>
  </div>
</template>
<script>
export default {
  props:{
    //   第一张图片路径
      caseone:{},
    //   第二张图片路径
      casetwo:{},
    //   第三章图片路径
      casethree:{},
    //   标题一
      casetitleone:{
          type:String,
          default:""
      },
    //   标题二
      casetitletwo:{
          type:String,
          default:""
      },
    //   标题三
      casetitlethree:{
          type:String,
          default:""
      },
    //   是否显示标题
      showcase:{
          type:Boolean,
          default:true
      },
    //   模块上下边距
      casemargin:{
          type:String,
          default:"1rem"
      }
  },
  data(){
      return{}
  }
}
</script>
<style scoped>
    .caseshowcol{
        width:95%;
        margin:0 auto;
        display: flex;
        flex-direction:row;
        flex-wrap: nowrap;
        justify-content:space-between;
    }
    .caseshowcol p{
        width:32%;
    }
    .caseshowcol img{       
        width:100%;
        height:175px;
    }
    .caseshowcol span{
        color:#fff;
        text-align: center;
        display: block;
        width:100%;
        background-color: rgba(0,0,0,.5)
    }
    .caseshowcol p:nth-child(1){
        position: relative;
    }
    .caseshowcol p:nth-child(1) span{
        position: absolute;
        bottom:6px;
        left:0;
    }
    .caseshowcol p:nth-child(2){
        position: relative;
    }
    .caseshowcol p:nth-child(2) span{
        position: absolute;
        bottom:6px;
        left:0;
    }
    .caseshowcol p:nth-child(3){
        position: relative;
    }
    .caseshowcol p:nth-child(3) span{
        position: absolute;
        bottom:6px;
        left:0;
    }
</style>


