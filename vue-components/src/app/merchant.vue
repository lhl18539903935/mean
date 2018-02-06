<template>
  <div class='merchant' @click.stop='is_show=false'>
    <div @click.stop='is_show=!is_show' class='topbar'>
			<span style="font-size: 14px">{{title}}</span><span v-show='!is_show' class="strecth" >   ▼   </span>
			<span v-show='is_show' class="strecth" >▲</span>
			<div v-if='is_show' class='downPanel box-shadow'>
				 <div   @click='onChange(3)'  class='downbar'>审核状态</div>
				 <div    @click='onChange(0)'  class='downbar'>待审核</div>
				 <div    @click='onChange(1)' class='downbar'>审核通过</div>
				 <div     @click='onChange(2)'  class='downbar'>审核拒绝</div>
			</div>
	</div>
	<div style="height: 2.5em; width: 100%;"></div>

  <div v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:1rem;">
    <van-pull-refresh v-model="isLoading" style="text-align:center;position:absolute;top:87px;left:0;right:0;bottom:3rem;overflow:scroll;width:100%" class="pullrefresh">
    	<div class='section' v-for="(item,index) in list" :key='index'>
    		<div class='merchant-title vux-1px-b'>
    				<p class='fl'><img style='height:1em;vertical-align:middle;margin:-3px 3px 0 10px;' src="../assets/daililogo.png">  {{item.merchant_name}}</p>
    				<p class='fr state'>{{item.status_name}}</p>
    		</div>
    		<div class='merchant-middle vux-1px-b'>
    			<p>所属区域：{{item.province+item.city+item.area}}</p>
    			<p>行业分类：{{item.industry_type}}</p>
          <!--<p>{{industry_name}}</p>-->
    			<p>联系电话：{{item.seller_mobile}}</p>
    			<p>联系人：{{item.seller_name}}</p>
    			<p>码号：{{item.qrcode_num}}</p>
    			<p>持有者姓名：{{item.holder_name}}</p>
    			<p>持有者电话：{{item.holder_mobile}}</p>
    			<p >折扣比例：{{item.discount_ratio}}</p>
          <p class="lastP"></p>
    		</div>
    		<div class='merchant-bottom clearfix'>
    			<div v-if="item.status == 1" class='fl'>
    			<div style='background:#13ce66;height:0.5em;width:0.5em;margin-bottom:0.2em;display:inline-block;border-radius:50%;'></div>&nbsp;上线
    			</div>
    			<router-link :to="'/upload?type=contract&merchant_id='+item.merchant_id"><p v-if="getStatus(item)" class='fr btn-up'>上传合同</p></router-link>
    			<router-link :to="'/merchantDetail?qrcode_id='+item.qrcode_id"><p class='fr btn-see'>查看</p></router-link>

    		</div>
    	</div>
    </van-pull-refresh>
  </div>

  </div>
</template>

