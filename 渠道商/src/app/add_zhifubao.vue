<template>
  <div class="my_bank">
    <group  label-width="7em" title="请绑定与真实姓名一致的支付宝账号">
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="姓名" placeholder="请输入姓名" v-model='name'></x-input>
      <x-input  style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="支付宝账号" placeholder="请输入支付宝账号" v-model='bankcard'></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='sumbmit' style="background-color: #6594fe;font-size: 16px;color:#fff;">确定</x-button></div>
  </div>
</template>

<script type="es6">
  import {Group,XInput,XButton} from "vux"
    export default {
      data(){
        return{
          name:'',
          pageHeader:true,
          pageName:"添加支付宝账户",
          bg:{white:false,grey:true},
          bankcard:'',
        }
      },
      mounted:function(){

      },
      methods:{
        sumbmit:function(){
        var num= document.querySelector('#num');
          let bankcard=this.bankcard
           var emile = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
           let regPho=/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/
           // let regPho=/^1[0-9]{10}|\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if(this.bankcard.length==0 ||this.name.length==0){
              this.$vux.toast.show({
                text: '请填写完整信息再进行添加',
                type: "text",position:'bottom',
            })
            return
          }

           if(regPho.test(this.bankcard)){
          }else if(emile.test(this.bankcard)){
          }else{
              this.$vux.toast.show({
              text:"请填写正确的支付宝账号",
              type:"text",
                position:'bottom'
            })
              return
          }
            let vm=this
            vm.apiPost(this.rhost+'/home/doAboutBankCard',{account_type:'alipay',type:'add',card_number:this.bankcard,owner_name:this.name}).then((res)=>{
              if(res.code==200){
                this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                this.$router.push({path: '/my_card'});
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
              }
            })
          }

      },
      components:{
        Group,
        XInput,
        XButton
      },
      mixins:[window.mixins,window.http]
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .my_bank .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }

</style>
