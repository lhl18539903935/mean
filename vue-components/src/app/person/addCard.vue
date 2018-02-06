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
        <x-button type="warn" @click.native='backatt' v-if="this.userData.idcard_status == 2" style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
        <x-button type="warn" @click.native='save' v-else style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
        
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {Flexbox,FlexboxItem,XButton} from "vux"
  import upload from "../../upload.js"
    export default {
      components:{
        Flexbox,
        FlexboxItem,
        XButton,
      },
      data(){
        return{

          bg:{white:false,grey:true},
          currentImg:'',
          front:require('../../assets/idz.jpg'),
          back:require('../../assets/idb.jpg'),
          pageHeader:true,
          pageName:"",
          type:'',
          idcard_status:'',
          userData:{},
        }
      },
      methods:{
        // 返回
        backatt(){
          this.$router.go(-1)
        },
        addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            if (ret.code=200){  
              vm.currentImg = typeof ret.data.url!="undefined"? ret.data.url : vm.currentImg;
              // if(localStorage.getItem('back') || localStorage.getItem('front')){
                // vm.currentImg=localStorage.getItem('back')
                // vm.currentImg=localStorage.getItem('front')
                if(vm.type == 'front'){
                  localStorage.setItem('front',ret.data.url) 
                }
                if(vm.type == 'back'){
                  localStorage.setItem('back',ret.data.url)
                }                                
            }
          },function(r){
          })
        },

        save(){
          let vm=this;
          if(vm.currentImg == this.front || this.currentImg == this.back){
            this.$vux.toast.show({
              text:"请选择上传图片！",
              type:"text",
                position:'bottom'
            })
            return
          }
             if(this.type == 'front' && vm.currentImg){
                  vm.userData.card_positive_img=vm.currentImg;
              }
              if(this.type == 'back' && vm.currentImg){
                 vm.userData.card_negative_img=vm.currentImg;
              }
        this.apiPost(this.phost+"/Dls/dlsPerfectData",vm.userData).then((res)=>{
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
            this.apiPost(this.phost+"/Dls/idcardAuthen").then((res)=>{
            if(res.code==200){
              vm.userData=res.data;
              if(res.data.idcard_status == 2){
                if(vm.type=='front'){
                  if(localStorage.getItem('front')){
                    vm.currentImg=localStorage.getItem('front')
                  }else{
                    vm.currentImg=res.data.card_positive_img;
                  }  
                }
                if(vm.type=='back'){
                  if(localStorage.getItem('back')){
                    vm.currentImg=localStorage.getItem('back')
                  }else{
                    vm.currentImg=res.data.card_negative_img;
                  }  
                }
              }else{ 
                  if(vm.type == 'front'){
                    if(res.data.card_positive_img){
                      vm.currentImg=res.data.card_positive_img;
                    }else{
                      vm.currentImg=vm.front;
                    }

                  }

                if(vm.type == 'back'){
                  if(res.data.card_negative_img){
                  vm.currentImg=res.data.card_negative_img;
                  }else{
                      vm.currentImg=vm.back;
                  }

                }
              }
            }
          })
        }
      },
      mounted:function(){
        this.type=this.$route.query.type
        if(this.type == 'front'){
          this.pageName='身份证正面'
          this.$store.commit("setPageName", this.pageName)

        }
        if(this.type == 'back'){
          this.pageName='身份证反面'
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
