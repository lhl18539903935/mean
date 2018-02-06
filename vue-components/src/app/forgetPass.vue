<template>
	<div class="reg">
		<group class='regNum' label-width="5.5em">
			<x-input title="手机号码" :max="11" v-model='mobile' placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
		</group>
		<group label-width="5.5em">
			<x-input title="手机验证码" v-model='code' placeholder="请输入手机验证码" class="weui-vcode">
		    	<x-button style="background: #6594FE;" class="getCode" :disabled="isAble" slot="right" type="primary" mini @click.native='getCode'>{{btnText}}<span v-if="timer">{{timer}}s后重新发送</span>
		    	</x-button>
		    </x-input>
		</group>

		<button style='width:90%;color:#fff;margin-top:1em;' @click='sbmit' class="weui-btn weui-btn_primary">下一步</button>

	</div>
</template>
<script type="es6">
	import {XInput,XButton,Group} from 'vux'
	export default {
		components:{
			XInput,
			XButton,
			Group,
		},
		data:function() {
			return{
				code:'',
				mobile:'',
				pageHeader:true,
				pageName:'忘记密码',
				pageFooter:false,
				demo2:false,
				bg:{white:false,grey:true},
				start:false,
				timer:0,
				isAble:false,
				btnText:'获取验证码'
			}
		},
		mixins:[window.mixins,window.http],
		methods:{
			finish(){

				this.timer=0;
				this.btnText='获取验证码'
				this.isAble=false;
			},
			getCode(){

				let mobile=this.mobile;
				if( mobile == ''){
					this.$vux.toast.show({
                        text: '请填写手机号',
                        type: "text",position:'bottom',
                    })
					return;
				}

				//验证手机号
              var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
              if(!myreg.test(mobile))
              {
                  this.$vux.toast.show({
                      text: '请输入正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }

              this.timer=60;
              this.btnText=''
              this.start=true;
              this.isAble=true;
              let vm=this;
              var int=setInterval(function(){
              	vm.timer--;
              	if(vm.timer==0){
              		clearInterval(int);
              		vm.finish();
              	}
              },1000)

				 this.apiPost(this.rhost+'/home/getCode', {mobile:mobile,type:'findpassword'}).then((res) => {
                    if(res.code==228){
                       this.$vux.toast.show({
                        text: res.msg,
                        type:'success'
                    })

                    }else{
                    	this.$vux.toast.show({
                        text: res.msg,
                        type: "text",position:'bottom',
                    	})
                    }
                })

			},
			sbmit(){
				let code= this.code;
				let mobile=this.mobile;
				if( mobile == ''){
					this.$vux.toast.show({
                        text: '请填写手机号',
                        type: "text",position:'bottom',
                    })
					return;
				}
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				if(!myreg.test(mobile))
					{
						this.$vux.toast.show({
							text: '请输入正确的手机号！',
							type: "text",position:'bottom',
						})
						return false;
					}
				if( code =='' ){
					this.$vux.toast.show({
                        text: '请填写验证码',
                        type: "text",position:'bottom',
                    })
					return;
				}
				this.apiPost(this.rhost+'/home/checkMobVer', {mobile:mobile,type:'findpassword',verify:code}).then((res) => {
                    if(res.code==200){
                       localStorage.setItem('codekey',res.data.codekey)
                      this.$router.push('/newPass')
                    }else{
                    	this.$vux.toast.show({
	                        text: res.msg,
	                        type: "text",position:'bottom',
	                    })
                    }
                })


			}
		},
		mounted(){

		},
		mixins:[window.http,window.mixins]

	}
</script>
<style>
	.reg{font-size: 14px;}
	.reg .weui-btn_primary {
	    background-color: #6594fe !important;
	}
	.reg .weui-cells{
		margin-top: 10px ;
		font-size:14px;

	}
	.reg .bg {
		padding-top: 3%;
	}
	.reg .vux-check-icon > span {
		color: #bab9b9 !important;
	}
	.reg .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
	    color: #6594fe !important;
	}
	.reg .wi {
		width: 96%;
		margin: 0 auto;
		margin-top: 3%;
		margin-bottom: 3%;
	}
	.reg .weui-btn_mini{padding:0 0.8em;margin-right: -5px;}
	.reg .getCode{font-size: 12px;}
	.reg .regNum .weui-cells{height:3.5em;line-height: 2.0em;}
</style>

