<template>
  <div id="c1">
    <div v-html="vHtml" :style="`margin: ${content.modulePadding}px 0`"></div>
    <!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {
        vHtml:'',
      }
    },
    methods: {},
    created() {

    },
    mounted() {
      this.vHtml = this.content.fulltext.replace(this.content.fulltext ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, "\"")
    }
  }

</script>

<style scoped>

</style>