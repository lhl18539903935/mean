<template>
  <div id="c12" :style="`margin:${content.modulePadding}px 0;`">
    <ul>
      <li
        :class="{marginstyle:content.marginstyle == 1}"
        @click="herfs(n.link)"
        v-for="(n,i) in content.dataset" :key="i"
        :style="`background-color: ${n.bgColor};color: ${n.fotColor};`">
          <img v-if="content.style == 1" :src="n.pic | imgs">
          <p>{{n.showtitle | str(6)}}</p>
      </li>
    </ul>
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
ul{
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
  li{
    flex: 1;
    text-align: center;
    padding: 10px 0;
  }
img{
  width: 24px;
  height: 24px;
}
  .marginstyle{
    margin: 0 1px;
  }
</style>