<template>
    <div class="add_bink">
      <group label-width="4em" label-margin-right="2em" title="请绑定持卡人本人的银行卡">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="持卡人" placeholder="持卡人" v-model='name'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" :min="16" :max="19" title="卡号" placeholder="银行卡号" v-model='bankcard'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="所属银行" placeholder="所属银行" v-model='bankname'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="开户行" placeholder="银行卡开户行" v-model='bank'></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button @click.native='sumbmit' style="background-color: rgb(255, 73, 72);font-size: 16px;color:#fff;">确定</x-button></div>
    </div>
</template>

<script type="es6">
  import {Group,Cell,XInput,XButton} from "vux"
  import mixins from "../vuex/mixin.js"
  import http from "../ajax.js"
    export default {
      data(){
        return{
          name:'',
          pageHeader:true,
          pageName:"添加银行卡",
          bg:{white:false,grey:true},
          bankname:'',
          bankcard:'',
          bank:''
        }
      },
      mounted:function(){

      },
      methods:{
        sumbmit:function(){
        let reg_bink=/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
          if(this.bankname.length==0 || this.bankcard.length==0 || this.bank.length==0 ||this.name.length==0){
              this.$vux.toast.show({
                text: '请填写完整信息再进行添加',
                type: "warn"
            })
            return
          }
          if(!reg_bink.test(this.bankcard)){
              this.$vux.toast.show({
                text:"银行卡号不正确",
                type:"warn"
              })
            return
          }else{
            let vm=this
            vm.apiPost("http://r.huileyi.com/home/doAboutBankCard",{account_type:'bankcard',type:'add',card_number:this.bankcard,card_bank:this.bank,owner_name:this.name,card_below:this.bankname}).then((res)=>{
              if(res.code==200){
                this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                this.$router.push({path: '/my_card'});
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
              }
            })
          }
        }
      },
      components:{
        Group,
        Cell,
        XInput,
        XButton
      },
      mixins:[mixins,http]
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .add_bink .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .add_bink .weui-cells__title{
    color: #959595;
  }
</style>
