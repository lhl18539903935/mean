<template>
    <div style="background: #fff;">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item>
          <div class="flex-demo">
            <img src="../assets/images/0-6-1_03.png" alt=""/>
          </div>
        </flexbox-item>
      </flexbox>
      <div class='activity_middle clearfix'>
        <div class='activity_item'>
          <img style='width:100%;' src="../assets/images/2.png">
          <p>填写商户信息</p>
        </div>
        <div class='activity_item'>
            <img class='activity_img' src="../assets/images/6.png">
         </div>
         <div class='activity_item'>
          <img style='width:100%;' src="../assets/images/3.png">
          <p>填写门店信息</p>
        </div>
        <div class='activity_item'>
            <img class='activity_img' src="../assets/images/6.png">
         </div>
         <div class='activity_item'>
          <img style='width:100%;' src="../assets/images/4.png">
          <p>审核通过</p>
        </div>
        <div class='activity_item'>
            <img class='activity_img' src="../assets/images/6.png">
         </div>
         <div class='activity_item'>
          <img style='width:100%;' src="../assets/images/5.png">
          <p>收款营业</p>
        </div>
      
      </div>

      <div class="btn">
        <x-button link="/license?type=yes">现在入驻(有营业执照)</x-button>
        <x-button link="/license?type=no">现在入驻(无营业执照)</x-button>
      </div>
    </div>
</template>

<script>
  import { Flexbox, FlexboxItem ,XButton} from 'vux'
    export default {
      data(){
        return {
          pageName:'商家入驻',
          bg:{white:true,grey:false},
          pageFooter:false,
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
      },
      mounted(){
          localStorage.removeItem('business_license');
          localStorage.removeItem('license_positive_img');
          localStorage.removeItem('license_negative_img');
          localStorage.removeItem('trade_license');
          localStorage.removeItem('user_license');
          localStorage.removeItem('open_permit');
      },
      components:{
          Flexbox,
          FlexboxItem,
          XButton
      },
      mixins:[window.http,window.mixins]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    margin-top:3rem;
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
  }
  .btn button:first-child{
    background: #FDA14A;
     }
  .btn button{
    background: #FF4948;
    color:#fff;
  }
  .activity_middle{
    padding-left:11.11%;margin:2em 0;width:77.77%;
  }
  .activity_item{width:14.28%;float:left;}
  .activity_item p{text-align: center;font-size: 12px;color:#666;}
  .activity_img{width:0.5em;display:block;margin-top:1em;margin-left:1.1em;}
</style>
