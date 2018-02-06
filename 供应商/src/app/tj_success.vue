<template>
  <div>
    <div style="text-align: center;height:180px;">
      <img style="border-radius: 50%;width:100px;margin-top:2rem;" src="../assets/images/txcg.png" alt=""/>
      <p style="font-size: 16px;margin-top:0.5rem;">提现申请已经提交</p>
    </div>
    <group>
      <cell :title="item.title" style="font-size: 14px" :value="item.value" v-for="(item,index) in list" :key="index"></cell>
    </group>
    <div style="width:90%;margin:1rem auto;">
      <x-button style="background-color: #FF4948;font-size: 16px;color:#fff;" link="/twithdraw">完成</x-button>
    </div>
  </div>
</template>

<script type="es6">
  import {Group,Cell,XButton} from "vux"
  import http from "../ajax.js"
    export default {
      components:{
        Group,
        Cell,
        XButton
      },
      mounted:function(){
        let shenhelist = JSON.parse(localStorage.getItem('shenqinglist'));
        // console.log(shenhelist.time)
        if(shenhelist){
          this.list[0].value=shenhelist.time;
          this.list[1].value=shenhelist.card;
          this.list[2].value=shenhelist.timoney;
          this.list[3].value=shenhelist.shouxufei;
        }
      },
      data(){
        return{
          pageName:"提现申请",
          bg:{white:true,grey:false},
          list:[ 
            {title:"预计到账时间",value:""},
            {title:"银行卡",value:""},
            {title:"提现金额",value:""},
            {title:"手续费",value:""}
          ]
        }
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
