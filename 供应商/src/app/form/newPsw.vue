<template>
  <div>
    <group>
      <x-input  title="新密码" placeholder="请输入新密码"></x-input>
    </group>
    <group>
      <x-input title="确认新密码" class="weui-vcode" placeholder="请再次输入新密码">
      </x-input>
    </group>
    <div class="x_btn"><x-button :link="{path:'/login'}">确定</x-button></div>
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
