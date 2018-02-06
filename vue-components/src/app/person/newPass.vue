<template>
  <div>
    <group class="group"  label-width="6em">
      <x-input v-model="newpassword" type='password' style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="新密码" placeholder="请输入新密码"></x-input>
      <x-input v-model="newrepassword"  type='password'  style="font-size: 14px;padding-top:14px;padding-bottom:14px;" title="确认新密码" placeholder="请再次输入新密码"></x-input>
    </group>
    <div style="width:90%;margin:1rem auto;" @click="submit">
      <x-button  style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button>
    </div>
  </div>
</template>

<script type="es6">

import { XInput, Group, XButton, Cell } from 'vux'
export default {
  data(){
    return{
      bg:{white:false,grey:true},
      pageHeader:true,
      pageName:"修改密码",
      newpassword:"",
      newrepassword:""
    }
  },
  methods:{
    submit(){

      if(this.newrepassword!=this.newpassword){
        this.$vux.toast.show({
          text:"密码不一致",
          type:"text",
          position:'bottom'
        })
      }else{
        let codekey=localStorage.getItem('codekey');
        this.apiPost(this.rhost+'/home/findPassword',{newpassword:this.newpassword,newrepassword:this.newrepassword,codekey:codekey}).then((res) => {
          if(res.code==200){
            localStorage.setItem('token',res.token)
            this.$vux.toast.show({
              text:"修改成功",
              type:"success"
            })
            this.$router.push({path: '/login'});
          }else{
             this.$vux.toast.show({
              text:res.msg,
              type:"text",
              position:'bottom'
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
  mixins:[window.mixins,window.http]
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group{
    margin-top:-0.5rem;
  }
</style>
