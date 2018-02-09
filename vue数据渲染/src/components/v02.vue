<template>
  <div id="c02">
    <ul :style="`margin:${content.modluePadding}px 0 `">
      <li
        @click="herfs(n.link)"
        v-for="(n,i) in content.dataset" :key="i">
        <img :src="n.pic | imgs" :style="`width: calc(100vw / ${content.dataset.length} - 9px);`"><br>
        <span>{{n.showtitle | str(4,'...')}}</span>
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
  width: 100%;
}
  ul{
    font-size: 12px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
  }
  li{
    padding: 3px;
    text-align: center;
  }
</style>