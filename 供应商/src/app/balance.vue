<template>
    <div class="ba">
    <div style='background:#FF4948;width:100%;height:12rem;padding-bottom:1rem;;padding-top:2rem;'>
      <div style="width:12rem;height:12rem;margin:0 auto;">
        <div style='border-radius:50%;height:12rem;width:12rem;border:1px solid #fff;position:absolute;'>
          <div class='vux-circle-content' style='width:10rem;height:10rem;border:2px dashed #fff;border-radius:50%;top:6rem;left:0.75rem;border-left:4px solid #fff;'>
            <div style='margin-top:3.5rem;color:#fff;'>{{finish}}<br>
            已结算(元)</div>
          </div>
        </div>

      </div>
      </div>

      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class=" vux-1px-r">
            <span style="font-size: 14px">{{waiting}}</span>
            <br/> <font>待结算(元)</font>
          </div>
          <div>
            <span style="font-size: 14px">{{course}}</span>
            <br/> <font>结算中(元)</font>
          </div>
        </div>
      </card>



      <group>
        <cell class="font" title="提现" is-link link="/withdraw">
          <img slot="icon"  style="display:block;margin-right:5px;width:20px;height:20px" src="../assets/images/icon_01.png">
        </cell>
        <!-- <cell class="font" title="设置提现账号" is-link link="/cash">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/icon_02.png">
        </cell> -->
        <cell class="font" title="查看结算账号" is-link link="/ordernumber">
          <img slot="icon"  style="display:block;margin-right:5px;width:20px;height:20px" src="../assets/images/p_01.png">
        </cell>
        <cell class="font" title="查看结算明细" is-link link="/orderDetail">
          <img slot="icon"  style="display:block;margin-right:5px;width:20px;height:20px" src="../assets/images/icon_03.png">
        </cell>
      </group>
    </div>
</template>

<script type="es6">
import {XHeader ,Icon,Group,Cell,XCircle,Card} from 'vux'
import http from '../ajax.js'
export default {
data(){
    return{
      isShowHead:true,
      pageName:'结算',
      bg:{white:false,grey:true},
      finish:0,
      waiting:"0",
      course:"0",
      strokeColor2: '#fff',
      store_id:'',
    }
  },
  methods:{

  },
  mounted:function(){
    let vm = this;
    this.apiPost("http://r.huileyi.com/store/getMyStore", {}).then((res) => {
        console.log(res)
        if(res.code==200){
            vm.store_id=res.data.store_id
        }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "warn"
            })
        }
    })
    this.apiPost("http://r.huileyi.com/income/settlementDetails", {}).then((res) => {
        console.log(res)
        if(res.code==200){
           if(res.data.already_cash) vm.finish=res.data.already_cash;
           if(res.data.wait_cash) vm.waiting=res.data.wait_cash;
           if(res.data.no_cash) vm.course=res.data.no_cash
        }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "warn"
            })
        }
    })
  },
  components:{
    XHeader,
    Icon,
    Group,
    Cell,
    XCircle,Card
  },
  mixins:[window.mixins,http]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head_icon{
    position: absolute;
    right:310px;
    top:0;
    color:#fff;
    width:18px;
    height:18px;
    display: block;
    border-left:2px solid #fff;
    border-top:2px solid #fff;
    transform: rotate(-45deg);
  }
  .middle{
    text-align: center;
  }
  .lf{
    margin:12rem 0 0 0;

    width:49%;
    text-align: center;
  }
  .lf a{
    border-right:1px solid #ddd;
    display: inline-block;
    width:11.5rem;
  }
  .rt{
    margin:12rem 0 0 0;
    width:49%;
    text-align: center;
  }

  .vux-circle-content h2{

    color:#fff;
    font-weight: 500;
  }
  .vux-circle-content span{
    color:#fff;
  }
  .font{
    font-size: 14px;
    padding:14px;
  }

  .ba .vux-circle{
    height: 13rem;
  
    margin:0 auto;
  }
    .ba   .card-demo-flex {
    display: flex;
    background-color:#FF4948;
  }
  .ba .card-demo-content01 {
    padding: 10px 0;color:#fff;
  }
  .ba .card-padding {
    padding: 15px;
  }
  .ba .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .vux-1px-r:after{border-right:1px solid #fff;}
  .ba .weui-panel:before{border-top:none;}
  .ba .weui-panel{margin-top: 0px;}
  .ba .weui-cells{margin-top: 10px !important;}
</style>
