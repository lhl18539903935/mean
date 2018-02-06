<template>
  <div>
    <myscroll
      :on-refresh="onRefresh"
      :on-infinite="onInfinite"
      style="margin: 46px 0;">
      <swiper loop class="swiper1">
        <swiper-item v-for="n in 3" :key="n">
          <img src="../../assets/image/banner1.png" alt="">
        </swiper-item>
      </swiper>
      <div class="notive">
        <img src="../../assets/image/notice.png" alt="notive">
        <swiper
          class="swiper2"
          auto
          loop
          height="30px"
          direction="vertical"
          :interval=10000
          :show-dots="false">
          <swiper-item><p>8月大礼包产品即将上线...</p></swiper-item>
          <swiper-item><p>8月大礼包产品即将上线...</p></swiper-item>
          <swiper-item><p>8月大礼包产品即将上线...</p></swiper-item>
        </swiper>
      </div>
      <ul class="selection">
        <li>默认</li>
        <li @click="price">
          价格
          <span v-if="mytop">↓</span>
          <span v-else>↑</span>
        </li>
        <li>销量</li>
        <li>只看有货</li>
      </ul>
      <ul class="goods_list">
        <li v-for="n in initMoney" :key="n.id">
          <img src="../../assets/image/Sample.png" alt="img">
          <p class="summary">柠檬鱼双人套餐尊享有点设计但不夸张！</p>
          <p class="sales">已销售：255&#x3000;库存：300</p>
          <p class="money">
            <span class="left">￥{{n}}</span>
            <span class="right"><i class="iconfont icon-gouwuche-01"></i></span>
          </p>
        </li>
      </ul>
    </myscroll>
  </div>
</template>

<script>
    import {
        XHeader,
        Swiper,
        SwiperItem
    } from 'vux'
    import myscroll from '../../components/scroll/index.vue'
    export default {
        name: 'shop',
        components:{
            XHeader,
            Swiper,
            SwiperItem,
            myscroll
        },
        data(){
            return{
                initMoney:[1,19,20,53,10,21,99,2,7],
                mytop:false,
                PriceSizeNumber:0,
                istop:false
            }
        },
        methods:{
            aaa(){

            },
            priceSize(arr) {
                var len = arr.length;
                this.PriceSizeNumber++;
                if(this.PriceSizeNumber == 1){
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < len - 1 - i; j++) {
                            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                                var temp = arr[j+1];        //元素交换
                                arr[j+1] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    this.PriceSizeNumber++;
                }else if(this.PriceSizeNumber = 2){
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < len - 1 - i; j++) {
                            if (arr[j] < arr[j+1]) {        //相邻元素两两对比
                                var temp = arr[j+1];        //元素交换
                                arr[j+1] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    this.PriceSizeNumber = 0;
                }
                return arr;

            },
            price(){
                this.mytop = !this.mytop
                const p = this.priceSize(this.initMoney)
                this.initMoney = [];
                for (var i=0;i<p.length;i++){
                    this.initMoney.push(p[i])
                }
            },
            onRefresh (done) {
                setTimeout(function () {
                    done()  // call done
                }, 2000)
            },
            onInfinite (done) {
                console.log(1)
                setTimeout(function () {
                    this.initMoney.push(1)
                    this.initMoney.push(10)
                    this.initMoney.push(50)
                    this.initMoney.push(6)
                    done()  // call done()
                }.bind(this), 2000)

            },
//            myscrollTop(data){
//                console.log(data)
//                if(data > '210'){
//                    this.istop=true
//                }else {
//                    this.istop=false
//                }
//            }

        },
        computed:{

        },
        mounted(){
            this.$store.commit('setHeaderTitle',{
                name:'商城'
            })
        }
    }

</script>

<style scoped>
  .swiper1 img{
    width: 100%;
    height: 100%;
  }
  .notive{
    overflow: hidden;
    padding: 6px 20px 0;
    background-color: #fff;
    margin: 10px 0;
  }
  .notive>img{
    height: 20px;
    float: left;
    margin-right: 10px;
    margin-top: 2px;
  }
  .notive .swiper2{
    color: #888;
  }
  .selection{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    width: 100%;
    padding: 0 10%;
    text-align: center;
    background-color: #fff;
    position: fixed;
    z-index: 10;
  }
  .selection li{
    float: left;
    width: 25%;
  }
  .goods_list{
    overflow: hidden;
    width: 100%;
    letter-spacing:normal;
    margin-top: 40px;
  }
  .goods_list li{
    width: calc(50% - 5px);
    margin-top: 10px;
    padding: 10px;
    float: left;
    background-color: #fff;
  }
  .goods_list li:nth-child(2n + 1){
    margin-right: 10px;
  }
  .goods_list li>img{
    width: 100%;
    height:40vw;
  }
  .goods_list li .summary{
    font-size: 14px;
  }
  .goods_list li .sales{
    font-size: 10px;
    color: #999;
  }
  .goods_list li .money .left{
    color: #fe4a48;
    float: left;
    font-size: 18px;
  }
  .goods_list li .money .right{
    float: right;
  }
</style>