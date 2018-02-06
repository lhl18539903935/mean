<template>
  <div style='margin-bottom:2em;position:absolute;top:2rem;bottom:0;right:0;left:0;overflow:scroll;'>
    <div class="main">
      <p><img src="../assets/erweima.png" alt=""/></p>
      <p class="erwei"><img :src="src" alt=""/></p>
     <div class="butt" @click='savePic'>保存到相册</div>
    </div>
  </div>
</template>

<script>
import downloadImage from "../downloadimg"
  export default {
    data(){
      return{
        pageHeader:true,
        pageName:"查看乐码",
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
      downloadImage(this.src,function(){
             vm.$vux.loading.hide()
              vm.$vux.toast.show({
                  text: '保存成功！',
                  type: "success"
              })
      },function(){
        vm.$vux.toast.show({
                  text: '保存失败！',
                  type: "text",position:'bottom',
              })
      });
    },

  },
  mounted(){
        let vm=this;
        let qrcode_id=this.$route.query.qrcode_id;
        this.apiPost(this.phost+'/Dls/qrcodeDetail',{qrcode_id:qrcode_id}).then((res)=>{
          if(res.code==200){
            vm.src=res.data.url
          }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
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
    overflow: scroll;
  }
  .main p img{
    width:100%;
  }
  .erwei{
    width: 80%;
    position: absolute;
    top: 20%;
    left: 11%;
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
    background: #6594FE;
    color:#fff;
    margin:2rem auto;
    display:block;
  }
</style>
