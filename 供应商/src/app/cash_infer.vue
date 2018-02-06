<template>
  <div class="xinxi">
    <div class="top">
      <span @click="isShow">{{line}}
          <span v-show="leftState"  class="strecth">▼</span>
          <span v-show="!leftState"  class="strecth">▲</span>
      </span>
      <span @click="finish">{{pay}}
          <span v-show="rightState"  class="strecth">▼</span>
          <span v-show="!rightState"  class="strecth">▲</span>
      </span>
      <ul class="online box-shadow" v-show="lineShow" >
        <li v-for="(item,i) in list" :key="i" @click="addBg(i)" :class="{'red':i===selected}">{{item.online}}</li>
      </ul>
      <ul class="finish box-shadow" v-show="finishShow" >
        <li v-for="(item,i) in box" :key="i" @click="finishs(i)" :class="{'red':i===select}">{{item.content}}</li>
      </ul>
    </div>
    <Group style="margin-top:-0.5rem;" v-for="(item,i) in detail" :key="i">
      <cell :title="item.orderNum" :value="item.waiting" style="font-size: 14px"  >
        <img slot="icon" src="../assets/images/raw_bao_03.png" width="15" style="display:block;margin-right:5px;" >
      </cell>
      </cell>
      <cell value-align="left" style="font-size: 14px;" class="content">
        <p>提成金额(元):<a href="">{{item.money}}</a></p>
        <p>来源:<a href="">{{item.state}}</a></p>
        <p>{{item.store}}</p>
        <p>时间:<a href="">{{item.dateTime}}</a></p>
      </cell>
    </Group>
  </div>
</template>

<script type="es6">
  import { Group,Cell} from 'vux'
    export default {
      components: {
        Group,Cell
      },
      methods:{
        isShow(){
          this.lineShow=!this.lineShow
          this.finishShow=false
          this.leftState=!this.leftState
          this.rightState=true
        },
        finish(){
           this.finishShow=!this.finishShow
           this.lineShow=false
           this.rightState=!this.rightState
           this.leftState=true
        },
        addBg(i){
          console.log(i)
          this.selected=i
          this.line=this.list[i].online
          this.lineShow=false
          this.leftState=true

        },
        finishs(i){
          console.log(i)
          this.select=i
          this.pay=this.box[i].content
          console.log(this.content)
          this.finishShow=false
          this.rightState=true
        }
      },
      data(){
      return{
      lineShow:false,
      finishShow:false,
      selected:false,
      select:false,
      leftState:true,
      rightState:true,
      line:"线上",
      pay:"待结算",
      pageName:"提成记录信息",
      bg:{white:false,grey:true},
      list:[{online:"线上"},{online:"线下"}],
      box:[{content:"待结算"},{content:"已结算"}],
      detail:[
        {orderNum:"订单号:20170908121136"
            ,waiting:"待结算",money:"1200",state:"线上",
            store:"惠乐益-中原店",dateTime:"2017-12-12 16:13"},
        {orderNum:"订单号:20170908121136"
            ,waiting:"待结算",money:"1200",state:"线上",
            store:"惠乐益-中原店",dateTime:"2017-12-12 16:13"}
      ]
      }
    },
    mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .xinxi .top{
    width:100%;
    height:40px;
    line-height: 40px;
    background-color: #fff;
  }
  .xinxi .top>span{
    width:49%;
    text-align: center;
    display: inline-block;
  }
  .xinxi .red{
    background-color: #FF4948;
    color:#fff;
  }
  /*.xinxi .top span:after{*/
    /*content: '';*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-left: 6px solid transparent;*/
    /*border-right: 6px solid transparent;*/
    /*border-top: 6px solid #000;*/
    /*display:inline-block;*/
    /*margin:8px 0 0 5px;*/
  /*}*/
  .xinxi  .content p{
    color:#000;
    margin-bottom:5px;
  }
  .xinxi .content a{
    color:#000;
    padding-left:10px;
  }
  .xinxi .weui-cell__ft {
    color:#FF4948;
  }
  .online{
    width:49%;
    border:1px solid #ddd;
    position: absolute;
    z-index: 700;text-align: center;
    background-color: #fff;
  }
  .online li{
    border-bottom:1px solid #ddd;
  }
  .finish li{
    border-bottom:1px solid #ddd;
  }
  .finish{
    width:49%;
    border:1px solid #ddd;
    position: absolute;
    z-index: 700;
    right:0;
    text-align: center;
    background-color: #fff;
  }
  .box-shadow {
    background-color: #fff;
    -webkit-box-shadow: 0 0 3px #ddd;
    -moz-box-shadow: 0 0 3px #ddd;
    box-shadow: 0 0 3px #ddd;
  }
  .xinxi .strecth{
    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
    -ms-transform:scale(1,0.5);
    -webkit-transform:scale(1,0.5);
    -moz-transform:scale(1,0.5);
    -o-transform:scale(1,0.5);
  }
</style>
