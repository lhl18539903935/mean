<template>
  <div>
    <!--搜索-->
    <div v-show="searchshow" class="search" :style="'margin-top:'+searchmargin+';margin-bottom:'+searchmargin+';'">
        <input :placeholder="placeholder" type="text">
    </div>
  </div>
</template>

<script>
export default {
  props:{
      placeholder:{
        type:String,
        default:'商品搜索：请输入商品关键字' 
      },
      searchshow:{
          type:Boolean,
          default:true
      },
    //   上下边距
    searchmargin:{
        type:String,
        default:'0.5rem'
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
    .search{
        width:90%;
        margin:0.5rem auto
    }
    .search input{
        width:100%;
        margin:0.5rem auto;
        outline:none;
        border:0;
        padding:8px 0px 8px 8px;
        box-sizing: border-box;
        border:1px solid #DBDADA;
        border-radius: 3px ;
    }
</style>
