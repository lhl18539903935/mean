<template>
  <div>
    <!--start 从home.vue复制-->
    <scroller class="box" lock-y :scrollbar-x=false>
          <div class="h-box" ref="hBox">
            <div class="h-box-item" v-for="n in labelClass" :key="n.label_id">
              <p><i :class="'iconfont '+n.icon"></i></p>
              <p class="fs12">{{n.label_name}}</p>
            </div>
          </div>
        </scroller>
    <!--end-->
    <div class="n-screen">
        <div class="n-s-title">
          <p
            @click="chooseType('classify')"
            class="left"
            :class="{selected:txt == 'classify'}">商家分类
            <i class="iconfont icon-xiala fs12"></i>
          </p>
          <p
            @click="chooseType('area')"
            class="left"
            :class="{selected:txt == 'area'}">区域选择
            <i class="iconfont icon-xiala fs12"></i>
          </p>
        </div>
        <!--classify-->
        <transition name="showlist">
          <div class="n-classify" v-show="txt == 'classify'">
            <ul>
              <li v-for="n in navService" :key="n.industry_id" class="vux-1px-b">
                <!--<i class="default-color iconfont icon-fenlei"></i>-->
                <span>&#x3000;{{n.service_name}}</span>
              </li>
            </ul>
          </div>
        </transition>
        <!--area-->
        <transition name="showlist">
          <div class="n-classify" v-show="txt == 'area'">
            <ul>
              <li
                v-for="n in areaData" :key="n.city_id"
                class="vux-1px-b"
                @click="postTradeDate(n.area_id)"
                :class="{selected:n.city_id == style_id}">{{n.area_name}}
              </li>
            </ul>
            <ul>
              <li
                @click="getStoreListByTrade({trade_id:n.trade_id})"
                v-for="n in tradeData" :key="n.trade_id"
                class="vux-1px-b">{{n.trade_name}}({{n.count}})</li>
            </ul>
          </div>
        </transition>
      </div>
    <!--start 从home.vue复制-->
    <ul class="h-ul">
        <li class="h-li" v-for="n in storeListByTrade" :key="n.store_id">
          <img class="li-img-l" :src="n.store_logo" alt="img">
          <div class="left">
            <p class="li-title">{{n.store_name}}</p>
            <p>
              <my-rater
                :disabled="true"
                :fontSize="20"
                v-model="n.store_score"
                star='<span><i class="iconfont icon-pingjia1"></i></span>'
                active-color="red">
              </my-rater>&#32;{{n.store_score}}分
            </p>
            <p class="li-bottom1">{{n.presence_num}}人光临</p>
          </div>
          <img class="li-img-r" src="../../assets/image/fanli.png" alt="img">
          <p class="li-bottom2">>500m</p>
        </li>
      </ul>
    <!--end-->
    <h2 v-if="noContent" class="noContent">暂无入驻商店</h2>
    <transition name="showcover">
        <div class="back_cover" v-show="txt" @click="chooseType('hidden')"></div>
      </transition>
  </div>
</template>

<script>
  import {
      Scroller,
      Divider
  } from 'vux'
  import myRater from '../../components/rater/index.vue'
  import myScroll from '../../components/scroll/index.vue'
    export default {
        name: 'nearby',
        data(){
          return{
              noContent:false, //无内容时显示
              txt:'',
              data41:3.5,
              testlist:5,
              style_id:'', // 匹配类名
              nowcity:[], //当前城市
              navService:[], //商家分类
              areaData:[], //城市分区
              tradeData:[], //商圈数据
              labelClass:[], //头部标签分类
              storeListByTrade:[], //商店列表
          }
        },
        components:{
            Scroller,
            Divider,
            myRater,
            myScroll
        },
        methods:{
            hBox(length){
                this.$refs.hBox.style.width = length * 62 + 'px'
            },
            chooseType(type){
                if (this.txt !== type) {
                    this.txt = type;
                    this.$store.commit('setPageFooter',false)
                }else{
                    //再次点击相同选项时收回列表
                    this.txt = '';
                    this.$store.commit('setPageFooter',true)
                }
                if(type == 'hidden'){
                    this.txt = '';
                    this.$store.commit('setPageFooter',true)
                }
            },
            getNavService(){
                this.apiGet('Wsuser/navService')
                    .then(function (res) {
                        this.navService = res.data
                    }.bind(this),function (err) {
                        console.log(err)
                    })

            },
            postAreaData(){ //城市分区
                this.apiPost('Wstrade/areaData',{
                    city_id:110100
                })
                    .then(function (res) {
                        this.areaData = res.data
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            postTradeDate(area_id){ //商圈数据
                this.style_id = area_id
                this.apiPost('Wstrade/tradeData',{
                    area_id:area_id
                })
                    .then(function (res) {
                        this.tradeData = res.data
                    }.bind(this),function (err) {

                        console.log(err)
                    })
            },
            getLabelClass(){ //头部分类
                this.apiGet('Wsuser/labelClass')
                    .then(function (res) {
                        this.labelClass = res.data
                        this.hBox(res.data.length)
                    }.bind(this),function (err) {
                        console.log(err)
                    })
            },
            getStoreListByTrade(id){ //商店列表
                this.apiPost('/Wstrade/storeListByTrade',id)
                    .then(function (res) {
                        this.storeListByTrade = res.data
                        if(res.data.length == '0'){
                            this.noContent = true
                        }else {
                            this.noContent = false
                        }
                    }.bind(this),function (err) {
                        console.log(err)
                    })
                if(this.txt){
                    this.chooseType('hidden')
                }
            }
        },
        created(){
            this.nowcity = JSON.parse(sessionStorage.getItem('nowcity'));
        },
        mounted(){
            this.hBox()
            this.getNavService()
            this.postAreaData()
            this.getLabelClass()
            this.getStoreListByTrade({city_id:110100})
        }
    }

</script>

<style scoped>
  .box{
    background-color: #fe4a48;
    color: #fff;
    position: relative;
    z-index: 20;
    margin-top: -1px;
  }
  .h-box {
    position: relative;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .h-box-item {
    width: 62px;
    display:inline-block;
    float: left;
    text-align: center;
  }
  .n-screen{
    position: relative;
  }
  .selected{
    color: #fe4a48;
  }
  .n-s-title{
    position: absolute;
    top: 0;
    z-index: 13;
    width: 100%;
    overflow: hidden;
    text-align: center;
  }
  .n-s-title .left{
    height: 40px;
    width: 50%;
    line-height: 40px;
    background-color: #fff;
  }
  .n-classify{
    position: absolute;
    top: 40px;
    z-index: 11;
    background-color: #d6d6d6;
    width: 100%;
  }
  .n-classify ul{
    height: 360px;
    overflow-y: auto;
    width: 50%;
    float: left;
    background-color: #fff;
  }
  .n-classify li{
    height: 40px;
    line-height: 40px;
    padding-left: 15%;
    font-size: 14px;
  }

  .showlist-enter-active, .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter, .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }
  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }
  .back_cover{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.2);
  }

  .h-ul{
    background-color: #fff;
    margin: 50px 0 60px;
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
  .li-last{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
    font-size: 14px;
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


  .noContent{
    width: 200px;
    height: 40px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>