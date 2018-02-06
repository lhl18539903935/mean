<template>
    <div class="addNext">
      <group  class="weui-cells_form " label-width="5.5em">

        <x-input class="font add" @on-change="change" @on-blur="blurPho" :min="0" :max="11" v-model='phoneval' title="手机号" placeholder="请输入手机号"></x-input>
        <div class="duani">
          <countdown style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>
          <x-input @on-change="change" title="短信验证码" v-model='codeval' class="weui-vcode font add"  placeholder="请输入短信验证码">
            <x-button style="background: #6594FE;" :disabled="disable001" slot="right" type="primary" mini @click.native='huoqu'>{{butval}}<span v-if="time1">{{time1}}s后重新发送</span></x-button>
          </x-input>
        </div>
          </group>
      <group label-width="5.5em" label-margin-right="2em" label-align="justify" v-if="persondetail">
          <x-input class="font" placeholder-align="right" text-align="right" @on-change="change" v-model='nameval' title="姓名" placeholder="请输入姓名"></x-input>
        <x-input title="身份证号" placeholder-align="right" text-align="right" @on-change="change" v-model='idval' class="font" placeholder="请输入身份证号"></x-input>

        <x-address style="font-size:14px;"  @on-hide="change" placeholder='请选择所属区域' title="所属区域" v-model="addressval"  :list="addressData" value-text-align="right"></x-address>

        <x-input class="font" @on-change="change" placeholder-align="right" text-align="right" v-model='companyval' title="公司名称" placeholder="请输入公司名称"></x-input>


          <cell class="font" :title="item.title" :value="item.value" is-link :link='item.link' v-for="(item,index) in list" :key="index"></cell>
      </group>
      <div style="width:90%;margin:2rem auto;"><x-button @click.native='save' style="background: #6594FE;font-size: 16px;color:#fff;">保存</x-button></div>
    </div>
