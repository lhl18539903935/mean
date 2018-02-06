<template>
  <div>
      <!--顶部菜单无图片-->
    <div class="menu">
        <div class="stylediv" :style="'background-color:'+bgone+';'" :class="contentone"> 
            <p>
                {{contentone}}
            </p>
        </div>
        <div class="stylediv" :style="'background-color:'+bgtwo+';'" :class="contenttwo">     
            <p>
               {{contenttwo}} 
            </p>
            
        </div>
        <div class="stylediv" :style="'background-color:'+bgthree+';'" :class="contentthree">        
            <p>
               {{contentthree}}  
            </p>
           
        </div>
        <div class="stylediv" :style="'background-color:'+bgfour+';'" :class="contentfour">    
            <p>
              {{contentfour}}  
            </p>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    //   菜单内容1
      contentone:{
          type:String,
          default:'1'
      },
      //   菜单内容2
       contenttwo:{
          type:String,
          default:'2'
      },
      //   菜单内容3
       contentthree:{
          type:String,
          default:'3'
      },
      //   菜单内容4
       contentfour:{
          type:String,
          default:'4'
      },
    //   背景色1
    bgone:{
        type:String,
        default:"#07A0E7"
    },
    //   背景色2
     bgtwo:{
        type:String,
        default:"#72C201"
    },
    //   背景色3
     bgthree:{
        type:String,
        default:"#FFA800"
    },
    //   背景色4
     bgfour:{
        type:String,
        default:"#D50303"
    },
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .menu{
        width:95%;
        height:44px;
        margin:1rem auto;
        text-align: center;
        color:#fff;
        /*border:1px solid #000;*/
        clear: both;
    }
    .menu p{
        padding:0;
        margin:0;
    }
    .menu .stylediv{
        width:25%;
        min-height:44px;
        line-height:44px;
        float:left;
    }
</style>
