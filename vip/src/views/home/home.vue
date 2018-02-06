<template>
  <div class="home">
    <x-header :left-options="{showBack: false}" class="h-n">
      <a slot="left" class="address" @click="hCity">{{cityname}}
        <i class="iconfont icon-right-button"></i>
      </a>
      <a slot="right">
        <i class="iconfont icon-xiaoxi"></i>
      </a>
      <router-link tag="p" to="/home/search" class="search" slot="default">
        <i class="iconfont icon-sousuo"></i>
        <input class="h-n-input" type="text" disabled placeholder="请输入搜索关键字">
      </router-link>
    </x-header>
    <!--下拉刷新-->
    <my-scroll
      style="margin: 46px 0 50px;"
      :enableInfinite="false"
      :on-refresh="onRefresh">
      <!--banner-->
        <swiper height="110px" :show-dots="false">
          <swiper-item v-for="n in banner" :key="n.id" @click.native="hyperlink(n.hyperlink)">
            <img :src="n.pic_url" alt="banner" style="width: 100%;">
          </swiper-item>
        </swiper>
      <!--商家分类导航-->
        <swiper dots-position="center" height="220px">
          <swiper-item v-for="(m,index) in navService" :key="index">
            <ul class="h-classify">
                <li v-for="n in m" :key="n.id" @click="nearby(n.service_name)">
                  <img :src="n.service_icon" alt="n.service_name"><br>
                  <span>{{n.service_name}}</span>
                </li>
            </ul>
          </swiper-item>
        </swiper>
      <!--通告-->
        <swiper
          class="h-notice"
          loop auto
          height="30px"
          direction="vertical"
          :interval=6000
          :show-dots="false">
          <swiper-item v-for="n in wsPublicNotice" :key="n.id">
            <span class="fs18">万商<img src="../../assets/image/huilian.png"></span>
            <span class="fs14">{{n.notice_title | s}}......</span>
          </swiper-item>
        </swiper>
      <!--广告位-->
      <grid class="h-recommends">
        <grid-item class="h-recommend">
          <div class="left">
            <p class="fs18">今日特价</p>
            <p class="fs12 h-color1">进店享受半折优惠</p>
          </div>
          <img class="right" src="../../assets/image/tejia.png" alt="img">
        </grid-item>
        <grid-item class="h-recommend">
          <div class="left">
            <p class="fs18">周末专享</p>
            <p class="fs12 h-color2">周末跟团超值套餐</p>
          </div>
          <img class="right" src="../../assets/image/zhuanxiang.png" alt="img">
        </grid-item>
      </grid>
      <!--推荐标签-->
      <scroller class="box" lock-y :scrollbar-x=false>
        <div class="h-box" ref="hBox">
          <div class="h-box-item"  v-for="n in labelClass" :key="n.label_id">
            <p><i :class="'iconfont '+n.icon"></i></p>
            <p class="fs12">{{n.label_name}}</p>
          </div>
        </div>
      </scroller>
      <ul class="h-ul">
        <li class="li-first"><divider>附近商家</divider></li>
        <li class="h-li">
          <img class="li-img-l" src="../../assets/image/Sample.png" alt="img">
          <div class="left">
            <p class="li-title">于吉柠檬鱼</p>
            <p>
              <my-rater
                :disabled="true"
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
        <li class="h-li">
          <img class="li-img-l" src="../../assets/image/Sample.png" alt="img">
          <div class="left">
            <p class="li-title">于吉柠檬鱼</p>
            <p>
              <my-rater
                :disabled="true"
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
        <li class="h-li">
          <img class="li-img-l" src="../../assets/image/Sample.png" alt="img">
          <div class="left">
            <p class="li-title">于吉柠檬鱼</p>
            <p>
              <my-rater
                :disabled="true"
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
        <li class="li-last" @click="nearby('附近')">查看更多</li>
      </ul>
    </my-scroll>
  </div>
</template>

