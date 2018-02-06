<template>
  <div style='margin-top:-2.4rem;padding-top:2.4rem;'>
    <div class='usr annotherong'> 
      <x-input  name="username" @on-focus='usr = true' @on-blur='usr = false' v-model="username" placeholder="输入用户名">
        <img v-if='usr'  slot="label" style="padding-right:10px;display:block;" src="../assets/images/login_01.png"  width="24" height="24">
        <img v-else  slot="label" style="padding-right:10px;display:block;" src="../assets/images/userone.jpg"  width="24" height="24">
      </x-input>
    </div>
    <div class='usr usertop'>
      <x-input type="password" @on-focus='pass=true' @on-blur='pass=false' v-model="password" placeholder="输入密码">
        <img v-if='pass' slot="label" style="padding-right:10px;display:block;" src="../assets/images/login2.png"  width="24" height="24">
        <img  v-else slot="label" style="padding-right:10px;display:block;" src="../assets/images/login_02.png"  width="24" height="24">
      
      </x-input>
    </div>
    <x-button style='width:90%'  @click.native="submit"  class="weui-btn weui-btn_primary weui-btn_plain-primary" >登录</x-button>
    <div class="other">
      <span class='password'><router-link to="/findpwd"><a href="" style='color:#a28d70;float:left;'>忘记密码？</a></router-link></span>
      <span style='float:right;'><router-link class="zhuce" to="/register_detail">注册</router-link></span>
    </div>
  </div>
</template>
<script type="es6">
  import {XInput,XButton,Checklist} from 'vux'
  import mixins from '../vuex/mixin.js'
	import http from '../ajax.js'
  export default{
    components:{
      XInput,
      XButton,
      Checklist
    },
    methods:{
      submit(){
        let vm=this;
        if(this.username.length==0||this.password.length==0){
          this.$vux.toast.show({
               text: '请填写完整信息',
                type: "warn"
              })
          }else{
            /*let type=this.$route.query.type;
            let mobile=this.$route.query.mobile;*/
        
            this.apiPost('http://r.huileyi.com/home/toLogin',
              {mobile:this.username,password:this.password,type:"merchant"}).then((res)=>{
                if(res.code==200){

                  //let mobileHistory=JSON.parse(localStorage.getItem(mobile));
                  let mobileHistory=JSON.parse(localStorage.getItem('exchangeAccount'));
                 mobileHistory=mobileHistory?mobileHistory:[];

                    //是否已经添加
                    let ext=false;
                    for(let m in mobileHistory){

                      if(mobileHistory[m].mobile == vm.username){
                        ext=true;
                        mobileHistory[m].token=res.data.token;
                      }
                    }
                    //已经有
                    if(!ext){
                        mobileHistory=mobileHistory.concat([{mobile:vm.username,token:res.data.token}])
                    }

                    
                  localStorage.setItem('exchangeAccount',JSON.stringify(mobileHistory))
             
            
                  localStorage.setItem('mobile',vm.username)
                  localStorage.setItem('token',res.data.token)
		              window.axios.defaults.headers.token = localStorage.getItem('token');
		              window.axios.defaults.headers.type='merchant';

                  localStorage.removeItem('checkMerchant')
		              this.$router.push("/")
		        
                }else{
                  this.$vux.toast.show({
		                    text: res.msg,
		                    type: "warn"
		              })
                }
           })
        }
      }
    },
    data:function(){
      return{
        pageHeader:true,
        pageName:'万商互联-渠道商',
        bg:{white:true,grey:false},
        pageFooter:false,
        username:'18500000003',
        password:'123456',
        usr:false,
        pass:false,
      }
    },
    mixins:[window.mixins,window.http],
    mounted:function(){
      // localStorage.setItem('token','')
      // document.location.reload()
    }
  }

</script>
<style scoped>
  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .zhuce {
    color: #FF4948;
  }
  .usr {
    border: 1px solid #eee;
    width: 90%;
    margin: 0 auto;
    border-radius: 30px;
  }
  .usertop {
    margin-top: 7%;
    margin-bottom: 7%;
  }
  .annotherong {
    margin-top: 10%
  }
  .weui-btn_plain-primary {
    color: #fff;
    border: 1px solid #FF4948;
  }
  .weui-btn_primary {
    background-color: #FF4948 !important;
  }
  .weui-btn{
    border-radius: 20px;
  }
  .other{
    width: 83%;
    margin: 0 auto;
    margin-top: 4%
  }
</style>
