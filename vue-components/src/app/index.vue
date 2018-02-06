<template>
	<div class="inde" v-show="indexshow">
		<div class="header">
			<!-- <div class='title'>万商互联—渠道商</div> -->
			<div>￥{{qrData.comm_num | setDecimal}}</div>
			<div>今日利润</div>
			<card>
				<div slot="content" class="card-demo-flex card-demo-content01">
					<div class="vux-1px-l vux-1px-r">
						<span>{{qrData.dls_num}}</span>
						<br/>
						<font>服务商数量</font>
					</div>
					<div class="vux-1px-r">
						<span>{{qrData.activate_num}}</span>
						<br/>
						<font>商家激活数量</font>
					</div>
				</div>
			</card>
		</div>
		<flexbox :gutter="0" wrap="wrap">
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/agent">
						<p class='padd'><img src="../assets/daili.jpg"></p>
						<p>服务管理</p>
					</router-link>
				</div>
			</flexbox-item>
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/merchant">
						<p class='padd'><img src="../assets/shangjia.jpg"></p>
						<p>商家管理</p>
					</router-link>
				</div>
			</flexbox-item>
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/forms">
						<p class='padd'><img src="../assets/baobiao.jpg"></p>
						<p>报表管理</p>
					</router-link>
				</div>
			</flexbox-item>
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/ws_manage">
						<p class='padd'><img src="../assets/wanshang.jpg"></p>
						<p>乐码管理</p>
					</router-link>
				</div>
			</flexbox-item>
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/percentage">
						<p class='padd'><img src="../assets/tixian.jpg"></p>
						<p>提成收益</p>
					</router-link>
				</div>
			</flexbox-item>
			<flexbox-item :span='1/3'>
				<div class="flex-demo">
					<router-link class="zhuce" to="/perMain">
						<p class='padd'><img src="../assets/geren.png"></p>
						<p>个人资料</p>
					</router-link>
				</div>
			</flexbox-item>
		</flexbox>
		<div class="gonggao">
			<div class="bg">
				<p class="gonggao_l"><img src="../assets/laba.png"></p>
				  	<swiper loop auto height="20px"  direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
						<swiper-item  v-for="i in asyncLength"  :key="i" @click.native="onClick(i)">{{getTitle(asyncCount,i) | s}}</swiper-item>
						<template v-if="asyncLength.length=2">
							<swiper-item  v-for="i in asyncLength"  :key="i" @click.native="onClick(i)">{{getTitle(asyncCount,i) | s}}</swiper-item>
						</template>
					</swiper>
				<div style="clear:both;"></div>
			</div>
		</div>
		<div style='margin-bottom:0.5em;'>
			<swiper  :aspect-ratio="300/800" style="width:100%;margin:0 auto;" >
				<swiper-item class="swiper-demo-img" v-for="(item,index) in demo_list" :show-desc-mask='false' :key="index">
					<img @click='jump(item.url)' :src="item.img_url" style='width: 100%;height: 100%'>
				</swiper-item>
			</swiper>
		</div>
	</div>
