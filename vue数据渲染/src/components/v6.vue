<template>
  <div id="c6" :style="`margin: ${content.modulePadding}px 0;position: relative;`">
<!--<p>{{content}}</p>-->
    <input type="text" placeholder="商品搜索：请输入商品关键字" @change="postInput" v-model.lazy="inputs">
    <i class="iconfont icon-fangdajing"></i>
  </div>
</template>

<script>
  export default {
    props:['content'],
    data() {
      return {
        inputs:''
      }
    },
    methods: {
      postInput(){
//        location.href = 'http://j.diankuai.com/Item/lists/sid?title='+this.inputs
        location.href = '/Item/lists/sid?title='+this.inputs
      }
    },
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped>
input{
  display: block;
  width:85%;
  margin:10px auto;
  outline:none;
  -webkit-appearance: none;
  padding:8px 10px;
  border:1px solid #DBDADA;
  border-radius: 5px ;
}
.icon-fangdajing{
  position: absolute;
  right: 7.5%;
  top: 10px;
  font-size: 18px;
  color: #666;
  z-index: 10;
}
</style>