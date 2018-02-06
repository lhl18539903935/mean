<template>
    <div class="perdata">
      <group  class="weui-cells_form " label-width="6.5em">
        <x-input class="font" v-model='nameval'  @on-change="change" title="姓名" text-align="right" placeholder="请填写姓名"></x-input>
      </group>
      <!--<group v-if="showMobile">-->
        <!--<cell class="font cell" v-model='phoneval'  @on-change="change" title="手机号" text-align="right" ></cell>-->
      <!--</group>-->
      <group>
        <cell class="font cell" v-if="showMobile" v-model='phoneval'  @on-change="change" title="手机号" text-align="right" ></cell>
        <x-input  v-if="!showMobile" class="font cell" :min="11" :max="11"  @on-change="change" title="手机号" v-model="mobile" placeholder="请填写手机号" text-align="right" ></x-input>
        <!--<countdown  v-if="showMobile" style="display:none;" class='fonts' slot="value" v-model="time1" :start="start" @on-finish="finish2"></countdown>-->
        <x-input   v-if="!showMobile" title="短信验证码"  class="weui-vcode font" v-model="code"  placeholder="请填写验证码">
          <x-button style="background: #6594FE;"  slot="right" type="primary" :disabled="disable001" mini @click.native="getCode">
            {{butval}}<span v-if="time1">{{time1}}s后重新发送</span>
          </x-button>
        </x-input>
      </group>
      <group label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input title="身份证号" v-model='idval' @on-change="change" class="font cell" placeholder="请输入身份证号" text-align="right"></x-input>
          <!--<cell class="font cell" :title="item.title" :value="item.value" is-link :link='item.link' v-for="(item,index) in list" :key="index"></cell>-->
        <cell class="font cell"  @on-change="change" title="身份证正面" :value="allData.license_positive_img?'已上传':'请上传'" is-link link='/upload?type=license_positive_img'  ></cell>
        <cell class="font cell"  @on-change="change"  title="身份证反面" :value="allData.license_negative_img?'已上传':'请上传'" is-link link='/upload?type=license_negative_img'  ></cell>
        <cell class="font"  @on-change="change"  title="营业执照" :value="allData.business?'已上传':'请上传'" is-link link='/upload?type=business'  ></cell>
      </group>
      <group>
        <cell class="font cell" title="绑定银行卡" :value="this.addBinkState?'已绑定银行卡':'请绑定银行卡'"  is-link link="/perfecfbink"></cell>
      </group>
      <div style="width:90%;margin:2rem auto;"><x-button @click.native='save' style="background: #6594FE;font-size: 16px;color:#fff;">保存</x-button></div>
    </div>
