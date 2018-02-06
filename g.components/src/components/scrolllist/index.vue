<template>

      <div class="scroll  tab-head">
        <div v-show="scrollshow" v-for="(item,i) in scrolllist" :key="i" class="scrolllist tab-head-item">
            <div class="scrollimg">
                <img :src="item.scrollsrc" alt=""> 
            </div>
            <p v-show="tittleshow" :class="scrolltitle" :style="'font-size:'+sctittlefont+';color:'+sctittlecolor+';'">{{item.scrolltitle}}</p>
            <del :class="scrollcost" :style="'font-size:'+sccostfont+';color:'+sccostcolor+';font-weight:'+sccostweight+';'">￥{{item.scrollcost}}</del>
            <p :class="scrollcurrent" :style="'font-size:'+sccurrentfont+';color:'+sccurrentcolor+';font-weight:'+sccurrentweight+';'">￥{{item.scrollcurrent}}</p>
        </div>
    </div>

</template>

<script>
export default {
  props:{
                            // 单列样式二 左右滑动
    scrollshow:{
        type:Boolean,
        default:true
    },
    scrolllist:{
        type:Array,
        default:[]
    },
    //图片
    scrollsrc:{},
    //滚动列表标题
    scrolltitle:{
        type:String,
        default:'风衣女'
    },
    //标题字体 单位：% rem em px
    sctittlefont:{
        type:String,
        default:"12px"
    },
    // 标题的现实与隐藏
    tittleshow:{
        type:Boolean,
        default:true
    },
    //标题字体颜色
    sctittlecolor:{
        type:String,
        default:'#9A9A9A'
    },
    // 原价
    scrollcost:{
        type:Number,
        default:120
    },
    //原价字体
    sccostfont:{
        type:String,
        default:"14px"
    },
    // 原价字体颜色
    sccostcolor:{
        type:String,
        default:"#9A9A9A"
    },
    // 原价weight
    sccostweight:{
        type:Number,
        default:0
    },
    //现价
    scrollcurrent:{
        type:Number,
        default:100
    },
    // 现价字体
    sccurrentfont:{
        type:String,
        default:'14px'
    },
    // 现价字体颜色
    sccurrentcolor:{
        type:String,
        default:'#e4393c'
    },
    //现价字体weight
    sccurrentweight:{
        type:Number,
        default:600
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .scroll{
        width:95%;
        /*float:left;*/
        margin:0.5rem 0 0.5rem 0.5rem;
        /*clear: both;*/
    }
        .scrolllist img{
        width:100%;  
        margin:5px 0;
    }
    .scrollimg{
        width:100%;
    }
    /*.scrolllist{
        width:30%;
        border:1px solid #E9E9E9;
    }

    .scrolllist p{
        width:90%;
        margin:0 auto;
    }
    .scrolllist del{
        width:90%;
        margin:0 auto;
        display: block;
    }*/
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
    -ms-flex-pack:justify;justify-content:space-between;background:#fff;padding:0;overflow:auto;}

  .tab-head-item{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;color:#000;margin:0 3px 0 1px ;box-sizing:border-box;padding:0 5px;width:33%;border:1px solid #EEEEEE}

</style>
