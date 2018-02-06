<template>
	<div  style='height:100%'>
		<view-box ref="viewBox" >
 			<router-view   class='router-view'></router-view>
			 <lg-preview></lg-preview>
		</view-box>	
	</div>
</template>

<script type="es6">
import {  ViewBox} from 'vux'
import { mapState, mapActions } from 'vuex'
import mixin from './vuex/mixin.js'
import http from './ajax.js'
window.mixins=mixin;
window.http=http;
export default {
	name:'app',
	components:{
	    ViewBox,
	},
	data(){
		return{
			footer:[],
			rank:'',
			kalendarvalue:false,
			status:false,
			demo3: 'TODAY',
			show:false,
			rank:true,
		}
	},
	methods:{		
		
	
		serchreloadreload(){
			document.location.reload()
		},
		addreload(){
			document.location.reload()
		},
		
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

	},
	
	mounted:function(){
	
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


  html, body {
    height: 100%;
    width: 100%;
    margin:0;
    overflow-x: hidden;
  }


li, ol, ul {
    list-style: none;
}


.weui-tab__panel{padding-top:46px;}


</style>
