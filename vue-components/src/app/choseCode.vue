<template>
  <div class='merchantList' >
    <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center">
    <div   v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:0rem;">
  	<div class='section' @click='choseCode(item.qrcode_id,index)' v-for="(item,index) in list" :key='index'>
  		<div class='merchant-title vux-1px-b'>
  				<p class='fl '><img style='height:0.9em;' src="../assets/wanmar2.jpg"> &nbsp; 码号&nbsp;{{item.qrcode_num}}</p>
  		</div>
  		<div class='merchant-middle vux-1px-b'>
        <p style="text-align:left">所属商家：{{item.belong_shop?item.belong_shop:'暂无'}}</p>
        <p style="text-align:left">商家状态：{{item.shop_tyep?tem.shop_tyep:'暂无'}}</p>
  			<p style="text-align:left" >持有者：{{item.name}}{{item.mobile}}</p>
  		</div>
  	</div>
  </div>
 </van-pull-refresh>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
import Scroll from '../components/scroll/index'
 import { Waterfall } from 'vant';
 import VanPullRefresh from '../vant/packages/pull-refresh/index.vue'
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"乐码列表",
        bg:{white:false,grey:true},
        title:'全部',
        pageNum:1,
        list:[],
        currentPage:1,
        type:"",
        isDone:false,
        disabled:false,
        isLoading:false
      }
  },
    directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
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
  methods:{
      loadMore(){
        this.currentPage++
        this.getList()
      },
    choseCode(qrcode_id,index){
      sessionStorage.setItem('qrcode_id',qrcode_id)
      this.$router.push({path:'/addMerchant',query:{type:this.type,qrcode_num:this.list[index].qrcode_num}})
    },
      getList(){
      	let vm = this;

      	let page=this.currentPage;
        this.apiPost(this.phost+'/Dls/qrcodeList',{type:1,qr_type:1,page:page}).then((res)=>{
             vm.isLoading=false
            if(res.code == 200){
            	for(let i in res.data){
            		res.data[i].discount=parseFloat(res.data[i].discount_ratio)*100;
            		res.data[i].status_name=res.data[i].status == 0?'待审核':(res.data[i].status == 1?'通过':'拒绝');
                res.data[i].date=dateFormat(parseInt(res.data[i].store_create_time)*1000);
                vm.list.push(res.data[i])
            	}

              if(res.currentPage == res.totalPage || res.totalPage == 0){
                // done && done()
                this.disabled=true
              }
            }else{
                this.$vux.toast.show({
                    text: "暂无数据",
                    type: "text",position:'bottom',
                })
          }
        })
      }

  },
  components:{
    Scroll,Waterfall,VanPullRefresh
  },
  mounted(){
  	this.getList();
    this.type=this.$route.query.type
  },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  	.merchantList .topbar{height:2.5em;line-height: 2.5em;text-align: center;background-color: #fff;position: absolute;width:100%;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
  .merchantList	.strecth{
		    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
		    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
		    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
		    -ms-transform:scale(1,0.5);
		    -webkit-transform:scale(1,0.5);
		    -moz-transform:scale(1,0.5);
		    -o-transform:scale(1,0.5);
		}
  .merchantList	.downPanel{text-align: center;width:98%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .merchantList	.downbar{border-bottom: 1px solid #eee;z-index:8000;}
  .merchantList	.box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 10px rgba(0, 204, 204, .5);-moz-box-shadow: 0 0 10px rgba(0, 204, 204, .5);box-shadow: 0 0 10px rgba(0, 204, 204, .5);
	}
  .merchantList .yo-scroll{top:3.3em;}
	.merchantList .section{background:#fff;padding:5px 10px;margin-top: 10px;}
	.merchantList .state{color:#6594fe;}
   .merchantList  .vux-1px-b:after{border-bottom:none;}
	.merchant-middle p{font-size: 14px;line-height: 2em;height:2em;}
    .merchant-title{height:2em;line-height: 2em;border-bottom: 1px solid #eee;}

</style>
