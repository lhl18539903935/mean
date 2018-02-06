<template>
  <div style='margin-bottom:2em;'>
    <div class="main">
      <p><img src="../assets/images/erweima.png" alt=""/></p>
      <p class="erwei"><img :src="src" alt=""/></p>
    </div>
    <div class="butt" @click='savePic'>保存到相册</div>
   
  </div>
</template>

<script>
import downloadImage from "../downloadimg"
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"查看万码",
        src:'',
        bg:{white:false,grey:true},
      }
  },
  methods:{
    savePic() {
      var vm=this;
     this.$vux.loading.show({
                  text: '保存中'
                })
     //alert(this.src)
      downloadImage(this.src,function(){ 
             vm.$vux.loading.hide()
              vm.$vux.toast.show({
                  text: '保存成功！',
                  type: "success"
              })
      },function(){
        vm.$vux.toast.show({
                  text: '保存失败！',
                  type: "warn"
              })
      });
    },

  },
  mounted(){
      let vm=this;
      this.store_id=this.$route.query.store_id
      this.apiPost("http://r.huileyi.com/store/theStoreDetail",{store_id:this.store_id}).then((res)=>{
          if(res.code == 200){
            //alert(res.data.store_qrcode)
            if(res.data.store_qrcode){

            vm.src=res.data.store_qrcode;
            }else{
              this.$vux.toast.show({
              text:'尚未添加二维码！',
              type:"warn"
              })
              //vm.src=require('../assets/images/QRcode_03.png')
              //vm.src='http://tp.huileyi.com/wanshang/72/b3/57/2017-10/59f5874540a57.jpg'
            }
          }else{
            this.$vux.toast.show({
            text:res.msg,
            type:"warn"
            })
          }
   
      })
  },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    width:90%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 6%;
  }
  .main p img{
    width:100%;
  }
  .erwei{
    width: 80%;
    height: 80%;
    position: absolute;
    top: 27%;
    left: 10%;
  }
  .erwei img{
    width:100%;
  }
  .butt {
    width:60%;
    height:40px;
    line-height: 40px;
    text-align: center;
    border:0;
    border-radius:20px;
    background: red;
    color:#fff;
    margin:2rem auto;
    display:block;
  }
</style>
