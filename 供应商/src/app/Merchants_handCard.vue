<template>
  <div class='contract buss'>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <p class='imgsrc'><img @click="addFile"  :src="permit" style="width:90%;margin:1rem auto;height:10em;" alt=""/></p>
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
  import {Flexbox,FlexboxItem,XButton} from "vux"
  import upload from "../upload.js"
    export default {
      components:{
        Flexbox,
        FlexboxItem,
        XButton,
      },
       data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          headers:{token:localStorage.getItem('token'),type:"merchant"},
          pageName:"手持身份证",
          headers:{token:localStorage.getItem('token'),type:"merchant"},
          permit:require("../assets/images/4-2_07.png")
        }
      },
      methods:{
          addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            //alert(JSON.stringify(ret))
            localStorage.setItem('handcard',ret.data.url)
            if (ret.code=200)
              vm.permit = typeof ret.data.url!="undefined"? ret.data.url : vm.permit;
          },function(r){
            console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
          })
        },
        updateData(){
            let vm=this;
            this.apiPost("").then((res)=>{
            if(res.code=200){
              console.log(res)
                this.$vux.toast.show({
                  text: '上传成功',
                  type: "success"
               })
               this.$router.push("/Nolicense")
            }
          })
          }
      },
      mounted(){

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