</template>
<script type="es6">
  import {Group,XInput,Cell,XButton,XAddress,Countdown} from "vux"
    export default {
      data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"添加服务商",
          addressData: addressData,
          addressval: [],
          butval:'获取验证码',
          list:[
            {title:"身份证正面",value:"请上传",link:'/upload?type=card_positive_img'},
            {title:"身份证背面",value:"请上传",link:'/upload?type=card_negative_img'},
            {title:"营业执照",value:"请上传",link:'/upload?type=business_license'}
          ],
          nameval:'',
          phoneval:'',
          codeval:'',
          idval:'',
          addesval:'',
          companyval:'',
          time1:0,
          show: true,
          start: false,
          disable001:false,
          zhengmianpictur:'',
          fanmianpictur:'',
          shenfenpictur:'',
          agentData:{},
          persondetail:false
        }
      },
      methods:{
        blurPho(){
             var myreg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
              if(!myreg.test(this.phoneval)){return false;}
            this.isDlsByMobile()
        },
        isDlsByMobile(){
          this.apiPost(this.phost+'/Dls/isDlsByMobile',{mobile:this.phoneval}).then((res)=>{
            if(res.is_dls==0){
              this.persondetail=true
            }else{
               this.persondetail=false
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
          let local=sessionStorage;
            let agentData={
              nameval:this.nameval,
              phoneval:this.phoneval,
              codeval:this.codeval,
              idval:this.idval,
              addressval:this.addressval,
              companyval:this.companyval,
            }
            localStorage.setItem("addressval",this.addressval)
            local.setItem('agentData',JSON.stringify(agentData));
        },
          finish (index) {
            this.show = false
          },
           finish2 (index) {
            this.time1 = 0
            this.start = false
            this.butval='获取验证码'
            this.disable001=false
          },
          huoqu(){
            if(this.phoneval.length==0){
                this.$vux.toast.show({
                    text: '请输入手机号',
                    type: "text",position:'bottom',
                })
            }else{
              //验证手机号
              var myreg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
              if(!myreg.test(this.phoneval))
              {
                  this.$vux.toast.show({
                      text: '请输入正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }

              this.butval=''
              this.time1=60
              this.start=true;
              this.disable001=true;
              this.apiPost(this.rhost+'/home/getCode', {type:'addDls',mobile:this.phoneval}).then((res) => {
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "success"
                  })
              })
            }
          },
          save(){

            this.zhengmianpictur=localStorage.getItem('card_positive_img');
            this.fanmianpictur=localStorage.getItem('card_negative_img');
            this.shenfenpictur=localStorage.getItem('business_license');
            var getadd = this.getAddress(this.addressval);
            if(getadd[0] == undefined && getadd[1] == undefined && getadd[2] == undefined){
               getadd[0] = ''
               getadd[1] = ''
               getadd[2] = ''
            }
            if(this.zhengmianpictur == null) this.zhengmianpictur=''
            if(this.fanmianpictur == null) this.zhengmianpictur=''
            if(this.shenfenpictur == null) this.shenfenpictur=''
            if(!this.phoneval||!this.codeval){
                this.$vux.toast.show({
                    text: '请填写完整信息',
                    type: "text",position:'bottom',
                })
                return;
            }

              //验证身份证号
               // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
               // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
               // if(reg.test(this.idval) === false)
               // {
               //   this.$vux.toast.show({
               //      text: '请输入正确的身份证号！',
               //      type: "text",position:'bottom',
               //    })
               //     return;
               // }

              let data={name:this.nameval,mobile:this.phoneval,code:this.codeval,province:getadd[0],city:getadd[1],area:getadd[2],company:this.companyval,idcard:this.idval,card_positive_img:this.zhengmianpictur,card_negative_img:this.fanmianpictur,business_license:this.shenfenpictur};

              this.apiPost(this.phost+'/Dls/addLowerDls', data).then((res) => {
                  if(res.code==200){
                    this.$vux.toast.show({
                        text: res.msg,
                        type: "success"
                    })
                    this.$router.push({path: '/agent'});
                    localStorage.setItem('card_positive_img','');

                    localStorage.setItem('card_negative_img','');

                    localStorage.setItem('business_license','');

                  }else{
                    this.$vux.toast.show({
                        text: res.msg,
                        type: "text",position:'bottom',
                    })

                  }

              })

          },

      },
      mounted:function(){
          let agentData=JSON.parse(sessionStorage.getItem('agentData'));
            if(agentData){
                agentData.nameval != '' ?this.nameval=agentData.nameval:'';
                agentData.phoneval != '' ?this.phoneval=agentData.phoneval:'';
                agentData.codeval != '' ?this.codeval=agentData.codeval:'';
                agentData.idval != '' ?this.idval=agentData.idval:'';
        agentData.addressval != '' ?this.addressval=agentData.addressval:'';
                agentData.companyval != '' ?this.companyval=agentData.companyval:'';
              }
              this.isDlsByMobile()
         if(localStorage.getItem('card_positive_img')){

            this.list[0].value='已上传'
         }
         if(localStorage.getItem('card_negative_img')){

            this.list[1].value='已上传'
         }
         if(localStorage.getItem('business_license')){

            this.list[2].value='已上传'
         }
      },
      components:{
        Group,XInput,Cell,XButton,XAddress,Countdown
      },
      mixins:[window.mixins,window.http,window.addressData]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .addNext .red {
    color: red;
  }
  .addNext .add .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:8px;
    display:inline-block;
  }
  .addNext .green {
    color: #6594FE;
  }
  .addNext .font{
    font-size: 14px;
  }
  .addNext .duani{
    position: relative;
  }
  .addNext .fonts{
    position: absolute;
    left: 66%;
    top: 25%
  }
/*  .addNext .weui-cells_form .weui-cell__ft{
    position: absolute !important;
    right: 3px !important;
    top:7px !important;
  }*/
  .addNext .weui-cells{margin-top: 10px;}
  .addNext .address{font-size: 14px;}
  .addNext .address .weui-cell_access .weui-cell__ft:after{display:none;}
  .addNext .weui-btn_mini{padding:0 0.5em !important;font-size: 12px;}
  .addNext .vux-cell-value{color:#000;}
  @media screen and (max-width:320px){
    .font{
      font-size: 12px;
    }
  }
</style>
