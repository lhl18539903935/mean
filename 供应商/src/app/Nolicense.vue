<template>
  <div class="Nolicense">
    <cell class="bitian" :title="('*为必填项')" style="position:relative;color: #FF4948;border-bottom: 1px solid #ddd;background: #E9E9E9">
      <img slot="icon" width="20" style="display:block;margin-right:5px;">
      <icon class="icon" width="20" type="warn"></icon>
    </cell>

    <group class="group">
      <x-input  placeholder-align="right" v-model="merchant_name"  placeholder="请输入商家名称" text-align="right"  class="font" title="商家名称" ></x-input>
      <x-input  placeholder-align="right" v-model="legal_name" placeholder="请输入商家负责人姓名" text-align="right"  class="font" title="姓名" ></x-input>
      <x-input  placeholder-align="right" v-model="license_number" :min="15" :max="18" placeholder="请输入商家负责人身份证号" text-align="right"  class="font" title="证件号码 " ></x-input>
      <x-input  placeholder-align="right" v-model="discount_ratio" placeholder="请设置折扣比例" text-align="right"  class="font" title="折扣比例" ></x-input>
      <cell class="cell font"  value="请上传" v-if="upcard" link="/Merchants_upcard?type=license_positive_img"   title="商家负责人身份证正面" is-link text-align="right" ></cell>
      <cell class="cell font"  value="已上传" v-if="!upcard" title="商家负责人身份证正面"  text-align="right" ></cell>
      <cell class="cell font"  value="请上传" v-if="downcard" link="/Merchants_upcard?type=license_negative_img"   title="商家负责人身份证反面" is-link text-align="right" ></cell>
      <cell class="cell font"  value="已上传" v-if="!downcard"  title="商家负责人身份证反面"  text-align="right" ></cell>
      <cell class="cell font"  value="请上传" v-if="handcard" link="/Merchants_upcard?type=user_license"   title="商家负责人手持身份证" is-link text-align="right" ></cell>
      <cell class="cell font"  value="已上传" v-if="!handcard"  title="商家负责人手持身份证"  text-align="right" ></cell>
      <popup-radio style="font-size: 14px"  title="行业分类" class="cell" v-model="industry_type"  :options="options1" ></popup-radio>
      <cell style="font-size: 14px" class="state cell" v-model="account_type"  title="账号类型" value="对私"  ></cell>
      <x-address title="所属区域"  class="font" v-model="belong_area" placeholder="请选择所属区域"   raw-value :list="addressData"  value-text-align="right"></x-address>
      <x-input  placeholder-align="right" v-model="bank_card" :min="16" :max="19" placeholder="请输入银行卡号" text-align="right"  class="font" title="银行卡号" ></x-input>
      <popup-radio style="font-size: 14px"  title="银行" class="cell" v-model="bank_name"  :options="optionsBink" ></popup-radio>
      <x-input  placeholder-align="right" v-model="open_bank" text-align="right" placeholder="请输入银行卡号的开户行"  class="font" title="开户行" ></x-input>
      <x-input  placeholder-align="right" v-model="account_name" text-align="right" placeholder="请输入账户名称"  class="font" title="账户名称" ></x-input>
    </group>
    <div class="btn"><x-button v-if="judge"  @click.native="submit">下一步</x-button></div>
    <div class="btn"><x-button v-if="!judge"  @click.native="judgeStore">下一步</x-button></div>
  </div>
