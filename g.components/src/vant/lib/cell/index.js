'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _routerLink = require('../mixins/router-link');

var _routerLink2 = _interopRequireDefault(_routerLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-cell', 'van-hairline', { 'van-cell--required': _vm.required }], on: { "click": _vm.onClick } }, [_vm.$slots.title || _vm.title ? _c('div', { staticClass: "van-cell__title" }, [_vm._t("icon", [_vm.icon ? _c('van-icon', { attrs: { "name": _vm.icon } }) : _vm._e()]), _vm._t("title", [_c('span', { staticClass: "van-cell__text", domProps: { "textContent": _vm._s(_vm.title) } }), _vm.label ? _c('span', { staticClass: "van-cell__label", domProps: { "textContent": _vm._s(_vm.label) } }) : _vm._e()])], 2) : _vm._e(), _vm.value || _vm.$slots.default ? _c('div', { staticClass: "van-cell__value", class: {
        'van-cell__value--link': _vm.isLink,
        'van-cell__value--alone': !_vm.$slots.title && !_vm.title && !_vm.label
      } }, [_vm._t("default", [_c('span', { domProps: { "textContent": _vm._s(_vm.value) } })])], 2) : _vm._e(), _vm._t("right-icon", [_vm.isLink ? _c('van-icon', { staticClass: "van-cell__right-icon", attrs: { "name": "arrow" } }) : _vm._e()]), _vm._t("extra")], 2);
  },

  name: 'van-cell',

  mixins: [_routerLink2.default],

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    required: Boolean,
    value: [String, Number]
  },

  methods: {
    onClick: function onClick() {
      this.$emit('click');
      this.routerLink();
    }
  }
};