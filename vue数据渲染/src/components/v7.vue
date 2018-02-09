<template>
  <div id="c7">
<!--<p>{{content}}</p>-->
    <p
      @click="herfs(n.link)"
      v-for="(n,i) in content.dataset" :key="i">
      <span>{{n.showtitle}}</span>
      <i class="right iconfont icon-jiantou-copy-copy" v-if="n.showtitle"></i>
    </p>
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
p{
  width: 95%;
  margin: 0 auto;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #f9f9f9;
}
  .icon-jiantou-copy-copy{
    position: relative;
    top: 2px;
    color: #aaa;
  }
</style>