<template>
  <div>
    <group class="top" v-if='ss==1'>
      <div class="group" style="padding:1rem 0;border:1px solid #ddd;border-bottom:none;width:100%;background-color: #fff;" >
        <span class="" style="width:40%;display: inline-block;padding-left:1rem;">{{owner_name}}</span>
        <div class="rt" style="margin-right:25px;vertical-align: middle">
          <!-- <img  class="style " style="vertical-align:middle;" :src="item.src" alt=""/> -->
          <span>{{card_below}}{{"("+card_number.slice(-4)+")"}}</span>
        </div>
      </div>
      <cell style="font-size: 14px;padding-top:14px;padding-bottom:14px;" :value="card_bank"></cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Cell,Group,Actionsheet,Confirm} from "vux"
  import http from '../ajax.js'
    export default {
      components:{
        Cell,
        Group,
        Actionsheet,
        Confirm
      },
      data(){
        return {
          bg:{white:false,grey:true},
          owner_name:'',
          card_below:'',
          card_number:'',
          card_bank:'',
          go:'',
          card_id:'',
          add:false,
          pageHeader:true,
          pageName:"查看结算账号",
          list:[],
          ss:'',
        }
      },
      mounted:function(){
        let vm = this;
        this.apiPost("http://r.huileyi.com/home/getDefaultCard", {}).then((res) => {
             console.log(res)
             if(res.code==200){
                vm.owner_name=res.data.owner_name;
                vm.card_below=res.data.card_below;
                vm.card_number=res.data.card_number;
                vm.card_bank=res.data.card_bank;
                vm.ss=1;
             }else{
                this.$vux.toast.show({
                  text: res.msg,
                  type: "warn"
                })
             }
        })
      },
      methods:{
        
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top{
    margin-top:-0.5rem;
    color:#000;
  }
  .group{
    font-size: 14px;
  }
  .public{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
  }
  .style{
    width:20px;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .valueShow{
    display:block;
  }
</style>
