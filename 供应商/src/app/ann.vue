<template>
	<div class="vv">
		<group v-for='i in cemrnt' :key='i.id' @click.native='gogngao(i.id)'>
			<p style="color:#2e2e2e">{{i.title}}</p>
			<flexbox :gutter="0" wrap="wrap">
		    	<flexbox-item v-for='s in i.pic' :key='s.id' :span="1/3"><div><img :src='s'></div></flexbox-item>
		    </flexbox>
		    <p style="font-size:14px;color:#959595;float:right">{{myfilter(i.addtime)}}</p>
		</group>
	</div>
</template>
<script>
	import {Flexbox,FlexboxItem,Group,Popup} from 'vux'
	import mixin from '../vuex/mixin.js'
	import http from '../ajax.js'
	import format from '../tools/date/format.js'
	export default {
		data:function(){
			return{
				pageName:'公告',
				pageHeader:true,
				bg:{white:false,grey:true},
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
            gogngao:function(id){
            	this.$router.push({path: '/annDetail?id='+id});
            }
		},
		mounted:function(){
			let vm = this;
			this.apiPost('http://r.huileyi.com/home/getAffiche', {}).then((res) => {
	        	console.log(res);
	        	if(res.code==200){
	        		vm.cemrnt=res.data
	        	}
	        })
		},
		components:{
			Flexbox, 
			FlexboxItem,
			Group,
			Popup
		},
		mixins:[mixin,http],
	}
</script>
<style>
	.vv .weui-cells{margin-top:10px;}
	.vv .weui-cells{
		padding: 5% 5% !important;
	}
	.vv img{
		width: 100%
	}
</style>