<template>
    <div>
      <div style="width:90%;margin:1rem auto;text-align: center;position:relative">
        <vue-file-upload class='labelclass' :requestOptions='option' autoUpload='true' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
        </vue-file-upload>
        <p class='imgsrc'><img src="../../assets/images/0-14png_03.png" style="width:90%;margin:1rem auto;" alt=""/></p>
      </div>
      <p style="width: 90%;margin:0 auto;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
      <flexbox class="x-btn">
        <flexbox-item>
          <x-button type="primary" style="background-color: #fff;color:#000;font-size: 16px;">重选照片</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
        </flexbox-item>
      </flexbox>
    </div>
</template>

<script type="es6">
  import {Flexbox,FlexboxItem,XButton} from "vux"
  import VueFileUpload from 'vue-file-upload';
  import http from '../../ajax.js'
  import mixin from '../../vuex/mixin.js'
    export default {
      components:{
        Flexbox,
        FlexboxItem,
        XButton,
        VueFileUpload
      },
      data(){
        return{
          pageHeader:true,
          pageName:"身份证正面",
          option:{
              formData:{},
              headers:{token:localStorage.getItem('token')},
              responseType:'json',
              withCredentials:false
          },
          even:{
          onCompleteUpload:(file,response,status,header)=>{
            console.log(file);
            console.log("finish upload;")
            console.log('res:'+response)

          },
          onAddFileSuccess:(file)=>{
              console.log(file.file);
              console.log(file.size)
              console.log("success add to queue");


            }
          },

        }
      },
      mounted:function(){
        console.log(VueFileUpload)
      },
      methods:{
      },
      mixins:[mixin,http]
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
  .labelclass{
  }
  .fileupload-button[data-v-4fb51cfe]{
        padding:0;
        width: 258px;
        height: 322px;
        z-index: 999;
        opacity: 0;
  }
</style>
