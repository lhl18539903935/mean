<template>
  <div>
    <div class="singlelist" v-show="singleshow">
        <!--单列商品样式一-->
        <div class="singlelistimg">
            <img :src="singlesrc" alt="">
            <!--已售数量-->
            <p :class="singlesold" class='sold' :style="'color:'+soldcolor+';'">已售：{{singlesold}}&nbsp;&nbsp;</p>
        </div>
        <!--商品标题-->
        <p v-show='tittleshow' :class="singletitle" :style="'font-size:'+tittlefont+';color:'+tittlecolor+';'">{{singletitle}}</p>
        <p>
            <!--商品原价 现价-->
            <span :style="'font-size:'+currentfont+';font-weight:'+currentweight+';color:'+currentcolor+';'" :class="singlecurrent" >￥{{singlecurrent}}</span>
            &nbsp;&nbsp; <span class="oldprice"  :style="'font-size:'+costfont+';color:'+costcolor+';'">原价 :</span><del :class="singlecost" :style="'font-size:'+costfont+';color:'+costcolor+';'">￥{{singlecost}}</del>
        </p>
    </div>
  </div>
</template>

<script>
export default {
    props:{
                                      //  单列商品样式一
        // 商品图片路径
        singlesrc:{},
        // 已售数量
        singlesold:{
            type:Number,
            default:0
        },
        singleshow:{
            type:Boolean,
            default:true,
        },
        //已售字体颜色
        soldcolor:{
            type:String,
            default:"#ffffff"
        },
        // 商品标题
        singletitle:{
            type:String,
            default:"女风衣"
        },
        //商品标题字体大小 单位：% rem em px
        tittlefont:{
            type:String,
            default:'16px'
        },
        //商品标题字体颜色
        tittlecolor:{
            type:String,
            default:'#333333'
        },
        //商品标题是否显示
        tittleshow:{
            type:Boolean,
            default:true
        },
        // 商品现价
        singlecurrent:{
            type:Number,
            default:300
        },
        //商品现价字体大小 单位：% rem em px
        currentfont:{
            type:String,
            default:'14px'
        },
        //商品现价字体weight
        currentweight:{
            type:Number,
            default:600
        },
        //商品现价字体颜色
        currentcolor:{
            type:String,
            default:'#e4393c'
        },
        // 商品原价
        singlecost:{
            type:Number,
            default:320
        },
        //原价商品字体大小 单位：% rem em px
        costfont:{
            type:String,
            default:'12px'
        },
        //原价商品字体颜色
        costcolor:{
            type:String,
            default:'#929292'
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
    .singlelist{
        width:95%;
        margin:0.5rem auto;
        border:1px solid #E9E9E9;
        clear: both;
    }
    .singlelistimg{
        width:95%;
        text-align: right;
        position: relative;
         margin:5px auto;
    }
    .singlelistimg img{
        width:100%;   
    }
    .singlelist p{
        width:95%;
        margin:0 auto;
     }
    .singlelistimg p{
        width:100%;
    }
    .sold{
        position: absolute;
        bottom:6px;
        right:0;
        width:100%;
        background: rgba(0,0,0,.5)
    }
    .oldprice{
        font-size: 12px;
    }
</style>
