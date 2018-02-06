<template>
    <div>
      <msg title="激活成功" description="您的二维码可以正常收款使用,您的资料我们将在1-3个工作日内审核,审核结果将发送到您的手机,请耐心等待"></msg>
      <div class="btn"><x-button link="/">去首页</x-button></div>
    </div>
</template>

<script type="es6">
  import { Msg, Divider, XButton } from 'vux'
    export default {
      data(){
      return{
        bg:{white:true,grey:false},
        pageFooter:false,
        pageName:'提交成功'
      }
    },
      components: {
        Msg,
        Divider,
        XButton
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .btn{
    width:90%;
    margin:0 auto;
  }
  .btn button{
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .weui-msg__title{
    color:#09BB07;
    margin-bottom:2rem!important;
  }
  .weui-msg__desc{
    font-size: 16px;
    color:#000;
    text-align: left;
  }
</style>
