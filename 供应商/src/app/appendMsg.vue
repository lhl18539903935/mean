<template>
  <div class="appendMsg">
    <group class="group" label-width="7.5em" >
      <x-address  class="font" title="*门店所属区域" v-model="belong_area"  raw-value :list="addressData" value-text-align="right"></x-address>
      <x-input placeholder-align="right" v-model="store_name" placeholder="请填写" text-align="right" class="font"  title="*门店名称"></x-input>
      <x-input placeholder-align="right" v-model="branch_name" text-align="right" placeholder="选填,如北关店"  class="font"  title="*分店名称"></x-input>
      <popup-radio style="font-size: 14px" title="*行业分类" v-model="trade_class" :options="options" ></popup-radio>
      <x-textarea class="font" text-align="right" v-model="store_address" title="*门店地址"   is-link placeholder="请输入具体地址"></x-textarea>
      <x-input class="font" v-model="store_call" text-align="right" placeholder="请输入门店电话"   title="*门店电话" ></x-input>
      <x-input class="font" v-model="sale_person_number" text-align="right" placeholder="咨询销售人员" title="销售人员工号" ></x-input>
    </group>
    <div class="btn"><x-button  @click.native="submit">提交并激活</x-button></div>
  </div>
</template>

<script type="es6">
  import {ChinaAddressV3Data,XAddress,XTextarea, Popup,Group,Cell,XInput,PopupRadio,XButton} from 'vux'
  import addressData from '../assets/images/address.json'
  import mixins from "../vuex/mixin.js"
  import http from "../ajax.js"
    export default {
      data(){
      return {
        pageName:"个人商户-添加门店",
        bg:{white:false,grey:true},
        addressData: ChinaAddressV3Data,
        addressData:addressData,
        belong_area:[],
        store_name:"",
        branch_name:"",
        store_address:"",
        store_call:"",
        sale_person_number:"",
        store_pic:"fdg",
        store_manager_tel:"fdg",
        store_owner_name:"sfdg",
        store_password:"sfg",
        trade_class:"电子商务",
        options:[{key:'1',value:'电子商务'},{key:'2',value:'美容'}]
      }
    },
    methods:{
      submit(){
        let data={
          store_name:this.store_name,branch_name:this.branch_name,store_address:this.store_address,belong_area:this.belong_area,
          store_call:this.store_call,sale_person_number:this.sale_person_number,trade_class:this.trade_class,
          store_pic:this.store_pic,store_manager_tel:this.store_manager_tel,store_owner_name:this.store_owner_name,store_password:this.store_password
        }
        if(this.store_name.length==0||this.branch_name.length==0||this.store_address.length==0||this.store_call.length==0||this.sale_person_number.length==0||
          this.store_pic.length==0||this.store_manager_tel.length==0||this.store_owner_name.length==0||this.store_password.length==0
        ){
          this.$vux.toast.show({
            text:"填写信息完整",
            type:"warn"
          })
          return
        }
        let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        let mobile=this.store_call
        if(!reg.test(mobile)){
          this.$vux.toast.show({
            text:"电话格式不正确",
            type:"warn"
          })
          return
        }
        this.apiPost("http://r.huileyi.com/store/addNewStore",data).then((res)=>{
          console.log(res)
          if(res.code==200){
            this.$vux.toast.show({
              text:"添加成功",
              type:"success"
            })
            this.$router.push('/chose')
          }
        })
      }
    },
    mounted(){

    },
   components:{
        Group,
        Cell,
        XInput,XButton,
        Popup,
        XTextarea,
        ChinaAddressV3Data,XAddress,
        PopupRadio
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .appendMsg .btn{
    width:90%;
    margin:1rem auto;
  }
  .appendMsg .btn button{
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .appendMsg .font{
    font-size: 14px;
  }
  .appendMsg .group{
    margin-top:-0.5rem;
  }
  .vux-popup-picker-header{
    color:#FF4948!important;
  }
  .vux-popup-header-right{
    color:#FF4948!important;
  }
</style>
