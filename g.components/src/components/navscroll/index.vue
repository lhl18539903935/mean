<template>
  <div class="scrollnav tab-head" v-show="navscrollshow">
      <!--滑动导航-->
      <div v-for="(item,i) in navscrolllist" :key="i" class="scrolllist tab-head-item">
          <!--滑动导航图片-->
          <div class="scrollimg">
             <img :src="item.navscrollsrc" alt="">  
          </div>
         <!--滑动导航文本-->
          <p class="text" :style="'font-size:'+navscrollfont+';background-color:'+navscrollbg+';color:'+navscrollcolor+';'" :title="item.navscrolltitle">{{item.navscrolltitle}}</p>
      </div>
  </div>
</template>
<script>
export default {
  props:{
      navscrolllist:{
          type:Array,
          default:[]
      },
      navscrollfont:{
          type:String,
          default:"14px"
      },
      navscrollbg:{
          type:String,
          default:'#00EEFF'
      },
      navscrollcolor:{
          type:String,
          default:'#000'
      },
      navscrollshow:{
          type:Boolean,
          default:true
      }
  },
  data(){
      return{
        
      }
  }
}
</script>
<style scoped>
.scrollnav{
    width:95%;
    margin:1rem auto;
    clear: both;
}
.scrollimg{
    width:100%;
}
.scrollimg img{
    width:100%;
}
.scrollnav{
    float:left;
}
.scrolllist{
    width:23%;
    float:left;
}
.text{
    text-align: center
}
.tab-head{
    list-style-type: none;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-flex-wrap:nowrap;
    -ms-flex-wrap:nowrap;
    flex-wrap:nowrap;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    -ms-flex-pack:justify;justify-content:space-between;background:#fff;padding:0;overflow:auto;
    width:100%;
    }

  .tab-head-item{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;color:#000;padding:0 3px;}
</style>


