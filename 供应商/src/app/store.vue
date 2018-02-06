<template>
  <div>
    <div class="Nav" style="width:100%;height:170px;background: #FF4948;padding-top:2rem;">
      <div class="middle">
        <h2 style="color:#fff;font-weight: 400">¥{{writing}}</h2>
        <span style="color:#fff;">待结算(元)</span>
      </div>
        <span class="lf" style="float:left;">
          <h3 style="color:#fff;">¥{{jiesuan}}</h3>
          <a href="" style="color:#fff;">结算中(元)</a>
        </span>
        <span class="rt" style="float:left;">
          <h3 style="color:#fff;">¥{{finish}}</h3>
          <a href="" style="color:#fff;">已结算(元)</a>
        </span>
    </div>
    </cell>
    <cell value-align="left" class="cell">
      <span>结算时间</span>
      <span>结算金额</span>
      <span>结算状态</span>
    </cell>
    <group class="group">
      <cell  value-align="left" class="cell" style="background: #fff" v-for="(item,i) in list" :key="i">
        <span>{{item.date}}</span>
        <span>¥{{item.money}}</span>
        <b class="rightState"></b>
        <router-link to="checkDetail"><span style="color:#5FBE8E">{{item.result}}</span></router-link>
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
      pageName:"门店记录",
      writing:"6,6823",
      jiesuan:"6,6823",
      finish:"6,6823",
      date:"2017-09-11",
      money:"0.00",
      bg:{white:false,grey:true},
        list:[
            {date:"2017-09-11",money:"0.00元",result:"已结算"},
            {date:"2017-09-11",money:"0.00元",result:"已结算"},
            {date:"2017-09-11",money:"0.00元",result:"已结算"},
        ]
      }
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
    padding-top:14px;
    padding-bottom:14px;
    font-size: 14px;
  }
  .group{
    margin-top:-1.3rem;
  }
  .cell span{
    width:32%;
    display: inline-block;
    text-align: center;
    color:#8A8A8A;
  }
  b{
    display: inline-block;
    width:7px;
    height:7px;
    border-top:2px solid #E9E9E9;
    border-right:2px solid #E9E9E9;
    transform:rotate(45deg);
    position: absolute;
    right:35px;
    top:16px;
  }
  .rightState{
    width:7px;
    height:7px;
    display:inline-block ;
    border-top:1px solid #8D8D8D;
    border-right:1px solid #8D8D8D;
    transform: rotate(45deg);
    margin-top:4px;
  }
  @media screen and (max-width: 320px) {
      b{
        right:28px;
      }
  }
</style>
