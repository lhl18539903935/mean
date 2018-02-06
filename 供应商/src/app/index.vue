<template>
  <div class='index'>

    <div class="header">
      <div style="font-size: 18px">￥{{order}}</div>
      <div>今日订单（元）</div>
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class=" vux-1px-r">
            <span style="font-size: 16px">{{count}}</span>
            <br/> <font>订单笔数(今)</font>
          </div>
          <div>
            <span style="font-size: 16px">{{number}}</span>
            <br/> <font>会员数量</font>
          </div>
        </div>
      </card>
    </div>
      <flexbox :gutter="0" wrap="wrap" class="wrap">
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link class="zhuce" to="/order">
            <p class='padd'><img src="../assets/images/9.png"></p>
            <p>订单</p>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link to="/balance">
            <p class='padd'><img src="../assets/images/8.png"></p>
            <p>结算</p>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link to="/account">
            <p class='padd'><img src="../assets/images/10.png"></p>
            <p>账号管理</p>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link class="zhuce" to="/collect">
            <p class='padd'><img src="../assets/images/11.png"></p>
            <p>汇总查询</p>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link to="/percentage">
            <p class='padd'><img src="../assets/images/12.png"></p>
            <p>提成收益</p>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item :span='1/3'>
        <div class="flex-demo">
          <router-link to="/vipNum">
          <p class='padd'><img src="../assets/images/13.png"></p>
          <p>我的会员</p>
            </router-link>
        </div>
      </flexbox-item>
    </flexbox>
    <div class="gonggao">
      <router-link to='/ann'>
      <div style='color:#000;'>
        <p class="gonggao_l"><img src="../assets/images/14.png"></p>
        <marquee class='gonggao_m'>
          <marquee-item v-for="i in asyncCount" :key="i" @click.native="onClick(i)" class="align-middle">{{i}}</marquee-item>
        </marquee>
        <div style="clear:both;"></div>
      </div>
      </router-link>
    </div>
    <div style='margin-bottom:10px;'>
      <swiper auto height="120px">
        <swiper-item class="swiper-demo-img" v-for="(item,index) in demo_list" :show-desc-mask='false' :key="index"><img :src="item" style='width: 100%;height: 100%'></swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {Card,Flexbox,Scroller,FlexboxItem,MarqueeItem,Marquee,Swiper,SwiperItem} from 'vux'
  import mixin from '../vuex/mixin.js'
  import http from '../ajax.js'
  export default {
    components:{
      Card,
      Flexbox,
      FlexboxItem,
      MarqueeItem,
      Marquee,
      Swiper,
      SwiperItem,
      Scroller
    },
    mounted:function() {

    },
    created:function() {
      /*this.apiPost('/home/getSlideShow', {}).then((res) => {
        console.log(res);

      })*/

    },
    methods:{
      onClick:function(i){
        console.log(i)
      },
    },
    data:function(){
      return{
        bg:{white:false,grey:true},
        demo_list:[require('../assets/images/18.png'),require('../assets/images/18.png')],
        pageHeader:true,
        pageName:"万商互联-供货商",
        order:"66666",
        count:"66666",
        number:"66666",
        asyncCount:['万联互商即将上线，欢迎关注欢迎关注欢迎关注','开学啦！！！'],
      }
    },
    mixins:[mixin,http]
  }
</script>
<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .gonggao{padding:10px 10px;background: #fff;margin: 4% 0;}
  .gonggao_l{float:left;}
  .gonggao_l img{height:14px;}
  .gonggao_m{text-overflow:ellipsis;white-space:nowrap; overflow: hidden;width:89%;float:left;
    text-indent: 2%;}
  .card-demo-flex {
    display: flex;
    background-color:#FF4948;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .header{
    background-color:#FF4948;
    text-align:center;
    color:#fff;
    padding-top:1rem;
  }
  .weui-panel:before{
    border-top:none;
  }
  .title{
    padding: 2% 0 6%;
  }
  .vux-1px-r[data-v-2bf4e57a]:after{
    border-right: 1px solid #fff;
  }
  .vux-flexbox{
    text-align:center;
    background: #fff;
    padding-bottom: 9%;
  }
  .flex-demo{
    padding:20%;
    padding-bottom: 0;
    padding-top: 5%;
    font-size:13px;
  }
  .flex-demo img{
    width:80%;
  }
  .padd{
    padding: 32%;
    padding-bottom:10%;
    color:#000;
  }
  .zhuce {
    color:#2e2e2e
  }
  .wrap p{
    color:#000;
    font-size: 14px;
  }
  .index .vux-1px-r:after{border-color:#fff;}

</style>
