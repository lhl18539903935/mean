<template>
  <div>
    <group style="margin-top:-0.5rem;">
      <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px" :title="item.title"  :value="item.value" v-for="(item,index) in list" :key="index"></cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Group,Cell} from "vux"
    export default {
      data(){
        return{
          pageHeader:true,
          bg:{white:false,grey:true},
          pageName:"提现记录",
          list:[
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"},
            {title:"2017.08.25",value:"2500(元)"}
          ]
        }
      },
      components:{
        Group,
        Cell
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
