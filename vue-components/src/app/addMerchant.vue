<template>
    <div class="add" style="position:absolute;top:3rem;left:0;right:0;bottom:0;overflow:scroll;margin-bottom:3rem">
      <cell class="bitian" :title="('*为必填项')" style="margin-bottom:-1rem;position:relative;color: #FF4948;border-bottom: 1px solid #ddd;background: #E9E9E9">
        <img slot="icon" width="20" style="display:block;margin-right:5px;">
        <icon class="icon" width="16" type="warn"></icon>
      </cell>
      <group   label-width="6em" class="group">
        <x-input class="font" @on-change="change" placeholder-align="right" text-align="right" v-model='allData.merchant_name' title="商家名称" placeholder="请填写商家名称"></x-input>
        <x-input class="font" @on-change="change" placeholder-align="right" text-align="right" v-if="type == 'yes'"  v-model='allData.abbreviation' title="商家简称" placeholder="请填写商家简称"></x-input>
        <popup-radio @on-change="change"  placeholder-align="right" value-align="right"  style="font-size: 14px" placeholder="请选择行业" v-model="allData.industry_type" class="industry_type"  title="行业分类" :options="options1" ></popup-radio>
        <x-address @on-change="change" style="font-size:14px;"  placeholder="请选择所属区域"  title="所属区域"  v-model="region" raw-value :list="addressData" value-text-align="right"></x-address>
        <x-input class="font" @on-change="change" type='text' placeholder-align="right" text-align="right"  :max="3" v-model='allData.discount_ratio'  title="折扣比例" placeholder="请填写折扣比例"></x-input>
        <x-input class="font" @on-change="change" v-model='allData.name' title="姓名" placeholder-align="right" text-align="right" placeholder="请填写商家负责人姓名"></x-input>
        <x-input class="font" @on-change="change" :min='16' :max='18' placeholder-align="right" text-align="right" v-model='allData.license_number' title="证件号码" placeholder="请填写商家负责人身份证号"></x-input>
        <div class="duani">
          <x-input class="font" @on-change="change" v-model='allData.mobile' :max="11" placeholder-align="right" text-align="right" title="联系电话" placeholder="请填写联系电话"></x-input>
          <countdown style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>
          <x-input title="短信验证码" @on-change="change" v-model='allData.code' class="weui-vcode font"  placeholder="请填写短信验证码">
            <x-button style="background: #6594FE;" :disabled="disable001" slot="right" type="primary" mini @click.native='huoqu'>{{butval}}<span v-if="time1">{{time1}}s后重新发送</span></x-button>
          </x-input>
        </div>
      </group>
      <group label-width="11em" label-margin-right="2em" class="groupstyle">

        <cell class="font" @on-change="change" title="营业执照" v-if="type == 'yes'" :value="allData.business_license?'已上传':'请上传'" is-link link='/upload?type=business_img'  ></cell>
          <cell class="font" @on-change="change" title="商家负责人身份证正面" :value="allData.license_positive_img?'已上传':'请上传'" is-link link='/upload?type=positive_img'  ></cell>
          <cell class="font" @on-change="change"  title="商家负责人身份证反面" :value="allData.license_negative_img?'已上传':'请上传'" is-link link='/upload?type=negative_img'  ></cell>
        <cell class="font" @on-change="change"  title="商家负责人手持身份证"  v-if="type1 == 0"  :value="allData.user_license?'已上传':'请上传'" is-link link='/upload?type=user_license'  ></cell>
        <cell class="font"  @on-change="change" title="合同" :value="allData.contract?'已上传':'请上传'" is-link link='/upload?type=contract'  ></cell>
        <cell  v-if='type1==1' @on-change="change"  :value="allData.trade_license?'已上传':'请上传'"  class="font trade"   title="行业许可证"  :link="'/upload?type=trade_license&mtype='+type"></cell>
        <div   v-if='type1==1'  @on-change="change"  style="color:#FF4948;font-size: 12px;margin-left:13px;margin-right:10px;margin-bottom:10px;">
          <div style='width:8%;float:left;'> <icon class="icon2" width="16" type="warn"></icon></div>
          <div  style="color:#FF4948;float:right;width:92%;line-height:1.5em;">
            如果您的行业属于医药行业、旅游行业、油气危险品行业,请务必提供行业许可证。</div>
          <div style='clear:both;'></div>
        </div>
        <div style='clear:both;'></div>
        <popup-radio @on-change="change"   v-if='type1 == 1'  style="font-size: 14px"  v-model="allData.account_type" class="cell" placeholder='请选择类型'  title="账号类型" :options="options" ></popup-radio>
        <cell   style="font-size: 14px" v-if="type1==0" value="对私" class="cell duisi" placeholder=''  title="账号类型"  ></cell>
        <x-input  @on-change="change" label-width="5rem" placeholder-align="right" v-model="allData.bank_card" :min="16" :max="19" placeholder="请输入银行卡号" text-align="right"  class="font" title="银行卡号" ></x-input>
        <popup-radio @on-change="change" style="font-size: 14px"  title="银行" class="cell" placeholder='请选择银行' v-model="allData.bank_name"  :options="optionsBink" ></popup-radio>
        <x-input  @on-change="change" placeholder-align="right" v-model="allData.open_bank" text-align="right" placeholder="请输入开户行"  class="font" title="开户行" ></x-input>
        <cell class="font" @on-change="change" v-show="isshow" title="开户行许可证" :value="allData.open_permit?'已上传':'请上传'" is-link link='/upload?type=open_permit'></cell>
        <x-input title="账户名称" @on-change="change" class="font" placeholder-align="right" text-align="right" placeholder="请添加账户名称"  v-model="allData.account_name"></x-input>
        <cell class="font borderline" @on-change="change" title="关联乐码"  :value="qrcode_num"  is-link :link="'/choseCode?type='+type"  ></cell>
     </group>
          <div style="width:90%;margin:2rem auto;"><x-button @click.native='save' style="background: #6594FE;font-size: 16px;color:#fff;">保存</x-button></div>

    </div>
