'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-steps', "van-steps--" + _vm.direction] }, [_vm.title || _vm.description ? _c('div', { staticClass: "van-steps__status" }, [_vm.icon || _vm.$slots.icon ? _c('div', { staticClass: "van-steps__icon" }, [_vm._t("icon", [_c('van-icon', { class: _vm.iconClass, attrs: { "name": _vm.icon } })])], 2) : _vm._e(), _c('div', { staticClass: "van-steps__message" }, [_c('div', { staticClass: "van-steps__message-wrapper" }, [_c('div', { staticClass: "van-steps__title", domProps: { "textContent": _vm._s(_vm.title) } }), _c('div', { staticClass: "van-steps__desc", domProps: { "textContent": _vm._s(_vm.description) } })])]), _vm._t("message-extra")], 2) : _vm._e(), _c('div', { staticClass: "van-steps__items", class: {
        'van-steps__items--alone': !_vm.title && !_vm.description
      } }, [_vm._t("default")], 2)]);
  },

  name: 'van-steps',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    active: Number,
    icon: String,
    iconClass: {
      type: String,
      default: ''
    },
    title: String,
    description: String,
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeColor: {
      type: String,
      default: '#06bf04'
    }
  },

  data: function data() {
    return {
      steps: []
    };
  }
};