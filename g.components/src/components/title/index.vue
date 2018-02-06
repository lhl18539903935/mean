<template>
    <div class="title" :style="'margin-top:'+modulePadding+'px;margin-bottom:'+modulePadding+'px;'">
        <!--标题组件-->
        <div :class="title" :style="'text-align:'+direction+';color:'+titleColor+';background-color:'+bgColor+';'" v-show="statezero"><p>{{title}}</p></div>
        <div :class="title" :style="'text-align:'+direction+';color:'+titleColor+';'" v-show="stateone"><p class="twostyle"><span>{{title}}</span></p></div>
        <div :class="title" :style="'text-align:'+direction+';color:'+titleColor+';'" v-show="statetwo"><p>{{title}}—————————</p></div>
        <div class="bordercol" :class="title" :style="'text-align:'+direction+';color:'+titleColor+';border-left-color:'+BackgroundColor+';'" v-show="statethree"><p>{{title}}</p></div>
    </div>
</template>

<script>
    export default {
        name:'title',
        props:{
            	// 显示方式（[left,conter,right]=[居左，居中，居右]）
           direction:{
               type:String,
               default:'left'
           },
        //    文字颜色
           titleColor:{
               type:String,
               default:'#000'
           },
        //    标题名称
           title:{
               type:String,
               default:''
           },
        //    边框颜色（样式四专用，其他样式无边框）
           BackgroundColor:{
               type:String,
               default:'green'
           },
           	// 模块上下边距
           modulePadding:{
               type:Number,
               default:10
           },
        //    样式id （[0，1，2，3]为样式[一，二，三，四])
           styleid:{
               type:String,
               default:""
           },
        //    样式一背景颜色
           bgColor:{
               type:String,
               default:"red"
           }
         
        },
        created(){
            if(this.styleid==0){
                this.statezero=true
                this.stateone=false
                this.statetwo=false
                this.statethree=false
            }
            if(this.styleid==1){
                this.statezero=false
                this.stateone=true
                this.statetwo=false
                this.statethree=false
            }
            if(this.styleid==2){
                this.statezero=false
                this.stateone=false
                this.statetwo=true
                this.statethree=false
            }
            if(this.styleid==3){
                this.statezero=false
                this.stateone=false
                this.statetwo=false
                this.statethree=true
            }
        },
        components:{
            
        },
        data(){
            return{
                statezero:false,
                stateone:false,
                statetwo:false,
                statethree:false
            }
        },
        methods:{

        },
        mounted(){
            
        }
    }

</script>

<style scoped>
    .title{
        width:100%;
    }
   .title div{
       width:95%;
       padding:3px 0;
       margin: 0 auto;
   }
   .title p{
       width:95%;
       margin: 0 auto;
   }
   .title .bordercol{
       border-left:3px solid #000;
   }
   .title span{
       margin:0;
       border-bottom:2px solid #000
   }
</style>