</template>
<script type="es6">

  import {XInput,Cell,XButton,XAddress,Countdown,PopupPicker,Selector,Icon,PopupRadio} from "vux"
  import Group from '../components/group/index.vue'
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"添加商家",
          type:'',
          addressData: addressData,
          options1: [],
          butval:'获取验证码',
          account_type:'',
          openbinkimg:false,
          bank_card:'',
          options:[
          {
            key: '1',
            value: '对公',
          }, {
            key: '2',
            value: '对私',
          }],
          optionsBink:[{key:'1',value:'建设银行'},{key:'2',value:'工商银行'},{key:'3',value:'农业银行'},{key:'4',value:'邮政'}],

          allData:{},
          region:[],
          qrcode_num:"请关联万商万码",
          addMerchant:"",
          bank_name:"",
          open_bank:"",
          value:'',
          time1:0,
          show: true,
          start: false,
          disable001:false,
          accountType:[{key:1,value:''},{key:12,value:''}],
          type1:'',
          isshow:false
        }
      },
      watch:{
        region(){
          this.allData.region=this.region;
          this.change();

        }
      },
      methods:{
        getCategory(){
            let vm=this;
             this.apiPost(this.rhost+'/Wsuser/industryClass').then((res)=>{
              if(res.code==200){
                let data=[];
                for(let d of res.data){
                  data.push({
                    key:d.industry_id,
                    value:d.industry_name
                  })
                }
                vm.options1=data;
               }
            })
        },
        getAddress: function (value) {
          var adr = [];
          for (var r in this.addressData) {
            var index = this.addressData[r];
            for (var i in value) {
              var a = value[i]
              if (a == index.value) adr.push(index.name);
            }
          }
          return adr;
        },
        change(){
          let local=localStorage;
            local.setItem('allData',JSON.stringify(this.allData));
            if(this.allData.account_type == 1 && this.type1){
              this.isshow=true;
            }else{
              this.isshow=false;
            }
        },
          finish (index) {
            this.show = false
            this.value = 'completed'
          },
           finish2 (index) {
            this.time1 = 0
            this.start = false
            this.butval='获取验证码'
            this.disable001=false
          },
          huoqu(){
            if(this.allData.mobile.length==0){
                this.$vux.toast.show({
                    text: '请填写手机号',
                    type: "text",position:'bottom',
                })
            }else{
              //验证手机号
              var myreg = /^0?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
              if(!myreg.test(this.allData.mobile))
              {
                  this.$vux.toast.show({
                      text: '请填写正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }

              this.butval=''
              this.time1=60
              this.start=true;
              this.disable001=true;
              this.apiPost(this.rhost+'/home/getCode', {type:'addMerchant',mobile:this.allData.mobile}).then((res) => {
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "success"
                  })
              })
            }
          },
          save(){
            //验证身份证号
               // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
              /* var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
               if(reg.test(this.allData.license_number) === false)
               {
                   this.$vux.toast.show({
                      text: '请填写正确的身份证号！',
                      type: "text",position:'bottom',
                  })
                   return  false;
               }*/
               var address=this.getAddress(this.region)

               this.allData.province=address[0]
               this.allData.city=address[1]
               this.allData.area=address[2]
        if(this.type == 'yes'){
          this.allData.merchant_type=1
           if(!this.allData.business_license ||!this.allData.abbreviation){
            this.$vux.toast.show({
                      text: "请填写完整信息",
                      type: "text",position:'bottom',
                  })
                  return false
           }
        }else{
          this.allData.merchant_type=0
          this.allData.account_type=2
        }
        if(!this.allData.merchant_name||
        !this.allData.contract||
        !this.allData.industry_type||this.region.length==0||!this.allData.license_number||
        !this.allData.discount_ratio||!this.allData.name||
        !this.allData.mobile||!this.allData.license_positive_img||
        !this.allData.license_negative_img||!this.allData.contract||
        !this.allData.bank_card||!this.allData.bank_name||!this.allData.open_bank||!this.allData.account_name||this.qrcode_num==null){
              this.$vux.toast.show({
                      text: "请填写完整信息",
                      type: "text",position:'bottom',
                  })
                  return false
        }
        if(isNaN(this.allData.discount_ratio)){
          this.$vux.toast.show({
            text:"折扣比例必须为数字",
            type:"warn"
             })
          return;
        }

        if(this.allData.discount_ratio<1.1 || this.allData.discount_ratio >9.9){
          this.$vux.toast.show({
            text:"折扣比例在1.1~9.9之间！",
            type:"warn"
             })
          return;
        }

        let dec=this.allData.discount_ratio.toString().split('.');
        if(dec.length == 2){
          if(dec[1].length >1){
            this.$vux.toast.show({
            text:"折扣比例最多精确到小数点后一位！",
            type:"warn"
            })
            return;
          }
        }

            this.apiPost(this.phost+'/Merchant/addMerchant', this.allData).then((res) => {
                if(res.code==200){
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "success"
                  })
                  this.$router.push({path: '/merchant'});
                  localStorage.setItem('frontUrl','');
                  localStorage.setItem('backUrl','');
                  localStorage.setItem('shenfenpictur','');
                  this.allData=[]
                }else{
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "text",position:'bottom',
                  })
                //localStorage.setItem('frontUrl','');
                //localStorage.setItem('backUrl','');
                //localStorage.setItem('shenfenpictur','');
                }

            })

        },

      },
      mounted:function(){

        this.qrcode_num=this.$route.query.qrcode_num
        this.addMerchant=this.$route.query.addMerchant
        this.getCategory()
        let vm=this;
        let data=JSON.parse(localStorage.getItem('allData'));
        for(let i in data){
          this.allData[i]=data[i]

        }
        this.type=this.$route.query.type;
        this.type1=this.$route.query.type=='yes' ?1:0;
        this.allData.business_license=localStorage.getItem('business_img')

        this.allData.license_positive_img=localStorage.getItem('positive_img')
        this.allData.license_negative_img=localStorage.getItem('negative_img')
        this.allData.contract=localStorage.getItem('contract')
        this.allData.user_license=localStorage.getItem('user_license')
        this.allData.open_permit=localStorage.getItem('open_permit')
        this.allData.trade_license=localStorage.getItem('trade_license')

        this.allData.qrcode_id=sessionStorage.getItem('qrcode_id')
        vm.region=vm.allData.region
      },
      components:{
        Group,XInput,Cell,XButton,XAddress,Countdown,Selector,Icon,PopupRadio,PopupPicker
      },
      mixins:[window.mixins,window.http,window.addressData]
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .add .weui-input{
    text-align: left;
  }
  .add .vux-x-icon {
    fill: #6594fe;
}
  .add .icon{
    position:absolute;
    left:14px;
    top:13px;
  }

  .add .bitian .weui-icon-warn {
    color:#6594FE;
    font-size: 17px;
  }
  .weui-icon-warn{
    font-size: 17px!important;
  }
  .add .bitian .vux-label{
    color:#6594FE;
  }
  .add .bitian .vux-cell-primary:before{
    content: ''!important;
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .add .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .add .industry_type .vux-label:before{
    content: '*'!important;
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .add .industry_type .vux-cell-primary:before{
    content: ''!important;
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .add .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
    .add .trade .weui-icon-warn {
    color:#FF4948;
    font-size: 17px;
  }
    .add .trade .vux-cell-primary:before{
    content: ''!important;
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .add .red {
    color: red;
  }
  .add .green {
    color: #6594FE;
  }
  .add .font{
    font-size: 14px;
  }
  .add .duani{
    position: relative;
    border-top:1px solid #f3f3f3;
  }
  .add .fonts{
    position: absolute;
    left: 66%;
    top: 25%
  }
  .add .weui-cells_form .weui-cell__ft{
    position: absolute !important;
    right: 1rem !important;
  }
  .add .vux-cell-value{
    color:#000;
  }

  .add .duisi .weui-cell__ft{color:#000;}
  .add .weui-cells{margin-top: 10px;}
  .add .address{font-size: 14px;}
  .add .address .weui-cell_access .weui-cell__ft:after{display:none;}
  .add .vux-selector.weui-cell_select-after{font-size: 14px;}
  .add .weui-btn_mini{padding:0 0.8em !important;font-size: 12px;margin-right:-7px;}
</style>
