<template>
    <div  class="check">
      <group style="margin-top:-0.5rem;">
        <cell value-align="left" style="font-size: 14px">
          <p>支付总金额 (元) : <a href="">¥456.00</a> </p>
          <p>到账总金额 (元) : <a href="">¥456.00</a></p>
          <p>手续费总额 (元) : <a href="">¥456.00</a></p>
          <p>服务费总额 (元) : <a href="">¥456.00</a></p>
        </cell>
      </group>
      <group v-for="(item,index) in detail" :key="index"  style="margin-top:-0.5rem;">
        <cell style="font-size: 14px;padding-top:5px;padding-bottom: 5px" title="订单号:8844080" value="已结算" class="cell">
          <img slot="icon" width="20" style="display:block;margin-right:5px;":src="item.link">
        </cell>
        <cell style="font-size: 14px" value-align="left">
          <p>{{item.p1}} : {{item.a}} </p>
          <p>{{item.p2}} : {{item.a1}}</p>
          <p>{{item.p3}} : {{item.a2}}</p>
          <p>{{item.p4}} : {{item.a3}}</p>
          <p>{{item.p5}} : {{item.a4}}</p>
          <p style="position: absolute;top:118px;right:6px;color:#FF4948">已返现</p>
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
      bg:{white:false,grey:true},
        detail:[
          {link:require("../assets/images/wx.png"),
            p1:"支付时间:",a:"2017-09-11  13:01",p2:"支付金额(元)",
            a1:"¥456.00",p3:"到账金额(元)",a2:"¥456.00",p4:"手续费(元)",
            p5:"服务费(元)",a3:"¥456.00",a4:"¥456.00"},
          {link:require("../assets/images/zf.png"),p1:"支付时间:",
          a:"2017-09-11  13:01",p2:"支付金额(元)",a1:"¥456.00",p3:"到账金额(元)",
          a2:"¥456.00",p4:"手续费(元)",p5:"服务费(元)",a3:"¥456.00",a4:"¥456.00"}

          ]}
      },
      components:{
        Group,
        Cell
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .check p{
    margin:0.5rem;
    color:#000;
  }
  .check p>a{
    margin-left:0.4rem;
    color:#000;
  }
  .check .weui-cell__ft{
    color:#17CF69!important;
  }
  .check .weui-cell__ft{
    color:#00C901;
  }
</style>
