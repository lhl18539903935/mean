<template>
	<div :class="{white:bg.white,grey:bg.grey}" style='height:100%'>
		<view-box ref="viewBox" >
		    <x-header class='pad'
			v-if='pageHeader'
		    style="width:100%;position:absolute;left:0;top:0;z-index:100;"
		    :left-options="leftOptions"
		    :title="pageName">
		        <span v-if='path == "/complaint"'  style='color:#fff;' slot="right" >
		         <router-link to='/serchtousu'><img style="position: absolute;right:1.5rem;" height=20 src="./assets/fangda.png">&nbsp;&nbsp;&nbsp;</router-link>
		        </span>

				<span v-if='path == "/"'  style='color:#fff;' slot="right" >
		         <router-link to='/helpcenter'>
				 	<i style="position: absolute;right:1.5rem;color:#fff" class="iconfont icon-kefu"></i>
					 <!--<img style="position: absolute;right:1.5rem;" height=20 src="./assets/service.png">&nbsp;&nbsp;&nbsp;-->
				</router-link>
		        </span>

		        <span v-if='path == "/my_card"' style='color:#fff;' slot="right" >
	             <router-link to='/addshoukuan'><img style="position: absolute;right:1.5rem;" height=20 src="./assets/aad.png"></router-link>
	            </span>
		        <span v-if='path == "/merchant"' slot="right" >
              <router-link to='/merchant_search'><img height=20 src="./assets/fangda.png">&nbsp;&nbsp;</router-link>
		         	<router-link to='/chose'>	<img height=20  src="./assets/jiahao.png"></router-link>
		        </span>

		        <span v-if='path == "/agent"' slot="right" >
              		<router-link to='/search'><img :class="{'imgstyle':status}" height=20 src="./assets/fangda.png">&nbsp;&nbsp;</router-link>
		        </span>
		        <span v-if='path == "/agent" && this.is_lowest!= 1' slot="right" >
		         	<router-link to='/addNext'>	<img height=20  src="./assets/jiahao.png"></router-link>
		        </span>

		        <span v-if='path=="/address"' slot='right' style='color:#fff;font-size:40px;position:absolute;right:13px;top:-5px;'>
		        <router-link to='/editAdd'>
		       	 	<span style='color:#fff;'>+</span>
		       	 </router-link>
		        </span>
	        </x-header>
          <router-view   class='router-view'></router-view>
			<tabbar v-if="pageFooter" class="vux-demo-tabbar" slot="bottom" >
			      <tabbar-item v-for="(item,index) in footer" :link="{path:item.path}" :key='index'>
			        <img  slot="icon" :src="item.img">
			        <span :class='{color:item.color}' slot="label">{{item.name}}</span>
			      </tabbar-item>
		    </tabbar>

		</view-box>
		<logo v-show="isLoading"></logo>
	</div>
</template>

