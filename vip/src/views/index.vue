<template>
  <div>
    <x-header v-show="pageHeader" :left-options="{backText: ''}">
      {{headInformation.name}}
      <span slot="right">
        <i :class="'iconfont '+headInformation.iconClass"></i>
      </span>
    </x-header>
      <router-view></router-view>
    <div class="mt"></div>
    <tabbar v-if="pageFooter" class="appFooter">
      <tabbar-item :selected="!isHome" :link="{path:'/home'}">
        <i v-if="isHome" slot="icon" class="iconfont icon-shangchengshouye"></i>
        <i v-else slot="icon" class="iconfont icon-shangchengshouye-hov"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="!isShop" :link="{path:'/shop'}">
        <i v-if="isShop" slot="icon" class="iconfont icon-xianshangshangcheng"></i>
        <i v-else slot="icon" class="iconfont icon-xianshangshangcheng-h"></i>
        <span slot="label">线上商城</span>
      </tabbar-item>
      <tabbar-item :selected="!isOrder" :link="{path:'/order'}">
        <i v-if="isOrder" slot="icon" class="iconfont icon-huiyuandingdan"></i>
        <i v-else slot="icon" class="iconfont icon-huiyuandingdan-hover"></i>
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item :selected="!isCart" :link="{path:'/cart'}">
        <i v-if="isCart" slot="icon" class="iconfont icon-huiyuangouwuche"></i>
        <i v-else slot="icon" class="iconfont icon-huiyuangouwuche-hove"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :selected="!isUser" :link="{path:'/user'}">
        <i v-if="isUser" slot="icon" class="iconfont icon-huiyuanwode"></i>
        <i v-else slot="icon" class="iconfont icon-huiyuanwode-hover"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
    import {
        Tabbar,
        TabbarItem,
        XHeader
    } from 'vux'

    export default {
        name: 'index',
        data(){
            return{
              headTitle:''
            }
        },
        components:{
            Tabbar,
            TabbarItem,
            XHeader
        },
        computed:{
            ...mapState({
                isHome:state => state.vux.isHome,
                isShop:state => state.vux.isShop,
                isOrder:state => state.vux.isOrder,
                isCart:state => state.vux.isCart,
                isUser:state => state.vux.isUser,
                pageFooter:state => state.vux.pageFooter,
                pageHeader:state => state.vux.pageHeader,
                headInformation:state => state.vux.headInformation
            })
        },
        created(){

        },
        methods:{

        },
        mounted(){
          if(this.headInformation.name == ''){
              // 刷新页面，恢复数据
              this.$store.commit('setHeaderTitle',{
                  name:sessionStorage.getItem('headTitle')
              })
          }
        }

    }

</script>

<style scoped>
  .vux-header{
    z-index: 100;
  }
.icon-shangchengshouye-hov,
.icon-xianshangshangcheng-h,
.icon-huiyuandingdan-hover,
.icon-huiyuangouwuche-hove,
.icon-gerenzhongxin-hover{
  color: #fe4a48;
}
  .iconfont{
    font-size: 20px;
  }
  .mt{
    height: 80px;
  }
  .appFooter{
    position: fixed;
    background-color: #fff;
  }
</style>