</template>
<script type="es6">
import { Card, Flexbox,Alert,XSwitch, FlexboxItem, MarqueeItem, Marquee, Swiper, SwiperItem,TransferDomDirective as TransferDom  } from 'vux'
import axios from 'axios'
import mixin from '../vuex/mixin.js'
import http from '../ajax.js'
export default {
	directives: {
    	TransferDom
  	},
	components: {
		Card,
		Flexbox,
		FlexboxItem,
		MarqueeItem,
		Marquee,
		Swiper,
		SwiperItem,
		XSwitch,
		Alert
	},
	filters: {
		setDecimal(val) {
			val = val ? val : 0;
			let num = parseFloat(val);
			return parseFloat((Math.floor(num * 100)) / 100).toFixed(2);
		},
		s:function (value) { // 限制标题字数上限
				if (!value) return ''
				if(value.length > 22){
				return value.slice(0,15)+'......'
				}else {
				return value
			}

      }
	},
	created(){
		this.isUploadProfile()
		this.idcardAuthen()
	},
	mounted: function() {
		
		this.getCounts();
		this.updateVersion();
		let vm = this;
		this.apiPost(this.phost + '/Dls/dlsCommAndQrcode').then((res) => {
			vm.qrData = res;
		})
		this.apiPost(this.rhost + '/home/getSlideShow', { type: 1 }).then((res) => {
			if (res.code == 200) {
				if (res.data) { vm.demo_list = res.data }
			}
		})
		this.apiPost(this.rhost + '/home/getAffiche', {}).then((res) => {

			if (res.code == 200) {
				let num = res.data
				// for(var i in res.data){
					vm.asyncCount = res.data
				// }
				
				vm.asyncLength = res.data.length
			}
		})
	},
	methods: {
		showPlugin () {
			var vm=this
			this.$vux.alert.show({
				title: '认证拒绝',
				content: '拒绝理由：'+this.idcard_reason,
				onShow () {
				
				},
				onHide () {
					vm.$router.push('/attestation')
				}
			})
			},
		//  app未完善资料退出后登录  判断用户是否完善资料
		isUploadProfile(){
			let vm=this
			this.apiPost(this.phost+'/Dls/isUploadProfile').then((res)=>{
				if(res.code==200){
					if(res.is_upload_profile == 0){
							vm.$router.push({path:'/perfectData'});					
					}
				}
			})
		},
		// 审核状态
		idcardAuthen(){
			let vm=this
			this.apiPost(this.phost+'/Dls/idcardAuthen',{}).then((res)=>{
				if(res.code==200){
					vm.idcard_reason=res.data.idcard_reason
					console.log(vm.idcard_reaso)
					if(res.data.idcard_status==2){
						this.showPlugin()
					}
				}else{
						this.$vux.toast.show({
							text:res.msg,
							type:'text'
						})
				}
			})
		},
		getTitle(data, index) {
			if (index - 1 >= 0) {
				return data[index - 1].title
			}
			return ""
		},
		jump(url) {
			if (!url) { return }
			cordova.InAppBrowser.open(url)

		},
		getCounts() {
			let vm = this;
			this.apiPost(this.rhost + '/Order/todayOrderCollect').then((res) => {
				if (res.code == 200) {
					vm.counts = res.data;
				}
			})
		},
		versionCompare(val1, val2) {
			//版本号长度相等
			let a = val1.split('.')
			let b = val2.split('.')
			let rst;
			for (let i in a) {
				let a1 = parseInt(a[i]);
				let b1 = parseInt(b[i]);

				if (a1 != b1) {
					if (a1 > b1) {
						rst = true;
						break;
					} else {
						rst = false;
						break;
					}
				}
			}

			return rst;
		},
		isAndroid() {
			var u = navigator.userAgent;
			let ret = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1

			return ret;
		},
		remind(url) {

			this.$vux.confirm.show({
				title: '更新提醒',
				content: '有新的版本更新，是否下载？',
				onCancel() {

				},
				onConfirm() {
					//window.location.href=url
					// if(_.isObject(cordova) =='undefined' || _.isObject(cordova.InAppBrowser) =="undefined"){
					// 		window.open(url, '_system', 'location=yes')
					// }else{
						cordova.InAppBrowser.open(url, '_system', 'location=yes')
					// }
					
				}
			})
			let currentTime = Date.now() / 1000;
			localStorage.setItem('lastRemind', currentTime)
		},
		updateVersion() {

			if (this.isAndroid()) {

				var interval = 10;
				let currentTime = Date.now() / 1000;
				let lastRemind = localStorage.getItem('lastRemind')

				let vm = this;
				axios.post(this.phost + '/Dls/versionInfo').then((res) => {

					if (res.code == 200) {
						cordova.getAppVersion.getVersionNumber(function(version) {
							let rst = vm.versionCompare(res.version, version)
							if (rst) {
								if (currentTime - lastRemind > interval || !lastRemind) {
									vm.remind(res.url)
								}
							}
						})
					}
				})
			}
		},

		onDeveloping() {
			this.$vux.toast.show({
				text: '功能开发中...',
				type: "text"
			})
		},
		onClick: function() {
			this.$router.push({ path: '/announcement' });
		},
	},
	data: function() {
		return {
			pageName: '乐宝—服务商',
			pageHeader: true,
			demo_list: [{ picurl: require('../assets/bannerone.png'), url: '' }],
			asyncCount: [],
			asyncLength: 0,
			bg: { white: false, grey: true },
			qrData: [],
			indexshow:true,
			idcard_reason:'',
			show2:false

		}
	},
	mixins: [mixin, http]
}
</script>
<style>
.inde .gonggao {
	padding: 10px 10px;
	background: #fff;
	margin: 3% 0;
	font-size: 14px
}
.inde .gonggao_l {
	float: left;
}

.inde .gonggao_l img {
	height: 14px;
	margin:5px 5px 0 0;
}
.weui-dialog__btn_primary{
	color:#6594FE!important;
}
.weui-dialog{
	z-index:20000!important;
}
.weui-mask{
	z-index:10000!important;
}
.inde .weui-dialog__btn_primary{
	color:#6594FE!important;
}
.inde .gonggao_m {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 89%;
	float: left;
	text-indent: 2%;
}

.inde .card-demo-flex {
	display: flex;
	background-color: #6594fe;
}

.inde .card-demo-content01 {
	padding: 10px 0;
}

.inde .card-padding {
	padding: 15px;
}

.inde .card-demo-flex>div {
	flex: 1;
	text-align: center;
	font-size: 12px;
}

.inde .header {
	background-color: #6594fe;
	text-align: center;
	color: #fff;
}

.inde .weui-panel:before {
	border-top: none;
}

.inde .title {
	padding: 2% 0 6%;
}

.inde .vux-1px-r[data-v-2bf4e57a]:after {
	border-right: 1px solid #fff;
}

.inde .vux-flexbox {
	text-align: center;
	background: #fff;
	padding-bottom: 7%;
}

.inde .flex-demo {
	padding: 25%;
	padding-bottom: 0;
	padding-top: 5%;
	font-size: 13px;
}

.inde .flex-demo img {
	width: 100%;
	height: 100%;
}

.inde .padd {
	padding: 29%;
	padding-bottom: 10%;
}

.inde .zhuce {
	color: #2e2e2e
}

.weui-tabbar__icon {
	width: 20px !important;
	height: 20px !important;
}

.weui-tabbar__item {
	padding: 8px 0 0 !important;
}
</style>
