<template>
    <div>
            <div class="list" :style="'width:'+lwidth+'%;'">
                <!--双列商品样式1-->
                <div class="liststyle" v-if="doublestyleone">
                    <div class="listimgone">
                          <img class="img" :style="'width:'+imgwidth+';'" :src="src" alt=""> 
                    </div>   
                    <p :product="producttitle" :style="'color:'+tittlecolor+';font-size:'+tittlefont+';'">{{producttitle}}</p>
                    <del :productcost="productcost" :style="'font-size:'+costfont+';color:'+costcolor+';'">￥{{productcost}}</del>
                    <p>
                        <span :style="'color:'+fontcolor+';font-weight:'+fontweight+';font-size:'+currfont+';'" :producecurr="producecurr">￥{{producecurr}}</span>
                        <span class="soldout" :style="'font-size:'+soldfont+';'" :class='soldout'>
                            <span class='outnum' :style="'font-weight:'+soldweight+';'">{{soldout}}</span>
                            件已售
                        </span>
                    </p>  
                    <div class="btn" v-show="payshow">
                        <button  :class="nowpay">{{nowpay}}</button>
                    </div>
                    
                </div>
                <!--双列商品样式2-->
                <div class="liststyle" v-show="doublestyletwo">
                    <div class="listimgtwo">
                        <img class="img" :style="'width:'+imgwidth+';'" :src="src" alt="">
                    </div>   
                    <p :product="producttitle" :style="'color:'+tittlecolor+';font-size:'+tittlefont+';'">{{producttitle}}</p>
                    <p class="soldouttwo" :style="'font-size:'+soldfont+';'" :class='soldout'>已售：<span :style="'font-weight:'+soldweight+';'">{{soldout}}</span></p>
                    <del :productcost="productcost" :style="'font-size:'+costfont+';color:'+costcolor+';'">￥{{productcost}}</del>
                    <p class="styletwo">
                        <span :style="'color:'+fontcolor+';font-weight:'+fontweight+';font-size:'+currfont+';'" :producecurr="producecurr">￥{{producecurr}}</span>
                        <span class="soldout" :style="'font-size:'+soldfont+';'" :class='soldout'>
                            <img class="imgradius" :src="srctwo" alt="">
                        </span>
                    </p>  
                </div> 
                <!--双列样式3与样式1类似 见样式1  -->
                <!--双列样式4-->
                <div class="liststyle threep" v-show="doublestylethree">
                    <div class="listimgthree">
                        <img class="img" :style="'width:'+imgwidth+';'" :src="src" alt="">
                    </div>
                    
                    <p :product="producttitle" :style="'color:'+tittlecolor+';font-size:'+tittlefont+';'">{{producttitle}}</p>
                    <p>
                        <span :style="'color:'+fontcolor+';font-weight:'+fontweight+';font-size:'+currfont+';'" :producecurr="producecurr">￥{{producecurr}}</span>
                    </p>  
                </div> 
                <!--双列样式5-->
                <div class="liststyle" v-show="doublestylefour">
                    <div class="listimgfour">
                       <img class="img" :style="'width:'+imgwidth+';'" :src="src" alt="">  
                    </div>
                   
                    <p :product="producttitle" :style="'color:'+tittlecolor+';font-size:'+tittlefont+';'">{{producttitle}}</p>
                    <p>
                        <span :style="'color:'+fontcolor+';font-weight:'+fontweight+';font-size:'+currfont+';'" :producecurr="producecurr">￥{{producecurr}}</span>
                        <del class="del" :productcost="productcost" :style="'font-size:'+costfont+';color:'+costcolor+';'">￥{{productcost}}</del>
                    </p> 
                    <p style="text-align:right;width:90%;margin:0;padding:0;">
                      <span class="pimg">
                        <!--<img src="../../assets/addcart.png" alt="">-->
                        折
                    </span>   
                    </p>
                    
                </div> 
            </div>         
    </div>
</template>

