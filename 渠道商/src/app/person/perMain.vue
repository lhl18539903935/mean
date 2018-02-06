<template>
  <div class='personal'>
    <router-link to="/data">
      <group class="group">
        <img class="imglink" :src="headpic">
        <img v-show="item.state" class="ano_name" :src="item.ano_name" v-for="(item,i) in anolist" :key="i" alt="">
        <div style="margin:1.3rem 0 0 1rem;line-height: 2.5;float:left;font-size: 14px;">
          <p style="color:#000;">{{name}}</p>
          <span style="color:#000;">{{mobile}}</span>
          <span class="idstate" v-if="item.state" v-for="(item,i) in idstate" :key="i">{{item.statename}}</span>
        </div>
        <span class="quire" style="float:right"></span>
      </group>
    </router-link>
    <group label-width="7em">
      <cell style="padding-top:14px;padding-bottom:14px;font-size: 14px" title="乐分" :value="le_num"></cell>
      <cell
        style="padding-top:14px;padding-bottom:14px;font-size: 14px"
        title="实名认证" value-align="right" is-link link='/attestation'><span v-if='zhenzghengzhungtai==1' name='solt'><img  class="style" style="vertical-align:middle;" src="../../assets/id.png" alt=""/></span>
      </cell>
      <cell
        style="padding-top:14px;padding-bottom:14px;font-size: 14px"
        title="企业认证" value-align="right" is-link link='/business'><span v-if='qiyzhenzghengzhungtai==1' name='solt'><img  class="style" style="vertical-align:middle;" src="../../assets/id.png" alt=""/></span>
      </cell>
      <cell
        style="padding-top:14px;padding-bottom:14px;font-size: 14px"
        :title="item.t" value-align="left"
        is-link v-for="(item,index) in list"
        :link="item.link" :key="index" >
      </cell>
      <cell
        style="padding-top:14px;padding-bottom:14px;font-size: 14px"
        title="我的收款账户" value-align="right" value="去添加" is-link link="my_card">
      </cell>
      <cell
        style="padding-top:14px;padding-bottom:14px;font-size: 14px"
        title="申诉列表" value-align="right" is-link link='/complaint'>
      </cell>
    </group>
    <div style="width:90%;margin:1rem auto;">
      <x-button @click.native="quit" style="background:#6594FE;color:#fff;font-size: 14px">退出</x-button>
    </div>
  </div>
</template>

<script type="es6">
    import {Group,Cell,XButton} from 'vux'
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"个人中心",
          name:"",
          mobile:"",
          le_num:"",
          anolist:[
            {ano_name:require('../../assets/1.png'),state:false},
            {ano_name:require('../../assets/2.png'),state:false},
            {ano_name:require('../../assets/3.png'),state:false},
            {ano_name:require('../../assets/4.png'),state:false},
            {ano_name:require('../../assets/5.png'),state:false},
          ],
          idstate:[
            {statename:"审核中",state:false},
            {statename:"认证拒绝",state:false},
            {statename:"已认证",state:false},
          ],
          headpic:require('../../assets/titlelogo.png'),
          list:[
            {t:"修改密码",link:'/revisePwd'},{t:"关于惠乐益",link:'/abouth'},{t:"收货地址",link:'/address'}
          ],
          qiyzhenzghengzhungtai:'',
          zhenzghengzhungtai:''
        }
      },
      mounted:function(){
        this.idcardAuthen()
        let vm=this
        vm.apiPost(this.rhost+'/home/getUserDetail',{}).then((res)=>{
          if(res.code==200){
            vm.name=res.data.name
            vm.mobile=res.data.mobile
            vm.le_num=res.data.le_num
            vm.headpic=res.data.headpic?res.data.headpic:vm.headpic;
            if(res.data.company_status==0){
              vm.qiyzhenzghengzhungtai=0
            }else if(res.data.company_status==2){
              vm.qiyzhenzghengzhungtai=0
            }else{
              vm.qiyzhenzghengzhungtai=1
            }
            if(res.data.idcard_status==0){
              vm.zhenzghengzhungtai=0
            }else if(res.data.idcard_status==2){
              vm.zhenzghengzhungtai=0
            }else{
              vm.zhenzghengzhungtai=1
            }
            if(res.data.ano_name==''){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='金'){
              this.anolist[0].state=true
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='木'){
              this.anolist[0].state=false
              this.anolist[1].state=true
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='水'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=true
              this.anolist[3].state=false
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='火'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=true
              this.anolist[4].state=false
            }
            if(res.data.ano_name=='土'){
              this.anolist[0].state=false
              this.anolist[1].state=false
              this.anolist[2].state=false
              this.anolist[3].state=false
              this.anolist[4].state=true
            }
          }else{
            if(res.msg){
              this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
               })
            }

          }
        })

      },
      methods:{
        // 审核状态
        idcardAuthen(){
          let vm=this
          this.apiPost(this.phost+'/Dls/idcardAuthen',{}).then((res)=>{
            if(res.code==200){
              if(res.data.idcard_status==1){
                this.idstate[0].state=false
                this.idstate[1].state=false
                this.idstate[2].state=true
              }
              if(res.data.idcard_status==0){
                this.idstate[0].state=true
                this.idstate[1].state=false
                this.idstate[2].state=false
              }
              if(res.data.idcard_status==2){
                this.idstate[0].state=false
                this.idstate[1].state=true
                this.idstate[2].state=false
              }
            }
          })
        },
        quit(){
          let vm=this
          vm.apiPost(this.rhost+'/home/layOut',{}).then((res)=>{
              if(res.code == 200){
                this.$vux.toast.show({
                text: '退出成功',
                type: "success"
              })
                localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
              }else{
                  this.$vux.toast.show({
                text: '退出成功',
                type: "success"
              })
                localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
              }
          })
        }
      },
      components:{
        Group,
        Cell,
        XButton
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .personal .idstate{
    color:#6594FE;
    position:absolute;
    right:20px;
    top:58px;
  }
  .personal .weui-cells{
    margin-top: 10px;
  }
  .personal .group img{
    width:80px;
    height:80px;
    float:left;
    margin:1rem 0 1rem 1rem;
    border-radius: 5px;
  }
  .personal .imglink{
    position: relative;
  }
  .personal .group .ano_name{
    width:25px;
    height:25px;
    position: absolute;
    bottom:0;
    left:55px;
  }
  .personal .quire{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
    margin:50px 25px 0 0;
  }
  .personal .public{
    display:inline-block;
    width:6px;
    height:6px;
    border-top:2px solid #C9C9CE;
    border-right:2px solid #C9C9CE;
    transform: rotate(45deg);
  }
  .personal .style{
    width:18px;
  }
  .personal .lf{
    float:left;
  }
  .personal .rt{
    float:right;
  }
  .personal .valueShow{
    display:block;
  }
  .personal .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    z-index: 999;
    opacity: 0;
    width:81px;
    height:100px;
    border:1px solid #000;
    position: absolute;top:16px;left:15px;
  }
  .personal .weui-btn{
    line-height: 2.8 !important;
  }
</style>
