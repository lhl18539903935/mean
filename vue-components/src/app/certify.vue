<template>
    <div class='give'>
      <group class="group">
        <x-input style="font-size: 14px;padding-top:14px;padding-bottom:14px;"  v-model="mobile"  title="手机号" :placeholder="phone"></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button @click.native='showPlugin' style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button></div>
      <div v-transfer-dom>
        <confirm v-model="show3"
                 show-input
                 :title="title"
                 :input-attrs="{type: 'number'}"
              >
        </confirm>
      </div>
    </div>
</template>

<script type="es6">
    import { Confirm, XInput, Group, XButton , TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
        TransferDom
      },
    data(){
      return{
        pageHeader:true,
        pageName:"转赠",
        show3:false,
        title:"",
        phone:"请输入受赠人的手机号",
        mobile:"",
        qrcode_num:"",
        bg:{white:false,grey:true},
      }
    },
    methods:{
      showPlugin () {
            let vm=this
            vm.$vux.confirm.show({
              title: '温馨提示',
              content: '您确定要将码号('+vm.qrcode_num+')转赠给账号为('+vm.mobile+')的接收人吗?确定后该号码将于您解绑.',
              onCancel () {
              },
              onConfirm () {
                vm.give()
              }
            })
          },
      give(){
          if(this.mobile.length==0){
              this.$vux.toast.show({
                  text: '请输入手机号',
                  type: "text",position:'bottom',
              })
              return;
          }
           let qrcode_id=this.$route.query.qrcode_id
            this.apiPost(this.phost+'/Dls/giveQrcode', {qrcode_id:qrcode_id,mobile:this.mobile}).then((res) => {
                this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                if(res.code==200){
                  this.$router.push({path: '/ws_manage'});
                }
            })
          }
        },
     mounted(){
       this.qrcode_num=this.$route.query.qrcode_num
      },
    components: {
      XInput,
      XButton,
      Group,
      Confirm,
    },
    mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  .give .weui-cells{font-size: 14px;margin-top: 10px;}
  .give .weui-btn_mini{padding:0 0.8em;}
</style>
