<template>
	<div @click="is_show=false" class='agg'>
		<div>
			<tab>
		      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
		      <tab-item @on-item-click="onItemClick">已处理</tab-item>
		      <tab-item @on-item-click="onItemClick">待处理</tab-item>
		      <tab-item @on-item-click="onItemClick">拒绝</tab-item>
		    </tab>
		</div>
		<div style="height: 3.6em; width: 100%;"></div>
		<scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;'>
			<div class='card' v-for='i in datalist'>
				<div class="cardchild"><img  style="display:block;margin:0 auto;"  src="../assets/wswm.png"></div>
				<form-preview :rgactive='i.rgactive' :header-label="i.name" :header-value="i.status" :body-items="i.list" :footer-buttons="i.buttons1"></form-preview>
			</div>
		</scroll>
		<!-- <div v-if='more' style='text-align:center;color:#2e2e2e;font-size:14px;line-height:100px;position: relative;'>没有更多了...</div> -->
	</div>
</template>
<script>
	import {Tab,TabItem} from 'vux'
	import FormPreview from '../components/form-preview/index'
	import Scroll from '../components/scroll/index'
	export default {
		data:function(){
			return{
				pageHeader:true,
				pageName:'申诉列表',
				plainList:[{key:4,value:'全部'},{key:1,value:'审核通过'},{key:0,value:'待审核'},{key:2,value:'审核拒绝'}],
				datalist:[],
				is_show:false,
				bg:{white:false,grey:true},
				currentPage:1,
				more:false,
				isDone:false,
				tabvalue:0
			}
		},
		mounted:function() {
			let vm=this;
			setTimeout(function(){vm.agentList()}, 500);
		},
		methods:{
			onItemClick (index) {
		      this.tabvalue=index
		      this.datalist=[];
		      let vm=this;
		      this.currentPage=1
		      setTimeout(function(){vm.agentList()}, 500);
		    },
			onRefresh(done){
				//this.$router.go(0)
	          //done()
	          if(this.isDone){
	          	let data=this.datalist;
	          	this.datalist=[];
	          	let vm=this;
		        setTimeout(function(){
	              vm.datalist=data;
	            },1000)
		        done();
	          }else{
	          	this.datalist=[];
				this.currentPage=1
				this.agentList(done);
	          }
	        },
	        onInfinite(done){
	          this.currentPage++;
	          this.agentList(done);
	        },
			agentList(done){
				let vm = this;
				// vm.datalist=[];
				let page = vm.currentPage
				if(this.tabvalue == 0){
					var type=''
				}
				if(this.tabvalue == 1){
					type=1
				}
				if(this.tabvalue == 2){
					type=0
				}
				if(this.tabvalue == 3){
					type=2
				}
				this.apiPost(this.phost+'/Dls/qrcodeAppealList', {type:type,page:page}).then((res) => {
		        	if(res.code==200){
		        		if(res.data.length==0 && res.currentPage>=res.totalPage){
		        			vm.more=true
		        		}
		        		if(res.data.length!=0){
		        			vm.more=false
		        		}
		        		if(res.currentPage < res.totalPage){
			               done && done()
			            }else{
			               vm.$el.querySelector('.load-more').style.display = 'none';
			               vm.isDone=true;
			            }
		        		for(let i in res.data){
		        			if(res.data[i].status==0){res.data[i].status='待处理'}
		        			if(res.data[i].status==1){res.data[i].status='已处理'}
		        			if(res.data[i].status==2){res.data[i].status='拒绝';res.data[i].rgactive=true}

		        			vm.datalist.push({
		        				name:res.data[i].qrcode_num,
		        				status:res.data[i].status,
		        				rgactive:res.data[i].rgactive,
		        				list:[
		        					{label:'申诉理由:',value:res.data[i].appeal},
		        				],
		        				buttons1:[{
		        					is_show:true,
		        					style:'primary',
		        					text:'查看',
		        					link:'/shensudetails?id='+res.data[i].id
		        				}]
		        			})

		        		}
		        	}else{
		        		 vm.$el.querySelector('.load-more').style.display = 'none';
		        	}
		        	if(res.code==400){
		        		this.$router.go(0)
		        	}
		        })
			}
		},
		mixins:[window.mixins,window.http],
		components:{
			FormPreview,
			Scroll,
			Tab,
			TabItem
		},
	}
