<template>
  <div>
    <group class="group">
      <cell title="请输入密码"  class="cell font">
        <input type="password" v-model="password" placeholder="请输入新密码"/>
      </cell>
      </group>
    <group class="group">
      <cell title="输入确认密码" class="cell font">
        <input type="password" v-model="surePassword" placeholder="请再次输入新密码"/>
      </cell>
    </group>
    <div class="x_btn"><x-button @click.native="submit" >确定</x-button></div>
  </div>
</template>

<script type="es6">
  import {Group,Cell,XButton,XHeader,Icon} from 'vux'
  import mixin from '../vuex/mixin.js'
	import http from '../ajax.js'
  export default {
    data(){
      return {
        pageName:"注册",
        bg:{white:false,grey:true},
        password:"",
        surePassword:""
      }
    },
    methods:{
      submit(){
      if(this.password.length==0||this.surePassword.length==0){
        this.$vux.toast.show({
             text: '请填写完整信息',
              type: "warn"
            })
          return false
        }
        if(this.password!=this.surePassword){
        this.$vux.toast.show({
          text:"密码不一致",
          type:"warn"
        })
        }else{
          this.mobile=localStorage.getItem('mobile')
          this.codekey=localStorage.getItem('codekey')
          this.apiPost('/home/checkRegMessage',
          {password:this.password,repassword:this.surePassword,type:"reg",mobile:this.mobile,codekey:this.codekey})
          .then((res)=>{
            console.log(res.code)
            if(res.code==200){
                this.$vux.toast.show({
                     text: res.msg
                })
               this.$router.push('/login')
            }else{
              this.$vux.toast.show({
                     text: res.msg,
                     type:'warn'
                })
            }
          })
        }
      }
    },
    components:{
      Group,
      Cell,
      XButton,
      XHeader,
      Icon
    },
    mixins:[mixins,http]
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .x-header{
    width:100%;position:fixed;left:0;top:0;z-index:100;
  }
  .vux-header{
    background-color:#FF4948!important;
  }
  .group{
    margin-top:-0.5rem;
  }
  .head_icon{
    position: absolute;
    left:25px;
    top:10px;
    color:#fff;
    width:18px;
    height:18px;
    display: block;
    border-left:2px solid #fff;
    border-top:2px solid #fff;
    transform: rotate(-45deg);
  }
  .weui-tab__panel{
    background:#E9E9E9!important;
  }
  .cell{
    padding-top:1rem;
    padding-bottom:1rem;
  }
  .cell input{
    position: absolute;
    top:17px;
    left:130px;
    font-size: 14px;
    border: none;
    outline: none;
  }
  .x_btn{
    width:90%;
    margin:1rem auto;
    font-size: 14px;
  }
  .x_btn button{
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .bg_color{
    background:#E9E9E9;
  }
  .font{
    font-size: 14px;
  }
  @media screen  and (max-width: 320px) {
    input::-webkit-input-placeholder{
      font-size: 14px;
    }
  }
</style>