</template>
<script type="es6">
  import {Group,XInput,Cell,XButton,Countdown} from "vux"
    export default {
      data(){
        return{
          pageHeader:true,
          pageFooter:false,
          pageName:"完善资料",
          showMobile:true,
          list:[
            {title:"身份证正面",value:"请上传",link:'/oneup'},
            {title:"身份证背面",value:"请上传",link:'/onebeiup'},
            {title:"营业执照",value:"请上传",link:'/oneyingup'}
          ],
          nameval:'',
          phoneval:'',
          idval:'',
          show: true,
          time1:0,
          start:false,
          mobile:"",
          code:"",
          butval:"获取验证码",
          disable001:false,
          zhengmianpictur:'',
          fanmianpictur:'',
          shenfenpictur:'',
          addBink:"",
          allData:{},
          bg:{white:false,grey:true},
          addBinkState:"",

        }
      },
      methods:{
        watch:{
          region(){
            this.allData.region=this.region;
            this.change();
          }
        },
        selected(){
          var vm=this
          this.time1=60;
            let timer=setInterval(function(){
             vm.time1--
            if(vm.time1<=0){
                  vm.time1='';
                  vm.disable001=false;
                 clearInterval(timer)

            }else{
              vm.disable001=true
            }
            },1000)
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
        getCode(){
            if(this.mobile.length==0){
                this.$vux.toast.show({
                    text: '请填写手机号',
                    type: "text",position:'bottom',
                })
            }else{
              //验证手机号
              var myreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
              if(!myreg.test(this.mobile)){
                  this.$vux.toast.show({
                      text: '请填写正确的手机号！',
                      type: "text",position:'bottom',
                  })
                  return false;
              }
              this.butval=''
              this.time1=60
              this.start=true;
              this.selected()
              this.disable001=true;
              this.apiPost(this.rhost+'/home/getCode', {type:'addMerchant',mobile:this.mobile}).then((res) => {
                  this.$vux.toast.show({
                      text: res.msg,
                      type: "success"
                  })
              })
            }
          },
        change(){
          sessionStorage.setItem('phocc',this.mobile)
          let local=sessionStorage;
          local.setItem('allData',JSON.stringify(this.allData));
            let agentData={
              nameval:this.nameval,
              phoneval:this.phoneval,
              idval:this.idval,
            }
            local.setItem('agentDatass',JSON.stringify(agentData));
          },

          save(){
            let card1=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
            let card2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            let data={
                name:this.nameval,
                idcard:this.idval,
                mobile:this.mobile,
                card_positive_img:this.allData.license_positive_img,
                card_negative_img:this.allData.license_negative_img,
                 // business:this.allData.business,
                uptype:'perfectData',
                code:this.code
            }
              if(data.idcard==''|| data.card_positive_img==null|| data.card_negative_img==null){
                this.$vux.toast.show({
                      text: '请填写完整信息',
                      type: "text",position:'bottom',
                })
                return false
              }
              if(this.addBinkState==null){
                this.$vux.toast.show({
                      text: '请绑定银行卡',
                      type: "text",position:'bottom',
                })
                return false
              }
             if(!card2.test(this.idval)){
                  this.$vux.toast.show({
                      text: '请输入正确的身份证号',
                      type: "text",position:'bottom',
                })
                return
            }else{
                this.apiPost(this.phost+'/Dls/dlsPerfectData', data).then((res) => {
                    if(res.code==200){
                        this.$vux.toast.show({
                            text: '保存成功',
                            type: "success"
                        })
                        this.$router.push({path: '/'});
                    }else{
                      this.$vux.toast.show({
                          text: res.msg,
                          type: "text",position:'bottom',
                      })
                    }
                })

            }
          },
      },

      mounted:function(){
        if(!(sessionStorage.getItem('phocc'))){
          this.mobile=''
        }else{
          this.mobile=sessionStorage.getItem('phocc')
        }
        this.addBinkState=this.$route.query.addBinkState
        this.allData.license_positive_img=localStorage.getItem('license_positive_img')
        this.allData.license_negative_img=localStorage.getItem('license_negative_img')
        this.allData.business=localStorage.getItem('business')
          this.apiPost(this.rhost+'/home/getUserMessage', {}).then((res) => {
              if(res.code==200){
                let length=res.data.mobile.length
                // 通过手机号类型判断是否显示验证码 如果是手机号注册不显示验证码  除手机号以外的账号注册需要验证码验证
                if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(res.data.mobile)){
                  this.showMobile=true
                  this.phoneval=res.data.mobile
                  this.mobile=res.data.mobile
                  this.code=''
                }else{
                  this.showMobile=false
                }
              }else{
                this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
              }
          })
          let agentData=JSON.parse(sessionStorage.getItem('agentDatass'));
          if(agentData){
              agentData.nameval != null ?this.nameval=agentData.nameval:'';
              agentData.phoneval != null ?this.phoneval=agentData.phoneval:'';
              agentData.idval != null ?this.idval=agentData.idval:'';
            }
         if(localStorage.getItem('onezhengmianpicturname')){
            this.list[0].value=localStorage.getItem('onezhengmianpicturname')
         }
         if(localStorage.getItem('onefanmianpicturname')){
            this.list[1].value=localStorage.getItem('onefanmianpicturname')
         }
         if(localStorage.getItem('oneshenfenpicturname')){
            this.list[2].value=localStorage.getItem('oneshenfenpicturname')
         }
      },
      components:{
        Group,XInput,Cell,XButton,Countdown
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .perdata .weui-cells{margin-top:10px;}
  .perdata .red {
    color: red;
  }
  .perdata .green {
    color: #6594FE;
  }
  .perdata .font{
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  .perdata .duani{
    position: relative;
  }
  .perdata .fonts{
    position: absolute;
    left: 66%;
    top: 25%
  }
  .perdata .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:7px;
    display:inline-block;
  }
  .perdata .cell .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 12px;
    position: absolute;top:10px;left:7px;
    display:inline-block;
  }
  .perdata .weui-cell__bd{
    color:#000!important;
  }
</style>
