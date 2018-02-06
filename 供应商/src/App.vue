<template>
	<div  :class="{white:bg.white,grey:bg.grey}" style='height:100%'>
		<view-box ref="viewBox" >
			<!--  <x-header class='pad' slot="header" v-if='pageHeader' style="width:100%;position:absolute;left:0;top:0;z-index:100;"
		      :left-options="leftOptions"
		      :title="pageName"
		      :transition="headerTransition"> -->

		      <x-header class='pad' slot="header" v-if='pageHeader' style="width:100%;position:absolute;left:0;top:0;z-index:100;"
		      :left-options="leftOptions"
		      :title="pageName"
		      >

		      	<span v-if='path == "/my_card"' style='color:#fff;' slot="right" >
		         <router-link to='/addshoukuan'><img height=20 src="./assets/images/aad.png"></router-link>
		        </span>
		        <span v-if='path == "/address"' style='color:#fff;' slot="right" >
		         <router-link to='/newRevise'><img height=20 src="./assets/images/aad.png"></router-link>
		        </span>
		        <span v-if="topIcon.showIcon"  style='color:#fff;' slot="right" >

	                <router-link :to="topIcon.iconLink">
	                  <img v-if="hideImg" height=20 :src="topIcon.iconSrc">
	                </router-link>
		        </span>

		        <span v-if="path == '/'"  style='color:#fff;' slot="right" >
	                <router-link to="service">
	                  <img height=20 src="./assets/images/7.png">
	                </router-link>
		        </span>

	        	<span v-if="path == '/order'"  style='color:#fff;' slot="right" >
                	<router-link to="/collect"  style="color:#fff;"> <span>汇总查询</span> </router-link>
                </span>


       		</x-header>
			<div :class="{fill:pageHeader}"></div>
			<!-- <transition
			@after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
			:name="'vux-pop-'+(direction === 'forward' ? 'in' : 'out')"> -->

				<!-- <router-view class='router-view'></router-view> -->
				<keep-alive>
				<router-view v-if="$route.meta.alive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.alive"></router-view>

			<!-- </transition> -->

			<tabbar  v-if="pageFooter" class="vux-demo-tabbar" slot="bottom" >
			      <tabbar-item v-for="(item,index) in footer" :link="{path:item.path}" :key='index'>
			        <img slot="icon" :src="item.img">
			        <span :class='{c:item.color}' slot="label">{{item.name}}</span>
			      </tabbar-item>
      </tabbar>
		</view-box>
    <div>
      <loading v-model="isLoading"></loading>
    </div>
		<div class="side" v-show="sideHide">
		<div style="margin-top:0;" class='side_one'>
			<router-link to="/">
				<img src="./assets/images/home.png">
			</router-link>
		</div>

		<div class='side_one'>
			<router-link to="/shop">
				<img src="./assets/images/store.png">
			</router-link>
		</div>

		<div class='side_one'>
			<a href='tel:123456'>
				<img src="./assets/images/person.png">
			</a>
		</div>
		</div>
	</div>

</template>

<script type="es6">
import { ButtonTab,XHeader, ViewBox, Tabbar, TabbarItem, ButtonTabItem, Loading, TransferDomDirective as transition } from 'vux'
import { mapState, mapActions } from 'vuex'
import mixins from './vuex/mixin.js'
import http from './ajax.js'
window.mixins=mixins;
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
	    Loading

	},
	data(){
		return{
		 hideImg:true,
		topIcon:
		    {showIcon:false,iconSrc:'',iconLink:'',content:""}
		    ,
		  sideHide:false,
			footer:[],
			icons:{
				home1 : require('./assets/images/home.png'),
				home2 : require('./assets/images/home2_03.png'),
				cate1 : require('./assets/images/store.png'),
				cate2 : require('./assets/images/stromImg_03.png'),
				msg1 : require('./assets/images/person.png'),
				msg2 : require('./assets/images/person01_03.png')
			},


		}
	},
	methods:{
		reload(){
			document.location.reload()
		},
		reIcon(){
		  let path = this.path;

		  if(path=='/shop'){
		  	this.topIcon.iconSrc=require("./assets/images/jia_03.png");
		  	if(this.level == 0){
		  		 	this.topIcon.showIcon=true;
		  	}
		  	this.topIcon.iconLink="/addStore"
		  }

		  if(path=="/balance"){
		  	this.topIcon.iconSrc=require("./assets/images/wen.png");
		  	this.topIcon.showIcon=true;
		  }
		  if(path=="/orderDetail"){
		  	this.topIcon.iconSrc=require("./assets/images/wen.png");
		  	this.topIcon.showIcon=true;
		  }
		  if(path=="/store"){
		  	this.topIcon.iconSrc=require("./assets/images/wen.png");
		  	this.topIcon.showIcon=true;
		  	this.topIcon.iconLink="/add";
		  }
		 	if(path=="/account"){
		  	this.topIcon.iconSrc=require("./assets/images/search_03.png");
		  	this.topIcon.showIcon=true;
		  	//this.topIcon.iconLink="/add";
		  }
		  if(path=="/storeAcc"){
		  	this.topIcon.iconSrc=require("./assets/images/search_03.png");
		  	this.topIcon.showIcon=true;
		  	//this.topIcon.iconLink="/add";
		  }
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
			if(path == '/shop'){
				footer.push({img:this.icons.cate2,color:true,name:'门店',path:'/shop'});
			}else{
				footer.push({img:this.icons.cate1,color:false,name:'门店',path:'/shop'});
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
	      bg: state => state.vux.bg,
	    }),

		leftOptions(){
			return {showBack:this.$route.path !== '/'};
		},
		headerTransition(){
			return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left';
		},

		isShowFooter(){
			return (this.$route.path == '/login' || this.$route.path == '/goodsDetail')?false:true;
		}
	},

	watch:{
		path(path){
	 	this.topIcon.showIcon=false;
		this.reFooter();
  		this.reIcon();
  		this.level=localStorage.getItem('level');
		}

	},
	mounted:function(){
		this.reFooter();
		this.reIcon();

	},
	mixins:[mixins,http]

}
</script>
<style lang='less'>
.white{background-color:#fff;}
.grey{background-color:#e9e9e9;}

@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
.side{height:7.5em;width:2.5em;background-color:#FF4948;position:fixed;right:0;bottom:6em;text-align:center;border-radius:4px 0px 0px 4px;opacity: 0.5;}
.side_one{height:2.5em;}
.side_one img{width:1.5em;margin-top:0.5em;}
.c{color:#FC4847;}
.vux-header{ background-color: #FF4948 !important;}
.vux-header-back,.vux-header .vux-header-left .left-arrow:before{border:#fff;}
.router-view {
  width: 100%;
  top: 46px;
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
.weui-tabbar__icon {
    width: 20px !important;
    height: 20px !important;
    margin-top:5px;
    margin-bottom:3px;
}
.weui-tabbar__label{margin-bottom:3px;}


</style>
