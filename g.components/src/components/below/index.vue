<template>
    <div v-if='show'>
        <div class='below-header' >
            <div class='below-content' :style="'width:'+wsize+'%;height:'+hsize+'%;'">
                <img class='below-img' :style="'width:'+isize+'px;height:'+iheight+'px;'" :src="src" alt="">
                <p class='below-p' :style="'font-size:'+font+'px;'" :class='handinling'>{{handinling}}</p>
            </div>  
        </div>
    </div>
</template>

<script>
    export default {
        name: 'below',
        props:{
            show:{
                type:Boolean,
                default:true,
            },
            // 图片内容介绍 类型：string
            handinling:{
                type:String
            },
            // 图片路径 src 类型：string
            src:{
                type:String
            },
            // below组件 整体宽度 类型：Number
            wsize:{
                type:Number,
                default:20
            },
            // below 组件整体高度 类型：Number
            hsize:{
                type:Number,
                default:20
            },
            // 图片宽度 类型：Number
            isize:{
                type:Number,
                default:20
            },
            // 图片高度 类型：Number
            iheight:{
                type:Number,
                default:20
            },
            // 字体大小 类型：Number
            font:{
                type:Number,
                default:14
            }
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
    .below-header{
        width:95%;
        margin:0.5rem auto;
    }
   .below-content{
       width:100%;
       display: inline-block;
       text-align: center;
       float: left;
   }
   .below-content .below-p{
       /*font-size: 14px;*/
       color:#646464;
   }
   .below-content .below-img{
       display: inline-block;
       overflow: hidden;
   }
</style>