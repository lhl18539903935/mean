<template>
  <div class="newShop">
    <group label-width="4.5em" label-margin-right="2em" label-align="right" style="margin-top:-0.5rem">
      <cell title="门店logo" @click.native='addFile' is-link class="font" style="color:#000;"  >
        <div style='width:30px;height:30px;'>
          <img v-if='!store_logo' style='width:100%;height:100%;' src="../assets/images/small.png">
          <img v-if='store_logo' style='width:100%;height:100%;' :src="store_logo">
        </div>
      </cell>
      <x-input class="font" title="门店名称" placeholder='请输入门店名称' v-model="store_name" text-align="right" value="门店名称"></x-input>
      <popup-radio class="font" title="行业分类" placeholder='请选择门店分类' :options="options1" v-model="trade_class"></popup-radio>
      <x-address title="所属区域" placeholder='请选择区域'  class="font" v-model="belong_area"  raw-value :list="addressData"  value-text-align="right"></x-address>

    <cell  title="所属商圈" @click.native='getTradeArea'  is-link class="font" style="color:#000;"  :value="trade_name?trade_name:'请选择商圈'" ></cell>

     <popup-picker  :columns="1" style='display:none' class='font' :show.sync="showPopupPicker" @click.native='getTradeArea' title="所属商圈" placeholder='请选择商圈' v-model="trade_area" :data="tradeData" @on-hide='hide'></popup-picker>

      <x-textarea class="font" title="门店地址" v-model="store_address"  placeholder="请输入门店地址" placeholder-align="right"  :rows="3"></x-textarea>
    </group>
    <group label-width="7.5em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem;">
        <cell title="门店照片" :link="'/addImg?store_id='+store_id" is-link class="font" style="color:#000;margin-left:8px;"  :value="store_pic?'已添加':'请添加'" ></cell>
        <popup-radio class="font" style="margin-left:8px" title="门店状态" placeholder='请选择' :options="options2" v-model="store_status"></popup-radio>
       <x-input class="font" style="margin-left:8px" title="门店人均消费" placeholder='请输入门店人均消费' v-model="per_capital" text-align="right" value="已上传"  value-align="right"></x-input>
       <popup-radio class="font" style="margin-left:8px" title="是否有wifi" placeholder='请选择是或者否' :options="options3" v-model="store_wifi"></popup-radio>
        <x-input class="font" style="margin-left:8px" title="停车位数量" placeholder='请输入停车位数量' v-model="park_num" text-align="right" value="已上传"  value-align="right"></x-input>
         <x-input class="font" label-width="4.5em" style="margin-left:8px" :max='30' title="营业时间" placeholder='早9:00-12:00，晚15:00-22:00' v-model="business_hours" text-align="right" value="已上传"  value-align="right"></x-input>
      <x-input class="font" style="margin-left:8px" title="门店电话" :max='50' v-model="store_call" placeholder='输入门店电话，可多个' text-align="right" value="已上传"  value-align="right"></x-input>
      <x-input class="font" style="margin-left:8px" text-align="right" v-model="store_owner_name"  label-width="5em" title="店长姓名" placeholder-align="right"  placeholder="请输入店长姓名"></x-input>

      <x-input class="font" style="margin-left:8px" text-align="right" v-model="store_manager_tel" :max='11' label-width="5em" title="店长手机号" placeholder-align="right"  placeholder="请输入店长手机号"></x-input>
      <x-input class="font" style="margin-left:8px" text-align="right" v-model="code" :max='6'  label-width="6em" title="验证码" placeholder-align="right"  placeholder="请输入验证码">
        <x-button style="background: red;margin-left:8px;" :disabled="isAble" slot="right" type="primary" mini @click.native='getCode'>{{btnText}}<span v-if="timer">{{timer}}s后重新发送</span>
          </x-button>
      </x-input>


      <x-input   class="font" style="margin-left:8px" text-align="right" type='password' :min='6' :max='18' v-model="store_password"  label-width="5em" title="密码" placeholder-align="right"  placeholder="请设置登录密码"></x-input>
      
    </group>
    <div style="width:90%;margin:3rem auto;">
      <x-button  class="font" style="background: #FE4948;color:#fff;" @click.native="save">保存</x-button>
    </div>

  </div>
