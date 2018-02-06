<template>
  <!--商品促销 sales-->
  <div class="sales">
    <!--倒计时-->
    <div class="countdown" :title="endtime">
        距离结束时间还剩
        <span>{{oDay}}</span> 天
        <span>{{hours}}</span> :
        <span>{{minutes}}</span> :
        <span>{{seconds}}</span>
    </div>
    <!--img 展示-->
    <div class="salessrc">
        <img :src="salessrc" alt="">
        <span :title="change"><a style="width:40px;display:inline-block">{{change}}</a></span>
    </div>
    <!--详情介绍-->
    <div class="salesdetail">
        <!--商品标题-->
        <p :title="salestitle">{{salestitle}}</p>
        <!--疯抢价-->
        <p>抢完恢复原价{{salescost}}元</p>
        <p class="salesprice">
            <!--疯抢价red-->
            <span class="salespan" :title="salescrazy">{{salescrazy}}</span>
            <!--现价-->
            <span :title="salescurrent">￥{{salescurrent}}</span>
            <!--原价-->
            <del :title="salescost">￥{{salescost}}</del>
        </p>
    </div>
  </div>
</template>
<script>
export default {
  props:{
      endtime:{
          type:String,
          default:"2018/09/6 23:14:32"
      },
    //   商品图片
      salessrc:{},
    //   商品标题
      salestitle:{
          type:String,
          default:''
      },
      change:{
          type:String,
          default:''
      },
    //   疯抢价red
      salescrazy:{
          type:String,
          default:"疯抢价"
      },
    //   现价
      salescurrent:{
          type:String,
          default:"0.00"
      },
    //   原价
      salescost:{
          type:String,
          default:"0.00"
      }
  },
  data(){
      return{
          hours:"",
          minutes:'',
          seconds:'',
          oDay:''
      }
  },
  methods:{
      timer(){
          let vm = this
          let time = setInterval(function(){
              let endTime = new Date(vm.endtime);
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
        background-color: #FF0000;
        color:#fff;
        padding:5px;
        border:2px solid #fff;
        position: absolute;bottom:-8%;right:5%;
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
    .salesprice span:nth-child(2){
        display: inline-block;
        color:#FF0000;
        font-size: 12px;
        width:15%;
        text-align: center
    }
    .salesprice del{
        display: inline-block;
        color:#FF0000;
        font-size: 12px;
        width:15%;
        text-align: center
    }
     .salesprice{
        border-bottom:1px solid #E0E0E0;
        padding-bottom:10px;
    }
</style>