<script>
    import {
        XHeader,
        Tabbar,
        TabbarItem,
        Swiper,
        SwiperItem,
        Grid,
        GridItem,
        Scroller,
        Divider
    } from 'vux'
    import { mapState } from 'vuex'
    import jsonp from 'jsonp'
    import myRater from '../../components/rater/index.vue'
    import myScroll from '../../components/scroll/index.vue'
    export default {
        name: 'index',
        data(){
            return{
                isLoading:0,  //请求等待动画
                data41:3.5,
                banner:[], //轮播图
                navService:[], //商家分类
                wsPublicNotice:[], //通告
                labelClass:[], // 标签
                cityId:'410100',
                cityname:'郑州市'
            }
        },
        components:{
            XHeader,
            Tabbar,
            TabbarItem,
            Swiper,
            SwiperItem,
            Grid,
            GridItem,
            Scroller,
            Divider,
            myRater,
            myScroll
        },
        methods:{
            hBox(length){
                this.$refs.hBox.style.width = length * 62 + 'px'
            },
            hCity(){
                this.$router.push({path:'/home/city'})
            },
            onRefresh (done) {
                setTimeout(function () {
                    done()  // call done
                }, 2000)
            },
            onInfinite (done) {
                setTimeout(function () {
//                    this.n1 += 10;
                    done()  // call done()
                }.bind(this), 2000)
            },
            hyperlink(hyperlink){ //banner 外链
                if(hyperlink){
                    document.location.href = hyperlink
                }
            },
            setIsLoading(){
                // 每次请求 isLoading+1,请求完成-1并调用次方法
                // 值不为0时，一直显示等待动画
                if(this.isLoading == '0'){
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                }
            },
            getBanner(){  //轮播图
                this.apiGet('/Wsuser/banner')
                    .then(function (res) {
                        this.banner = res.data
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            arrSlice(array){  //分割数组  //首页导航按钮分割成 10个/组
                const arr = []
                for(let i=0;i<array.length;i+=10){
                    arr.push(array.slice(i,i+10))
                }
                return arr
            },
            getNavService(){
                this.apiGet('Wsuser/navService')
                    .then(function (res) {
                        this.navService = this.arrSlice(res.data)
                    }.bind(this),function (err) {
                        console.log(err)
                    })

            },
            getMylocation(){  //定位
                this.isLoading++
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.getPosition,this.nono);
                } else {
                    x.innerHTML="该浏览器不支持获取地理位置。";
                }
            },
            getPosition(position){ //百度地图
                var latlon = position.coords.latitude+','+position.coords.longitude;
                var url = 'https://api.map.baidu.com/geocoder/v2/?ak=4Dfl9xwPGejMePRRzASXZAoIznQY7fe2&callback=renderReverse&location='+latlon+'&output=json&pois=0'
                jsonp(url,null,function (err, data) {
                    if(err){
                        console.log(err)
                    }else {
                        this.areaId = data.result.addressComponent.adcode
                        this.cityName = data.result.addressComponent.city
                        let nowcity=[];
                        nowcity.push({name:this.cityName,city_id:this.areaId});
                        sessionStorage.setItem('nowcity',JSON.stringify(nowcity));
                        this.isLoading--
                        this.setIsLoading()
                    }
                }.bind(this))
//                '拒绝授权，默认郑州'???
            },
            getWsPublicNotice(){
                this.apiGet('/Wsuser/wsPublicNotice')
                    .then(function (res) {
                        this.wsPublicNotice = res.data
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            getLabelClass(){
                this.apiGet('Wsuser/labelClass')
                    .then(function (res) {
                        this.labelClass = res.data
                        this.hBox(res.data.length)
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            nearby(name){
                //跳转nearby
                this.$store.commit('setHeaderTitle',{
                    name:name,
                    iconClass:'icon-sousuo'
                })
                this.$router.push({path:'/home/nearby'})
            },
            nono(){
                if(!JSON.parse(sessionStorage.getItem('nowcity'))){
                    alert('拒绝授权，默认郑州')
                    let nowcity=[];
                    nowcity.push({name:'郑州市',city_id:'410100'});
                    sessionStorage.setItem('nowcity',JSON.stringify(nowcity));
                }
            }
        },
        filters:{
            s:function (value) {   // 截取公告title前12个字
                if (!value) return ''
                return value.toString().slice(0,12)
            }
        },
        computed:{
            ...mapState({
                city:state => state.vux.city
            })
        },
        mounted(){
            this.$store.commit('setPageHeader',false)
            this.getBanner()
            this.getNavService()
            this.getMylocation()
            this.getWsPublicNotice()
            this.getLabelClass()
        },
    }

</script>

<style>
  /*
    template 内可以使用多个 <style> 标签，虽然有点不规范，但是很好用
    可以修改 vux 的各种样式问题
  */
  .vux-header-title-area, .h-n .vux-header-title{
    margin: 0 55px 0 88px;
  }
  .vux-slider{
    margin-top: -1px;
  }
</style>
<style scoped>
  .vux-slider{
    background-color: #fff;
  }
  .address{
    font-size: 16px;
  }
  .icon-right-button{
    font-size: 10px;
    position: relative;
    left: -5px;
  }
  .icon-saoma1{
    font-size: 20px;
    margin-right: 2px;
  }
  .icon-xiaoxi{
    font-size: 20px;
  }
  .search{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .icon-sousuo{
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 10;
    color: #666;
  }
  .h-n-input{
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    padding-top: 3px;
  }
  .h-classify{
    width: 100%;
    overflow: hidden;
    text-align: center;
    margin-top: 10px;
  }
  .h-classify li{
    width: 20%;
    float: left;
    padding-bottom: 15px;
  }
  .h-classify li img{
    width: 45px;
    height: 45px;
  }
  .h-classify li span{
    font-size: 14px;
  }
  .h-notice{
    padding-left: 20px;
    margin: 10px 0;
  }
  .h-notice img{
    height: 16px;
    position: relative;
    top: 2px;
    margin-left: 2px;
    margin-right: 5px;
  }
  .h-notice .fs14{
    height: 30px;
    line-height: 35px;
  }
  .h-recommends{
    background-color: #fff;
    margin-bottom: 10px;
  }
  .h-recommends:before,
  .h-recommends:after,
  .h-recommend:before,
  .h-recommend:after{
    border: none;
  }
  .h-recommend .left{
    width: 65%;
  }
  .h-recommend .fs18{
    color: #000;
  }
  .h-recommend .right{
    width: 35%;
  }
  .h-color1{
    color: #fcb149;
  }
  .h-color2{
    color: #9cd251;
  }
  .box{
    background-color: #fff;
  }
  .h-box {
    position: relative;
    overflow: hidden;
    padding-top: 10px;
  }
  .h-box-item {
    width: 62px;
    display:inline-block;
    float: left;
    text-align: center;
  }
  .h-box-item .iconfont{
    color: #fe4a48;
  }
  .h-ul{
    background-color: #fff;
    padding-top: 10px;
    margin-top: -1px;
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
  .li-first {
    width: 50%;
    margin-left: 25%;
    text-align: center;
  }
  .li-last{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
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
    bottom: 5px;
  }
  .li-bottom2{
    right: 10px;
  }

</style>