<template>
    <div id="order">
      <div class="Nav" style="width:100%;height:170px;background: #FF4948;padding-top:2rem;">
        <div class="middle">
          <h2 style="color:#fff;font-weight: 300">￥{{already}}</h2>
          <span style="color:#fff;">已结算(元)</span>
        </div>
        <span class="lf" style="float:left;">
          <h3 style="color:#fff;font-weight: 400">￥{{earnest}}</h3>
          <a href="" style="color:#fff;">结算中(元)</a>
        </span>
        <span class="rt" style="float:left;">
          <h3 style="color:#fff;font-weight: 400">￥{{waiting}}</h3>
          <a href="" style="color:#fff;">待结算(元)</a>
        </span>
      </div>
      <div value-align="left" class=" title" >
        <span>已结算</span>
        <span>结算中</span>
        <span>待结算</span>
      </div>
      <group class="group" v-for="(item,index) in list" :key="index">
        <cell style="font-size: 14px;" :title="item.store_name" is-link link='/store'>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src='../assets/images/box.jpg'>
        </cell>
        <cell value-align="left" class="cell" style="background: #fff">
          <span>¥{{item.already_cash}}</span>
          <span>¥{{item.no_cash}}</span>
          <span>¥{{item.wait_cash}}</span>
        </cell>
      </group>
    </div>
</template>

<script type="es6">
  import {Cell,Group} from 'vux'
  import http from '../ajax.js'
    export default {
      data(){
        return{
          pageName:"查看结算明细",
          bg:{white:false,grey:true},
          already:"0",
          earnest:"0",
          waiting:"0",
          list:[
            {store_name:"",already_cash:"0.00",no_cash:'1.00',wait_cash:'2.00'},
            {store_name:"",already_cash:"0.00",no_cash:'1.00',wait_cash:'2.00'},
            {store_name:"",already_cash:"0.00",no_cash:'1.00',wait_cash:'2.00'}
          ]
        }
      },
      mounted:function(){
        let vm = this;
        this.apiPost("http://r.huileyi.com/income/storeCollect", {}).then((res) => {
             console.log(res)
             if(res.code==200){
                if(res.data) this.list=res.data;
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
                vm.already=res.data.already_cash;
                vm.earnest=res.data.no_cash;
                vm.waiting=res.data.wait_cash;

             }else{
                this.$vux.toast.show({
                  text: res.msg,
                  type: "warn"
              })
             }
        })
      },
      components:{
        Cell,
        Group
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .middle{
    text-align: center;
  }
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
    margin-bottom:-5px;
  }
  .title{
    padding:10px 0;
    margin-bottom:-20px;
    width:100%;
  }
  .title>span{
    width:32%;
    display: inline-block;
    text-align: center;
    color:#ABABAB;
  }
  .cell span{
    width:30%;
    display: inline-block;
    text-align: center;
    color:#8A8A8A;
    font-size: 14px;
  }
  .group{
    margin-top:-0.8rem;
  }
  #order{
    margin-bottom: 3%;

  }
</style>
