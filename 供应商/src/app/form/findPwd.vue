<template>
  <div>
    <group>
      <x-input  title="手机号" placeholder="请输入手机号"></x-input>
    </group>
    <group>
      <x-input title="手机验证码" class="weui-vcode" placeholder="请输入手机验证码">
        <x-button style="background: #6594FE;" slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
    </group>
    <div class="x_btn"><x-button :link="{path:'/newPsw'}">下一步</x-button></div>
  </div>
</template>

<script type="es6">
    import {Group,XInput,XButton,Cell} from "vux"
    export default {
      data(){
        return{
        title:"手机号"
        }
      },
      components:{
        Group,
        XInput,
        XButton,
        Cell
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .agreement{
    width:100%;
    height:50px;
    line-height:50px;
    display: block;
    vertical-align: top;
    margin-top:1rem;
  }
  .agreement input{
    width:1.2rem;
    height:1.2rem;
    display: inline-block;
    margin:0 0 0 1rem;
  }
  .agreement a{
    display:inline-block;
    margin-top:-4px;
    vertical-align: top;
    color:#C0C0C0;
  }
  .x_btn{
    width:90%;
    margin:1rem auto;
  }
  .x_btn button{
    background: #6594FE;
    color:#fff;
  }
</style>
