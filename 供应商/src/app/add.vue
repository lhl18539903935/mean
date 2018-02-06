<template>
    <div class="file">
      <div style="text-align: center;position:relative;margin-top:1em;">
        <vue-file-upload id='shclo' class='labelclass' :requestOptions='option' :autoUpload='autoUpload'
                         label="+" ref="vueFileUploader" url="http://p.huileyi.com/Dls/uploadImg"
                         :events="even" uploadtype="compress">
        </vue-file-upload>
      </div>
      <group style="height:300px;background-color: #fff;">
        <div v-for="(item,i) in imgs" :key="i" style="float:left;margin:12px 0 12px 20px;position:relative;" v-if="item.del">
          <img style="width:70px;float: left"  :src="item.src" alt="" />
          <img @click="handle(i)"  src="../assets/images/anniu.png" style="width:16px;position:absolute;top:-5px;left:61px;" alt=""/>
        </div>
      </group>
      <div style="width:90%;margin:0 auto;">
        <x-button style="background-color: #FF4948;color:#fff;font-size: 16px;position: fixed;bottom:80px;left:0" link="newShop">确定</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import {XButton,Group} from "vux"
  import VueFileUpload from 'vue-file-upload';
    export default {
      data(){
        return{
          pageName:"添加门店照片",
          bg:{white:false,grey:true},
          autoUpload:true,
          imgs:[
            {src:require('../assets/images/0-14png_03.png'),del:true}
          ],
          options:[],
          Img:{},
          option:{
              formData:{},
              headers:{token:localStorage.getItem('token'),type:"merchant"},
              responseType:'json',
              withCredentials:false
          },
           even:{
              onCompleteUpload:(file,response,status,header)=>{
                // console.log(file);
                 //console.log("finish upload;")
                console.log(response)
                this.storeImg=response.data.pic_url;
                console.log(this.storeImg)
                for(var i in this.imgs){
                  console.log(this.imgs[i].src)
                  this.imgs[i].src=this.storeImg
                }
                this.$vux.loading.hide()
                this.$vux.toast.show({
                    text: '上传成功！',
                    type: "success"
                })
                this.Img.src=response.data.pic_url
                this.options.push(this.Img)
                console.log(this.options)
                localStorage.setItem('storeImg',JSON.stringify(this.options))
              },
              onAddFileSuccess:(file)=>{
                  //this.filter(file);
                  this.$vux.loading.show({
                  text: '上传中'
                })
              }
           }
        }
      },
      methods:{
        handle(i){
          this.imgs[i].del=false
        }
      },
      components:{
        XButton,
        Group,
        VueFileUpload
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  #shclo{
    width:70px;
    height:70px;
    border: 1px dotted #b6b6b6;
    font-size: 30px;
    color:#8D8D8D;
    box-sizing: border-box;
    text-align: center;
    line-height: 58px;
    float:left;
  }
  .file .fileupload-button[data-v-4fb51cfe]{
    position: absolute;
    padding:0;
    z-index: 1;
    margin: 12px 0 0 5px;
  }
  .file .fileupload-button[data-v-4fb51cfe]{
    background-color: transparent;
  }
  .file .fileupload-button input[type=file][data-v-4fb51cfe]{
    font-size: 50px!important;
  }
</style>
