<template>
  <div>
    <group class="group"  label-width="6em">
      <x-input v-model="oldpassword"  type="password" style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="原密码" placeholder="请输入原密码"></x-input>
      <x-input v-model="newpassword"  type="password" style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="新密码" placeholder="请输入新密码"></x-input>
      <x-input v-model="newrepassword"  type="password" style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="确认新密码" placeholder="请再次输入新密码"></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;">
      <x-button  style="background-color: #FF4948;font-size: 16px;color:#fff" @click.native="submit">确定</x-button>
    </div>
  </div>
</template>

<script type="es6">

import { XInput, Group, XButton, Cell } from 'vux'
  import mixin from '../../vuex/mixin.js'
	import http from '../../ajax.js'
export default {
  data(){
    return{
      pageHeader:true,
      pageName:"修改密码",
      oldpassword:"",
      newpassword:"",
      newrepassword:"",
      bg:{white:false,grey:true},
    }
  },
  methods:{
    submit(){
    let oldpassword=this.oldpassword
    let newpassword=this.newpassword
    let newrepassword=this.newrepassword
    if(this.oldpassword.length==0||this.newpassword.length==0||this.newrepassword.length==0){
      this.$vux.toast.show({
            text:"请填写完整信息",
            type:"warn"
        })
        return
      }
      if(this.oldpassword.length<6||this.newpassword.length<6||this.newrepassword<6){
        this.$vux.toast.show({
          text:"密码长度必须大于6位",
          type:"warn"
        })
        return false;
      }
      if(this.newpassword!=this.newrepassword){
        this.$vux.toast.show({
            text:"新密码不一致",
            type:"warn"
        })
      }else{
      this.apiPost('http://r.huileyi.com/home/changePassword',{oldpassword:this.oldpassword,newpassword:this.newpassword,newrepassword:this.newrepassword}).then((res)=>{
          console.log(res)
          if(res.code==200){
            localStorage.setItem('token',res.token)
            this.$vux.toast.show({
              text:"修改成功",
              type:"success"
            })
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
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  mixins:[mixins,http]
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group{
    margin-top:-0.5rem;
  }
</style>
