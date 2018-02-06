<template>
    <div>
      <group label-width="5.5em" label-margin-right="2em" label-align="left" v-for="(item,index) in list" :key="index">
        <cell style="padding-top:14px;font-size: 14px;padding-bottom: 14px;" :title="item.title"  is-link></cell>
        </group>
    </div>
</template>

<script type="es6">
import{Group,Cell} from 'vux'
    export default {
      components:{
        Group,
        Cell
      },
      data(){
        return {
          pageName:"个人中心",
          list:[
            {title:"个人资料"},
            {title:"修改密码"},
            {title:"关于惠乐益"},
            {title:"退出"}
          ]
        }
      },
      mixins:[window.mixins]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
