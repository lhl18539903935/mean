<template>
  <div class="card" v-show="cardlistshow">
      <div class="cardlist"  v-for="(item,i) in tablist" :key="i" >
            <!--卡片列表-->
        <!--cardtab-->
        <div class="cardtab">
            <ul>
                <li :class="{'red':state==i?'red':''}" @click="choose(i)">{{item.tab}}</li>
            </ul>
        </div>
        <!--cardcontent-->
        <div class="cardcontent" v-show="item.cardconentshow">
            <!--cardcontent-top-->
            <div class="cardcontent-top">
                <img :src="item.cardsrc" alt="">
            </div>
            <!--cardcontent-bottom-->
            <div class="cardcontent-bottom">
                <!--标题title-->
                <p :title="cardtitle">{{item.cardtitle}}</p>
                <!--已售sell-->
                <p :title="cardsell">已售：{{item.cardsell}}</p>
                <!--原价del -->
                <del :title="cardcost">￥{{item.cardcost}}</del>
                <!--现价current-->
                <p :title="cardcurrent">
                    ￥{{item.cardcurrent}}
                    <img src="../../assets/ico-addcart.png" alt="">
                </p>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    //   图片路径
      cardsrc:{},
    //   card 标题
      cardtitle:{
          type:String,
          default:""
      },
    //   已售数量
      cardsell:{
          type:Number,
          default:0
      },
    //   原价
      cardcost:{
          type:Number,
          default:0
      },
    //   现价
      cardcurrent:{
          type:Number,
          default:0
      },
    //   卡片列表
      tablist:{
          type:Array,
          default:[]
      },
    //   是否显示卡片列表
      cardlistshow:{
          type:Boolean,
          default:true
      }
  },
  data(){
      return{
          state:0,
        //   card:require('../../assets/ico-addcard.png')
        //   tablist:[
        //       {key:"0",tab:"卡片一",cardsrc:require('../../assets/g6.jpg'),cardtitle:"",cardconentshow:true},
        //       {key:"1",tab:"卡片二",cardsrc:require('../../assets/g6.jpg'),cardsell:"",cardconentshow:false},
        //       {key:"2",tab:"卡片三",cardsrc:require('../../assets/g6.jpg'),cardcost:"",cardconentshow:false},
        //       {key:"3",tab:"卡片四",cardsrc:require('../../assets/g6.jpg'),cardcurrent:"",cardconentshow:false},
        //   ]
      }
  },
    //   tab 切换
    methods:{
        choose(i){
            console.log(i)
            this.state=i
            if(i==0){
            this.tablist[0].cardconentshow=true
            this.tablist[1].cardconentshow=false
            this.tablist[2].cardconentshow=false
            this.tablist[3].cardconentshow=false
        }
            if(i==1){
            this.tablist[0].cardconentshow=false
            this.tablist[1].cardconentshow=true
            this.tablist[2].cardconentshow=false
            this.tablist[3].cardconentshow=false
        }
            if(i==2){
            this.tablist[0].cardconentshow=false
            this.tablist[1].cardconentshow=false
            this.tablist[2].cardconentshow=true
            this.tablist[3].cardconentshow=false
        }
            if(i==3){
            this.tablist[0].cardconentshow=false
            this.tablist[1].cardconentshow=false
            this.tablist[2].cardconentshow=false
            this.tablist[3].cardconentshow=true
        }
        }
    }
}
</script>
<style scoped>
    .card{
        width:95%;
        margin:0 auto;
        position: relative;
        height:320px;
    }
    .cardlist{
        width:25%;
        margin:0 auto;
        float:left;
         /*position: relative;*/
    }
    .cardtab{
        width:100%;
        float:left;
       
    }
    .cardtab>ul{
        width:100%;
        float: left;
        list-style-type: none;
        text-align: center;
        background-color: #fff;     
    }
    .cardcontent{
        width:50%;
        position: absolute;
        top:36px;left:0;
        border:1px solid #EEEEEE;
    }
    .cardtab>ul li{
        width:100%;
        float:left;
        font-size: 12px;
        padding:7px 0;
    }
    .cardcontent-top{
        width:100%;
        height:180px;
        overflow: hidden;
    }
    .cardcontent-top img{
        width:100%;
        margin:0.5rem 0;
    }
    .cardcontent-bottom p:nth-child(1){
        font-size: 14px;
    }
    .cardcontent-bottom p:nth-child(2){
        font-size: 12px;
        color:#A4A4A4;
    }
    .cardcontent-bottom del{
        font-size: 12px;
        color:#A4A4A4;
    }
    .cardcontent-bottom p:nth-child(4){
        font-size: 16px;
        color:#F61D4B;
        font-weight: 600;
        width:100%;
        margin-bottom:5%;
    }
    .cardcontent-bottom p:nth-child(4) img{
        width:30px;
        float:right;
        border-radius: 50%;
        margin-right:10px;
    }
    .red{
        color:#e4393c;
        border-bottom:2px solid #e4393c;
    }
</style>

