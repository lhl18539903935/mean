<template>
    <div>
        <!--图片自适应-->
        <div class="auto" v-if="autoshow">
            <div :style="'width:'+autowidth+';'" class="autoimg" :class="{'width':state,'automargin':state}">
                <img :src="autoimg" alt="">
                <p :style="'color:'+autocolor+';font-size:'+autofont+';'" :class="autotitle">{{autotitle}}</p>
           </div>
        </div>
    </div>
</template>
<script>
export default {
  props:{
    //   图片
      autoimg:{},
    //   图片自适应显示与隐藏
      autoshow:{
          type:Boolean,
          default:true
      },
    //   图片标题
      autotitle:{
          type:String,
          default:''
      },
    //   标题字体颜色
      autocolor:{
          type:String,
          default:'#000000'
      },
    //   组件宽度
      autowidth:{
          type:String,
          default:"20%"
      },
    //   title 字体大小
    autofont:{
        type:String,
        default:"14px"
    },
    //判断是否有间距
    state:{
        type:Boolean,
        default:true
    }
  },
  data(){
      return{
        //   state:false
      }
  }
}
</script>
<style scoped>
    .autoimg{
        /*width:20%;*/
        float:left;
        text-align: center;
    }
    .autoimg img{
        width:100%;
    }
    .auto{
        width:90%;
        margin:0 auto;
        /*border:1px solid #000;*/
    }
    .automargin{
        margin-left:10px!important;
    }
    .width{
        width:16%!important;
    }
</style>


