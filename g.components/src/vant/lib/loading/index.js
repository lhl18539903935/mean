'use strict';

exports.__esModule = true;

var VALID_TYPES = ['gradient-circle', 'circle', 'spinner'];
var VALID_COLORS = ['black', 'white'];

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['van-loading', 'van-loading--' + _vm.type, 'van-loading--' + _vm.color] }, [_c('span', { class: ['van-loading__spinner', 'van-loading__spinner--' + _vm.type, 'van-loading__spinner--' + _vm.color] }, _vm._l(12, function (item) {
      return _vm.type === 'spinner' ? _c('i') : _vm._e();
    }))]);
  },

  name: 'van-loading',

  props: {
    type: {
      type: String,
      default: 'gradient-circle',
      validator: function validator(value) {
        return VALID_TYPES.indexOf(value) > -1;
      }
    },
    color: {
      type: String,
      default: 'black',
      validator: function validator(value) {
        return VALID_COLORS.indexOf(value) > -1;
      }
    }
  }
};