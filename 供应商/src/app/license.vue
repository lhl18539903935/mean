<template>
    <div class="license">
      <cell class="bitian" :title="('*为必填项')" style="position:relative;color: #FF4948;border-bottom: 1px solid #ddd;background: #E9E9E9">
        <img slot="icon" width="20" style="display:block;margin-right:5px;">
        <icon class="icon" width="20" type="warn"></icon>
      </cell>

      <group class="group">
        <x-input    placeholder-align="right" v-model="merchant_name"  placeholder="请输入商家名称" text-align="right"  class="font " title="商家名称" ></x-input>
        <x-input  v-if='type' placeholder-align="right" v-model="abbreviation" placeholder="请输入商家简称" text-align="right"  class="font " title="商家简称" ></x-input>
        <popup-radio  style="font-size: 14px"  title="行业分类" placeholder='请选择行业' v-model="industry_type" class="cell" :options="options1" ></popup-radio>
        <x-address title="所属区域" raw-value  class="font " v-model="belong_area" placeholder="请选择所属区域"   raw-value :list="addressData"  value-text-align="right"></x-address>
        <x-input   placeholder-align="right" v-model="discount_ratio"  placeholder="请设置折扣比例" text-align="right"  class="font " title="折扣比例" ></x-input>
        <x-input   placeholder-align="right" v-model="legal_name"  placeholder="请输入商家负责人姓名" text-align="right"  class="font " title="姓名" ></x-input>
        <x-input v-if="type == 1"   placeholder-align="right" v-model="certificate_number" :min="16" :max="18"   placeholder="请输入商家负责人证件号码" text-align="right"  class="font" title="证件号码" ></x-input>

        <x-input v-if="type == 0"   placeholder-align="right" v-model="license_number" :min="16" :max="18"   placeholder="请输入证件号码" text-align="right"  class="font" title="证件号码" ></x-input>
      </group>
      <group style="margin-top:-0.5rem">
        <cell class="cell font"  v-if='type'  :value="business_license?'已上传':'请上传'"   :link="'/upload?type=business_license&mtype='+type"   title="营业执照" is-link text-align="right" ></cell>

        <cell class="cell font"   :value="license_positive_img?'已上传':'请上传'"    :link="'/upload?type=license_positive_img&mtype='+type" title="商家负责人身份证正面" is-link text-align="right" ></cell>

        <cell class="cell font"   :value="license_negative_img?'已上传':'请上传'"  :link="'/upload?type=license_negative_img&mtype='+type" title="商家负责人身份证反面" is-link text-align="right" ></cell>
        <cell class="cell font"  v-if='type == 0'  :value="user_license?'已上传':'请上传'"  :link="'/upload?type=user_license&mtype='+type" title="手持身份证照片" is-link text-align="right" ></cell>
        <cell  v-if='type'  class="font"  :value="trade_license?'已上传':'请上传'" title="行业许可证"   is-link :link="'/upload?type=trade_license&mtype='+type"></cell>

        <div   v-if='type'   style="color:#FF4948;font-size: 12px;margin-left:13px;margin-right:10px;margin-bottom:10px;">

            <div style='width:8%;float:left;'> <icon class="icon2" width="16" type="warn"></icon></div>

          <div  style="color:#FF4948;float:right;width:92%;line-height:1.5em;">
          如果您的行业属于医药行业、旅游行业、油气危险品行业,请务必提供行业许可证。</div>
          <div style='clear:both;'></div>
          </div>
        <div style='clear:both;'></div>
        <popup-radio   v-if='type' style="font-size: 14px" v-model="account_type" class="cell" placeholder='请选择账号类型'  title="账号类型" :options="options" ></popup-radio>

          <x-input readonly v-if='type==0' placeholder-align="right" v-model="duisi" placeholder="账号" text-align="right"  class="font " title="账号类型" ></x-input>

        <x-input   placeholder-align="right" v-model="bank_card" :min="16" :max="19" placeholder="请输入银行卡号" text-align="right"  class="font" title="银行卡号" ></x-input>
        <popup-radio  style="font-size: 14px"  title="银行" class="cell" placeholder='请选择银行' v-model="bank_name"  :options="optionsBink" ></popup-radio>
        <x-input   placeholder-align="right" v-model="open_bank" text-align="right" placeholder="请输入开户行"  class="font" title="开户行" ></x-input>

        <cell  placeholder-align="right" v-show="account_type == 1" :link="'/upload?type=open_permit&mtype='+type" text-align="right" :value="open_permit?'已上传':'请上传'" is-link class="font" title="开户行许可证"></cell>

        <x-input   placeholder-align="right" v-model="account_name" text-align="right" placeholder="请输入账号名称"  class="font" title="账户名称" ></x-input>
      </group>
      <div class="btn"><x-button  @click.native="submit">下一步</x-button></div>
    </div>
