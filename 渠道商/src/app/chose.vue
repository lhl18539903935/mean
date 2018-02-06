<template>
    <div style="background: #fff;height:100%;">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item>
          <div class="flex-demo">
            <img src="../assets/lic.jpg" alt=""/>
          </div>
        </flexbox-item>
      </flexbox>

      <div class="btn">
        <x-button link="/addMerchant?type=yes">添加商家（有营业执照）</x-button>
        <!--<x-button link="/addMerchant?type=no">添加商家（无营业执照）</x-button>-->
        <x-button @click.native="handleClick">添加商家（无营业执照）</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import { Flexbox, FlexboxItem ,XButton} from 'vux'
    export default {
      data(){
      return {
      pageHeader:true,
      pageName:'商家入驻',
      bg:{white:true,grey:false},
      }
    },
    methods:{
    handleClick(){
      this.$vux.toast.show({
        text:'正在开发中...',
        type: "text",position:'bottom',
      })
   }

    },
      components:{
        Flexbox,
        FlexboxItem,
        XButton
      },
      mixins:[window.mixins,window.http]
    }
</script>

<style scoped>
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .flex-demo img{
    margin-top: 2em;
    width:40%;
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
    background: #6594fe;
    color:#fff;
     }
  .btn button:last-child{
    background: #fff;
    border:1px solid #6594fe;
    color:#6594fe;
  }
  @media screen  and (max-width: 320px) {


  }
</style>
