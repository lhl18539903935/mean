<template>
    <div>
        <!--热门标题-->
        <div v-show="show" class='hot' :class="hottitlt" :style="'color:'+bgcolor+';'">——<img class="hotimg" :src="src" alt=""> {{hottitlt}}  ——</div>
    </div>
</template>

<script>
    export default {
        name:'title',
        props:{
            //热门标题
           hottitlt:{
            type:String
           },
           //热门标题颜色
           bgcolor:{
            type:String,
            default:'#e4393c'
           },
           //热门图片
           src:{
            
           },
           //是否显示热门标题
           show:{
               type:Boolean,
               default:true
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
   .hot{
       text-align: center;
       font-weight:600;
       line-height:20px;
       margin:0.5rem 0
   }
   .hotimg{
       width:20px;
       height:20px;
       vertical-align:middle;
       margin:0 0.3rem 0 0.6rem; 
   }
</style>