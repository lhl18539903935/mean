<template>
  <div class='replace'>
    <group>
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" v-model="mobile"   title="新手机号" :placeholder="phone"></x-input>
      <div class="duani">
        <countdown style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>
        <x-input title="短信验证码" v-model='codeval' class="weui-vcode font"  placeholder="请输入短信验证码">
          <x-button style="background: #FF4948;" :disabled="disable001" slot="right" type="primary" mini @click.native='huoqu'><span v-if='!start'>获取验证码</span>

            <span v-if="start">{{time1}}s后重新发送</span></x-button>
        </x-input>
      </div>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='changePhone' style="background-color: #FF4948;font-size: 16px;color:#fff">确定</x-button></div>
  </div>
</template>

<script type="es6">
    import { XInput, Group, XButton, Cell,Countdown } from 'vux'
    import mixins from "../../vuex/mixin.js"
    import http from "../../ajax.js"
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"更换手机号",
        phone:"请输入要更换的手机号",
        code:"",
        mobile:"",
        value:'',
        time1:0,
        start: false,
        codeval:'',
        disable001:false,
        bg:{white:false,grey:true},
      }
    },
    methods:{
      changePhone(){
          this.apiPost("http://r.huileyi.com/home/changeUserMobile",{mobile:this.mobile,type:'changemobile',verify:this.codeval}).then((res)=>{
            console.log(res)
            if(res.code==200){
              this.$vux.toast.show({
               text: '保存成功',
               type:'success'
              })
              this.$router.push("/perMain")
            }else{
              this.$vux.toast.show({
               text: res.msg,
               type:'warn'
              })
            }
        })
      },
      finish2 (index) {
          this.time1 = 0
          this.start = false
          this.disable001=false
      },
      huoqu(){
          if(this.mobile.length==0){
              this.$vux.toast.show({
                  text: '请输入手机号',
                  type: "warn"
              })
              return;
          }
          let regPho=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
          if(!regPho.test(this.mobile)){
            this.$vux.toast.show({
              text:"请输入正确手机号",
              type:"warn"
            })
            return
          }
            this.time1=60
            this.start=true;
            this.disable001=true;
            this.apiPost('http://r.huileyi.com/home/getCode', {type:'changemobile',mobile:this.mobile}).then((res) => {
               if(res.code == 228){
                this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
              }

            })

          }
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      Countdown
    },
    mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .replace .weui-cells{margin-top: 10px;}
  .duani{
    font-size: 13px;
  }
  .replace .weui-btn_mini{    padding: 0 0.5em;}
</style>
