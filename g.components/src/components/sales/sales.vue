<template>
  <div  class="sales" :style="'margin-top:'+content.modulePadding+'px;margin-bottom:'+content.modulePadding+';'">
          <!--推荐商品-->
      <div>
          <!--倒计时时间-->
          <div class="countdown" v-show="countstate">
                距离结束时间还剩
                <span>{{oDay}}</span> 天
                <span>{{hours}}</span> :
                <span>{{minutes}}</span> :
                <span>{{seconds}}</span>
          </div>
          <div class="end" v-show="!countstate">活动已结束</div>
          <!--商品-->
          <div class="salessrc">
            <img :src="content.goodslist[0].pic" alt="">
            <!--活动状态-->
            <span :class="{'spancolor':changestate}" :title="content.act_status">
                <b style="width:40px;display:inline-block;font-weight: 100;">{{content.act_status}}</b>
            </span>
          </div>
          <!--商品详情-->
          <div class="salesdetail">
                <!--商品标题-->
                <p :title="content.goodslist.title">{{content.goodslist[0].title}}</p>
                <!--疯抢价-->
                <p v-show="originalstate" style="margin:3px 0;">抢完恢复原价{{content.goodslist[0].original_price}}元</p>
                <p class="salesprice" style="margin:7px 0;">
                    <!--疯抢价red-->
                    <span :class="{'salespan':act_status}" :title="content.act_status_price">{{content.act_status_price}}</span>
                    <!--现价-->
                    <span v-show="!nowstate" :title="content.goodslist[0].price">￥{{content.goodslist[0].price}}</span>
                    <span v-show="nowstate" style="color:#FF0000;font-weight:600" :title="content.goodslist[0].original_price">￥{{content.goodslist[0].original_price}}</span>
                    <!--原价-->
                    <del :class="{'del':delstate}" :title="content.goodslist[0].original_price">￥{{content.goodslist[0].original_price}}</del>
                </p>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  props:['content'],
  data(){
      return{
          hours:"0",
          minutes:'0',
          seconds:'0',
          oDay:'0',
          countstate:true,
          act_status:false,
          changestate:false,
          delstate:false,
          nowstate:false,
          originalstate:true
      }
  },
  methods:{
      timer(){
          let vm = this
          let time = setInterval(function(){
              let endTime = new Date(vm.content.goodslist[0].create_time);
              let nowTime = new Date();
              let ms = endTime.getTime() - nowTime.getTime();
              if(ms>0){
                  var oDay=Math.floor(ms / 1000 / 60 / 60 / 24);
                //   console.log(oDay)
                  var oHour = Math.floor(ms / 1000 / 60 / 60 % 24);
                //   console.log(oHour)
                  var oMain = Math.floor(ms / 1000 / 60 % 60);
                //   console.log(oMain)
                  var osec =  Math.floor(ms / 1000 % 60);
                  vm.oDay=oDay
                  vm.hours = oHour;
                  vm.minutes = oMain;
                  vm.seconds = osec; 
                  if(vm.seconds == 0 && vm.oDay == 0 && vm.hours == 0 && vm.minutes == 0){
                      vm.countstate=false;
                      vm.act_status=true
                      vm.changestate=true
                      vm.delstate=true
                      vm.nowstate=true
                      vm.originalstate=false
                  } 
                //   console.log(vm.hours,vm.minutes,vm.seconds)
              }else{
                  clearInterval(time)
              }
          },1000)
      }
  },
  mounted(){
      this.timer()
  }
}
</script>
<style scoped>
    .sales{
        width:95%;
        margin:1rem auto;
        clear: both;
    }
    .countdown{
        font-size: 14px;
        text-align: center;
        margin:1rem 0;
    }
    .countdown span{
        font-size: 14px;
        display: inline-block;
        border:1px solid #000;
        padding:0px 3px;
        width:25px;
        height:25px;
        line-height: 25px;
        text-align: center
    }
    .salessrc img{
        width:100%;
        margin:0.5rem 0 0 0 ;
    }
    .salessrc {
        position: relative;
        width:100%;
        /*height:405px;*/
    }
    .salessrc span{
        display: inline-block;
        width:15%;
        height:50px;
        /*line-height: 50px;*/
        text-align: center;
        color:#fff;
        background-color: #FF0000;
        padding:5px;
        border:2px solid #fff;
        position: absolute;bottom:-8%;right:5%;
    }
    .salesprice span:nth-child(1){
        display: inline-block;
        background-color: #FF0000;
        color:#fff;
        font-size: 12px;
        padding:2px 5px;
        text-align: center
    }
    .salesdetail{
        width:95%;
        margin:0 auto;
    }
    .salesdetail p:nth-child(1){
        font-size: 14px;
        font-weight: 600;
    }
    .salesdetail p:nth-child(2){
        font-size: 12px;
        color:#9D9D9D;
    }
    .salesprice .salespan{
        display: inline-block;
        background-color: #FF0000;
        color:#fff;
        font-size: 12px;
        padding:2px 5px;
        text-align: center
    }
    .salesprice .salespan{
        background-color: #424242!important;
    }
    .salessrc .spancolor{
        background-color: #424242;
    }
    .salesprice span:nth-child(2){
        display: inline-block;
        color:#FF0000;
        font-size: 12px;
        width:15%;
        text-align: center
    }
    .salesprice .nowprice{
        color:#424242;
    }
    .salesprice del{
        display: inline-block;
        color:#FF0000;
        font-size: 12px;
        width:15%;
        text-align: center
    }
    .salesprice .del{
        display: inline-block;
        color:#424242;
        font-size: 12px;
        width:15%;
        text-align: center
    }
     .salesprice{
        border-bottom:1px solid #E0E0E0;
        padding-bottom:10px;
    }
    .end{
        text-align: center;
        font-weight: 600;
        padding:15px;
    }
</style>


