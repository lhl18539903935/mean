<template>
  <div >
    <div class="Nav" style="width:100%;height:180px;background: #6594fe;line-height: 1.7rem;">
        <div style="padding-top:1rem;text-align: center;color:#fff;">
          <h2 style="color:#fff;font-weight: 300">￥{{addUp | setDecimal}}</h2>
          <span class="nav-fontize">累计金额(元)</span>
        </div>
        <span class="lf" style="float:left;">
          <h2 style="color: #fff;font-weight: 300">￥{{income}}</h2>
          <a  class="nav-fontize" href="" style="color:#fff;">待结算收益(元)</a>
        </span>
        <span class="rt" style="float:left;">
          <h2 style="color:#fff;font-weight: 300">￥{{cash | setDecimal}}</h2>
          <a class="nav-fontize" href="" style="color:#fff;">已提现金额(元)</a>
        </span>
    </div>
    <flexbox style="text-align: center;background: #fff;margin-top:0.8rem">
      <flexbox-item v-for="(item,i) in flex" :key="i">
        <div class="flex-demo">
          <p>￥{{item.canCash | setDecimal}}</p>
          <span class="nav-fontize">{{item.cashName}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <group style="margin-top:-0.5rem;">
      <cell class="font" :title="item.title" is-link :link="item.link" v-for="(item,i) in list" :key="i">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.src">
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
      pageHeader:true,
      bg:{white:false,grey:true},
      pageName:"提成收益",
      addUp:"",
      income:"0.00",
      cash:"",
      list:[
        {src:require("../assets/001.png"),title:"提现",link:"/add_bink"},
        //{src:require("../assets/002.png"),title:"设置提现账号",link:"my_card"},
        {src:require("../assets/003.png"),title:"提成明细",link:"/cash_infer"},
        {src:require("../assets/004.png"),title:"提现记录",link:"/twithdraw"},
      ],
      flex:[
        {canCash:"0",cashName:"可提现金额 (元)"},
        {canCash:"0",cashName:"发起的提现金额 (元)"}
       ]
      }
    },
       filters:{
            setDecimal(val){
                val=val?val:0;
                let num=parseFloat(val);
               return parseFloat((Math.floor(num*100))/100).toFixed(2);
            }
        },
    mounted(){
      let vm = this;
      this.apiPost(this.rhost+'/Dlsgains/dlsPercentage', {}).then((res) => {
        if(res.code==200){
            vm.addUp=parseFloat(res.data.amount_money);
            // vm.income=parseFloat(res.data.has_cash_money);
            vm.cash=parseFloat(res.data.withdraw_money);
            vm.flex[0].canCash=parseFloat(res.data.can_cash_money);
            vm.flex[1].canCash=parseFloat(res.data.frozen_money);

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lf{
    margin:2rem 0 0 0;
    border-right:1px solid #eee;
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
    border-right: 1px solid #eee;
    line-height: 1.3rem;
  }
  .flex-demo:nth-child(3){
    border:0;
  }
  .flex-demo p{
    color:#6594fe;
  }
  .font{
    font-size: 14px;
    padding:1rem;
  }
  .nav-fontize{
    font-size: 13px;
  }
</style>
