<template>
  <div>
      <!--顶部菜单有图片-->
    <div class="topmenu">
        <div class="stylediv" :style="'background-color:'+menubgone+';'" :class="menucontentone">
            <p >
              <img :src="imgmenuone" alt="">  
            </p>    
            <p>
                {{menucontentone}}
            </p>
        </div>
        <div class="stylediv" :style="'background-color:'+menubgtwo+';'" :class="menucontenttwo">
            <p>
                <img :src="imgmenutwo" alt=""> 
            </p>       
            <p>
               {{menucontenttwo}} 
            </p>
            
        </div>
        <div class="stylediv" :style="'background-color:'+menubgthree+';'" :class="menucontentthree">
            <p>
               <img :src="imgmenuthree" alt=""> 
            </p>          
            <p>
               {{menucontentthree}}  
            </p>
           
        </div>
        <div class="stylediv" :style="'background-color:'+menubgfour+';'" :class="menucontentfour">
            <p>
              <img :src="imgmenufour" alt="">  
            </p>        
            <p>
              {{menucontentfour}}  
            </p>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    //   菜单内容1
      menucontentone:{
          type:String,
          default:'1'
      },
      //   菜单内容2
       menucontenttwo:{
          type:String,
          default:'2'
      },
      //   菜单内容3
       menucontentthree:{
          type:String,
          default:'3'
      },
      //   菜单内容4
       menucontentfour:{
          type:String,
          default:'4'
      },
    //   背景色1
    menubgone:{
        type:String,
        default:"#07A0E7"
    },
    //   背景色2
     menubgtwo:{
        type:String,
        default:"#72C201"
    },
    //   背景色3
     menubgthree:{
        type:String,
        default:"#FFA800"
    },
    //   背景色4
     menubgfour:{
        type:String,
        default:"#D50303"
    },
    // 图片路径
    imgmenuone:{},
    imgmenutwo:{},
    imgmenuthree:{},
    imgmenufour:{}
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .topmenu{
        width:95%;
        /*height:100%;*/
        height:58px;
        margin:1rem auto;
        text-align: center;
        color:#fff;
        /*border:1px solid #000;*/
        clear: both;
    }
    .topmenu p{
        padding:0;
        margin:0;
    }
    .topmenu .stylediv{
        width:25%;
        min-height:44px;
        /*line-height:44px;*/
        float:left;
    }
    .topmenu .stylediv p:nth-child(2){
        width:100%;
        min-height:22px;
        line-height:22px;
        /*margin:4px 0;*/
        font-size: 12px;
        box-sizing: border-box
    }
     .topmenu .stylediv img{
         margin:5px 0 -5px 0;
         text-align: center;
         width:25%;
         height:22px;
         /*float:left;*/
         box-sizing: border-box
     }
</style>
