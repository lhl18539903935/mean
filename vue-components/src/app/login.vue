<template>
	<div class="login">
	<x-header class='pad'style="width:100%;position:absolute;left:0;top:0;z-index:100;":left-options="{showBack: false}" :title="pageName">
		</x-header>
		<div class='usr annotherong'  :class="{usrbg:usrbg1}">
			<x-input @on-Blur="onBlur" name="username" v-model="username"  @on-focus='usrbg1=true' @on-blur='usrbg1=false'  placeholder="输入手机号"><img v-if='usrbg1' slot="label" style="padding-right:10px;display:block;" src="../assets/use.jpg"  width="24" height="24"><img v-else slot="label" style="padding-right:10px;display:block;" src="../assets/userone.jpg"  width="24" height="24"></x-input>
		</div>
		<div class='usr usertop' :class="{usrbg:usrbg2}">
			<x-input type="password" v-model="password" @on-focus='usrbg2=true' @on-blur='usrbg2=false' placeholder="输入密码"><img v-if='usrbg2' slot="label" style="padding-right:10px;display:block;" src="../assets/pas.png"  width="24" height="24"><img v-else slot="label" style="padding-right:10px;display:block;" src="../assets/passtow.png"  width="24" height="24"></x-input>
		</div>
		<button style='width:90%' @click='sbmit' class="weui-btn weui-btn_primary weui-btn_plain-primary">登录</button>
		<div class="other">
			<span class='password'><router-link to="/forgetPass"><span  style='color:#989797;float:left;'>忘记密码？</span></router-link></span>
			<span style='float:right;'><router-link class="zhuce" to="/register">注册</router-link></span>
		</div>
	</div>
</template>
<script type="es6">
	import {XInput,XButton,XHeader} from 'vux'
	import mixin from '../vuex/mixin.js'
	import http from '../ajax.js'
	export default{
		components:{
			XInput,
			XButton,
			XHeader
		},
		methods:{
			onBlur:function() {

			},
			sbmit:function() {
				if(this.username.length==0||this.password.length==0){
					this.$vux.toast.show({
                        text: '请填写用户名和密码',
                        type: "text",position:'bottom',
                    })
				}else{
					this.apiPost(this.rhost+'/home/toLogin', {mobile:this.username,password:this.password,type:'dls'}).then((res) => {
			        	if(res.code==200){
			        		localStorage.setItem('token',res.data.token)
		                    localStorage.setItem('ziliao',res.is_upload_profile);
		                    localStorage.setItem('rank',res.data.is_lowest);

		                    window.axios.defaults.headers.token = localStorage.getItem('token');
		                     window.axios.defaults.headers.type='dls'

			        		if(res.data.is_upload_profile==0){

		                    	this.$router.push({path: '/alreadySure'});
		                    	//window.location.href="/#/agreenment"
			        		}else{

		                    	this.$router.push({path: '/'});
		                    	//window.location.href="/"
			        		}
			        	}
			        	else{
				        		this.$vux.toast.show({
		                        text: res.msg,
		                        type: "text",position:'bottom',
		                    })
			        	}

			        })
				}
			},
		},
		data:function(){
			return{
				pageHeader:false,
				pageName:'乐宝-服务商',
				pageFooter:false,
				username:'',
				password:'',
				bg:{white:true,grey:false},
				usrbg1:false,
				usrbg2:false
			}
		},
		mixins:[mixin,http],
		activated:function(){
			// localStorage.setItem('token','')
			window.location.reload()
		},
		mounted(){
			// localStorage.setItem('token','')
			this.$store.commit('setBg',{white:true,grey:false})
		}
	}

</script>
<style>
.login .red {
  color: red;
}
.login .green {
  color: green;
}
.login .zhuce {
	color: #6594fe;
}
.login .usr {
	border: 1px solid #eee;
    width: 90%;
    margin: 0 auto;
    border-radius: 30px;
}
.login .weui-btn_plain-primary{
	color:#fff!important;
	border:none!important;
	outline:none!important
}
.login .usrbg{border:1px solid #6594fe;}
.login .usertop {
	margin-top: 7%;
	margin-bottom: 7%;
}
.login .annotherong {
	margin-top: 10%
}
.login .weui-btn_plain-primary {
    color: #fff;
    border: 1px solid #6594fe;
}
.login .weui-btn_primary {
    background-color: #6594fe !important;
}
.login .weui-btn{
	border-radius: 20px;
}
.login .other{
	width: 83%;
	margin: 0 auto;
	margin-top: 4%
}
.login .weui-icon-clear{
	color:#6594FE!important;
}
</style>
