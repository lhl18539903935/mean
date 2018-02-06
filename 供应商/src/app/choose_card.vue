<template>
  <div class="main">
    <div class="content">
      <div class="cell">
        <span class="lf">{{username}}</span>
        <span class="rt">{{bank}}</span>
        <div style="clear:both"></div>
      </div>
      <div class="ipt">
        <div >
          <span class="lf">输入提现金额</span>
          <span class="rt">￥{{money}}</span>
        </div>
        <div style="clear:both;"></div>
        <div>
          <input type="text" style="background-color: #F4F4F4;font-size: 16px;text-align: right"/>
          <span>元</span>
        </div>
      </div>
    </div>
    <div style="width:90%;margin:0.5rem auto;">
      <x-button style="background-color: #FF4948;font-size: 16px;color:#fff;" link="/tj_success">确认提现</x-button>
    </div>
  </div>
</template>

<script type="es6">
    import {Group,Cell,FormPreview,XButton} from "vux"
    export default {
    components:{
      Group,
      Cell,
      FormPreview,
      XButton
    },
      data(){
      return{
         pageName:"提现",
         bg:{white:false,grey:true},
         username:"杨梦龙",
         bank:"建设银行",
         money:"99999"
      }
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main .cell{
    width:90%;
    margin:1rem auto;
    padding-top:10px;
    padding-bottom:10px;
    border-bottom:1px solid #ddd;
    font-size: 14px;
  }
  .ipt{
    width:90%;
    margin:-17px auto;
    text-align: center;
  }

  .ipt div:first-child span{
    display: inline-block;
    padding:0.5rem 0.5rem 0 0;
  }
  .ipt div:nth-child(3) {
    width:100%;
    margin:1rem auto;
    background-color: #F4F4F4;
    border-radius: 7px;
  }
  .ipt div:nth-child(3) input{
    padding:0.5rem 1.5rem;
    margin:1rem 0;
    border:0;
    outline:none;
  }
  .content{
    height:180px;
    width:90%;
    margin:1rem auto;
    background-color: #fff;
    border-radius: 7px;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
</style>
