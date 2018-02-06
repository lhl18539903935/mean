<template>
    <div class="license">
      <cell class="bitian" :title="('*为必填项')" style="position:relative;color: #FF4948;border-bottom: 1px solid #ddd;background: #E9E9E9">
        <img slot="icon" width="20" style="display:block;margin-right:5px;">
        <icon class="icon" width="20" type="warn"></icon>
      </cell>

      <group class="group">
        <x-input @on-change='change'   placeholder-align="right" v-model="allData.merchant_name"  placeholder="请输入商家名称" text-align="right"  class="font " title="商家名称" ></x-input>
        <x-input @on-change='change' v-if='type' placeholder-align="right" v-model="allData.abbreviation" placeholder="请输入商家简称" text-align="right"  class="font " title="商家简称" ></x-input>
        <popup-radio @on-hide='change'  v-if='type'  style="font-size: 14px"  title="行业分类" v-model="allData.industry_type" class="cell" :options="options1" ></popup-radio>
        <x-address @on-hide='change' title="所属区域"  v-if='type'   class="font " v-model="allData.belong_area" placeholder="请选择所属区域"   raw-value :list="addressData"  value-text-align="right"></x-address>
        <x-input @on-change='change'  placeholder-align="right" v-model="allData.discount_ratio"  placeholder="请设置折扣比例" text-align="right"  class="font " title="折扣比例" ></x-input>
        <x-input @on-change='change'  placeholder-align="right" v-model="allData.legal_name"  placeholder="请输入商家负责人姓名" text-align="right"  class="font " title="姓名" ></x-input>
        <x-input @on-change='change'  placeholder-align="right" v-model="allData.certificate_number" :min="15" :max="18"   placeholder="请输入商家负责人证件号码" text-align="right"  class="font" title="证件号码" ></x-input>
      </group>
      <group style="margin-top:-0.5rem">
        <cell class="cell font"  v-if='type'  :value="allData.business_license?'已上传':'请上传'"   link="/upload?type=business_license"   title="营业执照" is-link text-align="right" ></cell>

        <cell class="cell font"   :value="allData.license_positive_img?'已上传':'请上传'"    link="/upload?type=license_positive_img" title="商家负责人身份证正面" is-link text-align="right" ></cell>

        <cell class="cell font"   :value="allData.license_negative_img?'已上传':'请上传'"  link="/upload?type=license_negative_img" title="商家负责人身份证反面" is-link text-align="right" ></cell>
        <cell  v-if='type'  class="font"  :value="allData.trade_license?'已上传':'请上传'" title="行业许可证"   is-link link="/upload?type=trade_license"></cell>

        <div   v-if='type'   style="color:#FF4948;font-size: 12px;width:90%;margin:0 auto;">

            <div style='width:5%;float:left;margin-top:5px;'> <icon class="icon2" width="20" type="warn"></icon></div>

          <div  style="color:#FF4948;float:right;width:90%;">
          如果您的行业属于医药行业、旅游行业、油气危险品行业,请务必提
          供行业许可证。</div>
          <div style='clear:both;'></div>
          </div>
        <div style='clear:both;'></div>
        <popup-radio   @on-hide='change' v-if='type' style="font-size: 14px" v-model="allData.account_type" class="cell"  title="账号类型" :options="options" ></popup-radio>

          <x-input readonly v-if='type==0' placeholder-align="right" v-model="duisi" placeholder="账号" text-align="right"  class="font " title="账号类型" ></x-input>

        <x-input @on-change='change'  placeholder-align="right" v-model="allData.bank_card" :min="16" :max="19" placeholder="请输入银行卡号" text-align="right"  class="font" title="银行卡号" ></x-input>
        <popup-radio  @on-hide='change' style="font-size: 14px"  title="银行" class="cell" v-model="allData.bank_name"  :options="optionsBink" ></popup-radio>
        <x-input @on-change='change'  placeholder-align="right" v-model="allData.open_bank" text-align="right" placeholder="请输入开户行"  class="font" title="开户行" ></x-input>
        <cell  placeholder-align="right"  v-show="allData.account_type == 1" link="/upload?type=open_permit" text-align="right" value="请上传" is-link class="font" :title="('*开户行许可证')"></cell>

        <x-input @on-change='change'  placeholder-align="right" v-model="allData.account_name" text-align="right" placeholder="请输入账号名称"  class="font" title="账户名称" ></x-input>
      </group>
      <div class="btn"><x-button  @click.native="submit">下一步</x-button></div>
    </div>
