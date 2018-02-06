<template>
  <div>
      <div style="width:100%;height:200px;background: #FF4948;padding-top:2rem;">
        <img style="width:30%;display: block;margin:0 auto;" src="../assets/images/face_03.png" alt=""/>
        <p class="msg" style="">我是客服小7,有什么可以帮到您的吗?</p>
      </div>
      <cell style="text-align: center;color:#7E7E7E" title="猜你遇到以下问题" ></cell>
    <div class="group" v-for="(item,i) in list" :key="i">
      <div style="float:left;margin-top:1rem;width:25%;text-align: center; border-right:1px solid #F7F7F7;">
        <img style="width:20px" :src="item.src" alt=""/>
        <p class="pstyle">{{item.p}}</p>
      </div>
      <div class="Astyle" style="margin-top:1rem;">
        <a @click="jump()">{{item.a1}}</a>
        <a >{{item.a2}}</a>
        <a>{{item.a3}}</a>
      </div>
    </div>

    <div class="btn">
      <button >
        <img class="imgStaty" width="18" src="../assets/images/0-15.png" alt=""/>
        电话客服
      </button>
      <button>
        <img class="imgStaty" width="18" src="../assets/images/0-16.png" alt=""/>
        在线客服
      </button>
    </div>
  </div>
</template>

<script type="es6">
import {XHeader ,Icon,Group,Cell,Flexbox,FlexboxItem,XButton} from 'vux'
export default {
data(){
  return{
  isShowHead:true,
  pageName:'客服中心',
  bg:{white:false,grey:true},
  list:[
    {src:require("../assets/images/0-12.png"),p:"操作",a1:"商户App登录权限",a2:"添加店员",a3:"商户网页版后台"},
    {src:require("../assets/images/0-13.png"),p:"结算",a1:"打款时间",a2:"打款状态查询",a3:"手动提现"},
    {src:require("../assets/images/service_03.png"),p:"订单",a1:"打款时间",a2:"打款状态查询",a3:"手动提现"}
  ]
  }
},
  methods:{
    jump(){
      this.$router.push("/solve")
    }
  },
  components:{
    XHeader,
    Icon,
    Group,Cell,
    Flexbox,
    FlexboxItem,
    XButton
  },
  mixins:[window.mixins,http]
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
  .msg{
    height:2.5rem;
    background: #fff;
    width:80%;
    line-height:2.5rem;
    text-align: center;
    margin:1rem auto;
    border-radius: 7px;
  }
  .xbtn{
    font-size: 16px;
  }
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
  .vux-cell-primary{
    margin-left:1rem!important;
  }
  .Astyle a{
    font-size: 14px;
    color:#888;
    padding-left:0.5rem;
    display: inline-block;
    margin-bottom:0.3rem ;
  }
  .Astyle a:before{
    display:inline-block;
    content: '';
    width:5px;
    height:5px;
    background: red;
    border-radius: 50%;
    margin:-2px 5px 0 0 ;
    vertical-align: middle;
  }

  .group{
    width:100%;
    height:5rem;
    margin-bottom:0.5rem;
    background: #fff;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .btn{
    width:100%;
    margin:1rem 0 1rem 0;
  }
  .btn button{
    width:40%;
    height:30px;
    line-height:30px;
    border-radius: 5px;
    border:0;
    outline:none;
    text-align: center;
  }
  .btn button:nth-child(1){
    background-color: #fff;
    color:#FF4948;
    margin-left:1.5rem;
  }
  .btn button:nth-child(2){
    background-color: #FF4948;
    color:#fff;
    margin-left:1rem;
  }
  .imgStaty{
    vertical-align: middle;
  }
  .button.weui-btn{
    width:80%!important;
  }
  @media screen  and (max-width: 320px) {
    .msg{
      font-size: 14px;
    }
  }
  @media screen  and (max-width: 320px) {
    .Astyle a{
      font-size: 14px;
    }
  }
  @media screen and (max-width:320px){
    .comp{
      width: 1.3rem!important;
      position: absolute;
      top: 9px!important;
      right: 112px!important;
      z-index: 1;
    }
  }
  @media screen and (max-width:320px){
    .pho{
      width: 1.3rem!important;
      position: absolute;
      top: 9px!important;
      left:23px!important;
      z-index: 1;
    }
  }
  @media screen and (max-width:320px){
    .xbtn{
      font-size: 14px;
    }
  }
  @media screen and (max-width:320px){
    .pstyle{
      font-size: 14px;
    }
  }

</style>
