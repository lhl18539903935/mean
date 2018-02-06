<template>
  <div>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <vue-file-upload id='shclo' class='labelclass' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
      </vue-file-upload>
      <p class='imgsrc'><img :src="addimg" style="width:90%;margin:1rem auto;height:10em;" alt=""/></p>
    </div>
    <p style="width: 90%;margin:0 auto;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
    <flexbox class="x-btn">
      <flexbox-item>
        <vue-file-upload id='chong' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
        </vue-file-upload>
        <x-button type="primary"
                  style="background-color: #fff;color:#000;font-size: 16px;position: relative;"
          >重选照片</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" style="background-color: #FF4948;font-size: 16px;" @click.native="save">确认上传</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {Flexbox,FlexboxItem,XButton} from "vux"
   import VueFileUpload from 'vue-file-upload';
    export default {
      components:{
        Flexbox,
        FlexboxItem,
        XButton,
        VueFileUpload
      },
       data(){
        return{
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"合同",
          addimg:require('../../assets/images/0-14png_03.png'),
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
                  this.filter(file);
                  this.$vux.loading.show({
                  text: '上传中'
                })
              }
          },
        }
      },
      methods:{
        filter(file){
          //图片格式限制
          var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              let rst='|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
              if(!rst){
                //alert('请上传正确的图片格式')
                this.$vux.toast.show({
                    text: '请上传正确的图片格式！',
                    type: "warn"
                })
                this.$refs.vueFileUploader.clearAll();
                return;
              }
          //图片大小限制
          if(file.size >20971520){
            this.$vux.toast.show({
              text: '最大上传图片不能超过20M！',
              type: "cancel"
          })
          this.$refs.vueFileUploader.clearAll();
            return;
          }
        },
        save(){
          let vm=this
          let data={dls_ocntract:this.addimg,uptype:'companyAuthen'}
          this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",data).then((res)=>{
            console.log(res)
            if(res.code==200){
            this.$vux.toast.show({
                  text: '上传成功',
                  type: "success"
               })
               this.$router.push({path: '/business'});
            }
          })
        },
        getDate(){
          let vm=this
          this.apiPost('http://p.huileyi.com/Dls/companyAuthen',{}).then((res)=>{
            console.log(res)
            if(res.code==200){
              this.addimg=res.data.business_license
              this.localData=res.data
              console.log(this.addimg,this.localData)
            }
          })
        }
      },
      mounted(){
        this.getDate()
      },
      mixins:[mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .x-btn{
    margin:1rem auto;
    width:90%;
  }
  .imgsrc{
    position: absolute;
    top: 6%;
    width: 87%;
    height: 87%;
    left: 7%;
    overflow: hidden;
  }
  .imgsrc img {
    width: 100%;
  }
  .fileupload-button[data-v-4fb51cfe]{
    padding:0;
    width: 294px;
    height: 160px;
    z-index: 999;
    opacity: 0;
    margin:2rem 0;
  }
  #chong{
    width: 165px;
    left: 18px;
    top: 47%;
    height: 40px;
    position: absolute;
  }

</style>
