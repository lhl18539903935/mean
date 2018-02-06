<!--<template>-->
    <!--<div>-->
      <!--<group label-width="4em" label-margin-right="2em" title="请绑定持卡人本人的银行卡">-->
        <!--<x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" v-model="binkname" title="持卡人" placeholder="value"></x-input>-->
        <!--<x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" v-mobile="cardNum" title="卡号" placeholder="银行卡号"></x-input>-->
        <!--<x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="开户行" v-model="binkaddress" placeholder="银行卡开户行"></x-input>-->
      <!--</group>-->
      <!--<div style="width:90%;margin:1rem auto;"><x-button style="background-color: #6594FE;font-size: 16px;color:#fff;" l @click.native="submit">确定</x-button></div>-->
    <!--</div>-->
<!--</template>-->


<!--<script type="es6">-->
  <!--import {Group,Cell,XInput,XButton} from "vux"-->
    <!--export default {-->
      <!--data(){-->
        <!--return{-->
          <!--pageHeader:true,-->
          <!--pageName:"添加银行卡",-->
          <!--value:"杨梦龙",-->
          <!--cardNum:"",-->
          <!--binkname:"",-->
          <!--binkaddress:""-->
        <!--}-->
      <!--},-->
      <!--components:{-->
        <!--Group,-->
        <!--Cell,-->
        <!--XInput,-->
        <!--XButton-->
      <!--},-->
      <!--methods:{-->
        <!--submit(){-->
        <!--if(this.binkname.length==0||this.binkaddress.length==0||this,cardNum.length==0){-->
          <!--this.$vux.toast.show({-->
            <!--text;"请填写完整信息在进行添加",-->
            <!--type:"warn"-->
          <!--})-->
          <!--return false-->
        <!--}-->
        <!--let num=this.cardNum-->
        <!--var reg = /^(\d{16}|\d{19})$/;-->
        <!--if(!reg.test(num)){-->
          <!--this.$vux.toast.show({-->
              <!--text:"请正确输入银行卡卡号",-->
              <!--type:"warn"-->
            <!--})-->
          <!--}else{-->
            <!--this.apiPost("http://r.huileyi.com/home/doAboutBankCard",-->
            <!--{type:"add",card_number:this.cardNum,card_bank:this.binkaddress,owner_name:this.bink.name }).then((res)=>{-->
              <!--console.log(res)-->
            <!--})-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--mounted(){-->
        <!--this.submit()-->
      <!--},-->
      <!--mixins:[window.mixins]-->
    <!--}-->
<!--</script>-->
<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
  <!--.font{-->
    <!--font-size: 14px;-->
    <!--padding-top:14px;-->
    <!--padding-bottom:14px;-->
  <!--}-->
<!--</style>-->
