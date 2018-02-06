<template>
  <div class='contract buss'>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <p class='imgsrc'><img @click='addFile' :src="addimg" style="width:18rem;margin:1rem auto;height:12rem;" alt=""/></p>

    </div>
    <p style="width: 90%;margin:1em auto;color:#999;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
    <flexbox  class="x-btn">
      <flexbox-item style='position:relative'>
        <x-button @click.native='addFile' type="warn" style="background-color: #fff;color:black;font-size: 16px;">重新上传</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native='updateData' style="background-color: #FF4948;font-size: 16px;">确认上传</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script type="es6">
  import {Group,Cell,Popup,XButton,FlexboxItem,Flexbox,XInput} from "vux"
  import upload from "../upload.js"
    export default {
      data(){
        return{
          localData:{},
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"身份证正面",
          license_positive_img:require("../assets/images/idz.jpg"),
          license_negative_img:require("../assets/images/idb.jpg"),
          business_license:require("../assets/images/zhizhao.jpg"),
          open_permit:require("../assets/images/zhizhao.jpg"),
          user_license:require("../assets/images/user_license.jpg"),
          trade_license:require('../assets/images/zhizhao.jpg'),
          addimg:'',
        }
      },

      methods:{
        addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            //alert(JSON.stringify(ret))
            if (ret.code=200)
              vm.addimg = typeof ret.data.url!="undefined"? ret.data.url : vm.addimg;
          },function(r){
            console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
          })
        },
        updateData(){
            if(!this.addimg){
                this.$vux.toast.show({
                    text: '请上传图片！',
                    type: "warn"
                })
                return;
            }
            localStorage.setItem(this.type,this.addimg);
            this.$vux.toast.show({
                text: '保存成功！',
                type: "success"
            })
            this.$router.go(-1)

        },

      },
      mounted(){
        this.type=this.$route.query.type
        this.type=='license_positive_img'?this.pageName="身份证正面":"";
        this.type=="license_negative_img"?this.pageName="身份证反面":"";
        this.type=="business_license"?this.pageName="营业执照":"";
        this.type=="open_permit"?this.pageName="开户许可证":"";
        this.type=="user_license"?this.pageName="手持证件照":"";
        this.type=="trade_license"?this.pageName="行业许可证":"";
        this.$store.commit("setPageName",this.pageName)
          let localPic=localStorage.getItem(this.type);

          /*if(){
            this.addimg=localStorage.getItem(this.type)
          }else{
            this.addimg=this[this.type]
          }*/
           let mtype=this.$route.query.mtype;
           let vm=this;
           this.apiPost("http://r.huileyi.com/Merchant/merchantAuditInfo",{type:mtype}).then((res)=>{

            vm.addimg=localPic?localPic:res.data[vm.type];
         
            if(!vm.addimg ){
              vm.addimg=vm[vm.type]
            }
         
           })
      },
      components:{
        Group,
        Cell,
        Popup,
        XButton,
        FlexboxItem,
        Flexbox,
        XInput,
      },
     mixins:[mixins,http,upload]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .buss .lf{
    float:left;
  }
  .buss .rt{
    float:right;
  }
  .buss .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .buss .img{
    position: relative;
  }
  .buss .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    width: 80px;
    height: 80px;
    z-index: 999;
    position: absolute;
    left:15px;
    top:17px;
    opacity: 0;
    outline: none;
  }
  .buss .vux-popup-dialog.vux-popup-right{
    padding-top:45px;
  }
  .buss .weui-cells{margin-top: 10px;}
  .contract   #shclo {
    padding:0;
    width: 88%;
    height: 183px;
    z-index: 999;
    opacity: 0;
  }
  #chong{
    width: 155px;
    left: 0;
    top: 0;
    height: 51px;
  }
  .buss .x-btn {
    margin: 1rem auto;
    width: 90%;
  }
</style>

