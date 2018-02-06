<template>
  <div>
    <group>
      <cell
        :is-link="true"
        @click.native="allOrder(0)"
        title="我的订单"
        value="全部订单"></cell>
    </group>
    <grid>
      <grid-item @click.native="allOrder(1)" label="Grid">
        <i slot="icon" class="iconfont icon-daifukuan"></i>
        <span slot="label" class="textColor">待付款</span>
      </grid-item>
      <grid-item @click.native="allOrder(2)" label="Grid">
        <i class="iconfont icon-daishiyong" slot="icon"></i>
        <span slot="label" class="textColor">待使用</span>
      </grid-item>
      <grid-item @click.native="allOrder(3)" label="Grid">
        <i class="iconfont icon-daipingjia" slot="icon"></i>
        <span slot="label" class="textColor">待评价</span>
      </grid-item>
      <grid-item @click.native="allOrder(4)" label="Grid">
        <i class="iconfont icon-tuikuan" slot="icon"></i>
        <span slot="label" class="textColor">退款/售后</span>
      </grid-item>
    </grid>
    <cell title="最近订单" class="textColor888"></cell>
    <div class="vux-1px-b order">
      <img src="../../assets/image/Sample.png" alt="img">
      <div class="left">
        <p class="title">于记柠檬鱼</p>
        <p class="numbers">共一份</p>
        <p class="money">实付款￥198.00</p>
      </div>
      <div class="right">
        <p class="state1">待付款</p>
        <p class="payment">付款</p>
      </div>
    </div>
    <div class="vux-1px-b order">
      <img src="../../assets/image/Sample.png" alt="img">
      <div class="left">
        <p class="title">于记柠檬鱼</p>
        <p class="numbers">共一份</p>
        <p class="money">实付款￥198.00</p>
      </div>
      <div class="right">
        <p class="state2">已完成</p>
      </div>
    </div>
    <div class="vux-1px-b order">
      <img src="../../assets/image/Sample.png" alt="img">
      <div class="left">
        <p class="title">于记柠檬鱼</p>
        <p class="numbers">共一份</p>
        <p class="money">实付款￥198.00</p>
      </div>
      <div class="right">
        <p class="state3">待使用</p>
        <p class="use">查看券码</p>
      </div>
    </div>
  </div>
</template>

<script>
    import {
        XHeader,
        Grid,
        GridItem,
        Cell,
        Rater,
        Group
    } from 'vux'
    export default {
        name: 'order',
        components:{
            XHeader,
            Grid,
            GridItem,
            Cell,
            Rater,
            Group
        },
        methods:{
            allOrder(v){
                this.$store.commit('setOrderIndex',v)
                this.$router.push({path:'/order/all-order'})
            }
        },
        mounted(){
            this.$store.commit('setHeaderTitle',{
                name:'订单'
            })
        }
    }

</script>

<style scoped>
  .weui-cell{
    font-size: 16px;
  }
  .weui-grids{
    text-align: center;
    background-color: #fff;
  }
  .weui-grids .iconfont{
    color: #fe4a48;
    font-size: 22px;
  }
  .weui-grid:before{
    border: none;
  }
  .weui-grids .textColor{
    color: #999;
  }
  .textColor888{
    color: #888;
  }
  .order{
    width: 100%;
    padding: 15px 12px;
    overflow: hidden;
    font-size: 14px;
    background-color: #fff;
  }
  .order .left{
    float: left;
  }
  .order>img{
    display: inline-block;
    float: left;
    width: 80px;
    height: 80px;
    margin-right:10px;
  }
  .order .left div{
    float: left;
  }
  .order .left .title{
    margin-bottom: 15px;
    font-size: 16px;
  }
  .order .left .numbers{
    font-size: 12px;
    color: #999;
  }
  .order .left .money{
    color: #999;
  }
  .order .right{
    float: right;
  }
  .order .right .state1{
    margin-bottom: 22px;
    text-align: right;
    color: #fe4a48;
  }
  .order .right .state2{
    margin-bottom: 22px;
    text-align: right;
    color: #9cd051;
  }
  .order .right .state3{
    font-size: 14px;
    margin-bottom: 22px;
    text-align: right;
    color: #65b4f9;
  }
  .order .right .payment{
    padding:5px 20px;
    background-color: #fe4a48;
    color: #fff;
    border-radius: 5px;
  }
  .order .right .use{
    color: #666;
  }
</style>