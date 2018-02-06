<template>
  <div class="add_bink">
    <group label-width="5em" label-margin-right="2em" title="请绑定持卡人本人的银行卡">
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="持卡人" placeholder="持卡人" v-model='name'></x-input>
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" :min="16" :max="19" title="卡号" placeholder="银行卡号" v-model='bankcard'></x-input>
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="所属银行" placeholder="所属银行" v-model='bankname'></x-input>
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="开户行" placeholder="银行卡开户行" v-model='bank'></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='sumbmit' style="background-color: #6594fe;font-size: 16px;color:#fff;">确定</x-button></div>
  </div>
</template>

<script type="es6">
  import {Group,Cell,XInput,XButton} from "vux"
    export default {
      data(){
        return{
          name:'',
          pageHeader:true,
          pageFooter:false,
          pageName:"添加银行卡",
          bg:{white:false,grey:true},
          bankname:'',
          bankcard:'',
          bank:'',
          addBinkState:"",
          type:'add'
        }
      },
      mounted:function(){
        this.getDefaultCard()
      },
      methods:{
        getDefaultCard(){
          let vm =this;
            this.apiPost(this.rhost+'/Home/getDefaultCard').then((res)=>{
              vm.name=res.data.owner_name
              vm.bankcard=res.data.card_number
              vm.bankname=res.data.card_below
              vm.bank=res.data.card_bank
              vm.card_id=res.data.card_id
              if(vm.name){
                this.pageName="编辑银行卡"
                this.$store.commit("setPageName", this.pageName)
                 this.type='edit'
              }else{
                this.pageName="添加银行卡"
                this.$store.commit("setPageName", this.pageName)
              }
            })
         },
        sumbmit(){
        let reg_bink=/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
          if(this.bankname.length==0 || this.bankcard.length==0 || this.bank.length==0 ||this.name.length==0){
              this.$vux.toast.show({
                text: '请填写完整信息再进行添加',
                type: "text",position:'bottom',
            })
            return
          }
          if(!reg_bink.test(this.bankcard)){
              this.$vux.toast.show({
                text:"银行卡号不正确",
                type:"text",
                position:'bottom'
              })
            return
          }else{
            let vm=this
            vm.apiPost(vm.rhost+'/home/doAboutBankCard',{account_type:'bankcard',type:this.type,card_number:this.bankcard,card_bank:this.bank,owner_name:this.name,card_below:this.bankname,card_id:this.card_id}).then((res)=>{
              if(res.code==200){
                this.$vux.toast.show({
                    text: '绑定成功',
                    type: "success"
                })
                  this.$router.push({path: '/Perfectdata?addBinkState=addBinkState'});

              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
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
      mixins:[window.mixins,window.http]
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