</script>
<style>
	.agg .vux-tab .vux-tab-item.vux-tab-selected{
		color: #6594fe !important;
    	border-bottom: 3px solid #6594fe !important;
	}
	.agg .vux-tab-ink-bar{
		background: #6594fe !important;
	}
	.agg .weui-form-preview__bd, .agg .weui-form-preview__label {
		color: #2e2e2e !important;
	}
	.agg .weui-form-preview__btn_primary {
	    color: #909090 !important;
	    border: 1px solid #eee;
	    border-radius: 7px !important;
	    font-size: 14px;
	}
	.agg .weui-form-preview__hd .weui-form-preview__value {
	    font-size: 14px !important;
	    color: #6594fe;
	}
	.agg .weui-form-preview__bd{
		text-align: left !important;
		border-bottom: 1px solid #eee;
	}
	.agg .weui-form-preview:after{
		border-bottom: none !important;
	}
	.agg .weui-form-preview:before{
		border-top: none !important;
	}
	.agg .weui-form-preview__ft{
		line-height: 28px !important;
		width: 22% !important;
		position: absolute !important;
	    right: 3% !important;
	    bottom: 8px !important;
	}
	.agg .weui-form-preview__ft:after{
		border-top: none !important;
	}
	.agg .vux-form-preview{
		height:8rem !important;
	}
	.agg .router-view{
		/*height: 35% !important;*/
	}
	.agg .weui-tab__panel {
		background-color: #eee;
	}
	.agg .im{
		width: 5%;
		height: 5%;
		position: absolute;
		top: 10%;
		left: 0;
		z-index: 100;
	}
	.agg .im img {
		width: 100%;
		height: 100%;
	}
	.agg .vux-selector.weui-cell_select{
		background-color: #fff;
		margin-bottom: 3%;
	}
	.agg .weui-select{
		padding-left: 41% !important;
	}
	.agg .card{
		position: relative;
	}
	.agg .cardchild {
	    position: absolute;
	    top: 8.9%;
	    left: 3.5%;
	    z-index: 999;
	    width: 0.8em;
	    vertical-align: middle;
	    line-height: 0.1;
	}
	.agg .cardchild img {
	    width: 100%;
	}
	.agg .weui-form-preview__hd {
		text-indent: 5% !important;
		overflow: hidden !important;
    	padding: 10px 15px !important;
    	line-height: 1em !important;
	}
	.agg .card{
		margin-bottom: 3%;
	}
	.agg .weui-form-preview__label{
		font-size: 14px;
	   text-align: left !important;
	   text-align-last: left !important;
	   min-width: max-content !important;
  	}
  	.agg .topbar{height:3em;line-height: 3em;text-align: center;background-color: #fff;position: absolute;width:100%;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
  .agg	.strecth{
		    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
		    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
		    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
		    -ms-transform:scale(1,0.5);
		    -webkit-transform:scale(1,0.5);
		    -moz-transform:scale(1,0.5);
		    -o-transform:scale(1,0.5);
		}
  .agg	.downPanel{text-align: center;width:98%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .agg	.box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 10px rgba(0, 204, 204, .5);-moz-box-shadow: 0 0 10px rgba(0, 204, 204, .5);box-shadow: 0 0 10px rgba(0, 204, 204, .5);
}
.agg .yo-scroll{
  top: 6.2rem !important;
}
.agg .weui-form-preview__btn{width:100% !important;}
.agg .yo-scroll .inner{
	top: -1.5rem !important;
}
</style>