</template>
<script type="es6">
  import {TransferDom,Radio,XAddress, Popup,Group,Cell,XInput,XButton,Icon} from 'vux'
  import PopupRadio from '../components/popup-radio/index.vue'
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
        account_type:'',
        pageFooter:true,
        bg:{white:false,grey:true},
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
        optionsBink:[{key:'1',value:'建设银行'},{key:'2',value:'工商银行'},{key:'3',value:'农业银行'},{key:'4',value:'邮政'}],
        merchant_name:'',
        industry_type:'',
        discount_ratio:'',
        legal_name:'',
        certificate_number:'',
        license_positive_img:'',
        license_negative_img:'',
        trade_license:'',
         account_type:'',
         bank_card:'',
        bank_name:'',
        open_bank:'',
        account_name:'',
        open_permit:'',
        abbreviation:'',
        belong_area:[],
        business_license:'',
        user_license:'',
        license_number:''
      }
    },
    methods:{
      getData(){
        let data={
            merchant_name:this.merchant_name,
            industry_type:this.industry_type,
            discount_ratio:this.discount_ratio,
            legal_name:this.legal_name,
            license_positive_img:this.license_positive_img,
            license_negative_img:this.license_negative_img,
             account_type:this.account_type,
             bank_card:this.bank_card,
            bank_name:this.bank_name,
            open_bank:this.open_bank,
            account_name:this.account_name,
        }
            let region=this.getName(this.belong_area)
            data.province=region[0];
            data.city=region[1];
            data.area=region[2];

        if(this.type == 1){
            data.merchant_type=1;
            data.abbreviation=this.abbreviation;
            data.business_license=this.business_license;
            if(this.account_type == 1){
              data.open_permit=this.open_permit;
            }
            //行业许可证
            if(this.trade_license) data.trade_license=this.trade_license,
            data.certificate_number=this.certificate_number;  //证件号码
        }

        if(this.type == 0){
            data.user_license=this.user_license;
            data.license_number=this.license_number;
        }
        return data;
      },
      setData(data){

            this.merchant_name=data.merchant_name;
            this.industry_type=data.industry_type;
            this.discount_ratio=data.discount_ratio;
            this.legal_name=data.legal_name;
            this.license_positive_img=data.license_positive_img;
            this.license_negative_img=data.license_negative_img;
            this.trade_license=data.trade_license;
            this.account_type=data.account_type;
            this.bank_card=data.bank_card;
            this.bank_name=data.bank_name;
            this.open_bank=data.open_bank;
            this.account_name=data.account_name;

             if(data.province && data.province !='undefined'){
              this.belong_area=[data.province,data.city,data.area];
            }else{
              //this.belong_area=[]
            }

            //有营业执照
        if(this.type == 1){
            this.abbreviation=data.abbreviation;
            this.business_license=data.business_license;
            this.certificate_number=data.certificate_number; 
            if(this.account_type == 1){
              this.open_permit=data.open_permit;
            }
        }
        //无营业执照
        if(this.type == 0){
          this.user_license=data.user_license;
          this.license_number=data.license_number;
        }
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
        let data=this.getData();

        // alert(JSON.stringify(data))
        for(let d in data){
          if(!data[d]){
             //alert(d)
            this.$vux.toast.show({
            text:"请填写信息完整",
            type:"warn"
             })

            return;
          }
        }

/*      console.log('new')
        console.log(data);return;*/
        var idCard;
        if(this.type == 0){
            idCard=this.license_number
        }else{
            idCard=this.certificate_number
        }


        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(!reg.test(idCard)){
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
      },
      setImg(){
          let business_license=localStorage.getItem('business_license');
          let license_positive_img=localStorage.getItem('license_positive_img');
          let license_negative_img=localStorage.getItem('license_negative_img');
          let trade_license=localStorage.getItem('trade_license');
          let user_license=localStorage.getItem('user_license');
          let open_permit=localStorage.getItem('open_permit');

          //共有的图片
          this.license_positive_img  = license_positive_img?license_positive_img:this.license_positive_img;
          this.license_negative_img  = license_negative_img?license_negative_img:this.license_negative_img;

          //无营业执照
          if(this.type == 0){
            this.user_license  = user_license?user_license:this.user_license;
          }
          //有营业执照
          if(this.type == 1){
            this.business_license  = business_license?business_license:this.business_license;
            if(trade_license) this.trade_license  = trade_license?trade_license:this.trade_license;
            if(this.account_type == 1) this.open_permit=open_permit?open_permit:this.open_permit;
          }
         
      }
    },
    mounted(){
      this.type=this.$route.query.type=='yes' ?1:0;

      let vm=this;
      this.apiPost("http://r.huileyi.com/Merchant/merchantAuditInfo",{type:this.type}).then((res)=>{
        if(res.code==200){
          this.setData(res.data)
            if(vm.type == 0){
                vm.account_type=2;
            }

        }else{
          this.$vux.toast.show({
              text:res.msg,
              type:"warn"
          })
        }
      })
    },
    activated(){
      this.type=this.$route.query.type=='yes' ?1:0;
      if(this.type == 0){
        this.account_type =2;
      }
      this.setImg();
      this.$store.commit('setBg',this.bg)
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
    font-size: 18px;
    position: absolute;top:7px;left:4px;
    display:inline-block;
  }
  .license .cell .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 18px;
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
