<template>
    <div>
        <!--:xtime="3" 时间  number //时间越小越好
        :maxshow="true" 遮罩层 boolean
        :minshow="true" logo背景 boolean
        xbg="#fe4a48" logo背景颜色 string
        xsize="100" logo大小 宽高相等 Number
        -->
        
            <logo v-show='show'>
                <!--<img src="./logo.png" alt="">-->
            </logo>


    </div>
</template>

<script>
    import logo from './index.vue'
    export default {
        name: 'loading',
        props:{
            show:false
        },
        data(){
          return{
              maxshow:true,
              minshow:true
          }
        },
        components:{
            logo
        }
    }

</script>

<style scoped>

</style>