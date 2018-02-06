<template>
  <div class='register'>
    <group label-width="6em" style="margin-top:-0.5rem">
      <x-input type="text" v-model="mobile" class="cell" placeholder-align="left" title="手机号"  placeholder="请输入手机号"/></x-input >
    </group>
    <group  label-width="6em" style="margin-top:-0.5rem">
       <x-input class="cell"  v-model="code"  title="手机验证码" placeholder-align="left"  placeholder="请输入验证码">
        <x-button style="background: red;" :disabled="dis" slot="right" type="primary" mini @click.native='getCode'>
          <span v-if='!count'>{{btnText}}</span>
        <span v-if="count">{{count}}s后重新发送</span>
          </x-button>
      </x-input>
    </group>
    <label class="check">
      <input type="checkbox" v-model="checked" />
      <a>阅读并同意惠乐益商户合作协议</a>
    </label>
    <div class="x_btn"><x-button @click.native="submit">确定</x-button></div>
  </div>
</template>

<script type="es6">
  import {Group,Cell,XButton,XHeader,XInput} from 'vux'
    export default {
      data(){
        return{
        pageName:"注册",
        bg:{white:false,grey:true},
        count:'',
        dis:false,
        checked:false,
        mobile:"",
        code:"",
        start:false,
        isAble:false,
        btnText:'获取验证码',

       }
      },
      components:{
        Group,
        Cell,
        XButton,
        XHeader,
        XInput
      },
      methods:{
        selected(){
        var vm=this
        this.count=10;
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
                 type: "warn"
             })
             return
            }else{
              this.selected()
            }
           this.apiPost('http://r.huileyi.com/home/getCode',{mobile:mobile,type:"findpassword"}).then((res)=>{
             console.log(res)
             if(res.code==228){
              this.$vux.toast.show({
                   text: res.msg,
              })
             }
           })
        },
        submit(){
          let code=this.code
          let mobile=this.mobile
          if(this.checked!=true||code==""||mobile==''){
            this.$vux.toast.show({
              text: '请填写完整信息',
              type: "warn"
            })
            return
          }
          this.apiPost('http://r.huileyi.com/home/checkMobVer',{mobile:mobile,type:'findpassword',verify:code}).then((res)=>{
            console.log(res,res.code)
            if(res.code==200){
            localStorage.setItem('codekey',res.data.codekey)
            localStorage.setItem('mobile',mobile)
            this.$router.push('/register')
            }else{
              this.$vux.toast.show({
              text: res.msg,
              type: "warn"
              })
            }
          })
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
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .bg_color{
    background:#E9E9E9;
  }
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
