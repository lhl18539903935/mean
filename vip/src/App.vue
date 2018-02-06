<template>
  <div id="app">
    <router-view></router-view>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
  </div>
</template>

<script>

    import {
        Loading,
        TransferDom
    } from 'vux'
    import { mapState } from 'vuex'
export default {
  name: 'app',
    directives: {
        TransferDom
    },
    components: {
        Loading
    },
    data(){
      return{

      }
    },
    computed: {
        ...mapState({
            isLoading: state => state.vux.isLoading
        })
    },
    mounted(){

    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
body {
  background-color: #eee;
  color: #333;
}
.default-color{
  color: #fe4a48;
}
.fs14{
  font-size: 14px;
}
  .fs16{
    font-size: 16px;
  }
  .fs18{
    font-size: 18px;
  }
  .fs12{
    font-size: 12px;
  }
.left{
  float: left;
}
  .right{
    float: right;
  }
  .color000{
    color: #000;
  }
</style>
