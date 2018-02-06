<template>
  <div class="checkMain">
    <group style="margin-top:-0.5rem">
      <cell value-align="left" style="font-size: 14px" >
        <p>支付总金额 (元) : <span>¥{{allDetail.allpay}}</span> </p>
        <p>到账总金额 (元) : <span>¥{{allDetail.merchantpay}}</span></p>
        <p>手续费总额 (元) : <span>¥{{allDetail.chargepay}}</span></p>
        <p>服务费总额 (元) : <span>¥{{allDetail.servicepay}}</span></p>
      </cell>
    </group>
    <group v-for="(item,index) in orderList" :key="index" style="margin:-0.5rem 0 1rem 0">
      <cell style="font-size: 14px;" primary="conten" title="订单号 : " class="orderNum">
        <img slot="icon" v-show="item.pay_type==1" width="20" style="" src="../assets/images/wx.png">
        <img slot="icon" v-show="item.pay_type==2" width="20" style="display:block;" src="../assets/images/zf.png">
        <div class="weui-cell__ft">{{item.order_no}}</div>
      </cell>
      <cell style="font-size: 14px" value-align="left">
        <p>支付金额(元) :  <span>¥{{item.actual_price}}</span></p>
        <p>到账金额(元) :  <span>¥{{item.merchant_money}}</span></p>
        <p>手续费(元) :  <span>¥{{item.charge_money}}</span></p>
        <p>服务费(元) : <span>¥{{item.service_money}}</span></p>
      </cell>
      <cell style="font-size: 14px;" primary="conten" title="支付时间 : ">
        <div class="weui-cell__ft">{{item.pay_time}}</div>
      </cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Cell,Group} from 'vux'
    export default {
      data(){
      return{
      pageName:"查看明细",
      amount:"456.00",
      account:"456",
      charge:"456",
      service:"456",
      starttime:"",
      endtime:"",
      orderFrom:"",
      orderList:[],
      allDetail:{},
      store_id:"",
      bg:{white:false,grey:true},
        detail:[
          {link:require("../assets/images/wx.png"),p1:"支付时间 :",a:"2017-09-11  13:01",a1:"¥456.00",p3:"到账金额(元) :",a2:"¥456.00",a3:"¥456.00"},
          {link:require("../assets/images/zf.png"),p1:"支付时间 :",a:"2017-09-11  13:01",a1:"¥456.00",p3:"到账金额(元) :",a2:"¥456.00",a3:"¥456.00"}
          ]}
      },
      mounted(){
        this.starttime=this.$route.query.starttime
        this.endtime=this.$route.query.endtime
        this.orderFrom=this.$route.query.orderfrom
        this.store_id=this.$route.query.store_id
        console.log(this.starttime,this.endtime,this.orderFrom)
        this.apiPost("http://r.huileyi.com/Order/collectCheck",{starttime:this.starttime,endtime:this.endtime,orderfrom:this.orderFrom,store_id:this.store_id,user_level:0}).then((res)=>{
          this.orderList=res.data.data
          this.allDetail=res.data
        })
      },
      components:{
        Group,
        Cell
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .checkMain p{
    margin:0.5rem 0 ;
    color:#7D7D7D;
  }
  .checkMain p>span{
    margin-left:0.4rem;
    color:#7D7D7D;
  }
  .checkMain .weui-cell__ft{
    color:#7D7D7D!important;
    margin-left:2px;
  }
  .checkMain .weui-cell__lf{
    position: absolute;
    right:10px;
    top:18px;
  }
  .checkMain .orderNum img{
    margin-right:5px;
    display:block;
  }
  .checkMain .weui-cell:before{
    border-top:1px solid #F3F3F3;
  }
</style>
