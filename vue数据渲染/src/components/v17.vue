<template>
  <div id="c17" :style="`margin:${content.modulePadding}px 0;overflow: hidden;`">
    <ul :class="{hidden:h}">
      <li
        :class="{yuan:content.layout == 0}"
        @click="herfs(n.link)"
        :style="`background-color: ${n.bgColor};color: ${n.fotColor}`"
        v-for="(n,i) in content.dataset" :key="i">
        {{n.showtitle | str(4)}}
      </li>
    </ul>
    <p
      class="btn"
      @click="h = !h"
      v-if="content.dataset.length > 4"
      style="background-color: #28c192;color: #fff;">
      <span v-show="h == false">收起</span>
      <span v-show="h == true">展示</span>
    </p>
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {
        h:false
      }
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
  width: 100%;
  overflow: hidden;
}
.hidden{
  height: 38px;
}
  li{
    width: calc(25% - 10px);
    height: 28px;
    line-height: 28px;
    text-align: center;
    float: left;
    box-sizing: border-box;
    margin: 5px;
  }
  .yuan{
    border-radius: 16px;
  }
  .btn{
    width: calc(25% - 10px);
    height: 28px;
    line-height: 28px;
    border-radius: 16px;
    text-align: center;
    float: right;
    box-sizing: border-box;
    margin: 5px;
  }
</style>