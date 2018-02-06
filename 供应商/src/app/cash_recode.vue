<template>
  <div>
    <group style="margin-top:-0.5rem;">
      <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px" :title="item.time"  :value="item.cash_money" v-for="(item,index) in list" :key="index"></cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Group,Cell} from "vux"
    export default {
      data(){
        return{
          pageName:"提现记录",
          bg:{white:false,grey:true},
          list:[
            //{time:"2017.08.25",cash_money:"2500(元)"},
            //{time:"2017.08.25",cash_money:"2500(元)"},
          ]
        }
      },
      methods:{
        getList(){
            let merchant_id=localStorage.getItem('merchant_id');
            let vm=this;
           this.apiPost("http://r.huileyi.com/Income/percentageCashRecord",{merchant_id:merchant_id}).then((res)=>{
                if(res.code == 200){
                  vm.list=res.data;
                }else{
                  this.$vux.toast.show({
                  text:res.msg,
                  type:"warn"
                  })
                }
         
            })
        } 
      },
      mounted(){
        this.getList();
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
