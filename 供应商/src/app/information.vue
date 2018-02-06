<template>
    <div class="information">
      <group class="title_width" label-width="7em" label-margin-right="2em" label-align="left" style="margin-top:-0.5rem">
        <x-input  class="title_font" v-model="storeName"  title="门店名称"    placeholder="惠乐益电子商务" ></x-input>
        <x-address title="银行所在地"  class="title_font" placeholder="选择银行所在地"  raw-value :list="addressData"   value-text-align="right"></x-address>
        <cell class="title_font cell"  title="银行" v-model="bink" @click.native="showBink"  is-link></cell>
        <div v-transfer-dom>
          <popup v-model="show1">
            <popup-header
              :left-text="('取消')"
              :right-text="('确定')"
              :title="('请选择银行卡')"
              :show-bottom-border="false"
              @on-click-left="show1 = false"
              @on-click-right="show1 = false"></popup-header>
            <group gutter="0">
              <radio :options="[('招商银行'), ('工商银行'), ('农业银行'), ('添加其他银行')]"></radio>
            </group>
          </popup>
        </div>
        <x-input class="title_font" title="开行支行" v-model="othBink" placeholder="请选择开户行支行" is-link></x-input>
        <x-input class="title_font" title="银行账号" v-model="binkNum" placeholder="请输入银行账号"></x-input>
        <cell class="title_font cell" title="银行账户类型" @click.native="binkClass" value="对公" is-link></cell>
        <x-input class="title_font"  title="收款方名称" v-model="name" placeholder="请输入收款方名称"></x-input>
      </group>
      <div v-transfer-dom>
        <popup v-model="show2">
          <!-- group already has a top border, so we need to hide header's bottom border-->
          <popup-header class="popup"
            left-text="取消"
            right-text="确定"
            title="请选择"
            @on-click-left="show2 = false"
            @on-click-right="show2 = false"
            ></popup-header>
          <group gutter="0">
            <radio :options="[('对公'), ('对私')]"></radio>
          </group>
        </popup>
      </div>
      <div style="width:90%;margin:1rem auto;"><x-button style="background: #FF4948;color:#fff" link="/balance">保存</x-button></div>
    </div>
</template>

<script type="es6">
  import { PopupHeader,Group,XSwitch,ChinaAddressV3Data,XAddress,Cell,XButton,XInput,Radio, Popup, TransferDom} from 'vux'
    export default {
        directives: {
        TransferDom
      },
      data(){
        return{
          pageName:"填写商户信息",
          bg:{white:false,grey:true},
          show1: false,
          show2:false,
          storeName:"",
          address:"",
          bink:"选择银行",
          othBink:"",
          binkNum:"",
          name:"",
          addressData: ChinaAddressV3Data
        }
      },
      components:{
      Group,Cell,
      XButton,
      XSwitch,
      XSwitch,
       PopupHeader,XInput,
       Popup, TransferDom,Radio,
       XAddress,
       ChinaAddressV3Data
      },
      methods:{
        showBink(){
          this.show1=true
        },
        binkClass(){
          this.show2=true
        }
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .information .title_font {font-size: 14px;}
  .information .weui-input{
    text-align: right!important;
  }
   .vux-popup-picker-header{
    color:#FF4948!important;
  }
   .vux-popup-header-right{
    color:#FF4948!important;
  }
  .information .weui-label:before{
    content: '*';
    color:#FF4948;
    font-size: 15px;
    position: absolute;top:9px;left:8px;
    display:inline-block;
  }
  .information .cell .vux-cell-primary:before{
    content: '*';
    color:#FF4948;
    font-size: 15px;
    position: absolute;top:9px;left:8px;
    display:inline-block;
  }
</style>
