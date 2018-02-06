<template>
    <div>
        <div class="user">
          <img src="../../assets/ago/login.png" alt="" />
          <input type="text" placeholder="8844080" />
          <x-icon style="position: absolute;top:5px;right:15px;color:#6594FE" type="ios-close" size="30"></x-icon>
        </div>
        <div class="psd">
          <img src="../../assets/ago/login(0).png" alt=""/>
          <input type="password" placeholder="请输入密码"/>
        </div>
      <div>
        <x-button style="color:#fff;width:90%;background: #6594FE;border-radius: 99px;" :link="{path:'/agreenment'}">登录</x-button>
      </div>
      <p class="P_style" style="width:90%;margin:1rem auto;">
        <router-link to="findPwd"><span >忘记密码?</span></router-link>
        <router-link to="register"> <a href="">注册</a></router-link>
      </p>
    </div>
</template>

<script type="es6">
    import {XButton} from "vux"
    export default {
      data(){
        return{
          pageName:"登录"
        }
      },
      components:{
        XButton
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user{
    width:90%;
    line-height:40px;
    vertical-align: middle;
    border-radius: 44px;
    margin: 2rem auto;
    border:1px solid #ddd;
    position:relative;
  }
  input{
    height:30px;
    width:70%;
    border:0;
    outline:none;
    margin-left:2rem;
    font-size: 1rem;
  }
  .psd{
    width:90%;
    line-height:40px;
    border-radius: 44px;
    border:1px solid #ddd;
    margin: 2rem auto;
  }
  .user img{
    width:8%;
    vertical-align: middle;
    margin-left:1rem;
  }
  .psd img{
    width:8%;
    vertical-align: middle;
    margin-left:1rem;
  }
  .P_style a:first-child{
    margin-left:1rem;
    color:#9E9E9E;
    float:left;
  }
  .P_style a:last-child{
    float:right;
    margin-right:1rem;
    color:#6594FE;
  }
  .vux-x-icon {
    fill: #6594FE;
  }
  .cell-x-icon {
    display: block;
    fill: green;
  }
</style>
