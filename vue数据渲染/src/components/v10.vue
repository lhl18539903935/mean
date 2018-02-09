<template>
  <div id="c10" style="padding: 15px 0">
<!--<p>10-10</p>-->
    <p></p>
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
    position: relative;
    border:none;
  }
  p:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px dashed #ddd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
</style>