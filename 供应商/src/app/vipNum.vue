<template>
  <div class="vipNum" @click.stop='dropDown = false'>


    <div class="header">
      <div style="font-size: 14px">累计收益(元)</div>
      <div>￥{{money}}</div>
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class=" vux-1px-r">
            <span style="font-size: 14px">新增会员</span>
            <br/> <font>{{newComer}}(人)</font>
          </div>
          <div>
            <span style="font-size: 14px">共积累会员</span>
            <br/> <font>{{total}}(人)</font>
          </div>
        </div>
      </card>
    </div>



    <group style="text-align: center;margin-top:-10px;" @click.native.stop="dropShow">
      <span v-show="dropDown" class="sj1" style="padding:0.8rem 0;display: inline-block;font-size: 14px">全部 <i></i></span>
      <span v-show="!dropDown" class="sj" style="padding:0.8rem 0;display: inline-block;font-size: 14px">全部 <i></i></span>
      <ul class="dropDown box-shadow" v-if="dropDown " >
        <li v-for="(item,i) in list" :key="i" :class="{'red':i===select}" @click="selected(i)">{{item.msg}}</li>
      </ul>
    </group>

    <group class="detail" v-for="(item,index) in detail" :key="index">
      <cell style="font-size: 14px" :title="title" :value="num"></cell>
      <cell value-align="left">
        <img style="float:left;width:5rem;display:block;margin:0.5rem 1rem 0.5rem 0" :src="item.src" alt=""/>
        <div style="float:left;margin-top:1rem;" class="pStyle">
          <p>{{item.p2}}</p>
          <p>{{item.p3}}</p>
        </div>
      </cell>
      <div class='vip-bottom vux-1px-t'>
        <img  src="../assets/images/raw.png" style="" alt=""/><span style="margin-right:10px;">带来收益（元）：￥5.00</span>
      </div>


    </group>
  </div>
</template>

<script type="es6">
import {XHeader ,Icon,Group,Cell,Card} from 'vux'
export default {
data(){
  return{
  isShowHead:true,
  dropDown:false,
  select:false,
  money:"1,00000",
  newComer:"23445",
  total:"54353",
  right_show:true,
  pageName:'会员数量',
  title:"杨斯洛斯夫斯基",
  num:"到店次数: 5次",
  shouYi:"带来收益(元):￥0.00",
  bg:{white:false,grey:true},
  detail:[
    {src:require("../assets/images/0-14png_03.png"),p2:"最后一次: 2017-09-11 13:21",p3:"会员来源: 圣玛尼亚"},
    {src:require("../assets/images/0-14png_03.png"),p2:"最后一次: 2017-09-11 13:21",p3:"会员来源: 圣玛尼亚"},
    {src:require("../assets/images/0-14png_03.png"),p2:"最后一次: 2017-09-11 13:21",p3:"会员来源: 圣玛尼亚"},
    {src:require("../assets/images/0-14png_03.png"),p2:"最后一次: 2017-09-11 13:21",p3:"会员来源: 圣玛尼亚"},

  ],
  list:[
    {msg:"全部"},{msg:"圣玛尼亚软件"},{msg:"惠乐益电子商务"},
    {msg:"圣玛尼亚"}
  ]
  }
},
methods:{
  dropShow(){
    this.dropDown=!this.dropDown
    this.right_show=!this.right_show;
    this.right_show ? this.left_show=false : "";
  },
  selected(i){

    this.select=i
    this.all=this.list[i].msg

  }
},
  components:{
    XHeader,
    Icon,
    Group,
    Cell,Card
  },
  mixins:[window.mixins,http]
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .vux-header{
    background-color:#FF4948!important;
  }
  .vipNum .dropDown .red{
    background-color: #FF4948;
    color:#fff;

  }
  .vipNum .head_icon{
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
  .vipNum .sj:after{
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    display: inline-block;
  }
  .vipNum .sj1:after{
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #000;
    display: inline-block;
  }

  .vipNum .weui-cells{
    margin-top:10px;
  }
  .box-shadow {
    background-color: #fff;

  }

  .vipNum .middle{
    margin-top: -0.5rem;
    text-align: center;
    background-color: #FF4948;
    width:100%;
    height:180px;
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
  .vipNum .detail .pStyle p{
    margin:0 0 0.5rem 0;
    color:#888;
    font-size: 14px;
  }
  .vipNum .top{
    color:#fff;
    font-size: 16px;
  }
  .vipNum .top span{
    font-size: 18px;
  }
  .vipNum .dropDown{
    width:36%;
    background-color: #fff;
    text-align: center;
    position:absolute;
    z-index: 900;
    font-size: 14px;
    left:32%;
    top:45px;
    -webkit-box-shadow: 0 0 3px #ddd;
    -moz-box-shadow: 0 0 3px #ddd;
    box-shadow: 0 0 3px #ddd;
  }
  .vipNum .dropDown li{
    width:100%;
    height:30px;
    line-height:30px;
    color:#929292;
    border-bottom:1px solid #eee;
  }
  .weui-cells{
    overflow: visible!important;
  }
  .vipNum .detail{
    position: relative!important;
  }
  .vipNum .img{
    width: 14px;
    float:right;
    margin: -28px 143px 0 0;
  }
  .vip-bottom{margin-left:15px;font-size: 14px;color:#999;text-align: right;line-height: 3em}
  .vip-bottom img{height:14px;margin-right:0.5em;}
  .vipNum   .header{
    background-color:#FF4948;
    text-align:center;
    color:#fff;
    padding-top:1rem;
  }
  .vipNum   .card-demo-flex {
    display: flex;
    background-color:#FF4948;
  }
  .vipNum .card-demo-content01 {
    padding: 10px 0;
  }
  .vipNum .card-padding {
    padding: 15px;
  }
  .vipNum .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .vux-1px-r:after{border-right:1px solid #fff;}
  .vipNum .weui-panel:before{border-top:none;}

</style>
