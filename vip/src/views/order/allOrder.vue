<template>
  <div>
    <div>
      <tab :line-width=2 active-color='#fe4a48' v-model="orderIndex">
        <tab-item
          class="vux-center"
          :selected="classify === item.name"
          v-for="(item, index) in list"
          @click.native="switch1(item.name,item.number)"
          :key="index">
          {{item.name}}
        </tab-item>
      </tab>
      <swiper
        class="all-order"
        ref="myswiper"
        v-model="orderIndex"
        :height="111*orderNumber+'px'"
        :min-moving-distance="1000"
        :show-dots="false">
        <swiper-item>
          <div class="order" v-for="n in orderNumber" :key="n">
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
        </swiper-item>
        <swiper-item>
          <div class="order" v-for="n in orderNumber" :key="n">
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
        </swiper-item>
        <swiper-item>
          <div class="order" v-for="n in orderNumber" :key="n">
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
        </swiper-item>
        <swiper-item>
          <div class="order" v-for="n in orderNumber" :key="n">
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
        </swiper-item>
        <swiper-item>
          <div class="order" v-for="n in orderNumber" :key="n">
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
        </swiper-item>

      </swiper>
    </div>
  </div>
</template>

<script>
    import {
        XHeader,
        Tab,
        TabItem,
        SwiperItem,
        Swiper,
        Rater
    } from 'vux'
    export default {
        name: 'allOrder',
        components:{
            XHeader,
            Tab,
            TabItem,
            SwiperItem,
            Swiper

        },
        methods:{
            switch1(name,number){
                this.classify = name;
                this.orderNumber = number;
                this.$refs.myswiper.xheight = 111*number+'px';
                this.$store.commit('setHeaderTitle',{name:name})
            },
        },
        computed:{
            orderIndex:{
                get:function(){
                    return this.$store.state.vux.orderIndex
                },
                set:function (newValue) {
                    this.$store.state.vux.orderIndex = newValue
                }
            }
        },
        data(){
            return{
                index:0,
                classify:'全部',
                list:[
                    {
                        name:'全部',
                        number:11,
                    },
                    {
                        name:'待付款',
                        number:5,
                    },
                    {
                        name:'待使用',
                        number:3,
                    },
                    {
                        name:'待评价',
                        number:1,
                    },
                    {
                        name:'退款/售后',
                        number:2,
                    }],
                orderNumber:11,

            }
        },
        mounted(){
            var v = this.$store.state.vux.orderIndex
            this.switch1(this.list[v].name,this.list[v].number)
        }
    }

</script>

<style scoped>
  .all-order{
    margin-top: 15px;
  }
  .order{
    width: 100%;
    padding: 15px 12px;
    overflow: hidden;
    font-size: 14px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
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