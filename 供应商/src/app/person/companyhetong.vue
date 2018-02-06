<template>
  <div class='contract buss'>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <vue-file-upload id='shclo' class='labelclass' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even">
      </vue-file-upload>
      <p class='imgsrc'><img :src="addimg" style="width:90%;margin:1rem auto;height:10em;" alt=""/></p>
    </div>
    <p style="width: 90%;margin:1em auto;color:#999;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
    <flexbox v-if='localData!=1' class="x-btn">
      <flexbox-item style='position:relative'>
        <vue-file-upload id='chong' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
        </vue-file-upload>
        <x-button type="warn" style="background-color: #fff;color:black;font-size: 16px;">重新上传</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native='updateData' style="background-color: #FF4948;font-size: 16px;">确认上传</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script type="es6">
  import {Group,Cell,Popup,XButton,FlexboxItem,Flexbox,XInput} from "vux"
  import VueFileUpload from 'vue-file-upload';
    export default {
      data(){
        return{
          localData:{},
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"合同",
          addimg:require('../../assets/images/idz.jpg'),
          autoUpload:true,
          option:{
              formData:{},
              headers:{token:localStorage.getItem('token')},
              responseType:'json',
              withCredentials:false
          },
          even:{
              onCompleteUpload:(file,response,status,header)=>{
                // console.log(file);
                // console.log("finish upload;")
                console.log(response)
                this.addimg=response.data.pic_url;
                this.$vux.loading.hide()
                this.$vux.toast.show({
                    text: '上传成功！',
                    type: "success"
                })
              },
              onAddFileSuccess:(file)=>{
                if(file.size >20971520){
                  this.$vux.toast.show({
                    text: '上传图片过大！',
                    type: "cancel"
                })

                this.$refs.vueFileUploader.clearAll();
                  return;
                }
                this.$vux.loading.show({
                  text: '上传中'
                })
              }
          },
        }
      },
      methods:{
        updateData(){
          let vm=this;
          let data={dls_ocntract:vm.addimg,uptype:'companyAuthen'}
            this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",data).then((res)=>{
            if(res.code=200){
                this.$vux.toast.show({
                  text: '上传成功',
                  type: "success"
               })
              this.$router.push({path: '/business'});
            }
        
          })
        },
        getData(){
            let vm=this;
             this.apiPost("http://p.huileyi.com/Dls/companyAuthen",{}).then((res)=>{
            if(res.code==200){
              vm.localData=res.data;
              if(res.data.dls_ocntract){
                vm.addimg=res.data.dls_ocntract;
              }
            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "warn"
              })
            }
          })
        },
      },
      mounted(){
        this.getData();
      },
      components:{
        Group,
        Cell,
        Popup,
        XButton,
        FlexboxItem,
        Flexbox,
        XInput,
        VueFileUpload
      },
     mixins:[window.mixins,window.http]
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
    top: 0;
    left: 0;
    height: 51px;
  }
  .buss .x-btn {
      margin: 1rem auto;
      width: 90%;
  }
</style>

  