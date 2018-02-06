<template>
  <div class='merchantList' >
  <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;'>
  	<div class='section' v-for="(item,index) in list" :key='index'>
  		<div class='merchant-title vux-1px-b'>
  				<p class='fl '><img style='height:0.9em;' src="../assets/storelist.png"> &nbsp; {{item.store_name}}</p>
  				<p class='fr state'>{{item.date}}</p>
  		</div>
  		<div class='merchant-middle vux-1px-b'>
        <p>店长：{{item.store_owner_name}}</p>
        <p>联系电话：{{item.store_manager_tel}}</p>
  			<p>门店地址：{{item.belong_area}}</p>
  			<p>订单笔数：{{item.order_count}}</p>
        <p>累计金额（元）：{{item.order_price | setDecimal}}</p>
        <p>累计提成（元）：{{item.commission | setDecimal}}</p>
  		</div>
  	</div>
  </scroll>
  </div>
</template>

<script type="es6">
import { dateFormat } from 'vux'
import Scroll from '../components/scroll/index'
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"门店",
        bg:{white:false,grey:true},
        title:'全部',
        pageNum:1,
        list:[],
        page:1,
        isDone:false
      }
  },
  filters:{
            setDecimal(val){
                val=val?val:0;
                let num=parseFloat(val);
               return parseFloat((Math.floor(num*100))/100).toFixed(2);
            }
        },
  methods:{
    onRefresh(done){
      //this.$router.go(0)
      if(this.isDone){
        let vm=this;
        let data=this.list;
        this.list=[];
        setTimeout(function(){
          vm.list=data;
        },1000)
        done();
      }else{
        this.page=1;
        this.list=[];
        this.getList(done);
      }

    },
    onInfinite(done){
      this.page++;
     this.getList(done);

    },
      getList(done){
        let merchant_id=this.$route.query.merchant_id;
      	let vm = this;

      	let page=this.page;
        this.apiPost(this.rhost+"/Store/getStoreList",{merchant_id:merchant_id,page:page}).then((res)=>{
            if(res.code == 200){
            	for(let i in res.data){
            		res.data[i].discount=parseFloat(res.data[i].discount_ratio)*100;
            		res.data[i].status_name=res.data[i].status == 0?'待审核':(res.data[i].status == 1?'通过':'拒绝');
                res.data[i].date=dateFormat(parseInt(res.data[i].store_create_time)*1000);
                vm.list.push(res.data[i])
            	}

              if(res.currentPage < res.totalPage){
                done && done()
              }else{
                vm.isDone=true;
                vm.$el.querySelector('.load-more').style.display = 'none';
              }
            }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
          }
        })
      }

  },
  components:{
    Scroll
  },
  mounted(){
  	this.getList();

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
    .merchant-title{height:2em;line-height: 2em;border-bottom:1px solid #f3f3f3}

</style>
