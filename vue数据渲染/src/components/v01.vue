<template>
  <div>
    <div id="c01" :style="`margin: ${content.modulePadding}px 0`">
      <div :class="`title t${content.mainTitleStyle}`">
        <p>
          <i v-if="content.mainTitleStyle == 1" class="iconfont icon-xinpin"></i>
          <i v-if="content.mainTitleStyle == 2" class="iconfont icon-hot1"></i>
          <i v-if="content.mainTitleStyle == 3" class="iconfont icon-iconfontyouhuiquan1"></i>
          <span>{{content.title}}</span>
        </p>
      </div>
      <ul>
        <li
          @click="herfs(n.link)"
          v-for="(n,i) in content.goodslist" :key="i">
          <img :src="n.pic | imgs">
          <p v-if="1 == content.showName">{{n.title}}</p>
          <p><del>&yen;{{n.original_price}}</del></p>
          <p :class="{b:1 == content.priceBold}" class="color">&yen;{{n.price}}</p>
        </li>
      </ul>
    </div>
    <!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {}
    },
    methods: {},
    created() {

    },
    mounted() {
    }
  }

</script>

<style scoped>
  .title{
    position: relative;
    top: 10px;
    width: 50%;
    font-size: 18px;
    margin: 0 auto;
    line-height: 2px;
    text-align: center;
  }
  .title i{
    font-size: 24px;
    position: relative;
    top: 4px;
  }
  .title p{
    display: inline-block;
    height: 20px;
    padding: 0 10px;
    background-color: #f8f8f8;
    position: relative;
    top: -4px;
  }
  .t1{
    border-top: 2px solid #fe3000;
    color: #fe3000;
  }
  .t2{
    border-top: 2px solid #fe6c00;
    color: #fe6c00;
  }
  .t3{
    border-top: 2px solid #884dff;
    color: #884dff;
  }







ul{
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
  li{
    width: 33.3%;
    padding: 10px;
    box-sizing: border-box;
    float: left;
    font-size: 14px;
    color: #666;

  }
  li img{
    width: 100%;
    height: 120px;
  }
  del{
    color: #999;
  }
  .b{
    font-weight: 600;
  }
  .color{
    color: #fe3000;
  }
</style>