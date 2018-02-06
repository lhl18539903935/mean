<template>
    <div >
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item>
          <div class="flex-demo">
            <img src="../assets/images/chose.jpg" alt=""/>
          </div>
        </flexbox-item>
      </flexbox>

      <div class="btn">
        <x-button @click.native='scan'>商家激活</x-button>
        <x-button @click.native='pause'>暂不激活</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import { Flexbox, FlexboxItem ,XButton} from 'vux'
    export default {
      data(){
      return {
      pageName:'商家入驻',
      bg:{white:true,grey:false},
        list:[
          {src:require('../assets/images/2.png'),msg:'填写商户信息'},
          {link:require('../assets/images/6.png')},
          {src:require('../assets/images/3.png'),msg:'填写门店信息'},
          {link:require('../assets/images/6.png')},
          {src:require('../assets/images/4.png'),msg:'审核通过'},
          {link:require('../assets/images/6.png')},
          {src:require('../assets/images/5.png'),msg:'收款营业'}
        ],

      }
    },
    methods:{
      pause(){
        localStorage.setItem('checkMerchant',true);
        this.$router.push("/")
      },
      scan() {
      let vm=this;
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            let query=result.text;
            let p=query.indexOf('qrcode_num');

            if(p != -1){
              let p_slit=query.substr(p);
              let queryArr=p_slit.split('/');

              /*alert(queryArr[0]);
              alert(queryArr[1]);
              alert(queryArr[2]);
              alert(queryArr[3]);*/

              vm.sendScan(queryArr);

            }else{

              vm.$vux.toast.show({
                  text: '请扫描正确的二维码！',
                  type: "warn"
              })

            }

              /*alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);*/

          },
          function (error) {
             // alert("Scanning failed: " + error);
             this.$vux.toast.show({
                  text: '扫描失败',
                  type: "warn"
              })
          }
       );
    },
    jump(){
      this.apiPost('http://r.huileyi.com/Merchant/getUserLevel').then((res) => {
                                console.log(res)
                        if(res.code==200){
                            localStorage.setItem('level',res.level)
                       
                            if(res.level == 0){

                                if(res.merchant_audit == 0 ){
                                    if(res.qr_active == 0 ){
                                        this.$vux.toast.show({
                                        text: '您尚未激活二维码！',
                                        type: "text"
                                        })
                                        this.$router.push({path: '/activity'});
                                    }
                                    if(res.qr_active == 1 ){
                                        this.$vux.toast.show({
                                        text: '等待审核……',
                                        type: "text"
                                        })
                                        this.$router.push({path: '/success'});
                                    }
                                
                                }

                                if(res.merchant_audit == 1 ){                       
                                    if(res.store_status == 0){
                                        this.$vux.toast.show({
                                        text: '请添加门店！',
                                        type: "text"
                                        })
                                        this.$router.push({path: '/addStore'});
                                    } 
                                    if(res.store_status == 1){
                                       
                                    }                         
                                
                                }
                            }

                        }else{
                            this.$vux.toast.show({
                                    text: res.msg,
                                    type: "text"
                                })
                            this.$router.push({path: '/'});
                        }
                    })
    },
    sendScan(queryArr){

      let vm=this;
      let data={qrcode_num:queryArr[1],key:queryArr[3]};

      //let data={qrcode_num:10000011,key:'iv99klsed4gw6w3r42wf6nmilma3upo1'};
      this.apiPost('http://p.huileyi.com/Dls/bindMerchant', data).then((res) => {
            //alert(JSON.stringify(res));

            if(res.code==200){
              /*this.$vux.toast.show({
                    text: '激活成功！',
                    type: "success"
                })*/
              localStorage.setItem('checkMerchant',true)
              this.jump();

            }else{
              this.$vux.toast.show({
                    text: res.msg,
                    type: "warn"
                })
            }
          })
    },
    },
      components:{
        Flexbox,
        FlexboxItem,
        XButton
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .flex-demo img{
    width:18rem;
  }
  .flex_img img{
    width:40px;
  }
  .flex_img h3{
    color:#888;
    font-size: 0.5rem;
  }
  .btn{
    width:90%;
    margin:0 auto;
    margin-top: 4em;
  }
  .btn button:first-child{
    background: #FF4948;
    color:#fff;
     }
  .btn button:last-child{
    background: #fff;
    border:1px solid #FF4948;
    color:#FF4948;
  }
  @media screen  and (max-width: 320px) {


  }
</style>