</template>
<script type="es6">
  import {TransferDom,Radio,PopupRadio,XAddress, Popup,Group,Cell,XInput,XButton,Icon} from 'vux'
  import mixins from "../vuex/mixin.js"
  import addressData from '../assets/images/address.json'
  import http from "../ajax.js"
    export default {
        directives: {
        TransferDom
     },
    data(){
      return {
        pageName:"填写商户信息",
        bg:{white:false,grey:true},
        addressData:addressData,
        merchant_name:"",
        legal_name:"",
        license_number:"",
        license_positive_img:"",
        license_negative_img:"",
        user_license:"",
        discount_ratio:"",
        account_type:"对私",
        bank_card:"",
        industry_type:"请选择",
        bank_name:"请选择银行",
        open_bank:"",
        account_name:"",
        downcard:true,
        belong_area:[],
        options:[{
            key: '1',
            value: '对公'
          }, {
            key: '0',
            value: '对私'
          }],
        show:true,
        judge:true,
        upcard:true,
        downcard:true,
        handcard:true,
        options1:[{key:'1',value:'电子商务'},{key:'2',value:'建筑'},{key:'3',value:'管理'},{key:'4',value:'餐饮'}],
        optionsBink:[{key:'1',value:'建设银行'},{key:'2',value:'工商银行'},{key:'3',value:'农业银行'},{key:'4',value:'邮政'}]
      }
    },
    methods:{
      ID(){
        this.IdShow=true
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
        },
      submit(){
        let region=this.getName(this.belong_area)
        let data={
          merchant_name:this.merchant_name,merchant_type:0,legal_name:this.legal_name,license_number:this.license_number,
          license_positive_img:this.license_positive_img,license_negative_img:this.license_negative_img,industry_type:this.industry_type,
          user_license:this.user_license,discount_ratio:this.discount_ratio,account_type:2,
          bank_card:this.bank_card,bank_name:this.bank_name,open_bank:this.open_bank,account_name:this.account_name,
          province:region[0],city:region[1],area:region[2]
        }
        if(this.merchant_name.length==0||this.legal_name.length==0||this.license_number.length==0||this.license_positive_img.length==0
          ||this.license_negative_img.length==0||this.user_license.length==0||this.discount_ratio.length==0||this.bank_card.length==0||this.account_type.length==0||
          this.bank_name.length==0||this.open_bank.length==0||this.account_name.length==0||this.industry_type.length==0||this.belong_area.length==0
        ){
          this.$vux.toast.show({
            text:"请填写完整信息",
            type:"warn"
          })
          return
        }
        let IdCard=this.license_number
        let reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(!reg.test(IdCard)){
          this.$vux.toast.show({
            text:"请输入正确身份证号",
            type:"warn"
          })
            return
        }
        let bink=this.bank_card
        let reg_bink=/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
        if(!reg_bink.test(bink)){
          this.$vux.toast.show({
            text:"银行卡号不正确",
            type:"warn"
          })
          return
        }
        this.apiPost("http://r.huileyi.com/Merchant/perfectMerchant",data).then((res)=>{
          if(res.code==200){
              this.$vux.toast.show({
                text:"添加成功",
                type:"success"
              })
            this.$router.push('/appendMsg')
          }
        })
      },
      judgeStore(){
        this.apiPost("http://r.huileyi.com/Merchant/merchantStatus").then((res)=>{
          if(res.code==200){
             if(res.store_status=="0"){
              this.$router.push("/appendMsg")
             }
          }
        })
      }
    },
    mounted(){

      this.apiPost("http://r.huileyi.com/Merchant/merchantAuditInfo",{type:0}).then((res)=>{
        if(res.data.status=='0'){
          this.submit()
        }else if(res.data.status=='1'){
          this.judge=false
          this.account_name=res.data.account_name
          this.bank_card=res.data.bank_card
          this.bank_name=res.data.bank_name
          this.discount_ratio=res.data.discount_ratio
          this.industry_type=res.data.industry_type
          this.legal_license=res.data.legal_license
          this.legal_name=res.data.legal_name
          this.license_number=res.data.license_number
          this.open_bank=res.data.open_bank
          this.merchant_name=res.data.merchant_name
          this.belong_area=[res.data.province,res.data.city,res.data.area]
        }
      })
    },
      components:{
        Group,
        Cell,
        XInput,XButton,
        Icon,
        Popup,
        PopupRadio,
        XAddress
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Nolicense .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 22px;
    position: absolute;top:7px;left:4px;
    display:inline-block;
  }
  .Nolicense .cell .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 22px;
    position: absolute;top:7px;left:4px;
    display:inline-block;
  }
  .Nolicense .title{
    color:#FF4948!important;
    font-size: 14px;
    margin-top:0!important;
  }
  .Nolicense .icon{
    position:absolute;
    left:14px;
    top:13px;
  }
  .Nolicense .rel{
    position:relative;
  }
  .Nolicense .icon2{
    position:absolute;
    top:160px;
    left:16px;
  }
  .Nolicense .cell-x-icon {
    display: block;
    fill: green;
  }
  .Nolicense .btn{
    width:90%;
    margin:2rem auto;
  }
  .Nolicense .btn button{
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .Nolicense .group{
    margin-top:-23px;
  }
  .Nolicense .weui-input {
    font-size: 14px!important;
  }
  .Nolicense .font{
    font-size: 14px;
    position: relative;
  }
  .Nolicense .weui-icon-warn{
    font-size: 16px;
  }
  .Nolicense .weui-cell_access .weui-cell__ft{
    color:#000!important;
  }
  .Nolicense .weui-cells__title{
    margin:0 0 0 -5px!important;
    color:#636363;
  }
  .Nolicense .vux-cell-value{
    color:#000;
  }
  .Nolicense .style{
    color:red;
  }
  .Nolicense .weui-cell__bd{
    margin-right:12px!important;
  }
  .Nolicense .state .weui-cell__ft{
    color:#000;
    margin-right:14px;
  }
  .Nolicense .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
    color:#FF4948;
  }
</style>
