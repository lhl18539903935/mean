<template>
    <div class='phone'>
      <group label-width="4.5em" label-margin-right="2em" label-align="left">
        <cell style="font-size: 14px;" title="手机号" >
          <x-input v-model="phone" :disabled='true' style="padding:0 15px;"></x-input>
        </cell>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button style="background-color: #6594FE;font-size: 16px;color:#fff;" link="replace">更换手机号</x-button></div>
      <span style="margin-left:1.1rem;font-size: 14px">一个手机只能作为一个账号的登录名。</span>
    </div>
</template>

<script type="es6">
    import {Group,Cell,XButton,XInput} from "vux"
    export default {
      components:{
        Group,
        Cell,
        XButton,
        XInput
      },
      data(){
        return{
          pageHeader:true,
          pageName:"手机号",
          phone:"",
          bg:{white:false,grey:true},
        }
      },

      mounted(){
        this.apiPost(this.rhost+'/home/getUserDetail',{}).then((res)=>{
          if(res.code==200){

            this.phone=res.data.mobile.substr(0,3)+'****'+res.data.mobile.substr(7,4)
          }else{
				      this.$vux.toast.show({
		          text: res.msg,
		           type: "text",position:'bottom',
		         })
			    }
        })
      },
     mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.phone .weui-input{text-align: right;color: #000;}

</style>
