<template>
  <div id="c21" :style="`margin:${content.modulePadding}px 0;`">
  <!--<p>21-21</p>-->
    <ul class="tab">
      <li
        v-for="(n,i) in content.goodslist"
        :class="{selected:show==i}"
        @click="selected(i)">
        <p>{{n.tabtitle | str(4)}}</p>
      </li>
    </ul>
    <ul class="tab-item">
      <li
        class="item"
        @click="herfs(n.link)"
        v-for="(n,i) in items" :key="i">
        <p><img :src="n.pic | imgs"></p>
        <p>{{n.title}}</p><br>
        <!--<p class="f12 color">已售</p>-->
        <p class="f12 color"><del>&yen;{{n.original_price}}</del></p>
        <p><b>&yen;{{n.price}}</b><i class="iconfont icon-gouwuche right"></i></p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {
        show:0,
        items:[]
      }
    },
    methods: {
      selected(i){
        i = i || 0
        this.show = i
        this.items=this.content.goodslist[i].goods
      }
    },
    created() {

    },
    mounted() {
      this.selected()
    }
  }

</script>

<style scoped>
.tab{
  background-color: #fff;
  overflow:hidden;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}
  .tab li{
    flex: 1 0 auto;
    width: 25%;
    float: left;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
  }
  ul li.selected{
    color: red;
    border-bottom: 1px solid red;
  }
  .tab-item{
    overflow: hidden;
  }
  .item{
    width: 50%;
    float: left;
    box-sizing: border-box;
    border: 1px solid #ddd;
    background-color: #fff;
  }
.item:nth-child(2n){
  border-left: none;
}

  .item img{
    width: 100%;
    height: 50vw;
  }
  .item p{
    padding: 1px 5px;
  }
.icon-gouwuche{
  font-size: 18px;
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 30px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  background-color: #dd2727;
  position: relative;
  top: -8px;
}
  b{
    color: #f61d4b;
  }
</style>