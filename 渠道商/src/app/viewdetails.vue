<template>
	<div class="view">
		<group>
			<cell :title="('姓名')" :value="nameval" class='font'></cell>
			<cell :title="('手机号')" :value="phoneval" class='font'></cell>
			<cell :title="('身份证号')" :value="idval" class='font'></cell>
			<cell :title="('激活码数')" :value="codeval" class='font'></cell>
			<cell :title="('所属区域')" :value="foundval" class='font'></cell>
			<cell :title="('公司名称')" :value="canval" class='font'></cell>
		</group>
		<group style="padding-bottom:2em;">
			<cell :title="('身份证信息')" class='font'></cell>
			<div style='height:5em;'>
				<div class="sfi"><img :src="shzm"></div>
				<div class="sfi"><img :src="shfm"></div>
			</div>
			<div style="clear:both;"></div>
		</group>
	</div>
</template>
<script type="es6">
	import {Group,Cell} from 'vux'
	export default {
		components:{
			Group,
			Cell
		},
		data:function() {
			return{
				pageHeader:true,
				bg:{white:false,grey:true},
				pageName:'',
				nameval:'',
				phoneval:'',
				idval:'',
				codeval:'',
				foundval:'',
				canval:'',
				shzm:'',
				shfm:''
			}
		},
		mixins:[window.mixins,window.http],
		mounted:function(){
			var vm = this;
			this.apiPost(this.phost+'/Dls/lowerDlsDetail', {user_id:this.$route.query.id}).then((res) => {

	        	if(res.code==200){
	        		this.$store.commit("setPageName", res.data.name)

	        		vm.nameval=res.data.name;
	        		vm.phoneval=res.data.mobile;
	        		vm.idval=res.data.idcard;
	        		vm.codeval=res.data.qr_count;
	        		vm.foundval=res.data.province+res.data.city+res.data.area;
	        		vm.canval=res.data.company;
	        		vm.shzm=res.data.card_positive_img;
	        		vm.shfm=res.data.card_negative_img;

	        	}else{
		        		this.$vux.toast.show({
                        text: res.msg,
                        type: "text",position:'bottom',
                    })
	        	}
	        })
		},
	}
</script>
<style>
  .view  .weui-cells{
		line-height: 1.5 !important;
		margin-top: 10px !important;
	}
  .view .sfi {
		width: 6em;
		height:4em;

		float: left;
		margin-left: 4%
	}
  .view .sfi img {
		width: 100%;
		height: 100%;
	}
  .view .font{
		font-size:14px
	}
</style>
