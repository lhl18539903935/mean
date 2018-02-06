<template>
    <div>
      <group class="group">
        <router-link to="/data">
          <img class="imglink" :src="headpic" alt="/person"/>
          <div style="margin:1.3rem 0 0 1rem;float:left;font-size: 14px;">
            <p style="margin:0.5rem 0 1rem 0;color:#000;">{{name}}</p>
            <span style="color:#ADADAD;">{{mobile}}</span>
          </div>
        <span class="quire" style="float:right"></span>
        </router-link>
        <div style="clear:both"></div>
      </group>
      <group style="margin-top:-0.5rem;">
        <cell
          style="padding-top:14px;padding-bottom:14px;font-size: 14px"
          title="实名认证" value-align="right" is-link link='/attestation'>
          <span v-if='shimingrenzheng==1' name='solt'>
            <img  class="style" style="vertical-align:middle;" src="../../assets/images/yrenzheng.png" alt=""/>
          </span>
        </cell>
        <cell
          style="padding-top:14px;padding-bottom:14px;font-size: 14px"
          title="企业认证" value-align="right" is-link link='/business'>
          <span v-if='qiyerenzheng==1' name='solt'>
            <img  class="style" style="vertical-align:middle;" src="../../assets/images/yrenzheng.png" alt=""/>
          </span>
        </cell>
        <cell
          style="padding-top:14px;padding-bottom:14px;font-size: 14px"
          :title="item.t" value-align="left"
          is-link v-for="(item,index) in list"
          :link="item.link" :key="index" >
        </cell>
        <cell
          style="padding-top:14px;padding-bottom:14px;font-size: 14px"
          title="我的收款账户" value-align="right" value="去添加" link="/my_card" is-link >
        </cell>

      <cell
        style="background-color: #fff;
        padding-top:14px;
        padding-bottom:14px;font-size: 14px"
        title="切换账号" value-align="right" value="去添加" is-link link="/switchacc">
      </cell>
      </group>
      <div style="width:90%;margin:1rem auto;">
        <x-button @click.native="quit" style="background:#FF4948;color:#fff;font-size: 14px">退出</x-button>
      </div>
    </div>
</template>

<script type="es6">
    import {Group,Cell,XButton} from 'vux'
    import mixins from "../../vuex/mixin.js"
    import http from "../../ajax.js"
    export default {
      data(){
        return{
          pageHeader:true,
          pageName:"个人中心",
          bg:{white:false,grey:true},
          name:"杨梦龙",
          mobile:"18888888888",
          headpic:require('../../assets/images/person_03.png'),
          list:[
            {t:"修改密码",link:'/revisePwd'},{t:"关于惠乐益",link:"/abouthly"},{t:"收货地址",link:"/address"}
          ],
          shimingrenzheng:"",
          qiyerenzheng:""
        }
      },
      mounted(){
        let vm=this
        vm.apiPost('http://r.huileyi.com/home/getUserDetail',{}).then((res)=>{
         if(res.code==200){
         // console.log(res.data)
                           localStorage.setItem('mobile',res.data.mobile);
          vm.name=res.data.name
          vm.mobile=res.data.mobile
          vm.headpic=res.data.headpic?res.data.headpic:vm.headpic
          // console.log(vm.name,vm.mobile)
          if(res.data.idcard_status==0){
            vm.shimingrenzheng=0
          }else{
            vm.shimingrenzheng=1
          }
          if(res.data.company_status==0){
            vm.qiyerenzheng=0
          }else{
           vm. qiyerenzheng=1
          }
         }else{
          this.$vux.toast.show({
                text: res.msg,
                type: "warn"
            })
         }
        })
      },
      methods:{
        quit(){
        let vm=this
        vm.apiPost("http://r.huileyi.com//home/layOut").then((res)=>{
        if(res.code==200){

            let his=JSON.parse(localStorage.getItem('exchangeAccount'))
            let mobile=localStorage.getItem('mobile')
            for(let h in his){
              if(his[h].mobile == mobile){
                his.splice(h,1)
              }
            }

            localStorage.setItem('exchangeAccount',JSON.stringify(his));
            localStorage.removeItem('token')
            localStorage.removeItem('checkMerchant')
            localStorage.removeItem('mobile')

                this.$vux.toast.show({
                 text: "退出成功",
                 type: "success"
                })

              this.$router.push('/login')
		        }else{
		          this.$vux.toast.show({
		             text: "退出成功",
		             type: "success"
		          })
		          this.$router.push("/login")
		        }
          })
        }
      },
      components:{
        Group,
        Cell,
        XButton,
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group{
    margin-bottom: 1rem;
    margin-top:-0.5rem;
  }
    .group img{
      width:80px;
      height:80px;
      float:left;
      margin:1rem 0 1rem 1rem;
      border-radius: 5px;
    }
  .quire{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
    margin:50px 25px 0 0;
  }
  .public{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
  }
  .style{
    width:18px;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  .valueShow{
    display:block;
  }
  .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    z-index: 999;
    opacity: 0;
    width:81px;
    height:100px;
    border:1px solid #000;
    position: absolute;top:16px;left:15px;
  }
</style>
