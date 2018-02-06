<template>
  <div>
    <group class="group">
      <cell title="请输入密码"  class="cell font">
        <input type="password"  v-model="password" placeholder="请输入新密码"/>
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
  import {Group,Cell,XButton,Icon} from 'vux'
  export default {
    data(){
      return {
        pageName:"注册",
        pageHeader:true,
        bg:{white:false,grey:true},
        password:"",
        surePassword:""
      }
    },
    methods:{
      login(){
        let mobile=localStorage.getItem('mobile')
        let password=localStorage.getItem('password')
        this.apiPost(this.rhost+'/home/toLogin', {mobile:mobile,password:password,type:'dls'}).then((res)=>{
          if(res.code==200){
                  localStorage.setItem('token',res.data.token)
                        localStorage.setItem('ziliao',res.is_upload_profile);
                        localStorage.setItem('rank',res.data.rank);
                        window.axios.defaults.headers.token = localStorage.getItem('token');
                         window.axios.defaults.headers.type='dls'

                  if(res.data.is_upload_profile==0){

                          this.$router.push({path: '/perfectData'});
                          //window.location.href="/#/agreenment"
                  }else{

                          this.$router.push({path: '/'});
                          //window.location.href="/"
                  }
                }
                else{
                    this.$vux.toast.show({
                            text: res.msg,
                            type: "text",position:'bottom',
                        })
                }

        })
      },
      submit(){
      if(this.password.length==0||this.surePassword.length==0){
        this.$vux.toast.show({
             text: '请填写完整信息',
              type: "text",position:'bottom',
            })
          return false
        }
        if(this.password!=this.surePassword){
        this.$vux.toast.show({
          text:"密码不一致",
          type:"text",
           position:'bottom'
        })
        }else{
          this.mobile=localStorage.getItem('mobile')
          this.codekey=localStorage.getItem('codekey')
          this.apiPost(this.rhost+'/home/checkRegMessage',
          {password:this.password,repassword:this.surePassword,type:"dls",mobile:this.mobile,codekey:this.codekey})
          .then((res)=>{
            if(res.code==200){
                localStorage.setItem("password",this.password)
                this.login()
            }else{
              this.$vux.toast.show({
                     text: res.msg,
                     type: "text",position:'bottom',
                })
            }
          })
        }
      }
    },
    mounted(){

    },
    components:{
      Group,
      Cell,
      XButton,
      Icon
    },
    mixins:[window.mixins,window.http]
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
    background: #6594FE;
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
