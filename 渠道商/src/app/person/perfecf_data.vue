<template>
    <div>
      <group   class="weui-cells_form group" label-width="7.5em">
        <x-input class="font" value-align="right" title="*姓名" placeholder="请输入姓名"></x-input>
      </group>
      <group   class="weui-cells_form group" label-width="7.5em">
        <x-input class="font" title="*手机号" placeholder="130000000000"></x-input>
      </group>
      <group class="group"  label-width="5.5em" label-margin-right="2em" label-align="justify">
        <x-input class="font" title="*身份证号" placeholder="请输入身份证号"></x-input>
        <cell class="font" title="*身份证正面" value="请上传" is-link></cell>
        <cell class="font" title="*身份证背面" value="请上传" is-link></cell>
        <cell class="font" title=" 营业执照" value="请上传" is-link></cell>
      </group>
      <group class="group">
        <cell class="font " title="绑定银行卡" is-link></cell>
      </group>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Group,Cell,XInput} from 'vux'
    export default {
      components:{
        Group,
        Cell,
        XInput
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .font{
    font-size: 14px;
    padding-top:14px;
    padding-bottom:14px;
  }
  .group{
    margin-top:-10px;
  }
</style>
