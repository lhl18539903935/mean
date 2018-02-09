<template>
  <div id="c2">
    <div :style="`margin: ${content.modulePadding}px 0`">
      <div :class="`a${content.style}`">
        <p :style="`textAlign:${content.direction};color:${content.titleColor};`">
          <span>{{content.title}}</span>
        </p>
      </div>
    </div>
<!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {

      }
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped>
.a0{
  width: 100%;
  padding: 8px 10px;
  background-color: #28c192;
  box-sizing: border-box;
}
  .a1{
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
}
  .a1 span{
    border-bottom: 1px solid red;
  }
  .a2 p{
    margin-top: 15px;
    height: 25px;
    border-top: 1px solid red;
    line-height: 1px;
  }
  .a2 span{
    background-color: #f8f8f8;
    padding: 0 8px;
  }
  .a3{
    width: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
  }
  .a3 p{
    padding-left: 10px;
    border-left: 4px solid red;
  }
</style>