<template>
  <div>
      <!--分割线-->
      <div class="divider" :style="'margin-top:'+divi+';margin-bottom:'+divi+';'">
          <i></i>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    //   上下边距
      divi:{
        type:String,
        default:"1rem"
      }
  },
  data(){
      return{

      }
  }
}
</script>
<style scoped>
    i{
        width:100%;
        display: block;
        border:1px dashed #ddd;
    }
    .divider{
        width: 90%;
        margin:0 auto;
        clear: both;
    }
</style>


