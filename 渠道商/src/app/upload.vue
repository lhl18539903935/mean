<template>
  <div class='addCard'>
          <div style="text-align: center;position:relative;margin-top:20px;">

           <p class='imgsrc'><img  @click='addFile' :src="currentImg"  alt=""/></p>
          </div>
          <p v-if="type !='business' && type != 'contract' &&type!='business_img'&& type!='trade_license'&&type!='open_permit' " style="width: 90%;margin-left:5%;margin-top:1em;color:#999;">请上传XXX身份证信息页照片,需与法定代表人/经营者姓名一致,确保信息展示完整、清晰、真实有效</p>

          <p  v-if="type=='business' " style="width: 90%;margin-left:5%;margin-top:1em;color:#999;"> 请上传清晰彩色原件扫描件或数码照片,如复印件需要加盖公章。经营者姓名需要与用户与用户真实姓名一致
      确保信息展示完整、清晰、真实有效</p>

      <p  v-if="type=='business_img' " style="width: 90%;margin-left:5%;margin-top:1em;color:#999;"> 请上传清晰彩色原件扫描件或数码照片,如复印件需要加盖公章。经营者姓名需要与用户与用户真实姓名一致
      确保信息展示完整、清晰、真实有效</p>

      <p  v-if="type=='trade_license' " style="width: 90%;margin-left:5%;margin-top:1em;color:#999;"> 请上传清晰彩色原件扫描件或数码照片,如复印件需要加盖公章。经营者姓名需要与用户与用户真实姓名一致
      确保信息展示完整、清晰、真实有效</p>
      <p  v-if="type=='open_permit' " style="width: 90%;margin-left:5%;margin-top:1em;color:#999;"> 请上传清晰彩色原件扫描件或数码照片,如复印件需要加盖公章。经营者姓名需要与用户与用户真实姓名一致
      确保信息展示完整、清晰、真实有效</p>
          <p v-if="type=='contract'" style="width: 90%;margin-left:5%;margin-top:1em;color:#999;">请上传合同清晰扫描件或者合同页照片，确保信息展示完整、清晰、真实有效</p>
          <flexbox v-if='userData.idcard_status != 1' class="x-btn">
            <flexbox-item>
              <div class='fileler'>
                <x-button @click.native='addFile' type="primary" style="background-color: #fff;color:#000;font-size: 16px;">重选照片</x-button>
              </div>
            </flexbox-item>
            <flexbox-item>
              <x-button type="warn" @click.native='save' style="background-color: #6594FE;font-size: 16px;">确认上传</x-button>
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
          currentImg:'',
          license_positive_img:require('../assets/idz.jpg'),
          license_negative_img:require('../assets/idb.jpg'),
          card_positive_img:require('../assets/idz.jpg'),
          card_negative_img:require('../assets/idb.jpg'),
          contract:require('../assets/contract.jpg'),
          user_license:require('../assets/handCard.jpg'),
          business:require('../assets/zhizhao.jpg'),
          positive_img:require('../assets/idz.jpg'),
          negative_img:require('../assets/idb.jpg'),
          business_img:require('../assets/zhizhao.jpg'),
          trade_license:require('../assets/jingyingxukezheng.jpg'),
          open_permit:require('../assets/openbink.jpg'),
          pageHeader:true,
          pageFooter:false,
          pageName:"",
          type:'',
          userData:{},

        }
      },
      methods:{
        addFile(){
          var vm=this
          this.getPhotoAndUpload(function(ret){
            //alert(JSON.stringify(ret))
            if (ret.code=200)
              vm.currentImg = typeof ret.data.url!="undefined"? ret.data.url : vm.currentImg;
          },function(r){

            //alert(JSON.stringify(r));
          })
        },
        save(){
            if(this.currentImg == this.license_positive_img || this.currentImg == this.license_negative_img || this.currentImg == this.card_positive_img || this.currentImg == this.card_positive_img || this.currentImg == this.card_negative_img || this.currentImg == this.contract || this.currentImg == this.user_license || this.currentImg == this.business || this.currentImg ==this.positive_img || this.currentImg == this.negative_img || this.currentImg == this.business_img || this.currentImg == this.trade_license || this.currentImg == this.open_permit){
                this.$vux.toast.show({
                    text: '请选择上传图片！',
                    type: "text",position:'bottom',
                })
                return;
            }
            let merchant_id=this.$route.query.merchant_id
            if(this.type == 'contract' && merchant_id){
               let vm=this;
                let merchant_id=this.$route.query.merchant_id;
                let contract=this.currentImg;
                this.apiPost(this.phost+'/Merchant/addContract',{merchant_id:merchant_id,contract:contract}).then((res)=>{
                  if(res.code==200){
                    this.$vux.toast.show({
                        text: '保存成功！',
                        type: "success"
                    })

                      this.$router.go(-1)
                  }else{
                    this.$vux.toast.show({
                        text: res.msg,
                        type: "text",position:'bottom',
                    })
                  }
                })

            }else{
              this.$vux.toast.show({
                  text: '保存成功！',
                  type: "success"
              })
              localStorage.setItem(this.type,this.currentImg);
               this.$router.go(-1)
            }



        },

      },
      mounted:function(){
        this.type=this.$route.query.type
        this.type=='business'?this.pageName='营业执照':'';
        this.type=='license_positive_img'?this.pageName='身份证正面':'';
        this.type=='license_negative_img'?this.pageName='身份证反面':'';
        this.type=='contract'?this.pageName='合同':'';
        this.type=='user_license'?this.pageName='手持身份证':'';
        this.type=='card_positive_img'?this.pageName='身份证正面':'';
        this.type=='card_negative_img'?this.pageName='身份证反面':'';
        this.type=='open_permit'?this.pageName="开户行许可证":'';
        this.type=='positive_img'?this.pageName='身份证正面':'';
        this.type=='negative_img'?this.pageName='身份证反面':'';
        this.type=='business_img'?this.pageName='营业执照':'';
        this.type=='trade_license'?this.pageName="行业许可证":'';
         this.$store.commit("setPageName", this.pageName)

         if(localStorage.getItem(this.type)){
           this.currentImg=localStorage.getItem(this.type);

         }else{
          this.currentImg=this[this.type]
         }

      },
      mixins:[window.mixins,window.http,upload]
    }
</script>

<style >
  .addCard .imgsrc img{width:15em;height:10em;}
  .addCard .x-btn{
    margin:1rem auto;
    width:90%;
  }

</style>
