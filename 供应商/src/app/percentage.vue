<template>
  <div >
    <div class="Nav" style="width:100%;height:180px;background: #FF4948;">
        <div style="padding-top:1rem;text-align: center;color:#fff;">
          <h2 style="color:#fff;font-weight: 300">￥{{counts.total_percentage}}</h2>
          <span>累计金额(元)</span>
        </div>
        <span class="lf" style="float:left;">
          <h2 style="color: #fff;font-weight: 300">{{counts.wait_cash}}</h2>
          <a href="" style="color:#fff;">待结算收益(元)</a>
        </span>
        <span class="rt" style="float:left;">
          <h2 style="color:#fff;font-weight: 300">{{counts.already_cash}}</h2>
          <a href="" style="color:#fff;">已提现金额(元)</a>
        </span>
    </div>
    <flexbox style="text-align: center;background: #fff">
      <flexbox-item v-for="(item,i) in flex" :key="i">
        <div class="flex-demo">
          <p>￥{{item.canCash}}</p>
          <span>{{item.cashName}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <group style="margin-top:-0.5rem;">
      <cell class="font" :title="item.title" is-link :link="item.link" v-for="(item,i) in list" :key="i">
        <img slot="icon" style="width:16px;height:16px;display:block;margin-right:10px;" :src="item.src">
      </cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Cell,Group,Flexbox, FlexboxItem} from 'vux'
  export default {
    components:{
      Cell,
      Group,
      Flexbox, FlexboxItem
    },
    data(){
    return{
    bg:{white:false,grey:true},
    pageName:"提成收益",
    counts:{
      wait_cash:0,
      already_cash:0,
      total_percentage:0
    },
    list:[
      {src:require("../assets/images/p-1-1.png"),title:"提现",link:"/add_bink"},
      {src:require("../assets/images/p-2-2.png"),title:"设置提现账号",link:"add_card"},
      {src:require("../assets/images/p-3-3.png"),title:"提成明细",link:"/cash_infer"},
      {src:require("../assets/images/p-4-4.png"),title:"提现记录",link:"/cash_recode"},
    ],
    flex:[
      {canCash:"789646",cashName:"可提现金额(元)"},
      {canCash:"789646",cashName:"发起的提现金额(元)"}
     ]
    }
  },
      methods:{
        getList(){
            let merchant_id=localStorage.getItem('merchant_id');
            let vm=this;
           this.apiPost("http://r.huileyi.com/Income/merchantCommission",{merchant_id:merchant_id}).then((res)=>{
                if(res.code == 200){
                  vm.counts=res.data;

                }else{
                  this.$vux.toast.show({
                  text:res.msg,
                  type:"warn"
                  })
                }
         
            })
        } 
      },
      mounted(){
        this.getList();
      },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lf{
    margin:2rem 0 0 0;
    border-right:1px solid #ddd;
    width:49%;
    text-align: center;
  }
  .rt{
    margin:2rem 0 0 0;
    width:49%;
    text-align: center;
  }
  .cell{
    background: #E9E9E9;
    width:100%;
  }
  .cell span{
    width:30%;
    display: inline-block;
    text-align: center;
    color:#8A8A8A;
  }
  .flex-demo{
    margin:1rem 0 ;
    border-right: 1px solid #ddd;
  }
  .flex-demo:nth-child(3){
    border:0;
  }
  .flex-demo p{
    color:#FF4948;
  }
  .font{
    font-size: 14px;
    padding:1rem;
  }
</style>
