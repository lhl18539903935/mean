<template>
  <div class="newShop">
    <group label-width="4.5em" label-margin-right="2em" label-align="right" style="margin-top:-0.5rem">
      <cell :disabled='dis' title="门店logo" @click.native='addFile' :is-link='!dis' class="font" style="color:#000;"  >
        <div style='width:30px;height:30px;'>
          <img v-if='!store_logo' style='width:100%;height:100%;' src="../assets/images/small.png">
          <img v-if='store_logo' style='width:100%;height:100%;' :src="store_logo">
        </div>
      </cell>
      <x-input :disabled='dis' class="font" title="门店名称" placeholder='请输入门店名称' v-model="store_name" text-align="right" value="门店名称"></x-input>
      <popup-radio :readonly='dis' class="font" title="行业分类" placeholder='请选择门店分类' :options="options1" v-model="trade_class"></popup-radio>
      <x-address v-if='!dis' title="所属区域" placeholder='请选择区域'   class="font" v-model="belong_area"  raw-value :list="addressData"  value-text-align="right"></x-address>
      <cell :disabled='dis'  title="所属区域" v-show='dis'  :is-link='!dis' class="font" style="color:#000;"  :value="getAdd(belong_area)" ></cell>

    <cell :disabled='dis'  title="所属商圈"  :is-link='!dis' class="font" style="color:#000;" @click.native="getTradeArea('show')" :value="trade_name?trade_name:'请选择商圈'" ></cell>
    <div style="display:none">
     <popup-picker v-show='!dis'  :columns="1"  class='font' :show.sync="showPopupPicker" @click.native='getTradeArea' title="所属商圈" placeholder='请选择商圈' v-model="trade_area" :data="tradeData" @on-hide='hide'></popup-picker>
     </div>
      <x-textarea :readonly='dis' class="font" title="门店地址" v-model="store_address"  placeholder="河南省郑州市中原区" placeholder-align="right"  :rows="3"></x-textarea>
    </group>
    <group label-width="7.5em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem;">
        <cell :disabled='dis' title="门店照片" @click.native='jump' :is-link='!dis' class="font vux-1px-b" style="color:#000;margin-left:8px;"  :value="store_pic?'已添加':'请添加'" >
        </cell>
          <img style='margin-top:1em;width:28%;margin-left:4%;height:4em;border-radius:10%;' :src="item" v-for='(item,i) in pic' >
      </group>
        <group label-width="7.5em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem;">
        <popup-radio :readonly='dis' class="font" style="margin-left:8px" title="门店状态" placeholder='请选择' :options="options2" v-model="store_status"></popup-radio>
       <x-input  :disabled='dis'  class="font" style="margin-left:8px" title="门店人均消费" placeholder='请输入门店人均消费' v-model="per_capital" text-align="right" value="已上传"  value-align="right"></x-input>
       <popup-radio :readonly='dis' class="font" style="margin-left:8px" title="是否有wifi" placeholder='请选择' :options="options3" v-model="store_wifi"></popup-radio>
        <x-input :disabled='dis' class="font" style="margin-left:8px" title="停车位数量" placeholder='请输入停车位数量' v-model="park_num" text-align="right" value="已上传"  value-align="right"></x-input>
         <x-input :disabled='dis' class="font" style="margin-left:8px" title="营业时间" :max='30' placeholder='早9:00-晚22:00' v-model="business_hours" text-align="right" value="已上传"  value-align="right"></x-input>
      <x-input :disabled='dis' class="font" style="margin-left:8px" title="门店电话" v-model="store_call" placeholder='输入门店电话，可多个' text-align="right" value="已上传"  value-align="right"></x-input>
      <x-input :disabled='dis' class="font" style="margin-left:8px" text-align="right" v-model="store_owner_name"  label-width="5em" title="店长姓名" placeholder-align="right"  placeholder="请输入店长姓名"></x-input>

      <x-input :disabled='dis' class="font" style="margin-left:8px" text-align="right" v-model="store_manager_tel"  label-width="5em" title="店长手机号" placeholder-align="right"  placeholder="请输入店长手机号"></x-input>
      <x-input v-show='!dis && level==0'  class="font" style="margin-left:8px" text-align="right" v-model="code"  label-width="6em" title="验证码" placeholder-align="right"  placeholder="请输入验证码">
        <x-button style="background: red;margin-left:8px;" :disabled="isAble" slot="right" type="primary" mini @click.native='getCode'>{{btnText}}<span v-if="timer">{{timer}}s后重新发送</span>
          </x-button>
      </x-input>
      <x-input v-show='!dis && level==0' class="font" style="margin-left:8px" text-align="right" type='password' :min='6' :max='18' v-model="store_password"  label-width="5em" title="密码" placeholder-align="right"  placeholder="不修改请留空"></x-input>


       <cell class="font" style="margin-left:8px" value-align="left"  title="门店收款二维码" :link="'/code?store_id='+store_id"></cell>
      
    </group>

    <div style="width:90%;margin:3rem auto;">

      <x-button class="font" v-show='dis && level==0' style="background: #FE4948;color:#fff;" @click.native="dis=false">修改</x-button>

      <x-button class="font"  v-show='!dis && level==0' style="background: #FE4948;color:#fff;" @click.native="editTheStore">修改</x-button>
    
    </div>
       <div v-if='!level' style="width:90%;margin-bottom:1rem;">
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
        jump(){
          if(!this.dis){
              this.$router.push('/addImg?store_id='+this.store_id)
          }
          
        },
        hide(){
          if(typeof this.trade_area[0] != 'undefined')
          this.trade_name=this.getTradeName(this.trade_area);
        },
        finish(){

        this.timer=0;
        this.btnText='获取验证码'
        this.isAble=false;
      },
      getAdd(belong_area){

        let add=belong_area;
        return add[0]+' '+add[1]+' '+add[2];
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
        save(){
          let  vm=this;
          let data=this.getData();
          this.apiPost('http://r.huileyi.com/Store/addNewStore',data).then((res)=>{
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
        getTradeArea(val){
          let vm=this;
          if(this.belong_area == ''){
              this.$vux.toast.show({
                text:"请选择区域",
                type:"warn"
              })
              return;
          }
          var area;
          if(!this.area){
              area=this.belong_area[2];
          }else{
              area=this.area;
          }

            this.apiPost('http://r.huileyi.com/Store/trade_area',{area_id:area}).then((res)=>{
              console.log(res);
              if(res.code==200){
                var data=[];
                for(let d in res.data){
                  data.push({name:res.data[d].trade_name,value:res.data[d].trade_id,parent:0})

                }
                console.log(data);
                vm.tradeData=data;
                if(val == 'show'){
                   vm.showPopupPicker=true;
                }

                vm.hide();
               }
            })
        },
         addFile(){
          if(this.dis){
            return;
          }
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
        getValue:function(value){
          for(var r in this.addressData){
            var index=this.addressData[r];
            if(index.name == value){
              console.log('index')
              console.log(index)
              return index.value;
            }
          }
        },
        checkData(data){
          //信息是否填写完整
          for(let d in data){
            if(!data[d] && d!= 'store_password'){
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
        getData(){
          let data={
              store_logo:this.store_logo,
              store_name:this.store_name,
              trade_class:this.trade_class,
              belong_area:this.getName(this.belong_area),
              trade_area:this.trade_area,
              store_address:this.store_address,
              store_pic:this.store_pic,
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
              return data;
        },
        setData(data){

              let a=data.belong_area
              let b=a.split(',')
              //alert(data.trade_area)
              this.store_logo=data.store_logo
              this.store_name=data.store_name
              this.trade_class=data.trade_class
              this.store_status=data.store_status
              this.belong_area=b
              this.trade_area=[data.trade_area]
              this.store_address=data.store_address
              //this.store_pic=data.store_pic

              this.per_capital=data.per_capital
              this.store_wifi=data.store_wifi
              this.park_num=data.park_num
              this.business_hours=data.business_hours
              this.store_call=data.store_call
              this.store_manager_tel=data.store_manager_tel
              this.store_owner_name=data.store_owner_name
              //this.store_password=data.store_password

              let str=data.store_pic
              let local=localStorage.getItem('listImg')
             
                this.store_pic=local?local:str;
                this.pic=this.store_pic.split('@')
                console.log('pic')
                console.log(this.pic)
              //获取商圈数据
              if(this.belong_area){
                this.area=this.getValue(this.belong_area[2])
      
                this.getTradeArea()
              }
              
          
              /*for(var r in this.options2){
                if(this.options2[r].key=='0'){
                  this.store_status=this.options2[r].key
                  this.store_status=data.store_status
                }
              }*/

        },

        editTheStore(){
         /* alert(this.getName(this.belong_area))
          return;*/
            let data=this.getData();
            let check=this.checkData(data);
            if(!check){ return;}
            if(this.store_id){
              data.store_id=this.store_id;
            }
        //    console.log(data);return;
            this.apiPost('http://r.huileyi.com/store/editTheStore',data).then((res)=>{
              if(res.code==200){
                this.$vux.toast.show({
                text:"修改成功",
                type:"success"
                })
                 this.$router.push('/shop')
               }else{
                this.$vux.toast.show({
                text:res.msg,
                type:"warn"
                })
               }
            })
        },
        getMyStore(store_id){
          let vm=this;
          let token=localStorage.getItem("token")
 
           this.apiPost('http://r.huileyi.com/store/theStoreDetail',{token:token,store_id:store_id}).then((res)=>{
            console.log(res)
            if(res.code==200){
              vm.setData(res.data)
            }
          })
        },
        init(){
            this.store_id=this.$route.query.store_id
            this.getMyStore(this.store_id)
            this.level=localStorage.getItem('level')
        },
        getLevel(){
          let vm=this;
          this.apiPost('http://r.huileyi.com/Merchant/getUserLevel').then((res) => {
            console.log('2222')
            console.log(res)
              if(res.level == 0){
                vm.level=1
                //alert(vm.level)
              }else{
                vm.level=false;
              }
          })
        }
      },
      data(){
        return{
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
                        key: '1',
                        value: '电子商务'
                      }, {
                        key: '2',
                        value: '美食'
                      }, {
                        key: '3',
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
          pageName:"查看门店",
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
          area:'',
          storeImg:true,
          level:'',
          dis:true,
          pic:[]
        }
      },
      mounted(){
        this.init()

      },
      activated(){
        this.init()
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
  .newShop .weui-btn_mini{padding:0 0.5em;font-size: 12px !important;}
  .newShop .vux-cell-disabled .vux-label{color:#000;}
  .newShop .vux-cell-disabled .vux-label{color:#000;}
</style>
