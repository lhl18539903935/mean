<template>
  <div id="c22" :style="`margin:${content.modulePadding}px 0;`">
    <ul>
      <li
        @click="herfs(n.link)"
        v-for="(n,i) in content.dataset" :key="i">
        <template v-if="content.layout1_style == 1">
          <img :src="n.pic | imgs">
          <p :style="`color: ${n.titleColor};backgroundColor:${n.titleBackgroundColor};`">{{n.showtitle | str(4)}}</p>
        </template>
        <template v-else>
          <p
            :class="content.fontSize"
            :style="`color: ${n.titleColor};backgroundColor:${n.titleBackgroundColor};`">{{n.showtitle | str(4)}}</p>
        </template>

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
img{
  width: 83px;
  height: 83px;
}
p{
  width: 83px;
  margin: 0 auto;
  line-height: 20px;
}
ul{
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  overflow: auto;
}
  li{
    flex: auto ;
    width: 25%;
    float: left;
    padding: 2px;
    text-align: center;
  }
  .font12{font-size: 12px}
  .font14{font-size: 14px}
  .font16{font-size: 16px}
</style>