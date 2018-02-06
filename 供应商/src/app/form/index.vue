<template>
    <div>
      <div class="Nav" style="position: absolute;z-index: 300;width:100%;">
        <div class="middle">
          <h2 style="color:#fff;font-weight: 400">¥6,6823</h2>
          <span style="color:#fff;">今日订单(元)</span>
        </div>
            <span class="lf" style="float:left;">
              <h3 style="color:#fff;">6,4123</h3>
              <a href="" style="color:#fff;">订单笔数(金)</a>
            </span>
        <b class="diver"></b>
            <span class="rt" style="float:left;">
              <h3 style="color:#fff;">6,4123</h3>
              <a href="" style="color:#fff;">订单笔数</a>
            </span>
      </div>
      <grid :rows="3" class="my" >
        <grid-item  v-for="(item,index) in list" :key="index">
          <div class="flex-demo" >
            <img :src="item.src">
            <p style="margin-top:0.5rem;width:5rem;padding-left:15px;">{{item.detail}}</p>
          </div>
        </grid-item>
      </grid>
      <group style="position: absolute;top:425px;left:0;z-index: 300;font-size:12px;color:#888;">
        <cell title="万商互联正式版即将上线,上线时间请关注公告" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;"src="../../assets/ago/14.png">
        </cell>
      </group>
      <img style="width:375px;z-index: 300;position: absolute;top: 525px;" src="../assets/images/18.png" alt=""/>
    </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem,XHeader ,Icon,Grid,GridItem,Group,Cell} from 'vux'
  export default {
    data(){
    return{
      pageName:'万商户联-供货商',
      list:[
        {src:require("../assets/images/8.png"),detail:"订单"},
        {src:require("../assets/images/9.png"),detail:"结算"},
        {src:require("../assets/images/10.png"),detail:"账号管理"},
        {src:require("../assets/images/11.png"),detail:"汇总查询"},
        {src:require("../assets/images/12.png"),detail:"提成收益"},
      ]
    }
  },
  components:{
    XHeader,
      Icon,
      Flexbox, FlexboxItem,
      Grid,
      GridItem,
      Group,Cell
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .x-header{
    width:100%;position:fixed;left:0;top:0;z-index:100;
  }
  .vux-header{
    background-color:#FF4948!important;
  }
  .person img{
    width:1.5rem;
  }
  .middle{
    margin-top: 1.5rem;
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
  .my{
    position: absolute;
    top:250px;
    z-index: 500;text-align: center;
  }
  .my img{
    width:20px;
    height:20px;
  }
  .flex-demo{
    font-size: 12px;
    color:#000;
  }
  .middle{
    margin-top: 1.5rem;
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
</style>