<script type="es6">
  import Scroll from '../components/scroll/index'
  import { Waterfall } from 'vant';
  import VanPullRefresh from '../vant/packages/pull-refresh/index.vue'
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"商家管理",
        bg:{white:false,grey:true},
        is_show:false,
        title:'审核状态',
        industry_name:"",
        list:[],
        type:'',
        currentPage:1,
        disabled:false,
        isLoading:false
      }
  },
  watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.list=[];
            this.currentPage=1;
            this.getList()
          }
        }
      },
  directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
  },
  methods:{
    loadMore(){
        this.currentPage++
        this.getList()
    },
    getStatus(item){
      if(item.contract == null && item.status != 1){
        return true;
      }
      if(item.contract && item.status ==2){
        return true;
      }
      return false;
    },

  	onChange(type){
  		if(type == 3){
  			this.title='审核状态'
        this.currentPage=1
        this.list=[]
        this.type=type
        this.disabled=false
        this.getList()
  		}
  		if(type == 0){
  			this.title='待审核'
        this.currentPage=1
        this.list=[]
        this.type=type
        this.disabled=false
        this.getList()
  		}
  		if(type == 1){
  			this.title='审核通过'
        this.currentPage=1
        this.list=[]
        this.type=type
        this.disabled=false
        this.getList()
  		}
  		if(type == 2){
  			this.title='审核拒绝'
        this.currentPage=1
        this.list=[]
        this.type=type
        this.disabled=false
        this.getList()
  		}

  	},
      getList(){
    	var type;
      	if(this.type == 3){
      		 type='';
      	}else{
      		 type=this.type;
      	}

      	let vm = this;

      	let page=this.currentPage;
        this.apiPost(this.phost+'/Merchant/getMerchantList',{type:type,page:this.currentPage}).then((res)=>{
            this.isLoading=false
            if(res.code == 200){
            	for(let i in res.data){
            	  if(res.data[i].industry_type=="1") res.data[i].industry_type="美食"
            	  if(res.data[i].industry_type=="2") res.data[i].industry_type="休闲娱乐"
            	  if(res.data[i].industry_type=="3") res.data[i].industry_type="酒店住宿"
            	  if(res.data[i].industry_type=="4") res.data[i].industry_type="汽车服务"
            	  if(res.data[i].industry_type=="5") res.data[i].industry_type="美容美发"
            	  if(res.data[i].industry_type=="6") res.data[i].industry_type="医疗健康"
            	  if(res.data[i].industry_type=="7") res.data[i].industry_type="法律服务"
            	  if(res.data[i].industry_type=="8") res.data[i].industry_type="培训教育"
            	  if(res.data[i].industry_type=="9") res.data[i].industry_type="生鲜果蔬"
            		res.data[i].discount=parseFloat(res.data[i].discount_ratio)*100;
            		res.data[i].status_name=res.data[i].status == 0?'待审核':(res.data[i].status == 1?'通过':'拒绝');
            		if(res.data[i].industry_type=="1") this.industry_name="美食"
                vm.list.push(res.data[i])

            	}


              if(res.data.length==0){
                // vm.more=true
                vm.disabled=true
                return
              }

              if(res.currentPage == res.totalPage){
                this.disabled=true
              }else{
                // this.disabled=false
                if(vm.currentPage == 1){
                      vm.List=res.data;
                    }else{
                       for(let d of res.data){
                         // vm.List.push(d)
                    }
                  }
              }
            }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
            })
          }
        })
      },

  },
  components:{
    Waterfall,VanPullRefresh
  },
  mounted(){
  	this.getList();
  },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  	.merchant .topbar{height:2.5em;line-height: 2.5em;text-align: center;background-color: #fff;position: absolute;width:100%;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
  .merchant	.strecth{
		    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
		    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
		    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
		    -ms-transform:scale(1,0.5);
		    -webkit-transform:scale(1,0.5);
		    -moz-transform:scale(1,0.5);
		    -o-transform:scale(1,0.5);
		}
  .merchant	.downPanel{text-align: center;width:100%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .merchant	.downbar{border-bottom: 1px solid #eee;z-index:8000;font-size: 14px}
  .merchant	.box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 3px #eee;-moz-box-shadow: 0 0 3px #eee;box-shadow: 0 0 3px #eee;
	}
	.merchant .section{background:#fff;padding:5px 10px;margin-top: 10px;text-align: left}
	.merchant-title{height:2em;line-height: 2em;font-size: 14px;padding-bottom:5px;}
	.merchant .state{color:#6594fe;}
  .merchant .yo-scroll{top:5.8em;}
	.merchant-middle p{font-size: 14px;line-height: 2em;height:2em;margin-left:0.5rem;color:#2E2E2E}
  .merchant-middle p:nth-child(1){margin-top:0.3rem}
  .merchant-middle .lastP{height:0.5rem}
	.merchant-bottom{height:3em;line-height: 3em;color:#909090;font-size: 14px;}
	.merchant .btn-up,.merchant .btn-see{width:7em;height:1.8em;line-height:1.8em;border:1px solid #ccc;border-radius: 5px;text-align: center;margin-top: 0.5em;}
	.btn-see{margin-right: 1em;color:#909090;}
	.btn-up{background: #6594fe;color:#fff;}
  .merchant .pullrefresh span{
    text-align: center;
  }
</style>
