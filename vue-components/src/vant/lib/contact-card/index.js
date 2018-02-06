'use strict';

exports.__esModule = true;

var _components;

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', _vm._g({ class: ['van-contact-card', "van-contact-card--" + _vm.type] }, _vm.$listeners), [_c('div', { staticClass: "van-contact-card__content" }, [_vm.type === 'add' ? [_c('van-icon', { staticClass: "van-contact-card__icon", attrs: { "name": "add2" } }), _c('div', { staticClass: "van-contact-card__text" }, [_vm._v(_vm._s(_vm.addText))])] : _vm.type === 'edit' ? [_c('van-icon', { staticClass: "van-contact-card__icon", attrs: { "name": "contact" } }), _c('div', { staticClass: "van-contact-card__text" }, [_c('div', [_vm._v("联系人：" + _vm._s(_vm.name))]), _c('div', [_vm._v("联系电话：" + _vm._s(_vm.tel))])])] : _vm._e()], 2), _c('van-icon', { staticClass: "van-contact-card__arrow", attrs: { "name": "arrow" } })], 1);
  },

  name: 'van-contact-card',

  components: (_components = {}, _components[_icon2.default.name] = _icon2.default, _components),

  props: {
    type: {
      type: String,
      default: 'add'
    },
    name: {
      type: String
    },
    tel: {
      type: String
    },
    addText: {
      type: String,
      default: '添加订单联系人信息'
    }
  }
};