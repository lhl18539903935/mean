<template>
  <div>
    <x-header :left-options="{showBack: false}">
      <span @click="$router.go(-1)" slot="left"><i class="iconfont icon-zuojiantou"></i></span>
      <p class="search" slot="default">
        <i class="iconfont icon-sousuo" v-if="issearch"></i>
        <input class="h-n-input" type="text" v-model="searchVaule" @blur="search($event)" @focus="search($event)">
      </p>
      <span slot="right" class="fs16">搜索</span>
    </x-header>
    <div class="s-every">
      <p class="fs14">大家都在搜</p>
      <p class="left">悦来悦喜</p>
      <p class="left">杨国福麻辣烫</p>
      <p class="left">正道思达</p>
      <p class="left">德克士dicos</p>
      <p class="left">杨国福麻辣烫</p>
      <p class="left">正道思达</p>
      <p class="left">德克士dicos</p>
    </div>
    <div class="s-history">
      <p class="fs14">搜索历史</p>
      <p class="list"><i class="iconfont icon-sousuo"></i>悦来悦喜</p>
      <p class="list"><i class="iconfont icon-sousuo"></i>杨国福麻辣烫</p>
      <p class="list"><i class="iconfont icon-sousuo"></i>正道思达</p>
      <p class="list"><i class="iconfont icon-sousuo"></i>王婆大虾</p>
      <p class="list s-clear">清除历史记录</p>
    </div>
  </div>
</template>

<script>
  import {
      XHeader
  } from 'vux'
    export default {
        name: 'search',
        components:{
            XHeader,
        },
        data(){
            return{
                searchVaule:'请输入搜索关键字',
                issearch:true,
            }
        },
        methods:{
            search(g){
                this.issearch = !this.issearch;
                if(this.issearch){
                    if(this.searchVaule){
                        this.issearch = false;
                    }else {
                        g.target.style.textAlign = 'center';
                        this.issearch = true;
                        this.searchVaule = '请输入搜索关键字';
                    }
                }else {
                    console.log('焦点')
                    if(this.searchVaule == '请输入搜索关键字'){
                        g.target.style.textAlign = 'left';
                        this.issearch = false;
                        this.searchVaule = '';
                    }
                }

            },
        },
        mounted(){
            this.$store.commit('setPageHeader',false)
        }
    }

</script>

<style scoped>
  .search{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .search .icon-sousuo{
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 10;
    color: #fff;
  }
  .h-n-input{
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: #ff7474;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    color: #fff;
  }
  .s-every{
    overflow: hidden;
    padding: 15px;
  }
  .s-every .fs14{
    height: 30px;
    color: #666;
  }
  .s-every .left{
    padding: 5px 5px 2px;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .s-history .fs14{
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .s-history .list{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
  .s-history .icon-sousuo{
    color: #999;
    margin-right: 10px;
  }
  .s-clear{
    color: #888;
    text-align: center;
  }
</style>