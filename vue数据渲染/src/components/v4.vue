<template>
  <div id="c4" style="overflow: hidden;">
    <!--布局1-->
    <ul class="u1" v-if="content.layout == 1" :style="`margin: ${content.modulePadding}px 0`">
      <li
        @click="herfs(n.link)"
        v-for="(n,i) in content.goodslist" :key="i"
        :class="[{yangshi2:content.goodstyle == 2},{yangshi1:content.goodstyle != 2}]">
          <img :src="n.pic | imgs">
          <p class="title" :class="[{conter:content.goodstyle == 4},{'title-1':content.titleLine == 0}]" v-if="content.showName == 1">{{n.title | str(10,'...')}}</p>
          <p v-if="content.goodstyle == 2" class="f10" style="color: #888;margin-bottom: 5px;">已售：<b>5</b></p>
          <p class="f14" v-if="content.goodstyle != 4 && content.goodstyle != 5"><span class="del8">&yen;{{n.original_price}}</span></p>
          <p style="overflow: hidden" v-if="content.goodstyle != 4 && content.goodstyle != 5">
            <span class="left f16 color" :class="{d:content.priceBold == 1}">&yen;{{n.price}}</span>
            <span v-if="(content.goodstyle == 1 || content.goodstyle == 3) && n.sale_num" class="right"><span class="n">{{n.sale_num}}</span>件已售</span>
            <i v-if="content.goodstyle == 2" class="iconfont icon-gouwuche right"></i>
          </p>
        <p v-if="content.goodstyle == 5" style="overflow: hidden">
          <span class="f16 color" :class="{d:content.priceBold == 1}">&yen;{{n.price}}</span>
          <span class="f2 del8">&yen;{{n.original_price}}</span>
          <span class="zhe right">折</span>
        </p>
        <p v-if="content.goodstyle == 3" class="btn">{{content.goodstxt}}</p>
        <p v-if="content.goodstyle == 4" class="qian f18" :class="{d:content.priceBold == 1}">&yen;{{n.price}}</p>
      </li>
    </ul>
    <!--布局2-->
    <ul class="u2-1" v-if="content.layout == 2 && content.layoutstyles == 1">
        <li
          @click="herfs(n.link)"
          v-for="(n,i) in content.goodslist" :key="i">
          <div class="img">
            <img :src="n.pic | imgs">
            <p class="li2" v-if="content.sale_num">已售：{{content.sale_num}}</p>
          </div>
          <p class="title" :class="{'title-1':content.titleLine == 0}" v-if="content.showName == 1">{{n.title | str(11,'...')}}</p>
          <p class="qian">
            <span class="f18 color">&#x3000;&yen;{{n.price}}&#x3000;</span>
            <span class="f12">原价：<span class="del8">&yen;{{n.original_price}}</span></span>
          </p>
        </li>
      </ul>
    <ul class="u2-2" v-if="content.layout == 2 && content.layoutstyles == 2">
      <li
        @click="herfs(n.link)"
        v-for="(n,i) in content.goodslist" :key="i">
        <img :src="n.pic | imgs">
        <p class="title f16" v-if="content.showName == 1">{{n.title}}</p>
        <p class="f12"><span class="del8">&yen;{{n.original_price}}</span></p>
        <p class="n2-2-q">
          <span class="left f16 color">{{n.price}}</span>
          <span class="right f12" v-if="content.sale_num">已售：<b>{{content.sale_num}}</b></span>
        </p>
      </li>
    </ul>
    <ul class="u3" v-if="content.layout == 3">
      <template v-if="content.goodslist.length > 3">
        <li
          @click="herfs(n.link)"
          v-for="(n,i) in content.goodslist" :key="i">
          <img :src="n.pic | imgs">
          <p class="title" v-if="content.showName == 1">{{n.title | str(8)}}</p>
          <p><span class="del8">&yen;{{n.original_price}}</span></p>
          <p class="color"><b>&yen;{{n.price}}</b></p>
        </li>
      </template>
      <template v-else>
        <li
          @click="herfs(n.link)"
          :style="`width: calc(100vw / ${content.goodslist.length} - 9px);`"
          v-for="(n,i) in content.goodslist" :key="i">
          <img :src="n.pic | imgs" :style="`height:calc(100vw / ${content.goodslist.length} - 8px)`">
          <p class="title" v-if="content.showName == 1">{{n.title | str(8)}}</p>
          <p><span class="del8">&yen;{{n.original_price}}</span></p>
          <p class="color"><b>&yen;{{n.price}}</b></p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {}
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped>
  .del8{
    text-decoration:line-through;
  }
  .u1{

  }
  .u1 .yangshi1{
    float: left;
    width:calc(50% - 4px);
    margin: 2px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .u1 .yangshi2{
    border-top: none;
    float: left;
    width: 50%;
    margin: 0;
  }
  .u1 .yangshi2:nth-child(2n){
    border-left: none;
  }
  .u1 img{
    height: 50vw;
  }
  .u1 .n{
    color: #ff6b14;
    font-weight: 600;
  }
  .u1 .btn{
    width: 90%;
    margin: 8px auto;
    border-radius: 5px;
    background-color: #FC5101;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    line-height: 26px;
  }
  .u1 .icon-gouwuche{
    font-size: 18px;
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 30px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    background-color: #dd2727;
  }
  .u1 .title4{
    text-align: center;
  }
  .u1 .qian{
    color: #ecba59;
    text-align: center;
  }
  .u1 .zhe{
    display: inline-block;
    background-color: #000;
    color: #fff;
    padding: 0 5px;
  }

  .u2-1{

  }
  .u2-1 li{
    width: 100%;
  }
  .u2-1 .img{
    position: relative;
  }
  .u2-1 .li2{
    position: absolute;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    width: 100%;
    background-color: #666;
    color: #fff;
    text-align: right;
    box-sizing: border-box;
  }
  .u2-1 .qian{
    margin: 8px 0;
  }
  .u2-2 img{
    width: 40%;
    height: 140px;
    float: left;
    margin-right:10px;
  }
  .u2-2 .title{
    margin: 5px 0 60px;
  }
  .u2-2 .n2-2-q{
    line-height: 22px;
    overflow: hidden;
    padding: 0 5px 0 0;
  }
  .u3{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: auto;
    font-size: 12px;
  }
  .u3 li{
    flex:0 0 auto;
    width: 115px;
    margin-right: 8px;
    background-color: #fff;
    border: none;
  }
  .u3 img{
    height:calc(100vw / 3 - 8px);
  }



  img{
    width: 100%;
  }
  li{
    border: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 8px;
    overflow: hidden;
  }
  u1,.u2-1,.u2-2{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .title{
    color: #666;
    width: 100%;
  }
  .title-1{
    height: 30px;
    line-height: 30px;
    overflow: hidden;
  }
  del{
    color: #888;
  }
  .color{
    color: #f61d4b;
  }
  .d{
    font-weight: 600;
  }
  li p{
    line-height: 1.6;
    padding: 0 5px;
  }
  .conter{
    text-align: center;
  }
</style>