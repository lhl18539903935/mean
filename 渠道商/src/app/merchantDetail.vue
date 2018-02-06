<template>
  <div class='merchantDetail'>

	<div class='section'>
		<div class='merchant-title vux-1px-b'>
				<p class='fl'><img style='height:0.9em;' src="../assets/daililogo.png"> &nbsp; {{detail.merchant_name}}</p>
				<p class='fr state'>{{detail.status_name}}</p>
		</div>
		<div class='merchant-middle'>
			<p>所属区域：{{area}}</p>
			<p>行业分类：{{detail.industry_type}}</p>
			<p>账户类型：企业</p>
			<p>折扣比例：{{detail.discount}}</p>
			<p>联系人：{{detail.seller_name}}</p>
			<p>联系电话：{{detail.seller_mobile}}</p>
			<div style='width:100%;' class='clearfix'>
				<p class='fl'>激活码号：{{detail.qrcode_num}} </p>
				<p class='fr' style='color:#909090;margin-top:5px;'>{{getDate(detail.create_time)}}</p>
			</div>

			<p>码持有者：{{detail.holder_name}}</p>
			<p>码持有者电话：{{detail.holder_mobile}}</p>
			<p>订单笔数：{{detail.order_count}}</p>
			<p v-if="detail.order_price!==null">订单金额（元）：{{detail.order_price | setDecimal}}</p>
			<p v-if="detail.commission!==null">累计提成（元）：{{detail.commission | setDecimal}}</p>
      <p v-if="detail.order_price==null">订单金额（元）：0.00</p>
      <p v-if="detail.commission==null">累计提成（元）：0.00</p>
		</div>
		<div class='merchant-bottom clearfix'>

			<router-link :to="'/merchantList?merchant_id='+detail.merchant_id"><p class='fr btn-up'>门店数量（{{detail.storeCount}}）</p></router-link>

		</div>
	</div>

  </div>
</template>

<script type="es6">
import { dateFormat } from 'vux'
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"商家管理",
        src:'',
        bg:{white:false,grey:true},
        is_show:false,
        title:'全部',
        detail:[],
        area:""
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
  	getDate(val){
      return dateFormat(parseInt(val)*1000);
    }
  },
  mounted(){

        let vm=this;
        let qrcode_id=this.$route.query.qrcode_id;
        this.apiPost(this.phost+'/Merchant/getMerchantDetail',{qrcode_id:qrcode_id}).then((res)=>{
          if(res.code==200){
                if(res.data.industry_type=="1") res.data.industry_type="美食"
                if(res.data.industry_type=="2") res.data.industry_type="休闲娱乐"
                if(res.data.industry_type=="3") res.data.industry_type="酒店住宿"
                if(res.data.industry_type=="4") res.data.industry_type="汽车服务"
                if(res.data.industry_type=="5") res.data.industry_type="美容美发"
                if(res.data.industry_type=="6") res.data.industry_type="医疗健康"
                if(res.data.industry_type=="7") res.data.industry_type="法律服务"
                if(res.data.industry_type=="8") res.data.industry_type="培训教育"
                if(res.data.industry_type=="9") res.data.industry_type="生鲜果蔬"

              res.data.discount=parseFloat(res.data.discount_ratio);
              res.data.status_name=res.data.status == 0?'待审核':(res.data.status == 1?'通过':'拒绝');
              vm.detail=res.data
              vm.area=vm.detail.province+vm.detail.city+vm.detail.area
          }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
            })
          }
        })
  },
  mixins:[window.mixins,window.http]
  }
</script>

<style>
  	.merchantDetail .topbar{height:2.5em;line-height: 2.5em;text-align: center;background-color: #fff;position: absolute;width:100%;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
	.merchantDetail .section{background:#fff;padding:5px 10px;margin-top: 10px;}
	.merchant-title{height:2em;line-height: 2em;}
	.merchantDetail .state{color:#6594fe;}
	.merchant-middle p{font-size: 14px;line-height: 2em;height:2em;}
	.merchant-bottom{height:3em;line-height: 3em;color:#909090;font-size: 14px;}
	.merchantDetail .btn-up,.merchantDetail .btn-see{width:8em;height:1.8em;line-height:1.8em;border:1px solid #ccc;border-radius: 5px;text-align: center;margin-top: 0.5em;}
	.merchantDetail .btn-see{margin-right: 1em;color:#909090;}
	.merchantDetail .btn-up{background: #6594fe;color:#fff;}
</style>
