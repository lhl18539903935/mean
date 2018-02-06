<template>
  <div>
    <search :results="results" class="searchHeight" position="absolute" auto-scroll-to-top top="46px" ref="search"></search>
    <group class="history">
      <cell class="font" title="查询销售"  value="123"></cell></cell>
      <cell class="font" title="杨梦龙" value-align="right" value="213465">
      </cell>
    </group>
  </div>
</template>

<script type="es6">
  import { Search, Group, Cell, XButton } from 'vux'
  export default {
    data(){
      return {
        results:[]
      }
    },
    components: {
      Search,
      Group,
      Cell,
      XButton
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vux-x-icon {
    fill: #C6C6C6;
  }
  .font{
    font-size: 14px;
  }
  .searchHeight{
    height:2.5rem;
  }
  .history{
    position: fixed;
    top:85px;
    width: 100%;
    margin-top:-1.2em;
  }

</style>
