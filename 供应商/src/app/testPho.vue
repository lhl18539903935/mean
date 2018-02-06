<template>
    <div>
      <group style="margin-top:-0.5rem;">
        <x-input class="font" v-model="mobile" title="手机号码" name="mobile" placeholder="请输入手机号码"  ></x-input>
      </group>
      <group class="weui-cells_form" style="margin-top:-0.5rem;">
        <x-input  title="发送验证码" v-model="code" class="weui-vcode font" placeholder="请输入验证码">
          <x-button slot="right" :class="{'color':choose}"
                    class="btn " v-bind:disabled="dis" type="primary" mini
                    style="" @click.native="next">发送验证码{{count}}</x-button>
        </x-input>
      </group>
      <div style="width:90%;margin:1rem auto;">
        <x-button style="background: #FF4948;color:#fff;font-size: 16px;" >下一步</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import { XInput, Group, XButton, Cell } from 'vux'
    export default {
       data(){
       return {
         pageName:"验证手机号",
         bg:{white:true,grey:false},
         choose:false,
         count:60,
         dis:false,
         mobile:"",
         code:""
       }
      },
      methods:{
      selected(){
            let vm=this
           let timer=setInterval(function(){
              vm.count--
            if(vm.count<=0){
               clearInterval(timer)
               }else{
                vm.dis=true
                vm.choose=true
            }
          },100)
        },
        next(){
           let mobile=this.mobile
           let pattern = /^((1[3,7,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
           if(!pattern.test(mobile)){
             this.$vux.toast.show({
                 text: '手机格式不正确',
                 type: "warn"
             })
             return
           }
           if(this.mobile.length==0){
            this.$vux.toast.show({
                 text: '手机号码不能为空',
                 type: "warn"
             })
          }else{
            this.selected()
            this.$router.push('/information')
          }
        }
      },
      components: {
        XInput,
        XButton,
        Group,
        Cell
      },
      mixins:[window.mixins]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .font{
    font-size: 14px;
  }
  .btn{
    background: #FF4948
  }
  .color{
    background-color:#E9E9E9!important;
  }
</style>