<script>
    export default {
        name:'title',
        props:{
                                            // 双列样式1
             // 双列样式1显示隐藏
            doublestyleone:{
                type:Boolean,
                default:true
            },
            //商品图片
            src:{},
            //商品标题
            producttitle:{
                type:String
            },
            //商品标题字体颜色设置
            tittlecolor:{
                type:String,
                default:'#333333'
            },
            //商品标题字体大小设置 单位：px rem em %
            tittlefont:{
                type:String,
                default:'14px'
            },
            // 商品原价
            productcost:{
                type:Number,
                default:0
            },
            // 商品原价字体大小设置 单位：px rem em %
            costfont:{
                type:String,
                default:'12px'
            },
              // 商品原价字体颜色
            costcolor:{
                type:String,
                default:'#6A6A6A'
            },
            // 商品现价
            producecurr:{
                type:Number,
                default:30000
            },
            // 商品现价字体大小 单位：px rem em %
            currfont:{
                type:String,
                default:'14px'
            },
            //商品现价字体颜色
            fontcolor:{
                type:String,
                default:'#e4393c'
            },
            // 商品现价字体粗体
            fontweight:{
                type:Number,
                default:600
            },
            //销售数量字体 单位：px rem em %
            soldfont:{
                type:String,
                default:'12px;'
            },
            //销售数量           
            soldout:{
                type:Number,
                default:0
            },
            soldweight:{
                type:Number,
                default:600
            },
                                                                // 双列样式2
            // 双列商品样式2显示与隐藏
            doublestyletwo:{
                type:Boolean,
                default:true
            },
            // 购物车图片
            srctwo:{},
                                                                // 双列样式3
            // 是否显示双列样式4
            doublestylethree:{
                type:Boolean,
                default:true
            },
            // 支付按钮 
            nowpay:{
                type:String,
                default:'立即购买'
            },
            // 是否显示支付按钮 详细样式见样式1
            payshow:{
                type:Boolean,
                default:true
            },
                                                                //双列样式4
            // 是否显示双列样式4
            doublestylefour:{
                type:Boolean,
                default:true
            },
            //list组件宽度 单位：%
            lwidth:{
                type:Number,
                default:50
            },
            //list组件商品宽度
            imgwidth:{
                type:String,
                default:'100%'
            },
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
    .img{
        height:168px;
    }
    .list{
        text-align: left;
        float:left;   
        /*height:280px;   */
    }
    .liststyle{
        width:90%;
        margin:0.5rem auto;
        border:1px solid #E9E9E9;
    }
    /*.listimgone , .listimgtwo ,.listimgthree{
        height:180px;
    }
    .listimgfour{
        height:180px;
    }*/
    .liststyle p{
        width:95%;
        margin:0 auto;
    }
     .threep p{
        text-align: center
    }
    .liststyle del{
        width:95%;
        margin:0 auto;
        display: block;
    }
    .soldout{
        float:right;
        color:#989898;
        vertical-align: bottom;
        /*margin-top:5px;*/
    }
    .soldouttwo{
        color:#A4A4A4
    }
    .outnum{
        color:#FF6B14;
    }
    .imgradius{
        width:60%;
        border-radius:50%;
    }
    .soldout i{
        display: inline-block;
        border-radius:50%;
        width:100%;
        height:100%;
        background-image: url('../../assets/addcart.png') ;
    }
    .btn{
        width:90%;
        margin:5px auto;
        border:none;
        outline: none;
        border-radius:5px;
        background: #FC5101;
       
    }
    .btn button{
        width:100%;
        margin:5px auto;
        border:none;
        outline: none;
        border-radius:5px;
        background: #FC5101; 
        color:#fff;
    }
    .liststyle .del{
        display: inline-block;
        width:0;
    }
    .liststyle .pimg{
        padding:0 5px;
        display: inline-block;
        background-color: #000;
        color:#fff;
        margin:0 0 0.5rem 0;
        font-size: 14px;
        text-align: center;
    }
    .pimg img{
        width:20px;
    }
    .styletwo{
        padding:0 0 7px 0;
    }
</style>