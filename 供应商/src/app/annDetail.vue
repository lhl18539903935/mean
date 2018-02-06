<template>
	<div style="margin-top: 4%;">
		<p style="font-size:20px;color:#2e2e2e;padding: 0 5%;" v-html='title'></p>
		<p style="font-size:14px;color:#959595;padding: 0 5%;" v-html='addtime'></p>
		<p style="font-size:14px;color:#2e2e2e;text-indent: 20px;margin-top: 2%;padding: 0 5%;" v-html='content'></p>
	</div>
</template>
<script>
	import mixin from '../vuex/mixin.js'
	import http from '../ajax.js'
	import format from '../tools/date/format.js'
	export default {
		data:function(){
			return{
				pageName:'公告',
				pageHeader:true,
				bg:{white:true,grey:false},
				cemrnt:[],
				conteshow:false,
				title:"",
				addtime:"",
				content:""
			}
		},
		methods:{
			myfilter(value){
                return format(value*1000,'YYYY.MM.DD')
            },
		},
		mounted:function(){
	    	let vm = this;
	    	this.apiPost('http://r.huileyi.com/home/getAfficheDetail', {id:this.$route.query.id}).then((res) => {
	        	console.log(res);
	        	if(res.code==200){
	        		vm.title=res.data.title;
	        		vm.addtime=vm.myfilter(res.data.addtime);
	        		vm.content=res.data.content
	        	}
	        })
		},
		mixins:[mixin,http],
	}
</script>
<style>
	.vv .weui-cells{
		padding: 5% 5% !important;
	}
	.vv img{
		width: 100%
	}
</style>