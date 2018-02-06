<template>
    <div class="shenhe" style="width:100%;">
      <div style="font-size: 12px;background-color: #fff;text-align: center;">
        <div style="width:100%;margin-top: 3%;">
          <div class="tixian-one" style='border-top:none;'>提现时间</div>
          <div class="tixian-one" style='border-top:none;'>提现金额</div>
          <div class="tixian-one" style='border-top:none;'>提现状态</div>
          <div class="tixian-one" style='border-top:none;'>所属门店</div>
        </div> 
        <div>
          <div  class="tixian-one">{{time}}</div>
          <div  class="tixian-one">{{cash_money}}</div>
          <div  class="tixian-one" style="color:rgb(255, 73, 72)">审核未通过</div>
          <div  class="tixian-one">{{store_name}}</div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="font-size: 12px;background-color: #fff;margin-top:3%">
        <div style="overflow:hidden;padding:1.5em 0 1.5em 2em;border-bottom:1px solid #eee">
          <span style='width:6%;float:left;'><img style="width:100%" src="../../assets/images/notong.png"></span>
          <span style="float:left;font-size: 12px;margin-left:.5em">审核未通过原因</span>
        </div>
        <div>
            <p style="padding:1em 0 0.5em 2em">{{fail_reason}}</p>
        </div>
      </div>
    </div>
</template>

<script type="es6">
    import {Group,Cell,FormPreview,XButton,Card} from "vux"
    import http from "../../ajax.js"
    export default {
      components:{
        Group,
        Cell,
        FormPreview,
        XButton,
        Card
      },
      data(){
        return{
           pageName:"提现记录",
           time:'',
           money:'',
           fail_reason:'',
           cash_money:'',
           time:'',
           store_name:''
        }
      },
      mounted:function(){
        let vm = this;
        this.apiPost("http://r.huileyi.com/income/cashRecord", {cash_id:this.$route.query.id}).then((res) => {
          console.log(res)
          if(res.code==200){
            vm.fail_reason=res.data[0].fail_reason
            vm.cash_money=res.data[0].cash_money
            vm.time=res.data[0].time
            vm.store_name=res.data[0].store_name
          }else{
                
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
  .shenhe .tixian-one{width:25%;float:left;padding:10px 0;border-top:1px solid #e5e5e5;}
</style>
