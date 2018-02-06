<template>
<div>
      <div class="main">
        <div style='position:relative;'>
            <p style='text-align:center;position:absolute;color:#666;line-height:rem;width:100%;'>惠乐益电子商务</p>
           <img :src="qrcode" alt="../assets/images/p1.png" />
        </div>
        <button>保存到相册</button>
      </div>
  </div>
</template>

<script >
  export default {
   data(){
      return{
        pageName:"二维码",
        bg:{white:false,grey:true},
        qrcode:'',
        pageFooter:false
      }
   },
   mounted(){
      let vm=this;
     this.store_id=this.$route.query.store_id
        this.apiPost("http://r.huileyi.com/store/theStoreDetail",{store_id:this.store_id}).then((res)=>{
            if(res.code == 200){
              if(res.data.store_qrcode){

              vm.qrcode=res.data.store_qrcode;
              }else{
                vm.qrcode=require('../assets/images/QRcode_03.png')
              }
            }else{
              this.$vux.toast.show({
              text:res.msg,
              type:"warn"
              })
            }
     
        })
      },
   mixins:[window,mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    width:90%;
    margin: 2rem auto;
  }
  .main img{
    width:100%;
  }
  .main button{
      width:40%;
    height:40px;
    border:0;
    border-radius:20px;
    background: #FF4948;
    color:#fff;
    margin:2rem auto;
    display:block;
    outline: none;
   }
  .footer{
    width:100%;
    height:60px;background:#FFA00E;
    text-align: center;
    color:#fff;
    position: fixed;
    bottom:0;
  }
  @media screen  and (max-width: 320px) {
    img{
      width:80%;
    }
  }
</style>
