<template>
    <div>
      <div class="top">
        <input   style="padding:0.4rem 0.5rem;font-size: 14px;width:100%;outline:none;border:0;"  class="input" placeholder="昵称">
        <x-icon type="ios-close" size="18" style="position: absolute;right:0;top:5px;"></x-icon>
      </div>

    </div>
</template>

<script type="es6">
  import {Group,Cell,XInput} from "vux"
    export default {
      data(){
        return{
          nickname:""
        }
      },
      components:{
        Cell,
        XInput,
        Group
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top{
    width:100%;
    margin-top:0.5rem;
    border:1px solid #ddd;
    position: relative;
  }
  .top input{
    padding:0.5rem 0;
    display: inline-block;
  }
  .vux-x-icon {
    fill: #ddd;
  }
  .cell-x-icon {
    display: block;
    fill: green;
  }
</style>
