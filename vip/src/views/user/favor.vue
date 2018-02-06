<template>
  <div>
    <!--start 从home.vue复制-->
    <ul class="h-ul">
      <li class="h-li" v-for="n in testlist" :key="n">
        <img class="li-img-l" src="../../assets/image/Sample.png" alt="img">
        <div class="left">
          <p class="li-title">于吉柠檬鱼</p>
          <p>
            <my-rater
              :fontSize="20"
              v-model="data41"
              star='<span><i class="iconfont icon-pingjia1"></i></span>'
              active-color="red">
            </my-rater>&#32;{{data41}}分
          </p>
          <p class="li-bottom1">1499人光临</p>
        </div>
        <img class="li-img-r" src="../../assets/image/fanli.png" alt="img">
        <p class="li-bottom2">>500m</p>
      </li>
    </ul>
    <!--end-->
  </div>
</template>

<script>
    import myRater from '../../components/rater/index.vue'
    export default {
        name: 'favor',
        data(){
            return{
                testlist:3,
                data41:3.5
            }
        },
        mounted(){
            this.$store.commit('setHeaderTitle',{
                name:'我的关注'
            })
        },
        components:{
            myRater
        }
    }

</script>

<style scoped>
  .h-ul{
    background-color: #fff;
    margin: 15px 0 60px;
    position: absolute;
    width: 100%;
  }
  .h-li{
    width: 100%;
    padding: 10px;
    overflow: hidden;
    font-size: 14px;
    color: #666;
    position: relative;
    border-bottom: 1px solid #CCC;
  }
  .li-img-l{
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  .h-li .iconfont{
    font-size: 12px;
  }
  .li-img-r{
    width: 35px;
    float: right;
  }
  .li-title{
    font-size: 18px;
    color: #000;
  }
  .li-bottom1,
  .li-bottom2{
    position: absolute;
    bottom: 8px;
  }
  .li-bottom2{
    right: 10px;
  }
</style>