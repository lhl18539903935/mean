<template>
    <div>
       <div v-show='show' class="gridTop" :style="'width:'+gwidth+'%;'">
           <div class="gridbanner " :style="'width:'+swidth+'%;'">
               <div class="gridstyle">
                   <img :src="src" alt="" :style="'width:'+imgwidth+';'">
               </div>            
               <p :style="'font-size:'+intrfont+'px;color:'+intrcolor+';'" :class='introduction' v-show="intrShow">{{introduction}}</p>
               <del :style="'font-size:'+intrfont+'px;color:'+costcolor+';'" :class='costprice'>￥{{costprice}}</del>
               <p :style="'font-size:'+intrfont+'px;color:'+currentcolor+';font-weight:'+weight+';'" :class='currentprice'>￥{{currentprice}}</p>
           </div>  
       </div>
       <!--<div class="clear"></div>-->
    </div>
</template>

<script>
    export default {
        name:'grid',
        props:{
            // 是否显示grid组件 类型：boolean
            show:{
                type:Boolean,
                default:false
            },
            // grid组件 商品图片路径 类型：String
            src:{
                type:String
            },
            // grid组件 商品介绍 type:auto
            introduction:{
                type:String,
                // default:'auto'
            },
            // grid组件 商品介绍是否显示
            intrShow:{
                type:Boolean,
                type:true
            },
            // grid组件 商品图原价 type:Number
            costprice:{
                type:Number,
                default:0
            },
            // grid组件 商品图现价 type:Number
            currentprice:{
                type:Number,
                default:0
            },
            // grid组件的宽度 单位：%
            gwidth:{
                type:Number,
                defaule:100
            },
            // grid组件单个商品的宽度 单位：%
            swidth:{
                type:Number,
                default:30
            },
            // grid组件商品图片的宽度 单位：%
            imgwidth:{
                type:String,
                default:'100%'
            },
            // grid组件商品图片的高度 单位：%
            imgheight:{
                type:Number,
                default:100
            },
            // grid组件商品信息字体大小 单位：px
            intrfont:{
                type:Number,
                default:14
            },
            // grid组件商品信息字体颜色
            intrcolor:{
                type:String,
                default:'#666666'
            },
            // grid组件商品原价信息字体颜色
            costcolor:{
                type:String,
                default:'#99A6C4'
            },
            // grid组件商品现价信息字体颜色
            currentcolor:{
                type:String,
                default:'red'
            },
            //grid组件商品现价是否加粗
            weight:{
                type:Number,
                default:0
            }

        },
        components:{
            
        },
        data(){
            return{
                          
            }
        },
        methods:{

        },
        mounted(){
            
        }
    }

</script>

<style scoped>
    .gridTop{
        margin:1rem auto;
        text-align: center;
        width:90%;
    }
    .gridbanner{
        float:left;
        width:32%;
        margin:0.5rem 1% 0 0;
        border:1px solid #DBDADA;
        box-sizing: border-box;
    }
    .clear{
        clear:both
    }
    .gridstyle{
        height:90px;
        width:100%;
        margin: 0 auto 10px;
    }
</style>