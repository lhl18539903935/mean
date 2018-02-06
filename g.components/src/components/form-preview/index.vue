<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label" v-html="headerLabel"></label>
      <em class="weui-form-preview__value" :class="{'green':gactive,'reder':rgactive }" v-html="headerValue || '&nbsp;'"></em>
      <slot name='staulogo'></slot>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in bodyItems">
        <label class="weui-form-preview__label">{{item.label}}</label>
        <span class="weui-form-preview__value">{{item.value}}</span>
      </div>
    </div>
    <div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn" :class="{'weui-form-preview__btn_default': button.style==='default', 'weui-form-preview__btn_primary': button.style === 'primary','red': button.style==='red','blue': button.style==='blue','white': button.style==='white'}" href="javascript:" v-for="button in footerButtons" v-if='button.is_show' @click="onButtonClick(button.onButtonClick, button.link)">{{button.text}}</a>
    </div>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  name: 'form-preview',
  props: ['headerLabel','staulogo','headerValue', 'bodyItems', 'footerButtons', 'name','gactive','rgactive'],
  methods: {
    onButtonClick (cb, link) {
      cb && cb(this.name)
      if (link) {
        go(link, this.$router)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
.vux-form-preview {
  overflow: hidden;
}
.red{
  background:#ff4948;
  color:#fff !important;
  border-radius: 5px !important;
  font-size:12px !important;
}
.blue{
  background:#6594fe;
  color:#fff !important;
  border-radius: 5px !important;
  font-size:12px !important;
}
.weui-form-preview__ft{display:block;float:right;}
.weui-form-preview__btn{color:#666;border: 1px solid #eee;border-radius:5px;margin: 0 2.19%;width:20%;display:block;float:right;}
.green{
  color:#13ce66 !important;
}
.reder{
  color:#ff4949 !important;
}

.weui-form-preview__btn:after{border-left:0px solid #fff !important;}
</style>
