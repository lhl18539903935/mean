<template>
	<div class="helpcenter">
		<div style="position:absolute;top:3rem;left:0;right:0;bottom:0;overflow:scroll;margin-bottom:2rem">
			<group>
			<cell class="fontsize" value-align="left" :link="item.link" is-link v-for="(item,i) in data" :key="i" @click.native="gosoltion(item.question_id)" >{{item.question_name}}</cell>
		</group>
		<div class="btn">
			<!--<button :href="'tel:'+this.tel">-->
				<x-button class="fontsize fontColor" @click.native="phone">
					<i style="position:absolute:top:0" class="iconfont icon-guanjiaowangtubiao11"></i>
					{{phoservice}}
				</x-button>
			<!--</a>	-->
			<x-button class="fontsize bgColor" @click.native="jump()">
				<i  class="iconfont icon-zaixian"></i>
				{{lineservice}}
			</x-button>
		</div>
		</div>
		
	</div>
</template>
<script>
	import {Group,Cell,XButton} from 'vux'
	import mixin from '../vuex/mixin.js'
	import http from '../ajax.js'
	export default{
		components:{
			Group,Cell,XButton
		},
		data:function(){
			return{
				pageHeader:true,
				pageName:'帮助中心',
				pageFooter:true,
				data:[],
				link:'',
				type:'',
				tel:'',
				bg:{white:false,grey:true},
				phoservice:"电话客服",
				lineservice:"在线客服",
				numb:true, //处理苹果手机多次弹出拨号提示
				centerlist:[
					{centername:"商户App登录权限问题？",link:"solution"},
					{centername:"添加店员"},
					{centername:"商户网页版后台"},
					{centername:"打款时间"},
					{centername:"打款状态查询"},
					{centername:"手动提现"},
					{centername:"交易失败说明"},
					{centername:"重复支付"},
				],
				btns:[
					{service:""},
					{service:""}
				]
			}
		},
		mixins:[mixin,http],
		methods:{
			// 点击拨打电话
			 phone(){
                if(this.numb && this.tel !== 'undefined'){
                    // window.location.href = 'tel:'+this.tel
					 window.open('tel:'+this.tel, '_system', 'location=yes')
                }
                this.numb = false
                setTimeout(()=>{
                    this.numb = true
                },2000)

            },
			gosoltion(question_id){
				this.$router.push({path:'solution',query:{question_id:question_id}})
			},
			// 列表
			questionListHo(){
				this.apiPost(this.rhost+'/CustomerService/questionList',{belong:1}).then((res)=>{
				 if(res.code==200){
					this.data=res.data
				 }else{
					 this.$vux.toast.show({
						 text:res.msg,
						 type: "text",position:'bottom',
					 })
				 }
			 })
			},
			// 点击打开新连接地址
			jump(){
				// if(_.isObject(cordova) =='undefined' || _.isObject(cordova.InAppBrowser) =="undefined"){
                //     	window.open(this.link, '_blank', 'location=yes')
                // 	}else{
						cordova.InAppBrowser.open(this.link, '_blank', 'location=yes')
               	// }
			},
			// 获取新的连接地址
			lineService(){
				this.apiPost(this.rhost+'/CustomerService/infoGet',{belong:1,type:"all"}).then((res)=>{
					if(res.code==200){
						this.link=res.data.link
					}
				})
			},
			// 获取新的电话号
			CustomerService(){
					this.apiPost(this.rhost+'/CustomerService/infoGet',{belong:1,type:"all"}).then((res)=>{
					if(res.code==200){
						if(res.data.phone){
							this.tel=res.data.phone
						}else{
							this.$router.push('/helpcenter')
						}
					}
				})
		  	}

		},
		mounted(){
			this.lineService()
			 this.questionListHo()
			 this.CustomerService()
		}
	}

</script>
<style >
	.helpcenter .btn{
		width:90%;
		margin:0 auto;
		display: block;
	}
	.helpcenter button.weui-btn, input.weui-btn{
		width:45%;
		display:inline-block;
		margin:2rem 5px;
	}
	.helpcenter .fontsize{
		font-size: 14px;
		color:#676767;
	}
	.helpcenter .weui-cell__ft{
		color:#676767;
	}
	.helpcenter .fontColor{
		color:#6594FE;
	}
	.helpcenter .bgColor{
		background-color: #6594FE;
		color:#fff;
	}
</style>
