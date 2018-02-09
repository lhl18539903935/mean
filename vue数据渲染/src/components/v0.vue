<template>
  <div id="c0" class="header" :style="'margin:'+content.modulePadding+'px 0 '">
    <div class="search f12" ref="seatch">
      <p class="img" @click="herfs('/Order/lists/')">
        <i class="iconfont icon-dingdan"></i><br>
        <span style="font-size: 10px;">订单</span>
      </p>
      <p class="inpt">
        <input type="text" placeholder="搜索商品名称" @change="postInput" v-model.lazy="inputs">
        <i class="iconfont icon-fangdajing"></i>
      </p>
      <p class="img" @click="herfs('/User/index')">
        <i class="iconfont icon-qiandao"></i><br>
        <span style="font-size: 12px">签到</span>
      </p>
    </div>
      <div id="search_swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            @click="herfs(n.link)"
            v-for="(n,i) in content.dataset" :key="i">
            <img :src="n.pic | imgs" :title="n.showtitle">
          </div>
        </div>
        <div :class=" content.dataset.length > 1 ?'swiper-pagination':''"></div>
      </div>

      <!--<p>{{content}}</p>-->
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default { // 默认头部
    props:['content'],
    data() {
      return {
        inputs:''
      }
    },
    methods: {
      myScroll(){
        let scroll;
        // 被卷去的高度
        scroll = document.body.scrollTop ||  document.documentElement.scrollTop
        scroll = scroll/200
        this.$refs.seatch.style.backgroundColor = `rgba(255,17,50,${scroll})`
      },
      postInput(){
//        location.href = 'http://j.diankuai.com/Item/lists/sid?title='+this.inputs
        location.href = '/Item/lists/sid?title='+this.inputs
      }
    },
    created() {

    },
    mounted() {
      setTimeout(()=>{
          let swiper = new Swiper('#search_swiper',{
            autoplay:true,
            delay:3000,
            pagination: {
              el: '#search_swiper .swiper-pagination'
            }
          })
      },20)
      //监听滑动条
      window.addEventListener('scroll',this.myScroll,false)
    }
  }

</script>

<style scoped>
.iconfont{
  position: relative;
  top: -3px;
  font-size: 14px;
}
.search{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 10px 0;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  background: url("./image/download_01.png") repeat-x;
}
.search .img{
  margin:5px 10px;
  text-align: center;
}
.search input{
  width: calc(100vw - 200px);
  height: 30px;
  margin-top: 3px;
  padding-left: 35px;
  border: none;
  outline:none;
  border-radius: 5px;
}
.inpt{
  position: relative;

}
.icon-fangdajing{
  position: absolute;
  left: 8px;
  top: 11px;
  font-size: 18px;
  color: #666;
  z-index: 10;
}



#search_swiper{
  position: relative;
  width: 100%;
  overflow: hidden;
}
#search_swiper img{
  width: 100%;
  /*height: 240px;*/
}
</style>