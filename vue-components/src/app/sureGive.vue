<template>
    <div>
      <group label-width="5.5em" label-margin-right="2em">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="接收者账号" class="weui-vcode" placeholder="请输入被转赠者手机号"></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button style="background: #6594FE;font-size: 16px;color:#fff" link="sureGive">确认</x-button></div>
      <div  class="model" >
        <div class="content" style="margin-top:-144px;">
          <h3 style="">温馨提示</h3>
          <p style="margin:0 0 1rem  1rem;width:90%;">您确定要将码号(8844080)转赠给账号为(1589789845)的接收人吗?
            确定后改号码将与您解绑。
          </p>
          <div style="margin-bottom:1rem">
            <button>取消</button>
            <button>确定</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="es6">
  import {Group,XInput,XButton} from "vux"
    export default {
      data(){
        return {
          pageHeader:true,
          pageName:'转增',
          bg:{white:false,grey:true},

        }
      },
      components:{
        Group,
        XButton,
        XInput
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*//模态框*/
  .model{
    position: fixed;
    top:0;
    background:rgba(0,0,0,.5);
    z-index:501;
    width: 100%;
    height:100%;
  }
  .content{
    width:90%;
    background: #fff;
    position: absolute;
    top:50%;left:50%;
    margin-left:-45%;
    margin-top:-71px;
    text-align: center;
    border-radius: 5px
  }
  .model h3{
    margin:1rem 0;
    color:#6594FE
  }
  .model button{
    width:25%;
    height:30px;
    display: inline-block;
    border-radius:4px;
    border:1px solid #ddd;
    background: #fff;
    margin:0 20px;
  }
  .model button:last-child{
    background: #6594FE;
    color:#fff;
  }
</style>
