<template>
  <div class='register'>
    <group label-width="6em" style="margin-top:-0.5rem">
      <x-input type="text" @on-change="change" v-model="mobile" :max="11" class="cell lhl-cell" placeholder-align="left" title="手机号"  placeholder="请输入手机号"/></x-input >
    </group>
    <group  label-width="6em" style="margin-top:-0.5rem">
      <x-input class="cell" @on-change="change"  v-model="code"  title="手机验证码" placeholder-align="left"  placeholder="请输入验证码">
        <x-button style="background: #6594FE;" :disabled="dis" slot="right" type="primary" mini @click.native='getCode'>
          <span v-if='!count'>{{btnText}}</span>
          <span v-if="count" >{{count}}s后重新发送</span>
        </x-button>
      </x-input>
    </group>
    <div class="check">
      <input type="checkbox" v-model="checked"/>
      <router-link to="/readyContract">阅读并同意<span style="color:#6594FE">《惠乐益乐宝App服务协议》</span></router-link>
    </div>
    <div class="x_btn"><button style="font-size:18px"  @click="submit" :class="{'color': !checked}" :disabled="!checked">确定</button></div>
  </div>
</template>

<script type="es6">
  import {Group,XButton,XInput} from 'vux'
    export default {
      data(){
        return{
        pageHeader:true,
        pageName:"注册",
        bg:{white:false,grey:true},
        count:'',
        dis:false,
        checked:true,
        mobile:"",
        pageFooter:false,
        code:"",
        start:false,
        isAble:false,
        btnText:'获取验证码',
        disabled:false,
        chooseColor:false
       }
      },
      components:{
        Group,
        XButton,
        XInput
      },
      methods:{
        change(){
          localStorage.setItem('phone',this.mobile)
          localStorage.setItem('code',this.code)
        },
        selected(){
        var vm=this
        this.count=60;
          let timer=setInterval(function(){
           vm.count--
          if(vm.count<=0){
                vm.count='';
                vm.dis=false;
               clearInterval(timer)

          }else{
            vm.dis=true
          }
          },1000)
        },
        getCode(){
          let mobile=this.mobile
          if(this.mobile.length==0){
            this.$vux.toast.show({
                 text: '请填写手机号',
                 type: "text",position:'bottom',
             })
             return
            }
            var myreg = /^0?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
              if(!myreg.test(this.mobile)){
                  this.$vux.toast.show({
                      text: '请填写正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }
           this.apiPost(this.rhost+'/home/getCode',{mobile:mobile,type:"reg"}).then((res)=>{
             if(res.code==228){
              this.$vux.toast.show({
                   text: res.msg,
              })
              this.selected()
             }else{
                this.$vux.toast.show({
                     text: res.msg,
                     type: "text",position:'bottom',
                })
             }

           })
        },
        submit(){
          let code=this.code
          let mobile=this.mobile
          if(mobile==""){
            this.$vux.toast.show({
              text: '请填写手机号',
              type: "text",position:'bottom',
            })
            return
          }
          var myreg = /^0?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
              if(!myreg.test(this.mobile)){
                  this.$vux.toast.show({
                      text: '请填写正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }
          if(code==""){
            this.$vux.toast.show({
              text: '请填写验证码',
              type: "text",position:'bottom',
            })
            return
          }
          this.apiPost(this.rhost+'/home/checkMobVer',{mobile:mobile,type:'reg',verify:code}).then((res)=>{
            if(res.code==200){
            localStorage.setItem('codekey',res.data.codekey)
            localStorage.setItem('mobile',mobile)
            this.$router.push('/registerPss')
            }else{
              this.$vux.toast.show({
              text: res.msg,
              type: "text",position:'bottom',
              })
            }
          })
        }
      },
      mounted(){
        if(localStorage.getItem('phone')==null){
          localStorage.getItem('phone')==''
        }else{
          this.mobile=localStorage.getItem('phone')
        }
        if(localStorage.getItem('code')==null){
          localStorage.getItem('code')==''
        }else{
          this.code=localStorage.getItem('code')
        }

      },
      mixins:[window.mixins,window.http]
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weui-tab__panel{
    background:#E9E9E9!important;
  }
  .cell{
    font-size: 14px;
  }
  .lhl-cell{
    padding:0.9rem
  }
  .cell .color{
    background-color:#ddd;
  }
  .cell input{
    position: absolute;
    top:16px;
    left:130px;
    font-size: 14px;
    border: 0;
    outline: none;
  }
  .x_btn .color{
    background-color: #8D8D8D;
  }
  .x_btn button{
    width:100%;
    border:0;
    outline:none;
    color:#fff;
    border-radius: 10px;
    height:42px;
    line-height:42px;
    
  }
  .btn{
    position: absolute;
    top: 8px;
    right: 17px;
    height: 30px;
    width: 6rem;
    /* line-height: 44px; */
    border: 0;
    border-radius: 5px;
    background: #FF4948;
    color:#fff;
  }
  .x_btn{
    width:90%;
    margin:1rem auto;

  }
  .x_btn button{
    background: #6594FE;
    color:#fff;
    font-size: 16px;
  }
  /*.bg_color{
    background:#E9E9E9;
  }*/
  @media screen  and (max-width: 320px) {
    input::-webkit-input-placeholder{
      font-size: 14px;
    }
  }
  @media screen  and (max-width: 320px) {
    .cell input{
      margin-left:-1.3rem;
    }
  }
  @media screen  and (max-width: 320px) {
    .btn {
      width:5rem;
      height:30px;
      font-size: 12px;
    }
  }
  .check{
    margin:1rem 0 0 1rem;
    display: block;
  }
  /*input[type=checkbox]{-webkit-appearance:none;}调整check背景色*/
  .check input{
    width:1.2rem;
    height:1.2rem;
    background: #fff;
  }
  .check a{
    display: inline-block;
    color: #888;
    margin-top:-1px ;
    vertical-align: top;
  }
  .font{
    font-size: 14px;
  }
  @media screen  and (max-width: 320px) {
    .cell {
      font-size:14px;
    }
  }
  @media screen  and (max-width: 320px) {
    input{
      margin-left:-1rem;
    }
  }
  @media screen  and (max-width: 320px) {
    .check{
      margin-left:30px;
    }
  }
  @media screen  and (max-width: 320px) {
    input::-webkit-input-placeholder{
      font-size: 14px;
    }
    @media screen  and (max-width: 320px) {
      .btn {
        width:5rem;
        height:30px;
        font-size: 12px;
        margin:1px -10px 0 0;
      }
    }
  }
  .register .weui-btn_mini{padding:0 0.5em;margin-left:10px;}
</style>