</template>
<script type="es6">
  import {TransferDom,Radio,PopupRadio,XAddress, Popup,Group,Cell,XInput,XButton,Icon} from 'vux'
  import addressData from '../assets/images/address.json'
  import upload from '../upload.js'
    export default {
        directives: {
        TransferDom
     },
    data(){
      return {
        duisi:'对私',
        pageName:"填写商户信息",
        pageFooter:true,
        bg:{white:false,grey:true},
        allData:{},
        addressData:addressData,
        options:[
          {
            key: '1',
            value: '对公',
          }, {
            key: '2',
            value: '对私',
          }],
        show:true,
        type:'',
        downcard:true,
        upcard:true,
        business:true,
        xukezheng:true,
        options1:[{key:'1',value:'电子商务'},{key:'2',value:'建筑'},{key:'3',value:'管理'},{key:'4',value:'餐饮'}],
        optionsBink:[{key:'1',value:'建设银行'},{key:'2',value:'工商银行'},{key:'3',value:'农业银行'},{key:'4',value:'邮政'}]
      }
    },
    methods:{
      change(){
        //alert(this.allData.merchant_name)

       let data={
        merchant_name:this.allData.merchant_name,
        abbreviation:this.allData.abbreviation,
        industry_type:this.allData.industry_type,
        belong_area:this.allData.belong_area,
        discount_ratio:this.allData.discount_ratio,
        legal_name:this.allData.legal_name,
        certificate_number:this.allData.certificate_number,
        business_license:this.allData.business_license,
        license_positive_img:this.allData.license_positive_img,
        license_negative_img:this.allData.license_negative_img,
        trade_license:this.allData.trade_license,
        account_type:this.allData.account_type,
        bank_card:this.allData.bank_card,
        bank_name:this.allData.bank_name,
        open_bank:this.allData.open_bank,
        account_name:this.allData.account_name
       }
        localStorage.setItem('allData',JSON.stringify(data));

      },
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

        let region=this.getName(this.allData.belong_area)

        let data=this.allData
        data.province=region[0];
        data.city=region[1];
        data.area=region[2];
        data.merchant_type=1;
        data.certifi_type=1;
        console.log(this.allData)
       /* if( !this.allData.merchant_name || !this.allData.abbreviation || !this.allData.industry_type || !this.allData.certificate_number ||
           !this.allData.legal_name || !this.allData.business_license || !this.allData.license_positive_img || !this.allData.license_negative_img || !this.allData.discount_ratio || !this.allData.account_type || !this.allData.bank_card || !this.allData.bank_name || !this.allData.open_bank || !this.allData.open_permit || !this.allData.account_name || !this.allData.belong_area
        ){
          this.$vux.toast.show({
            text:"请填写信息完整",
            type:"warn"
          })
          return
        }*/
   /*     for(let d in this.allData){
          if(!this.allData[d]){

            this.$vux.toast.show({
            text:"请填写信息完整",
            type:"warn"
             })
            return;
          }
        }
        let IdCard=this.allData.certificate_number
        let reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(!reg.test(IdCard)){
          this.$vux.toast.show({
            text:"请输入正确身份证号",
            type:"warn"
          })
            return
        }
        let bink=this.allData.bank_card
        let reg_bink=/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
        if(!reg_bink.test(bink)){
          this.$vux.toast.show({
            text:"银行卡号不正确",
            type:"warn"
          })
          return
        }*/
        this.apiPost("http://r.huileyi.com/Merchant/perfectMerchant",data).then((res)=>{
             if(res.code==200){
                this.$vux.toast.show({
                    text:"保存成功",
                    type:"success"
                })
                this.$router.push('/chose')
            }else{
              this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
            }
        })
      }
    },
    mounted(){
      this.type=this.$route.query.type=='yes' ?1:0;

      let vm=this;
      this.apiPost("http://r.huileyi.com/Merchant/merchantAuditInfo",{type:this.type}).then((res)=>{
        if(res.code==200){

            if(res.data){
              vm.allData=res.data
            }
            let data=JSON.parse(localStorage.getItem('allData'))
            for(let d in data){
              vm.allData[d]=data[d]
            }
            if(vm.type == 0){
                vm.allData.account_type=2;
            }


            vm.allData.business_license  = localStorage.getItem('business_license')
            vm.allData.license_positive_img  = localStorage.getItem('license_positive_img')
            vm.allData.license_negative_img  = localStorage.getItem('license_negative_img')
            vm.allData.trade_license = localStorage.getItem('trade_license')
            //vm.allData.user_license = localStorage.getItem('user_license')

        }else{
          this.$vux.toast.show({
              text:res.msg,
              type:"warn"
          })
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
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .license .font{
    font-size: 14px;
    position: relative;
  }
  .license .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 22px;
    position: absolute;top:7px;left:4px;
    display:inline-block;
  }
  .license .cell .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 22px;
    position: absolute;top:7px;left:4px;
    display:inline-block;
  }
  .license .title{
    color:#FF4948!important;
    font-size: 14px;
    margin-top:0!important;
  }
  .license .icon{
    position:absolute;
    left:14px;
    top:13px;
  }
  .license .rel{
    position:relative;
  }
  .license .icon2{
    top:160px;
    left:16px;
  }
  .license .cell-x-icon {
    display: block;
    fill: green;
  }
  .license .btn{
    width:90%;
    margin:2rem auto;
  }
  .license .btn button{
    background: #FF4948;
    color:#fff;
    font-size: 16px;
  }
  .license .group{
    margin-top:-23px;
  }
  .license .weui-input {
    font-size: 14px!important;
  }

  .license .weui-icon-warn{
    font-size: 16px;
  }
  .license .weui-cell_access .weui-cell__ft{
    color:#000!important;
  }
  .license .weui-cells__title{
    margin:0 0 0 -5px!important;
    color:#636363;
  }
  .license .vux-cell-value{
    color:#000;
  }
  .license .style{
    color:red;
  }
  .license .weui-cell__bd{
    margin-right:12px!important;
  }
  .license .vux-flexbox .vux-flexbox-item{
    color:#FF4948;
  }
  .license .vux-popup-picker-header{
    color:#FF4948;
  }
  .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
    color:#FF4948!important;
  }
</style>
