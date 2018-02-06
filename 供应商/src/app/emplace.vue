<template>
  <div>
    <group class="group">
      <cell title="设置新密码"  class="cell font">
        <input type="text" v-model="newPwd" placeholder="请输入密码"/>
      </cell>
      </group>
    <group class="group">
      <cell title="再次确认密码" class="cell font">
        <input type="text" v-model="oldPwd" placeholder="请再次输入密码"/>
      </cell>
    </group>
    <div class="x_btn"><x-button @click.native="submit">确定</x-button></div>
  </div>
</template>

<script type="es6">
  import {Group,Cell,XButton,XHeader,Icon} from 'vux'
  import mixins from "../vuex/mixin.js"
   import http from "../ajax.js"
  export default {
    data(){
      return{
        pageName:'设置新密码',
        bg:{white:false,grey:true},
        newPwd:"",
        oldPwd:""
      }
  },
  methods:{
    submit(){
    if(this.newPwd!=this.oldPwd){
       this.$vux.toast.show({
           text: '密码不一致',
           type: "warn"
       })
       return
    }
    if(this.newPwd.length==0||this.oldPwd.length==0){
      this.$vux.toast.show({
           text: '用户密码不能为空',
           type: "warn"
       })
    }else{
      let codekey=localStorage.getItem("codekey");
      this.apiPost('http://r.huileyi.com/home/findPassword',{newpassword:this.newPwd,newrepassword:this.oldPwd,codekey:codekey}).then((res)=>{
        console.log(res)
        if(res.code==200){
          localStorage.setItem('token',res.token)
          this.$vux.toast.show({
              text:"修改成功",
              type:"success"
            })
            console.log(res.token)
        this.$router.push('/login')
        }else{
          this.$vux.toast.show({
              text:res.msg,
              type:"warn"
             })
        }
      })

    }
    }
  },
    components:{
      Group,
      Cell,
      XButton,XHeader,Icon
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
  .group{
    margin-top:-0.5rem;
  }
  .cell{
    font-family:"microsoft yahei";
    padding:14px;
  }
  .cell input{
    position: absolute;
    top:16px;
    left:130px;
    border: none;
    outline: none;
    font-size: 14px;
  }
  .x_btn{
    width:90%;
    margin:1rem auto;
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
</style>
