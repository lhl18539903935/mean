<template>
    <div>
      <group label-margin-right="2em"  label-width="5.5em" title="请绑定与真实姓名一致的支付宝账号">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="姓名" placeholder="请输入姓名" v-model='name'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="支付宝账号" placeholder="请输入支付宝账号" v-model='bankcard'></x-input>
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
          pageName:"",
          bg:{white:false,grey:true},
          bankcard:'',
          id:''
        }
      },
      mounted:function(){
        this.id=this.$route.query.id;
        if(this.id){
          this.pageName='编辑支付宝账户'
        }else{
          this.pageName='添加支付吧账户'
        }
        this.$store.commit("setPageName", this.pageName)
        let vm = this;
        this.apiPost("http://r.huileyi.com/home/getUserCards", {card_id:this.id}).then((res) => {
            console.log(res)
            if(res.code==200){
               vm.name=res.data.owner_name;
               vm.bankname=res.data.card_below;
               vm.bankcard=res.data.card_number;
               vm.bank=res.data.card_bank
            }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
            }
        })
      },
      methods:{
        sumbmit:function(){
          let regPay=/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/;
          if(!regPay.test(this.bankcard)){
            this.$vux.toast.show({
              text:"请输入正确的支付宝账号",
              type:"warn"
            })
            return
          }
          if(this.bankcard.length==0 ||this.name.length==0){
              this.$vux.toast.show({
                text: '请填写完整信息再进行添加',
                type: "warn"
            })
          }else{
            let vm=this
            let type;
            if(vm.id){
              type='edit'
            }else{
              type='add'
            }
                vm.apiPost("http://r.huileyi.com/home/doAboutBankCard",{account_type:'alipay',type:type,card_number:this.bankcard,owner_name:this.name,card_id:vm.id,card_bank:'支付宝'}).then((res)=>{
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
<style scoped>
  .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
</style>
