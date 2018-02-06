<template>
  <div class='contract buss'>
    <div style="text-align: center;position:relative;margin-top:1em;">
      <p class='imgsrc'><img @click='addFile' :src="addimg" style="width:90%;margin:1rem auto;height:10em;" alt=""/></p>
    </div>
    <p style="width: 90%;margin:1em auto;color:#999;">请上传合同清晰扫描件或者合同页照片，确保信息展示完整、清晰、真实有效</p>
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
          pageName:"合同",
          addimg:'',
          currentImg:require('../../assets/contract.jpg'),
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
          })
        },
        updateData(){
          if(this.addimg == this.currentImg){

            this.$vux.toast.show({
                  text: '请上传图片',
                  type: "text",position:'bottom',
               })
            return;
          }
          let vm=this;
          let data={dls_ocntract:vm.addimg,uptype:'companyAuthen'}
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

                  vm.addimg=res.data.dls_ocntract;
                }else{

                  vm.addimg=vm.currentImg
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

