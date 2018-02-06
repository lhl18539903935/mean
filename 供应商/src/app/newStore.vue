<template>
 
    <div class="newStore">

      <group label-width="5.5em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem">
        <x-input placeholder-align="right" text-align="right" v-model="store_name" class="font" title="门店名称"  placeholder="请输入门店名称"></x-input>
        <popup-radio style="font-size: 14px" title="行业分类" :options="options" placeholder='请选择行业' v-model="trade_class"></popup-radio>
        <x-address title="所属区域"  class="font" v-model="belong_area"  raw-value :list="addressData" placeholder="请输入所属区域" value-text-align="right"></x-address>
        <x-textarea class="font" title="门店地址" v-model="store_address" placeholder="请填写详细信息"  :rows="3"></x-textarea>
      </group>
      <group class="font" label-width="5.5em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem">
        <cell class="font" title="门店照片"  :value="src?'已上传':'请上传'" value-align="right" link="/addStore_img" is-link>
        </cell>

        <popup-radio style="font-size: 14px" v-model="store" class="cell" placeholder='请选择'  title="门店状态" :options="states" ></popup-radio>

        <x-input placeholder-align="right" text-align="right" class="font" title="门店电话 " v-model="store_call" placeholder="输入门店电话,可多个"></x-input>
        <x-input placeholder-align="right" text-align="right" class="font" title="店长姓名" v-model="store_owner_name" placeholder="请输入店长姓名"></x-input>
        <x-input placeholder-align="right" text-align="right" class="font" title="店长手机号" v-model="store_manager_tel" placeholder="请输入店长手机号"></x-input>
        <x-input placeholder-align="right" text-align="right"   class="font" title="密码"     v-model="store_password" type="password" placeholder="请输入密码"></x-input>
      </group>
     
      <div style="width:90%;margin:1rem auto;"><x-button class="font" style="background: #FE4948;color:#fff;" @click.native="submit">确定</x-button></div>
    </div>

</template>

<script type="es6">
  import {Group,Cell,XTextarea,XInput,XButton,XAddress,Radio,Popup} from 'vux'
  import PopupRadio from '../components/popup-radio'
  import mixins from "../vuex/mixin.js"
  import addressData from '../assets/images/address.json'
  import http from "../ajax.js"
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          store_name:"",
          store_manager_tel:"",
          store_owner_name:"",
          store_password:"",
          store_call:"",
          store_address:"",
          store_pic:[],
          pageName:"新增门店",
          belong_area:[],
          show2:false,
          show3:false,
          img_show:true,
          trade_class:"",
          list_img:{},
          src:"",
          bg:{white:false,grey:true},
          options:[{key:'1',value:'电商'},{key:'2',value:'餐饮'},{key:'3',value:'美容'}],
          store:"",
          states:[{key:'0',value:'已上线'},{key:'1',value:'未上线'}],
          addressData:addressData,
          state:1
        }
      },
      methods:{
          storeState(i){
          if(this.list[i].state==1)
          this.show3=true
         },
         submit(){
          let vm=this
          if(this.store_name.length==0||this.trade_class.length==0||this.belong_area.length==0||
          this.store_address.length==0||this.store_pic.length==0||
            this.store_call.length==0||this.store_manager_tel.length==0||this.store_owner_name.length==0||this.store_password.length==0
          ){
            this.$vux.toast.show({
              text:"请填写完整信息",
              type:"warn"
            })
            return
          }
        /* let callReg=/^((0?\d{3}-)?\d{5,10}\/)*((0?\d{3}-)?\d{5,10}\/?)$/
          if(!callReg.test(this.store_call)){
            this.$vux.toast.show({
              text:"门店电话格式不正确",
              type:"warn"
            })
            return
          }*/
          let regPho=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
          if(!regPho.test(this.store_manager_tel)){
            this.$vux.toast.show({
              text:"手机号码格式不正确",
              type:"warn"
            })
            return;
          }
          let region=this.getName(this.belong_area)
          let data={store_name:this.store_name,trade_class:this.trade_class,
                  belong_area:this.belong_area,
                  store_address:this.store_address,store_pic:this.store_pic,store_call:this.store_call,store_manager_tel:this.store_manager_tel,
                  store_owner_name:this.store_owner_name,store_password:this.store_password
        }
          this.apiPost('http://r.huileyi.com/store/addNewStore',data).then((res)=>{
          if(res.code==200){
                this.$vux.toast.show({
                text:"添加成功",
                type:"success"
              })
                if(this.$router.query.from == 'license'){

                  this.$router.push('/chose')
                }else{
                  this.$router.push('/shop')
                }
              

              for(var i in this.options){
               if(this.options[i].key=='0'){
                this.trade_class=this.options[i].key
                }
              }
              for(var i in this.states){
                if(this.states[i].key=='0'){
                  this.store=this.states[i].key
                }
              }
            }else{
                this.$vux.toast.show({
                text:res.msg,
                type:"warn"
              })
            }
          })
        },
        getName:function(value){
          var adr=[]
          for(var r in this.addressData){
            var index=this.addressData[r];
            for(var i in value){
              var a=value[i]
              if(a==index.value) adr.push(index.name)
            }
          }
            return adr;
        }
      },
      mounted(){
       this.store_pic=JSON.parse(localStorage.getItem('listImg'))
       
      },
      components:{
        Group,
        Cell,
        XTextarea,
        XInput,
        XButton,
        Radio,
        PopupRadio,
        Popup,
        XAddress
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .newStore .font{
    font-size: 14px;
  }
  .newStore .weui-cell__ft.vux-cell-align-left{
    text-align: right!important;
  }
  .newStore .weui-textarea{
    text-align: right!important;
  }
  .newStore .weui-cell__bd{
    margin-right:10px;
  }
  .newStore .weui-cell__ft{
    color:#000;
  }
  .newStore .state .weui-cell__ft{
    margin-right:12px;
  }
  .newStore .vux-cell-value{
    color:#000;
  }
</style>
