<template>
  <div class='certification'>
    <group>
      <div>
        <img class="img" style="width: 80px;height: 80px;float: left;margin: 1rem 0 1rem 1rem;border-radius: 5px;" :src="headpic" alt=""/>
        <div class="rt" style="margin:2rem 1rem 1.5rem 0;font-size: 14px;text-align: right">
          <p>{{userData.name}}</p>
            <span style="margin-top:1rem;display:inline-block;color:#6594fe">
              <img v-if="userData.idcard_status==1" src="../../assets/id.png" style="width:16px;vertical-align: middle;
              margin:-5px 5px 0 0 ;" alt=""/>
              {{getStatus(userData.idcard_status)}}&nbsp;&nbsp;
             <router-link to="/Refusal" v-if="userData.idcard_status==2"><span style="color:#6594FE;border-bottom:1px solid #6594FE">查看</span></router-link>  
            </span>
        </div>
      </div>
    </group>
    <group>
      <cell v-if='renzhengzhuangtai==1' class="font" title="姓名"  :value='userData.name'></cell>
      <cell v-if='renzhengzhuangtai!=1' class="font" title="姓名"  :value='userData.name' is-link link='/rename?type=name&statename=refusalname'></cell>
      <cell v-if='renzhengzhuangtai==1' class="font" title="身份证号" :value="userData.idcard"></cell>
      <cell v-if='renzhengzhuangtai!=1' class="font" title="身份证号" :value="userData.idcard" is-link link='/rename?type=idcard&stateid=refusalid'></cell>
      <!--<cell v-if='renzhengzhuangtai==1' class="font" title="身份证有效期" :value="value"></cell>-->
      <!--<datetime v-if='renzhengzhuangtai!=1' @on-change='change'  style='font-size:14px;' :max-year=2099 v-model="value" title="身份证有效期"></datetime>-->

      <cell  class="font" v-if='renzhengzhuangtai!=1' title="身份证正面" is-link link='/addCard?type=front'>
        <span name='value'><span  :class='{black:userData.card_positive_img}'>{{getState(userData.card_positive_img)}}</span></span>
      </cell>
      <cell  class="font" v-if='renzhengzhuangtai==1' title="身份证正面" >
        <span name='value'><span  :class='{black:userData.card_positive_img}'>{{getState(userData.card_positive_img)}}</span></span>
      </cell>
      <cell class="font" v-if='renzhengzhuangtai!=1' title="身份证反面"  is-link link='/addCard?type=back'>
        <span name='value'><span  :class='{black:userData.card_negative_img}'>{{getState(userData.card_negative_img)}}</span></span>
      </cell>
      <cell class="font" v-if='renzhengzhuangtai==1' title="身份证反面">
        <span name='value'><span  :class='{black:userData.card_negative_img}'>{{getState(userData.card_negative_img)}}</span></span>
      </cell>
    </group>
    <div class="attbtn">
      <x-button :disabled="!refusal" :class="{'xbtn':refusal}" @click.native="saverefusal">保存</x-button>
    </div>
  </div>
</template>

<script type="es6">
  import {Group,XButton,Datetime,Cell} from "vux"
  import format from '../../tools/date/format.js'
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          userData:{},
          value:'',
          datas:'',
          auto:true,
          refusal:false,
          pageHeader:true,
          pageName:"实名认证",
          headpic:require('../../assets/titlelogo.png'),
          renzhengzhuangtai:'',
        }
      },
      methods:{
        // 提交拒绝周填写的信息
        saverefusal(){   
                let vm=this
                 let name=vm.userData.name || localStorage.getItem('name')
                 let idcard =vm.userData.idcard || localStorage.getItem('idcard')
                 let card_positive_img = vm.userData.card_positive_img || localStorage.getItem('front')
                 let card_negative_img = vm.userData.card_negative_img || localStorage.getItem('back')
            this.apiPost(this.phost+'/Dls/dlsPerfectData', {name:name,idcard:idcard,card_positive_img:card_positive_img,card_negative_img:card_negative_img}).then((res)=>{
              if(res.code==200){
                  this.$vux.toast.show({
                  text: res.msg,
                  type: "success"
                })

              }
            })
        },
        getStatus(status){
          if(status==1) return '已认证';
          if(status==2) {
            this.refusal=true
            return '认证拒绝';
          }
          if(status==0) return '审核中';
        },
        change () {
          let date=(new Date(this.value).getTime())/1000;
          let vm = this;
          this.apiPost(this.phost+'/Dls/dlsPerfectData',{idcard_end_time:date}).then((res)=>{
              if(res.code == 200){
              }
              vm.getData()
          })
        },
        idshowtal:function(data){
          this.idshow=true;
          this.pageHeader=false
          this.datas=data
          if(data == 1 && this.zsz){
            this.addimg=this.zsz;
          }

          if(data == 2 && this.zsf){
            this.addimgs=this.zsf;
          }
        },
        getState(val){
            return val?'已添加':'未添加';
        },
        getData(){
          let vm=this;
            this.apiPost(this.phost+'/Dls/idcardAuthen',{}).then((res)=>{
            if(res.code==200 && res.data){
              vm.userData=res.data;
              if(res.data.idcard_end_time){
                vm.value=format((res.data.idcard_end_time*1000),'YYYY-MM-DD');
              }
              if(localStorage.getItem('name')){
                  vm.userData.name=localStorage.getItem('name')
              }else{
                 vm.userData=res.data;
              }
               if(localStorage.getItem('idcard')){
                  vm.userData.idcard=localStorage.getItem('idcard')
              }else{
                vm.userData=res.data;
              }   
              if(res.data.idcard_status==1){vm.renzhengzhuangtai=1}
            }
          })
        }
      },
      mounted(){
        this.getData();
        let vm = this;
        this.apiPost(this.rhost+'/home/getUserMessage',{}).then((res)=>{
          if(res.code==200){
            if(res.data.headpic){
              vm.headpic=res.data.headpic
            }
          }     
        })
      },
      components:{
        Group,
        Cell,
        XButton,
        Datetime
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .certification  .lf{
    float:left;
  }
  .certification  .rt{
    float:right;
  }
  .certification  .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .certification  .img{
    position: relative;
  }
  .certification .weui-cell_access .weui-cell__ft{
    color:#000;
  }
  .certification .vux-cell-value{color:#000;}
  .black{color:#000;}
  .certification .weui-cells{margin-top: 10px;}
  .attbtn{
    width:90%;
    margin:1rem auto;
  }
  .attbtn .xbtn{
    background-color: #6594FE!important;
    color:#fff;
  }
  .attbtn .weui-btn_default{
    background-color:#DADADA;
    color:#fff;
  }
</style>
