<template>
  <div class='give'>
    <group class="group" label-width="5.5em">
      <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;" v-model="mobile" :disabled='isInput'  title="手机号" :placeholder="phone"></x-input>
      <div class="duani">
        <countdown style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>
        <x-input title="手机验证码" v-model='codeval' class="weui-vcode font"  placeholder="请输入手机验证码">
          <x-button style="background: #6594FE;" :disabled="disable001" slot="right" type="primary" mini @click.native='huoqu'>{{butval}}<span v-if="time1">{{time1}}s后重新发送</span></x-button>
        </x-input>
      </div>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native='sub' style="background-color: #6594FE;font-size: 16px;color:#fff">下一步</x-button></div>
  </div>
</template>

<script type="es6">
    import { XInput, Group, XButton, Cell,Countdown } from 'vux'
  export default {
    data(){
      return{
        isInput:true,
        pageHeader:true,
        pageName:"转赠",
        phone:"请输入您的手机号",
        code:"",
        mobile:"",
        value:'',
        time1:0,
        start: false,
        codeval:'',
        disable001:false,
        butval:'获取验证码',
        bg:{white:false,grey:true},
      }
    },
    methods:{
      finish2 (index) {
          this.time1 = 0
          this.start = false
          this.butval='获取验证码'
          this.disable001=false
      },
      huoqu(){
          if(this.mobile.length==0){
              this.$vux.toast.show({
                  text: '请输入手机号',
                  type: "text",position:'bottom',
              })
          }else{
            this.butval=''
            this.time1=60
            this.start=true;
            this.disable001=true;
            this.apiPost(this.rhost+'/home/getCode', {type:'giveqrcode',mobile:this.mobile}).then((res) => {
              if(res.code==228){
                this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                     type: "text",position:'bottom',
                })  
               
              }

            })
          }
        },
        sub(){
          let qrcode_id=this.$route.query.qrcode_id;
          let qrcode_num=this.$route.query.qrcode_num
          let url='/certify?qrcode_id='+qrcode_id+'&qrcode_num'+'='+qrcode_num;
          this.apiPost(this.rhost+'/home/checkMobVer', {type:'giveqrcode',mobile:this.mobile,verify:this.codeval}).then((res) => {
                if(res.code == 200){
                    this.$router.push(url);

                }else{
                  this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                  })
                }
            })
        },
    },
    mounted(){
       let vm=this
        vm.apiPost(this.rhost+'/home/getUserMessage',{}).then((res)=>{
          if(res.code==200){
            vm.mobile=res.data.mobile
          }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
            })
          }
        })
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      Countdown
    },
    mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  .give .weui-cells{font-size: 14px;margin-top: 10px;}
  .give .weui-btn_mini{padding:0 0.8em;}
</style>