</template>

<script type="es6">
  import {Group,Cell,Popup,XSwitch, Radio , TransferDom,XTextarea,XAddress,ChinaAddressV3Data,XInput,XButton,PopupPicker} from 'vux'
  import addressData from '../assets/images/address.json'
  import PopupRadio from '../components/popup-radio/index.vue'
  import upload from "../upload.js"
    export default {
      directives: {
        TransferDom
      },
      components:{
        Group,
        Cell,
        XTextarea,
        XInput,
        XButton,
        XAddress ,
        PopupRadio ,
        ChinaAddressV3Data,
        Popup,
        XSwitch,
        TransferDom,
        PopupPicker
      },

      methods:{
        hide(){
          if(typeof this.trade_area[0] != 'undefined')
          this.trade_name=this.getTradeName(this.trade_area);
        },
        finish(){

        this.timer=0;
        this.btnText='获取验证码'
        this.isAble=false;
      },
      getCode(){

        let mobile=this.store_manager_tel;
        if( mobile == ''){
          this.$vux.toast.show({
                        text: '请填写手机号',
                        type: "warn"
                    })
          return;
        }

        //验证手机号
              var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
              if(!myreg.test(mobile))
              { 
                  this.$vux.toast.show({
                      text: '请输入正确的手机号！',
                      type: "warn"
                  })
                  return false; 
              }

              this.timer=5;
              this.btnText=''
              this.start=true;
              this.isAble=true;
              let vm=this;
              var int=setInterval(function(){
                vm.timer--;
                if(vm.timer==0){
                  clearInterval(int);
                  vm.finish();
                }
              },1000)

         this.apiPost('http://r.huileyi.com/home/getCode', {mobile:mobile,type:'addStoreAdmin'}).then((res) => {
                   console.log(res)
                    if(res.code==228){
                       this.$vux.toast.show({
                        text: res.msg,
                        type:'success'
                    })
                      
                    }else{
                      this.$vux.toast.show({
                        text: res.msg,
                        type:'warn'
                      })
                    }
                })
        },
        checkData(data){
          //信息是否填写完整
          for(let d in data){
            if(!data[d]){
               //alert(d)
              this.$vux.toast.show({
              text:"请填写信息完整",
              type:"warn"
               })

              return false;
            }
          }
          //验证手机号
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if(!myreg.test(data.store_manager_tel))
          {
            this.$vux.toast.show({
              text: '请输入正确的手机号！',
              type: "warn"
            })
            return false;
          }

          return true;
        },
        save(){
          let  vm=this;
         let data=this.getData();
          let check=this.checkData(data);
          if(!check){ return;}
         // console.log(JSON.stringify(data));
         
          this.apiPost('http://r.huileyi.com/Store/addNewStore',data).then((res)=>{
          if(res.code==200){
                this.$vux.toast.show({
                text:"添加成功",
                type:"success"
              })
                if(this.$route.query.from == 'license'){
                  this.$router.push('/chose')
                }else{
                  this.$router.push('/shop')
                }
            }else{
                this.$vux.toast.show({
                text:res.msg,
                type:"warn"
              })
            }
          })
        },
        getTradeName(trade_id){
          let arr=this.tradeData;
          console.log(arr)
          console.log(trade_id)

          for(let d in arr){
            if(arr[d].value == trade_id[0]){
              return arr[d].name;
            }
          }
        },
        getTradeArea(){
          let vm=this;
          if(this.belong_area == ''){
              this.$vux.toast.show({
                text:"请选择区域",
                type:"warn"
              })
              return;
          }
            this.apiPost('http://r.huileyi.com/Store/trade_area',{area_id:this.belong_area[2]}).then((res)=>{
              console.log(res);
              if(res.code==200){
                var data=[];
                for(let d in res.data){
                  data.push({name:res.data[d].trade_name,value:res.data[d].trade_id,parent:0})

                }
                console.log(data);
                vm.tradeData=data;
                vm.showPopupPicker=true;
                vm.hide();
               }
            })
        },
         addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){

            if (ret.code=200)
                vm.store_logo = typeof ret.data.url!="undefined"? ret.data.url : vm.store_logo;
          },function(r){
            console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
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
        },
        getData(){
          let data={
              store_logo:this.store_logo,
              store_name:this.store_name,
              trade_class:this.trade_class,
              belong_area:this.getName(this.belong_area),
              trade_area:this.trade_area,
              store_address:this.store_address,

              store_status:this.store_status,
              per_capital:this.per_capital,
              store_wifi:this.store_wifi,
              park_num:this.park_num,
              business_hours:this.business_hours,
              store_call:this.store_call,
              store_manager_tel:this.store_manager_tel,
              store_owner_name:this.store_owner_name,
              store_password:this.store_password,
              code:this.code

            }

      
              let listImg=localStorage.getItem('listImg');
              //alert(listImg)
             
              data.store_pic=listImg;
 

              return data;
        },

        setData(){

              this.store_pic=localStorage.getItem('listImg')
              /*alert('local')
              alert(local)*/
                
              /*for(var r in this.options2){
                if(this.options2[r].key=='0'){
                  this.store_status=this.options2[r].key
                  this.store_status=data.store_status
                }
              }*/

        },
        setEmpty(){

              //alert(data.trade_area)
              this.store_logo=''
              this.store_name=''
              this.trade_class=''
              this.store_status=''
              this.belong_area=[]
              this.trade_area=[]
              this.store_address=''
              this.store_pic=[]

              this.per_capital=''
              this.store_wifi=''
              this.park_num=''      
              this.business_hours=''
              this.store_call=''
              this.store_manager_tel=''
              this.store_owner_name=''
              this.store_password=''

              /*for(var r in this.options2){
                if(this.options2[r].key=='0'){
                  this.store_status=this.options2[r].key
                  this.store_status=data.store_status
                }
              }*/

        },
      },
      data(){
        return{
          pageName:'新增门店',
          trade_name:'',
          start:false,
          timer:0,
          isAble:false,
          btnText:'获取验证码',
          showPopupPicker:false,
          tradeData:[],
          trade_area:[],
          trade_area_arr:[],
          trade_class: "",
          options1: [{
                        key: 1,
                        value: '电子商务'
                      }, {
                        key: 2,
                        value: '美食'
                      }, {
                        key: 3,
                        value:'美容'
                      }],
          belong_area:[],
          store_address:"",
          bg:{white:false,grey:true},
          store_pic:"",
          store_status: "",
          options2: [{key:'1',value:'上线中'},{ key:'0',value:'待上线'}],
          options3: [{key:'1',value:'无'},{ key:'0',value:'有'}],
          show2: false,
          store_name:"",
          className:"电子商务",
          storeState:"",
          store_id:"",
          store_owner_name:"",
          store_call:"0371-58987454",
          store_manager_tel:"",
          addressData: ChinaAddressV3Data,
          data:[],
          store_password:'',
          store_logo:'',
          code:'',
          store_wifi:'',
          per_capital:'',
          park_num:'',
          business_hours:'',
          store_call:'',
          list_img:[],
          list:[
            {src:require("../assets/images/0-14png_03.png")},
            {src:require("../assets/images/0-14png_03.png")},
          ],

          storeImg:true
        }
      },
      mounted(){
        this.setEmpty();
      },
      activated(){
       this.setData()
      },
      mixins:[window.mixins,window.http,upload]
    }
</script>
<style>
  .newShop .font{
    font-size: 14px;
  }
  .newShop .vux-popup-header-right{
    color:#FF4948!important;
  }
  .newShop .vux-popup-picker-header{
    color:#FF4948!important;
  }
  .newShop .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
    color:#FF4948!important;
  }
  .newShop .weui-textarea{
    text-align: right;
  }
  .newShop .vux-cell-value{
    color:#000;
  }
  .newShop .str .vux-cell-primary{
    display: none;
  }
  .newShop .weui-btn_mini{padding:0 0.5em;line-height: 1.9;font-size: 12px}
</style>
