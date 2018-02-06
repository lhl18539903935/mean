<template>
    <div>
      <div style="text-align: center;position:relative;margin-top:1em;">
        <vue-file-upload id='shclo' class='labelclass' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
        </vue-file-upload>
        <p class='imgsrc'><img :src="addimg" style="width:90%;margin:1rem auto;" alt=""/></p>
      </div>
      <p style="width: 90%;margin:1em auto;color:#999;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
      <flexbox class="x-btn">
        <flexbox-item>
          <div class='fileler'>
            <vue-file-upload style='position: absolute;width: 81%;z-index: 555;opacity:0' class='labelclass' :requestOptions='option' :autoUpload='autoUpload' label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg" :events="even" uploadtype="compress">
            </vue-file-upload>
            <x-button type="primary" style="background-color: #fff;color:#000;font-size: 16px;">重选照片</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" @click.native='trueup' style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
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
          autoUpload:true,
          pageHeader:true,
          pageName:"上传合同",
          bg:{white:false,grey:true},
          pic:'',
          option:{
              formData:{},
              headers:{token:localStorage.getItem('token')},
              responseType:'json',
              withCredentials:false
          },
          contract:{},
          addimg:require('../assets/idz.jpg'),
          chaunpic:'',
          even:{
          onCompleteUpload:(file,response,status,header)=>{

            this.addimg=response.data.pic_url;
            this.chaunpic=response.data.pic_url;
            localStorage.setItem('contract',JSON.stringify(response.data.pic_url));
            localStorage.setItem('zhengmianpicturname',response.data.file_name)
          },
          onAddFileSuccess:(file)=>{


            }
          },

        }
      },
      mounted:function(){

      },
      methods:{
        file(e){
          let vm=this;
          let inputDOM = vm.$refs.inputer;
              // 通过DOM取文件数据
              vm.pic    = inputDOM.files[0];

          alert(9)
          if(typeof FileTransfer != 'undefined'){
            alert(8)
            ft = new FileTransfer();
      alert(ft)
              // 通过DOM取文件数据
            var options = new FileUploadOptions();
            alert(options)
              options.fileKey="file";
              options.fileName=567890;
              //options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
              options.mimeType="text/plain";

              var headers={'headerParam':'headerValue', 'headerParam2':'headerValue2'};

              options.headers = headers;
              alert(678)
              ft.upload(vm.pic,encodeURI("http://p.huileyi.com/Dls/uploadImg"),vm.success,vm.fail,options)
          }
        },
        success(res){
          alert("Code = " + res.responseCode)
          alert(res.response)
          alert(res.bytesSent)
        },
        fail(){
          alert('fail')
        },
        trueup:function(){
          if(this.chaunpic == ''){
            this.$vux.toast.show({
                text: '请先选择图片',
                type: "text",position:'bottom',
            })

          }else{
            this.$vux.toast.show({
                text: '上传成功',
                type: "success"
            })
            this.$router.push({path: '/addNext'});
          }
        },
      },
      mixins:[window.mixins,window.http]
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
    top: -4%;
    overflow: hidden;
  }
  .imgsrc img {
    width: 100%;
  }
  .fileler{
    position: relative;
  }
  #shclo {
    padding:0;
    width: 258px;
    height: 250px;
    z-index: 999;
    opacity: 0;
  }
</style>
