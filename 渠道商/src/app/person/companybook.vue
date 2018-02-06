<template>
  <div class='contract buss'>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <p class='imgsrc'><img @click='addFile' :src="bussimg" style="width:90%;margin:1rem auto;height:10em;" alt=""/></p>
    </div>
    <p style="width: 90%;margin:1em auto;color:#999;">请上传清晰彩色原件扫描件或数码照片,如复印件需要加盖公章。经营者姓名需要与用户与用户真实姓名一致
      确保信息展示完整、清晰、真实有效</p>
    <flexbox v-if='localData!=1' class="x-btn">
      <flexbox-item style='position:relative'>
        <x-button  @click.native='addFile'  type="warn" style="background-color: #fff;color:black;font-size: 16px;">重新上传</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native='updateData' style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script type="es6">
  import {XButton,FlexboxItem,Flexbox} from "vux"
  import upload from "../../upload.js"
    export default {
      data(){
        return{
          localData:{},
          bg:{white:false,grey:true},
          pageHeader:true,
          pageName:"营业执照",
          bussimg:'',
          currentImg:require('../../assets/zhizhao.jpg')
        }
      },
      methods:{
        addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            //alert(JSON.stringify(ret))
            if (ret.code=200)
              vm.bussimg = typeof ret.data.url!="undefined"? ret.data.url : vm.bussimg;
          },function(r){
          })
        },
        updateData(){
          if(this.bussimg == this.currentImg){
            this.$vux.toast.show({
                  text: '请选择上传图片！',
                  type: "text",position:'bottom',
               })
            return;
          }
          let vm=this;
          let data={business_license:vm.bussimg,uptype:'companyAuthen'}
            this.apiPost(this.phost+'/Dls/dlsPerfectData',data).then((res)=>{
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
             this.apiPost(this.phost+'/Dls/companyAuthen',{}).then((res)=>{
            if(res.code==200){
              vm.localData=res.data;
              if(res.data.dls_ocntract){
                vm.bussimg=res.data.business_license;
              }else{
                vm.bussimg=vm.currentImg
              }
            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "text",position:'bottom',
              })
            }
          })
        },
      },
      mounted(){
        this.getData();
      },
      components:{
        XButton,
        FlexboxItem,
        Flexbox,

      },
     mixins:[window.mixins,window.http,upload]
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

