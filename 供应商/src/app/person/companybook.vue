<template>
  <div class='addCard'>
    <div style="text-align: center;position:relative;margin-top:20px;">
      <p class='imgsrc'><img  @click='addFile' :src="currentImg"  alt=""/></p>
    </div>
    <p style="width: 90%;margin-left:5%;margin-top:1em;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>
    <flexbox v-if='userData.idcard_status != 1' class="x-btn">
      <flexbox-item>
        <div class='fileler'>
          <x-button type="primary"  @click.native='addFile' style="background-color: #fff;color:#000;font-size: 16px;">重选照片</x-button>
        </div>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native='save' style="background-color: #FF4948;font-size: 16px;">确认上传</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {Flexbox,FlexboxItem,XButton} from "vux"
  import VueFileUpload from 'vue-file-upload';
  import upload from "../../upload.js"
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
          currentImg:'',
          companybook:require('../../assets/images/zhizhao.jpg'),
          hetong:require('../../assets/images/0-14png_03.png'),
          pageHeader:true,
          pageName:"",
          type:'',
          idcard_status:'',
          userData:{},
        }
      },
      methods:{
        addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            if (ret.code=200)
              vm.currentImg = typeof ret.data.url!="undefined"? ret.data.url : vm.currentImg;
          },function(r){
            console.log(JSON.stringify(r))
            //alert(JSON.stringify(r));
          })
        },

        save(){
          let vm=this;
             if(this.type == 'companybook' && vm.currentImg){
                  vm.userData.business_license=vm.currentImg;
              }
              if(this.type == 'hetong' && vm.currentImg){
                 vm.userData.dls_ocntract=vm.currentImg;
              }
        this.apiPost("http://p.huileyi.com/Dls/dlsPerfectData",vm.userData).then((res)=>{
              if(res.code == 200){
                this.$vux.toast.show({
                      text: '保存成功',
                      type: "success"
                  })
                this.$router.push('/attestation')
              }

          })
        },
         getData(){
          let vm=this;
            this.apiPost("http://p.huileyi.com/Dls/companyAuthen").then((res)=>{
            if(res.code==200){
              vm.userData=res.data;

              if(vm.type == 'companybook'){
                if(res.data.business_license){
                  vm.currentImg=res.data.business_license;
                }else{
                   vm.currentImg=vm.companybook;
                }

              }

              if(vm.type == 'hetong'){
                if(res.data.dls_ocntract){
                 vm.currentImg=res.data.dls_ocntract;
                }else{
                     vm.currentImg=vm.hetong;
                }

              }

            }
          })
        }
      },
      mounted:function(){
        this.type=this.$route.query.type
        if(this.type == 'companybook'){
          this.pageName='营业执照'
          this.$store.commit("setPageName", this.pageName)

        }
        if(this.type == 'hetong'){
          this.pageName='合同'
          this.$store.commit("setPageName", this.pageName)
        }
        this.getData();
      },
      mixins:[window.mixins,window.http,upload]
    }
</script>

<style >
  .addCard .x-btn{
    margin:1rem auto;
    width:90%;
  }
  .addCard .imgsrc img{
    height:100%;
    width:100%;
  }
  .addCard .imgsrc{
    position: relative;
    padding:6px 12px;
    width:90%;
    height:12em;

    display:inline-block;
  }

  .addCard .upload{
    width:20em;
    height:12em;
  }

</style>
