<template>
    <div>
      <group>
        <x-input placeholder="用户名"   v-model="username" style="font-size: 14px;"></x-input>
      </group>
      <span style="display: inline-block;margin:0.7rem 15px 0;font-size: 12px">用户名只能修改一次(5-24个汉字)</span>
      <div style="width:90%;margin:1rem auto;">
        <x-button style="background-color: #FF4948;font-size: 16px;color:#fff;" @click.native="save">确认修改</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import {Group,XInput,XButton} from "vux"
  import mixins from "../../vuex/mixin.js"
  import http from "../../ajax.js"
    export default {
      data(){
        return{
          pageName:"用户名",
          username:"",
          bg:{white:false,grey:true},
        }
      },
      components:{
        XInput,
        XButton,
        Group
      },
      methods:{
        save(){
          if(this.username==""||this.username==undefined){
            this.$vux.toast.show({
              text:"请填写昵称",
              type:"warn"
            })
          }else if(this.username.length<5||this.username.length>24){
            this.$vux.toast.show({
              text:"请填写5-24个字",
              type:"warn"
            })
            return false
          }else{
            this.apiPost("http://r.huileyi.com/home/uploadPersonDatum",{name:this.username}).then((res)=>{
              if(res.code==200){
              this.$vux.toast.show({
                text: '保存成功',
              })
              this.$router.go(-1)
              }
            })
          }
        }
      },
      mounted(){
        this.apiPost('http://r.huileyi.com/home/getUserDetail',{}).then((res)=>{
          console.log(res)
          if(res.code==200){
            this.username=res.data.name
          }else{
            this.$vux.toast.show({
             text:res.msg,
             type:"warn"
            })
          }
        })
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