<script type="es6">
// import "./assets/icon/demo.css"
import "./assets/icon/iconfont.css"
import { ButtonTab,XHeader, ViewBox, Tabbar, TabbarItem, ButtonTabItem, Loading, TransferDomDirective as transition,InlineCalendar} from 'vux'
import { mapState, mapActions } from 'vuex'
import mixin from './vuex/mixin.js'
import http from './ajax.js'
import logo from './components/logo/index.vue'
window.mixins=mixin;
window.http=http;
export default {
	name:'app',
	components:{
		ButtonTab,
	    ButtonTabItem,
	    ViewBox,
	    XHeader,
	    Tabbar,
	    TabbarItem,
	    Loading,logo,
	    InlineCalendar,

	},
	data(){
		return{
			footer:[],
			rank:'',
			icons:{
				home1 : require('./assets/first.jpg'),
				home2 : require('./assets/firstr.jpg'),
				cate1 : require('./assets/wanma.jpg'),
				cate2 : require('./assets/wanmar.jpg'),
				msg1 : require('./assets/center.png'),
				msg2 : require('./assets/centerr.jpg'),
			},
			kalendarvalue:false,
			status:false,
			demo3: 'TODAY',
			show:false,
			rank:true,
		}
	},
	methods:{
		onChange(val){

		},
		clearlo(){
			let local=sessionStorage;
            let agentData={
              nameval:'',
              phoneval:'',
              codeval:'',
              idval:'',
              addressval:'',
              companyval:'',
            }
            local.setItem('agentData',JSON.stringify(agentData));
		},
		kalendar(){
			this.show=!this.show
		},
		scan() {
			let vm=this;
		    cordova.plugins.barcodeScanner.scan(
		      function (result) {

		      	let query=result.text;
		      	let p=query.indexOf('qrcode_num');
		      	let p_slit=query.substr(p);
		      	let queryArr=p_slit.split('/');

		      	vm.sendScan(queryArr);

		      },
		      function (error) {
		         this.$vux.toast.show({
	                text: '扫描失败',
	                type: "text",position:'bottom',
	            })
		      }
		   );
		},
		sendScan(queryArr){

			let vm=this;
			let data={qrcode_num:queryArr[1],key:queryArr[3]};
			this.apiPost(this.phost+'/Dls/bindQrcode', data).then((res) => {
	        	if(res.code==200){
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
		},
		serchreloadreload(){
			document.location.reload()
		},
		addreload(){
			document.location.reload()
		},
		reFooter(){
			this.footer=[];
			let path = this.path
			let footer=this.footer;
			if(path == '/'){
				footer.push({img:this.icons.home2,color:true,name:'首页',path:'/'});
			}else{
				footer.push({img:this.icons.home1,color:false,name:'首页',path:'/'});
			}
			if(path == '/ws_manage'){
				footer.push({img:this.icons.cate2,color:true,name:'乐码管理',path:'/ws_manage'});
			}else{
				footer.push({img:this.icons.cate1,color:false,name:'乐码管理',path:'/ws_manage'});
			}
			if(path == '/perMain'){
				footer.push({img:this.icons.msg2,color:true,name:'个人中心',path:'/perMain'});
			}else{
				footer.push({img:this.icons.msg1,color:false,name:'个人中心',path:'/perMain'});
			}

		}
	},
	computed:{

		...mapState({
	      route: state => state.route,
	      path: state => state.route.path,
	      deviceready: state => state.app.deviceready,
	      demoTop: state => state.vux.demoScrollTop,
	      isLoading: state => state.vux.isLoading,
	      direction: state => state.vux.direction,
	      pageName: state => state.vux.pageName,
	      pageHeader: state => state.vux.pageHeader,
	      pageFooter: state => state.vux.pageFooter,
	      src: state => state.vux.src,
	      src1: state => state.vux.src1,
	      src2: state => state.vux.src2,
	      bg: state => state.vux.bg,
	    }),

		leftOptions(){
			return {showBack:this.$route.path !== '/',backText: ''};

		},
		headerTransition(){
			return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left';
		},
	},
	watch:{
		path(path){
			this.reFooter(path);
			// 是否可以添加最下级 0可以  1不可以
			this.is_lowest=localStorage.getItem('rank')
			// 放大镜的位置
			if(this.is_lowest==1){
				this.status=true
			}else{
				this.status=false
			}
		}

	},
	mounted:function(){
		this.reFooter();
	},
	mixins:[mixin,http]

}
</script>
<style lang='less'>

.white{background-color:#fff;}
.grey{background-color:#e9e9e9;}
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
.side{height:7.5em;width:2.5em;background-color:#2806fa;position:fixed;right:0;bottom:6em;text-align:center;border-radius:4px 0px 0px 4px;opacity: 0.5;}
.side_one{height:2.5em;}
.side_one img{width:1.5em;margin-top:0.5em;}
.color{color:#6594fe;}
.vux-header{ background-color: #6594fe !important;z-index:10000 !important;}
.vux-header-back,.vux-header .vux-header-left .left-arrow:before{border:#fff;}
.router-view {
  width: 100%;
  top: 46px;
}
.imgstyle{
	margin-left:1.5rem
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.weui-toast.weui-toast_text{
	z-index: 100000!important;
	width:9.6em!important;
	margin-bottom:3rem;
	// margin-top:2.5rem;
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
.vux-header .vux-header-left a{color:#fff !important;}
  html, body {
    height: 100%;
    width: 100%;
    margin:0;
    overflow-x: hidden;
  }

  .weui-tabbar__item{text-decoration: none;}
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#999 !important;}
.weui-tabbar {background-color:#fff !important;}
.vux-header .vux-header-left .left-arrow:before{border:1px solid #fff !important;    border-width: 2px 0 0 2px !important;}
li, ol, ul {
    list-style: none;
}
.clearfix:after {
    display: block;
    content: " ";
    height: 0;
    visibility: hidden;
    clear: both;
}
.fl{float:left}
.fr{float:right}
.fill{height:46px;width:100%;}
.vux-header .vux-header-right{
	width: 14%;
	//right:0 !important;
}
.vux-header .vux-header-right {
	width: 22%;
	right:0!important;
}
.weui-tabbar{z-index:10000 !important;}
.weui-tab__panel{padding-top:46px;}
.vux-popup-dialog{
	z-index: 10001 !important;
}
.inline-calendar td.current > span.vux-calendar-each-date{
	background-color:#6594fe !important;
}
.inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled{
	color:#6594fe !important;
}
.vux-prev-icon, .vux-next-icon{
	border: 1px solid #6594fe !important;
	border-top:0px !important;
	border-right:0px !important;
}

</style>
