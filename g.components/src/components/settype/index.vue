<template>
  <div>
      <!--微排版-->
      <div class="settype" :class="settype" :style="'margin-top:'+settypemargin+';margin-bottom:'+settypemargin+';font-size:'+settypefont+';'">{{settype}}</div>
  </div>
</template>
<script>
export default {
  props:{
    //   微排版上下边距
      settypemargin:{
          type:String,
          default:"1rem"
      },
    //   微排版内容
      settype:{
          type:String,
          default:""
      },
    //   微排版字体
      settypefont:{
          type:String,
          default:'12px'
      }
  },
  data(){
      return{}
  }
}
</script>
<style scoped>
    .settype{
        width:95%;
        margin:0 auto;
        clear: both;
        border:2px dashed #FFAA00;
        box-sizing: border-box;
        padding:0.5rem;
    }
</style>


