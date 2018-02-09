<template>
  <div id="c8">
<!--<p>{{content}}</p>-->
    <ul :style="`margin: ${content.modulePadding}px 0`">
      <li class="yangshi1"
          @click="herfs(n.link)"
          :style="'width: calc(100% / '+content.dataset.length+')'"
          v-if="content.layout == 1 && content.layout1_style == 1"
          v-for="(n,i) in content.dataset" :key="i">
        <img :src="n.pic | imgs" :style="'height:calc(100vw / '+content.dataset.length+')' ">
        <p :style="`color: ${n.titleColor};background-color: ${n.titleBackgroundColor}`">{{n.showtitle | str(6,'...')}}</p>
      </li>
      <li class="yangshi2"
          @click="herfs(n.link)"
          v-if="content.layout == 1 && content.layout1_style == 2"
          v-for="(n,i) in content.dataset" :key="i">
        <div>
          <img :src="n.pic | imgs">
          <p :style="`color: ${n.titleColor};`">{{n.showtitle | str(6,'...')}}</p>
        </div>
      </li>
    </ul>
    <ul class="ul2">
      <li class="buju2"
          @click="herfs(n.link)"
          v-if="content.layout == 2"
          v-for="(n,i) in content.dataset" :key="i">
        <img :src="n.pic | imgs" style="">
        <p :style="`color: ${n.titleColor};white-space:nowrap;text-overflow:ellipsis;margin-bottom: 4px;`">{{n.showtitle | str(6,'...')}}</p>
      </li>
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
  ul{
    overflow: hidden;
    font-size:12px;
  }
  .yangshi1{
    width: 20%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 2px;
    float: left;
    position: relative;
    font-size: 0;
  }
  .yangshi1 img{
    width: 100%;
    height: 60px;
  }
  .yangshi1 p{
    font-size: 12px;
    text-align: center;
    border-radius: 12px;
    width: 80%;
    left: 10%;
    bottom: 0;
    position: absolute;
  }
  .yangshi2{
    width: 50%;
    padding: 5px;
    float: left;
    box-sizing: border-box;
  }
  .yangshi2 div{
    padding: 5px;
    background-color: #fff;
    overflow: hidden;
  }
  .yangshi2 p{
    line-height: 30px;
  }
  .yangshi2 img{
    width: 30px;
    height: 30px;
    float: left;
    margin-right: 5px;
  }
  .ul2{
    display: flex;
    justify-content: space-around;
  }
  .buju2{
    flex: 1 1 auto;
    width: 20%;
    text-align: center;
    box-sizing: border-box;
    padding: 2px;
  }
  .buju2-padding{
    padding: 0 2px;
  }
  .buju2 img{
    width: 100%;
  }
</style>