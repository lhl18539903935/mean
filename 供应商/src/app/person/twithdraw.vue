<template>
    <div>
      <div  style="font-size: 12px;text-align: center;background-color: #fff;">
        <div style="width:100%;margin-top: 3%;">
          <div class="tixian-one" style='border-top:none;'>提现时间</div>
          <div class="tixian-one" style='border-top:none;'>提现金额</div>
          <div class="tixian-one" style='border-top:none;'>提现状态</div>
          <div class="tixian-one" style='border-top:none;'>所属门店</div>

        </div>
        <div v-for='i in tixian' style="overflow: hidden;width: 99%;">
          <div class="tixian-one">{{i.time}}</div>
          <div class="tixian-one">{{i.cash_money}}</div>
          <div class="tixian-one">{{i.status}}</div>
          <div class="tixian-one">{{i.store_name}}</div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- <div v-if="no_item" style="text-align:center;margin:10px 15px;background: #fff;color: #e5e5e5;">暂无记录</div> -->
    </div>
</template>

<script type="es6">
    import {Group,Cell,FormPreview,XButton} from "vux"
    import http from "../../ajax.js"
    export default {
      components:{
        Group,
        Cell,
        FormPreview,
        XButton
      },
      data(){
        return{
           pageName:"提现记录",
           tixian:[],
           bg:{white:false,grey:true}
        }
      },
      mounted:function(){
        let vm = this;
        this.apiPost("http://r.huileyi.com/income/cashRecord", {}).then((res) => {
          console.log(res)
          if(res.code==200){
             vm.tixian=res.data;

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
  .tixian-one{width:25%;float:left;padding:10px 0;border-top:1px solid #e5e5e5;}
</style>
