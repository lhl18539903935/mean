<template>
    <div class="shenhe" style="width:100%;">
      <div style="font-size: 12px;background-color: #fff;text-align: center;">
        <div style="width:100%;margin-top: 3%;">
          <div class="tixian-one" style='border-top:none;'>提现时间</div>
          <div class="tixian-one" style='border-top:none;'>提现金额</div>
          <div class="tixian-one" style='border-top:none;'>提现状态</div>
          <!-- <div class="tixian-one" style='border-top:none;'>所属门店</div> -->
        </div>
        <div>
          <div  class="tixian-one">{{myfilter(time)}}</div>
          <div  class="tixian-one">{{cash_money}}</div>
          <div  class="tixian-one" style="color:rgb(255, 73, 72)">审核未通过</div>
          <!-- <div  class="tixian-one">{{store_name}}</div> -->
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="font-size: 12px;background-color: #fff;margin-top:3%">
        <div style="overflow:hidden;padding:1.5em 0 1.5em 2em;border-bottom:1px solid #eee">
          <span style='width:4%;float:left;margin-top:2px;'><img style="width:100%;" src="../assets/notong.png"></span>
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
    import format from '../tools/date/format.js'
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
           pageHeader:true,
           pageName:"提现记录",
           time:'',
           money:'',
           fail_reason:'',
           cash_money:'',
           time:'',
           store_name:'',
           currentPage:1,
           bg:{white:false,grey:true},
        }
      },
      mounted:function(){
        let vm = this;
        let currentPage=vm.currentPage
        this.apiPost(this.rhost+"/Dlsgains/dlsCashRecord", {page:currentPage,log_id:this.$route.query.card_id}).then((res) => {
          if(res.code==200){
            this.time=res.data.time
            this.cash_money=res.data.cash_money
            this.fail_reason=res.data.fail_reason
          }else{
             this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
             })
          }
        })
      },
      methods:{
        myfilter(value){
            return format(value*1000,'YYYY.MM.DD  HH:mm:ss')
        },
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shenhe .tixian-one{width:33.3%;float:left;padding:10px 0;border-top:1px solid #e5e5e5;}
</style>
