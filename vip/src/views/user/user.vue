<template>
  <div>
    <div class="user_img">
      <img @click=" showMenus = true" src="../../assets/image/Sample.png" alt="img">
      <p>
        <input
          ref="name"
          type="text"
          v-model="userName"
          disabled=true>
        <i
          @click="userDisabled"
          v-if="isNameIcon"
          class="iconfont icon-gerenzhongxintianxie"></i>
        <span
          v-else
          @click="confirm"
          class="confirm_name">确认</span>
      </p>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
    <group>
      <cell title="我的钱包" :is-link="true" value="提现" :link="{path:''}"></cell>
    </group>
    <ul class="balance">
      <li class="vux-1px-r">
        <p class="money">0.00</p>
        <p class="text">账户余额</p>
      </li>
      <li class="vux-1px-r">
        <p class="money">100</p>
        <p class="text">可用积分</p>
      </li>
      <li class="vux-1px-r">
        <p class="money">100</p>
        <p class="text">待用积分</p>
      </li>
      <li>
        <p class="money">0.00</p>
        <p class="text">抵扣币</p>
      </li>
    </ul>
    <group>
      <cell title="管理中心"></cell>
    </group>
    <ul class="manage vux-1px-b">
      <li class="vux-1px-r">
        <i class="iconfont icon-dingdan3"></i><br>
        <span class="text_color">我的订单</span>
      </li>
      <li class="vux-1px-r">
        <i class="iconfont icon-youhuiquan"></i><br>
        <span class="text_color">我的优惠券</span>
      </li>
      <li class="vux-1px-r">
        <i class="iconfont icon-youhuiquan"></i><br>
        <span class="text_color">账户充值</span>
      </li>
      <li @click="evaluate(0)">
        <i class="iconfont icon-wodepingjia"></i><br>
        <span class="text_color">我的评价</span>
      </li>
    </ul>
    <ul class="manage vux-1px-b">
      <li @click="evaluate(1)" class="vux-1px-r">
        <i class="iconfont icon-daipingjia1"></i><br>
        <span class="text_color">待评价</span>
      </li>
      <router-link tag="li" to="/user/favor" class="vux-1px-r">
        <i class="iconfont icon-guanzhu"></i><br>
        <span class="text_color">我的关注</span>
      </router-link>
      <li class="vux-1px-r">
        <i class="iconfont icon-xiugai"></i><br>
        <span class="text_color">修改资料</span>
      </li>
      <li>
        <i class="iconfont icon-dizhi1"></i><br>
        <span class="text_color">地址管理</span>
      </li>
    </ul>
    <ul class="manage vux-1px-b">
      <li class="vux-1px-r">
        <i class="iconfont icon-hudong"></i><br>
        <span class="text_color">会员互动</span>
      </li>
      <li class="vux-1px-r">
        <i class="iconfont icon-huiyuandengji"></i><br>
        <span class="text_color">会员等级特权</span>
      </li>
      <li class="vux-1px-r">
        <i class="iconfont icon-tuiguangjiangli"></i><br>
        <span class="text_color">推广奖励</span>
      </li>
      <li>
        <i class="iconfont icon-shezhi"></i><br>
        <span class="text_color">设置</span>
      </li>
    </ul>
  </div>
</template>

<script>
    import {
        Actionsheet,
        TransferDom,
        Cell,
        Grid,
        GridItem,
        Group
    } from 'vux'
    export default {
        name: 'user',
        directives: {
            TransferDom
        },
        components:{
            Group,
            Actionsheet,
            Cell,
            Grid,
            GridItem
        },
        data(){
            return{
                userName:'我的名字',
                userName2:'',
                isNameIcon:true,
                menus: {
                    menu1: '拍照',
                    menu2: '从相册选择'
                },
                showMenus: false
            }
        },
        methods:{
            userDisabled(){
                this.userName2 = this.userName;
                this.userName= '';
                this.isNameIcon = false;
                this.$refs.name.disabled = false;
                this.$refs.name.focus();
                this.$refs.name.style.borderBottom = '1px solid #fff';
                this.$refs.name.style.textAlign = 'left';
                this.$refs.name.style.paddingLeft = '10px';
            },
            confirm(){
                if(!this.userName){
                    this.userName = this.userName2;
                }
                this.$refs.name.style.borderBottom = 'none';
                this.$refs.name.style.textAlign = 'center';
                this.$refs.name.style.paddingLeft = '0';
                this.$refs.name.disabled = true;
                this.isNameIcon = true;
            },
            evaluate(v){
                this.$store.commit('setEvaluate',v)
                this.$router.push({path:'/user/evaluate'})
            }
        },
        mounted(){
            this.$store.commit('setHeaderTitle',{
                name:'我的'
            })
        }
    }

</script>

<style scoped>
  .user_img{
    width: 100%;
    height: 120px;
    background-color: #fe4a48;
    text-align: center;
    margin-top: -1px;
  }
  .user_img img{
    width: 65px;
    height: 60px;
    border-radius: 50%;
    margin-top: 15px;
  }
  .user_img p{
    position: relative;
    width: 36%;
    left: 32%;
  }
  .user_img p input{
    width: 100%;
    border-top: none;
    border-right: none;
    border-left: none;
    background-color: #fe4a48;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
  }
  .user_img p i{
    color: #FFFFFF;
    position: absolute;
    right: 0;
    top: 1px;
    z-index: 10;
  }
  .user_img p .confirm_name{
    position: absolute;
    right: -35px;
    top: 0;
    color: #fff;
  }
  .balance{
    width: 100%;
    /*height: 95px;*/
    overflow: hidden;
    background-color: #fff;
  }
  .balance li{
    float: left;
    width: 25%;
    /*height: 100%;*/
    text-align: center;
    padding: 20px 0;
  }
  .balance li .money{
    color: #fe4a48;
  }
  .manage{
    width: 100%;
    overflow: hidden;
    background-color: #fff;
  }
  .manage li .iconfont{
    color: #fe4a48;
    font-size: 24px;
  }
  .manage li{
    float: left;
    width: 25%;
    text-align: center;
    padding: 8px 0;
    font-size: 14px;
  }


</style>