<template>
    <div class="storeAcc">
      <group style="margin-top:-0.5rem">
        <x-input class="font" v-model="company"   placeholder="惠乐益电子商务">
          <img slot="label" width="16" style="padding-right:10px;display:block;" src="../assets/images/raw_1505466919_03.png">
        </x-input>

          <x-address style="padding-left:30px;" placeholder="所属区域" class="font" title=""  raw-value :list="addressData"  value-text-align="right">

          </x-address>
        <img width="12" style="display:block;margin-right:5px;position: absolute;top:52px;left:17px;" src="../assets/images/raw_1505466919_07.png">
      </group>
      <group label-width="2.5rem;" style="margin-top:-0.5rem">
        <x-input class="font" title="门店账号" v-model="store" placeholder="请输入门店账号"></x-input>
        <x-input class="font" type="password"  v-model="Pwd" title="密码" placeholder="请输入门店密码"></x-input>
      </group>
      <div style="width:90%;margin:1rem auto;"><x-button style="background: #FF4948;color:#fff;font-size: 16px;" link="/account">保存</x-button></div>
    </div>
</template>

<script type="es6">
  import {Group,XInput,XAddress ,Cell,XButton,ChinaAddressV3Data} from 'vux'
    export default {
      components:{
        Group,
        XInput,
        Cell,
        XButton,
        XAddress,
        ChinaAddressV3Data
      },
      data(){
      return{
        pageName:"设置门店账号",
        company:"",
        store:"",
        Pwd:"",
        bg:{white:false,grey:true},
        addressData: ChinaAddressV3Data,
      }
    },
      methods:{

      },
  mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .storeAcc .font{
    font-size: 14px;
  }
  .storeAcc .vux-popup-picker-select{
    text-align: left!important;
  }
</style>
