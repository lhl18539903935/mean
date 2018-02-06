<template>
  <div>
    <div class="navdefault" v-if="defaultshow">
        <!--文本导航-->
        <!--默认-->
        <p :class="navdefault">{{navdefault}}<i></i></p>
    </div>
    <div class="navcustom" v-if="customshow">
        <!--自定义 custom-->
        <input type="text">
    </div>
  </div>
</template>

<script>
export default {
 props:{
    //  默认导航显示隐藏
     defaultshow:{
         type:Boolean,
         default:true
     },
    //  默认文本导航问本内容
     navdefault:{
         type:String,
         default:"百度"
     },
     //自定义导航条显示隐藏
     customshow:{
        type:Boolean,
        default:true
     },
     navjump:{}
 },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .navdefault{
        width:90%;
        margin:00 auto;
    }
    .navdefault p{
        font-size: 14px;
        width:100%;
        margin:0 auto;
        outline:none;
        border:0;
        padding:5px 0px 5px 15px;
        box-sizing: border-box;
        border:1px solid #DBDADA;
        /*border-radius: 3px ;*/
        color:#757575;
    }
    .navdefault i{
        display: inline-block;
        width:7px;
        height:7px;
        border-top:1px solid #DBDADA;
        border-right:1px solid #DBDADA;
        transform: rotate(45deg);
        margin-left:80%;
    }
    .navcustom{
        width:90%;
        margin:0.5rem auto;
    }
    .navcustom input{
        width:100%;
        margin:0.5rem auto;
        outline:none;
        border:0;
        padding:8px 0px 8px 15px;
        box-sizing: border-box;
        border:1px solid #DBDADA;
        border-radius: 3px ;
    }
</style>
