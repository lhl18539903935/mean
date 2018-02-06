<template>
  <div>
    <div v-if='yinhangka'>
      <group label-width="4.5em" label-margin-right="2em" title="请编辑">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="持卡人" placeholder="持卡人" v-model='name'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="卡号" :min="16" :max="19" placeholder="银行卡号" v-model='bankcard'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="所属银行" placeholder="所属银行" v-model='bankname'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="开户行" placeholder="银行卡开户行" v-model='bank'></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button @click.native='sumbmit' style="background-color: #6594fe;font-size: 16px;color:#fff;">确定</x-button></div>
    </div>
    <div v-if='zhifubao'>
      <group label-margin-right="2em" label-width="5.5em" title="请编辑">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="姓名" placeholder="请输入姓名" v-model='name'></x-input>
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="支付宝账号" placeholder="请输入支付宝账号" v-model='bankcard'></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button @click.native='sumbmit' style="background-color: #6594fe;font-size: 16px;color:#fff;">确定</x-button></div>
    </div>
  </div>
</template>

<script type="es6">
  import {Group,XInput,XButton} from "vux"
    export default {
      data(){
        return{
          name:'',
          pageHeader:true,
          pageName:"编辑银行卡",
          bg:{white:false,grey:true},
          bankname:'',
          bankcard:'',
          bank:'',
          zhifubao:false,
          yinhangka:true,
          dataList:[]
        }
      },
      mounted:function(){
        let vm = this;
        if(this.$route.query.type=='zhifubao'){
            this.pageHeader=true,
            this.pageName='编辑支付宝';
            this.zhifubao=true
            this.yinhangka=false
            this.$store.commit("setPageName", this.pageName)
        }
        this.apiPost(this.rhost+'/home/getUserCards', {card_id:this.$route.query.id}).then((res) => {
            let editList=res.data.data
            for(var i in editList){
              this.dataList=editList[i]
            }
            if(res.code==200){
               vm.name=this.dataList.owner_name;
               vm.bankname=this.dataList.card_below;
               vm.bankcard=this.dataList.card_number;
               vm.bank=this.dataList.card_bank
            }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
            }
        })
      },
      methods:{
        edit:function(account_type){
          let vm=this
          this.apiPost(this.rhost+'/home/doAboutBankCard',{account_type:account_type,type:'edit',card_number:this.bankcard,card_bank:this.bank,owner_name:this.name,card_id:this.$route.query.id,card_below:this.bankname}).then((res)=>{
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
        },
        sumbmit:function(){
          if(this.bankname.length==0 || this.bankcard.length==0 || this.bank.length==0 ||this.name.length==0){
              this.$vux.toast.show({
                text: '请填写完整信息再进行添加',
                type: "text",position:'bottom',
            })
            return
          }else{
            if(this.$route.query.type=='zhifubao'){
              this.edit("alipay")
            }else{
              this.edit("bankcard")
            }
          }
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
<style scoped>
  .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
</style>
